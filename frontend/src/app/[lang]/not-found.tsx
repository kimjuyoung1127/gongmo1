'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getDictionary, Dictionary } from '@/dictionaries';
import { Locale } from '@/types/common';

export default function NotFound() {
  const router = useRouter();
  const params = useParams<{ lang?: string }>();
  const lang = (typeof params?.lang === 'string' ? params.lang : 'ko') as Locale;
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    getDictionary(lang).then(setDict);
  }, [lang]);

  const t = dict?.notFound;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6 text-center">
      <div className="space-y-4">
        <h1 className="text-xl font-semibold text-white">
          {t?.title || 'Feature Under Development'}
        </h1>
        <p className="text-sm text-gray-400">
          {t?.description || 'The page you requested could not be found.'}
        </p>
        <button
          type="button"
          onClick={() => router.replace(`/${lang}`)}
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          {t?.homeButton || 'Go to Home'}
        </button>
      </div>
    </div>
  );
}
