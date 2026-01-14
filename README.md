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
  - Frontend: 24050
  - Backend: 25050
  - Database: 5443

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

### 안전 기능
- ✅ 신고 기능 (준비됨)
- ✅ 관리자 개입 최소화
- ✅ 위치 정보 수집 없음

## 📁 프로젝트 구조

```
WeWorkHere/
├── .env                         # 환경 변수
├── .env.example                 # 환경 변수 템플릿
├── docker-compose.yml           # Docker 설정
├── README.md                    # 프로젝트 개요
├── CLAUDE.md                    # AI 개발 가이드
│
├── frontend/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/                 # Next.js 라우팅
│   │   │   ├── [lang]/          # 다국어 라우팅
│   │   │   ├── sitemap.ts       # SEO
│   │   │   └── robots.ts        # SEO
│   │   ├── components/          # Atomic Design
│   │   │   ├── atoms/           # 10-30줄
│   │   │   ├── molecules/       # 30-80줄
│   │   │   └── organisms/       # 80-150줄
│   │   ├── hooks/               # 비즈니스 로직
│   │   ├── services/            # API 호출
│   │   ├── types/               # TypeScript 타입
│   │   ├── constants/           # 상수
│   │   └── dictionaries/        # i18n 번역
│   └── public/                  # 정적 파일
│
└── backend/                     # FastAPI Backend
    ├── app/
    │   ├── main.py              # FastAPI 진입점
    │   ├── core/                # 설정, DB
    │   ├── models/              # SQLAlchemy 모델
    │   ├── schemas/             # Pydantic 스키마
    │   ├── repositories/        # DB 접근
    │   ├── services/            # 비즈니스 로직
    │   └── routers/             # API 엔드포인트
    ├── alembic/                 # DB 마이그레이션
    └── requirements.txt         # Python 의존성
```

## 🚀 빠른 시작

### 1. 환경 변수 설정

```bash
cp .env.example .env
# .env 파일을 열어 필요한 값 수정
```

### 2. Docker Compose로 실행

```bash
# 전체 서비스 시작
docker-compose up -d --build

# 로그 확인
docker-compose logs -f
```

### 3. 데이터베이스 마이그레이션

```bash
# Backend 컨테이너 진입
docker exec -it weworkhere_backend_dev bash

# 마이그레이션 실행
alembic upgrade head
```

### 4. 접속

- **Frontend**: http://localhost:24050
- **Backend API**: http://localhost:25050/docs
- **Health Check**: http://localhost:25050/health

## 🗄️ 데이터베이스 스키마

### 주요 테이블

- **users**: 사용자 (익명 닉네임, 세션 토큰)
- **categories**: 카테고리 (다국어 이름)
- **posts**: 게시글 (제목, 내용, 이미지, 조회수, 좋아요)
- **comments**: 댓글
- **reactions**: 반응 (준비됨, 향후 확장)

## 🔌 API 엔드포인트

모든 엔드포인트는 `/api/v1` prefix 사용

### 인증
- `POST /api/v1/auth/anonymous` - 익명 사용자 생성
- `GET /api/v1/auth/me` - 현재 사용자 정보

### 카테고리
- `GET /api/v1/categories` - 카테고리 목록

### 게시글
- `GET /api/v1/posts` - 게시글 목록 (페이지네이션, 카테고리 필터)
- `GET /api/v1/posts/{id}` - 게시글 상세
- `POST /api/v1/posts` - 게시글 작성
- `PUT /api/v1/posts/{id}` - 게시글 수정
- `DELETE /api/v1/posts/{id}` - 게시글 삭제
- `POST /api/v1/posts/{id}/like` - 좋아요

### 댓글
- `GET /api/v1/posts/{post_id}/comments` - 댓글 목록
- `POST /api/v1/posts/{post_id}/comments` - 댓글 작성
- `DELETE /api/v1/comments/{id}` - 댓글 삭제

## 🏗️ 아키텍처 패턴

### Frontend 계층
```
Page → Organisms → Hooks → Services → API
     → Molecules → Atoms
```

### Backend 계층
```
Router → Service → Repository → Database
```

**중요**: 계층 건너뛰기 절대 금지

## 📝 개발 가이드

### Backend 개발 순서
1. Models (DB 테이블 정의)
2. Schemas (Pydantic DTO)
3. Repositories (CRUD 함수)
4. Services (비즈니스 로직)
5. Routers (HTTP 엔드포인트)
6. Alembic 마이그레이션

### Frontend 개발 순서
1. Types (인터페이스)
2. Services (API 호출)
3. Hooks (비즈니스 로직)
4. Atoms → Molecules → Organisms
5. Pages (라우팅)

## 🔐 보안

- 익명성 보장 (최소한의 개인정보 수집)
- 세션 토큰 기반 인증
- 로그 최소화
- 위치 정보 수집 없음
- CORS 설정 (환경별 분리)

## 🧪 테스트

```bash
# Backend 테스트
cd backend
pytest

# Frontend 테스트
cd frontend
npm test
```

## 📦 배포

상세 배포 가이드는 `DEPLOYMENT_CHECKLIST.md` 참조

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🤝 기여

이슈 및 풀 리퀘스트는 언제나 환영합니다!

## 📞 문의

프로젝트 관련 문의사항은 이슈로 등록해주세요.

---

**Last Updated**: 2026-01-08
**Version**: 1.0.0 (MVP)
