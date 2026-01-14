import apiClient from './apiClient';
import { Category } from '@/types';

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get<Category[]>('/categories');
    return response.data;
  },
};
