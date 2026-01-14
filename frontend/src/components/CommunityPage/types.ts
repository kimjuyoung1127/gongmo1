export interface User {
    id: string;
    nickname: string; // Anonymous nickname
    avatarUrl?: string;
}

export interface Comment {
    id: string;
    author: User;
    content: string;
    createdAt: string;
    likeCount: number;
}

export interface PollOption {
    id: string;
    text: string;
    votes: number;
}

export interface Poll {
    id: string;
    question: string;
    options: PollOption[];
    totalVotes: number;
    userVotedOptionId?: string;
}

export interface Post {
    id: string;
    category: 'WAGES' | 'HOUSING' | 'WORKPLACE' | 'VISA' | 'FREE';
    author: User;
    content: string;
    imageUrls?: string[];
    createdAt: string;
    likeCount: number;
    commentCount: number;
    comments: Comment[];
    poll?: Poll;
    isLiked?: boolean;
}

export type CategoryType = 'WAGES' | 'HOUSING' | 'WORKPLACE' | 'VISA' | 'FREE';

export const CATEGORIES: { id: CategoryType; label: string; icon: string }[] = [
    { id: 'WAGES', label: '임금/급여', icon: '💰' },
    { id: 'HOUSING', label: '숙소', icon: '🏠' },
    { id: 'WORKPLACE', label: '사업장 문제', icon: '⚠️' },
    { id: 'VISA', label: '계약/비자', icon: '📄' },
    { id: 'FREE', label: '자유 이야기', icon: '💬' },
];
