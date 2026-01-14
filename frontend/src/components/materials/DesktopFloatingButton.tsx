'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { QuickActionModal } from './QuickActionModal';

interface DesktopFloatingButtonProps {
    href: string;
}

export const DesktopFloatingButton = ({ href }: DesktopFloatingButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="hidden md:block fixed bottom-10 right-10 z-50">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-xl hover:bg-blue-700 hover:scale-105 transition-all text-white"
                    aria-label="Create new post"
                >
                    <Plus size={32} />
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
