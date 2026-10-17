import { useState } from 'react';
import Navbar from '@/components/Navbar';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link2, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
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
      // Chamada para a API FastAPI no endpoint de encurtamento
      const response = await api.post('/links/shorten', {
        original_url: originalUrl,
      });

      // Monta o link curto com a URL do backend
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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 px-3 py-1 rounded-full text-xs font-medium mb-6">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          Encurtador de Links Rápido e Gratuito
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
          Encurte suas URLs em <span className="text-indigo-500">segundos</span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mb-8">
          Cole seus links extensos abaixo para transformá-los em endereços curtos, elegantes e fáceis de compartilhar.
        </p>

        <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800 text-zinc-100 shadow-2xl">
          <CardHeader className="text-left pb-4">
            <CardTitle className="text-xl font-semibold text-white">Cole a URL longa</CardTitle>
            <CardDescription className="text-zinc-400 text-xs">
              Certifique-se de incluir o protocolo <code className="bg-zinc-950 text-indigo-400 px-1 py-0.5 rounded border border-zinc-800 font-mono">https://</code>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleShorten} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Link2 className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                <Input
                  type="url"
                  placeholder="https://exemplo.com/pagina-muito-longa"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  className="pl-9 h-11 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 focus-visible:ring-1"
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading} 
                className="h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 gap-2 shrink-0"
              >
                {loading ? 'Encurtando...' : 'Encurtar'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            {error && (
              <p className="text-red-400 text-sm text-left font-medium">{error}</p>
            )}

            {shortLink && (
              <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div className="overflow-hidden w-full">
                  <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block mb-0.5">
                    Seu link encurtado:
                  </span>
                  <a
                    href={shortLink}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm text-zinc-200 font-bold hover:text-indigo-400 truncate block transition-colors"
                  >
                    {shortLink}
                  </a>
                </div>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="w-full sm:w-auto border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 gap-2 shrink-0"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}