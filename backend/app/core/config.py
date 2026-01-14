from pydantic import model_validator
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Database
    POSTGRES_USER: str = "linkon_user"
    POSTGRES_PASSWORD: str = "linkon_password"
    POSTGRES_DB: str = "linkon_db"
    POSTGRES_SERVER: str = "db"
    DB_PORT: int = 5432

    @property
    def DATABASE_URL(self) -> str:
        # Docker 네트워크 내부에서는 항상 5432 포트 사용
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:5432/{self.POSTGRES_DB}"

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
    DB_ECHO: bool = False

    # Auth (Session-based for anonymous users)
    JWT_SECRET_KEY: str = ""
    JWT_ALGORITHM: str = "HS256"
    SESSION_EXPIRE_HOURS: int = 720  # 30 days

    # Uploads
    UPLOAD_DIR: str = "uploads"
    UPLOAD_URL_PATH: str = "/uploads"

    class Config:
        env_file = ".env"
        case_sensitive = True

    @model_validator(mode="after")
    def validate_secrets(self):
        if not self.JWT_SECRET_KEY:
            if self.ENVIRONMENT.lower() == "production":
                raise ValueError("JWT_SECRET_KEY must be set in production")
            object.__setattr__(self, "JWT_SECRET_KEY", "dev-secret-change-me")
        return self


settings = Settings()
