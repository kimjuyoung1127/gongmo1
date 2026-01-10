export interface User {
  id: number;
  nickname: string;
  session_token: string;
  created_at: string;
  updated_at: string;
}

export interface AnonymousLoginRequest {
  nickname: string;
}

export interface AnonymousLoginResponse {
  id: number;
  nickname: string;
  session_token: string;
  created_at: string;
  updated_at: string;
}
