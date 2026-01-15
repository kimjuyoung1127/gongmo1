import { Locale } from '@/types/common';

export const SUPPORTED_LANGUAGES: Locale[] = ['ko', 'en', 'vi', 'ne', 'km'];

export const LANGUAGE_NAMES: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  vi: 'Tiếng Việt',
  ne: 'नेपाली',
  km: 'ភាសាខ្មែរ',
};

export const DEFAULT_LANGUAGE: Locale = 'ko';
