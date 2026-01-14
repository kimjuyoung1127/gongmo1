"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

type Section = "bom" | "product-guide" | "sop" | "policy" | "wiki";
type Msg = { role: "user" | "assistant"; content: string };

const SECTION_LABEL: Record<Section, string> = {
  bom: "BOM 조회",
  "product-guide": "제품 가이드",
  sop: "작업 지시서(SOP)",
  policy: "인사·복지 & 안전 지침",
  wiki: "현장 용어 위키",
};

export default function SectionChatPage() {
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const lang = params.lang ?? "ko";
  const sp = useSearchParams();

  const section = (sp.get("section") ?? "bom") as Section;

  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      role: "assistant",
      content: `🤖안녕하세요, "${SECTION_LABEL[section]}" 도우미입니다. 무엇을 도와드릴까요?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const title = useMemo(() => SECTION_LABEL[section] ?? "챗봇", [section]);

  const goBack = () => router.push(`/${lang}/ai-manual/menu`);
  const goConfirm = () => router.push(`/${lang}/ai-manual/menu`); // 요청하신 구조: 확인 누르면 메뉴로

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMsgs: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(nextMsgs);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          lang,
          messages: nextMsgs.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = (await res.json()) as { text?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "API error");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text ?? "" },
      ]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `오류가 발생했습니다: ${e?.message ?? "unknown"}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-3">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <button
            onClick={goBack}
            className="rounded-lg bg-slate-100 px-3 py-2 hover:bg-slate-200 transition"
            aria-label="뒤로가기"
          >
            ←
          </button>

          <div className="text-center">
            <div className="font-extrabold text-slate-900">{title}</div>
            <div className="text-xs text-slate-500">
              언어: {lang.toUpperCase()} · 섹션: {section}
            </div>
          </div>

          <button
            onClick={() => setMessages([{ role: "assistant", content: `대화를 초기화했습니다.  "${title}" 질문을 다시 입력해주세요.` }])}
            className="rounded-lg bg-slate-100 px-3 py-2 hover:bg-slate-200 transition text-sm"
          >
            초기화
          </button>
        </div>

        {/* Chat area */}
        <div className="p-4 h-[65vh] overflow-auto space-y-3 bg-slate-50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  m.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-900 border"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-slate-900 border rounded-2xl px-4 py-3 text-sm shadow-sm">
                답변 생성 중...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="질문을 입력하세요"
              className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              onClick={send}
              disabled={loading}
              className="rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold px-4 py-3 transition"
            >
              전송
            </button>
          </div>

          {/* Confirm → Menu */}
          <button
            onClick={goConfirm}
            className="mt-3 w-full rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 transition"
          >
            ✅ 내용을 확인했습니다 (메뉴로)
          </button>
        </div>
      </div>
    </main>
  );
}
