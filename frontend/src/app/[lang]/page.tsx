'use client';

import { useState, useEffect } from 'react';
import { PostList } from '@/components/organisms';
import { CategoryFilter } from '@/components/molecules';
import { Button } from '@/components/atoms';
import { usePosts } from '@/hooks/usePosts';
import { categoryService } from '@/services/categoryService';
import { Category } from '@/types';
import { useDictionary, useLang } from '@/contexts/DictionaryContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function MainPage() {
  const dict = useDictionary();
  const lang = useLang();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>();

  const { data, loading, error, setPage, setCategoryId } = usePosts({
    page: 1,
    page_size: 20,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await categoryService.getCategories();
        setCategories(cats);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId?: number) => {
    setSelectedCategoryId(categoryId);
    setCategoryId(categoryId);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">WeWorkHere</h1>
        {isAuthenticated && (
          <Button onClick={() => router.push(`/${lang}/posts/new`)}>
            {dict.nav.newPost}
          </Button>
        )}
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={handleCategoryChange}
      />

      <PostList
        posts={data?.posts || []}
        categories={categories}
        loading={loading}
        error={error}
        currentPage={data?.page || 1}
        totalPages={data?.total_pages || 1}
        onPageChange={setPage}
      />
    </div>
  );
}
