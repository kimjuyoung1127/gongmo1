'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

interface FloatingWriteButtonProps {
    href: string;
}

export const FloatingWriteButton = ({ href }: FloatingWriteButtonProps) => {
    return (
        <div className="relative -top-6">
            <Link
                href={href}
                className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 text-white hover:bg-blue-700 transition-colors"
                aria-label="Create new post"
            >
                <Plus size={28} />
            </Link>
        </div>
    );
};
