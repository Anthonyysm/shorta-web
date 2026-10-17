import { useState } from 'react';
import api from '@/services/api';

export function useHome() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;

    setLoading(true);
    setError('');
    setShortLink('');
    setCopied(false);

    try {
      const response = await api.post('/links/shorten', {
        original_url: originalUrl,
      });

      const fullShortUrl = `http://127.0.0.1:8000/${response.data.short_code}`;
      setShortLink(fullShortUrl);
      setOriginalUrl('');
    } catch (err) {
      setError(
        err.response?.data?.detail?.[0]?.msg || 
        'Erro ao encurtar URL. Verifique se o backend FastAPI está rodando.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shortLink) return;
    navigator.clipboard.writeText(shortLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return {
    originalUrl,
    setOriginalUrl,
    shortLink,
    loading,
    error,
    copied,
    handleShorten,
    handleCopy,
  };
}