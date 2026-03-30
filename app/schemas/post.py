from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

# Forward declare CommentRead if needed, or we import later
from app.schemas.comment import CommentRead

class PostBase(BaseModel):
    title: str
    body: str

class PostCreate(PostBase):
    pass

class PostRead(PostBase):
    id: int
    created_at: datetime
    comments: List[CommentRead] = []

    class Config:
        from_attributes = True
