# 🚀 LinkON (링크온)

> **"현장(On-site)과 지식(Link)을 잇다"** > 한국 제조 현장의 언어 장벽을 허물고 숙련의 가치를 디지털로 연결하는 AI 통합 소통 플랫폼

---

## 📖 1. 프로젝트 개요 (Overview)

**LinkON**은 전문 관리 인력이 부족한 중소 제조 현장에서 외국인 근로자의 빠른 적응을 돕고, SNS 기반의 실시간 소통을 지원하는 AI 통합 솔루션입니다.

언어 장벽과 정보 비대칭으로 고립되기 쉬운 외국인 근로자들에게 **'현장 특화 SNS'**를 제공하여, 관리자와의 업무 소통은 물론 근속 의지를 고취시키는 커뮤니티 환경을 조성합니다. 휘발되기 쉬운 현장의 아날로그 지식을 디지털 자산화하여 **인력 이탈 방지와 생산성 향상**을 동시에 실현합니다.

---

## 🎯 2. 해결하고자 하는 문제 (Problem Definition)

### ⚠️ 현장 교육 체계 부재
* 전담 교육 인력 부족으로 신규 외국인 근로자 방치
* 동료 간의 부정확한 구전 교육(OJT)에 의존하여 숙달 지연 및 품질 저하 발생

### ⚠️ 휴먼 에러의 악순환
* 긴급 안전 수칙 등 '현장 변동 사항'이 실시간으로 전달되지 않음
* 숙련도 편차로 인한 동일 품질 결함 및 안전사고 반복 발생

### ⚠️ 관리 공백 및 소통 단절
* 근로자의 고충이나 이상 상황이 관리자에게 즉각 보고되지 않는 폐쇄적 구조
* 소통 지연이 숙련 인력의 조기 이탈 및 생산성 하락(CAPA 감소)으로 직결

---

## ✨ 3. 핵심 기능 (Key Features)

| 기능 | 상세 설명 |
| :--- | :--- |
| **🤖 AI 현장 튜터 (RAG)** | 사내 BOM/SOP 데이터를 학습해 환각 없는 직무 가이드 및 다국어 실시간 브리핑 제공 |
| **📸 Smart OCR** | GPT-4o 멀티모달 기반. 종이 작업표준서 촬영 시 즉시 번역 및 **3줄 핵심 요약** 제공 |
| **🔘 비주얼 퀵 보고** | 장갑 착용 환경을 고려한 **버튼 클릭 기반** UI. 보고 시간을 90% 단축하여 생산성 보존 |
| **💬 SNS & 리워드** | 휘발되는 대화를 데이터 자산화. 포인트 제도를 통한 지역 상권 연계 복지 서비스 제공 |

## 👥 타겟 사용자

### 🎯 1. 대상 기업

* **작업자 고의존 숙련 공정:** 용접, 주조, 금형 등 작업자 숙련도 의존도가 매우 높은 중소/소규모 뿌리기업
* **인력 구조:** 외국인 근로자 비중이 높으나, 이들을 체계적으로 관리할 실질적인 전문 인력이 부재한 기업
* **소통 갈등:** 언어 장벽으로 인한 소통 부재와 관리 이슈를 지속적으로 겪고 있는 현장
* 
### 👥 2. 핵심 사용자 

#### 👷 외국인 근로자 (Worker)
* **역할:** 언어 장벽 없이 **AI 튜터**를 통해 직무를 스스로 숙달
* **액션:** 공정 이상이나 문제 발생 시 모국어로 즉각적인 상황 리포팅 수행

#### 👷‍♂️ 현장 반장 (Supervisor)
* **역할:** 외국인 근로자의 리포트를 **실시간 모국어(한국어)**로 확인 및 지휘
* **액션:** 현장 변동 지침이나 긴급 공지를 시스템을 통해 모든 근로자에게 즉시 전파



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


## 🚀 핵심 기능 MVP (Key Features)

LinkON은 중소 제조 현장의 복잡한 데이터를 AI로 정제하여, 숙련공 없이도 누구나 전문가처럼 일할 수 있는 환경을 구축합니다.

### 🤖 AI 현장 튜터 (AI Field Tutor - RAG)
* **지식 기반 응답:** 사내 **BOM/SOP(JSON)** 데이터를 학습하여 환각(Hallucination) 없는 정확한 공정 지식을 제공합니다.
* **페르소나 최적화:** 자재 관리, 공정 해결사 등 역할별 특화 모드를 통해 상황에 맞는 가이드를 제시합니다.
* **데일리 브리핑:** 출근 시 당일 공정 이슈와 제품 용도, 안전 수칙을 사용자의 모국어로 자동 브리핑하여 인적 과실을 예방합니다.

### 📸 스마트 OCR 문서 해석 (Smart OCR Analyst)
* **지능형 요약:** 복잡한 한국어 종이 작업표준서나 품질급소를 촬영 즉시 **다국어 3줄 요약**으로 변환합니다.
* **디지털 자산화:** 핵심 정보를 추출하여 디지털 데이터로 저장함으로써, 반복되는 종이 문서 확인의 번거로움을 제거하고 숙달 속도를 혁신합니다.

### 📢 현장 리포팅 & 익명 소통 (Reporting & SNS)
* **실시간 리포팅:** 문제 발생 시 현장 반장에게 즉각 상황을 전달하고 실시간 피드백을 주고받는 **실명 기반 신고 시스템**을 제공합니다.
* **익명 커뮤니티:** 언어 장벽으로 말 못 할 고충이나 현장 개선 아이디어를 자유롭게 공유하는 **익명 게시판**을 운영하여 심리적 장벽을 해소합니다.

### 💰 상생 리워드 시스템 (Reward & Local Win-win)
* **활동 보상:** 현장 리포팅, 지식 공유 등 긍정적 활동량에 따라 포인트를 지급하여 근로자의 자발적인 데이터 자산화를 유도합니다.
* **지역 상권 연계:** 획득한 포인트는 **인근 소상공인 상권과 연계한 포상**으로 활용되어 근로 의욕 고취와 지역 경제 활성화를 동시에 실현합니다.

---

## 🔄 5. 서비스 흐름 (User Flow)

1. **온보딩:** 로그인 시 모국어 선택 및 앱 전체 언어 환경 동기화
2. **브리핑:** 작업 시작 전 당일 공정 이슈 및 안전 지침 자동 확인
3. **실무 지원:** 작업 중 AI 챗봇 질의나 OCR 문서 해석으로 지식 습득
4. **즉시 보고:** 문제 발생 시 퀵 버튼으로 현장 반장에게 상황 전파 및 소통
5. **보상:** 활동 기여도에 따른 포인트 획득 및 지역 상권 연계 보상

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
LinkON/
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
