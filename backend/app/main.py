from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import (
    health_router,
    auth_router,
    category_router,
    post_router,
    comment_router,
)

app = FastAPI(
    title="LinkON API",
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
