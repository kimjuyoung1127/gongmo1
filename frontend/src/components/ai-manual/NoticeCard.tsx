import { Notice } from "@/types/aiManual";

const toneClass: Record<Notice["tone"], string> = {
  danger: "border-red-300 bg-red-50 text-red-800",
  warn: "border-amber-300 bg-amber-50 text-amber-800",
  info: "border-blue-300 bg-blue-50 text-blue-800",
};

export default function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <div className={`border rounded-xl p-4 ${toneClass[notice.tone]}`}>
      <div className="font-bold">{notice.title}</div>
      <div className="mt-1 text-sm leading-relaxed">{notice.body}</div>
      <div className="mt-2 text-xs opacity-80">{notice.author}</div>
    </div>
  );
}
