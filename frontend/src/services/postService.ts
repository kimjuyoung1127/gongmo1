import apiClient from './apiClient';
import { Post, PostCreate, PostUpdate, PostListResponse, PaginationParams } from '@/types';

export const postService = {
  async getPosts(params: PaginationParams): Promise<PostListResponse> {
    const response = await apiClient.get<PostListResponse>('/posts', { params });
    return response.data;
  },

  async getPostById(id: number): Promise<Post> {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  },

  async createPost(data: PostCreate): Promise<Post> {
    const response = await apiClient.post<Post>('/posts', data);
    return response.data;
  },

  async updatePost(id: number, data: PostUpdate): Promise<Post> {
    const response = await apiClient.put<Post>(`/posts/${id}`, data);
    return response.data;
  },

  async deletePost(id: number): Promise<void> {
    await apiClient.delete(`/posts/${id}`);
  },

  async likePost(id: number): Promise<{ like_count: number }> {
    const response = await apiClient.post<{ like_count: number }>(`/posts/${id}/like`);
    return response.data;
  },
};
