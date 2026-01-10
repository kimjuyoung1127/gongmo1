'use client';

import { memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LanguageSwitcher, UserDisplay } from '@/components/molecules';
import { Button } from '@/components/atoms';
import { useAuth } from '@/hooks/useAuth';
import { useDictionary, useLang } from '@/contexts/DictionaryContext';

export const Header = memo(() => {
  const dict = useDictionary();
  const lang = useLang();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push(`/${lang}`);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href={`/${lang}`} className="text-2xl font-bold text-blue-600">
              WeWorkHere
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link
                href={`/${lang}`}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {dict.nav.home}
              </Link>
              {isAuthenticated && (
                <Link
                  href={`/${lang}/posts/new`}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {dict.nav.newPost}
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher currentLang={lang} />
            {isAuthenticated && user ? (
              <UserDisplay nickname={user.nickname} onLogout={handleLogout} />
            ) : (
              <Link href={`/${lang}/login`}>
                <Button variant="primary" size="small">
                  {dict.nav.login}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
