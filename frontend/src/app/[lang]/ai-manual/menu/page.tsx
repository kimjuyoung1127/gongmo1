"use client";

import { useParams, useRouter } from "next/navigation";

type Section = "bom" | "product-guide" | "sop" | "policy" | "wiki";

type Tile = {
  title: string;
  desc: string;
  emoji: string;
  bg: string;
  section: Section;
};

export default function MenuPage() {
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const lang = params.lang ?? "ko";

  const goBack = () => {
    router.push(`/${lang}/ai-manual`);
  };

  const tiles: Tile[] = [
    {
      title: "BOM 조회",
      desc: "품번별 부품/수량",
      emoji: "📦",
      bg: "bg-blue-600",
      section: "bom",
    },
    {
      title: "제품 가이드",
      desc: "용도/형상 정보",
      emoji: "📄",
      bg: "bg-green-600",
      section: "product-guide",
    },
    {
      title: "작업 지시서",
      desc: "공정별 작업 절차 확인",
      emoji: "🧾",
      bg: "bg-orange-600",
      section: "sop",
    },
    {
      title: "인사·복지 & 안전 지침",
      desc: "사내 규정 및 복리후생 질의응답",
      emoji: "📘",
      bg: "bg-purple-600",
      section: "policy",
    },
    {
      title: "현장 용어 위키(Wiki)",
      desc: "현장 전문용어 풀이",
      emoji: "💬",
      bg: "bg-indigo-600",
      section: "wiki",
    },
  ];

  const openSection = (section: Section) => {
    router.push(`/${lang}/ai-manual/chat?section=${section}`);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-3">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm p-4 sm:p-6">
        {/* 헤더 */}
        <div className="relative">
          <button
            onClick={goBack}
            className="absolute left-0 top-0 rounded-lg bg-slate-100 px-3 py-2 hover:bg-slate-200 transition"
            aria-label="뒤로가기"
          >
            ←
          </button>

          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              메인 메뉴
            </div>
            <div className="mt-1 text-slate-500 text-sm">
              필요한 정보를 선택하세요
            </div>

            <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-bold">
                언어: {lang.toUpperCase()}
              </span>
              <span className="rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-bold">
                상태: 더미(일반 챗봇)
              </span>
              <span className="rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-bold">
                연결: GPT API
              </span>
            </div>
          </div>
        </div>

        {/* 타일 */}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-3">
          {tiles.map((t) => (
            <button
              key={t.title}
              onClick={() => openSection(t.section)}
              className={`${t.bg} rounded-2xl p-3 sm:p-4 text-white text-left hover:opacity-95 transition min-h-[96px]`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-2xl sm:text-3xl leading-none">{t.emoji}</div>
                <div className="text-[10px] sm:text-xs bg-white/15 px-2 py-1 rounded-full">
                  열기
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
          메인 화면으로 돌아가기
        </button>
      </div>
    </main>
  );
}
