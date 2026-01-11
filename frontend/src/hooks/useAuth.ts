'use client';

import { useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import { User, RegisterRequest, LoginRequest, AnonymousLoginRequest, UserUpdateRequest } from '@/types';
import { setSessionToken, getSessionToken, removeSessionToken } from '@/utils/storage';
import { emitAuthChange, onAuthChange } from '@/utils/authEvents';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const token = getSessionToken();
      if (!token) {
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        if (isMounted) {
          setLoading(true);
        }
        const currentUser = await authService.getCurrentUser();
        if (isMounted) {
          setUser(currentUser);
        }
      } catch (err) {
        removeSessionToken();
        if (isMounted) {
          setUser(null);
        }
        emitAuthChange();
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const unsubscribe = onAuthChange(checkAuth);
    checkAuth();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const register = async (data: RegisterRequest): Promise<{ success: boolean; error?: string }> => {
    try {
      setError(null);
      setLoading(true);
      await authService.register(data);
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginRequest): Promise<{ success: boolean; error?: string; user?: User }> => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.login(data);
      if (response.session_token) {
        setSessionToken(response.session_token);
        setUser(response);
        emitAuthChange();
        return { success: true, user: response };
      }
      return { success: false, error: 'No session token received' };
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const loginAnonymous = async (data: AnonymousLoginRequest): Promise<{ success: boolean; error?: string }> => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.createAnonymousUser(data);
      if (response.session_token) {
        setSessionToken(response.session_token);
        setUser(response);
        emitAuthChange();
        return { success: true };
      }
      return { success: false, error: 'No session token received' };
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Anonymous login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    removeSessionToken();
    setUser(null);
    emitAuthChange();
  };

  const updateProfile = async (data: UserUpdateRequest): Promise<{ success: boolean; error?: string }> => {
    try {
      setError(null);
      const updatedUser = await authService.updateProfile(data);
      setUser(updatedUser);
      emitAuthChange();
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Profile update failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return {
    user,
    loading,
    error,
    register,
    login,
    loginAnonymous,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };
}
