'use client';

import { memo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Select, Button, Alert } from '@/components/atoms';
import { Category, PostCreate } from '@/types';
import { postService } from '@/services/postService';
import { useDictionary, useLang } from '@/contexts/DictionaryContext';

interface PostFormProps {
  categories: Category[];
  initialData?: PostCreate;
  postId?: number;
  onSuccess?: () => void;
}

export const PostForm = memo<PostFormProps>(({
  categories,
  initialData,
  postId,
  onSuccess,
}) => {
  const dict = useDictionary();
  const lang = useLang();
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [categoryId, setCategoryId] = useState<string>(
    initialData?.category_id?.toString() || ''
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCategoryName = (category: Category): string => {
    switch (lang) {
      case 'ko': return category.name_ko;
      case 'en': return category.name_en;
      case 'vi': return category.name_vi;
      case 'ne': return category.name_ne;
      default: return category.name_en;
    }
  };

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: getCategoryName(cat),
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError(dict.post.noTitle);
      return;
    }

    if (!content.trim()) {
      setError(dict.post.noContent);
      return;
    }

    const postData: PostCreate = {
      title: title.trim(),
      content: content.trim(),
      category_id: categoryId ? parseInt(categoryId) : null,
    };

    try {
      setLoading(true);
      if (postId) {
        await postService.updatePost(postId, postData);
      } else {
        await postService.createPost(postData);
      }
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/${lang}`);
      }
    } catch (err) {
      setError(dict.post.createError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <Alert variant="error">{error}</Alert>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {dict.post.category}
        </label>
        <Select
          value={categoryId}
          onChange={setCategoryId}
          options={categoryOptions}
          placeholder={dict.post.selectCategory}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {dict.post.title}
        </label>
        <Input
          value={title}
          onChange={setTitle}
          placeholder={dict.post.title}
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {dict.post.content}
        </label>
        <Textarea
          value={content}
          onChange={setContent}
          placeholder={dict.post.content}
          rows={8}
          disabled={loading}
        />
      </div>

      <div className="flex space-x-4">
        <Button type="submit" disabled={loading}>
          {loading ? dict.common.loading : dict.post.submit}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={loading}
        >
          {dict.post.cancel}
        </Button>
      </div>
    </form>
  );
});

PostForm.displayName = 'PostForm';

export default PostForm;
