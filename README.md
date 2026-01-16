
# 🚀 LinkON (링크온)

### :bridge_at_night: Connecting the Field, Empowering the Worker

**현장(On-site)과 지식(Link)을 잇다: 제조업 외국인 근로자를 위한 AI 통합 소통 플랫폼**

<div align="center">

<img src="https://via.placeholder.com/1200x400?text=LinkON+Project+Banner" alt="LinkON Banner" width="100%" />

<br/><br/>

<img src="https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js" />
<img src="https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi" />
<img src="https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=for-the-badge&logo=openai" />
<img src="https://img.shields.io/badge/PostgreSQL-15-316192?style=for-the-badge&logo=postgresql" />
<img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker" />

<br/><br/>

<a href="https://your-deploy-url.vercel.app">
  <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-2ea44f?style=for-the-badge" />
</a>

</div>

---

## 📖 1. 프로젝트 개요 (Overview)

**LinkON**은 전문 관리 인력이 부족한 중소 제조 현장에서 외국인 근로자의 빠른 적응을 돕고, 실시간 소통을 지원하는 **AI 통합 솔루션**입니다.

언어 장벽과 정보 비대칭으로 고립되기 쉬운 외국인 근로자들에게 **'현장 특화 SNS'**를 제공하여, 관리자와의 업무 소통은 물론 근속 의지를 고취시키는 커뮤니티 환경을 조성합니다. 휘발되기 쉬운 현장의 아날로그 지식을 디지털 자산화하여 **인력 이탈 방지와 생산성 향상**을 동시에 실현합니다.

---

## 🎯 2. 해결하고자 하는 문제 (Problem Definition)

우리는 대한민국 제조 뿌리산업 현장의 **세 가지 구조적 문제**에 집중했습니다.

| 문제점 (Pain Points) | 현장 상황 |
| --- | --- |
| **⚠️ 현장 교육 체계 부재** | 전담 인력 부족으로 신규 외국인 근로자가 방치되거나, 부정확한 구전(OJT) 교육에 의존하여 불량이 발생합니다. |
| **⚠️ 휴먼 에러의 악순환** | 긴급 안전 수칙 등 변동 사항이 실시간으로 전달되지 않고, 숙련도 편차로 인해 동일한 안전사고가 반복됩니다. |
| **⚠️ 소통 단절과 이탈** | 언어 장벽으로 고충이나 이상 상황 보고가 누락되며, 이는 숙련 인력의 조기 이탈과 생산성(CAPA) 하락으로 직결됩니다. |

---

## ✨ 3. 핵심 기능 (Key Features)

LinkON은 중소 제조 현장의 복잡한 데이터를 AI로 정제하여, 숙련공 없이도 누구나 전문가처럼 일할 수 있는 환경을 구축합니다.

### 🤖 1. AI 현장 튜터 (AI Field Tutor - RAG)

> **"내 손안의 사수, 무엇이든 물어보세요"**

<div align="center">
<img width="706" height="1091" alt="Image" src="https://github.com/user-attachments/assets/9f9530c7-2183-46e2-959a-d3aaa41fbf6b" />
<p><em>[그림 1] 사내 매뉴얼 기반 AI 질의응답 및 데일리 브리핑 화면</em></p>
</div>

* **지식 기반 응답:** 사내 **BOM/SOP(JSON)** 데이터를 학습하여 환각(Hallucination) 없는 정확한 공정 지식을 제공합니다.
* **페르소나 최적화:** 자재 관리, 공정 해결사 등 역할별 특화 모드를 지원합니다.
* **데일리 브리핑:** 출근 시 당일 공정 이슈와 안전 수칙을 사용자의 모국어로 자동 브리핑합니다.

### 📸 2. 스마트 OCR 문서 해석 (Smart OCR Analyst)

> **"찍으면 바로 이해되는 작업 지시서"**

<div align="center">
<img width="500" height="1295" alt="Image" src="https://github.com/user-attachments/assets/7eee4318-c70b-4dc8-994c-642c42c1f7bc" />
<p><em>[그림 2] GPT-4o Vision 기반 문서 분석 및 요약 화면</em></p>
</div>

* **지능형 요약:** 복잡한 한국어 종이 문서를 촬영하면 즉시 **다국어 3줄 요약**으로 변환합니다.
* **디지털 자산화:** 핵심 정보를 추출하여 DB에 저장, 반복되는 문서 확인 시간을 획기적으로 단축합니다.

