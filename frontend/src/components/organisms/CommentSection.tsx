'use client';

import { memo, useState } from 'react';
import { CommentItem } from '@/components/molecules';
import { Textarea, Button, LoadingSpinner, Alert } from '@/components/atoms';
import { useComments } from '@/hooks/useComments';
import { useDictionary } from '@/contexts/DictionaryContext';

interface CommentSectionProps {
  postId: number;
  currentUserId?: number;
  isAuthenticated: boolean;
}

export const CommentSection = memo<CommentSectionProps>(({
  postId,
  currentUserId,
  isAuthenticated,
}) => {
  const dict = useDictionary();
  const { comments, loading, error, addComment, deleteComment } = useComments(postId);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    const success = await addComment(newComment.trim());
    if (success) {
      setNewComment('');
    }
    setSubmitting(false);
  };

  const handleDelete = async (commentId: number) => {
    if (confirm(dict.common.confirm)) {
      await deleteComment(commentId);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">
        {dict.comment.addComment} ({comments.length})
      </h3>

      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={newComment}
            onChange={setNewComment}
            placeholder={dict.comment.writeComment}
            rows={3}
            disabled={submitting}
          />
          <Button type="submit" disabled={submitting || !newComment.trim()}>
            {submitting ? dict.common.loading : dict.comment.submit}
          </Button>
        </form>
      )}

      {error && <Alert variant="error">{error}</Alert>}

      {comments.length === 0 ? (
        <Alert variant="info">{dict.comment.noComments}</Alert>
      ) : (
        <div className="space-y-2">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
});

CommentSection.displayName = 'CommentSection';

export default CommentSection;
