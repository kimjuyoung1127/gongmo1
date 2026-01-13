'use client';

import { User } from '@/types/user'; // You might need to adjust this import based on actual user type location
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ProfileSectionProps {
    user: {
        nickname: string;
        avatarUrl?: string;
    } | null;
    onEdit: () => void;
}

export function ProfileSection({ user, onEdit }: ProfileSectionProps) {
    return (
        <div className="flex items-center justify-between p-4 mb-6">
            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-100">
                    {/* Fallback to initials or placeholder if no avatar */}
                    {user?.avatarUrl ? (
                        <Image src={user.avatarUrl} alt="Profile" fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-bold">
                            {user?.nickname?.[0]?.toUpperCase() || 'U'}
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{user?.nickname || '사용자'}</h2>
                    <button
                        onClick={onEdit}
                        className="text-sm text-gray-500 flex items-center mt-1 hover:text-blue-600 transition-colors"
                    >
                        내 정보 수정 <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
