'use client';

import { memo } from 'react';
import { Comment } from '@/types';
import { Button } from '@/components/atoms';
import { formatDate } from '@/utils/formatDate';
import { useLang, useDictionary } from '@/contexts/DictionaryContext';

interface CommentItemProps {
  comment: Comment;
  currentUserId?: number;
  onDelete: (commentId: number) => void;
}

export const CommentItem = memo<CommentItemProps>(({
  comment,
  currentUserId,
  onDelete,
}) => {
  const lang = useLang();
  const dict = useDictionary();
  const isOwner = currentUserId === comment.user_id;

  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
          <span className="text-sm text-gray-500 mt-2 inline-block">
            {formatDate(comment.created_at, lang)}
          </span>
        </div>
        {isOwner && (
          <Button
            variant="danger"
            size="small"
            onClick={() => onDelete(comment.id)}
          >
            {dict.comment.delete}
          </Button>
        )}
      </div>
    </div>
  );
});

CommentItem.displayName = 'CommentItem';

export default CommentItem;
