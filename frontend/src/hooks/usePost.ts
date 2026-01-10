'use client';

import { useState, useEffect } from 'react';
import { postService } from '@/services/postService';
import { Post } from '@/types';

export function usePost(postId: number) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await postService.getPostById(postId);
        setPost(data);
      } catch (err) {
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const refetch = async () => {
    try {
      setLoading(true);
      const data = await postService.getPostById(postId);
      setPost(data);
    } catch (err) {
      setError('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const likePost = async () => {
    if (!post) return;
    try {
      const result = await postService.likePost(postId);
      setPost({ ...post, like_count: result.like_count });
    } catch (err) {
      console.error('Failed to like post', err);
    }
  };

  return {
    post,
    loading,
    error,
    refetch,
    likePost,
  };
}
