'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store';
import { apiClient } from '@/lib/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, setUser, setToken } = useAuthStore();

  useEffect(() => {
    // Initialize auth on mount
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');

    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(user);
        apiClient.setAuthHeader(storedToken);

        // Verify token is still valid
        apiClient.getProfile().catch(() => {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          setToken(null);
          setUser(null);
        });
      } catch (error) {
        console.error('Failed to restore auth:', error);
      }
    }
  }, [setUser, setToken]);

  return <>{children}</>;
}
