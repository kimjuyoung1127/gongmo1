'use client';

import { Volume2, Share2, FileText, Save } from 'lucide-react';
import { useState } from 'react';

interface ResultSheetProps {
    translatedText: string;
    originalText: string;
}

export const ResultSheet = ({ translatedText, originalText }: ResultSheetProps) => {
    const [mode, setMode] = useState<'translated' | 'original'>('translated');

    return (
        <div className="bg-gray-900 rounded-t-3xl min-h-[40vh] p-6 pb-32 -mt-6 relative z-20 border-t border-gray-800">
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-gray-700 rounded-full mx-auto mb-6" />

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white mb-1">Extracted &<br />Translated Text</h2>
                </div>

                {/* Toggle Switch */}
                <div className="flex bg-gray-800 rounded-full p-1 border border-gray-700">
                    <button
                        onClick={() => setMode('translated')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${mode === 'translated' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400'}`}
                    >
                        TRANSLATED
                    </button>
                    <button
                        onClick={() => setMode('original')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${mode === 'original' ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-400'}`}
                    >
                        ORIGINAL
                    </button>
                </div>
            </div>

            {/* Result Card */}
            <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 mb-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="font-bold text-blue-400">HINDI 🇮🇳</span>
                        <span>↔</span>
                        <span className="font-bold text-white">ENGLISH 🇺🇸</span>
                    </div>
                    <button className="flex items-center gap-1.5 bg-blue-900/30 text-blue-400 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-blue-900/50 transition-colors">
                        <Volume2 size={14} />
                        LISTEN
                    </button>
                </div>

                <div className="prose prose-invert max-w-none">
                    <h3 className="text-lg font-bold text-white mb-2">SAFETY PROTOCOL #42</h3>
                    <div className="h-px bg-gray-700 w-full mb-3" />
                    <p className="text-gray-300 leading-relaxed text-lg">
                        {mode === 'translated' ? translatedText : originalText}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 transition-transform hover:bg-blue-500">
                    <Save size={20} />
                    Save to My Documents
                </button>

                <div className="grid grid-cols-2 gap-3">
                    <button className="bg-gray-800 text-white font-medium py-4 rounded-2xl flex items-center justify-center gap-2 border border-gray-700 hover:bg-gray-700 active:scale-95 transition-all">
                        <Share2 size={18} />
                        Share
                    </button>
                    <button className="bg-gray-800 text-white font-medium py-4 rounded-2xl flex items-center justify-center gap-2 border border-gray-700 hover:bg-gray-700 active:scale-95 transition-all">
                        <FileText size={18} />
                        Edit Text
                    </button>
                </div>
            </div>
        </div>
    );
};
