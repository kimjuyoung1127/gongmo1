import bomData from "@/data/bom.json";
import sopData from "@/data/sop.json";
import productGuideData from "@/data/product-guide.json";

export type RagSection = "bom" | "product-guide" | "sop" | "policy" | "wiki";

const dataMap: Record<RagSection, any> = {
  bom: bomData,
  sop: sopData,
  "product-guide": productGuideData,
  policy: null,
  wiki: null,
};

export function getContextData(section: RagSection): string {
  const data = dataMap[section];
  if (!data) return "";
  return JSON.stringify(data, null, 2);
}