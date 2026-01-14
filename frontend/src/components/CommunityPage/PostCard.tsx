'use client';

import { useState } from 'react';
import { Post } from './types';
import { PollComponent } from './PollComponent';
import { CommentSection } from './CommentSection';
import { CATEGORIES } from './types';

interface PostCardProps {
    post: Post;
    onVote: (pollId: string, optionId: string) => void;
    onAddComment: (postId: string, content: string) => void;
    onTranslate: (postId: string) => void;
}

export function PostCard({ post, onVote, onAddComment, onTranslate, onReport }: PostCardProps & { onReport: (id: string) => void }) {
    const [showComments, setShowComments] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const categoryLabel = CATEGORIES.find(c => c.id === post.category)?.label || post.category;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-lg">
                        {CATEGORIES.find(c => c.id === post.category)?.icon}
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-gray-900">{post.author.nickname}</span>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{categoryLabel}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition-colors"
                    >
                        {/* Simple Menu Icon */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsMenuOpen(false)}
                            />
                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 z-20 py-1 overflow-hidden">
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        onReport(post.id);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <span>Report</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="mb-3">
                <p className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">{post.content}</p>
                <button
                    onClick={() => onTranslate(post.id)}
                    className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center"
                >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    Translate
                </button>
            </div>

            {/* Images */}
            {post.imageUrls && post.imageUrls.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-3 rounded-lg overflow-hidden">
                    {post.imageUrls.map((url, idx) => (
                        <div key={idx} className="relative aspect-square bg-gray-100 border border-gray-200">
                            {/* Use placeholder if real images not available to avoid error */}
                            <img src={url} alt={`Post image ${idx}`} className="object-cover w-full h-full" />
                        </div>
                    ))}
                </div>
            )}

            {/* Poll */}
            {post.poll && (
                <PollComponent poll={post.poll} onVote={onVote} />
            )}

            {/* Footer / Actions */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-50">
                <div className="flex items-center space-x-4">
                    <button className={`flex items-center space-x-1.5 text-sm ${post.isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                        <svg className="w-5 h-5" fill={post.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{post.likeCount}</span>
                    </button>
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center space-x-1.5 text-sm text-gray-500"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{post.commentCount}</span>
                    </button>
                </div>
            </div>

            {showComments && (
                <CommentSection
                    comments={post.comments}
                    onAddComment={(content) => onAddComment(post.id, content)}
                />
            )}
        </div>
    );
}
