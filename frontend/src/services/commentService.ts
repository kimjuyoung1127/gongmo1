import apiClient from './apiClient';
import { Comment, CommentCreate } from '@/types';

export const commentService = {
  async getComments(postId: number): Promise<Comment[]> {
    const response = await apiClient.get<Comment[]>(`/posts/${postId}/comments`);
    return response.data;
  },

  async createComment(postId: number, data: CommentCreate): Promise<Comment> {
    const response = await apiClient.post<Comment>(`/posts/${postId}/comments`, data);
    return response.data;
  },

  async deleteComment(postId: number, commentId: number): Promise<void> {
    await apiClient.delete(`/posts/${postId}/comments/${commentId}`);
  },
};
