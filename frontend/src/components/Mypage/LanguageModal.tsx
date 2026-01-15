'use client';

import { X, Check } from 'lucide-react';
import { Locale } from '@/types/common';
import { useDictionary } from '@/contexts/DictionaryContext';

interface LanguageModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentLang: string;
    onChange: (lang: Locale) => void;
}

const LANGUAGES: { code: Locale; label: string }[] = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'ne', label: 'नेपाली' },
    { code: 'km', label: 'ខ្មែរ' },
];

export function LanguageModal({ isOpen, onClose, currentLang, onChange }: LanguageModalProps) {
    const dict = useDictionary();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />

            <div className="relative w-full max-w-sm bg-white rounded-t-[24px] sm:rounded-[24px] overflow-hidden shadow-2xl animate-fade-in-up sm:animate-scale-up">
                <div className="p-5 flex items-center justify-between border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">{dict.mypage.languageSelectTitle}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>

                <div className="p-2">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                onChange(lang.code);
                                onClose();
                            }}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                            <span className={`text-lg ${currentLang === lang.code ? 'font-bold text-blue-600' : 'font-medium text-gray-700'}`}>
                                {lang.label}
                            </span>
                            {currentLang === lang.code && <Check size={20} className="text-blue-600" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
