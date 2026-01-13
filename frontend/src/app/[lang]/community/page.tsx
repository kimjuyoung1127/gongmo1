'use client';

import { useState } from 'react';
import { Post, CategoryType, User } from '@/components/CommunityPage/types';
import { CategoryFilter } from '@/components/CommunityPage/CategoryFilter';
import { PostList } from '@/components/CommunityPage/PostList';
import { PointBadge } from '@/components/CommunityPage/PointBadge';
import { ReportModal } from '@/components/CommunityPage/ReportModal';
import { CompanyIssueList } from '@/components/CommunityPage/CompanyIssueList';
import { DesktopFloatingButton } from '@/components/materials/DesktopFloatingButton';
import { useLang } from '@/contexts/DictionaryContext';

// Mock Data
const MOCK_USER: User = { id: 'u1', nickname: 'Worker123', avatarUrl: '' };

const MOCK_POSTS: Post[] = [
    {
        id: 'p1',
        category: 'WAGES',
        author: { id: 'u2', nickname: 'Anonymous' },
        content: 'Has anyone received their paycheck for last month? Mine is delayed.',
        createdAt: new Date().toISOString(),
        likeCount: 5,
        commentCount: 2,
        comments: [
            { id: 'c1', author: { id: 'u3', nickname: 'Kim' }, content: 'Me too, waiting.', createdAt: new Date().toISOString(), likeCount: 1 },
            { id: 'c2', author: { id: 'u4', nickname: 'Lee' }, content: 'I got mine yesterday.', createdAt: new Date().toISOString(), likeCount: 0 }
        ],
        poll: {
            id: 'poll1',
            question: 'Did you get paid?',
            options: [
                { id: 'opt1', text: 'Yes', votes: 15 },
                { id: 'opt2', text: 'No', votes: 8 },
                { id: 'opt3', text: 'Partial', votes: 2 }
            ],
            totalVotes: 25
        }
    },
    {
        id: 'p2',
        category: 'HOUSING',
        author: { id: 'u5', nickname: 'NewLife' },
        content: 'Looking for a roommate in downtown area. Clean and quiet.',
        imageUrls: ['https://picsum.photos/seed/room/400/300'],
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        likeCount: 12,
        commentCount: 0,
        comments: []
    }
];

export default function CommunityPage() {
    const lang = useLang();

    // View State: 'ISSUES' (default) or 'BOARD'
    const [currentView, setCurrentView] = useState<'ISSUES' | 'BOARD'>('ISSUES');

    // Posts State (for Free Board)
    const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'ALL'>('ALL');
    const [earnedPoints, setEarnedPoints] = useState<number | null>(null);
    const [reportingPostId, setReportingPostId] = useState<string | null>(null);

    // ... (Keep existing handlers for Board) ...
    // Filter Posts
    const filteredPosts = selectedCategory === 'ALL'
        ? posts
        : posts.filter(p => p.category === selectedCategory);

    // Handlers
    const handleVote = (pollId: string, optionId: string) => {
        setPosts(posts.map(post => {
            if (post.poll?.id === pollId) {
                const updatedOptions = post.poll.options.map(opt =>
                    opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
                );
                return {
                    ...post,
                    poll: {
                        ...post.poll,
                        options: updatedOptions,
                        totalVotes: post.poll.totalVotes + 1,
                        userVotedOptionId: optionId
                    }
                };
            }
            return post;
        }));
    };

    const handleAddComment = (postId: string, content: string) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                const newComment = {
                    id: `c_${Date.now()}`,
                    author: MOCK_USER,
                    content,
                    createdAt: new Date().toISOString(),
                    likeCount: 0
                };
                return {
                    ...post,
                    comments: [...post.comments, newComment],
                    commentCount: post.commentCount + 1
                };
            }
            return post;
        }));
    };

    const handleTranslate = (postId: string) => {
        alert(`Translate post ${postId} (Mock)`);
    };

    const handleReport = (postId: string) => {
        setReportingPostId(postId);
    };

    const splitReportSubmit = (reason: string) => {
        console.log(`Reporting post ${reportingPostId} for reason: ${reason}`);
        alert(`Post has been reported for: ${reason}`);
        setReportingPostId(null);
    };

    return (
        <div className="relative min-h-screen bg-gray-50 pt-14">
            {/* Header */}
            <div className="bg-white sticky top-0 z-10 border-b border-gray-100 shadow-sm">
                <div className="flex justify-between items-center px-4 py-3">
                    <h1 className="text-xl font-bold text-gray-900">
                        {currentView === 'ISSUES' ? '우리 회사 이슈' : '자유게시판'}
                    </h1>

                    {/* View Toggle Button */}
                    <button
                        onClick={() => setCurrentView(prev => prev === 'ISSUES' ? 'BOARD' : 'ISSUES')}
                        className="px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-xl text-sm hover:bg-blue-100 transition-colors"
                    >
                        {currentView === 'ISSUES' ? '자유게시판 이동 >' : '< 회사 이슈 보기'}
                    </button>

                    {/* Points Badge (Only show in Board view or right side?) - keeping it right side if space allows, 
                        or maybe hide in Issues view to keep it clean like the screenshot. 
                        Let's keep it but conditionally rendering to avoid clutter if needed. */}
                    {earnedPoints && <PointBadge points={earnedPoints} />}
                </div>

                {/* Categories only show in Board view */}
                {currentView === 'BOARD' && (
                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                )}
            </div>

            {/* Content Area */}
            <div className="pt-2 pb-24">
                {currentView === 'ISSUES' ? (
                    <div className="animate-fade-in-up">
                        {/* Intro Text or Banner could go here */}
                        <CompanyIssueList />
                    </div>
                ) : (
                    <div className="animate-fade-in-up">
                        <PostList
                            posts={filteredPosts}
                            onVote={handleVote}
                            onAddComment={handleAddComment}
                            onTranslate={handleTranslate}
                            onReport={handleReport}
                        />
                    </div>
                )}
            </div>

            {/* Floating Action Button (QuickActionModal Trigger) - Always visible */}
            <DesktopFloatingButton href={`/${lang}/posts/new`} />

            {/* Report Modal (For Board Posts) */}
            <ReportModal
                isOpen={!!reportingPostId}
                onClose={() => setReportingPostId(null)}
                onSubmit={splitReportSubmit}
            />
        </div>
    );
}
