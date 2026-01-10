from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class UserCreate(BaseModel):
    nickname: str = Field(..., min_length=2, max_length=50, description="사용자 닉네임")


class UserUpdate(BaseModel):
    nickname: Optional[str] = Field(None, min_length=2, max_length=50, description="사용자 닉네임")


class UserResponse(BaseModel):
    id: int
    nickname: str
    session_token: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
