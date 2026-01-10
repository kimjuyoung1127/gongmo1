export const CATEGORIES = {
  GENERAL: 'general',
  WORK: 'work',
  LIFE: 'life',
  VISA: 'visa',
  HOUSING: 'housing',
  HEALTH: 'health',
} as const;

export const CATEGORY_COLORS = {
  [CATEGORIES.GENERAL]: 'bg-gray-100 text-gray-800',
  [CATEGORIES.WORK]: 'bg-blue-100 text-blue-800',
  [CATEGORIES.LIFE]: 'bg-green-100 text-green-800',
  [CATEGORIES.VISA]: 'bg-purple-100 text-purple-800',
  [CATEGORIES.HOUSING]: 'bg-yellow-100 text-yellow-800',
  [CATEGORIES.HEALTH]: 'bg-red-100 text-red-800',
} as const;
