'use client';

import { memo } from 'react';
import { PostCard } from '@/components/molecules';
import { Button, LoadingSpinner, Alert } from '@/components/atoms';
import { Post, Category } from '@/types';
import { useDictionary } from '@/contexts/DictionaryContext';
import { useLang } from '@/contexts/DictionaryContext';

interface PostListProps {
  posts: Post[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PostList = memo<PostListProps>(({
  posts,
  categories,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const dict = useDictionary();
  const lang = useLang();

  const getCategoryName = (categoryId: number | null): string | undefined => {
    if (!categoryId) return undefined;
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return undefined;

    switch (lang) {
      case 'ko': return category.name_ko;
      case 'en': return category.name_en;
      case 'vi': return category.name_vi;
      case 'ne': return category.name_ne;
      default: return category.name_en;
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="error">{error}</Alert>;
  }

  if (posts.length === 0) {
    return (
      <Alert variant="info">
        {lang === 'ko' ? '게시글이 없습니다' : 'No posts available'}
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            categoryName={getCategoryName(post.category_id)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <Button
            variant="secondary"
            size="small"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ←
          </Button>
          <span className="text-gray-700">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="secondary"
            size="small"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            →
          </Button>
        </div>
      )}
    </div>
  );
});

PostList.displayName = 'PostList';

export default PostList;
