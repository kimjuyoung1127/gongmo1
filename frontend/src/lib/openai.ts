import "server-only";
import OpenAI from "openai";

/**
 * Next.js 서버 전용 OpenAI 클라이언트
 * - 절대 client 컴포넌트에서 import 하지 마세요.
 */
export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  return new OpenAI({ apiKey });
}
