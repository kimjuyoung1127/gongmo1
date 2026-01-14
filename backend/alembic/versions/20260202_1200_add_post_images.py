"""add post images

Revision ID: 4d3f2f4b7a21
Revises: 8a1adca98929
Create Date: 2026-02-02 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4d3f2f4b7a21'
down_revision = '8a1adca98929'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'post_images',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('post_id', sa.Integer(), nullable=False),
        sa.Column('url', sa.String(length=500), nullable=False),
        sa.Column('sort_order', sa.Integer(), server_default='0', nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_post_images_id'), 'post_images', ['id'], unique=False)
    op.create_index(op.f('ix_post_images_post_id'), 'post_images', ['post_id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_post_images_post_id'), table_name='post_images')
    op.drop_index(op.f('ix_post_images_id'), table_name='post_images')
    op.drop_table('post_images')
