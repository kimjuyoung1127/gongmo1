export interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
}

export interface CommentCreate {
  content: string;
  is_anonymous?: boolean;
}
