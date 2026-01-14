from pydantic import model_validator
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Database
    POSTGRES_USER: str = "weworkhere_user"
    POSTGRES_PASSWORD: str = "weworkhere_password"
    POSTGRES_DB: str = "weworkhere_db"
    POSTGRES_SERVER: str = "db"
    DB_PORT: int = 5432
    DATABASE_URL: str = ""  # .env에서 직접 설정 가능하도록 추가

    # Server
    BACKEND_PORT: int  # .env에서 필수로 설정해야 함
    HOST: str = "0.0.0.0"

    # CORS
    ALLOWED_ORIGINS: str  # .env에서 필수로 설정해야 함 (예: http://localhost:24051)

    @property
    def CORS_ORIGINS(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]

    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True  # 추가
    LOG_LEVEL: str = "INFO"  # 추가
    DB_ECHO: bool = False

    # Auth (Session-based for anonymous users)
    SECRET_KEY: str = ""  # 추가
    JWT_SECRET_KEY: str = ""
    JWT_ALGORITHM: str = "HS256"
    SESSION_EXPIRE_HOURS: int = 720  # 30 days

    # OpenAI API (추가)
    OPENAI_API_KEY: str = ""

    # Uploads
    UPLOAD_DIR: str = "uploads"
    UPLOAD_URL_PATH: str = "/uploads"

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "allow"  # 추가 필드 허용

    @model_validator(mode="after")
    def validate_secrets(self):
        # DATABASE_URL이 직접 설정되지 않았으면 자동 생성
        if not self.DATABASE_URL:
            object.__setattr__(
                self, 
                "DATABASE_URL",
                f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:5432/{self.POSTGRES_DB}"
            )
        
        if not self.JWT_SECRET_KEY:
            if self.ENVIRONMENT.lower() == "production":
                raise ValueError("JWT_SECRET_KEY must be set in production")
            object.__setattr__(self, "JWT_SECRET_KEY", "dev-secret-change-me")
        
        if not self.SECRET_KEY:
            if self.ENVIRONMENT.lower() == "production":
                raise ValueError("SECRET_KEY must be set in production")
            object.__setattr__(self, "SECRET_KEY", "dev-secret-change-me")
        
        # OpenAI API Key 검증 (선택사항)
        if not self.OPENAI_API_KEY:
            import logging
            logging.warning("⚠️ OPENAI_API_KEY가 설정되지 않았습니다. OCR 기능을 사용할 수 없습니다.")
        
        return self


settings = Settings()