'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LanguageSelector } from '@/components/molecules/LanguageSelector';

interface HeaderProps {
    title: string;
    subtitle?: string;
    showBack?: boolean;
    rightElement?: React.ReactNode;
}

export const Header = ({ title, subtitle, showBack = false, rightElement }: HeaderProps) => {
    const router = useRouter();

    return (
        <header className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 z-50 px-4 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {showBack && (
                        <button
                            onClick={() => router.back()}
                            className="p-1 text-white hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <ArrowLeft size={24} />
                        </button>
                    )}
                    <div>
                        <h1 className="text-lg font-bold text-white">{title}</h1>
                        {subtitle && <p className="text-xs text-blue-400 font-medium">{subtitle}</p>}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {rightElement || <LanguageSelector className="scale-75 origin-right" />}
                </div>
            </div>
        </header>
    );
};
