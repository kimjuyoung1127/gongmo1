from datetime import datetime
from typing import List
from pydantic import BaseModel


class PostImageResponse(BaseModel):
    id: int
    post_id: int
    url: str
    sort_order: int
    created_at: datetime

    class Config:
        from_attributes = True


class PostImageListResponse(BaseModel):
    images: List[PostImageResponse]
