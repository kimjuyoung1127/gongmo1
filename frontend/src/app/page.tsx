"use client";

import { useRouter } from "next/navigation";

export default function LanguageSelectPage() {
  const router = useRouter();

  const selectLang = (lang: "ko" | "en" | "vi") => {
    router.push(`/${lang}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6">언어 선택</h1>

        <div className="space-y-3">
          <button
            onClick={() => selectLang("ko")}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold"
          >
            한국어
          </button>

          <button
            onClick={() => selectLang("en")}
            className="w-full py-3 rounded-xl bg-green-600 text-white font-bold"
          >
            English
          </button>

          <button
            onClick={() => selectLang("vi")}
            className="w-full py-3 rounded-xl bg-orange-600 text-white font-bold"
          >
            Tiếng Việt
          </button>
        </div>
      </div>
    </main>
  );
}
