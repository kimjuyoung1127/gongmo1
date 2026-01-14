'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/atoms';
import { PostForm } from '@/components/CommunityPage/PostForm';
import { useAuth } from '@/hooks/useAuth';
import { categoryService } from '@/services/categoryService';
import { Category } from '@/types';
import { useDictionary, useLang } from '@/contexts/DictionaryContext';

const MOCK_CATEGORIES: Category[] = [
  { id: 1, name_ko: '임금/급여', name_en: 'Wages', name_vi: 'Tiền lương', name_ne: 'Wages', name_km: 'ប្រាក់ឈ្នួល/ប្រាក់ខែ', slug: 'wages' },
  { id: 2, name_ko: '숙소', name_en: 'Housing', name_vi: 'Chỗ ở', name_ne: 'Housing', name_km: 'លំនៅដ្ឋាន', slug: 'housing' },
  { id: 3, name_ko: '사업장 문제', name_en: 'Workplace', name_vi: 'Nơi làm việc', name_ne: 'Workplace', name_km: 'បញ្ហាកន្លែងធ្វើការ', slug: 'workplace' },
  { id: 4, name_ko: '계약/비자', name_en: 'Visa/Contract', name_vi: 'Visa', name_ne: 'Visa', name_km: 'វីសា/កុងត្រា', slug: 'visa' },
  { id: 5, name_ko: '자유 이야기', name_en: 'Free Talk', name_vi: 'Tự do', name_ne: 'Free Talk', name_km: 'សន្ទនាទូទៅ', slug: 'free-talk' },
];

export default function NewPostPage() {
  const dict = useDictionary();
  const lang = useLang();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);

  useEffect(() => {
    // Development Bypass: Commented out authentication check
    /*
    if (!loading && !isAuthenticated) {
      router.push(`/${lang}/login`);
    }
    */
  }, [isAuthenticated, loading, lang, router]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const cats = await categoryService.getCategories();
  //       setCategories(cats);
  //     } catch (err) {
  //       console.error('Failed to fetch categories', err);
  //       setCategories(MOCK_CATEGORIES); // Fallback to mock
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p>{dict.common.loading}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pt-24 pb-12">
      <h1 className="text-2xl md:text-3xl font-bold text-black mb-8">
        {dict.post.createPost}
      </h1>
      <Card>
        <PostForm categories={categories} />
      </Card>
    </div>
  );
}
