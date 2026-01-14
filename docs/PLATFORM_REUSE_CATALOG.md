# PLATFORM REUSE CATALOG - WeWorkHere

> 외국인 노동자 익명 커뮤니티 플랫폼의 재사용 가능한 코드 카탈로그

## 프로젝트 개요

**Domain**: weworkhere.alldatabox.com (예정)
**Ports**: Frontend 24050, Backend 25050, Database 5443
**Tech Stack**: Next.js 14, TypeScript, FastAPI, PostgreSQL
**Purpose**: 외국인 노동자를 위한 익명 게시판 커뮤니티 (다국어 지원)

---

## 📦 FRONTEND COMPONENTS

### Atoms (10-30 lines)

| Component | Path | Props | Purpose | Reusability |
|-----------|------|-------|---------|-------------|
| **Button** | `frontend/src/components/atoms/Button.tsx` | `children, onClick?, type?, variant?, disabled?, className?` | 3가지 variant (primary/secondary/danger) | ⭐⭐⭐⭐⭐ |
| **Input** | `frontend/src/components/atoms/Input.tsx` | `type?, value, onChange, placeholder?, label?, required?, className?` | 라벨 지원 텍스트 입력 | ⭐⭐⭐⭐⭐ |
| **Textarea** | `frontend/src/components/atoms/Textarea.tsx` | `value, onChange, placeholder?, label?, rows?, required?, className?` | 다중 라인 텍스트 입력 | ⭐⭐⭐⭐⭐ |
| **Select** | `frontend/src/components/atoms/Select.tsx` | `value, onChange, options, label?, placeholder?, required?, className?` | 드롭다운 선택 | ⭐⭐⭐⭐⭐ |
| **Badge** | `frontend/src/components/atoms/Badge.tsx` | `children, variant?, className?` | 색상 코드 배지 (primary/secondary/success/danger) | ⭐⭐⭐⭐⭐ |
| **Card** | `frontend/src/components/atoms/Card.tsx` | `children, title?, className?` | 컨테이너 카드 | ⭐⭐⭐⭐⭐ |
| **LoadingSpinner** | `frontend/src/components/atoms/LoadingSpinner.tsx` | `size?, className?` | 로딩 인디케이터 | ⭐⭐⭐⭐⭐ |
| **Alert** | `frontend/src/components/atoms/Alert.tsx` | `children, type?, onClose?, className?` | 알림/에러 메시지 박스 (info/success/warning/error) | ⭐⭐⭐⭐⭐ |

**재사용 팁**: Button, Input, Card는 모든 프로젝트에서 그대로 사용 가능. variant prop으로 다양한 스타일 지원.

### Molecules (30-80 lines)

| Component | Path | Props | Used Atoms | Reusability |
|-----------|------|-------|-----------|-------------|
| **PostCard** | `frontend/src/components/molecules/PostCard.tsx` | `post: Post, onClick?` | Card, Badge | ⭐⭐⭐⭐ |
| **CommentItem** | `frontend/src/components/molecules/CommentItem.tsx` | `comment: Comment, onDelete?, currentUserId?` | Card, Button | ⭐⭐⭐⭐ |
| **CategoryFilter** | `frontend/src/components/molecules/CategoryFilter.tsx` | `categories: Category[], selected?, onSelect` | Badge, Button | ⭐⭐⭐⭐ |
| **LanguageSwitcher** | `frontend/src/components/molecules/LanguageSwitcher.tsx` | `currentLang: string` | Button | ⭐⭐⭐⭐⭐ |
| **UserDisplay** | `frontend/src/components/molecules/UserDisplay.tsx` | `user: User \| null, onLogout?` | Button | ⭐⭐⭐ |

**재사용 팁**: LanguageSwitcher는 다국어를 지원하는 모든 프로젝트에서 재사용 가능. PostCard와 CommentItem은 커뮤니티/게시판 프로젝트에 적용 가능.

### Organisms (80-150 lines)

| Component | Path | State Management | Purpose | Reusability |
|-----------|------|-----------------|---------|-------------|
| **PostList** | `frontend/src/components/organisms/PostList.tsx` | Props only | 게시글 목록 + 페이지네이션 | ⭐⭐⭐⭐ |
| **PostForm** | `frontend/src/components/organisms/PostForm.tsx` | Local state | 게시글 생성/수정 폼 | ⭐⭐⭐⭐ |
| **CommentSection** | `frontend/src/components/organisms/CommentSection.tsx` | useComments hook | 댓글 목록 + 작성 폼 | ⭐⭐⭐⭐ |
| **Header** | `frontend/src/components/organisms/Header.tsx` | Props + useAuth | 앱 헤더 (로고, 언어 스위처, 사용자 정보) | ⭐⭐⭐ |

