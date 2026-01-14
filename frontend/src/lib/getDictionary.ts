// src/lib/getDictionary.ts
export type Lang = "ko" | "en" | "vi" | "ne" | "km";

export async function getDictionary(lang: Lang) {
  switch (lang) {
    case "en":
      return (await import("@/dictionaries/en.json")).default;
    case "vi":
      return (await import("@/dictionaries/vi.json")).default;
    case "ne":
      return (await import("@/dictionaries/ne.json")).default;
    case "km":
      return (await import("@/dictionaries/km.json")).default;
    case "ko":
    default:
      return (await import("@/dictionaries/ko.json")).default;
  }
}
