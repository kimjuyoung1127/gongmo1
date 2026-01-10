from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.services.auth_service import AuthService
from app.schemas.user_schema import UserCreate, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/anonymous", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_anonymous_user(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    익명 사용자 생성
    - 닉네임만으로 사용자 생성
    - 세션 토큰 반환 (클라이언트가 저장하여 인증에 사용)
    """
    user_repo = UserRepository(db)
    auth_service = AuthService(user_repo)

    new_user = await auth_service.create_anonymous_user(user_data)

    return new_user


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    """
    현재 로그인한 사용자 정보 조회
    - 헤더: X-Session-Token 필요
    """
    return current_user
