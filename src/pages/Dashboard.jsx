import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Link2, 
  Copy, 
  Check, 
  Trash2, 
  ExternalLink, 
  BarChart2, 
  Plus, 
  MousePointerClick 
} from 'lucide-react';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Carrega os links do usuário logado
  const fetchLinks = async () => {
    try {
      const response = await api.get('/links');
      setLinks(response.data);
    } catch (erro) {
      setError('Erro ao carregar seus links.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Encurta um novo link
  const handleCreateLink = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;

    setCreating(true);
    setError('');

    try {
      await api.post('/links/shorten', { original_url: originalUrl });
      setOriginalUrl('');
      await fetchLinks(); // Recarrega a lista atualizada
    } catch (erro) {
      setError(err.response?.data?.detail || 'Erro ao encurtar URL.');
    } finally {
      setCreating(false);
    }
  };

  // Exclui um link
  const handleDeleteLink = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este link?')) return;

    try {
      await api.delete(`/links/${id}`);
      setLinks((prev) => prev.filter((link) => link.id !== id));
    } catch (erro) {
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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-8">
        {/* Formulário para Criar Novo Link */}
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
              <Plus className="h-5 w-5 text-indigo-400" />
              Novo Link Encurtado
            </CardTitle>
            <CardDescription className="text-zinc-400 text-xs">
              Cole a URL e crie um link encurtado salvo na sua conta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleCreateLink} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Link2 className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                <Input
                  type="url"
                  placeholder="https://exemplo.com/meu-link-longo"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  className="pl-9 h-11 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={creating}
                className="h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 shrink-0"
              >
                {creating ? 'Criando...' : 'Encurtar Link'}
              </Button>
            </form>

            {error && (
              <p className="mt-3 text-red-400 text-sm font-medium">{error}</p>
            )}
          </CardContent>
        </Card>

        {/* Listagem de Links */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-indigo-400" />
              Meus Links ({links.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12 text-zinc-500 font-mono">
              Carregando seus links...
            </div>
          ) : links.length === 0 ? (
            <Card className="bg-zinc-900/50 border-zinc-800 text-center py-12">
              <CardContent className="space-y-3">
                <Link2 className="h-10 w-10 text-zinc-600 mx-auto" />
                <p className="text-zinc-400 font-medium">Você ainda não possui nenhum link encurtado.</p>
                <p className="text-zinc-600 text-xs">Cole uma URL no campo acima para gerar seu primeiro link.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {links.map((link) => {
                const shortUrl = `http://127.0.0.1:8000/${link.short_code}`;

                return (
                  <Card
                    key={link.id}
                    className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors shadow-lg"
                  >
                    <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1 overflow-hidden">
                        <div className="flex items-center gap-3">
                          <a
                            href={shortUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-indigo-400 hover:text-indigo-300 font-bold text-base truncate flex items-center gap-1.5"
                          >
                            {shortUrl}
                            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                          </a>

                          <span className="inline-flex items-center gap-1 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded text-xs text-zinc-400 font-mono shrink-0">
                            <MousePointerClick className="h-3 w-3 text-indigo-400" />
                            {link.clicks_count ?? link.clicks?.length ?? 0} cliques
                          </span>
                        </div>

                        <p className="text-zinc-500 text-xs truncate max-w-xl">
                          {link.original_url}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(link.id, link.short_code)}
                          className="border-zinc-800 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 gap-1.5"
                        >
                          {copiedId === link.id ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copiar</span>
                            </>
                          )}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteLink(link.id)}
                          className="text-zinc-500 hover:text-red-400 hover:bg-red-950/30 h-9 w-9 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}