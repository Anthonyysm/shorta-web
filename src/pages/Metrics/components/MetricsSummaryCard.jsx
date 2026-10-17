import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { API_URL } from '@/lib/config';
import { BarChart2, Clock, ExternalLink, MousePointerClick } from 'lucide-react';

export function MetricsSummaryCard({ metrics }) {
  const shortUrl = `${API_URL}/${metrics.short_code}`;
  const totalClicks = metrics.clicks?.length ?? metrics.clicks_count ?? 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart2 className="size-5 text-muted-foreground" />
            Métricas do link
          </CardTitle>
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            Criado em {new Date(metrics.created_at).toLocaleDateString('pt-BR')}
          </span>
        </div>
        <CardDescription>
          Acompanhe os acessos do seu link.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2 rounded-lg border bg-background p-4">
          <div>
            <span className="block text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Link encurtado
            </span>
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-mono text-sm font-medium text-foreground transition-colors duration-150 hover:text-primary"
            >
              {shortUrl}
              <ExternalLink className="size-4 text-muted-foreground" />
            </a>
          </div>

          <div>
            <span className="block text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Link original
            </span>
            <p className="break-all font-mono text-sm text-foreground">
              {metrics.original_url}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-lg border bg-background p-4 sm:col-span-1">
            <div className="rounded-lg border bg-muted p-3 text-muted-foreground">
              <MousePointerClick className="size-6" />
            </div>
            <div>
              <span className="block text-sm font-medium text-muted-foreground">
                Total de cliques
              </span>
              <span className="text-3xl font-bold text-foreground">
                {totalClicks}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