**재사용 팁**: PostList, PostForm, CommentSection은 블로그/포럼/커뮤니티 프로젝트에 적용 가능. 카테고리 및 타입만 조정하면 됨.

---

## 🎣 HOOKS

| Hook | Path | Return Type | Purpose | Reusability |
|------|------|-------------|---------|-------------|
| **useAuth** | `frontend/src/hooks/useAuth.ts` | `{user, isLoading, login, logout, refreshUser}` | 익명 세션 인증 관리 | ⭐⭐⭐⭐ |
| **usePosts** | `frontend/src/hooks/usePosts.ts` | `{posts, total, isLoading, error, fetchPosts, refetch}` | 게시글 목록 + 페이지네이션 | ⭐⭐⭐⭐ |
| **usePost** | `frontend/src/hooks/usePost.ts` | `{post, isLoading, error, fetchPost, createPost, updatePost, deletePost, likePost}` | 단일 게시글 CRUD + 좋아요 | ⭐⭐⭐⭐ |
| **useComments** | `frontend/src/hooks/useComments.ts` | `{comments, isLoading, error, fetchComments, createComment, deleteComment}` | 댓글 CRUD | ⭐⭐⭐⭐ |
| **useDictionary** | `frontend/src/hooks/useDictionary.ts` | `Dictionary` | i18n 번역 접근 | ⭐⭐⭐⭐⭐ |

**재사용 팁**: useDictionary는 다국어 프로젝트 모두에서 재사용 가능. useAuth는 익명 인증 외에도 JWT/OAuth 패턴으로 확장 가능. usePosts, useComments는 게시판/블로그 프로젝트에 직접 적용 가능.

---

## 🌐 SERVICES (API Clients)

| Service | Path | Endpoints | Request/Response | Reusability |
|---------|------|-----------|------------------|-------------|
| **apiClient** | `frontend/src/services/apiClient.ts` | N/A - Base client | Axios 인스턴스, 인터셉터로 세션 토큰 주입 | ⭐⭐⭐⭐⭐ |
| **authService** | `frontend/src/services/authService.ts` | `POST /auth/anonymous`, `GET /auth/me` | AnonymousLoginRequest → AnonymousLoginResponse | ⭐⭐⭐⭐ |
| **postService** | `frontend/src/services/postService.ts` | 6 endpoints (CRUD + like) | PostCreate → PostResponse | ⭐⭐⭐⭐ |
| **commentService** | `frontend/src/services/commentService.ts` | 3 endpoints (get, create, delete) | CommentCreate → CommentResponse | ⭐⭐⭐⭐ |
| **categoryService** | `frontend/src/services/categoryService.ts` | `GET /categories` | 없음 → Category[] | ⭐⭐⭐⭐⭐ |

**재사용 팁**: apiClient는 모든 프로젝트의 기본 HTTP 클라이언트로 사용 가능. 인터셉터 패턴(토큰 주입, 에러 처리)은 표준화됨.

---

## 📘 TYPES

| File | Key Types | Reusability |
|------|-----------|-------------|
| **user.ts** | `User, AnonymousLoginRequest, AnonymousLoginResponse` | ⭐⭐⭐⭐ |
| **post.ts** | `Post, PostCreate, PostUpdate, PostListResponse` | ⭐⭐⭐⭐ |
| **comment.ts** | `Comment, CommentCreate` | ⭐⭐⭐⭐ |
| **category.ts** | `Category` (다국어 name 필드) | ⭐⭐⭐⭐ |
| **common.ts** | `ApiResponse<T>, PaginationParams, PaginatedResponse<T>` | ⭐⭐⭐⭐⭐ |

**재사용 팁**: common.ts의 제네릭 타입(ApiResponse, PaginatedResponse)은 모든 REST API 프로젝트에서 재사용 가능.

---

## 🎨 TAILWIND PATTERNS

### Button Variants
```css
primary: bg-blue-600 hover:bg-blue-700 text-white
secondary: bg-gray-200 hover:bg-gray-300 text-gray-800
danger: bg-red-600 hover:bg-red-700 text-white
```

### Badge Variants
```css
primary: bg-blue-100 text-blue-800
secondary: bg-gray-100 text-gray-800
success: bg-green-100 text-green-800
danger: bg-red-100 text-red-800
```

### Interactive States
```css
hover: hover:shadow-lg transition-shadow
disabled: disabled:bg-gray-300 disabled:cursor-not-allowed
focus: focus:outline-none focus:ring-2 focus:ring-blue-500
```

### Responsive Grid
```css
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
```

---

## 🔧 BACKEND MODELS

