'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, Input, Button, Alert } from '@/components/atoms';
import { useAuth } from '@/hooks/useAuth';
import { useDictionary, useLang } from '@/contexts/DictionaryContext';

export default function RegisterPage() {
  const dict = useDictionary();
  const lang = useLang();
  const router = useRouter();
  const { register } = useAuth();

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    if (!passwordConfirm) {
      setErrorMessage('비밀번호 확인을 입력해주세요');
      return;
    }

    if (nickname.length < 2 || nickname.length > 50) {
      setErrorMessage('닉네임은 2-50자 사이여야 합니다');
      return;
    }

    if (password.length < 6 || password.length > 100) {
      setErrorMessage('비밀번호는 6-100자 사이여야 합니다');
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage('비밀번호가 일치하지 않습니다');
      return;
    }

    setSubmitting(true);
    const result = await register({
      nickname: nickname.trim(),
      password
    });

    if (result.success) {
      router.push(`/${lang}/login?registered=true`);
    } else {
      setErrorMessage(result.error || '회원가입에 실패했습니다');
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] py-12">
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">회원가입</h1>
            <p className="text-gray-600 mt-2">WeWorkHere 계정을 만드세요</p>
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
                placeholder="닉네임을 입력하세요 (2-50자)"
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
                placeholder="비밀번호를 입력하세요 (6자 이상)"
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 확인
              </label>
              <Input
                type="password"
                value={passwordConfirm}
                onChange={setPasswordConfirm}
                placeholder="비밀번호를 다시 입력하세요"
                disabled={submitting}
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? '가입 중...' : '회원가입'}
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
              <span className="text-gray-600">이미 계정이 있으신가요? </span>
              <Link
                href={`/${lang}/login`}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                로그인
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
