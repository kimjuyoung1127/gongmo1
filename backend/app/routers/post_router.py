from fastapi import APIRouter, Depends, HTTPException, status, Query, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.repositories.post_repository import PostRepository
from app.repositories.post_image_repository import PostImageRepository
from app.repositories.reaction_repository import ReactionRepository
from app.services.post_service import PostService
from app.services.post_image_service import PostImageService
from app.schemas.post_schema import PostCreate, PostResponse, PostUpdate, PostListResponse
from app.schemas.post_image_schema import PostImageListResponse

router = APIRouter(prefix="/posts", tags=["Posts"])


@router.post("", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(
    post_data: PostCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    게시글 생성
    - 인증 필요 (X-Session-Token)
    """
    post_repo = PostRepository(db)
    post_image_repo = PostImageRepository(db)
    reaction_repo = ReactionRepository(db)
    post_service = PostService(post_repo, post_image_repo, reaction_repo)

    new_post = await post_service.create_post(current_user.id, post_data)

    return new_post


@router.get("", response_model=PostListResponse)
async def get_posts(
    page: int = Query(1, ge=1, description="페이지 번호 (1부터 시작)"),
    page_size: int = Query(20, ge=1, le=100, description="페이지당 게시글 수"),
    category_id: Optional[int] = Query(None, description="카테고리 ID (선택)"),
    db: AsyncSession = Depends(get_db)
):
    """
    게시글 목록 조회 (페이지네이션)
    - 인증 불필요
    - category_id로 필터링 가능
    """
    post_repo = PostRepository(db)
    post_image_repo = PostImageRepository(db)
    reaction_repo = ReactionRepository(db)
    post_service = PostService(post_repo, post_image_repo, reaction_repo)

    result = await post_service.get_posts_paginated(page, page_size, category_id)

    return result


@router.get("/{post_id}", response_model=PostResponse)
async def get_post(
    post_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    게시글 상세 조회
    - 조회수 자동 증가
    - 인증 불필요
    """
    post_repo = PostRepository(db)
    post_image_repo = PostImageRepository(db)
    reaction_repo = ReactionRepository(db)
    post_service = PostService(post_repo, post_image_repo, reaction_repo)

    post = await post_service.get_post_by_id(post_id, increment_view=True)

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )

    return post


@router.put("/{post_id}", response_model=PostResponse)
async def update_post(
    post_id: int,
    post_data: PostUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    게시글 수정
    - 작성자만 수정 가능
    - 인증 필요 (X-Session-Token)
    """
    post_repo = PostRepository(db)
    post_image_repo = PostImageRepository(db)
    reaction_repo = ReactionRepository(db)
    post_service = PostService(post_repo, post_image_repo, reaction_repo)

    updated_post = await post_service.update_post(post_id, current_user.id, post_data)

    if not updated_post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )

    return updated_post


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
    post_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    게시글 삭제
    - 작성자만 삭제 가능
    - 인증 필요 (X-Session-Token)
    """
    post_repo = PostRepository(db)
    post_image_repo = PostImageRepository(db)
    reaction_repo = ReactionRepository(db)
    post_service = PostService(post_repo, post_image_repo, reaction_repo)

    success = await post_service.delete_post(post_id, current_user.id)

    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )

    return None


@router.post("/{post_id}/like", status_code=status.HTTP_200_OK)
async def toggle_like(
    post_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    게시글 좋아요 토글
    - 인증 필요 (X-Session-Token)
    - 현재는 단순 카운트만 증가 (향후 Reaction 모델과 연동)
    """
    post_repo = PostRepository(db)
    post_image_repo = PostImageRepository(db)
    reaction_repo = ReactionRepository(db)
    post_service = PostService(post_repo, post_image_repo, reaction_repo)

    result = await post_service.toggle_like(post_id, current_user.id)

    return result


@router.post(
    "/{post_id}/images",
    response_model=PostImageListResponse,
    status_code=status.HTTP_201_CREATED,
)
async def upload_post_images(
    post_id: int,
    files: list[UploadFile] = File(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    게시글 이미지 업로드 (다중 파일)
    - 작성자만 업로드 가능
    - 인증 필요 (X-Session-Token)
    """
    post_repo = PostRepository(db)
    post_image_repo = PostImageRepository(db)
    image_service = PostImageService(post_repo, post_image_repo)

    images = await image_service.upload_post_images(post_id, current_user.id, files)

    return {"images": images}
