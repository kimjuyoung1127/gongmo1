'use client';

import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
    onClick: () => void;
}

export const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg text-white md:hidden hover:bg-blue-700 active:scale-95 transition-all"
        >
            <Plus size={28} />
        </button>
    );
};
