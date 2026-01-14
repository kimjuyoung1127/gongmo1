import { MapPin, MessageSquare, ThumbsUp, Wrench, AlertTriangle, Search, FileText, CheckCircle, Clock, AlertOctagon } from 'lucide-react';
import Image from 'next/image';

export interface CompanyIssue {
    id: string;
    category: string; // e.g., '설비', '안전', '품질'
    status: 'WAITING' | 'SOLVED' | 'URGENT';
    title: string;
    author: string;
    location: string;
    createdAt: string;
    imageUrl?: string;
    isUrgent?: boolean;
}

interface CompanyIssueCardProps {
    issue: CompanyIssue;
}

export function CompanyIssueCard({ issue }: CompanyIssueCardProps) {
    // Status Styles
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'WAITING':
                return 'text-orange-600 bg-orange-50';
            case 'SOLVED':
                return 'text-green-600 bg-green-50';
            case 'URGENT':
                return 'text-red-600 bg-red-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const StatusIcon = (status: string) => {
        switch (status) {
            case 'WAITING': return <Clock size={14} className="mr-1" />;
            case 'SOLVED': return <CheckCircle size={14} className="mr-1" />;
            case 'URGENT': return <AlertOctagon size={14} className="mr-1" />;
            default: return null;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'WAITING': return '대기중';
            case 'SOLVED': return '해결완료';
            case 'URGENT': return '긴급';
            default: return '';
        }
    };

    // Category Icons
    const CategoryIcon = ({ cat }: { cat: string }) => {
        let Icon = FileText;
        if (cat === '설비') Icon = Wrench;
        else if (cat === '안전') Icon = AlertTriangle;
        else if (cat === '품질') Icon = Search;

        return <Icon size={16} className="mr-1" />;
    };

    const borderClass = issue.isUrgent ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100';

    return (
        <div className={`bg-white rounded-[20px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border ${borderClass} mb-4 active:scale-[0.98] transition-all`}>
            {/* Header: Category & Status */}
            <div className="flex items-center gap-2 mb-3 text-sm font-bold">
                <span className="text-gray-600 flex items-center bg-gray-100 px-2 py-1 rounded-lg">
                    <CategoryIcon cat={issue.category} />
                    {issue.category}
                </span>
                <span className={`flex items-center px-2 py-1 rounded-lg text-xs ${getStatusStyle(issue.status)}`}>
                    {StatusIcon(issue.status)}
                    {getStatusLabel(issue.status)}
                </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
                {issue.title}
            </h3>

            {/* Content Body: Image + Info */}
            <div className="flex gap-4 mb-4">
                {issue.imageUrl && (
                    <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                        <Image
                            src={issue.imageUrl}
                            alt="Issue"
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="flex flex-col justify-center gap-1 text-sm text-gray-500">
                    <div className="font-semibold text-gray-900">{issue.author}</div>
                    <div>{issue.createdAt}</div>
                    <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {issue.location}
                    </div>
                </div>

                {/* Right side status badge for Solved or similar if needed, 
                    based on screenshot 'Action Completed' button could be here */}
                {issue.status === 'SOLVED' && (
                    <div className="ml-auto mt-auto">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
                            조치 완료
                        </span>
                    </div>
                )}
            </div>

            {/* Footer: Actions */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MessageSquare size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                    <ThumbsUp size={20} />
                </button>
            </div>
        </div>
    );
}
