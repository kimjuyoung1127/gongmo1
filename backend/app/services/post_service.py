from typing import Optional, Dict, Any, List
from fastapi import HTTPException, status
import math

from app.models.post import Post
from app.repositories.post_repository import PostRepository
from app.repositories.post_image_repository import PostImageRepository
from app.schemas.post_schema import PostCreate, PostUpdate


class PostService:
    def __init__(self, post_repo: PostRepository, post_image_repo: PostImageRepository):
        self.post_repo = post_repo
        self.post_image_repo = post_image_repo

    def _normalize_image_urls(
        self,
        image_urls: Optional[List[str]],
        image_url: Optional[str],
    ) -> Optional[List[str]]:
        if image_urls is not None:
            return [url for url in image_urls if url]
        if image_url is not None:
            return [image_url] if image_url else []
        return None

    async def create_post(self, user_id: int, post_data: PostCreate) -> Post:
        """게시글 생성"""
        normalized_urls = self._normalize_image_urls(
            post_data.image_urls,
            post_data.image_url,
        )
        primary_image = None
        if normalized_urls:
            primary_image = normalized_urls[0]

        new_post = Post(
            user_id=user_id,
            category_id=post_data.category_id,
            title=post_data.title,
            content=post_data.content,
            image_url=primary_image,
            is_anonymous=post_data.is_anonymous,
        )

        post = await self.post_repo.create(new_post)

        if normalized_urls:
            images = await self.post_image_repo.create_many(post.id, normalized_urls)
            post.images = images

        return post

    async def get_post_by_id(self, post_id: int, increment_view: bool = False) -> Optional[Post]:
        """게시글 조회 (선택적 조회수 증가)"""
        post = await self.post_repo.get_by_id(post_id)

        if post and increment_view:
            await self.post_repo.increment_view_count(post_id)

        return post

    async def get_posts_paginated(
        self,
        page: int = 1,
        page_size: int = 20,
        category_id: Optional[int] = None
    ) -> Dict[str, Any]:
        """게시글 목록 조회 (페이지네이션)"""
        skip = (page - 1) * page_size

        if category_id:
            posts = await self.post_repo.get_by_category(category_id, skip, page_size)
            total = await self.post_repo.count_by_category(category_id)
        else:
            posts = await self.post_repo.get_all_ordered(skip, page_size)
            total = await self.post_repo.count()

        total_pages = math.ceil(total / page_size) if total > 0 else 0

        return {
            "posts": posts,
            "total": total,
            "page": page,
            "page_size": page_size,
            "total_pages": total_pages,
        }

    async def update_post(
        self,
        post_id: int,
        user_id: int,
        post_data: PostUpdate
    ) -> Optional[Post]:
        """게시글 수정 (작성자만 가능)"""
        post = await self.post_repo.get_by_id(post_id)

        if not post:
            return None

        if post.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to update this post"
            )

        # 업데이트할 필드만 변경
        if post_data.title is not None:
            post.title = post_data.title
        if post_data.content is not None:
            post.content = post_data.content
        if post_data.category_id is not None:
            post.category_id = post_data.category_id
        normalized_urls = self._normalize_image_urls(
            post_data.image_urls,
            post_data.image_url,
        )
        if normalized_urls is not None:
            await self.post_image_repo.delete_by_post_id(post_id)
            if normalized_urls:
                images = await self.post_image_repo.create_many(post_id, normalized_urls)
                post.images = images
                post.image_url = normalized_urls[0]
            else:
                post.images = []
                post.image_url = None

        return await self.post_repo.update(post)

    async def delete_post(self, post_id: int, user_id: int) -> bool:
        """게시글 삭제 (작성자만 가능)"""
        post = await self.post_repo.get_by_id(post_id)

        if not post:
            return False

        if post.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to delete this post"
            )

        return await self.post_repo.delete(post_id)

    async def toggle_like(self, post_id: int, user_id: int) -> Dict[str, Any]:
        """좋아요 토글 (향후 Reaction 모델과 연동)"""
        # 현재는 단순 카운트만 증가/감소
        # TODO: Reaction 모델과 연동하여 중복 체크 및 토글 구현
        post = await self.post_repo.get_by_id(post_id)

        if not post:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Post not found"
            )

        # 임시 구현: 단순 증가
        await self.post_repo.increment_like_count(post_id)

        return {
            "post_id": post_id,
            "like_count": post.like_count + 1,
            "message": "Like added"
        }
