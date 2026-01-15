"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDictionary, Dictionary } from "@/dictionaries";
import { Locale } from "@/types/common";

type Section = "bom" | "product-guide" | "sop" | "policy" | "wiki";

export default function MenuPage() {
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const lang = (params.lang ?? "ko") as Locale;
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    getDictionary(lang).then(setDict);
  }, [lang]);

  const goBack = () => {
    router.push(`/${lang}/ai-manual`);
  };

  const openSection = (section: Section) => {
    router.push(`/${lang}/ai-manual/chat?section=${section}`);
  };

  if (!dict) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Loading...</div>
      </main>
    );
  }

  const tiles = [
    {
      title: dict.aiManualMenu.bomTitle,
      desc: dict.aiManualMenu.bomDesc,
      emoji: "📦",
      bg: "bg-blue-600",
      section: "bom" as Section,
    },
    {
      title: dict.aiManualMenu.productGuideTitle,
      desc: dict.aiManualMenu.productGuideDesc,
      emoji: "📄",
      bg: "bg-green-600",
      section: "product-guide" as Section,
    },
    {
      title: dict.aiManualMenu.sopTitle,
      desc: dict.aiManualMenu.sopDesc,
      emoji: "🧾",
      bg: "bg-orange-600",
      section: "sop" as Section,
    },
    {
      title: dict.aiManualMenu.policyTitle,
      desc: dict.aiManualMenu.policyDesc,
      emoji: "📘",
      bg: "bg-purple-600",
      section: "policy" as Section,
    },
    {
      title: dict.aiManualMenu.wikiTitle,
      desc: dict.aiManualMenu.wikiDesc,
      emoji: "💬",
      bg: "bg-indigo-600",
      section: "wiki" as Section,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-3">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm p-4 sm:p-6">
        {/* 헤더 */}
        <div className="relative">
          <button
            onClick={goBack}
            className="absolute left-0 top-0 rounded-lg bg-slate-100 px-3 py-2 hover:bg-slate-200 transition"
            aria-label={dict.common.back}
          >
            ←
          </button>

          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {dict.aiManualMenu.mainMenu}
            </div>
            <div className="mt-1 text-slate-500 text-sm">
              {dict.aiManualMenu.selectInfo}
            </div>

            <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-bold">
                {dict.aiManualMenu.language}: {lang.toUpperCase()}
              </span>
              <span className="rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-bold">
                {dict.aiManualMenu.status}: {dict.aiManualMenu.statusDummy}
              </span>
              <span className="rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-bold">
                {dict.aiManualMenu.connection}: GPT API
              </span>
            </div>
          </div>
        </div>

        {/* 타일 */}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-3">
          {tiles.map((t) => (
            <button
              key={t.section}
              onClick={() => openSection(t.section)}
              className={`${t.bg} rounded-2xl p-3 sm:p-4 text-white text-left hover:opacity-95 transition min-h-[96px]`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-2xl sm:text-3xl leading-none">{t.emoji}</div>
                <div className="text-[10px] sm:text-xs bg-white/15 px-2 py-1 rounded-full">
                  {dict.aiManualMenu.open}
                </div>
              </div>

              <div className="mt-2 font-extrabold text-sm sm:text-base leading-tight">
                {t.title}
              </div>
              <div className="mt-1 text-white/80 text-xs leading-snug">
                {t.desc}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => router.push(`/${lang}`)}
          className="mt-4 w-full rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 transition"
        >
          {dict.aiManualMenu.backToMain}
        </button>
      </div>
    </main>
  );
}
