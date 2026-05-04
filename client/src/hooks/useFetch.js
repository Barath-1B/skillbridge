import { useState, useEffect } from 'react';
import api from '../api/axios';

export function useFetch(url, method = 'GET', dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = async () => {
    try {
      setLoading(true);
      const response = await api[method.toLowerCase()](url);
      setData(response.data?.data || response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, dependencies);

  return { data, loading, error, refetch };
}
