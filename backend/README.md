# WeWorkHere Backend

FastAPI backend for WeWorkHere - 외국인 노동자 익명 커뮤니티 플랫폼

## Tech Stack

- **Framework**: FastAPI 0.109.0
- **Language**: Python 3.11
- **ORM**: SQLAlchemy 2.0 (Async)
- **Database**: PostgreSQL 15
- **Migrations**: Alembic 1.13.1
- **Server**: Uvicorn 0.27.0

## Architecture

Strict 3-layer architecture:

```
Router → Service → Repository → Database
```

- **Router Layer** (`app/routers/`): HTTP request/response handling only
- **Service Layer** (`app/services/`): ALL business logic
- **Repository Layer** (`app/repositories/`): Database operations only

## Directory Structure

```
backend/
├── app/
│   ├── main.py                  # FastAPI entry point
│   ├── core/
│   │   ├── config.py            # Pydantic settings
│   │   ├── database.py          # Async SQLAlchemy setup
│   │   └── dependencies.py      # FastAPI dependencies
│   ├── models/                  # SQLAlchemy ORM models
│   │   ├── user.py
│   │   ├── category.py
│   │   ├── post.py
│   │   ├── comment.py
│   │   └── reaction.py
│   ├── schemas/                 # Pydantic DTOs
│   │   ├── user_schema.py
│   │   ├── category_schema.py
│   │   ├── post_schema.py
│   │   └── comment_schema.py
│   ├── repositories/            # Database access layer
│   │   ├── base.py              # Generic CRUD operations
│   │   ├── user_repository.py
│   │   ├── category_repository.py
│   │   ├── post_repository.py
│   │   └── comment_repository.py
│   ├── services/                # Business logic layer
│   │   ├── auth_service.py
│   │   ├── post_service.py
│   │   └── comment_service.py
│   └── routers/                 # API endpoints
│       ├── health_router.py
│       ├── auth_router.py
│       ├── category_router.py
│       ├── post_router.py
│       └── comment_router.py
├── alembic/                     # Database migrations
│   ├── env.py
│   ├── script.py.mako
│   └── versions/
├── requirements.txt
├── Dockerfile
├── .dockerignore
├── .env.example
└── alembic.ini
```

## API Endpoints

### Health
- `GET /` - Root endpoint
- `GET /health` - Health check

### Authentication (Anonymous)
- `POST /api/v1/auth/anonymous` - Create anonymous user (returns session token)
- `GET /api/v1/auth/me` - Get current user info

### Categories
- `GET /api/v1/categories` - Get all categories

### Posts
- `POST /api/v1/posts` - Create post (requires auth)
- `GET /api/v1/posts` - Get posts with pagination (optional category filter)
- `GET /api/v1/posts/{post_id}` - Get post detail (increments view count)
- `PUT /api/v1/posts/{post_id}` - Update post (author only)
- `DELETE /api/v1/posts/{post_id}` - Delete post (author only)
- `POST /api/v1/posts/{post_id}/like` - Toggle like (requires auth)

### Comments
- `POST /api/v1/posts/{post_id}/comments` - Create comment (requires auth)
- `GET /api/v1/posts/{post_id}/comments` - Get comments for post
- `DELETE /api/v1/posts/{post_id}/comments/{comment_id}` - Delete comment (author only)

## Authentication

Session-based authentication using custom token headers:

1. Client creates anonymous user: `POST /api/v1/auth/anonymous`
2. Server returns `session_token` in response
3. Client stores token and sends in header: `X-Session-Token: <token>`
4. Server validates token using `get_current_user` dependency

**Session Duration**: 720 hours (30 days) from creation

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
```env
POSTGRES_USER=weworkhere_user
POSTGRES_PASSWORD=weworkhere_password
POSTGRES_DB=weworkhere_db
POSTGRES_SERVER=db
BACKEND_PORT=25050
ALLOWED_ORIGINS=http://localhost:24050
JWT_SECRET_KEY=your-secret-key-here
```

### 2. Install Dependencies

**IMPORTANT: Always activate virtual environment first!**

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Database Setup

Ensure PostgreSQL is running, then run migrations:

```bash
# Apply all migrations
alembic upgrade head
```

### 4. Run Development Server

```bash
# Make sure virtual environment is activated!
source venv/bin/activate

# Run server
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 25050 --reload
```

API will be available at:
- API: http://localhost:25050
- Docs: http://localhost:25050/docs
- ReDoc: http://localhost:25050/redoc

## Database Migrations

### Create New Migration

```bash
# After modifying models
alembic revision --autogenerate -m "description of changes"
```

### Apply Migrations

```bash
alembic upgrade head
```

### Rollback Migration

```bash
alembic downgrade -1
```

## Docker Deployment

The backend is containerized and can be run with Docker Compose (see root `docker-compose.yml`).

```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f backend

# Stop
docker-compose down
```

## Code Standards

### Type Hints Required

All functions must have complete type hints:

```python
async def create_post(self, user_id: int, post_data: PostCreate) -> Post:
    pass
```

### Layer Separation

- **Routers**: NO business logic, NO direct DB access
- **Services**: NO HTTP handling, NO SQLAlchemy queries
- **Repositories**: NO business logic, ONLY database operations

### Naming Conventions

- Files: `snake_case.py` (e.g., `user_repository.py`)
- Classes: `PascalCase` (e.g., `UserRepository`)
- Functions/Variables: `snake_case` (e.g., `get_user_by_id`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `SESSION_EXPIRE_HOURS`)

## Database Schema

### users
- `id` (PK)
- `nickname` (string, 50)
- `session_token` (string, unique, indexed)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### categories
- `id` (PK)
- `name_ko`, `name_en`, `name_vi`, `name_ne` (string, 50)
- `slug` (string, unique, indexed)

### posts
- `id` (PK)
- `user_id` (FK → users)
- `category_id` (FK → categories, nullable)
- `title` (string, 200)
- `content` (text)
- `image_url` (string, 500, nullable)
- `view_count` (integer, default 0)
- `like_count` (integer, default 0)
- `created_at`, `updated_at`

### comments
- `id` (PK)
- `post_id` (FK → posts)
- `user_id` (FK → users)
- `content` (text)
- `created_at`, `updated_at`

### reactions
- `id` (PK)
- `post_id` (FK → posts)
- `user_id` (FK → users)
- `type` (string, 20) - e.g., 'like', 'heart', 'fire'
- Unique constraint: (post_id, user_id, type)

## Development Tips

1. Always activate venv before running any commands
2. Use `alembic upgrade head` after pulling DB schema changes
3. Test endpoints using `/docs` (Swagger UI)
4. Check logs for SQL queries when `DB_ECHO=True`
5. Follow 3-layer architecture strictly - never skip layers

## Troubleshooting

### Import errors
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt`

### Database connection errors
- Check PostgreSQL is running
- Verify DATABASE_URL in `.env`
- Test connection: `psql -h localhost -U weworkhere_user -d weworkhere_db`

### Migration errors
- Check all models are imported in `alembic/env.py`
- Verify database is accessible
- Try `alembic downgrade -1` then `alembic upgrade head`

## License

Proprietary - WeWorkHere Platform
