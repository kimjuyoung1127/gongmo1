export function getMockBriefing() {
  return {
    dateLabel: new Date().toLocaleDateString("ko-KR"),
    notices: [
      {
        id: "n1",
        title: "안전 점검 실시 안내",
        body: "금일 14:00~15:00 전체 설비 안전 점검이 예정되어 있습니다.",
        author: "생산팀",
        tone: "danger",
      },
    ],
    issues: [
      {
        id: "i1",
        title: "3호 라인 컨베이어",
        body: "모터 진동 발생, 점검 요청 완료",
        owner: "정비팀",
        status: "조치 중",
        time: "08:40",
      },
    ],
  };
}
