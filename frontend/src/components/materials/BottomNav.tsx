'use client';

import { Home, FileText, Wrench, Settings, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/contexts/DictionaryContext';

export const BottomNav = () => {
    const pathname = usePathname();
    const lang = useLang();

    const navItems = [
        { icon: Home, label: 'Home', href: `/${lang}` },
        { icon: FileText, label: 'Community', href: `/${lang}/community` },
        { icon: Plus, label: '', href: '#', isFab: true },
        { icon: Wrench, label: 'Tools', href: `/${lang}/tools` },
        { icon: Settings, label: 'Settings', href: `/${lang}/settings` },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 pb-6 z-50">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item, index) => {
                    if (item.isFab) return (
                        <div key={index} className="relative -top-6">
                            <button className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 text-white">
                                <item.icon size={28} />
                            </button>
                        </div>
                    );

                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 p-2 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}
                        >
                            <item.icon size={24} />
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
