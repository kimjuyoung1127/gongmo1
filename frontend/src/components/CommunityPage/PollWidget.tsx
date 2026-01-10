'use client';

import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface PollOption {
    id: number;
    text: string;
    votes: number;
}

interface PollWidgetProps {
    options: PollOption[];
    totalVotes: number;
    hasVoted?: boolean;
    onVote: (optionId: number) => void;
}

export const PollWidget = ({ options, totalVotes, hasVoted, onVote }: PollWidgetProps) => {
    return (
        <div className="bg-gray-800/50 rounded-xl p-4 mt-3 border border-gray-700">
            <div className="text-xs text-gray-400 mb-3 flex justify-between">
                <span className="font-bold text-blue-400">POLL</span>
                <span>{totalVotes} votes</span>
            </div>

            <div className="space-y-2">
                {options.map((option) => {
                    const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;

                    return (
                        <button
                            key={option.id}
                            onClick={() => !hasVoted && onVote(option.id)}
                            disabled={hasVoted}
                            className={`relative w-full text-left p-3 rounded-lg overflow-hidden transition-all ${!hasVoted ? 'hover:bg-gray-700/50' : ''}`}
                        >
                            {/* Background Bar */}
                            {hasVoted && (
                                <div
                                    className="absolute left-0 top-0 bottom-0 bg-blue-900/40 z-0 transition-all duration-500 ease-out"
                                    style={{ width: `${percentage}%` }}
                                />
                            )}

                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {hasVoted ? (
                                        <CheckCircle2 size={18} className="text-blue-500" />
                                    ) : (
                                        <Circle size={18} className="text-gray-500" />
                                    )}
                                    <span className="text-gray-200 text-sm font-medium">{option.text}</span>
                                </div>
                                {hasVoted && (
                                    <span className="text-blue-400 text-sm font-bold">{percentage}%</span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {hasVoted && (
                <div className="text-center mt-3">
                    <span className="text-xs text-gray-500">You voted anonymously</span>
                </div>
            )}
        </div>
    );
};
