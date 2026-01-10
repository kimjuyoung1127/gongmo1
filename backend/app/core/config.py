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

    @property
    def DATABASE_URL(self) -> str:
        # Docker 네트워크 내부에서는 항상 5432 포트 사용
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:5432/{self.POSTGRES_DB}"

    # Server
    BACKEND_PORT: int = 25050
    HOST: str = "0.0.0.0"

    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:24050"

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
