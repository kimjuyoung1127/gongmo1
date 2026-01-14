from pydantic import BaseModel, Field
from typing import Optional, List


class KeyInfo(BaseModel):
    """주요 정보"""
    company: Optional[str] = Field(None, description="회사명/기관명")
    date: Optional[str] = Field(None, description="날짜")
    amount: Optional[str] = Field(None, description="금액")
    period: Optional[str] = Field(None, description="기간")
    conditions: Optional[List[str]] = Field(default_factory=list, description="조건들")


class OCRAnalyzeResponse(BaseModel):
    """OCR 분석 결과"""
    document_type: str = Field(..., description="문서 종류")
    original_text: str = Field(..., description="원문 텍스트")
    translated_text: str = Field(..., description="번역된 텍스트")
    summary: str = Field(..., description="문서 요약")
    key_info: KeyInfo = Field(..., description="주요 정보")
    confidence: float = Field(..., ge=0.0, le=1.0, description="분석 신뢰도")
    source_lang: str = Field(..., description="원본 언어 코드")
    target_lang: str = Field(..., description="번역 언어 코드")


class OCRResponse(BaseModel):
    """OCR API 응답"""
    success: bool = Field(..., description="성공 여부")
    message: str = Field(..., description="응답 메시지")
    data: Optional[OCRAnalyzeResponse] = Field(None, description="분석 결과")