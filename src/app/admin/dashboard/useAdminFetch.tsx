'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { safeGet } from '../../lib/api';

/**
 * Admin data fetch hook.
 * path → /admin/... (without /api prefix)
 * safeGet returns T | null — null means the request failed.
 */
export default function useAdminFetch<T = any>(path: string) {
  const { user } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let mounted = true;

    (async () => {
      setLoading(true);
      setError(null);

      // safeGet returns T | null (never throws)
      // null মানে request fail হয়েছে
      const res = await safeGet<T>(path);

      if (!mounted) return;

      if (res !== null) {
        setData(res);
      } else {
        setError(`Failed to load data from ${path}`);
      }

      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [path, user]);

  return { data, loading, error };
}