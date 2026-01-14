import fs from "fs";
import path from "path";
import OpenAI from "openai";

type RagSection = "bom" | "product-guide" | "sop" | "policy" | "wiki";

type Chunk = {
  id: string;
  section: RagSection;
  title: string;
  content: string;
  source?: string;
  embedding: number[];
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const SECTIONS: RagSection[] = ["bom", "product-guide", "sop", "policy", "wiki"];

function listFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".txt"))
    .map((f) => path.join(dir, f));
}

// 아주 단순한 청킹(필요시 고도화)
function chunkText(text: string, maxChars = 900) {
  const cleaned = text.replace(/\r\n/g, "\n").trim();
  const chunks: string[] = [];
  for (let i = 0; i < cleaned.length; i += maxChars) {
    chunks.push(cleaned.slice(i, i + maxChars));
  }
  return chunks;
}

async function main() {
  const root = process.cwd();
  const knowledgeRoot = path.join(root, "knowledge");
  const outDir = path.join(root, "src", "data", "rag");
  const outPath = path.join(outDir, "index.json");
  fs.mkdirSync(outDir, { recursive: true });

  const allChunks: Omit<Chunk, "embedding">[] = [];

  for (const section of SECTIONS) {
    const dir = path.join(knowledgeRoot, section);
    const files = listFiles(dir);

    for (const fp of files) {
      const raw = fs.readFileSync(fp, "utf-8");
      const baseTitle = path.basename(fp);
      const pieces = chunkText(raw);

      pieces.forEach((p, idx) => {
        allChunks.push({
          id: `${section}:${baseTitle}:${idx}`,
          section,
          title: `${baseTitle} #${idx + 1}`,
          content: p,
          source: `knowledge/${section}/${baseTitle}`,
        });
      });
    }
  }

  // Embeddings batch
  const model = process.env.OPENAI_EMBEDDING_MODEL ?? "text-embedding-3-small";

  const chunksWithEmb: Chunk[] = [];
  for (const c of allChunks) {
    const emb = await openai.embeddings.create({
      model,
      input: c.content,
    });
    chunksWithEmb.push({
      ...c,
      embedding: emb.data[0].embedding,
    });
  }

  const index = {
    version: "1.0",
    model,
    chunks: chunksWithEmb,
  };

  fs.writeFileSync(outPath, JSON.stringify(index, null, 2), "utf-8");
  console.log(`Wrote ${chunksWithEmb.length} chunks to ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
