'use client';

import { useState } from 'react';

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (reason: string) => void;
}

const REPORT_REASONS = [
    { id: 'sexual', label: 'Sexual content / nudity', labelKo: '선정적인 게시물' },
    { id: 'spam', label: 'Spam or misleading', labelKo: '스팸 / 부적절한 홍보' },
    { id: 'abusive', label: 'Abusive or hateful content', labelKo: '욕설 / 비하 발언' },
    { id: 'other', label: 'Other', labelKo: '기타' },
];

export function ReportModal({ isOpen, onClose, onSubmit }: ReportModalProps) {
    const [selectedReason, setSelectedReason] = useState<string>('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (selectedReason) {
            onSubmit(selectedReason);
            setSelectedReason(''); // Reset selection after submit
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl transform transition-all">
                <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                        Report Post
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 text-center">
                        Please select a reason for reporting this post.
                    </p>

                    <div className="space-y-3">
                        {REPORT_REASONS.map((reason) => (
                            <label
                                key={reason.id}
                                className={`
                                    flex items-center p-3 rounded-xl border cursor-pointer transition-colors
                                    ${selectedReason === reason.id
                                        ? 'border-red-500 bg-red-50 text-red-700'
                                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                                    }
                                `}
                            >
                                <input
                                    type="radio"
                                    name="reportReason"
                                    value={reason.id}
                                    checked={selectedReason === reason.id}
                                    onChange={(e) => setSelectedReason(e.target.value)}
                                    className="hidden" // Custom styling via parent label
                                />
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm">{reason.labelKo}</span>
                                    <span className="text-xs opacity-75">{reason.label}</span>
                                </div>
                                {selectedReason === reason.id && (
                                    <svg className="w-5 h-5 ml-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </label>
                        ))}
                    </div>

                    <div className="mt-8 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedReason}
                            className={`
                                flex-1 px-4 py-2.5 rounded-xl text-white font-medium text-sm transition-colors
                                ${selectedReason
                                    ? 'bg-red-500 hover:bg-red-600 shadow-md shadow-red-200'
                                    : 'bg-gray-200 cursor-not-allowed'
                                }
                            `}
                        >
                            Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
