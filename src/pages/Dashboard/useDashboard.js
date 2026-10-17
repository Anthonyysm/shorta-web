import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { API_URL } from '@/lib/config';
import api from '@/services/api';

const getClicks = (link) =>
  link.clicks_count ?? link.clicks?.length ?? link.click_count ?? 0;

export function useDashboard() {
  const [links, setLinks] = useState([]);
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('recentes');

  // Busca os links da API
  const fetchLinks = () =>
    api
      .get('/links')
      .then((response) => setLinks(response.data))
      .catch(() => setError('Não conseguimos carregar seus links. Tenta de novo?'))
      .finally(() => setLoading(false));

  useEffect(() => {
    fetchLinks();
  }, []);

  const filteredLinks = useMemo(() => {
    const query = search.trim().toLowerCase();
    const list = query
      ? links.filter(
          (link) =>
            link.short_code?.toLowerCase().includes(query) ||
            link.original_url?.toLowerCase().includes(query)
        )
      : links;

    const sorted = [...list];
    switch (sortBy) {
      case 'antigos':
        sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'cliques':
        sorted.sort((a, b) => getClicks(b) - getClicks(a));
        break;
      case 'poucos':
        sorted.sort((a, b) => getClicks(a) - getClicks(b));
        break;
      default:
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    return sorted;
  }, [links, search, sortBy]);

  const totalClicks = useMemo(
    () => links.reduce((sum, link) => sum + getClicks(link), 0),
    [links]
  );

  const topLink = useMemo(() => {
    const best = links.reduce(
      (acc, link) => (acc == null || getClicks(link) > getClicks(acc) ? link : acc),
      null
    );
    return best && getClicks(best) > 0 ? best : null;
  }, [links]);

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
      setError(err.response?.data?.detail || 'Algo deu errado. Tenta de novo?');
    } finally {
      setCreating(false);
    }
  };

  // Exclui link
  const handleDeleteLink = async (id) => {
    try {
      await api.delete(`/links/${id}`);
      setLinks((prev) => prev.filter((link) => link.id !== id));
      toast.success('Link excluído.');
    } catch {
      toast.error('Não conseguimos excluir o link. Tenta de novo?');
    }
  };

  // Copia o link encurtado
  const handleCopy = (id, shortCode) => {
    const fullUrl = `${API_URL}/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    toast.success('Link copiado!', { duration: 2000 });
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
    search,
    setSearch,
    sortBy,
    setSortBy,
    filteredLinks,
    totalClicks,
    topLink,
    handleCreateLink,
    handleDeleteLink,
    handleCopy,
  };
}
