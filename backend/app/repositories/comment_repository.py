from typing import List
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.comment import Comment
from app.repositories.base import BaseRepository


class CommentRepository(BaseRepository[Comment]):
    def __init__(self, db: AsyncSession):
        super().__init__(Comment, db)

    async def get_by_post_id(
        self,
        post_id: int,
        skip: int = 0,
        limit: int = 100
    ) -> List[Comment]:
        """게시글별 댓글 조회 (최신순)"""
        result = await self.db.execute(
            select(Comment)
            .where(Comment.post_id == post_id)
            .order_by(desc(Comment.created_at))
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())
