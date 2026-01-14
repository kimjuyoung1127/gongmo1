"use client";

import { Suspense, useMemo, useState } from "react";
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

function ChatContent() {
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
  const goConfirm = () => router.push(`/${lang}/ai-manual/menu`);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setLoading(true);

    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("/api/rag-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, section, topK: 5 }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer ?? "답변을 생성하지 못했습니다." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `❌ 오류: ${data.error ?? res.statusText}` },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `❌ 통신 오류: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 bg-gray-900 text-white px-4 py-3 shadow">
        <button
          onClick={goBack}
          className="text-sm font-medium hover:underline"
        >
          ← 뒤로
        </button>
        <h1 className="text-lg font-bold">{title}</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                m.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 border"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-lg border text-gray-500">
              응답 중...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t p-3 flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="질문을 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          disabled={loading}
        />
        <button
          onClick={send}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          전송
        </button>
      </div>

      {/* Confirm Button */}
      <div className="bg-gray-100 border-t p-3">
        <button
          onClick={goConfirm}
          className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default function SectionChatPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}
