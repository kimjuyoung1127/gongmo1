# WeWorkHere 배포 가이드

> weworkhere.alldatabox.com 배포 절차

---

## 1. 사전 준비사항

### 필수 요구사항
- Docker & Docker Compose 설치됨
- Cloudflare 계정 및 alldatabox.com 도메인 접근 권한
- cloudflared CLI 설치됨
- shared_db_network 네트워크 생성됨

### 네트워크 확인/생성
```bash
# shared_db_network 확인
docker network ls | grep shared_db_network

# 없으면 생성
docker network create shared_db_network
```

---

## 2. 프로젝트 설정

### 2.1 환경 변수 설정
`.env` 파일이 이미 생성되어 있습니다. 필요시 수정하세요:

```bash
# JWT Secret Key 변경 권장
JWT_SECRET_KEY=your_very_secure_secret_key_here

# PostgreSQL 비밀번호 변경 권장
POSTGRES_PASSWORD=your_secure_db_password_here
```

### 2.2 포트 확인
- Frontend: 24050
- Backend: 25050
- Database: 5443 (외부) / 5432 (내부)

---

## 3. Cloudflare Tunnel 설정

### 3.1 Tunnel 생성
```bash
# Tunnel 생성
cloudflared tunnel create weworkhere-tunnel

# 출력된 Tunnel ID를 기록해두세요
# 예: a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

### 3.2 DNS 라우팅 설정
```bash
# DNS CNAME 레코드 생성
cloudflared tunnel route dns weworkhere-tunnel weworkhere.alldatabox.com
```

### 3.3 Tunnel 설정 파일 생성
```bash
# 템플릿 복사
cp weworkhere-config.yml.template ~/.cloudflared/weworkhere-config.yml

# YOUR_TUNNEL_ID_HERE를 실제 Tunnel ID로 변경
# macOS
sed -i '' 's/YOUR_TUNNEL_ID_HERE/실제_Tunnel_ID/g' ~/.cloudflared/weworkhere-config.yml

# Linux
sed -i 's/YOUR_TUNNEL_ID_HERE/실제_Tunnel_ID/g' ~/.cloudflared/weworkhere-config.yml
```

**또는 수동으로 편집:**
```bash
nano ~/.cloudflared/weworkhere-config.yml
```

---

## 4. 애플리케이션 배포

### 4.1 Docker Compose로 배포
```bash
cd /Users/jonghojung/Desktop/hackerton/gongmo1

# 빌드 및 시작
docker-compose up -d --build

# 로그 확인
docker-compose logs -f

# 특정 서비스 로그만 확인
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f db
```

### 4.2 서비스 상태 확인
```bash
# 컨테이너 상태
docker-compose ps

# Health check 확인
docker inspect weworkhere_frontend | grep -A 5 Health
docker inspect weworkhere_backend | grep -A 5 Health

# 로컬 접속 테스트
curl http://localhost:24050
curl http://localhost:25050/health
```

---

## 5. Cloudflare Tunnel 실행

### 5.1 Tunnel 서비스 시작
```bash
# 포그라운드 실행 (테스트용)
cloudflared tunnel --config ~/.cloudflared/weworkhere-config.yml run weworkhere-tunnel

# 백그라운드 실행
nohup cloudflared tunnel --config ~/.cloudflared/weworkhere-config.yml run weworkhere-tunnel > ~/.cloudflared/weworkhere.log 2>&1 &

# 로그 확인
tail -f ~/.cloudflared/weworkhere.log
```

### 5.2 Tunnel 서비스 등록 (선택사항 - macOS launchd)
```bash
# Tunnel을 시스템 서비스로 등록
sudo cloudflared service install

# 서비스 시작
sudo launchctl start com.cloudflare.cloudflared
```

---

## 6. 배포 확인

### 6.1 로컬 테스트
```bash
# Frontend
curl http://localhost:24050

# Backend API
curl http://localhost:25050/health
curl http://localhost:25050/api/v1/categories
```

### 6.2 공개 URL 테스트
```bash
# Frontend
curl https://weworkhere.alldatabox.com

# Backend API
curl https://weworkhere.alldatabox.com/api/v1/health
curl https://weworkhere.alldatabox.com/api/v1/categories
```

### 6.3 브라우저 테스트
- https://weworkhere.alldatabox.com
- 한국어, 영어, 베트남어, 네팔어 전환 확인
- 게시글 작성/조회 테스트
- 댓글 작성/삭제 테스트

---

## 7. 운영 관리

### 7.1 재배포 (코드 업데이트 후)
```bash
cd /Users/jonghojung/Desktop/hackerton/gongmo1

# 서비스 중지
docker-compose down

# 빌드 및 재시작
docker-compose up -d --build

