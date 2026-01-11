'use client';

import { useRouter, useParams } from 'next/navigation';

const NOT_READY_MESSAGE = '아직 개발중인 기능이에요';

export default function NotFound() {
  const router = useRouter();
  const params = useParams<{ lang?: string }>();
  const lang = typeof params?.lang === 'string' ? params.lang : 'ko';

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6 text-center">
      <div className="space-y-4">
        <h1 className="text-xl font-semibold text-white">{NOT_READY_MESSAGE}</h1>
        <p className="text-sm text-gray-400">요청하신 페이지를 찾을 수 없습니다.</p>
        <button
          type="button"
          onClick={() => router.replace(`/${lang}`)}
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
