'use client';

import { useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import { User, AnonymousLoginRequest } from '@/types';
import { setSessionToken, getSessionToken, removeSessionToken } from '@/utils/storage';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getSessionToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        removeSessionToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (data: AnonymousLoginRequest): Promise<boolean> => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.createAnonymousUser(data);
      setSessionToken(response.session_token);
      setUser(response);
      return true;
    } catch (err) {
      setError('Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    removeSessionToken();
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
