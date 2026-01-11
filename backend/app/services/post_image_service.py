import asyncio
import mimetypes
import shutil
from pathlib import Path
from typing import List
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status

from app.core.config import settings
from app.models.post_image import PostImage
from app.repositories.post_image_repository import PostImageRepository
from app.repositories.post_repository import PostRepository


class PostImageService:
    def __init__(
        self,
        post_repo: PostRepository,
        post_image_repo: PostImageRepository,
    ):
        self.post_repo = post_repo
        self.post_image_repo = post_image_repo
        self.upload_dir = Path(settings.UPLOAD_DIR)
        self.upload_url_path = settings.UPLOAD_URL_PATH.rstrip("/")
        self.upload_dir.mkdir(parents=True, exist_ok=True)

    async def upload_post_images(
        self,
        post_id: int,
        user_id: int,
        files: List[UploadFile],
    ) -> List[PostImage]:
        post = await self.post_repo.get_by_id(post_id)
        if not post:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Post not found",
            )

        if post.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to upload images for this post",
            )

        if not files:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No files provided",
            )

        existing_images = await self.post_image_repo.get_by_post_id(post_id)
        start_order = len(existing_images)
        urls: List[str] = []

        for upload_file in files:
            if not upload_file.content_type or not upload_file.content_type.startswith("image/"):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Only image files are allowed",
                )

            extension = Path(upload_file.filename or "").suffix
            if not extension:
                extension = mimetypes.guess_extension(upload_file.content_type or "") or ""

            filename = f"{uuid4().hex}{extension}"
            destination = self.upload_dir / filename
            await self._save_upload_file(upload_file, destination)

            urls.append(f"{self.upload_url_path}/{filename}")

        images = await self.post_image_repo.create_many(post_id, urls, start_order=start_order)
        if not post.image_url and urls:
            post.image_url = urls[0]
            await self.post_repo.update(post)

        return images

    async def _save_upload_file(self, upload_file: UploadFile, destination: Path) -> None:
        def _copy_file() -> None:
            with destination.open("wb") as buffer:
                shutil.copyfileobj(upload_file.file, buffer)

        await asyncio.to_thread(_copy_file)
        await upload_file.close()

        if not destination.exists() or destination.stat().st_size == 0:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to save file",
            )
