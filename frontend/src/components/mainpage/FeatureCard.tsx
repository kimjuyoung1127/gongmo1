'use client';

import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    onClick: () => void;
    colorTheme: 'blue' | 'green' | 'orange';
    buttonText: string;
    className?: string;
}

export const FeatureCard = ({
    title,
    description,
    icon: Icon,
    onClick,
    colorTheme,
    buttonText,
    className = '',
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
        relative w-full h-full min-h-[140px] rounded-3xl p-6 md:p-8 cursor-pointer transition-transform active:scale-95
        text-white overflow-hidden ${getThemeStyles()} ${className}
      `}
        >
            {/* Icon Background Overlay */}
            <Icon
                className="absolute -right-4 -top-4 w-32 h-32 md:w-48 md:h-48 opacity-10 rotate-12"
                strokeWidth={1.5}
            />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="bg-white/20 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-2 md:mb-4">
                    <Icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
                </div>

                <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{title}</h2>
                    <p className="text-white/90 text-sm md:text-lg mb-3 md:mb-6 leading-tigher line-clamp-2 md:line-clamp-none">{description}</p>

                    <div className="flex items-center text-base md:text-lg font-semibold group">
                        {buttonText}
                        <svg
                            className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform group-hover:translate-x-1"
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
