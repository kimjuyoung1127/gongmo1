import secrets
from datetime import datetime, timedelta
from typing import Optional

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user_schema import UserCreate
from app.core.config import settings


class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    def _generate_session_token(self) -> str:
        """랜덤 세션 토큰 생성 (256비트)"""
        return secrets.token_urlsafe(32)

    async def create_anonymous_user(self, user_data: UserCreate) -> User:
        """익명 사용자 생성"""
        session_token = self._generate_session_token()

        new_user = User(
            nickname=user_data.nickname,
            session_token=session_token,
        )

        return await self.user_repo.create(new_user)

    async def validate_session(self, session_token: str) -> Optional[User]:
        """세션 토큰 검증"""
        user = await self.user_repo.get_by_session_token(session_token)

        if not user:
            return None

        # 세션 만료 체크 (설정된 시간 기준)
        session_expire_time = user.created_at + timedelta(
            hours=settings.SESSION_EXPIRE_HOURS
        )
        if datetime.now(user.created_at.tzinfo) > session_expire_time:
            return None

        return user

    async def update_user_nickname(self, user_id: int, nickname: str) -> Optional[User]:
        """사용자 닉네임 업데이트"""
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            return None

        user.nickname = nickname
        return await self.user_repo.update(user)
