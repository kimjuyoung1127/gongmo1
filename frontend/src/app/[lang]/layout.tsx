import { getDictionary } from '@/dictionaries';
import { DictionaryProvider } from '@/contexts/DictionaryContext';
import { Header } from '@/components/materials/Header';
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
      <div className="min-h-screen pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0"> {/* Added padding for global bottom nav */}
        <Header />
        <main className="w-full min-h-full">
          {children}
        </main>
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </DictionaryProvider>
  );
}
