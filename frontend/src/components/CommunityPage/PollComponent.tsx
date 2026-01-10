'use client';

import { useState } from 'react';
import { Poll } from './types';

interface PollComponentProps {
    poll: Poll;
    onVote: (pollId: string, optionId: string) => void;
}

export function PollComponent({ poll, onVote }: PollComponentProps) {
    const [isVoting, setIsVoting] = useState(false);

    const handleVote = async (optionId: string) => {
        if (poll.userVotedOptionId) return; // Already voted
        setIsVoting(true);
        await onVote(poll.id, optionId);
        setIsVoting(false);
    };

    const maxVotes = Math.max(...poll.options.map((o) => o.votes), 1);

    return (
        <div className="bg-gray-50 rounded-lg p-4 mt-3 border border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-3">{poll.question}</h4>
            <div className="space-y-2">
                {poll.options.map((option) => {
                    const percentage = Math.round((option.votes / (poll.totalVotes || 1)) * 100);
                    const isSelected = poll.userVotedOptionId === option.id;

                    return (
                        <button
                            key={option.id}
                            onClick={() => handleVote(option.id)}
                            disabled={!!poll.userVotedOptionId || isVoting}
                            className={`w-full relative group overflow-hidden rounded-md transition-all ${poll.userVotedOptionId
                                    ? 'cursor-default'
                                    : 'hover:bg-gray-100 cursor-pointer'
                                }`}
                        >
                            {/* Progress Bar Background */}
                            <div
                                className={`absolute inset-0 opacity-20 ${isSelected ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}
                                style={{ width: `${poll.userVotedOptionId ? percentage : 0}%` }}
                            />

                            <div className="relative flex justify-between items-center p-3 z-10">
                                <span className={`text-sm font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                                    {option.text} {isSelected && '(You voted)'}
                                </span>
                                {poll.userVotedOptionId && (
                                    <span className="text-sm text-gray-500">{percentage}%</span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
            <div className="mt-2 text-xs text-gray-500 text-right">
                Total votes: {poll.totalVotes}
            </div>
        </div>
    );
}
