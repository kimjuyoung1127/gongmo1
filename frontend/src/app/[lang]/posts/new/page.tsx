'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/atoms';
import { PostForm } from '@/components/organisms';
import { useAuth } from '@/hooks/useAuth';
import { categoryService } from '@/services/categoryService';
import { Category } from '@/types';
import { useDictionary, useLang } from '@/contexts/DictionaryContext';

export default function NewPostPage() {
  const dict = useDictionary();
  const lang = useLang();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(`/${lang}/login`);
    }
  }, [isAuthenticated, loading, lang, router]);

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

  if (loading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p>{dict.common.loading}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {dict.post.createPost}
      </h1>
      <Card>
        <PostForm categories={categories} />
      </Card>
    </div>
  );
}
