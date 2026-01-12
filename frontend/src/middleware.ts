import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["ko", "en", "vi", "ne"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

const DEFAULT_LOCALE: Locale = "ko";

// 정적 파일/next 내부 경로는 미들웨어 적용 제외용
const PUBLIC_FILE = /\.(.*)$/;

function isSupportedLocale(v: string): v is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(v);
}

/**
 * Accept-Language 헤더에서 가장 우선순위 높은 locale 매칭
 * (예: "ko-KR,ko;q=0.9,en;q=0.8" -> "ko")
 */
function pickLocaleFromAcceptLanguage(headerValue: string | null): Locale | null {
  if (!headerValue) return null;

  const parts = headerValue
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  for (const p of parts) {
    const tag = p.split(";")[0]?.trim(); // "ko-KR"
    if (!tag) continue;

    const base = tag.split("-")[0]?.toLowerCase(); // "ko"
    if (base && isSupportedLocale(base)) return base;
  }

  return null;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) next 내부 / 정적 파일 / api 등은 패스
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 2) 이미 /ko/... 처럼 locale prefix가 있으면 그대로 통과
  const firstSeg = pathname.split("/")[1];
  if (firstSeg && isSupportedLocale(firstSeg)) {
    return NextResponse.next();
  }

  // 3) prefix가 없다면 -> cookie / accept-language / default 순으로 locale 결정
  // cookies.get()는 Cookie | undefined 이므로 value가 undefined 가능
  const cookieLocale =
    req.cookies.get("lang")?.value ??
    req.cookies.get("NEXT_LOCALE")?.value ??
    null;

  const fromCookie = cookieLocale && isSupportedLocale(cookieLocale) ? cookieLocale : null;
  const fromHeader = pickLocaleFromAcceptLanguage(req.headers.get("accept-language"));

  const locale: Locale = (fromCookie ?? fromHeader ?? DEFAULT_LOCALE) as Locale;

  // 4) /{locale}{pathname} 로 리다이렉트
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

// matcher는 “언어 prefix가 없는 일반 페이지들”에만 적용되게 구성
export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
