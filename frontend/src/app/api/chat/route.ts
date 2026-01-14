// src/app/api/chat/route.ts
import { NextResponse } from "next/server";
import { getOpenAIClient } from "@/lib/openai";

type RagSection = "bom" | "product-guide" | "sop" | "policy" | "wiki";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ReqBody = {
  lang: string;
  section: RagSection;
  messages: ChatMessage[];
};

function systemPrompt(lang: string, section: RagSection) {
  const localeGuide =
    lang === "ko"
      ? "답변은 한국어로 해."
      : lang === "vi"
      ? "Trả lời bằng tiếng Việt."
      : lang === "en"
      ? "Answer in English."
      : "Answer in the user's language.";

  const sectionGuide: Record<RagSection, string> = {
    bom: "너는 제조 현장의 BOM(부품 구성) 안내 챗봇이야. 부품/구성/조립 실수 방지 중심으로 답해.",
    "product-guide":
      "너는 제품 용도/최종 사용처/기능 중요도를 설명하는 챗봇이야. 작업자의 맥락 이해를 돕게 답해.",
    sop: "너는 공정 표준작업(SOP) 안내 챗봇이야. 단계별 체크리스트/주의사항/필요 공구를 구조적으로 답해.",
    policy:
      "너는 인사/복지/안전 규정 안내 챗봇이야. 안전(PPE), 휴가, 식단, 기숙사 규정 등을 명확히 안내해.",
    wiki: "너는 현장 용어 위키 챗봇이야. 약어/은어/전문용어를 쉬운 예시로 풀이해.",
  };

  return `${localeGuide}\n${sectionGuide[section]}\n모르면 모른다고 말하고, 확인이 필요한 질문을 1~2개로 좁혀서 되물어.`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody;

    // 서버에서 env 확인
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is missing" },
        { status: 500 }
      );
    }

    const openai = getOpenAIClient();
    const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt(body.lang, body.section) },
        ...body.messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      temperature: 0.3,
    });

    const text =
      completion.choices?.[0]?.message?.content ??
      "죄송합니다. 응답을 생성했지만 텍스트를 추출하지 못했습니다.";

    return NextResponse.json({ text });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
