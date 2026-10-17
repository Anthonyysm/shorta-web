import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useMetrics } from './useMetrics';
import { MetricsSummaryCard } from './components/MetricsSummaryCard';
import { ClicksHistoryCard } from './components/ClicksHistoryCard';

export default function Metrics() {
  const { metrics, loading, error, navigate } = useMetrics();

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center font-mono text-zinc-500">
          Carregando métricas...
        </div>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col items-center justify-center text-center space-y-4">
          <p className="text-red-400 font-medium">{error || 'Link não encontrado.'}</p>
          <Button onClick={() => navigate('/dashboard')} variant="outline" className="border-zinc-800 text-zinc-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Voltar ao Dashboard */}
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-900 gap-2 mb-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Painel
          </Button>
        </Link>

        {/* Resumo do Link */}
        <MetricsSummaryCard metrics={metrics} />

        {/* Histórico de Cliques */}
        <ClicksHistoryCard clicks={metrics.clicks} />
      </main>
    </div>
  );
}