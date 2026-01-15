"""add session created at to users

Revision ID: 9b3d1c0d4f42
Revises: 4f12b0fdc7d1
Create Date: 2026-03-10 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "9b3d1c0d4f42"
down_revision = "4f12b0fdc7d1"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("users", sa.Column("session_created_at", sa.DateTime(timezone=True), nullable=True))


def downgrade() -> None:
    op.drop_column("users", "session_created_at")