### 📢 3. 비주얼 퀵 리포팅 & 커뮤니티 (Visual Reporting)

> **"장갑 낀 손으로도 1초 만에 보고"**

<div align="center">
<img width="708" height="1091" alt="Image" src="https://github.com/user-attachments/assets/f58b2870-173f-497f-af15-be7521de9ed6" />
<img width="700" height="1085" alt="Image" src="https://github.com/user-attachments/assets/f48260ff-bc1e-44f1-8758-d82bfbb764c8" />
<p><em>[그림 3] 텍스트 입력 없는 버튼형 신고 인터페이스 & 커뮤니티</em></p>
</div>

* **원터치 리포팅:** 장갑 착용 환경을 고려한 **버튼 클릭 기반 UI**로 보고 시간을 90% 단축합니다.
* **실시간 번역 SNS:** 문제 발생 시 반장에게 즉각 상황을 전파하고, 익명 게시판을 통해 언어 장벽 없는 소통을 지원합니다.


### 💰 4. 상생 리워드 시스템 (Local Win-win)

* **활동 보상:** 신고, 지식 공유 등 활동량에 따라 포인트를 지급합니다.
* **지역 연계:** 획득한 포인트는 공장 인근 소상공인 상권과 연계하여 사용 가능성.

---

## 👥 4. 타겟 사용자 (Target Audience)

### 🏭 대상 기업

* **작업자 고의존 공정:** 용접, 금형 등 숙련도가 중요한 뿌리기업
* **인력 구조:** 외국인 근로자 비중이 높으나 관리 인력이 부재한 현장

### 👤 핵심 사용자

1. **👷 외국인 근로자:** AI 튜터로 직무 숙달, 모국어로 고충 해결
2. **👷‍♂️ 현장 반장:** 외국인 근로자의 리포트를 한국어로 실시간 확인 및 지휘

---

## 🛠️ 5. 기술 스택 (Tech Stack)

| 분류 | 기술 | 상세 내용 |
| --- | --- | --- |
| **Frontend** | <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white"/> | App Router, Axios, Custom i18n Context |
| **Backend** | <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white"/> <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white"/> | Async SQLAlchemy, Pydantic v2 |
| **Database** |<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white"/> <img src="https://img.shields.io/badge/Alembic-EDB53B?style=flat-square&logo=python&logoColor=white"/>  | Docker Container, Alembic Migration |
| **AI Engine** | <img src="https://img.shields.io/badge/OpenAI_GPT--4o-412991?style=flat-square&logo=openai&logoColor=white"/> <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=flat-square&logo=langchain&logoColor=white"/> | Vision API, RAG (Retrieval-Augmented Generation) |
| **DevOps** |<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/> <img src="https://img.shields.io/badge/Shell_Script-4EAA25?style=flat-square&logo=gnu-bash&logoColor=white"/>  | Docker Compose, Shell Script Automation |

### 🌍 다국어 지원 (i18n)

* 🇰🇷 한국어 (Korean)
* 🇬🇧 영어 (English)
* 🇻🇳 베트남어 (Vietnamese)
* 🇳🇵 네팔어 (Nepali)

---

## 🚀 6. 빠른 시작 (Getting Started)

이 프로젝트는 `dev.sh` 스크립트를 통해 원클릭 개발 환경을 제공합니다.

### 1️⃣ 환경 변수 설정

```bash
cp .env.example .env
# .env 파일을 열어 OPENAI_API_KEY 등 필요한 값 수정

```

### 2️⃣ 서비스 실행 (Dev Mode)

```bash
# 권한 부여 (최초 1회)
chmod +x dev.sh

# 서비스 시작 (Frontend: Local / Backend & DB: Docker)
./dev.sh start

```

### 3️⃣ 접속 주소

