'use client';

import { Volume2, Languages, User } from 'lucide-react';

interface ChatBubbleProps {
    message: string;
    isAi?: boolean;
    onListen?: () => void;
    onTranslate?: () => void;
}

export const ChatBubble = ({ message, isAi = false, onListen, onTranslate }: ChatBubbleProps) => {
    return (
        <div className={`flex w-full mb-6 ${isAi ? 'justify-start' : 'justify-end'}`}>
            {/* Avatar for AI */}
            {isAi && (
                <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-800">
                        <span className="text-2xl">🤖</span>
                    </div>
                </div>
            )}

            <div className={`flex flex-col max-w-[80%] ${isAi ? 'items-start' : 'items-end'}`}>
                {isAi && <span className="text-gray-400 text-xs mb-1 ml-1">AI Assistant</span>}
                {!isAi && <span className="text-gray-400 text-xs mb-1 mr-1">You</span>}

                <div
                    className={`
            p-4 rounded-2xl text-lg leading-relaxed
            ${isAi
                            ? 'bg-blue-600 text-white rounded-tl-none'
                            : 'bg-gray-800 text-white rounded-tr-none border border-gray-700'
                        }
          `}
                >
                    {message}
                </div>

                {/* Action Buttons for AI Message */}
                {isAi && (
                    <div className="flex gap-4 mt-2 ml-1">
                        <button onClick={onListen} className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                            <Volume2 size={16} />
                            LISTEN
                        </button>
                        <button onClick={onTranslate} className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                            <Languages size={16} />
                            TRANSLATE
                        </button>
                    </div>
                )}
            </div>

            {/* Avatar for User */}
            {!isAi && (
                <div className="flex-shrink-0 ml-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <User size={20} className="text-gray-400" />
                    </div>
                </div>
            )}
        </div>
    );
};
