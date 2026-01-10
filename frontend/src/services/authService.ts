import apiClient from './apiClient';
import { RegisterRequest, LoginRequest, AnonymousLoginRequest, UserUpdateRequest, AuthResponse, User } from '@/types';

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async createAnonymousUser(data: AnonymousLoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/anonymous', data);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  async updateProfile(data: UserUpdateRequest): Promise<User> {
    const response = await apiClient.patch<User>('/auth/me', data);
    return response.data;
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('session_token');
    }
  },
};
