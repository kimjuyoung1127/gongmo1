from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, Literal


class UserRegister(BaseModel):
    """회원가입 요청"""
    nickname: str = Field(..., min_length=2, max_length=50, description="사용자 닉네임")
    password: str = Field(..., min_length=6, max_length=100, description="비밀번호")


class UserLogin(BaseModel):
    """로그인 요청"""
    nickname: str = Field(..., description="사용자 닉네임")
    password: str = Field(..., description="비밀번호")


class AnonymousUserCreate(BaseModel):
    """익명 사용자 생성 (기존 방식)"""
    nickname: str = Field(..., min_length=2, max_length=50, description="사용자 닉네임")


class UserUpdate(BaseModel):
    nickname: Optional[str] = Field(None, min_length=2, max_length=50, description="사용자 닉네임")
    preferred_language: Optional[Literal["ko", "en", "vi", "ne"]] = Field(None, description="선호 언어")


class UserResponse(BaseModel):
    id: int
    nickname: str
    session_token: Optional[str]
    preferred_language: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
