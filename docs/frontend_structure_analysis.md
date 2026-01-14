# Frontend Structure Analysis & Roadmap

**Date:** 2026-01-10
**Project:** LinkOn (Frontend)
**Based on:** `C:\Users\gmdqn\gongmo1\frontend`

## 1. Overview
This document analyzes the current state of the frontend codebase in relation to the project goals defined in `LOG.md` and `readme.md`.

**Core Goal:** Mobile-first anonymous community platform for foreign workers.
**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS.

## 2. Current Directory Structure
The project is currently in the **initial scaffolding phase**. The structure suggests a mobile-first approach.

```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css      # Global styles (Tailwind directives)
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Landing page
└── components/
    └── mainpage/        # Components specific to the Landing/Home view
        ├── FeatureCard.tsx          # Cards for feature entry points (e.g., Community, AI Help)
        ├── FloatingActionButton.tsx # FAB (likely for "New Post" or primary action)
        ├── MainBottomNav.tsx        # Bottom navigation bar (Mobile standard)
        └── MainHeader.tsx           # Top application bar
```

## 3. Component Analysis
The existing components focus on the **Application Shell** and the **Home View**:
*   **`MainBottomNav` & `MainHeader`**: Establish the core navigation frame, consistent with the "Mobile-first" target audience mentioned in `readme.md`.
*   **`FeatureCard`**: Likely acts as the navigation entry point to different sections (Community, Wages, Safety, etc.) described in the "Key Ideas" of `LOG.md`.

## 4. Gap Analysis (Current vs. Roadmap)

The `readme.md` lists several "MVP Key Features" that are **not yet implemented** in the file structure:

### Missing Routes (`src/app/`)
*   **Community Board:** No routing for board lists (e.g., `src/app/community/page.tsx`) or categories.
*   **Post Details:** No dynamic route for viewing posts (e.g., `src/app/post/[id]/page.tsx`).
*   **Authentication:** No sign-in or profile pages (e.g., `src/app/auth/page.tsx`), although the plan is "Token-based anonymous auth".
*   **AI Assistant:** No dedicated page for the RAG/Translation feature mentioned in `LOG.md`.

### Missing Infrastructure (`src/`)
*   **API Client:** No `services/` or `lib/` folder found for Axios instance configuration or API calls to the FastAPI backend.
*   **Types:** No `types/` folder for shared TypeScript interfaces (e.g., `Post`, `User`, `Comment`).
*   **Context/State:** No `context/` folder for global state (e.g., AuthContext, ThemeContext) mentioned in the tech stack (i18n context).

## 5. Recommended Next Steps
Based on this analysis, the immediate development roadmap should be:

1.  **Define Core Routes:** Create the directory structure for the main features.
    *   `src/app/community/page.tsx`
    *   `src/app/ai-assistant/page.tsx`
    *   `src/app/profile/page.tsx`
2.  **Setup API Layer:** Create `src/lib/api.ts` (or similar) to handle Axios requests to the FastAPI backend (`http://localhost:25050` as per docs).
3.  **Implement Data Types:** Define TypeScript interfaces matching the Backend Pydantic models.
4.  **Expand Components:** Move from just "Main Page" components to "Shared" components (e.g., `PostCard`, `CommentList`).

---
*Reference Documents:*
*   `C:\Users\gmdqn\gongmo11\gongmo1\docs\LOG.md` (Project Vision & Pain Points)
*   `C:\Users\gmdqn\gongmo11\gongmo1\docs\readme.md` (Tech Stack & MVP Features)
