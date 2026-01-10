'use client';

import { ShieldCheck, Wrench, Phone } from 'lucide-react';

interface QuickActionProps {
    label: string;
    icon: React.ElementType;
    onClick?: () => void;
}

const QuickActionChip = ({ label, icon: Icon, onClick }: QuickActionProps) => (
    <button
        onClick={onClick}
        className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-3 min-w-max hover:bg-gray-700 transition-colors"
    >
        <Icon size={18} className="text-blue-500" />
        <span className="text-sm font-medium text-gray-200">{label}</span>
    </button>
);

export const QuickActions = () => {
    const actions = [
        { label: 'Safety Gear', icon: ShieldCheck },
        { label: 'Tools Needed', icon: Wrench },
        { label: 'Emergency', icon: Phone }, // Added based on context, though icon might be different
    ];

    return (
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            {actions.map((action, index) => (
                <QuickActionChip key={index} {...action} />
            ))}
            <button className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-3 min-w-max hover:bg-gray-700 transition-colors">
                <Phone size={18} className="text-blue-500" />
            </button>
        </div>
    );
};
