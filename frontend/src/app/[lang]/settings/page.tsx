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
  { value: 'km', label: 'ភាសាខ្មែរ (Khmer)' },
];

export default function SettingsPage() {
  const dict = useDictionary();
  const lang = useLang();
  const router = useRouter();
  const { user, updateProfile, isAuthenticated, loading } = useAuth();

  const [nickname, setNickname] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<'ko' | 'en' | 'vi' | 'ne' | 'km'>('ko');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const t = dict?.settings;

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(`/${lang}/login`);
    }
  }, [isAuthenticated, loading, lang, router]);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setPreferredLanguage(user.preferred_language as 'ko' | 'en' | 'vi' | 'ne' | 'km');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // 입력 검증
    if (!nickname.trim()) {
      setErrorMessage(t?.nicknameRequired || 'Please enter a nickname');
      return;
    }

    if (nickname.length < 2 || nickname.length > 50) {
      setErrorMessage(t?.nicknameLength || 'Nickname must be between 2-50 characters');
      return;
    }

    setSubmitting(true);
    const result = await updateProfile({
      nickname: nickname.trim(),
      preferred_language: preferredLanguage,
    });

    if (result.success) {
      setSuccessMessage(t?.saveSuccess || 'Settings saved successfully');

      // 언어가 변경된 경우 해당 언어의 설정 페이지로 리다이렉트
      if (preferredLanguage !== lang) {
        setTimeout(() => {
          router.push(`/${preferredLanguage}/settings`);
        }, 1000);
      }
    } else {
      setErrorMessage(result.error || t?.saveError || 'Failed to save settings');
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p>{t?.loading || dict?.common?.loading || 'Loading...'}</p>
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
            <h1 className="text-3xl font-bold text-gray-900">{t?.title || 'Settings'}</h1>
            <p className="text-gray-600 mt-2">{t?.subtitle || 'Manage your profile and language settings'}</p>
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
                {t?.nickname || 'Nickname'}
              </label>
              <Input
                value={nickname}
                onChange={setNickname}
                placeholder={t?.nicknamePlaceholder || 'Enter your nickname (2-50 characters)'}
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t?.preferredLanguage || 'Preferred Language'}
              </label>
              <Select
                value={preferredLanguage}
                onChange={(value) => setPreferredLanguage(value as 'ko' | 'en' | 'vi' | 'ne' | 'km')}
                options={LANGUAGES}
                disabled={submitting}
              />
              <p className="text-sm text-gray-500 mt-1">
                {t?.languageHint || 'You will be automatically redirected to your preferred language on login'}
              </p>
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (t?.saving || 'Saving...') : (t?.saveButton || 'Save Settings')}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
