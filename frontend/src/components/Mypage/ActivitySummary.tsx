'use client';

import { FileText, MessageSquare, ThumbsUp, Wrench } from 'lucide-react';
import { PointCard } from './PointCard';

interface ActivitySummaryProps {
    userName?: string;
    points?: number;
}

export function ActivitySummary({ userName = '사용자', points = 0 }: ActivitySummaryProps) {
    // Mock Data - Replace with actual props later
    const stats = [
        { label: '작성한 글', value: 12, icon: FileText, color: 'text-blue-600' },
        { label: '댓글', value: 48, icon: MessageSquare, color: 'text-green-600' },
        { label: '받은 좋아요', value: 156, icon: ThumbsUp, color: 'text-red-500' },
        { label: '회사 이슈', value: 3, icon: Wrench, color: 'text-orange-500' },
    ];

    return (
        <div className="space-y-6 mb-6">
            <PointCard points={points} userName={userName} />

            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">나의 활동</h3>
                <div className="grid grid-cols-4 gap-2">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 py-2 rounded-xl transition-colors">
                            <stat.icon size={24} className={stat.color} />
                            <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                            <span className="text-xs text-gray-500">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
