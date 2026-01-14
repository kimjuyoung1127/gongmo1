// src/app/[lang]/layout.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/dictionaries";
import { DictionaryProvider } from "@/contexts/DictionaryContext";
import { Header } from "@/components/materials/Header";
import { BottomNav } from "@/components/materials/BottomNav";
import type { Locale } from "@/types/common";

const SUPPORTED_LOCALES = ["ko", "en", "vi", "ne"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function isSupportedLocale(lang: string): lang is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(lang);
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  // 안전장치: 지원하지 않는 lang면 기본값으로 처리하거나 notFound 처리
  const lang = isSupportedLocale(params.lang) ? params.lang : "ko";
  const dict = await getDictionary(lang);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      type: "website",
      locale: lang,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  // 1) URL lang 검증
  if (!isSupportedLocale(params.lang)) {
    notFound();
  }

  // 2) lang별 dictionary 주입
  const dictionary = await getDictionary(params.lang);

  return (
    <DictionaryProvider dictionary={dictionary} lang={params.lang}>
      <div className="min-h-screen pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0"> {/* Added padding for global bottom nav */}
        <Header />
        <main className="w-full min-h-full pt-16">{children}</main>
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>

    </DictionaryProvider>
  );
}
