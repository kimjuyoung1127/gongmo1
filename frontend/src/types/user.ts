export interface User {
  id: number;
  nickname: string;
  session_token: string | null;
  preferred_language: string;
  created_at: string;
  updated_at: string;
  avatarUrl?: string;
}

export interface RegisterRequest {
  nickname: string;
  password: string;
}

export interface LoginRequest {
  nickname: string;
  password: string;
}

export interface AnonymousLoginRequest {
  nickname: string;
}

export interface UserUpdateRequest {
  nickname?: string;
  preferred_language?: 'ko' | 'en' | 'vi' | 'ne' | 'km';
}

export interface AuthResponse {
  id: number;
  nickname: string;
  session_token: string | null;
  preferred_language: string;
  created_at: string;
  updated_at: string;
}