* **Frontend:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)
* **Backend API Docs:** [http://localhost:25051/docs](https://www.google.com/search?q=http://localhost:25051/docs)
* **Database:** localhost:5444

### 4️⃣ 기타 명령어

```bash
./dev.sh stop    # 서비스 중지
./dev.sh restart # 재시작
./dev.sh logs    # 로그 확인

```

---

## 📁 7. 프로젝트 구조 (Directory Structure)

```
├── 📂 backend/                     # FastAPI 백엔드 프로젝트
│   ├── 📂 alembic/                 # 데이터베이스 마이그레이션 도구 (스키마 이력 관리)
│   │   ├── 📂 versions/            # 마이그레이션 히스토리
│   │   ├── env.py
│   │   └── script.py.mako
│   ├── 📂 app/                     # 백엔드 핵심 비즈니스 로직
│   │   ├── 📂 core/                # 인증, 보안, 설정 등 핵심 엔진
│   │   ├── 📂 models/              # SQLAlchemy DB 모델 (데이터 구조 정의)
│   │   ├── 📂 repositories/        # 데이터 접근 계층 (CRUD 처리)
│   │   ├── 📂 routers/             # API 엔드포인트(URL) 정의
│   │   ├── 📂 schemas/             # Pydantic 데이터 검증 및 직렬화 모델
│   │   ├── 📂 services/            # 비즈니스 로직 처리 (AI RAG, OCR 분석 등)
│   │   ├── 📂 utils/               # 공통 유틸리티 함수
│   │   └── main.py                 # FastAPI 실행 엔트리포인트
│   ├── 📂 uploads/                 # 이미지 및 파일 업로드 임시 저장소
│   ├── alembic.ini                 # Alembic 설정 파일
│   ├── requirements.txt            # 파이썬 의존성 패키지 목록
│   ├── IMPLEMENTATION_SUMMARY.md   # 구현 요약 및 세부 명세
│   └── QUICKSTART.md               # 백엔드 빠른 실행 가이드
│
├── 📂 frontend/                    # Next.js 프론트엔드 프로젝트
│   ├── 📂 src/                     # 프론트엔드 소스 코드
│   │   ├── 📂 app/                 # Next.js App Router (페이지 및 레이아웃 구성)
│   │   ├── 📂 components/          # 공통 UI 컴포넌트 (Atomic Design 패턴)
│   │   ├── 📂 contexts/            # 전역 상태 관리 (인증 상태, 다국어 설정 등)
│   │   ├── 📂 dictionaries/        # 다국어 지원 번역 파일 (ko, en, vi, ne)
│   │   ├── 📂 services/            # API 통신 및 데이터 처리 서비스 레이어
│   │   ├── 📂 hooks/               # 재사용 가능한 커스텀 리액트 훅
│   │   └── middleware.ts           # 미들웨어 (사용자 인증 및 접근 제어)
│   ├── next.config.js              # Next.js 프레임워크 설정
│   ├── tailwind.config.js          # Tailwind CSS 디자인 시스템 설정
│   └── tsconfig.json               # TypeScript 정적 타입 설정
│
├── 📂 docs/                        # 프로젝트 상세 문서 보관소
│   ├── DEPLOYMENT.md               # 서버 배포 상세 가이드
│   ├── LOG.md                      # 프로젝트 개발 로그 및 마일스톤
│   ├── mypage_guide.md             # 마이페이지 기능 및 UI 가이드
│   └── PLATFORM_REUSE_CATALOG.md   # 플랫폼 재사용성 분석 보고서
│
├── 📄 .env.example                 # 환경 변수 설정 템플릿
├── 📄 CLAUDE.md                    # AI 코딩 에이전트 및 컨벤션 가이드
├── 📄 dev.sh                       # 로컬 개발 환경 자동화 스크립트
├── 📄 deploy.sh                    # 원격 서버 배포 자동화 스크립트
├── 📄 README.md                    # 프로젝트 메인 가이드
└── 📄 프로젝트명세서.md              # 해커톤 최종 결과물 명세서

```

---

## 🔌 8. API 엔드포인트 예시

모든 API는 `/api/v1` prefix를 사용합니다.

* `POST /api/v1/auth/login` : 로그인 및 토큰 발급
* `POST /api/v1/posts` : 게시글/신고 작성 (이미지 업로드 포함)
* `GET /api/v1/posts` : 게시글 목록 조회 (필터링 지원)
* `POST /api/v1/ai/chat` : AI 튜터 질의응답 (RAG)
* `POST /api/v1/ai/ocr` : 문서 이미지 분석 및 요약

---

## 👨‍💻 Team (팀원 소개)

| **Team Name** | **Role** | **GitHub** |
| --- | --- | --- |
| **팀원1** | PM / AI Engineering | [@User1](https://github.com) |
| **팀원2** | Frontend Lead | [@User2](https://github.com) |
| **팀원3** | Backend & DevOps | [@User3](https://github.com) |
| **김주영** | UI/UX Design | gmdqn2tp@gmail.com  |

---

## 📄 License

This project is licensed under the MIT License.
