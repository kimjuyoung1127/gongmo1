'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Input, Button, Alert, Select } from '@/components/atoms';
import { useAuth } from '@/hooks/useAuth';
import { useDictionary, useLang } from '@/contexts/DictionaryContext';

const LANGUAGES = [
  { value: 'ko', label: '한국어 (Korean)' },
  { value: 'en', label: 'English' },
  { value: 'vi', label: 'Tiếng Việt (Vietnamese)' },
  { value: 'ne', label: 'नेपाली (Nepali)' },
];

export default function SettingsPage() {
  const dict = useDictionary();
  const lang = useLang();
  const router = useRouter();
  const { user, updateProfile, isAuthenticated, loading } = useAuth();

  const [nickname, setNickname] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<'ko' | 'en' | 'vi' | 'ne'>('ko');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(`/${lang}/login`);
    }
  }, [isAuthenticated, loading, lang, router]);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setPreferredLanguage(user.preferred_language as 'ko' | 'en' | 'vi' | 'ne');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // 입력 검증
    if (!nickname.trim()) {
      setErrorMessage('닉네임을 입력해주세요');
      return;
    }

    if (nickname.length < 2 || nickname.length > 50) {
      setErrorMessage('닉네임은 2-50자 사이여야 합니다');
      return;
    }

    setSubmitting(true);
    const result = await updateProfile({
      nickname: nickname.trim(),
      preferred_language: preferredLanguage,
    });

    if (result.success) {
      setSuccessMessage('설정이 저장되었습니다');

      // 언어가 변경된 경우 해당 언어의 설정 페이지로 리다이렉트
      if (preferredLanguage !== lang) {
        setTimeout(() => {
          router.push(`/${preferredLanguage}/settings`);
        }, 1000);
      }
    } else {
      setErrorMessage(result.error || '설정 저장에 실패했습니다');
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-[60vh] py-12">
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">설정</h1>
            <p className="text-gray-600 mt-2">프로필 및 언어 설정을 관리하세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <Alert variant="error">{errorMessage}</Alert>
            )}
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                닉네임
              </label>
              <Input
                value={nickname}
                onChange={setNickname}
                placeholder="닉네임을 입력하세요 (2-50자)"
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                선호 언어
              </label>
              <Select
                value={preferredLanguage}
                onChange={(value) => setPreferredLanguage(value as 'ko' | 'en' | 'vi' | 'ne')}
                options={LANGUAGES}
                disabled={submitting}
              />
              <p className="text-sm text-gray-500 mt-1">
                로그인 시 자동으로 선호하는 언어로 이동합니다
              </p>
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? '저장 중...' : '설정 저장'}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
