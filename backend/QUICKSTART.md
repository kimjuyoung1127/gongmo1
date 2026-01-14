# LinkOn Backend - Quick Start Guide

## Immediate Setup (5 Minutes)

### Step 1: Install Dependencies

```bash
cd /Users/mac/Desktop/homeserver/LinkOn/backend

# Create virtual environment
python3 -m venv venv

# Activate (CRITICAL - do this EVERY time!)
source venv/bin/activate

# Install packages
pip install -r requirements.txt
```

### Step 2: Configure Environment

```bash
# Copy example to .env
cp .env.example .env

# Edit .env if needed (defaults work for local dev)
# Default values:
# - Database: linkon_user/linkon_password/linkon_db
# - Port: 25050
# - CORS: http://localhost:24050
```

### Step 3: Start PostgreSQL

**Option A - Docker (Recommended)**:
```bash
# From project root
docker-compose up -d db
```

**Option B - Local PostgreSQL**:
```bash
# Create database
createdb -U postgres linkon_db

# Update .env with your PostgreSQL credentials
POSTGRES_SERVER=localhost
```

### Step 4: Run Migrations

```bash
# Make sure venv is activated!
source venv/bin/activate

# Apply migrations
alembic upgrade head
```

### Step 5: Start Server

```bash
# Development server with auto-reload
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 25050 --reload
```

### Step 6: Test API

Open browser to:
- **API Docs**: http://localhost:25050/docs
- **Health Check**: http://localhost:25050/health

## Quick Test Sequence

### 1. Create Anonymous User

```bash
curl -X POST http://localhost:25050/api/v1/auth/anonymous \
  -H "Content-Type: application/json" \
  -d '{"nickname": "TestUser"}'
```

Response:
```json
{
  "id": 1,
  "nickname": "TestUser",
  "session_token": "abc123...",
  "created_at": "2026-01-08T22:00:00Z",
  "updated_at": "2026-01-08T22:00:00Z"
}
```

**SAVE THE SESSION_TOKEN!**

### 2. Get Current User

```bash
curl http://localhost:25050/api/v1/auth/me \
  -H "X-Session-Token: YOUR_TOKEN_HERE"
```

### 3. Create Post

```bash
curl -X POST http://localhost:25050/api/v1/posts \
  -H "Content-Type: application/json" \
  -H "X-Session-Token: YOUR_TOKEN_HERE" \
  -d '{
    "title": "My First Post",
    "content": "Hello LinkOn!"
  }'
```

### 4. Get Posts

```bash
curl http://localhost:25050/api/v1/posts?page=1&page_size=20
```

### 5. Get Post Detail

```bash
curl http://localhost:25050/api/v1/posts/1
```

### 6. Add Comment

```bash
curl -X POST http://localhost:25050/api/v1/posts/1/comments \
  -H "Content-Type: application/json" \
  -H "X-Session-Token: YOUR_TOKEN_HERE" \
  -d '{"content": "Great post!"}'
```

## Common Commands

### Database Migrations

```bash
# Create new migration (after model changes)
alembic revision --autogenerate -m "Add new field"

# Apply migrations
alembic upgrade head

# Rollback last migration
alembic downgrade -1
```

### Development

```bash
# Start server (with auto-reload)
python3 -m uvicorn app.main:app --reload --port 25050

# Check logs (if using Docker)
docker-compose logs -f backend
```

### Docker

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build backend
```

## Troubleshooting

### "ModuleNotFoundError"
```bash
# Ensure venv is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### "Could not connect to database"
```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Or if local:
pg_isready -U postgres
```

### "Alembic migration failed"
```bash
# Check database connection
psql -h localhost -U linkon_user -d linkon_db

# Verify all models are imported in alembic/env.py
# Try fresh migration
alembic downgrade base
alembic upgrade head
```

### Port 25050 already in use
```bash
# Find process
lsof -i :25050

# Kill process
kill -9 <PID>
```

## API Endpoints Quick Reference

| Method | Endpoint | Auth? | Description |
|--------|----------|-------|-------------|
| GET | `/` | No | Root endpoint |
| GET | `/health` | No | Health check |
| POST | `/api/v1/auth/anonymous` | No | Create user |
| GET | `/api/v1/auth/me` | Yes | Get current user |
| GET | `/api/v1/categories` | No | List categories |
| POST | `/api/v1/posts` | Yes | Create post |
| GET | `/api/v1/posts` | No | List posts |
| GET | `/api/v1/posts/{id}` | No | Get post |
| PUT | `/api/v1/posts/{id}` | Yes | Update post |
| DELETE | `/api/v1/posts/{id}` | Yes | Delete post |
| POST | `/api/v1/posts/{id}/like` | Yes | Toggle like |
| POST | `/api/v1/posts/{id}/comments` | Yes | Create comment |
| GET | `/api/v1/posts/{id}/comments` | No | List comments |
| DELETE | `/api/v1/posts/{id}/comments/{cid}` | Yes | Delete comment |

**Auth**: Send `X-Session-Token` header with session token from `/auth/anonymous`

## Next Steps

1. Seed categories (Korean/English/Vietnamese/Nepali)
2. Implement frontend (Next.js)
3. Add image upload support
4. Implement full reaction system
5. Add search functionality
6. Deploy to production

## Project Structure Quick View

```
backend/
├── app/
│   ├── main.py              # Start here
│   ├── core/                # Config, database, dependencies
│   ├── models/              # Database models
│   ├── schemas/             # API request/response schemas
│   ├── repositories/        # Database queries
│   ├── services/            # Business logic
│   └── routers/             # API endpoints
├── alembic/                 # Database migrations
├── requirements.txt         # Python packages
└── .env                     # Configuration (create from .env.example)
```

## Support

- API Documentation: http://localhost:25050/docs (when running)
- Full README: `/Users/mac/Desktop/homeserver/LinkOn/backend/README.md`
- Implementation Summary: `/Users/mac/Desktop/homeserver/LinkOn/backend/IMPLEMENTATION_SUMMARY.md`

---

**Ready to code!** 🚀
