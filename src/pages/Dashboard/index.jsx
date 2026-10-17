import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Link2, BarChart2 } from 'lucide-react';
import { useDashboard } from './useDashboard';
import { CreateLinkCard } from './components/CreateLinkCard';
import { LinkCard } from './components/LinkCard';

export default function Dashboard() {
  const {
    links,
    originalUrl,
    setOriginalUrl,
    loading,
    creating,
    error,
    copiedId,
    handleCreateLink,
    handleDeleteLink,
    handleCopy,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-8">
        {/* Formulário de Criação */}
        <CreateLinkCard
          originalUrl={originalUrl}
          setOriginalUrl={setOriginalUrl}
          onSubmit={handleCreateLink}
          creating={creating}
          error={error}
        />

        {/* Lista de Links */}
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
              {links.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  isCopied={copiedId === link.id}
                  onCopy={handleCopy}
                  onDelete={handleDeleteLink}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}