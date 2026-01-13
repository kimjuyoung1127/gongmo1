'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/contexts/DictionaryContext';
import { ProfileSection } from '@/components/Mypage/ProfileSection';
import { ActivitySummary } from '@/components/Mypage/ActivitySummary';
import { MenuSection } from '@/components/Mypage/MenuSection';
import { LanguageModal } from '@/components/Mypage/LanguageModal';
import { Locale } from '@/types/common';

import { useEffect } from 'react';

export default function Mypage() {
    const lang = useLang();
    const router = useRouter();
    const { user, logout, isAuthenticated, loading } = useAuth();
    const [isLangModalOpen, setIsLangModalOpen] = useState(false);

    // Auth check commented out for fast development
    /*
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push(`/${lang}/login`);
        }
    }, [loading, isAuthenticated, lang, router]);
    */

    const handleEditProfile = () => {
        // Implement edit profile logic or navigation
        alert('프로필 수정 기능 준비중');
    };

    const handleLanguageChange = (newLang: Locale) => {
        // Simple URL replacement for language change
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace(`/${lang}`, `/${newLang}`);
        router.push(newPath);
    };

    const handleLogout = async () => {
        if (confirm('로그아웃 하시겠습니까?')) {
            await logout();
            router.push(`/${lang}/login`);
        }
    };

    /*
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }
    */

    // Mock User for Dev if real user is missing
    const displayUser = user || {
        nickname: '개발자(Dev)',
        avatarUrl: '',
        preferred_language: 'ko'
    };

    // if (!user) return null; // Bypass null check

    return (
        <div className="h-screen overflow-hidden bg-gray-50 pt-20">
            <div className="max-w-md mx-auto px-4">
                <h1 className="text-2xl font-extrabold text-gray-900 mb-6 px-2">마이페이지</h1>

                <ProfileSection
                    user={displayUser}
                    onEdit={handleEditProfile}
                />

                <ActivitySummary
                    userName={displayUser.nickname}
                    points={1250}
                />

                <MenuSection
                    currentLang={lang}
                    companyName="현대자동차 울산공장" // Mock - should come from user/api
                    onChangeLang={() => setIsLangModalOpen(true)}
                    onLogout={handleLogout}
                />

                <div className="px-2 text-xs text-gray-400 text-center mt-8">
                    버전 1.0.0
                </div>
            </div>

            <LanguageModal
                isOpen={isLangModalOpen}
                onClose={() => setIsLangModalOpen(false)}
                currentLang={lang}
                onChange={handleLanguageChange}
            />
        </div>
    );
}
