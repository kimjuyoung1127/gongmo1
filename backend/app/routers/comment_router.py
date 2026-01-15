from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.repositories.comment_repository import CommentRepository
from app.repositories.post_repository import PostRepository
from app.services.comment_service import CommentService
from app.schemas.comment_schema import CommentCreate, CommentResponse

router = APIRouter(prefix="/posts/{post_id}/comments", tags=["Comments"])


@router.post("", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
async def create_comment(
    post_id: int,
    comment_data: CommentCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    댓글 생성
    - 인증 필요 (X-Session-Token)
    """
    comment_repo = CommentRepository(db)
    post_repo = PostRepository(db)
    comment_service = CommentService(comment_repo, post_repo)

    new_comment = await comment_service.create_comment(post_id, current_user.id, comment_data)

    return new_comment


@router.get("", response_model=List[CommentResponse])
async def get_comments(
    post_id: int,
    skip: int = Query(0, ge=0, description="건너뛸 댓글 수"),
    limit: int = Query(100, ge=1, le=200, description="가져올 댓글 수"),
    db: AsyncSession = Depends(get_db)
):
    """
    게시글별 댓글 목록 조회
    - 인증 불필요
    """
    comment_repo = CommentRepository(db)
    post_repo = PostRepository(db)
    comment_service = CommentService(comment_repo, post_repo)

    comments = await comment_service.get_comments_by_post(post_id, skip, limit)

    return comments


@router.delete("/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(
    post_id: int,
    comment_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    댓글 삭제
    - 작성자만 삭제 가능
    - 인증 필요 (X-Session-Token)
    """
    comment_repo = CommentRepository(db)
    post_repo = PostRepository(db)
    comment_service = CommentService(comment_repo, post_repo)

    success = await comment_service.delete_comment(comment_id, current_user.id, post_id)

    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )

    return None
