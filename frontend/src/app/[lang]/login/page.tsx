'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Input, Button, Alert } from '@/components/atoms';
import { useAuth } from '@/hooks/useAuth';
import { useDictionary, useLang } from '@/contexts/DictionaryContext';

export default function LoginPage() {
  const dict = useDictionary();
  const lang = useLang();
  const router = useRouter();
  const { login, isAuthenticated, loading, error } = useAuth();

  const [nickname, setNickname] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/${lang}`);
    }
  }, [isAuthenticated, lang, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!nickname.trim()) {
      setValidationError(dict.login.nicknameRequired);
      return;
    }

    if (nickname.length < 2 || nickname.length > 50) {
      setValidationError(dict.login.nicknameLength);
      return;
    }

    setSubmitting(true);
    const success = await login({ nickname: nickname.trim() });
    if (success) {
      router.push(`/${lang}`);
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p>{dict.common.loading}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">{dict.login.title}</h1>
            <p className="text-gray-600 mt-2">{dict.login.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {(validationError || error) && (
              <Alert variant="error">{validationError || error}</Alert>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dict.login.nickname}
              </label>
              <Input
                value={nickname}
                onChange={setNickname}
                placeholder={dict.login.nicknamePlaceholder}
                disabled={submitting}
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? dict.common.loading : dict.login.loginButton}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
