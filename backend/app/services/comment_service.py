from typing import Optional, List
from fastapi import HTTPException, status

from app.models.comment import Comment
from app.repositories.comment_repository import CommentRepository
from app.repositories.post_repository import PostRepository
from app.schemas.comment_schema import CommentCreate


class CommentService:
    def __init__(
        self,
        comment_repo: CommentRepository,
        post_repo: PostRepository
    ):
        self.comment_repo = comment_repo
        self.post_repo = post_repo

    async def create_comment(
        self,
        post_id: int,
        user_id: int,
        comment_data: CommentCreate
    ) -> Comment:
        """댓글 생성"""
        # 게시글 존재 여부 확인
        post = await self.post_repo.get_by_id(post_id)
        if not post:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Post not found"
            )

        new_comment = Comment(
            post_id=post_id,
            user_id=user_id,
            content=comment_data.content,
            is_anonymous=comment_data.is_anonymous,
        )

        return await self.comment_repo.create(new_comment)

    async def get_comments_by_post(
        self,
        post_id: int,
        skip: int = 0,
        limit: int = 100
    ) -> List[Comment]:
        """게시글별 댓글 목록 조회"""
        return await self.comment_repo.get_by_post_id(post_id, skip, limit)

    async def update_comment(
        self,
        comment_id: int,
        user_id: int,
        content: str
    ) -> Optional[Comment]:
        """댓글 수정 (작성자만 가능)"""
        comment = await self.comment_repo.get_by_id(comment_id)

        if not comment:
            return None

        if comment.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to update this comment"
            )

        comment.content = content
        return await self.comment_repo.update(comment)

    async def delete_comment(self, comment_id: int, user_id: int, post_id: int) -> bool:
        """댓글 삭제 (작성자만 가능)"""
        comment = await self.comment_repo.get_by_id(comment_id)

        if not comment:
            return False

        if comment.post_id != post_id:
            return False

        if comment.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to delete this comment"
            )

        return await self.comment_repo.delete(comment_id)
