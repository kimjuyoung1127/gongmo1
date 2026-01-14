import { NextResponse } from "next/server";

// Temporary placeholder - implement when OpenAI integration is ready
export async function POST() {
  return NextResponse.json({ error: "Not implemented yet" }, { status: 501 });
}

// import { NextResponse } from "next/server";
// import { openai } from "@/lib/openai";
// import { buildContext, buildSystemPrompt } from "@/lib/rag/prompt";
// import { RagSection, searchChunks } from "@/lib/rag/store";

// type ReqBody = {
//   message: string;
//   section?: RagSection; // "bom" | "product-guide" | "sop" | "policy" | "wiki"
//   topK?: number;
// };

// export async function POST(req: Request) {
//   try {
//     const body = (await req.json()) as ReqBody;
//     const message = (body.message ?? "").trim();
//     const section = body.section;
//     const topK = body.topK ?? 5;

//     if (!message) {
//       return NextResponse.json({ error: "message is required" }, { status: 400 });
//     }

//     // 1) Query Embedding
//     const emb = await openai.embeddings.create({
//       model: process.env.OPENAI_EMBEDDING_MODEL ?? "text-embedding-3-small",
//       input: message,
//     });

//     const queryEmbedding = emb.data[0].embedding;

//     // 2) Vector Search
//     const hits = searchChunks({ queryEmbedding, section, topK });
//     const contexts = hits.map((h) => h.chunk);

//     // 3) LLM Answer with retrieved context
//     const system = buildSystemPrompt(section);
//     const contextText = buildContext(contexts);

//     const resp = await openai.responses.create({
//       model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
//       input: [
//         {
//           role: "system",
//           content: system,
//         },
//         {
//           role: "user",
//           content: `Context:\n${contextText}\n\nUser question:\n${message}`,
//         },
//       ],
//     });

//     // Responses API output 파싱(텍스트만)
//     const text =
//       resp.output_text ??
//       "No textual output was returned. Please check your model/output settings.";

//     return NextResponse.json({
//       answer: text,
//       citations: hits.map((h, i) => ({
//         rank: i + 1,
//         score: h.score,
//         id: h.chunk.id,
//         title: h.chunk.title,
//         source: h.chunk.source ?? "internal",
//       })),
//     });
//   } catch (e: any) {
//     return NextResponse.json(
//       { error: e?.message ?? "unknown error" },
//       { status: 500 }
//     );
//   }
// }
