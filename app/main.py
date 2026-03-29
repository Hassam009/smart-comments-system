from fastapi import FastAPI
from app.api.v1.routers import posts

app = FastAPI()

app.include_router(posts.router, prefix="/api/v1", tags=["Posts"])


@app.get("/")
def root():
    return {"message": "Smart Comments API running"}