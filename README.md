# WeWorkHere

> 외국인 노동자를 위한 익명 커뮤니티 플랫폼

## 📖 프로젝트 개요

**WeWorkHere**는 한국에서 근무하는 외국인 노동자들이 안전하게 경험과 정보를 공유할 수 있는 익명 커뮤니티 플랫폼입니다.

### 🎯 목적

- 외국인 노동자들이 안전하게 경험·정보를 공유할 수 있는 공간 제공
- 브로커·업체·관리자 중심이 아닌 당사자 중심 커뮤니티 구축
- 언어·국적·사업장 차이를 넘는 실질적인 생존 정보 교환

### 👥 타겟 사용자

- 한국에서 근무 중인 외국인 노동자 (제조업, 농축산, 건설, 서비스업)
- 모바일 중심 사용자 (Android 스마트폰 비중 높음)
- 익명성이 중요한 사용자

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4
- **HTTP Client**: Axios 1.6
- **i18n**: Custom dictionary context

### Backend
- **Framework**: FastAPI 0.109
- **Language**: Python 3.11
- **ORM**: SQLAlchemy 2.0 (Async)
- **Database**: PostgreSQL 15-alpine
- **Server**: Uvicorn
- **Migration**: Alembic
- **Validation**: Pydantic 2.x

### Deployment
- **Container**: Docker Compose
- **Server**: Mac Mini (macOS)
- **Ports**:
  - Frontend: 24050 (Production) / 24051 (Local Dev)
  - Backend: 25050 (Production) / 25051 (Local Dev)
  - Database: 5443 (External) / 5432 (Internal)

## 🌍 다국어 지원

- 🇰🇷 한국어 (Korean)
- 🇬🇧 영어 (English)
- 🇻🇳 베트남어 (Vietnamese)
- 🇳🇵 네팔어 (Nepali)

## ✨ 핵심 기능 (MVP)

### 커뮤니티 기능
- ✅ 게시글 작성/수정/삭제 (텍스트 + 사진)
- ✅ 댓글 작성 및 삭제
- ✅ 좋아요/공감 버튼
- ✅ 카테고리별 필터링
  - 임금/급여
  - 숙소
  - 사업장 문제
  - 계약/비자
  - 자유 이야기

### 인증 시스템
- ✅ 익명 닉네임 기반 로그인 (회원가입 선택적)
- ✅ 세션 토큰 기반 인증 (localStorage)
- ✅ 전화번호 인증 없음
- ✅ 익명성 보장

## 🚀 빠른 시작 (개발 환경)

이 프로젝트는 편리한 개발 환경 관리를 위해 `dev.sh` 스크립트를 제공합니다.

### 1. 환경 변수 설정

```bash
cp .env.example .env
# .env 파일을 열어 필요한 값 수정 (기본값 사용 권장)
```

### 2. 서비스 실행 (Frontend: Local, Backend/DB: Docker)

```bash
# 권한 부여 (최초 1회)
chmod +x dev.sh

# 서비스 시작 (Frontend + Backend + DB)
./dev.sh start
```

이 명령어는 Backend와 Database를 Docker로 실행하고, Frontend를 로컬(`npm run dev`)에서 실행합니다.

### 3. 접속

- **Frontend**: http://localhost:3000 (Next.js 기본 포트)
- **Backend API**: http://localhost:25051/docs
- **DB (Direct)**: localhost:5444

> **참고**: `npm run dev` 실행 시 `BACKEND_URL` 환경변수가 `.env`에 설정되어 있어야 API 호출이 정상적으로 프록시됩니다. (설정되지 않으면 경고 메시지가 출력됩니다.)

### 4. 기타 명령어

```bash
./dev.sh stop     # 모든 서비스 중지
./dev.sh restart  # 서비스 재시작
./dev.sh rebuild  # Docker 이미지 재빌드 및 재시작
./dev.sh logs     # 로그 확인
./dev.sh help     # 도움말 보기
```

## 📦 배포

배포를 위해서는 `deploy.sh` 스크립트를 사용합니다.

```bash
chmod +x deploy.sh
./deploy.sh
```

상세 배포 가이드는 `DEPLOYMENT_CHECKLIST.md`를 참조하세요.

## 📁 프로젝트 구조

```
WeWorkHere/
├── .env                         # 환경 변수
├── .env.example                 # 환경 변수 템플릿
├── docker-compose.yml           # Docker 설정 (운영 환경 고정)
├── dev.sh                       # 개발 환경 관리 스크립트
├── deploy.sh                    # 배포 스크립트
├── README.md                    # 프로젝트 개요
├── CLAUDE.md                    # AI 개발 가이드 및 아키텍처 문서
│
├── frontend/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/                 # Next.js App Router
│   │   ├── components/          # Atomic Design Components
│   │   ├── hooks/               # Custom Hooks
│   │   └── services/            # API Services
│
└── backend/                     # FastAPI Backend
    ├── app/
    │   ├── main.py              # Entry point
    │   ├── routers/             # API Endpoints
    │   ├── services/            # Business Logic
    │   └── models/              # DB Models
    └── alembic/                 # DB Migrations
```

## 🔌 API 엔드포인트

모든 엔드포인트는 `/api/v1` prefix를 사용합니다. 상세 문서는 서버 실행 후 `/docs`에서 확인할 수 있습니다.

- **Auth**: `/api/v1/auth` (익명 로그인, 내 정보)
- **Posts**: `/api/v1/posts` (CRUD, 목록, 좋아요)
- **Comments**: `/api/v1/posts/{id}/comments` (댓글 CRUD)
- **Categories**: `/api/v1/categories` (카테고리 목록)

## 📝 개발 가이드

상세한 개발 가이드, 아키텍처 패턴, 네이밍 규칙 등은 **[CLAUDE.md](CLAUDE.md)** 파일을 참조하세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.