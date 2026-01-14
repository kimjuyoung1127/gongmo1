import { HandoverIssue } from "@/types/aiManual";

export default function IssueCard({ issue }: { issue: HandoverIssue }) {
  return (
    <div className="border rounded-xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-bold text-slate-900">{issue.title}</div>
          <div className="mt-1 text-sm text-slate-700">{issue.body}</div>
          <div className="mt-2 text-xs text-slate-500">{issue.owner}</div>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 whitespace-nowrap">
          {issue.status}
        </span>
      </div>
      <div className="mt-2 text-xs text-slate-400 text-right">{issue.time}</div>
    </div>
  );
}
