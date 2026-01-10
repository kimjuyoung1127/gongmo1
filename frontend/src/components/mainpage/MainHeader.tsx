'use client';

import { LanguageSelector } from '../molecules/LanguageSelector';
// import { Bell, UserCircle } from 'lucide-react'; // Removing specific icons for now or using lucide

export const MainHeader = () => {
    return (
        <header className="flex flex-col items-center gap-4 py-6 px-4">
            {/* Top Bar with Logo and Profile (Optional - based on image) */}
            <div className="w-full flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                        W
                    </div>
                    <span className="text-xl font-bold text-white">WeWorkHere</span>
                </div>
                <div className="flex gap-3">
                    {/* Placeholders for Bell/User icons if needed, or keeping it clean */}
                </div>
            </div>

            {/* Language Selector Centered */}
            <LanguageSelector />
        </header>
    );
};
