import { BriefingData, ShiftKey } from "@/types/aiManual";

const BASE = {
  notices: [
    {
      id: "n1",
      title: "안전 점검 실시 안내",
      body: "금일 14:00~15:00 전체 설비 안전 점검이 예정되어 있습니다. 해당 시간 동안 작업을 일시 중단하고 안전 교육장으로 이동해주시기 바랍니다.",
      author: "작성자: 생산팀 김반장",
      tone: "danger" as const,
    },
    {
      id: "n2",
      title: "동절기 미끄럼 사고 주의",
      body: "최근 기온 하락으로 작업장 바닥 결빙 우려가 있습니다. 이동 시 천천히 걷고, 계단 이용 시 난간을 잡아주세요.",
      author: "작성자: 안전관리팀",
      tone: "warn" as const,
    },
    {
      id: "n3",
      title: "신규 자재 입고 안내",
      body: "1월 13일(월) 오전 10시 B동 창고에 신규 자재가 입고됩니다. 자재팀은 입고 준비를 완료해주시기 바랍니다.",
      author: "작성자: 자재팀 이과장",
      tone: "info" as const,
    },
  ],
};

const BY_SHIFT: Record<ShiftKey, Omit<BriefingData, "shift">> = {
  A: {
    dateLabel: "2026. 1. 12.",
    notices: BASE.notices,
    issues: [
      {
        id: "a1",
        title: "3호 라인 컨베이어",
        body: "구동 모터 진동 발생, 정비팀 점검 요청 완료 (티켓 #5678)",
        status: "조치 중",
        owner: "C조 박OO",
        time: "2026-01-11 06:00",
      },
      {
        id: "a2",
        title: "5호 프레스",
        body: "유압 압력 정기값 저하, 모니터링 중",
        status: "모니터링",
        owner: "C조 최OO",
        time: "2026-01-11 05:45",
      },
    ],
  },
  B: {
    dateLabel: "2026. 1. 12.",
    notices: BASE.notices,
    issues: [
      {
        id: "b1",
        title: "2호 라인 센서",
        body: "센서 오작동 간헐 발생. 교체 부품 입고 전까지 임시 우회 운전",
        status: "모니터링",
        owner: "A조 이OO",
        time: "2026-01-12 16:40",
      },
      {
        id: "b2",
        title: "포장기 롤러",
        body: "롤러 마모 확인. 야간 교대 종료 전 교체 예정",
        status: "조치 중",
        owner: "A조 김OO",
        time: "2026-01-12 16:20",
      },
    ],
  },
  C: {
    dateLabel: "2026. 1. 12.",
    notices: BASE.notices,
    issues: [
      {
        id: "c1",
        title: "냉각수 라인",
        body: "압력 저하 경고 1회 발생. 누수 여부 점검 필요",
        status: "모니터링",
        owner: "B조 장OO",
        time: "2026-01-12 01:10",
      },
      {
        id: "c2",
        title: "4호 라인 조립 지그",
        body: "정렬 편차 발생. 캘리브레이션 요청",
        status: "조치 중",
        owner: "B조 윤OO",
        time: "2026-01-12 00:35",
      },
    ],
  },
  D: {
    dateLabel: "2026. 1. 12.",
    notices: BASE.notices,
    issues: [
      {
        id: "d1",
        title: "주간 교대 공지",
        body: "금주 D조는 2일 단위로 A/B 교대 적용. 작업표준서 확인 바랍니다.",
        status: "완료",
        owner: "관리자",
        time: "2026-01-11 18:00",
      },
      {
        id: "d2",
        title: "출입 통제 안내",
        body: "설비 점검 구역 출입 통제 라인 설치 완료. 우회 동선 사용",
        status: "완료",
        owner: "안전관리팀",
        time: "2026-01-11 17:30",
      },
    ],
  },
};

export function getMockBriefing(shift: ShiftKey): BriefingData {
  const base = BY_SHIFT[shift] ?? BY_SHIFT.A;
  return { shift, ...base };
}
