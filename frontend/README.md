# WeWorkHere Frontend

외국인 노동자 익명 커뮤니티 플랫폼의 프론트엔드 애플리케이션입니다.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Architecture**: Atomic Design Pattern

## Supported Languages

- Korean (ko)
- English (en)
- Vietnamese (vi)
- Nepali (ne)

## Development

```bash
# Install dependencies
npm install

# Run development server (http://localhost:24050)
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

## Environment Variables

Create a `.env.local` file or use the root `.env` file:

```
NEXT_PUBLIC_API_URL=/api/v1
NEXT_PUBLIC_BASE_URL=http://localhost:24050
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [lang]/             # Language-specific routes
│   │   ├── page.tsx        # Main page
│   │   ├── login/          # Login page
│   │   ├── posts/          # Posts pages
│   │   └── layout.tsx      # Language layout
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   ├── sitemap.ts          # SEO sitemap
│   └── robots.ts           # SEO robots.txt
├── components/
│   ├── atoms/              # 10-30 lines
│   ├── molecules/          # 30-80 lines
│   └── organisms/          # 80-150 lines
├── hooks/                  # Custom hooks (50-150 lines)
├── services/               # API services
├── types/                  # TypeScript types
├── constants/              # Constants
├── dictionaries/           # i18n translations
├── contexts/               # React contexts
└── utils/                  # Utility functions
```

## Architecture

### Frontend Layer Communication

```
Page → Organisms → Hooks → Services (API)
     → Molecules → Atoms
```

### Component Hierarchy

- **Atoms** (10-30 lines): Single UI elements (Button, Input, Badge)
- **Molecules** (30-80 lines): Composition of atoms (PostCard, CommentItem)
- **Organisms** (80-150 lines): Complex sections (PostList, CommentSection)
- **Hooks** (50-150 lines): Business logic, state management
- **Services**: API communication only

### Key Features

1. **Anonymous Authentication**: Nickname-based login with session token
2. **Multi-language Support**: Korean, English, Vietnamese, Nepali
3. **Post Management**: Create, read, update, delete posts
4. **Comment System**: Add and delete comments
5. **Category Filter**: Filter posts by category
6. **Responsive Design**: Mobile-first approach

## API Integration

All API calls go through `/api/v1` prefix:

- `POST /api/v1/auth/anonymous` - Create anonymous user
- `GET /api/v1/auth/me` - Get current user
- `GET /api/v1/posts` - Get posts list
- `POST /api/v1/posts` - Create post
- `GET /api/v1/posts/:id` - Get post detail
- `POST /api/v1/posts/:id/like` - Toggle like
- `GET /api/v1/posts/:id/comments` - Get comments
- `POST /api/v1/posts/:id/comments` - Create comment

## Authentication

Session token is stored in `localStorage` and sent in `X-Session-Token` header for all authenticated requests.

## SEO Optimization

- Dynamic sitemap generation
- Robots.txt configuration
- Meta tags and Open Graph tags
- Language-specific metadata
- Optimized images (og-image.png, favicon.ico)

## Port

Default port: **24050**
