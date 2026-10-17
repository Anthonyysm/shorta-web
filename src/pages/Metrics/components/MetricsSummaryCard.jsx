import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart2, ExternalLink, Clock, MousePointerClick } from 'lucide-react';

export function MetricsSummaryCard({ metrics }) {
  const shortUrl = `http://127.0.0.1:8000/${metrics.short_code}`;
  const totalClicks = metrics.clicks?.length ?? metrics.clicks_count ?? 0;

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart2 className="h-6 w-6 text-indigo-400" />
            Métricas do Link
          </CardTitle>
          <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            Criado em: {new Date(metrics.created_at).toLocaleDateString('pt-BR')}
          </span>
        </div>
        <CardDescription className="text-zinc-400 text-xs">
          Acompanhe os acessos e informações em tempo real
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg space-y-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block">
              Link Encurtado:
            </span>
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-base font-bold text-white hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
            >
              {shortUrl}
              <ExternalLink className="h-4 w-4 text-zinc-500" />
            </a>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
              URL Original:
            </span>
            <p className="text-sm text-zinc-300 break-all font-mono">
              {metrics.original_url}
            </p>
          </div>
        </div>

        {/* Card com Total de Cliques */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg flex items-center gap-4">
            <div className="p-3 bg-indigo-950/60 border border-indigo-800/50 rounded-lg text-indigo-400">
              <MousePointerClick className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-zinc-400 block font-medium">Total de Cliques</span>
              <span className="text-2xl font-extrabold text-white">
                {totalClicks}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}