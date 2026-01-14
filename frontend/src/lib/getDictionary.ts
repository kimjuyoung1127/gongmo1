// src/lib/getDictionary.ts
export type Lang = "ko" | "en" | "vi";

export async function getDictionary(lang: Lang) {
  switch (lang) {
    case "en":
      return (await import("@/dictionaries/en.json")).default;
    case "vi":
      return (await import("@/dictionaries/vi.json")).default;
    case "ko":
    default:
      return (await import("@/dictionaries/ko.json")).default;
  }
}
