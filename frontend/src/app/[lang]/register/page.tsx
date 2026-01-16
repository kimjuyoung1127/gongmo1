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

  const t = dict?.register;

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

    if (!passwordConfirm) {
      setErrorMessage(t?.confirmPasswordRequired || 'Please confirm your password');
      return;
    }

    if (nickname.length < 2 || nickname.length > 50) {
      setErrorMessage(t?.nicknameLength || 'Nickname must be between 2-50 characters');
      return;
    }

    if (password.length < 6 || password.length > 100) {
      setErrorMessage(t?.passwordLength || 'Password must be between 6-100 characters');
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage(t?.passwordMismatch || 'Passwords do not match');
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
      setErrorMessage(result.error || t?.registerError || 'Sign up failed');
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] py-12">
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">{t?.title || 'Sign Up'}</h1>
            <p className="text-gray-600 mt-2">{t?.subtitle || 'Create your LinkON account'}</p>
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
                placeholder={t?.nicknamePlaceholder || 'Enter your nickname (2-50 characters)'}
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
                placeholder={t?.passwordPlaceholder || 'Enter your password (6+ characters)'}
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t?.confirmPassword || 'Confirm Password'}
              </label>
              <Input
                type="password"
                value={passwordConfirm}
                onChange={setPasswordConfirm}
                placeholder={t?.confirmPasswordPlaceholder || 'Re-enter your password'}
                disabled={submitting}
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (t?.submitting || 'Signing up...') : (t?.registerButton || 'Sign Up')}
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
              <span className="text-gray-600">{t?.hasAccount || 'Already have an account?'} </span>
              <Link
                href={`/${lang}/login`}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t?.login || 'Login'}
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
