'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, Input, Button, Alert } from '@/components/atoms';
import { useAuth } from '@/hooks/useAuth';
import { useDictionary, useLang } from '@/contexts/DictionaryContext';

export default function LoginPage() {
  const dict = useDictionary();
  const lang = useLang();
  const router = useRouter();
  const { login, isAuthenticated, loading } = useAuth();

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const t = dict?.login;

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/${lang}`);
    }
  }, [isAuthenticated, lang, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 입력 검증
    if (!nickname.trim()) {
      setErrorMessage(t?.nicknameRequired || 'Please enter a nickname');
      return;
    }

    if (!password) {
      setErrorMessage(t?.passwordRequired || 'Please enter a password');
      return;
    }

    if (nickname.length < 2 || nickname.length > 50) {
      setErrorMessage(t?.nicknameLength || 'Nickname must be between 2-50 characters');
      return;
    }

    setSubmitting(true);
    const result = await login({
      nickname: nickname.trim(),
      password
    });

    if (result.success && result.user) {
      // 사용자의 선호 언어로 리다이렉트
      const preferredLang = result.user.preferred_language || 'ko';
      router.push(`/${preferredLang}`);
    } else {
      setErrorMessage(result.error || t?.loginError || 'Login failed');
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p>{dict?.common?.loading || 'Loading...'}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[60vh] py-12">
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">{t?.title || 'Login'}</h1>
            <p className="text-gray-600 mt-2">{t?.subtitle || 'Welcome to LinkON'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <Alert variant="error">{errorMessage}</Alert>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t?.nickname || 'Nickname'}
              </label>
              <Input
                value={nickname}
                onChange={setNickname}
                placeholder={t?.nicknamePlaceholder || 'Enter your nickname'}
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t?.password || 'Password'}
              </label>
              <Input
                type="password"
                value={password}
                onChange={setPassword}
                placeholder={t?.passwordPlaceholder || 'Enter your password'}
                disabled={submitting}
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (t?.submitting || 'Logging in...') : (t?.loginButton || 'Login')}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t?.or || 'or'}</span>
              </div>
            </div>

            <div className="text-sm">
              <span className="text-gray-600">{t?.noAccount || "Don't have an account?"} </span>
              <Link
                href={`/${lang}/register`}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t?.register || 'Sign up'}
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
