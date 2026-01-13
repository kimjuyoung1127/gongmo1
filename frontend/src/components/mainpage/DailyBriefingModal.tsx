import { X, Check } from 'lucide-react';
import React from 'react';

interface DailyBriefingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DailyBriefingModal({ isOpen, onClose }: DailyBriefingModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-sm bg-blue-600 rounded-[24px] overflow-hidden shadow-2xl animate-scale-up flex flex-col max-h-[85vh]">

                {/* Header */}
                <div className="px-6 py-5 flex items-center justify-between shrink-0">
                    <h2 className="text-2xl font-bold text-white tracking-tight">데일리 브리핑</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full bg-blue-500/20 text-white hover:bg-blue-500/40 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body Card */}
                <div className="bg-white rounded-t-[24px] flex-1 overflow-y-auto p-6 flex flex-col gap-6">

                    {/* Section 1 */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2">
                            오늘의 작업 현황
                        </h3>

                        {/* Sub-section: Previous Issues */}
                        <div className="space-y-3">
                            <h4 className="text-base font-bold text-gray-800 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                전일 이슈
                            </h4>
                            <ul className="space-y-2 pl-4">
                                <li className="text-gray-600 text-sm list-disc">A라인 불량 3건 발생</li>
                                <li className="text-gray-600 text-sm list-disc">설비 점검 필요</li>
                                <li className="text-gray-600 text-sm list-disc">자재 승인 검사 착오 발생</li>
                                <li className="text-gray-600 text-sm list-disc">설비 점검 긴급 필요</li>
                            </ul>
                        </div>

                        {/* Sub-section: Today's Notice */}
                        <div className="space-y-3 pt-3">
                            <h4 className="text-base font-bold text-gray-800 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                오늘 공지사항
                            </h4>
                            <ul className="space-y-2 pl-4">
                                <li className="text-gray-600 text-sm list-disc">안전모 착용 필수 (불시 점검 예정)</li>
                                <li className="text-gray-600 text-sm list-disc">오전 생산 목표: 500개</li>
                                <li className="text-gray-600 text-sm list-disc">오후 생산 목표: 500개</li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Button (Pinned to bottom of white area or scrolling with it? Screenshot implies scrolling or fixed at bottom of modal) 
                        I'll put it at the bottom of the white area.
                    */}
                    <div className="mt-auto pt-6">
                        <button
                            onClick={onClose}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
                        >
                            <Check size={20} strokeWidth={3} />
                            확인 및 시작
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
