import bomData from "@/data/bom.json";
import sopData from "@/data/sop.json"; // [추가] SOP 파일 불러오기

export type RagSection = "bom" | "product-guide" | "sop" | "policy" | "wiki";

const dataMap: Record<RagSection, any> = {
  bom: bomData,
  sop: sopData, // [추가] 섹션 연결
  "product-guide": null,
  policy: null,
  wiki: null,
};

export function getContextData(section: RagSection): string {
  const data = dataMap[section];
  if (!data) return "";
  return JSON.stringify(data, null, 2);
}