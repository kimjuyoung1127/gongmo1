'use client';

import { Home, FileText, Wrench, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/contexts/DictionaryContext';
import { FloatingWriteButton } from './FloatingWriteButton';

export const BottomNav = () => {
    const pathname = usePathname();
    const lang = useLang();

    const navItems = [
        { icon: Home, label: 'Home', href: `/${lang}` },
        { icon: FileText, label: 'Community', href: `/${lang}/community` },
        { isFab: true, href: `/${lang}/posts/new` },
        { icon: Wrench, label: 'Tools', href: `/${lang}/tools` },
        { icon: Settings, label: 'Settings', href: `/${lang}/settings` },
    ];

    const isCommunityPage = pathname.includes('/community');

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 pb-6 z-50">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item, index) => {
                    if (item.isFab) {
                        if (!isCommunityPage) return null;
                        return (
                            <FloatingWriteButton key={index} href={item.href!} />
                        );
                    }

                    // Type guard for non-fab items
                    if (!item.icon || !item.label) return null;
                    
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={index}
                            href={item.href!}
                            className={`flex flex-col items-center gap-1 p-2 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}
                        >
                            <Icon size={24} />
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
