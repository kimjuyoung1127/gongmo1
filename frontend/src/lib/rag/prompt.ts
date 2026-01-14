import { RagChunk } from "./store";

export function buildSystemPrompt(section?: string) {
  return [
    "You are a helpful factory floor assistant.",
    "Answer in the user's language.",
    "If the answer is not supported by the provided context, say you don't know and ask a clarifying question.",
    section ? `Current section: ${section}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildContext(chunks: RagChunk[]) {
  return chunks
    .map((c, i) => {
      return `[#${i + 1}] (${c.section}) ${c.title}\n${c.content}\nSOURCE: ${
        c.source ?? "internal"
      }`;
    })
    .join("\n\n");
}
