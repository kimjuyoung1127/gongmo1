from fastapi import Depends, HTTPException, status, Header
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional

from app.core.database import get_db
from app.repositories.user_repository import UserRepository
from app.services.auth_service import AuthService
from app.models.user import User


async def get_current_user_optional(
    session_token: Optional[str] = Header(None, alias="X-Session-Token"),
    db: AsyncSession = Depends(get_db),
) -> Optional[User]:
    """
    선택적 인증: 세션 토큰이 있으면 사용자 조회, 없으면 None 반환
    """
    if not session_token:
        return None

    repo = UserRepository(db)
    auth_service = AuthService(repo)
    user = await auth_service.validate_session(session_token)
    return user


async def get_current_user(
    session_token: Optional[str] = Header(None, alias="X-Session-Token"),
    db: AsyncSession = Depends(get_db),
) -> User:
    """
    필수 인증: 세션 토큰이 없거나 유효하지 않으면 401 에러
    """
    if not session_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session token required",
        )

    repo = UserRepository(db)
    auth_service = AuthService(repo)
    user = await auth_service.validate_session(session_token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid session token",
        )
    return user
