'use client';

import { useState } from 'react';
import { Header } from '@/components/materials/Header';
import { CategoryList } from '@/components/CommunityPage/CategoryList';
import { PostCard } from '@/components/CommunityPage/PostCard';
import { PostEditor } from '@/components/CommunityPage/PostEditor';
import { useDictionary } from '@/contexts/DictionaryContext';
import { Search, PenSquare } from 'lucide-react';

export default function CommunityPage() {
    const dict = useDictionary();
    const [selectedCat, setSelectedCat] = useState('all');
    const [isWriting, setIsWriting] = useState(false);

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'wage', label: dict.community.wage },
        { id: 'housing', label: dict.community.housing },
        { id: 'workplace', label: dict.community.workplace },
        { id: 'visa', label: dict.community.visa },
        { id: 'free', label: dict.community.free },
    ];

    // Dummy Data for Preview
    const posts = [
        {
            id: 1,
            category: dict.community.wage,
            title: "Overtime pay calculation question",
            content: "I worked 50 hours last week but my pay seems short. How is overtime usually calculated here? I'm on an E-9 visa working in manufacturing.",
            author: dict.community.anonymous,
            timeAgo: "2h ago",
            likes: 12,
            comments: 5,
        },
        {
            id: 2,
            category: dict.community.workplace,
            title: "Need safety gear advice",
            content: "My boss says I have to buy my own safety boots. Is this legal? I thought the company provides them.",
            author: dict.community.anonymous,
            timeAgo: "5h ago",
            likes: 45,
            comments: 12,
            hasPoll: true,
            pollData: {
                totalVotes: 82,
                hasVoted: false,
                options: [
                    { id: 1, text: "Company must provide", votes: 70 },
                    { id: 2, text: "You must buy", votes: 12 }
                ]
            }
        },
        {
            id: 3,
            category: dict.community.free,
            title: "Which bank is best for remittance?",
            content: "Looking for low fees and fast transfer to Vietnam. Any recommendations?",
            author: dict.community.anonymous,
            timeAgo: "1d ago",
            likes: 8,
            comments: 24,
        }
    ];

    return (
        <div className="min-h-screen bg-gray-900 pb-20">
            <Header
                title={dict.dashboard.community}
                showBack={true}
                rightElement={
                    <button className="text-gray-400 hover:text-white">
                        <Search size={24} />
                    </button>
                }
            />

            <div className="pt-14">
                <CategoryList
                    categories={categories}
                    selectedId={selectedCat}
                    onSelect={setSelectedCat}
                />

                <div className="flex flex-col">
                    {posts.map(post => (
                        <PostCard key={post.id} {...post} />
                    ))}
                </div>
            </div>

            {/* Floating Write Button */}
            <button
                onClick={() => setIsWriting(true)}
                className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 text-white z-40 hover:bg-blue-500 transition-colors"
            >
                <PenSquare size={28} />
            </button>

            {/* Post Editor Modal */}
            {isWriting && (
                <PostEditor
                    onClose={() => setIsWriting(false)}
                    categories={categories.filter(c => c.id !== 'all')}
                />
            )}
        </div>
    );
}
