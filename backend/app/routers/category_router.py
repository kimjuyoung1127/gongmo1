from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_db
from app.repositories.category_repository import CategoryRepository
from app.schemas.category_schema import CategoryResponse

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get("", response_model=List[CategoryResponse])
async def get_all_categories(
    db: AsyncSession = Depends(get_db)
):
    """
    모든 카테고리 조회
    """
    category_repo = CategoryRepository(db)
    categories = await category_repo.get_all()

    return categories
