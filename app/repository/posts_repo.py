from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.models.post import Post
from app.schemas.post import PostCreate

async def get_posts(db: AsyncSession):
    result = await db.execute(select(Post))
    return result.scalars().all()

async def get_post(db: AsyncSession, post_id: int):
    result = await db.execute(
        select(Post)
        .where(Post.id == post_id)
        .options(selectinload(Post.comments))
    )
    return result.scalar_one_or_none()

async def create_post(db: AsyncSession, post_data: PostCreate):
    new_post = Post(
        title=post_data.title,
        body=post_data.body
    )
    db.add(new_post)
    await db.commit()
    await db.refresh(new_post)
    return new_post
