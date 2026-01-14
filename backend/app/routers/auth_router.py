from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.services.auth_service import AuthService
from app.schemas.user_schema import UserRegister, UserLogin, AnonymousUserCreate, UserUpdate, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserRegister,
    db: AsyncSession = Depends(get_db)
):
    """
    회원가입
    - 닉네임 + 비밀번호로 계정 생성
    - 로그인 필요 (별도의 /login 엔드포인트 사용)
    """
    user_repo = UserRepository(db)
    auth_service = AuthService(user_repo)

    try:
        new_user = await auth_service.register(user_data)
        return new_user
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/login", response_model=UserResponse)
async def login(
    login_data: UserLogin,
    db: AsyncSession = Depends(get_db)
):
    """
    로그인
    - 닉네임 + 비밀번호로 로그인
    - 세션 토큰 반환 (클라이언트가 저장하여 인증에 사용)
    """
    user_repo = UserRepository(db)
    auth_service = AuthService(user_repo)

    try:
        user = await auth_service.login(login_data)
        return user
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))


@router.post("/anonymous", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_anonymous_user(
    user_data: AnonymousUserCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    익명 사용자 생성 (기존 방식 - 하위 호환성)
    - 닉네임만으로 사용자 생성
    - 세션 토큰 즉시 반환
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


@router.patch("/me", response_model=UserResponse)
async def update_current_user(
    update_data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    현재 로그인한 사용자 정보 업데이트
    - 헤더: X-Session-Token 필요
    - 닉네임 및 선호 언어 변경 가능
    """
    user_repo = UserRepository(db)
    auth_service = AuthService(user_repo)

    try:
        updated_user = await auth_service.update_user(current_user.id, update_data)
        if not updated_user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return updated_user
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
