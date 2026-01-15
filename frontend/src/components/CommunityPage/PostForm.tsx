'use client';

import { memo, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Button, Alert } from '@/components/atoms';
import { Category, PostCreate } from '@/types';
import { postService } from '@/services/postService';
import { useDictionary, useLang } from '@/contexts/DictionaryContext';
import { Image as ImageIcon, X } from 'lucide-react';

interface PostFormProps {
  categories: Category[];
  initialData?: PostCreate;
  postId?: number;
  onSuccess?: () => void;
}

export const PostForm = memo<PostFormProps>( ({
  categories,
  initialData,
  postId,
  onSuccess,
}) => {
  const dict = useDictionary();
  const lang = useLang();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [categoryId, setCategoryId] = useState<number | null>(
    initialData?.category_id || null
  );
  const [isAnonymous, setIsAnonymous] = useState<boolean>(initialData?.is_anonymous ?? false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCategoryName = (category: Category): string => {
    switch (lang) {
      case 'ko': return category.name_ko;
      case 'en': return category.name_en;
      case 'vi': return category.name_vi;
      case 'ne': return category.name_ne;
      case 'km': return category.name_km;
      default: return category.name_en;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    // Revoke URL to prevent memory leak
    URL.revokeObjectURL(previews[index]);
    
    setImages(newImages);
    setPreviews(newPreviews);
  };

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
      category_id: categoryId,
      is_anonymous: isAnonymous,
    };

    try {
      setLoading(true);
      let targetPostId = postId;
      if (postId) {
        await postService.updatePost(postId, postData);
      } else {
        const created = await postService.createPost(postData);
        targetPostId = created.id;
      }

      if (targetPostId && images.length > 0) {
        await postService.uploadPostImages(targetPostId, images);
      }
      
      if (onSuccess) {
        onSuccess();
      } else if (targetPostId) {
        router.push(`/${lang}/posts/${targetPostId}`);
      } else {
        router.push(`/${lang}/community`);
      }
    } catch (err) {
      setError(dict.post.createError);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <Alert variant="error">{error}</Alert>}

      {/* Category Pills */}
      <div>
        <label className="block text-sm font-bold text-black mb-3">
          {dict.post.category}
        </label>
        <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex space-x-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryId(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border whitespace-nowrap cursor-pointer relative z-10 ${
                  categoryId === cat.id
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-white border-gray-300 text-black hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                {getCategoryName(cat)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <label className="flex items-center space-x-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span>{dict.post.anonymous}</span>
      </label>

      <div>
        <label className="block text-sm font-bold text-black mb-2">
          {dict.post.title}
        </label>
        <Input
          value={title}
          onChange={setTitle}
          placeholder={dict.post.title}
          disabled={loading}
          className="bg-white border-gray-300 text-black focus:border-blue-500 placeholder:text-gray-500"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-black mb-2">
          {dict.post.content}
        </label>
        <Textarea
          value={content}
          onChange={setContent}
          placeholder={dict.post.content}
          rows={10}
          disabled={loading}
          className="bg-white border-gray-300 text-black focus:border-blue-500 placeholder:text-gray-500"
        />
      </div>

      {/* Image Upload Section */}
      <div>
        <label className="block text-sm font-bold text-black mb-3">
          Images ({images.length}/5)
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {previews.map((preview, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
              <img src={preview} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {images.length < 5 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-gray-400 flex flex-col items-center justify-center text-gray-600 hover:border-gray-600 hover:text-black transition-all bg-white"
            >
              <ImageIcon size={24} />
              <span className="text-[10px] mt-1 font-medium">Add Photo</span>
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div className="flex space-x-4 pt-4">
        <Button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold">
          {loading ? dict.common.loading : dict.post.submit}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={loading}
          className="px-6 bg-white border-gray-300 text-black hover:bg-gray-100 rounded-xl"
        >
          {dict.post.cancel}
        </Button>
      </div>
    </form>
  );
});

PostForm.displayName = 'PostForm';

export default PostForm;
