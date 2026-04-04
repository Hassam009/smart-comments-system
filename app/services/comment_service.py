from sqlalchemy.ext.asyncio import AsyncSession
from app.repository import comments_repo
from app.services.classifier import classify_text
from app.schemas.comment import CommentCreate

async def create_new_comment(db: AsyncSession, post_id: int, comment_data: CommentCreate):
    """
    Handle the creation and classification of a new comment.
    
    1. Classify the text
    2. Flag the comment if needed
    3. Save the comment to the database
    4. Return the newly created comment object
    """
    # 1. Classification Step
    classification_result = classify_text(comment_data.text)
    
    # 2. Flagging Step
    # We set flagged=True if the classifier says 'needs_review'
    flagged = classification_result == "needs_review"
    
    # 3. DB Persistence Step
    # We call the repository to save the final comment record
    new_comment = await comments_repo.create_comment(
        db=db,
        post_id=post_id,
        comment_data=comment_data,
        flagged=flagged
    )
    
    # 4. Return Final Object
    return new_comment
