'use client';

import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    onClick: () => void;
    colorTheme: 'blue' | 'green' | 'orange';
    buttonText: string;
}

export const FeatureCard = ({
    title,
    description,
    icon: Icon,
    onClick,
    colorTheme,
    buttonText,
}: FeatureCardProps) => {
    const getThemeStyles = () => {
        switch (colorTheme) {
            case 'blue':
                return 'bg-blue-600 hover:bg-blue-700';
            case 'green':
                return 'bg-emerald-500 hover:bg-emerald-600';
            case 'orange':
                return 'bg-orange-500 hover:bg-orange-600';
        }
    };

    return (
        <div
            onClick={onClick}
            className={`
        relative w-full h-[280px] rounded-3xl p-8 cursor-pointer transition-transform active:scale-95
        text-white overflow-hidden ${getThemeStyles()}
      `}
        >
            {/* Icon Background Overlay */}
            <Icon
                className="absolute -right-4 -top-4 w-48 h-48 opacity-10 rotate-12"
                strokeWidth={1.5}
            />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-4">
                    <Icon size={32} strokeWidth={2.5} />
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-white/90 text-lg mb-6 leading-tigher">{description}</p>

                    <div className="flex items-center text-lg font-semibold group">
                        {buttonText}
                        <svg
                            className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
