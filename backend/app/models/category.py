from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.core.database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name_ko = Column(String(50), nullable=False)
    name_en = Column(String(50), nullable=False)
    name_vi = Column(String(50), nullable=False)
    name_ne = Column(String(50), nullable=False)
    name_km = Column(String(50), nullable=False)
    slug = Column(String(50), unique=True, nullable=False, index=True)

    # Relationships
    posts = relationship("Post", back_populates="category")
