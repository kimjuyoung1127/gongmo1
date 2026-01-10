import { getDictionary } from '@/dictionaries';
import { DictionaryProvider } from '@/contexts/DictionaryContext';
import { Locale } from '@/types/common';

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }, { lang: 'vi' }, { lang: 'ne' }];
}

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      type: 'website',
      locale: params.lang,
    },
  };
}

import { BottomNav } from '@/components/materials/BottomNav';

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <DictionaryProvider dictionary={dictionary} lang={params.lang}>
      <div className="min-h-screen bg-gray-50 pb-[calc(4rem+env(safe-area-inset-bottom))]"> {/* Added padding for global bottom nav */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </DictionaryProvider>
  );
}
