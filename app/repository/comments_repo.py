from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.comment import Comment
from app.schemas.comment import CommentCreate

async def create_comment(db: AsyncSession, post_id: int, comment_data: CommentCreate, flagged: bool):
    new_comment = Comment(
        text=comment_data.text,
        author=comment_data.author,
        post_id=post_id,
        flagged=flagged
    )
    db.add(new_comment)
    await db.commit()
    await db.refresh(new_comment)
    return new_comment

async def get_flagged_comments(db: AsyncSession):
    result = await db.execute(select(Comment).where(Comment.flagged == True))
    return result.scalars().all()

async def approve_comment(db: AsyncSession, comment_id: int):
    result = await db.execute(select(Comment).where(Comment.id == comment_id))
    comment = result.scalar_one_or_none()
    if comment:
        comment.flagged = False
        await db.commit()
        await db.refresh(comment)
    return comment

async def delete_comment(db: AsyncSession, comment_id: int):
    result = await db.execute(select(Comment).where(Comment.id == comment_id))
    comment = result.scalar_one_or_none()
    if comment:
        await db.delete(comment)
        await db.commit()
        return True
    return False
