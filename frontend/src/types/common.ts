export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginationParams {
  page: number;
  page_size: number;
  category_id?: number;
}

export type Locale = 'ko' | 'en' | 'vi' | 'ne' | 'km';
