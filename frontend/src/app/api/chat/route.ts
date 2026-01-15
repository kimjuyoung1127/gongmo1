import { NextResponse } from "next/server";
import { getOpenAIClient } from "@/lib/openai"; // 기존 openai 설정 파일
import { getContextData, type RagSection } from "@/lib/context-loader";

// 요청 데이터 타입 정의
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ReqBody = {
  lang: string;
  section: RagSection;
  messages: ChatMessage[];
};

// 시스템 프롬프트 생성 함수
function systemPrompt(lang: string, section: RagSection, contextData: string) {
  // 1. 언어 설정
  const localeGuide =
    lang === "ko"
      ? "답변은 한국어로 해."
      : lang === "vi"
      ? "Trả lời bằng tiếng Việt."
      : lang === "km"
      ? "សូមឆ្លើយជាភាសាខ្មែរ។"
      : lang === "en"
      ? "Answer in English."
      : "Answer in the user's language.";
    lang === "ko" ? "한국어로 답변해." :
    lang === "en" ? "Answer in English." : "Answer in the user's language.";

  // 2. 역할 설정 (섹션별 페르소나)
  const roleDefinitions: Record<RagSection, string> = {
    bom: "너는 제조 현장의 자재/부품(BOM) 전문가야. 사용자가 '부품 번호'를 물어보면 제공된 데이터에서 정확히 찾아 설명해.",
    "product-guide": "너는 제품 가이드 챗봇이야.",
    sop: "너는 생산 공정 문제 해결사야. 작업자가 특정 부품의 공정 단계나 불량 증상을 말하면, 제공된 [SOP 데이터]에서 정확한 '조치 방법(Action)'을 찾아 안내해.",
    policy: "너는 사내 규정 안내 챗봇이야.",
    wiki: "너는 현장 용어 위키 챗봇이야.",
  };

  // 3. 최종 프롬프트 조합
  return `
    [Role]
    ${roleDefinitions[section]}
    ${localeGuide}

    [Context Data]
    아래 데이터를 지식 기반으로 사용하여 답변해:
    """
    ${contextData}
    """

    [Instructions]
    1. 사용자가 부품 번호(예: 45410-xxxx)를 물어보면, [Context Data]의 'items' 목록에서 해당 부품을 찾아 'system_name', 'location', 'customer_impact'를 요약해서 설명해.
    2. SOP 관련 질문 시:
       - "3단계 불량", "바코드 인식 안됨" 등 문제 상황을 말하면 -> 해당 단계의 'ng'(불량유형)와 일치하는지 확인하고 'action'(조치방법)을 명확히 제시해.
       - "전체 공정 알려줘"라고 하면 -> 1번부터 10번까지의 'process'를 요약해서 순서대로 나열해.
    3. 데이터에 없는 내용은 "해당 공정 데이터가 없습니다"라고 답해.
    4. 조치 방법(Action)은 단호하고 명확하게 지시형으로 말해. (예: "~하십시오", "~할 것")
    2. 데이터에 없는 부품 번호를 물어보면 "해당 부품 번호에 대한 정보가 데이터에 없습니다."라고 말해.
    3. 없는 정보를 지어내지 마 (No Hallucination).
  `;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody;

    // API 키 확인
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY missing" }, { status: 500 });
    }

    const openai = getOpenAIClient();
    
    // 데이터 로드 (여기서 bom.json 내용을 가져옴)
    const contextData = getContextData(body.section);

    // AI 요청
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini", // 혹은 gpt-3.5-turbo
      messages: [
        { 
          role: "system", 
          content: systemPrompt(body.lang, body.section, contextData) 
        },
        ...body.messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      temperature: 0.1, // 정확한 정보 검색을 위해 창의성(temperature)을 낮춤
    });

    const text = completion.choices?.[0]?.message?.content ?? "응답을 생성하지 못했습니다.";

    return NextResponse.json({ text });

  } catch (e: any) {
    console.error("Chat API Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}