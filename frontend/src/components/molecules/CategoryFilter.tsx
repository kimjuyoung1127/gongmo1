'use client';

import { memo } from 'react';
import { Category } from '@/types';
import { Button } from '@/components/atoms';
import { useDictionary, useLang } from '@/contexts/DictionaryContext';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId?: number;
  onSelectCategory: (categoryId?: number) => void;
}

export const CategoryFilter = memo<CategoryFilterProps>(({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  const dict = useDictionary();
  const lang = useLang();

  const getCategoryName = (category: Category): string => {
    switch (lang) {
      case 'ko': return category.name_ko;
      case 'en': return category.name_en;
      case 'vi': return category.name_vi;
      case 'ne': return category.name_ne;
      default: return category.name_en;
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategoryId === undefined ? 'primary' : 'secondary'}
        size="small"
        onClick={() => onSelectCategory(undefined)}
      >
        {dict.categories.all}
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategoryId === category.id ? 'primary' : 'secondary'}
          size="small"
          onClick={() => onSelectCategory(category.id)}
        >
          {getCategoryName(category)}
        </Button>
      ))}
    </div>
  );
});

CategoryFilter.displayName = 'CategoryFilter';

export default CategoryFilter;
