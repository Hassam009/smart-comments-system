from sqlalchemy.ext.asyncio import AsyncSession
from app.repository import comments_repo
from app.services.classifier import classify_text
from app.schemas.comment import CommentCreate

async def create_new_comment(db: AsyncSession, post_id: int, comment_data: CommentCreate):
    classification_result = classify_text(comment_data.text)
    
    flagged = classification_result == "needs_review"
    
    new_comment = await comments_repo.create_comment(
        db=db,
        post_id=post_id,
        comment_data=comment_data,
        flagged=flagged
    )
    
    return new_comment
