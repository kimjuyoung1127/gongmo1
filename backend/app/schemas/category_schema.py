from pydantic import BaseModel, Field


class CategoryCreate(BaseModel):
    name_ko: str = Field(..., max_length=50)
    name_en: str = Field(..., max_length=50)
    name_vi: str = Field(..., max_length=50)
    name_ne: str = Field(..., max_length=50)
    slug: str = Field(..., max_length=50)


class CategoryResponse(BaseModel):
    id: int
    name_ko: str
    name_en: str
    name_vi: str
    name_ne: str
    slug: str

    class Config:
        from_attributes = True
