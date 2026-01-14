# app/routers/ocr_router.py
"""
OCR 라우터
"""
from fastapi import APIRouter, UploadFile, File, HTTPException, Query
from app.services.gpt_vision_service import get_gpt_vision_service
from app.schemas.ocr_schema import OCRResponse, OCRAnalyzeResponse, KeyInfo
import logging

logger = logging.getLogger(__name__)

# prefix를 /ocr로 변경 (/api/v1은 main.py에서 추가됨)
router = APIRouter(prefix="/ocr", tags=["OCR"])


@router.post("/analyze", response_model=OCRResponse)
async def analyze_document(
    file: UploadFile = File(..., description="분석할 이미지 파일"),
    source_lang: str = Query(default="ko", description="원본 언어 (ko, vi, en, ne)"),
    target_lang: str = Query(default="vi", description="번역 언어 (ko, vi, en, ne)")
):
    """
    문서 이미지 분석 (GPT-4o Vision)
    
    - 문서 종류 파악
    - 텍스트 추출
    - 자동 번역
    - 요약 및 주요 정보 추출
    
    **지원 언어:**
    - ko: 한국어
    - vi: 베트남어
    - en: 영어
    - ne: 네팔어
    """
    # 파일 검증
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="이미지 파일만 업로드 가능합니다"
        )
    
    try:
        # 파일 읽기
        image_data = await file.read()
        
        # 크기 검증 (20MB)
        max_size = 20 * 1024 * 1024
        if len(image_data) > max_size:
            raise HTTPException(
                status_code=400,
                detail="파일 크기는 20MB 이하여야 합니다"
            )
        
        # GPT-4o 분석
        service = get_gpt_vision_service()
        result = await service.analyze_document(
            image_data,
            source_lang,
            target_lang
        )
        
        # 응답 생성
        return OCRResponse(
            success=True,
            message="문서 분석 완료",
            data=OCRAnalyzeResponse(
                document_type=result["document_type"],
                original_text=result["original_text"],
                translated_text=result["translated_text"],
                summary=result["summary"],
                key_info=KeyInfo(**result["key_info"]),
                confidence=result["confidence"],
                source_lang=result["source_lang"],
                target_lang=result["target_lang"]
            )
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ OCR 분석 실패: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"문서 분석 실패: {str(e)}"
        )


@router.get("/health")
async def ocr_health():
    """OCR 서비스 상태 확인"""
    try:
        service = get_gpt_vision_service()
        return {
            "status": "healthy",
            "engine": "GPT-4o Vision",
            "supported_languages": ["ko", "vi", "en", "ne"]
        }
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"OCR 서비스 사용 불가: {str(e)}"
        )


@router.get("/languages")
async def get_languages():
    """지원 언어 목록"""
    return {
        "languages": [
            {"code": "ko", "name": "Korean", "native_name": "한국어"},
            {"code": "vi", "name": "Vietnamese", "native_name": "Tiếng Việt"},
            {"code": "en", "name": "English", "native_name": "English"},
            {"code": "ne", "name": "Nepali", "native_name": "नेपाली"}
        ]
    }