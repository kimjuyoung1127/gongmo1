import apiClient from './apiClient';
import { AnonymousLoginRequest, AnonymousLoginResponse, User } from '@/types';

export const authService = {
  async createAnonymousUser(data: AnonymousLoginRequest): Promise<AnonymousLoginResponse> {
    const response = await apiClient.post<AnonymousLoginResponse>('/auth/anonymous', data);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('session_token');
    }
  },
};
