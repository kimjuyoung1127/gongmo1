export type ShiftKey = "A" | "B" | "C" | "D";

export type NoticeTone = "danger" | "warn" | "info";
export type IssueStatus = "조치 중" | "모니터링" | "완료";

export type Notice = {
  id: string;
  title: string;
  body: string;
  author: string;
  tone: NoticeTone;
};

export type HandoverIssue = {
  id: string;
  title: string;
  body: string;
  status: IssueStatus;
  owner: string;
  time: string; // ISO 또는 표시용 문자열
};

export type BriefingData = {
  shift: ShiftKey;
  dateLabel: string; // "2026. 1. 12."
  notices: Notice[];
  issues: HandoverIssue[];
};
