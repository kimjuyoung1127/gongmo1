'use client';

import { useState } from 'react';
import { Camera, Wrench, AlertTriangle, HelpCircle, FileText, MessageSquare, Box } from 'lucide-react';
import Link from 'next/link';
import { ImageUploader } from './ImageUploader';

interface QuickActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    communityLink: string;
}

const QUICK_OPTIONS = [
    { id: 'equipment', label: '장비 점검', icon: Wrench, color: 'text-blue-500' },
    { id: 'product', label: '제품 문제', icon: AlertTriangle, color: 'text-red-500' },
    { id: 'material', label: '자재/공구 필요', icon: Box, color: 'text-orange-500' },
    { id: 'danger', label: '위험/도움 요청', icon: AlertTriangle, color: 'text-red-600' },
    { id: 'work_order', label: '작업 지시 필요', icon: HelpCircle, color: 'text-gray-600' },
];

export function QuickActionModal({ isOpen, onClose, communityLink }: QuickActionModalProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>('equipment');
    const [images, setImages] = useState<File[]>([]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100 shrink-0">
                <h2 className="text-xl font-bold text-gray-900">빠른 작업 등록</h2>
                <button
                    onClick={onClose}
                    className="p-2 -mr-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full"
                >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
                {/* 1. Photo Upload - Horizontal Bar / Grid */}
                <div className="w-full shrink-0">
                    <ImageUploader
                        images={images}
                        onImagesChange={setImages}
                        trigger={
                            <div className="w-full h-20 border-2 border-dashed border-blue-200 bg-blue-50 rounded-2xl flex items-center justify-center gap-3 text-blue-600 active:bg-blue-100 transition-colors">
                                <Camera size={32} />
                                <span className="text-xl font-bold">사진 촬영/업로드</span>
                            </div>
                        }
                    />
                </div>

                {/* 2. Quick Select - Grid (Flex Grow) */}
                <div className="flex-1 min-h-0 grid grid-cols-2 gap-3">
                    {QUICK_OPTIONS.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setSelectedOption(option.id)}
                            className={`
                                flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all h-full
                                ${selectedOption === option.id
                                    ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500'
                                    : 'border-gray-100 bg-white active:bg-gray-50'
                                }
                            `}
                        >
                            <option.icon
                                size={32}
                                className={`mb-2 ${selectedOption === option.id ? 'text-blue-600' : option.color}`}
                                strokeWidth={1.5}
                            />
                            <span className={`text-lg font-bold ${selectedOption === option.id ? 'text-blue-900' : 'text-gray-700'}`}>
                                {option.label}
                            </span>
                        </button>
                    ))}

                    <Link href={communityLink} className="contents">
                        <button className="flex flex-col items-center justify-center p-2 rounded-2xl border-2 border-green-100 bg-green-50 active:bg-green-100 transition-all h-full">
                            <MessageSquare size={32} className="mb-2 text-green-600" strokeWidth={1.5} />
                            <span className="text-lg font-bold text-green-800">
                                커뮤니티 글쓰기
                            </span>
                        </button>
                    </Link>
                </div>

                {/* 3. Description - Compact */}
                <textarea
                    placeholder="추가 설명 입력..."
                    className="w-full h-24 shrink-0 p-4 text-lg rounded-2xl border-2 border-gray-200 bg-gray-50 resize-none focus:border-blue-500 focus:ring-0"
                />

                {/* Submit Button */}
                <button
                    onClick={onClose}
                    className="w-full py-4 shrink-0 rounded-2xl bg-blue-600 text-white text-2xl font-bold active:bg-blue-700 shadow-md"
                >
                    제출하기
                </button>
            </div>
        </div>
    );
}
