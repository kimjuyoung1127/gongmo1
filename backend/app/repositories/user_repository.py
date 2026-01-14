from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.repositories.base import BaseRepository


class UserRepository(BaseRepository[User]):
    def __init__(self, db: AsyncSession):
        super().__init__(User, db)

    async def get_by_session_token(self, session_token: str) -> Optional[User]:
        """세션 토큰으로 사용자 조회"""
        result = await self.db.execute(
            select(User).where(User.session_token == session_token)
        )
        return result.scalar_one_or_none()

    async def get_by_nickname(self, nickname: str) -> Optional[User]:
        """닉네임으로 사용자 조회"""
        result = await self.db.execute(
            select(User).where(User.nickname == nickname)
        )
        return result.scalar_one_or_none()
