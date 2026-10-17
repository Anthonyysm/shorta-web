import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { useMetrics } from './useMetrics';
import { MetricsSummaryCard } from './components/MetricsSummaryCard';
import { ClicksHistoryCard } from './components/ClicksHistoryCard';

export default function Metrics() {
  const { metrics, loading, error, navigate } = useMetrics();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 space-y-6 p-4 sm:p-6">
          <Skeleton className="h-9 w-40 rounded-lg" />
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </main>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center space-y-4 p-6 text-center">
          <p className="font-medium text-destructive">
            {error || 'Esse link se escondeu. Não achamos nada por aqui.'}
          </p>
          <Button onClick={() => navigate('/dashboard')} variant="outline" className="gap-2">
            <ArrowLeft className="size-4" />
            Voltar ao painel
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-6 p-4 sm:p-6">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <ArrowLeft className="size-4" />
            Voltar ao painel
          </Button>
        </Link>

        <MetricsSummaryCard metrics={metrics} />

        <ClicksHistoryCard clicks={metrics.clicks} />
      </main>
    </div>
  );
}
