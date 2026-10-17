import { useState, useEffect } from 'react';
import api from '@/services/api';

export function useDashboard() {
  const [links, setLinks] = useState([]);
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Busca os links da API
  const fetchLinks = async () => {
    try {
      const response = await api.get('/links');
      setLinks(response.data);
    } catch (err) {
      setError('Erro ao carregar seus links.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Encurta novo link
  const handleCreateLink = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;

    setCreating(true);
    setError('');

    try {
      await api.post('/links/shorten', { original_url: originalUrl });
      setOriginalUrl('');
      await fetchLinks();
    } catch (err) {
      setError(err.response?.data?.detail || 'Erro ao encurtar URL.');
    } finally {
      setCreating(false);
    }
  };

  // Exclui link
  const handleDeleteLink = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este link?')) return;

    try {
      await api.delete(`/links/${id}`);
      setLinks((prev) => prev.filter((link) => link.id !== id));
    } catch (err) {
      alert('Erro ao excluir o link.');
    }
  };

  // Copia o link encurtado
  const handleCopy = (id, shortCode) => {
    const fullUrl = `http://127.0.0.1:8000/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return {
    links,
    originalUrl,
    setOriginalUrl,
    loading,
    creating,
    error,
    copiedId,
    handleCreateLink,
    handleDeleteLink,
    handleCopy,
  };
}