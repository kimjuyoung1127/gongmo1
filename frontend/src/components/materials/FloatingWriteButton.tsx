'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { QuickActionModal } from './QuickActionModal';

interface FloatingWriteButtonProps {
    href: string;
}

export const FloatingWriteButton = ({ href }: FloatingWriteButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="relative -top-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 text-white hover:bg-blue-700 transition-colors"
                    aria-label="Create new post"
                >
                    <Plus size={28} />
                </button>
            </div>

            <QuickActionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                communityLink={href}
            />
        </>
    );
};
