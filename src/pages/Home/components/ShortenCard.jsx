import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link2, Copy, Check, ArrowRight } from 'lucide-react';

export function ShortenCard({
  originalUrl,
  setOriginalUrl,
  onSubmit,
  loading,
  error,
  shortLink,
  copied,
  onCopy,
}) {
  return (
    <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800 text-zinc-100 shadow-2xl">
      <CardHeader className="text-left pb-4">
        <CardTitle className="text-xl font-semibold text-white">Cole a URL longa</CardTitle>
        <CardDescription className="text-zinc-400 text-xs">
          Certifique-se de incluir o protocolo{' '}
          <code className="bg-zinc-950 text-indigo-400 px-1 py-0.5 rounded border border-zinc-800 font-mono">
            https://
          </code>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
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
              onClick={onCopy}
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
  );
}