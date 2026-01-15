export interface Post {
  id: number;
  user_id: number;
  category_id: number | null;
  title: string;
  content: string;
  image_url: string | null;
  image_urls: string[];
  is_anonymous: boolean;
  view_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
}

export interface PostImage {
  id: number;
  post_id: number;
  url: string;
  sort_order: number;
  created_at: string;
}

export interface PostImageListResponse {
  images: PostImage[];
}

export interface PostCreate {
  category_id?: number | null;
  title: string;
  content: string;
  image_url?: string | null;
  image_urls?: string[];
  is_anonymous?: boolean;
}

export interface PostUpdate {
  category_id?: number | null;
  title?: string;
  content?: string;
  image_url?: string | null;
  image_urls?: string[];
  is_anonymous?: boolean;
}

export interface PostListResponse {
  posts: Post[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
