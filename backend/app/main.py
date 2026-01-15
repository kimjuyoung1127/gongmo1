from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import ocr_router
from app.routers import (
    health_router,
    auth_router,
    category_router,
    post_router,
    comment_router,
)
import logging

# 👈 로깅 설정 추가
logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s:     %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="WeWorkHere API",
    description="외국인 노동자 익명 커뮤니티 플랫폼 API",
    version="1.0.0",
)

upload_dir = Path(settings.UPLOAD_DIR)
upload_dir.mkdir(parents=True, exist_ok=True)
app.mount(settings.UPLOAD_URL_PATH, StaticFiles(directory=upload_dir), name="uploads")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health_router.router)
app.include_router(auth_router.router, prefix="/api/v1")
app.include_router(category_router.router, prefix="/api/v1")
app.include_router(post_router.router, prefix="/api/v1")
app.include_router(comment_router.router, prefix="/api/v1")
app.include_router(ocr_router.router, prefix="/api/v1")

# 👈 시작 이벤트 추가
@app.on_event("startup")
async def startup_event():
    """서버 시작 시 실행"""
    logger.info("🚀 WeWorkHere API 서버 시작")
    logger.info(f"📍 CORS Origins: {settings.CORS_ORIGINS}")
    logger.info(f"🔑 OpenAI API Key 설정: {'✅ 설정됨' if settings.OPENAI_API_KEY else '❌ 없음'}")
    
    # GPT Vision 서비스 초기화
    from app.services.gpt_vision_service import get_gpt_vision_service
    service = get_gpt_vision_service()
    logger.info("✅ GPT Vision 서비스 로드 완료")

@app.on_event("shutdown")
async def shutdown_event():
    """서버 종료 시 실행"""
    logger.info("👋 WeWorkHere API 서버 종료")