import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { BarChart2, Search } from 'lucide-react';
import { useDashboard } from './useDashboard';
import { CreateLinkCard } from './components/CreateLinkCard';
import { LinkCard } from './components/LinkCard';

const SORT_OPTIONS = [
  { key: 'recentes', label: 'Mais recentes' },
  { key: 'antigos', label: 'Mais antigos' },
  { key: 'cliques', label: 'Mais clicados' },
  { key: 'poucos', label: 'Menos clicados' },
];

export default function Dashboard() {
  const {
    links,
    originalUrl,
    setOriginalUrl,
    loading,
    creating,
    error,
    copiedId,
    search,
    setSearch,
    sortBy,
    setSortBy,
    filteredLinks,
    totalClicks,
    topLink,
    handleCreateLink,
    handleDeleteLink,
    handleCopy,
  } = useDashboard();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-8 p-4 sm:p-6">
        {!loading && links.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <span className="block text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Total de links
                </span>
                <span className="text-2xl font-bold text-foreground">
                  {links.length}
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <span className="block text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Total de cliques
                </span>
                <span className="text-2xl font-bold text-foreground">
                  {totalClicks}
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <span className="block text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Link mais clicado
                </span>
                {topLink ? (
                  <span className="block truncate font-mono text-sm font-medium text-foreground">
                    {topLink.short_code}
                  </span>
                ) : (
                  <span className="text-2xl font-bold text-muted-foreground">
                    —
                  </span>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <CreateLinkCard
          originalUrl={originalUrl}
          setOriginalUrl={setOriginalUrl}
          onSubmit={handleCreateLink}
          creating={creating}
          error={error}
        />

        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <BarChart2 className="size-5 text-muted-foreground" />
              Meus Links ({search.trim() ? `${filteredLinks.length} de ${links.length}` : links.length})
            </h2>

            {!loading && links.length > 0 && (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative sm:w-64">
                  <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por link…"
                    aria-label="Buscar link"
                    className="h-9 rounded-lg pl-9 text-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {SORT_OPTIONS.map((option) => (
                    <Button
                      key={option.key}
                      variant={sortBy === option.key ? 'secondary' : 'ghost'}
                      size="xs"
                      onClick={() => setSortBy(option.key)}
                      className={
                        sortBy === option.key
                          ? ''
                          : 'text-muted-foreground'
                      }
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))}
            </div>
          ) : links.length === 0 ? (
            <Card className="py-12">
              <CardContent className="flex flex-col items-center gap-3 text-center">
                <img
                  src="/brand/serpente.ico"
                  alt=""
                  aria-hidden="true"
                  className="h-16 w-16 object-contain opacity-60"
                />
                <p className="font-medium text-foreground">
                  Nenhum link por aqui ainda. Que tal encurtar o primeiro?
                </p>
              </CardContent>
            </Card>
          ) : filteredLinks.length === 0 ? (
            <Card className="py-10">
              <CardContent className="text-center text-sm text-muted-foreground">
                Nenhum link encontrado pra “{search.trim()}”.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredLinks.map((link) => (
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
