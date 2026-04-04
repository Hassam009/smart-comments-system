from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.sessions import get_db
from app.repository import comments_repo
from app.schemas.comment import CommentRead

router = APIRouter()

@router.get("/flagged", response_model=list[CommentRead])
async def get_flagged_comments(db: AsyncSession = Depends(get_db)):
    """Retrieve all comments that have been flagged as 'needs_review'."""
    return await comments_repo.get_flagged_comments(db)

@router.put("/{comment_id}/approve", response_model=CommentRead)
async def approve_comment(comment_id: int, db: AsyncSession = Depends(get_db)):
    """Mark a flagged comment as safe."""
    comment = await comments_repo.approve_comment(db, comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment

@router.delete("/{comment_id}")
async def delete_comment(comment_id: int, db: AsyncSession = Depends(get_db)):
    """Permanently delete a comment."""
    success = await comments_repo.delete_comment(db, comment_id)
    if not success:
        raise HTTPException(status_code=404, detail="Comment not found")
    return {"message": "Comment deleted successfully"}
