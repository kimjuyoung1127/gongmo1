import { Locale } from '@/types/common';

export type Dictionary = {
  metadata: {
    title: string;
    description: string;
  };
  dashboard: {
    greeting: string;
    aiManual: string;
    aiManualDesc: string;
    startChat: string;
    community: string;
    communityDesc: string;
    joinDiscussion: string;
    ocrScan: string;
    ocrScanDesc: string;
    startScanning: string;
  };
  nav: {
    home: string;
    newPost: string;
    login: string;
    logout: string;
  };
  categories: {
    all: string;
    general: string;
    work: string;
    life: string;
    visa: string;
    housing: string;
    health: string;
  };
  post: {
    createPost: string;
    editPost: string;
    title: string;
    content: string;
    category: string;
    selectCategory: string;
    submit: string;
    cancel: string;
    delete: string;
    edit: string;
    like: string;
    views: string;
    comments: string;
    noTitle: string;
    noContent: string;
    createSuccess: string;
    deleteSuccess: string;
    createError: string;
    deleteError: string;
  };
  comment: {
    addComment: string;
    writeComment: string;
    submit: string;
    delete: string;
    noComments: string;
    createSuccess: string;
    deleteSuccess: string;
    createError: string;
    deleteError: string;
  };
  login: {
    title: string;
    subtitle: string;
    nickname: string;
    nicknamePlaceholder: string;
    loginButton: string;
    nicknameRequired: string;
    nicknameLength: string;
    loginError: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    confirm: string;
    back: string;
  };
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ko: () => import('./ko.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
  vi: () => import('./vi.json').then((module) => module.default),
  ne: () => import('./ne.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]();
};
