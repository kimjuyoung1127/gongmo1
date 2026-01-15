'use client';

import { useEffect, useState } from 'react';
import { PostList } from '@/components/organisms';
import { CategoryFilter } from '@/components/molecules';
import { PointBadge } from '@/components/CommunityPage/PointBadge';
import { CompanyIssueList } from '@/components/CommunityPage/CompanyIssueList';
import { DesktopFloatingButton } from '@/components/materials/DesktopFloatingButton';
import { useLang, useDictionary } from '@/contexts/DictionaryContext';
import { usePosts } from '@/hooks/usePosts';
import { categoryService } from '@/services/categoryService';
import { Category } from '@/types';

export default function CommunityPage() {
    const lang = useLang();
    const dict = useDictionary();

    // View State: 'ISSUES' (default) or 'BOARD'
    const [currentView, setCurrentView] = useState<'ISSUES' | 'BOARD'>('ISSUES');

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>();
    const [earnedPoints] = useState<number | null>(null);

    const { data, loading, error, setPage, setCategoryId } = usePosts({
        page: 1,
        page_size: 20,
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const cats = await categoryService.getCategories();
                setCategories(cats);
            } catch (err) {
                console.error('Failed to fetch categories', err);
            }
        };
        fetchCategories();
    }, []);

    // Handlers
    const handleCategoryChange = (categoryId?: number) => {
        setSelectedCategoryId(categoryId);
        setCategoryId(categoryId);
    };

    return (
        <div className="relative min-h-screen bg-gray-50 pt-14">
            {/* Header */}
            <div className="bg-white sticky top-0 z-10 border-b border-gray-100 shadow-sm">
                <div className="flex justify-between items-center px-4 py-3">
                    <h1 className="text-xl font-bold text-gray-900">
                        {currentView === 'ISSUES' ? dict.communityPage.companyIssues : dict.communityPage.freeBoard}
                    </h1>

                    {/* View Toggle Button */}
                    <button
                        onClick={() => setCurrentView(prev => prev === 'ISSUES' ? 'BOARD' : 'ISSUES')}
                        className="px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-xl text-sm hover:bg-blue-100 transition-colors"
                    >
                        {currentView === 'ISSUES' ? dict.communityPage.goToFreeBoard : dict.communityPage.goToCompanyIssues}
                    </button>

                    {/* Points Badge (Only show in Board view or right side?) - keeping it right side if space allows,
                        or maybe hide in Issues view to keep it clean like the screenshot.
                        Let's keep it but conditionally rendering to avoid clutter if needed. */}
                    {earnedPoints && <PointBadge points={earnedPoints} />}
                </div>

                {/* Categories only show in Board view */}
                {currentView === 'BOARD' && (
                    <CategoryFilter
                        categories={categories}
                        selectedCategoryId={selectedCategoryId}
                        onSelectCategory={handleCategoryChange}
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
                    <div className="animate-fade-in-up px-4">
                        <PostList
                            posts={data?.posts || []}
                            categories={categories}
                            loading={loading}
                            error={error}
                            currentPage={data?.page || 1}
                            totalPages={data?.total_pages || 1}
                            onPageChange={setPage}
                        />
                    </div>
                )}
            </div>

            {/* Floating Action Button (QuickActionModal Trigger) - Always visible */}
            <DesktopFloatingButton href={`/${lang}/posts/new`} />

        </div>
    );
}
