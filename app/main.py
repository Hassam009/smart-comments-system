from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routers import posts, comments
from app.db.sessions import engine
from app.db.base import Base

import app.models.post
import app.models.comment

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posts.router, prefix="/api/v1", tags=["Posts"])
app.include_router(comments.router, prefix="/api/v1/comments", tags=["Comments/Moderation"])


@app.get("/")
def root():
    return {"message": "Smart Comments API running"}