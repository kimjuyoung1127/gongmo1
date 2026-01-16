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
    anonymous: string;
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
    anonymous: string;
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
    password: string;
    passwordPlaceholder: string;
    passwordRequired: string;
    submitting: string;
    noAccount: string;
    register: string;
    or: string;
  };
  register: {
    title: string;
    subtitle: string;
    nickname: string;
    nicknamePlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    confirmPassword: string;
    confirmPasswordPlaceholder: string;
    nicknameRequired: string;
    passwordRequired: string;
    confirmPasswordRequired: string;
    nicknameLength: string;
    passwordLength: string;
    passwordMismatch: string;
    registerButton: string;
    submitting: string;
    registerError: string;
    hasAccount: string;
    login: string;
    or: string;
  };
  settings: {
    title: string;
    subtitle: string;
    nickname: string;
    nicknamePlaceholder: string;
    preferredLanguage: string;
    languageHint: string;
    saveButton: string;
    saving: string;
    saveSuccess: string;
    saveError: string;
    nicknameRequired: string;
    nicknameLength: string;
    loading: string;
  };
  notFound: {
    title: string;
    description: string;
    homeButton: string;
  };
  ocr: {
    title: string;
    subtitle: string;
    languageSettings: string;
    sourceLang: string;
    targetLang: string;
    uploadImage: string;
    uploadDesc: string;
    fileFormat: string;
    analyzing: string;
    startAnalysis: string;
    error: string;
    analysisComplete: string;
    confidence: string;
    analyzeNew: string;
    documentType: string;
    originalText: string;
    translatedText: string;
    summary: string;
    keyInfo: string;
    company: string;
    date: string;
    amount: string;
    period: string;
    conditions: string;
    imageOnly: string;
    fileSizeLimit: string;
    analysisFailed: string;
    noInfo: string;
    languages: {
      ko: string;
      en: string;
      vi: string;
      ne: string;
    };
  };
  aiManualChat: {
    titleFallback: string;
    assistantGreeting: string;
    inputPlaceholder: string;
    send: string;
    loadingResponse: string;
    answerUnavailable: string;
    errorPrefix: string;
    networkErrorPrefix: string;
    sections: {
      bom: string;
      "product-guide": string;
      sop: string;
      policy: string;
      wiki: string;
    };
  };
  mypage: {
    title: string;
    profileFallback: string;
    profileImageAlt: string;
    editProfile: string;
    editProfileAlert: string;
    activityTitle: string;
    stats: {
      posts: string;
      comments: string;
      likesReceived: string;
      companyIssues: string;
    };
    pointsLabel: string;
    pointsHistory: string;
    languageSetting: string;
    company: string;
    companyNone: string;
    logout: string;
    logoutConfirm: string;
    languageSelectTitle: string;
    versionPrefix: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    confirm: string;
    back: string;
  };
  communityPage: {
    companyIssues: string;
    freeBoard: string;
    goToFreeBoard: string;
    goToCompanyIssues: string;
  };
  aiManualMenu: {
    mainMenu: string;
    selectInfo: string;
    language: string;
    status: string;
    statusDummy: string;
    connection: string;
    open: string;
    bomTitle: string;
    bomDesc: string;
    productGuideTitle: string;
    productGuideDesc: string;
    sopTitle: string;
    sopDesc: string;
    policyTitle: string;
    policyDesc: string;
    wikiTitle: string;
    wikiDesc: string;
    backToMain: string;
  };
  aiManualNotice: {
    title: string;
    back: string;
    todayNotices: string;
    shiftIssues: string;
    confirmButton: string;
    author: string;
    statusInProgress: string;
    statusMonitoring: string;
  };
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ko: () => import('./ko.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
  vi: () => import('./vi.json').then((module) => module.default),
  ne: () => import('./ne.json').then((module) => module.default),
  km: () => import('./km.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]();
};