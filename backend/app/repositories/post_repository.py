from typing import List, Optional
from sqlalchemy import select, func, desc
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.post import Post
from app.repositories.base import BaseRepository


class PostRepository(BaseRepository[Post]):
    def __init__(self, db: AsyncSession):
        super().__init__(Post, db)

    async def get_by_category(
        self,
        category_id: int,
        skip: int = 0,
        limit: int = 20
    ) -> List[Post]:
        """카테고리별 게시글 조회 (최신순)"""
        result = await self.db.execute(
            select(Post)
            .where(Post.category_id == category_id)
            .order_by(desc(Post.created_at))
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())

    async def get_all_ordered(self, skip: int = 0, limit: int = 20) -> List[Post]:
        """모든 게시글 조회 (최신순)"""
        result = await self.db.execute(
            select(Post)
            .order_by(desc(Post.created_at))
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())

    async def count_by_category(self, category_id: Optional[int] = None) -> int:
        """카테고리별 게시글 수 조회"""
        query = select(func.count()).select_from(Post)
        if category_id is not None:
            query = query.where(Post.category_id == category_id)

        result = await self.db.execute(query)
        return result.scalar_one()

    async def increment_view_count(self, post_id: int) -> bool:
        """조회수 증가"""
        post = await self.get_by_id(post_id)
        if post:
            post.view_count += 1
            await self.db.flush()
            return True
        return False

    async def increment_like_count(self, post_id: int) -> bool:
        """좋아요 수 증가"""
        post = await self.get_by_id(post_id)
        if post:
            post.like_count += 1
            await self.db.flush()
            return True
        return False

    async def decrement_like_count(self, post_id: int) -> bool:
        """좋아요 수 감소"""
        post = await self.get_by_id(post_id)
        if post and post.like_count > 0:
            post.like_count -= 1
            await self.db.flush()
            return True
        return False
