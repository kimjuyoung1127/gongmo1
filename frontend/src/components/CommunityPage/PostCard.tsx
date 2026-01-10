'use client';

import { ThumbsUp, MessageCircle, MoreHorizontal } from 'lucide-react';
import { PollWidget } from './PollWidget';

interface PostCardProps {
    id: number;
    category: string;
    title: string;
    content: string;
    author: string; // "Anonymous"
    timeAgo: string;
    likes: number;
    comments: number;
    hasPoll?: boolean;
    pollData?: any; // Using simplified type for now
}

export const PostCard = ({
    category, title, content, author, timeAgo, likes, comments, hasPoll, pollData
}: PostCardProps) => {
    return (
        <div className="bg-gray-900 border-b border-gray-800 p-4 active:bg-gray-800/50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="bg-gray-800 text-blue-400 text-xs px-2 py-0.5 rounded-md font-bold border border-gray-700">
                        {category}
                    </span>
                    <span className="text-gray-500 text-xs">·</span>
                    <span className="text-gray-400 text-xs font-medium">{author}</span>
                </div>
                <span className="text-gray-600 text-xs">{timeAgo}</span>
            </div>

            <h3 className="text-white font-bold text-lg mb-1 leading-snug">{title}</h3>
            <p className="text-gray-400 text-sm line-clamp-3 mb-3 leading-relaxed">
                {content}
            </p>

            {hasPoll && pollData && (
                <div className="mb-4" onClick={(e) => e.stopPropagation()}>
                    <PollWidget
                        options={pollData.options}
                        totalVotes={pollData.totalVotes}
                        hasVoted={pollData.hasVoted}
                        onVote={(optId) => console.log('Vote', optId)}
                    />
                </div>
            )}

            <div className="flex items-center gap-4 text-gray-500 text-sm">
                <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <ThumbsUp size={16} />
                    <span>{likes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <MessageCircle size={16} />
                    <span>{comments}</span>
                </button>
            </div>
        </div>
    );
};
