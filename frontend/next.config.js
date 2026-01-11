/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    // BACKEND_URL 환경변수 필수 사용
    // 로컬 개발: http://localhost:25051
    // Docker: http://backend:25050
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      console.warn('⚠️  BACKEND_URL 환경변수가 설정되지 않았습니다. .env 파일을 확인하세요.');
      return [];
    }

    return [
      {
        source: '/api/v1/:path*',
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ];
  },
}

module.exports = nextConfig
