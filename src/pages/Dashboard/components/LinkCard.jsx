import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Copy,
  Check,
  Trash2,
  ExternalLink,
  BarChart2,
  MousePointerClick,
} from 'lucide-react';

export function LinkCard({ link, isCopied, onCopy, onDelete }) {
  const shortUrl = `http://127.0.0.1:8000/${link.short_code}`;
  const totalClicks = link.clicks_count ?? link.clicks?.length ?? link.click_count ?? 0;

  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors shadow-lg">
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
              {totalClicks} cliques
            </span>
          </div>

          <p className="text-zinc-500 text-xs truncate max-w-xl">
            {link.original_url}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <Link to={`/metrics/${link.short_code}`}>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-800 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 gap-1.5"
            >
              <BarChart2 className="h-3.5 w-3.5 text-indigo-400" />
              <span>Métricas</span>
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onCopy(link.id, link.short_code)}
            className="border-zinc-800 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 gap-1.5"
          >
            {isCopied ? (
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
            onClick={() => onDelete(link.id)}
            className="text-zinc-500 hover:text-red-400 hover:bg-red-950/30 h-9 w-9 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}