| Model | Table | Key Columns | Relationships | Reusability |
|-------|-------|-------------|---------------|-------------|
| **User** | `users` | nickname, session_token (unique, indexed) | posts, comments (1:N) | ⭐⭐⭐⭐ |
| **Category** | `categories` | name_ko, name_en, name_vi, name_ne, slug | posts (1:N) | ⭐⭐⭐⭐ |
| **Post** | `posts` | user_id, category_id, title, content, image_url, view_count, like_count | user, category, comments (N:1, 1:N) | ⭐⭐⭐⭐ |
| **Comment** | `comments` | post_id, user_id, content | user, post (N:1) | ⭐⭐⭐⭐ |
| **Reaction** | `reactions` | post_id, user_id, type | user, post (N:1) | ⭐⭐⭐⭐ |

**재사용 팁**: User, Post, Comment는 커뮤니티/블로그/포럼 프로젝트의 기본 모델. Category는 다국어 이름 필드가 있어 다국어 프로젝트에 적용 가능.

---

## 🔌 BACKEND ROUTERS

| Router | Prefix | Key Endpoints | Reusability |
|--------|--------|---------------|-------------|
| **health_router** | `/` | `GET /`, `GET /health` | ⭐⭐⭐⭐⭐ |
| **auth_router** | `/auth` | `POST /anonymous`, `GET /me` | ⭐⭐⭐⭐ |
| **category_router** | `/categories` | `GET /` | ⭐⭐⭐⭐⭐ |
| **post_router** | `/posts` | CRUD + `POST /{id}/like` | ⭐⭐⭐⭐ |
| **comment_router** | `/comments` | `GET /posts/{post_id}/comments`, `POST /posts/{post_id}/comments`, `DELETE /{id}` | ⭐⭐⭐⭐ |

**재사용 팁**: health_router는 모든 프로젝트에서 동일하게 사용 가능. auth_router는 익명 인증 외에도 OAuth/JWT로 확장 가능. post_router, comment_router는 게시판/블로그 프로젝트에 직접 적용.

---

## 💼 BACKEND SERVICES

| Service | Path | Key Methods | Reusability |
|---------|------|-------------|-------------|
| **AuthService** | `backend/app/services/auth_service.py` | `create_anonymous_user(nickname)`, `validate_session(token)` | ⭐⭐⭐⭐ |
| **PostService** | `backend/app/services/post_service.py` | `get_posts(skip, limit, category_id)`, `create_post()`, `update_post()`, `delete_post()`, `like_post()` | ⭐⭐⭐⭐ |
| **CommentService** | `backend/app/services/comment_service.py` | `get_comments(post_id)`, `create_comment()`, `delete_comment()` | ⭐⭐⭐⭐ |

**재사용 팁**: 세션 토큰 생성 로직(`secrets.token_urlsafe(32)`)은 모든 익명 인증 프로젝트에서 재사용 가능. CRUD 패턴은 모든 도메인에 적용 가능.

---

## 📊 BACKEND REPOSITORIES

| Repository | Path | Custom Methods | Reusability |
|------------|------|----------------|-------------|
| **BaseRepository** | `backend/app/repositories/base.py` | `get_by_id()`, `get_all(skip, limit)`, `create()`, `update()`, `delete()` | ⭐⭐⭐⭐⭐ |
| **UserRepository** | `backend/app/repositories/user_repository.py` | `get_by_session_token()`, `get_by_nickname()` | ⭐⭐⭐⭐ |
| **PostRepository** | `backend/app/repositories/post_repository.py` | `get_by_category()`, `increment_view_count()`, `increment_like_count()`, `decrement_like_count()` | ⭐⭐⭐⭐ |
| **CommentRepository** | `backend/app/repositories/comment_repository.py` | `get_by_post_id()` | ⭐⭐⭐⭐ |
| **CategoryRepository** | `backend/app/repositories/category_repository.py` | `get_by_slug()` | ⭐⭐⭐⭐⭐ |

**재사용 팁**: BaseRepository는 모든 프로젝트에서 재사용 필수. 제네릭 타입으로 모든 모델에 적용 가능.

---

## 🎯 DESIGN PATTERNS

### 익명 인증 플로우
```
Frontend: 닉네임 입력 → authService.createAnonymousUser(nickname)
localStorage: session_token 저장
API Client: X-Session-Token 헤더 자동 주입
Error: 401 → localStorage 클리어, 로그인 페이지로 리디렉션
```

### 페이지네이션 패턴
```typescript
// Frontend
const { posts, total } = await postService.getPosts({ skip: 0, limit: 20 });

// Backend
async def get_posts(skip: int = 0, limit: int = 20) -> PostListResponse:
    posts = await repo.get_all(skip=skip, limit=limit)
    total = await repo.count()
    return PostListResponse(items=posts, total=total, skip=skip, limit=limit)
```

### 권한 검증 패턴
```python
# Service Layer에서 처리
if post.user_id != current_user.id:
    raise HTTPException(403, "Not authorized")
```