# 로그 확인
docker-compose logs -f
```

### 7.2 개별 서비스 재시작
```bash
# Frontend만 재시작
docker-compose restart frontend

# Backend만 재시작
docker-compose restart backend
```

### 7.3 데이터베이스 마이그레이션
```bash
# Backend 컨테이너 진입
docker exec -it weworkhere_backend bash

# 마이그레이션 실행
alembic upgrade head

# 새 마이그레이션 생성 (모델 변경 시)
alembic revision --autogenerate -m "description"
```

### 7.4 로그 관리
```bash
# 실시간 로그 확인
docker-compose logs -f

# 최근 100줄만 확인
docker-compose logs --tail=100

# 특정 서비스만
docker-compose logs -f backend

# Cloudflare Tunnel 로그
tail -f ~/.cloudflared/weworkhere.log
```

---

## 8. 트러블슈팅

### 8.1 컨테이너가 시작되지 않을 때
```bash
# 컨테이너 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs backend
docker-compose logs frontend

# 네트워크 확인
docker network inspect weworkhere_network
docker network inspect shared_db_network
```

### 8.2 데이터베이스 연결 실패
```bash
# DB 컨테이너 상태 확인
docker-compose ps db

# DB 로그 확인
docker-compose logs db

# DB 직접 접속 테스트
docker exec -it weworkhere_db psql -U weworkhere_user -d weworkhere_db
```

### 8.3 Cloudflare Tunnel 연결 안 됨
```bash
# Tunnel 상태 확인
cloudflared tunnel info weworkhere-tunnel

# DNS 레코드 확인
cloudflared tunnel route ip show weworkhere-tunnel

# Tunnel 재시작
pkill cloudflared
cloudflared tunnel --config ~/.cloudflared/weworkhere-config.yml run weworkhere-tunnel
```

### 8.4 포트 충돌
```bash
# 포트 사용 확인
lsof -i :24050
lsof -i :25050
lsof -i :5443

# 프로세스 종료
kill -9 <PID>
```

---

## 9. 보안 체크리스트

- [ ] `.env` 파일의 JWT_SECRET_KEY 변경
- [ ] `.env` 파일의 POSTGRES_PASSWORD 변경
- [ ] `.env` 파일을 git에 커밋하지 않았는지 확인 (.gitignore 확인)
- [ ] ALLOWED_ORIGINS가 프로덕션 도메인으로 설정됨
- [ ] Cloudflare Tunnel credentials 파일 권한 확인 (600)

```bash
# Credentials 파일 권한 설정
chmod 600 ~/.cloudflared/*.json
chmod 600 ~/.cloudflared/weworkhere-config.yml
```

---

## 10. 모니터링

### 10.1 컨테이너 리소스 사용량
```bash
docker stats weworkhere_frontend weworkhere_backend weworkhere_db
```

### 10.2 디스크 사용량
```bash
# Docker 볼륨 확인
docker volume ls | grep weworkhere

# 볼륨 상세 정보
docker volume inspect gongmo1_weworkhere_postgres_data
```

### 10.3 Health Check
```bash
# 주기적으로 확인
while true; do
  echo "=== $(date) ==="
  curl -s http://localhost:25050/health | jq
  sleep 60
done
```

---

## 11. 백업 및 복구

### 11.1 데이터베이스 백업
```bash
# 백업 디렉토리 생성
mkdir -p ~/backups/weworkhere

# 데이터베이스 덤프
docker exec weworkhere_db pg_dump -U weworkhere_user weworkhere_db > ~/backups/weworkhere/backup_$(date +%Y%m%d_%H%M%S).sql

# 압축
gzip ~/backups/weworkhere/backup_*.sql
```

### 11.2 데이터베이스 복구
```bash
# 압축 해제
gunzip ~/backups/weworkhere/backup_YYYYMMDD_HHMMSS.sql.gz

# 복구
docker exec -i weworkhere_db psql -U weworkhere_user weworkhere_db < ~/backups/weworkhere/backup_YYYYMMDD_HHMMSS.sql
```

---

## 12. 빠른 명령어 참조

```bash
# 배포
cd /Users/jonghojung/Desktop/hackerton/gongmo1 && docker-compose up -d --build

# 재시작
docker-compose restart

# 중지
docker-compose down

# 로그
docker-compose logs -f

# 상태 확인
docker-compose ps && curl http://localhost:25050/health

# Tunnel 시작
cloudflared tunnel --config ~/.cloudflared/weworkhere-config.yml run weworkhere-tunnel

# 백업
docker exec weworkhere_db pg_dump -U weworkhere_user weworkhere_db | gzip > ~/backups/weworkhere/backup_$(date +%Y%m%d).sql.gz
```

---

**Last Updated**: 2026-01-10
**Version**: 1.0.0
