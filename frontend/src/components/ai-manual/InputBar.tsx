'use client';

import { Mic, Plus } from 'lucide-react';

export const InputBar = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 px-4 py-4 border-t border-gray-800 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <div className="flex items-center gap-3">
                <button className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                    <Plus size={24} />
                </button>

                <div className="flex-1 bg-gray-800 rounded-xl flex items-center px-4 h-12 border border-gray-700 focus-within:border-blue-500 transition-colors">
                    <input
                        type="text"
                        placeholder="Ask a question..."
                        className="bg-transparent text-white w-full h-full focus:outline-none placeholder-gray-500 text-lg"
                    />
                </div>

                <button className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 active:scale-95 transition-transform">
                    <Mic size={24} />
                </button>
            </div>

            {/* Home Indicator line (IOS style) if needed, usually handled by OS but can be visual */}
            <div className="w-32 h-1 bg-gray-800 rounded-full mx-auto mt-6"></div>
        </div>
    );
};
