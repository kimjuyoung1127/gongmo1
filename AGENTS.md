# Repository Guidelines

## Project Structure & Module Organization
- `frontend/`: Next.js app. Core code lives in `frontend/src/` with `app/` routes, `components/` (atoms/molecules/organisms), `hooks/`, `services/`, `types/`, and `dictionaries/` for i18n.
- `backend/`: FastAPI app. Entry at `backend/app/main.py` with `routers/`, `services/`, `repositories/`, `models/`, and `schemas/`. DB migrations are in `backend/alembic/`.
- `docs/` holds reference material; `docker-compose.yml` runs the full stack; `.env` stores local configuration.

## Build, Test, and Development Commands
- `docker-compose up -d --build`: build and run DB, backend, and frontend together.
- `docker-compose logs -f`: follow service logs; `docker-compose down` stops everything.
- `cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt`: backend setup.
- `cd backend && alembic upgrade head`: apply DB migrations.
- `cd backend && python3 -m uvicorn app.main:app --host 0.0.0.0 --port 25050 --reload`: run API locally.
- `cd frontend && npm install`: install frontend dependencies.
- `cd frontend && npm run dev`: start Next.js dev server on `http://localhost:24050`.
- `cd frontend && npm run build` / `npm start`: production build and serve.
- `cd frontend && npm run lint`: ESLint via Next.js config.

## Coding Style & Naming Conventions
- Python: type hints required, files/functions in `snake_case`, classes in `PascalCase`, constants in `UPPER_SNAKE_CASE`.
- TypeScript: `camelCase` variables, `PascalCase` components, hooks in `useX.ts`, component files in `PascalCase.tsx`.
- Architecture rules: frontend `organisms → hooks → services`; backend `router → service → repository`. Do not skip layers.

## Testing Guidelines
- No automated test suite is wired in this repo yet. If adding tests, place them under `backend/tests/` and `frontend/__tests__/`, and introduce the corresponding `pytest`/`npm test` scripts.

## Commit & Pull Request Guidelines
- Git history has no commits yet, so no existing convention. Use concise, imperative messages (e.g., `feat: add post filter`) and keep commits focused.
- PRs should include a short summary, relevant commands run, and screenshots for UI changes; link issues when applicable.

## Security & Configuration Tips
- Keep secrets and URLs in `.env` (root) or `.env.local` (frontend); never hardcode API keys or ports.
- Authenticated API calls use `X-Session-Token`; avoid logging tokens or personal data.
