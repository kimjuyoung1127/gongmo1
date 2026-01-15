"use client";

import { Suspense, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDictionary } from "@/contexts/DictionaryContext";

type Section = "bom" | "product-guide" | "sop" | "policy" | "wiki";
type Msg = { role: "user" | "assistant"; content: string };

const SECTIONS: Section[] = ["bom", "product-guide", "sop", "policy", "wiki"];

function isSection(value: string | null): value is Section {
  return !!value && SECTIONS.includes(value as Section);
}

function ChatContent() {
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const lang = params.lang ?? "ko";
  const sp = useSearchParams();
  const dict = useDictionary();

  const rawSection = sp.get("section");
  const section: Section = isSection(rawSection) ? rawSection : "bom";
  const sectionLabel =
    dict.aiManualChat.sections[section] ?? dict.aiManualChat.titleFallback;
  const greeting = dict.aiManualChat.assistantGreeting.replace(
    "{section}",
    sectionLabel
  );

  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      role: "assistant",
      content: greeting,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const title = sectionLabel || dict.aiManualChat.titleFallback;

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
          {
            role: "assistant",
            content: data.answer ?? dict.aiManualChat.answerUnavailable,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `${dict.aiManualChat.errorPrefix}${data.error ?? res.statusText}`,
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `${dict.aiManualChat.networkErrorPrefix}${err.message}`,
        },
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
          ← {dict.common.back}
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
              {dict.aiManualChat.loadingResponse}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t p-3 flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={dict.aiManualChat.inputPlaceholder}
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
          {dict.aiManualChat.send}
        </button>
      </div>

      {/* Confirm Button */}
      <div className="bg-gray-100 border-t p-3">
        <button
          onClick={goConfirm}
          className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700"
        >
          {dict.common.confirm}
        </button>
      </div>
    </div>
  );
}

export default function SectionChatPage() {
  const dict = useDictionary();
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          {dict.common.loading}
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
