import secrets
from datetime import datetime, timedelta
from typing import Optional

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user_schema import UserRegister, UserLogin, AnonymousUserCreate, UserUpdate
from app.core.config import settings
from app.utils.password import hash_password, verify_password


class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    def _generate_session_token(self) -> str:
        """랜덤 세션 토큰 생성 (256비트)"""
        return secrets.token_urlsafe(32)

    async def register(self, user_data: UserRegister) -> User:
        """회원가입"""
        # 닉네임 중복 체크
        existing_user = await self.user_repo.get_by_nickname(user_data.nickname)
        if existing_user:
            raise ValueError("이미 사용 중인 닉네임입니다")

        # 비밀번호 해싱
        password_hash_value = hash_password(user_data.password)

        new_user = User(
            nickname=user_data.nickname,
            password_hash=password_hash_value,
            session_token=None,
        )

        return await self.user_repo.create(new_user)

    async def login(self, login_data: UserLogin) -> User:
        """로그인"""
        # 사용자 조회
        user = await self.user_repo.get_by_nickname(login_data.nickname)
        if not user:
            raise ValueError("닉네임 또는 비밀번호가 일치하지 않습니다")

        # 비밀번호 검증
        if not verify_password(login_data.password, user.password_hash):
            raise ValueError("닉네임 또는 비밀번호가 일치하지 않습니다")

        # 세션 토큰 생성
        session_token = self._generate_session_token()
        user.session_token = session_token
        await self.user_repo.update(user)

        return user

    async def create_anonymous_user(self, user_data: AnonymousUserCreate) -> User:
        """익명 사용자 생성 (기존 방식 - 하위 호환성)"""
        session_token = self._generate_session_token()

        # 임시 비밀번호 생성 (익명 사용자용)
        temp_password = secrets.token_urlsafe(16)
        password_hash_value = hash_password(temp_password)

        new_user = User(
            nickname=user_data.nickname,
            password_hash=password_hash_value,
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

    async def update_user(self, user_id: int, update_data: UserUpdate) -> Optional[User]:
        """사용자 정보 업데이트"""
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            return None

        # 닉네임 변경 시 중복 체크
        if update_data.nickname and update_data.nickname != user.nickname:
            existing_user = await self.user_repo.get_by_nickname(update_data.nickname)
            if existing_user:
                raise ValueError("이미 사용 중인 닉네임입니다")
            user.nickname = update_data.nickname

        # 선호 언어 업데이트
        if update_data.preferred_language:
            user.preferred_language = update_data.preferred_language

        return await self.user_repo.update(user)
