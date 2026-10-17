import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/services/api';

export function useMetrics() {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await api.get(`/metrics/${shortCode}`);
        setMetrics(response.data);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
          'Algo deu errado carregando as métricas. Tenta de novo?'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [shortCode]);

  return {
    metrics,
    loading,
    error,
    navigate,
  };
}