from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CommentBase(BaseModel):
    text: str
    author: str

class CommentCreate(CommentBase):
    pass

class CommentRead(CommentBase):
    id: int
    post_id: int
    created_at: datetime
    flagged: bool

    class Config:
        from_attributes = True
