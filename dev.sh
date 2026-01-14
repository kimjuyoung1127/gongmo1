#!/bin/bash

# LinkON 개발 서버 관리 스크립트
# DB + Backend: Docker, Frontend: Local

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

start_frontend() {
    echo "🎨 Starting frontend (local)..."
    pkill -f "next dev" 2>/dev/null

    # Load ALL environment variables from .env
    if [ -f "$SCRIPT_DIR/.env" ]; then
        set -a
        source "$SCRIPT_DIR/.env"
        set +a
    fi

    # Set PORT environment variable for Next.js
    export PORT=${FRONTEND_PORT:-24051}
    cd "$SCRIPT_DIR/frontend" && npm run dev > /tmp/frontend-dev.log 2>&1 &
    sleep 2
    FRONTEND_PORT=${FRONTEND_PORT:-24051}
    if lsof -i :$FRONTEND_PORT >/dev/null 2>&1; then
        echo "   ✅ Frontend running on http://localhost:$FRONTEND_PORT"
    else
        echo "   ⚠️  Frontend may have failed to start. Check: tail -f /tmp/frontend-dev.log"
    fi
}

case "$1" in
  start)
    # Load environment variables for display
    if [ -f "$SCRIPT_DIR/.env" ]; then
        export $(grep -v '^#' "$SCRIPT_DIR/.env" | grep -E 'FRONTEND_PORT|BACKEND_PORT|POSTGRES_PORT' | xargs)
    fi

    echo "🚀 Starting services..."
    docker-compose up -d backend db
    sleep 2
    start_frontend
    echo "✅ All services started!"
    echo "   - Frontend: http://localhost:${FRONTEND_PORT:-24051} (local)"
    echo "   - Backend:  http://localhost:${BACKEND_PORT:-25051} (docker)"
    echo "   - DB:       localhost:${POSTGRES_PORT:-5444} (docker)"
    ;;

  stop)
    echo "🛑 Stopping all services..."
    docker-compose down
    pkill -f "next dev"
    echo "✅ All services stopped!"
    ;;

  restart)
    echo "🔄 Restarting services..."
    docker-compose restart backend db
    start_frontend
    echo "✅ Services restarted!"
    ;;

  rebuild)
    # Load environment variables for display
    if [ -f "$SCRIPT_DIR/.env" ]; then
        export $(grep -v '^#' "$SCRIPT_DIR/.env" | grep -E 'FRONTEND_PORT|BACKEND_PORT|POSTGRES_PORT' | xargs)
    fi

    echo "🔨 Rebuilding and restarting..."
    docker-compose down
    docker-compose up -d --build backend db
    sleep 3
    start_frontend
    echo "✅ Rebuild complete!"
    echo "   - Frontend: http://localhost:${FRONTEND_PORT:-24051} (local)"
    echo "   - Backend:  http://localhost:${BACKEND_PORT:-25051} (docker)"
    echo "   - DB:       localhost:${POSTGRES_PORT:-5444} (docker)"
    ;;

  logs)
    if [ -z "$2" ]; then
      echo "📋 Backend logs:"
      docker-compose logs --tail=50 backend
      echo ""
      echo "📋 Frontend logs:"
      tail -30 /tmp/frontend-dev.log
    elif [ "$2" = "backend" ]; then
      docker-compose logs -f backend
    elif [ "$2" = "frontend" ]; then
      tail -f /tmp/frontend-dev.log
    elif [ "$2" = "db" ]; then
      docker-compose logs -f db
    fi
    ;;

  status)
    # Load environment variables from .env
    if [ -f "$SCRIPT_DIR/.env" ]; then
        export $(grep -v '^#' "$SCRIPT_DIR/.env" | grep -E 'FRONTEND_PORT|BACKEND_PORT|POSTGRES_PORT' | xargs)
    fi

    FRONTEND_PORT=${FRONTEND_PORT:-24051}
    BACKEND_PORT=${BACKEND_PORT:-25051}
    POSTGRES_PORT=${POSTGRES_PORT:-5444}

    echo "📊 Service Status:"
    echo ""
    echo "🐳 Docker Services:"
    docker-compose ps
    echo ""
    echo "💻 Frontend Process (Local):"
    if ps aux | grep "next dev" | grep -v grep >/dev/null; then
      ps aux | grep "next dev" | grep -v grep | awk '{print "   PID: " $2 "  Running"}'
      if lsof -i :$FRONTEND_PORT >/dev/null 2>&1; then
        echo "   Port $FRONTEND_PORT: ✅ LISTENING"
      else
        echo "   Port $FRONTEND_PORT: ❌ NOT LISTENING"
      fi
    else
      echo "   ❌ Not running"
    fi
    echo ""
    echo "🌐 Port Status:"
    lsof -i :$FRONTEND_PORT -i :$BACKEND_PORT -i :$POSTGRES_PORT 2>/dev/null | grep LISTEN || echo "   No services listening"
    ;;

  clean)
    echo "🧹 Cleaning up (removing volumes)..."
    docker-compose down -v
    pkill -f "next dev"
    echo "✅ Cleanup complete!"
    ;;

  help)
    echo "LinkON 개발 서버 관리"
    echo ""
    echo "구조: DB + Backend (Docker) | Frontend (Local)"
    echo ""
    echo "사용법: ./dev.sh [command]"
    echo ""
    echo "명령어:"
    echo "  (없음)    - 전체 리빌드 및 재시작 (기본)"
    echo "  rebuild   - Docker 이미지 재빌드 후 시작"
    echo "  start     - 모든 서비스 시작"
    echo "  stop      - 모든 서비스 중지"
    echo "  restart   - 모든 서비스 재시작"
    echo "  logs      - 로그 확인 (backend|frontend|db)"
    echo "  status    - 서비스 상태 확인"
    echo "  clean     - 모든 데이터 삭제 후 정리"
    echo "  help      - 도움말 보기"
    echo ""
    echo "예시:"
    echo "  ./dev.sh              # 전체 리빌드 (기본)"
    echo "  ./dev.sh start        # 서비스 시작"
    echo "  ./dev.sh logs backend # 백엔드 로그"
    echo "  ./dev.sh status       # 상태 확인"
    ;;

  *)
    # 기본 동작: rebuild
    # Load environment variables for display
    if [ -f "$SCRIPT_DIR/.env" ]; then
        export $(grep -v '^#' "$SCRIPT_DIR/.env" | grep -E 'FRONTEND_PORT|BACKEND_PORT|POSTGRES_PORT' | xargs)
    fi

    echo "🔨 Rebuilding and restarting all services..."
    docker-compose down
    docker-compose up -d --build backend db
    sleep 3
    start_frontend
    echo "✅ Rebuild complete!"
    echo "   - Frontend: http://localhost:${FRONTEND_PORT:-24051} (local)"
    echo "   - Backend:  http://localhost:${BACKEND_PORT:-25051} (docker)"
    echo "   - DB:       localhost:${POSTGRES_PORT:-5444} (docker)"
    echo ""
    echo "💡 Tip: ./dev.sh help 명령어로 도움말을 확인하세요"
    ;;
esac
