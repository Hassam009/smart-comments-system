# Smart Comments App (FastAPI + React)

## 📌 Overview

This project is a minimal full-stack "Smart Comments" system built using **FastAPI (backend)** and **React (frontend)**.

It allows users to:

* View blog posts
* Add comments to posts
* Automatically classify comments as **safe** or **needs review**
* Highlight flagged comments for moderation

---

## 🧠 Key Features

### Backend (FastAPI)

* REST API for posts and comments
* Async PostgreSQL integration using SQLAlchemy + asyncpg
* Automatic request validation using Pydantic
* Comment classification system (rule-based)
* Clean modular architecture (routers, services, models)

### Frontend (React + TypeScript)

* Display posts and comments
* Add new comments
* Highlight flagged comments
* (Optional) Moderator view for flagged comments

---

## ⚙️ Tech Stack

### Backend

* FastAPI
* SQLAlchemy (Async)
* PostgreSQL
* asyncpg
* Pydantic
* pydantic-settings

### Frontend

* React
* TypeScript
* Axios / Fetch API

---

## 🧱 Project Structure (Backend)

```
app/
├── api/            # API routes
├── core/           # Config and settings
├── db/             # Database connection
├── models/         # SQLAlchemy models
├── schemas/        # Pydantic schemas
├── services/       # Business logic + classifier
└── main.py         # Entry point
```

---

## 🔁 Comment Classification Flow

1. User submits a comment
2. Backend receives request
3. Classification logic runs (rule-based)
4. If flagged → `flagged = true`
5. Comment saved in database
6. Response returned to client

---

## 🚀 Getting Started

### 1. Clone Repo

```
git clone https://github.com/your-username/smart-comments-fastapi.git
cd smart-comments-fastapi
```

### 2. Setup Virtual Environment

```
python -m venv venv
venv\Scripts\activate   # Windows
```

### 3. Install Dependencies

```
pip install -r requirements.txt
```

### 4. Setup Environment Variables

Create `.env` file:

```
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/smart_comments
```

### 5. Run Server

```
uvicorn app.main:app --reload
```

---

## 📘 API Endpoints

* `GET /api/v1/posts` → List posts
* `GET /api/v1/posts/{id}` → Get post with comments
* `POST /api/v1/posts/{id}/comments` → Add comment

---

## 🧪 Future Improvements

* AI-based classification (OpenAI / HuggingFace)
* Authentication system
* Pagination & filtering
* Unit and integration testing
* Docker setup
* CI/CD pipeline

---

## 🧠 Design Decisions

* Separation of concerns (routers, services, models)
* Async DB for scalability
* Pluggable classification component
* Clean and maintainable folder structure

---

## 📄 License

This project is for evaluation purposes.
