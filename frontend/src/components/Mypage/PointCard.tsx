'use client';

import { ChevronRight, Coins } from 'lucide-react';

interface PointCardProps {
    points: number;
    userName: string;
}

export function PointCard({ points, userName }: PointCardProps) {
    return (
        <div className="bg-blue-500 rounded-[24px] p-6 mb-6 shadow-md text-white relative overflow-hidden">
            {/* Decorative Background Circles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute bottom-[-10px] left-[-10px] w-20 h-20 bg-blue-600 rounded-full opacity-30 blur-lg"></div>

            <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-blue-100 font-medium text-sm">{userName}님의 포인트</span>
                    <Coins size={20} className="text-blue-200" />
                </div>

                <div className="flex items-center gap-1">
                    <span className="text-3xl font-bold">{points.toLocaleString()}</span>
                    <span className="text-xl font-medium">P</span>
                </div>

                <button className="w-full bg-black/20 hover:bg-black/30 backdrop-blur-sm py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-1 transition-colors mt-2">
                    포인트 내역 보기 <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
