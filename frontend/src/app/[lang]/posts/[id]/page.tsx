'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, Button, LoadingSpinner, Alert, Badge } from '@/components/atoms';
import { CommentSection } from '@/components/organisms';
import { usePost } from '@/hooks/usePost';
import { useAuth } from '@/hooks/useAuth';
import { postService } from '@/services/postService';
import { formatDateTime } from '@/utils/formatDate';
import { useDictionary, useLang } from '@/contexts/DictionaryContext';
import { useEffect, useState } from 'react';
import { categoryService } from '@/services/categoryService';
import { Category } from '@/types';

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dict = useDictionary();
  const lang = useLang();
  const postId = parseInt(params.id as string);
  const { post, loading, error, likePost } = usePost(postId);
  const { user, isAuthenticated } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);

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

  const getCategoryName = (): string | undefined => {
    if (!post?.category_id) return undefined;
    const category = categories.find((cat) => cat.id === post.category_id);
    if (!category) return undefined;

    switch (lang) {
      case 'ko': return category.name_ko;
      case 'en': return category.name_en;
      case 'vi': return category.name_vi;
      case 'ne': return category.name_ne;
      case 'km': return category.name_km;
      default: return category.name_en;
    }
  };

  const handleDelete = async () => {
    if (!confirm(dict.common.confirm)) return;

    try {
      await postService.deletePost(postId);
      router.push(`/${lang}`);
    } catch (err) {
      alert(dict.post.deleteError);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !post) {
    return <Alert variant="error">{error || 'Post not found'}</Alert>;
  }

  const isOwner = user?.id === post.user_id;
  const categoryName = getCategoryName();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <div className="space-y-4">
          {categoryName && <Badge variant="primary">{categoryName}</Badge>}
          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>👁 {post.view_count}</span>
              <span>❤️ {post.like_count}</span>
            </div>
            <span>{formatDateTime(post.created_at, lang)}</span>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
          </div>
          <div className="flex space-x-2 pt-4 border-t border-gray-200">
            <Button variant="primary" size="small" onClick={likePost}>
              {dict.post.like}
            </Button>
            {isOwner && (
              <>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => router.push(`/${lang}/posts/${postId}/edit`)}
                >
                  {dict.post.edit}
                </Button>
                <Button variant="danger" size="small" onClick={handleDelete}>
                  {dict.post.delete}
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <CommentSection
          postId={postId}
          currentUserId={user?.id}
          isAuthenticated={isAuthenticated}
        />
      </Card>
    </div>
  );
}
