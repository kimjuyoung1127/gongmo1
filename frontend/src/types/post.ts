export interface Post {
  id: number;
  user_id: number;
  category_id: number | null;
  title: string;
  content: string;
  image_url: string | null;
  view_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
}

export interface PostCreate {
  category_id?: number | null;
  title: string;
  content: string;
  image_url?: string | null;
}

export interface PostUpdate {
  category_id?: number | null;
  title?: string;
  content?: string;
  image_url?: string | null;
}

export interface PostListResponse {
  posts: Post[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
