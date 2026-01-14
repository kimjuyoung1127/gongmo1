from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/")
async def root():
    """루트 엔드포인트"""
    return {
        "message": "LinkOn API is running",
        "status": "healthy",
        "version": "1.0.0",
    }


@router.get("/health")
async def health_check():
    """헬스 체크 엔드포인트"""
    return {
        "status": "healthy",
        "service": "LinkOn API",
    }
