from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.reaction import Reaction
from app.repositories.base import BaseRepository


class ReactionRepository(BaseRepository[Reaction]):
    def __init__(self, db: AsyncSession):
        super().__init__(Reaction, db)

    async def get_by_post_user_type(
        self,
        post_id: int,
        user_id: int,
        reaction_type: str,
    ) -> Optional[Reaction]:
        result = await self.db.execute(
            select(Reaction)
            .where(Reaction.post_id == post_id)
            .where(Reaction.user_id == user_id)
            .where(Reaction.type == reaction_type)
        )
        return result.scalar_one_or_none()

    async def delete_reaction(self, reaction: Reaction) -> None:
        await self.db.delete(reaction)
        await self.db.flush()
