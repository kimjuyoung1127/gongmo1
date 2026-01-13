#!/bin/bash

# WeWorkHere 프로덕션 배포 스크립트
# 운영 환경: weworkhere.alldatabox.com

set -e

echo "======================================"
echo "WeWorkHere 프로덕션 배포"
echo "======================================"
echo ""

# 프로젝트 디렉토리로 이동
PROJECT_DIR="/Users/jonghojung/Desktop/hackerton/gongmo1"
cd "$PROJECT_DIR" || exit 1

echo "✓ 프로젝트 디렉토리: $PROJECT_DIR"
echo ""

# Git 브랜치 확인
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "현재 브랜치: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  경고: main 브랜치가 아닙니다!"
    read -p "계속 진행하시겠습니까? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "배포를 취소했습니다."
        exit 1
    fi
fi
echo ""

# 최신 코드 확인
echo "📥 원격 저장소 최신 상태 확인..."
git fetch origin

BEHIND_COUNT=$(git rev-list HEAD..origin/$CURRENT_BRANCH --count 2>/dev/null || echo "0")
if [ "$BEHIND_COUNT" -gt 0 ]; then
    echo "⚠️  로컬 브랜치가 원격보다 $BEHIND_COUNT 커밋 뒤쳐져 있습니다."
    read -p "git pull을 실행하시겠습니까? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git pull origin $CURRENT_BRANCH
        echo "✓ 최신 코드 pull 완료"
    fi
fi
echo ""

# .env 파일 확인 및 로드
if [ ! -f ".env" ]; then
    echo "❌ 에러: .env 파일이 없습니다."
    echo "   .env.example을 참고하여 .env 파일을 생성해주세요."
    exit 1
fi

# .env 파일에서 환경 변수 로드
set -a
source .env
set +a

echo "✓ .env 파일 확인 및 로드 완료"

# 프로덕션 환경 확인
if [ "$ENVIRONMENT" != "production" ]; then
    echo "⚠️  경고: ENVIRONMENT가 'production'이 아닙니다 (현재: $ENVIRONMENT)"
    read -p "계속 진행하시겠습니까? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "배포를 취소했습니다."
        exit 1
    fi
fi
echo ""

# shared_db_network 확인/생성
if ! docker network ls | grep -q "shared_db_network"; then
    echo "⚠️  shared_db_network 생성 중..."
    docker network create shared_db_network
    echo "✓ shared_db_network 생성 완료"
else
    echo "✓ shared_db_network 존재 확인"
fi
echo ""

# 기존 컨테이너 중지
echo "🛑 기존 컨테이너 중지..."
docker-compose down
echo ""

# Docker 이미지 빌드 및 컨테이너 시작 (간략 출력)
echo "🚀 Docker 이미지 빌드 및 컨테이너 시작..."
docker-compose up -d --build 2>&1 | grep -E "(Built|Created|Started|ERROR|FAILED|Warning)" || echo "빌드 완료"
echo ""

# 컨테이너 시작 대기
echo "⏳ 컨테이너 시작 대기 중 (15초)..."
sleep 15

# 컨테이너 상태 확인
echo ""
echo "📊 컨테이너 상태:"
docker-compose ps
echo ""

# 헬스체크
echo "🏥 헬스체크..."
echo -n "Backend: "
if curl -s http://localhost:${BACKEND_PORT}/health > /dev/null; then
    echo "✓ 정상"
else
    echo "❌ 실패"
    echo ""
    echo "Backend 로그:"
    docker-compose logs backend | tail -20
fi
echo ""

# 로그 확인 (에러만)
echo "📋 최근 로그 (에러/경고):"
echo "--- Backend ---"
docker-compose logs backend | tail -10 | grep -E "(ERROR|WARN|FAIL)" || echo "에러 없음"
echo ""
echo "--- Frontend ---"
docker-compose logs frontend | tail -10 | grep -E "(ERROR|WARN|FAIL)" || echo "에러 없음"
echo ""

# 배포 완료
echo "======================================"
echo "✅ 배포 완료!"
echo "======================================"
echo ""
echo "📍 서비스 URL:"
echo "  프로덕션: https://weworkhere.alldatabox.com"
echo "  로컬 확인: http://localhost:${FRONTEND_PORT}"
echo "  Backend:   http://localhost:${BACKEND_PORT}/health"
echo ""
echo "📖 유용한 명령어:"
echo "  로그 확인:      docker-compose logs -f"
echo "  특정 로그:      docker-compose logs -f [backend|frontend|db]"
echo "  컨테이너 재시작: docker-compose restart [서비스명]"
echo "  컨테이너 중지:   docker-compose down"
echo ""
echo "🔧 Cloudflare Tunnel:"
echo "  상태 확인: ps aux | grep cloudflared"
echo "  (이미 실행 중이어야 합니다)"
echo ""
