'use client';

import { useState, useEffect } from 'react';
import { postService } from '@/services/postService';
import { PostListResponse, PaginationParams } from '@/types';

export function usePosts(initialParams: PaginationParams) {
  const [data, setData] = useState<PostListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<PaginationParams>(initialParams);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await postService.getPosts(params);
        setData(response);
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [params]);

  const refetch = () => {
    setParams({ ...params });
  };

  const setPage = (page: number) => {
    setParams({ ...params, page });
  };

  const setCategoryId = (category_id?: number) => {
    setParams({ ...params, category_id, page: 1 });
  };

  return {
    data,
    loading,
    error,
    refetch,
    setPage,
    setCategoryId,
  };
}
