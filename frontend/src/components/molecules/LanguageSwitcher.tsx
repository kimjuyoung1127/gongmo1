'use client';

import { memo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Select } from '@/components/atoms';
import { SUPPORTED_LANGUAGES, LANGUAGE_NAMES } from '@/constants';
import { Locale } from '@/types/common';

interface LanguageSwitcherProps {
  currentLang: Locale;
}

export const LanguageSwitcher = memo<LanguageSwitcherProps>(({ currentLang }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLang: string) => {
    const newPathname = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPathname);
  };

  const options = SUPPORTED_LANGUAGES.map((lang) => ({
    value: lang,
    label: LANGUAGE_NAMES[lang],
  }));

  return (
    <Select
      value={currentLang}
      onChange={handleLanguageChange}
      options={options}
      className="w-32"
    />
  );
});

LanguageSwitcher.displayName = 'LanguageSwitcher';

export default LanguageSwitcher;
