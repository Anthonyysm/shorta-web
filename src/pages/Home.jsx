import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link2, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [copied, setCopied] = useState(false);

  // Simulação local do encurtamento (conectaremos ao backend na próxima etapa)
  const handleShorten = (e) => {
    e.preventDefault();
    if (!originalUrl) return;

    // Gera um código fictício apenas para testar a interface
    const mockCode = Math.random().toString(36).substring(2, 8);
    setShortLink(`http://127.0.0.1:8000/${mockCode}`);
  };

  const handleCopy = () => {
    if (!shortLink) return;
    navigator.clipboard.writeText(shortLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4">
      {/* Badge de Destaque */}
      <div className="inline-flex items-center gap-2 bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 px-3 py-1 rounded-full text-xs font-medium mb-6">
        <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
        Encurtador de Links Rápido e Seguro
      </div>

      {/* Título Principal */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-center mb-3">
        Encurte suas URLs em <span className="text-indigo-500">segundos</span>
      </h1>

      <p className="text-zinc-400 text-center max-w-lg mb-8 text-sm sm:text-base">
        Cole seu link longo abaixo para gerar um endereço curto, elegante e fácil de compartilhar.
      </p>

      {/* Card do Encurtador (shadcn/ui) */}
      <Card className="w-full max-w-xl bg-zinc-900 border-zinc-800 text-zinc-100 shadow-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-white">Cole a URL longa</CardTitle>
          <CardDescription className="text-zinc-400 text-xs">
            Certifique-se de incluir o protocolo <code className="bg-zinc-950 text-indigo-400 px-1 py-0.5 rounded border border-zinc-800 font-mono">https://</code>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleShorten} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Link2 className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                type="url"
                placeholder="https://exemplo.com/pagina-muito-longa"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="pl-9 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 focus-visible:ring-1"
                required
              />
            </div>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium gap-2">
              Encurtar
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Área do Resultado (aparece após clicar em encurtar) */}
          {shortLink && (
            <div className="mt-4 p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between gap-3">
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block">
                  Seu link encurtado:
                </span>
                <span className="font-mono text-sm text-zinc-200 font-medium truncate block">
                  {shortLink}
                </span>
              </div>
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
                className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 gap-2 shrink-0"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}