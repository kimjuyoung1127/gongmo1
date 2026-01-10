'use client';

import { X, Image as ImageIcon, BarChart2 } from 'lucide-react';
import { useState } from 'react';

interface PostEditorProps {
    onClose: () => void;
    categories: { id: string; label: string; }[];
}

export const PostEditor = ({ onClose, categories }: PostEditorProps) => {
    const [selectedCat, setSelectedCat] = useState(categories[0]?.id || '');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showPoll, setShowPoll] = useState(false);

    return (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <X size={24} />
                </button>
                <span className="text-white font-bold text-lg">New Post</span>
                <button className="text-blue-500 font-bold disabled:text-gray-600" disabled={!title.trim() || !content.trim()}>
                    Post
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {/* Category Selector */}
                <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-2">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCat(cat.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border ${selectedCat === cat.id
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-transparent text-gray-400 border-gray-700'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-transparent text-white text-xl font-bold placeholder-gray-600 mb-4 focus:outline-none"
                />

                <textarea
                    placeholder="Share your thoughts anonymously..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-40 bg-transparent text-gray-300 text-base placeholder-gray-600 resize-none focus:outline-none mb-4"
                />

                {showPoll && (
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 mb-4 animate-in fade-in slide-in-from-top-2">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-gray-300">Poll Options</span>
                            <button onClick={() => setShowPoll(false)} className="text-red-400 text-xs">Remove</button>
                        </div>
                        <input type="text" placeholder="Option 1" className="w-full bg-gray-800 text-white p-2 rounded-lg mb-2 text-sm border border-gray-700 focus:border-blue-500 outline-none" />
                        <input type="text" placeholder="Option 2" className="w-full bg-gray-800 text-white p-2 rounded-lg mb-2 text-sm border border-gray-700 focus:border-blue-500 outline-none" />
                        <button className="text-blue-400 text-sm font-medium">+ Add option</button>
                    </div>
                )}
            </div>

            {/* Toolbar */}
            <div className="border-t border-gray-800 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] flex gap-6">
                <button className="text-gray-400 hover:text-blue-500 transition-colors">
                    <ImageIcon size={24} />
                </button>
                <button
                    onClick={() => setShowPoll(!showPoll)}
                    className={`transition-colors ${showPoll ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`}
                >
                    <BarChart2 size={24} />
                </button>
            </div>
        </div>
    );
};
