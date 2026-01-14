# LinkOn Frontend - Quick Reference

## Essential File Paths

### Configuration
```
/Users/mac/Desktop/homeserver/LinkOn/frontend/package.json
/Users/mac/Desktop/homeserver/LinkOn/frontend/tsconfig.json
/Users/mac/Desktop/homeserver/LinkOn/frontend/next.config.js
/Users/mac/Desktop/homeserver/LinkOn/frontend/tailwind.config.js
```

### Core Services
```
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/services/apiClient.ts
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/services/authService.ts
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/services/postService.ts
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/services/commentService.ts
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/services/categoryService.ts
```

### Hooks
```
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/hooks/useAuth.ts
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/hooks/usePosts.ts
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/hooks/usePost.ts
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/hooks/useComments.ts
```

### Main Pages
```
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/app/[lang]/page.tsx          # Homepage
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/app/[lang]/login/page.tsx   # Login
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/app/[lang]/posts/new/page.tsx    # New Post
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/app/[lang]/posts/[id]/page.tsx   # Post Detail
```

### Key Organisms
```
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/components/organisms/Header.tsx
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/components/organisms/PostList.tsx
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/components/organisms/PostForm.tsx
/Users/mac/Desktop/homeserver/LinkOn/frontend/src/components/organisms/CommentSection.tsx
```

## Key Code Snippets

### API Client Setup
```typescript
// src/services/apiClient.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
const apiClient = axios.create({ baseURL: API_URL });

// Auto-add session token
apiClient.interceptors.request.use((config) => {
  const token = getSessionToken();
  if (token) config.headers['X-Session-Token'] = token;
  return config;
});
```

### Authentication Hook
```typescript
// src/hooks/useAuth.ts
const { user, loading, error, login, logout, isAuthenticated } = useAuth();

// Usage:
await login({ nickname: 'TestUser' });
logout();
```

### Posts Hook
```typescript
// src/hooks/usePosts.ts
const { data, loading, error, setPage, setCategoryId } = usePosts({
  page: 1,
  page_size: 20,
});
```

### Dictionary Usage
```typescript
// In any component
import { useDictionary, useLang } from '@/contexts/DictionaryContext';

const dict = useDictionary();
const lang = useLang();

// Access translations
{dict.post.createPost}
{dict.nav.home}
```

## Environment Variables

### Development (.env)
```
NEXT_PUBLIC_API_URL=/api/v1
NEXT_PUBLIC_BASE_URL=http://localhost:24050
```

### Production (.env)
```
NEXT_PUBLIC_API_URL=https://api-linkon.alldatabox.com/api/v1
NEXT_PUBLIC_BASE_URL=https://linkon.alldatabox.com
```

## Common Commands

```bash
# Install
npm install

# Dev server (port 24050)
npm run dev

# Build
npm run build

# Production server
npm start

# Lint
npm run lint
```

## Component Usage Examples

### Button
```tsx
import { Button } from '@/components/atoms';

<Button variant="primary" size="medium" onClick={handleClick}>
  Click Me
</Button>
```

### Input
```tsx
import { Input } from '@/components/atoms';

<Input
  value={text}
  onChange={setText}
  placeholder="Enter text"
/>
```

### PostCard
```tsx
import { PostCard } from '@/components/molecules';

<PostCard post={post} categoryName="일자리" />
```

### PostList
```tsx
import { PostList } from '@/components/organisms';

<PostList
  posts={posts}
  categories={categories}
  loading={loading}
  error={error}
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>
```

## API Endpoints Reference

### Authentication
```
POST /api/v1/auth/anonymous
Body: { nickname: string }
Response: { id, nickname, session_token, created_at, updated_at }

GET /api/v1/auth/me
Header: X-Session-Token
Response: User object
```

### Posts
```
GET /api/v1/posts?page=1&page_size=20&category_id=1
Response: { posts: Post[], total, page, page_size, total_pages }

POST /api/v1/posts
Header: X-Session-Token
Body: { title, content, category_id? }
Response: Post object

GET /api/v1/posts/:id
Response: Post object

PUT /api/v1/posts/:id
Header: X-Session-Token
Body: { title?, content?, category_id? }
Response: Post object

DELETE /api/v1/posts/:id
Header: X-Session-Token
Response: 204 No Content

POST /api/v1/posts/:id/like
Header: X-Session-Token
Response: { like_count: number }
```

### Comments
```
GET /api/v1/posts/:id/comments
Response: Comment[]

POST /api/v1/posts/:id/comments
Header: X-Session-Token
Body: { content: string }
Response: Comment object

DELETE /api/v1/posts/:id/comments/:commentId
Header: X-Session-Token
Response: 204 No Content
```

### Categories
```
GET /api/v1/categories
Response: Category[]
```

## Directory Navigation

```bash
# Navigate to frontend
cd /Users/mac/Desktop/homeserver/LinkOn/frontend

# Navigate to components
cd src/components/atoms
cd src/components/molecules
cd src/components/organisms

# Navigate to pages
cd src/app/[lang]

# Navigate to services
cd src/services
```

## Port Allocation

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 24050 | Next.js dev/prod server |
| Backend | 25050 | FastAPI server |
| Database | 5443 | PostgreSQL |

## Troubleshooting

### Port already in use
```bash
lsof -i :24050
kill -9 <PID>
npm run dev
```

### Session token issues
```bash
# Clear localStorage
localStorage.removeItem('session_token');
# Or use browser DevTools → Application → Local Storage
```

### Type errors
```bash
# Rebuild TypeScript
rm -rf .next
npm run build
```

### Missing dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

## Testing Checklist

- [ ] Anonymous login works
- [ ] Post list displays
- [ ] Category filter works
- [ ] Create post works (auth required)
- [ ] Post detail shows correctly
- [ ] Comments can be added
- [ ] Like button increments count
- [ ] Language switcher changes language
- [ ] Logout clears session
- [ ] Protected routes redirect to login
- [ ] Pagination works
- [ ] Mobile responsive design works

## Browser DevTools

### Check API calls
```
Network tab → Filter: XHR
Look for /api/v1/* requests
Check X-Session-Token header
```

### Check localStorage
```
Application tab → Local Storage → http://localhost:24050
Key: session_token
```

### Check console for errors
```
Console tab
Look for React errors or API errors
```

## Quick Fixes

### "Module not found" errors
```bash
npm install
# or
npm install <missing-package>
```

### CORS errors
Check backend ALLOWED_ORIGINS includes http://localhost:24050

### 401 Unauthorized
Session token expired or invalid - logout and login again

### Build errors
```bash
rm -rf .next
npm run build
```
