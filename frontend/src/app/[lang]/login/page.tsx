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
      setErrorMessage('닉네임을 입력해주세요');
      return;
    }

    if (!password) {
      setErrorMessage('비밀번호를 입력해주세요');
      return;
    }

    if (nickname.length < 2 || nickname.length > 50) {
      setErrorMessage('닉네임은 2-50자 사이여야 합니다');
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
      setErrorMessage(result.error || '로그인에 실패했습니다');
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

  return (
    <div className="flex justify-center items-center min-h-[60vh] py-12">
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">로그인</h1>
            <p className="text-gray-600 mt-2">WeWorkHere에 오신 것을 환영합니다</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <Alert variant="error">{errorMessage}</Alert>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                닉네임
              </label>
              <Input
                value={nickname}
                onChange={setNickname}
                placeholder="닉네임을 입력하세요"
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <Input
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="비밀번호를 입력하세요"
                disabled={submitting}
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="text-sm">
              <span className="text-gray-600">계정이 없으신가요? </span>
              <Link
                href={`/${lang}/register`}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
