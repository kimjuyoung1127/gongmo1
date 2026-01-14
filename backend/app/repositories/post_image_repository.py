from typing import List
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.post_image import PostImage
from app.repositories.base import BaseRepository


class PostImageRepository(BaseRepository[PostImage]):
    def __init__(self, db: AsyncSession):
        super().__init__(PostImage, db)

    async def get_by_post_id(self, post_id: int) -> List[PostImage]:
        result = await self.db.execute(
            select(PostImage)
            .where(PostImage.post_id == post_id)
            .order_by(PostImage.sort_order)
        )
        return list(result.scalars().all())

    async def delete_by_post_id(self, post_id: int) -> None:
        await self.db.execute(
            delete(PostImage).where(PostImage.post_id == post_id)
        )
        await self.db.flush()

    async def create_many(
        self,
        post_id: int,
        urls: List[str],
        start_order: int = 0,
    ) -> List[PostImage]:
        images = [
            PostImage(post_id=post_id, url=url, sort_order=start_order + index)
            for index, url in enumerate(urls)
        ]
        self.db.add_all(images)
        await self.db.flush()
        return images
