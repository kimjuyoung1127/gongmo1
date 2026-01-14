#!/bin/bash

# WeWorkHere 배포 스크립트
# weworkhere.alldatabox.com

set -e

echo "======================================"
echo "WeWorkHere 배포 스크립트"
echo "======================================"
echo ""

# 프로젝트 디렉토리로 이동
PROJECT_DIR="/Users/jonghojung/Desktop/hackerton/gongmo1"
cd "$PROJECT_DIR" || exit 1

echo "✓ 프로젝트 디렉토리: $PROJECT_DIR"
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
echo ""

# shared_db_network 확인/생성
if ! docker network ls | grep -q "shared_db_network"; then
    echo "⚠ shared_db_network 생성 중..."
    docker network create shared_db_network
    echo "✓ shared_db_network 생성 완료"
else
    echo "✓ shared_db_network 존재 확인"
fi
echo ""

# Docker Compose 실행
echo "🚀 Docker Compose 빌드 및 시작..."
docker-compose down
docker-compose up -d --build

echo ""
echo "⏳ 컨테이너 시작 대기 중..."
sleep 10

# 컨테이너 상태 확인
echo ""
echo "📊 컨테이너 상태:"
docker-compose ps

echo ""
echo "======================================"
echo "배포 완료!"
echo "======================================"
echo ""
echo "로컬 확인:"
echo "  Frontend: http://localhost:${FRONTEND_PORT}"
echo "  Backend:  http://localhost:${BACKEND_PORT}/health"
echo ""
echo "공개 URL (Cloudflare Tunnel 실행 후):"
echo "  https://weworkhere.alldatabox.com"
echo ""
echo "로그 확인:"
echo "  docker-compose logs -f"
echo ""
echo "Cloudflare Tunnel 시작:"
echo "  cloudflared tunnel --config ~/.cloudflared/weworkhere-config.yml run weworkhere-tunnel"
echo ""
