"""Add Image model

Revision ID: 99d15920daca
Revises: 
Create Date: 2024-06-24 15:20:04.852151

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '99d15920daca'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('image',
    sa.Column('id', sa.String(length=50), nullable=False),
    sa.Column('filename', sa.String(length=255), nullable=False),
    sa.Column('filepath', sa.String(length=255), nullable=False),
    sa.Column('tags', sa.String(length=255), nullable=False),
    sa.Column('size', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('image')
    # ### end Alembic commands ###
