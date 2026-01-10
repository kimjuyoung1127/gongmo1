'use client';

import { createContext, useContext } from 'react';
import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/types/common';

interface DictionaryContextValue {
  dictionary: Dictionary;
  lang: Locale;
}

const DictionaryContext = createContext<DictionaryContextValue | null>(null);

export function DictionaryProvider({
  dictionary,
  lang,
  children,
}: {
  dictionary: Dictionary;
  lang: Locale;
  children: React.ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={{ dictionary, lang }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useDictionary must be used within DictionaryProvider');
  }
  return context.dictionary;
}

export function useLang() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useLang must be used within DictionaryProvider');
  }
  return context.lang;
}
