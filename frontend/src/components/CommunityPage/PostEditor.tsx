'use client';

import { useState } from 'react';
import { CATEGORIES, CategoryType } from './types';

interface PostEditorProps {
    onCancel: () => void;
    onSubmit: (data: { content: string; category: CategoryType; images: string[]; isSlang: boolean }) => void;
}

export function PostEditor({ onCancel, onSubmit }: PostEditorProps) {
    const [content, setContent] = useState('');
    const [category, setCategory] = useState<CategoryType>('FREE');
    const [isSlang, setIsSlang] = useState(false);
    const [images, setImages] = useState<string[]>([]); // URLs

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        onSubmit({
            content,
            category,
            images,
            isSlang
        });
    };

    const handleImageUpload = () => {
        // Mock upload
        const mockImage = `https://picsum.photos/seed/${Date.now()}/400/300`;
        setImages([...images, mockImage]);
    };

    return (
        <div className="bg-white p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <button onClick={onCancel} className="text-gray-500">Cancel</button>
                <h2 className="text-lg font-bold">New Post</h2>
                <button
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                    className="text-blue-600 font-bold disabled:text-gray-300"
                >
                    Post
                </button>
            </div>

            <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
                <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => setCategory(cat.id)}
                            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${category === cat.id
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-600 border-gray-200'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="flex-1 w-full bg-transparent resize-none focus:outline-none text-base mb-4"
            />

            {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="border-t border-gray-100 pt-3 mt-auto">
                <div className="flex items-center space-x-2 mb-4">
                    <input
                        type="checkbox"
                        id="slang"
                        checked={isSlang}
                        onChange={(e) => setIsSlang(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="slang" className="text-sm text-gray-700">
                        Are there any special field/slang terms?
                    </label>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        type="button"
                        onClick={handleImageUpload}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </button>
                    {/* Other attachments could go here */}
                </div>
            </div>
        </div>
    );
}
