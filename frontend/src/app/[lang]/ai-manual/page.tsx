"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import NoticeCard from "@/components/ai-manual/NoticeCard";
import IssueCard from "@/components/ai-manual/IssueCard";
import type { Notice, HandoverIssue, NoticeTone, IssueStatus } from "@/types/aiManual";
import { getDictionary, Dictionary } from "@/dictionaries";
import { Locale } from "@/types/common";

export default function AiManualPage() {
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const lang = (params.lang ?? "ko") as Locale;
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    getDictionary(lang).then(setDict);
  }, [lang]);

  const notices = useMemo(() => {
    // ✅ 핵심: tone을 string이 아니라 NoticeTone 리터럴로 고정
    const data: Notice[] = [
      {
        id: "n1",
        title: "안전 점검 실시 안내",
        body: "금일 14:00~15:00 전체 설비 안전 점검이 예정되어 있습니다. 해당 시간 동안 작업을 일시 중단하고 안전 교육장으로 이동해주시기 바랍니다.",
        author: "작성자: 생산팀 김반장",
        tone: "danger" as NoticeTone,
      },
      {
        id: "n2",
        title: "동절기 미끄럼 사고 주의",
        body: "최근 기온 하락으로 작업장 바닥 결빙 우려가 있습니다. 이동 시 천천히 걷고, 계단 이용 시 난간을 잡아주세요.",
        author: "작성자: 안전관리팀",
        tone: "warn" as NoticeTone,
      },
      {
        id: "n3",
        title: "신규 자재 입고 안내",
        body: "1월 13일(월) 오전 10시 B동 창고에 신규 자재가 입고됩니다. 자재팀은 입고 준비를 완료해주시기 바랍니다.",
        author: "작성자: 자재팀 이과장",
        tone: "info" as NoticeTone,
      },
    ];
    return data;
  }, []);

  const issues = useMemo(() => {
    // ✅ 핵심: status를 string이 아니라 IssueStatus 리터럴로 고정
    const data: HandoverIssue[] = [
      {
        id: "i1",
        title: "3호 라인 컨베이어",
        body: "구동 모터 진동 발생, 정비팀 점검 요청 완료 (티켓 #5678)",
        status: "조치 중" as IssueStatus,
        owner: "전임조 박OO",
        time: "2026-01-11 06:00",
      },
      {
        id: "i2",
        title: "5호 프레스",
        body: "유압 압력 정기값 저하, 모니터링 중",
        status: "모니터링" as IssueStatus,
        owner: "전임조 최OO",
        time: "2026-01-11 05:45",
      },
    ];
    return data;
  }, []);

  const onConfirm = () => {
    router.push(`/${lang}/ai-manual/menu`);
  };

  const onBack = () => {
    if (window.history.length > 1) router.back();
    else router.push(`/${lang}`);
  };

  const t = dict?.aiManualNotice;

  if (!dict) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden bg-white shadow-sm">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <button
            onClick={onBack}
            className="absolute left-4 top-4 rounded-lg bg-white/15 px-3 py-2 hover:bg-white/20 transition"
            aria-label={t?.back || "Back"}
          >
            ←
          </button>

          <div className="text-xl font-bold text-center">{t?.title || "Notices"}</div>
          <div className="mt-1 text-white/90 text-sm text-center">
            {new Date().toLocaleDateString(lang === "ko" ? "ko-KR" : lang === "vi" ? "vi-VN" : lang === "ne" ? "ne-NP" : lang === "km" ? "km-KH" : "en-US")}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-auto">
          <section>
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="text-blue-600">ⓘ</span>
              <span>{t?.todayNotices || "Today's Notices"}</span>
            </div>
            <div className="mt-3 space-y-3">
              {notices.map((n) => (
                <NoticeCard key={n.id} notice={n} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="text-amber-600">⚠</span>
              <span>{t?.shiftIssues || "Previous Shift Issues"}</span>
            </div>
            <div className="mt-3 space-y-3">
              {issues.map((i) => (
                <IssueCard key={i.id} issue={i} />
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white">
          <button
            onClick={onConfirm}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 transition"
          >
            ✅ {t?.confirmButton || "I have confirmed the content"}
          </button>
        </div>
      </div>
    </main>
  );
}
