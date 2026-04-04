from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from app.schemas.comment import CommentRead

class PostBase(BaseModel):
    title: str
    body: str

class PostCreate(PostBase):
    pass

class PostRead(PostBase):
    """Simple view for summaries and lists."""
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class PostReadDetail(PostRead):
    """Detailed view including all comments."""
    comments: List[CommentRead] = []