### 카테고리 다국어 패턴
```python
# Model
class Category(Base):
    name_ko: str
    name_en: str
    name_vi: str
    name_ne: str
    slug: str

# Frontend
const categoryName = category[`name_${lang}`]; // name_ko, name_en, etc.
```

---

## 🔐 SECURITY & ERROR HANDLING

### Frontend Error Pattern
```typescript
try {
  const result = await service.method();
  setState(result);
} catch (err) {
  const message = err instanceof Error ? err.message : 'Unknown error';
  setError(message);
}
```

### Backend Error Pattern
```python
try:
    result = service.method(request)
    return result
except ValueError as e:
    raise HTTPException(status_code=400, detail=str(e))
except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
```

### 세션 토큰 검증
```python
# Dependency
async def get_current_user(
    session_token: str = Header(None, alias="X-Session-Token"),
    user_repo: UserRepository = Depends()
):
    if not session_token:
        raise HTTPException(401, "No session token")

    user = await user_repo.get_by_session_token(session_token)
    if not user:
        raise HTTPException(401, "Invalid session token")

    return user
```

---

## 📈 i18n Support

- **Languages**: Korean (ko), English (en), Vietnamese (vi), Nepali (ne)
- **Implementation**: Dictionary context with per-language JSON
- **Components**: `useDictionary()` to access `dict.section.key` properties
- **Routes**: `/[lang]/page` dynamic routing
- **Coverage**: 100% (모든 텍스트는 번역 파일에서 관리)

**Dictionary Structure:**
```json
{
  "common": { "login": "...", "logout": "..." },
  "home": { "title": "...", "description": "..." },
  "post": { "create": "...", "edit": "...", "delete": "..." },
  "category": { "salary": "...", "housing": "..." }
}
```

---

## 🚀 REUSABILITY SCORE

| Component/Pattern | Score | Notes |
|-------------------|-------|-------|
| Button, Input, Card | ⭐⭐⭐⭐⭐ | 모든 프로젝트에서 그대로 사용 가능 |
| apiClient pattern | ⭐⭐⭐⭐⭐ | 세션 토큰 주입, 에러 처리 표준화 |
| Atomic Design structure | ⭐⭐⭐⭐⭐ | 계층 분리 강제 |
| BaseRepository | ⭐⭐⭐⭐⭐ | 제네릭 CRUD 레포지토리 |
| useDictionary hook | ⭐⭐⭐⭐⭐ | 다국어 프로젝트 필수 |
| PostCard, CommentItem | ⭐⭐⭐⭐ | 커뮤니티/블로그 프로젝트 적용 가능 |
| useAuth hook | ⭐⭐⭐⭐ | 세션/JWT/OAuth로 확장 가능 |
| PostService, CommentService | ⭐⭐⭐⭐ | 게시판/블로그 비즈니스 로직 |

---

## 📝 CRITICAL PATHS

### High-Value Reusable Code

1. **Frontend Components**: Button, Input, Textarea, Select, Card - 모든 프로젝트에서 사용
2. **API Client**: 세션 토큰 주입, 에러 처리 패턴
3. **Hook Pattern**: `useAuth`, `usePosts`, `useComments` - 서비스 호출 + 상태 관리 템플릿
4. **BaseRepository**: 제네릭 CRUD 레포지토리 (모든 모델에 적용)
5. **Service Layer**: 비즈니스 로직과 권한 검증 분리
6. **i18n Pattern**: Dictionary context + JSON 번역 파일
7. **Pagination**: skip/limit 패턴 (frontend + backend)

### Project-Specific (Low Reusability)

1. 도메인 특화 스키마 (Post, Comment - 필드 조정 필요)
2. 카테고리 구조 (프로젝트별로 다름)
3. 세션 기반 익명 인증 (OAuth/JWT로 대체 가능)

---

## 🔄 Code Reuse From Other Projects

### From KeyChanger
- ✅ LanguageSwitcher molecule (다국어 스위처)
- ✅ useDictionary hook (i18n 패턴)
- ✅ DictionaryContext (i18n context)
- ✅ Button, Input, Select atoms (기본 UI 컴포넌트)

### From vote
- ✅ BaseRepository (제네릭 CRUD)
- ✅ useAuth pattern (인증 상태 관리)
- ✅ apiClient interceptor (토큰 주입)
- ✅ Card, Badge atoms

### Unique to WeWorkHere
- PostCard, CommentItem molecules (커뮤니티 특화)
- PostList, PostForm, CommentSection organisms
- Category 다국어 모델 (name_ko, name_en, name_vi, name_ne)
- 익명 세션 인증 (session_token)

---

**Last Updated**: 2026-01-08
**Total Reusable Components**: 45+ (8 atoms, 5 molecules, 4 organisms, 5 hooks, 5 services, 5 repositories)
**Code Reuse Rate**: ~60% (atoms/molecules/base patterns from KeyChanger/vote projects)
