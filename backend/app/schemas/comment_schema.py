from pydantic import BaseModel, Field
from datetime import datetime


class CommentCreate(BaseModel):
    content: str = Field(..., min_length=1, description="댓글 내용")
    is_anonymous: bool = Field(False, description="익명 여부")


class CommentResponse(BaseModel):
    id: int
    post_id: int
    user_id: int
    content: str
    is_anonymous: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
