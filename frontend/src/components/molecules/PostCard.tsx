'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import { Card, Badge } from '@/components/atoms';
import { formatDate } from '@/utils/formatDate';
import { useLang } from '@/contexts/DictionaryContext';

interface PostCardProps {
  post: Post;
  categoryName?: string;
}

export const PostCard = memo<PostCardProps>(({ post, categoryName }) => {
  const lang = useLang();
  const thumbnail = post.image_urls?.[0] || post.image_url;

  return (
    <Link href={`/${lang}/posts/${post.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex gap-4">
          <div className="flex-1 space-y-3">
            {categoryName && (
              <Badge variant="primary">{categoryName}</Badge>
            )}
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 line-clamp-3">{post.content}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>👁 {post.view_count}</span>
                <span>❤️ {post.like_count}</span>
              </div>
              <span>{formatDate(post.created_at, lang)}</span>
            </div>
          </div>
          {thumbnail && (
            <div className="h-24 w-24 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
              <img
                src={thumbnail}
                alt={post.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
});

PostCard.displayName = 'PostCard';

export default PostCard;
