import axios from 'axios';
import { getSessionToken } from '@/utils/storage';
import { emitAuthChange } from '@/utils/authEvents';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add session token
apiClient.interceptors.request.use(
  (config) => {
    const token = getSessionToken();
    if (token) {
      config.headers['X-Session-Token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid session token
      if (typeof window !== 'undefined') {
        localStorage.removeItem('session_token');
      }
      emitAuthChange();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
