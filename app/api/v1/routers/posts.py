from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.sessions import get_db
from app.schemas.post import PostCreate, PostRead, PostReadDetail
from app.schemas.comment import CommentCreate, CommentRead
from app.repository import posts_repo, comments_repo
from app.services.comment_service import create_new_comment

router = APIRouter()

@router.get("/posts", response_model=List[PostRead])
async def list_posts(db: AsyncSession = Depends(get_db)):
    """List all blog posts."""
    return await posts_repo.get_posts(db)

@router.get("/posts/{post_id}", response_model=PostReadDetail)
async def get_post(post_id: int, db: AsyncSession = Depends(get_db)):
    """Get a single post by ID including its comments."""
    post = await posts_repo.get_post(db, post_id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )
    return post

@router.post("/posts", response_model=PostRead, status_code=status.HTTP_201_CREATED)
async def create_post(post_data: PostCreate, db: AsyncSession = Depends(get_db)):
    """Create a new post."""
    return await posts_repo.create_post(db, post_data)

@router.post("/posts/{post_id}/comments", response_model=CommentRead, status_code=status.HTTP_201_CREATED)
async def add_comment(post_id: int, comment_data: CommentCreate, db: AsyncSession = Depends(get_db)):
    """Add a comment to a post. Triggers automatic classification."""
    # First, verify if the post exists
    post = await posts_repo.get_post(db, post_id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )
    
    # We use the comment service to orchestrate classification and persistence
    return await create_new_comment(db, post_id, comment_data)

@router.get("/comments/flagged", response_model=List[CommentRead])
async def list_flagged_comments(db: AsyncSession = Depends(get_db)):
    """Moderator view: Retrieve all comments flagged for review."""
    return await comments_repo.get_flagged_comments(db)
