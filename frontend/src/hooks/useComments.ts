'use client';

import { useState, useEffect } from 'react';
import { commentService } from '@/services/commentService';
import { Comment } from '@/types';

export function useComments(postId: number) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await commentService.getComments(postId);
        setComments(data);
      } catch (err) {
        setError('Failed to fetch comments');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const refetch = async () => {
    try {
      setLoading(true);
      const data = await commentService.getComments(postId);
      setComments(data);
    } catch (err) {
      setError('Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string, isAnonymous: boolean): Promise<boolean> => {
    try {
      await commentService.createComment(postId, { content, is_anonymous: isAnonymous });
      await refetch();
      return true;
    } catch (err) {
      setError('Failed to add comment');
      return false;
    }
  };

  const deleteComment = async (commentId: number): Promise<boolean> => {
    try {
      await commentService.deleteComment(postId, commentId);
      await refetch();
      return true;
    } catch (err) {
      setError('Failed to delete comment');
      return false;
    }
  };

  return {
    comments,
    loading,
    error,
    refetch,
    addComment,
    deleteComment,
  };
}
