import fs from "fs";
import path from "path";

export type RagSection = "bom" | "product-guide" | "sop" | "policy" | "wiki";

export type RagChunk = {
  id: string;
  section: RagSection;
  title: string;
  content: string;
  source?: string;
  embedding: number[];
};

type RagIndex = {
  version: string;
  model: string;
  chunks: RagChunk[];
};

const INDEX_PATH = path.join(process.cwd(), "src", "data", "rag", "index.json");

let cached: RagIndex | null = null;

export function loadIndex(): RagIndex {
  if (cached) return cached;
  const raw = fs.readFileSync(INDEX_PATH, "utf-8");
  cached = JSON.parse(raw) as RagIndex;
  return cached;
}

function dot(a: number[], b: number[]) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function norm(a: number[]) {
  return Math.sqrt(dot(a, a));
}

function cosineSim(a: number[], b: number[]) {
  const denom = norm(a) * norm(b);
  if (!denom) return 0;
  return dot(a, b) / denom;
}

export function searchChunks(params: {
  queryEmbedding: number[];
  section?: RagSection;
  topK?: number;
}) {
  const { queryEmbedding, section, topK = 5 } = params;
  const index = loadIndex();

  const pool = section
    ? index.chunks.filter((c) => c.section === section)
    : index.chunks;

  const scored = pool
    .map((c) => ({
      chunk: c,
      score: cosineSim(queryEmbedding, c.embedding),
    }))
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
}
