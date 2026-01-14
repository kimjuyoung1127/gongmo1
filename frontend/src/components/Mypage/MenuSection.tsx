'use client';

import { ChevronRight, Globe, Building2, LogOut } from 'lucide-react';

interface MenuSectionProps {
    currentLang: string;
    onChangeLang: () => void;
    companyName?: string;
    onLogout: () => void;
}

export function MenuSection({ currentLang, onChangeLang, companyName, onLogout }: MenuSectionProps) {
    const LANG_LABELS: Record<string, string> = {
        'ko': '한국어',
        'en': 'English',
        'vi': 'Tiếng Việt',
        'ne': 'नेपाली'
    };

    return (
        <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 mb-6">
            {/* Language Setting */}
            <button
                onClick={onChangeLang}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors border-b border-gray-50"
            >
                <div className="flex items-center gap-3">
                    <Globe size={20} className="text-gray-500" />
                    <span className="font-medium text-gray-900">언어 설정</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 group">
                    <span className="text-sm">{LANG_LABELS[currentLang] || currentLang}</span>
                    <ChevronRight size={16} />
                </div>
            </button>

            {/* Company Info */}
            <div className="w-full flex items-center justify-between p-5 border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <Building2 size={20} className="text-gray-500" />
                    <span className="font-medium text-gray-900">소속 회사</span>
                </div>
                <span className="text-sm text-gray-500">{companyName || '소속 없음'}</span>
            </div>

            {/* Logout */}
            <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 p-5 hover:bg-red-50 transition-colors text-red-500"
            >
                <LogOut size={20} />
                <span className="font-medium">로그아웃</span>
            </button>
        </div>
    );
}
