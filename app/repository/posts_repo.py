from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.models.post import Post
from app.schemas.post import PostCreate

async def get_posts(db: AsyncSession):
    """Retrieve all posts from the database."""
    result = await db.execute(select(Post))
    return result.scalars().all()

async def get_post(db: AsyncSession, post_id: int):
    """Retrieve a single post by its ID, including its comments."""
    # We use selectinload to eagerly load the comments relationship
    result = await db.execute(
        select(Post)
        .where(Post.id == post_id)
        .options(selectinload(Post.comments))
    )
    return result.scalar_one_or_none()

async def create_post(db: AsyncSession, post_data: PostCreate):
    """Create a new post in the database."""
    new_post = Post(
        title=post_data.title,
        body=post_data.body
    )
    db.add(new_post)
    await db.commit()
    await db.refresh(new_post)
    return new_post
