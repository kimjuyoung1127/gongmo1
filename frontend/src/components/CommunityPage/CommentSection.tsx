'use client';

import { useState } from 'react';
import { Comment } from './types';

interface CommentSectionProps {
    comments: Comment[];
    onAddComment: (content: string) => void;
}

export function CommentSection({ comments, onAddComment }: CommentSectionProps) {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(newComment);
            setNewComment('');
        }
    };

    return (
        <div className="mt-4 border-t border-gray-100 pt-4">
            <div className="space-y-4 mb-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
                                {comment.author.avatarUrl ? (
                                    <img src={comment.author.avatarUrl} alt="" className="w-8 h-8 rounded-full" />
                                ) : (
                                    'User'
                                )}
                            </div>
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-lg p-3">
                            <div className="text-sm font-semibold text-gray-900">{comment.author.nickname}</div>
                            <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                            <div className="text-xs text-gray-500 mt-2 flex items-center space-x-2">
                                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>Likes: {comment.likeCount}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full bg-gray-100 rounded-full py-2 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 font-medium text-sm disabled:text-gray-400 p-1"
                >
                    Post
                </button>
            </form>
        </div>
    );
}
