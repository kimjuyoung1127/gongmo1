"""add khmer category name

Revision ID: 4f12b0fdc7d1
Revises: 4d3f2f4b7a21
Create Date: 2026-03-01 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4f12b0fdc7d1'
down_revision = '4d3f2f4b7a21'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        'categories',
        sa.Column('name_km', sa.String(length=50), nullable=False, server_default=''),
    )
    op.alter_column('categories', 'name_km', server_default=None)


def downgrade() -> None:
    op.drop_column('categories', 'name_km')
