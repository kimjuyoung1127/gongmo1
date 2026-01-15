/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  
  // 👈 HTTP 타임아웃 설정 추가 (2분)
  httpAgentOptions: {
    keepAlive: true,
  },
  
  images: {
    domains: ['localhost'],
  },
  
  async rewrites() {
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