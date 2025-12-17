'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { safeGet } from '../../lib/api';

export default function useAdminFetch<T = any>(path: string) {
  const { user } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    (async () => {
      try {
        const res = await safeGet<T>(path);
        if (!mounted) return;
        setData(res as any);
      } catch (err: any) {
        if (!mounted) return;
        setError(err.message || 'Fetch error');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [path, user]);

  return { data, loading, error };
}
