from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List


class PostCreate(BaseModel):
    category_id: Optional[int] = Field(None, description="카테고리 ID")
    title: str = Field(..., min_length=1, max_length=200, description="게시글 제목")
    content: str = Field(..., min_length=1, description="게시글 내용")
    image_url: Optional[str] = Field(None, max_length=500, description="이미지 URL")


class PostUpdate(BaseModel):
    category_id: Optional[int] = Field(None, description="카테고리 ID")
    title: Optional[str] = Field(None, min_length=1, max_length=200, description="게시글 제목")
    content: Optional[str] = Field(None, min_length=1, description="게시글 내용")
    image_url: Optional[str] = Field(None, max_length=500, description="이미지 URL")


class PostResponse(BaseModel):
    id: int
    user_id: int
    category_id: Optional[int]
    title: str
    content: str
    image_url: Optional[str]
    view_count: int
    like_count: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class PostListResponse(BaseModel):
    posts: List[PostResponse]
    total: int
    page: int
    page_size: int
    total_pages: int
