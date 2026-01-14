'use client';

import { useLang } from '@/contexts/DictionaryContext';
import { Locale } from '@/types/common';
import { useRouter, usePathname } from 'next/navigation';

interface LanguageSelectorProps {
    className?: string;
}

const languages: { code: Locale; label: string }[] = [
    { code: 'ko', label: 'KR' },
    { code: 'en', label: 'EN' },
    { code: 'vi', label: 'VN' },
    { code: 'ne', label: 'NP' },
    { code: 'km', label: 'KH' },
];

export const LanguageSelector = ({ className = '' }: LanguageSelectorProps) => {
    const currentLang = useLang();
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (lang: Locale) => {
        // Replace the language segment in the URL
        const segments = pathname.split('/');
        segments[1] = lang;
        const newPath = segments.join('/');
        router.push(newPath);
    };

    return (
        <div className={`flex bg-gray-800 rounded-full p-1 ${className}`}>
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`
            px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${currentLang === lang.code
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-400 hover:text-white'
                        }
          `}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
};
