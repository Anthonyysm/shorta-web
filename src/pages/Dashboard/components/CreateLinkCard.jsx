import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link2, Plus } from 'lucide-react';

export function CreateLinkCard({
  originalUrl,
  setOriginalUrl,
  onSubmit,
  creating,
  error,
}) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
          <Plus className="h-5 w-5 text-indigo-400" />
          Novo Link Encurtado
        </CardTitle>
        <CardDescription className="text-zinc-400 text-xs">
          Cole a URL e crie um link encurtado salvo na sua conta
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Link2 className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
            <Input
              type="url"
              placeholder="https://exemplo.com/meu-link-longo"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="pl-9 h-11 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={creating}
            className="h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 shrink-0"
          >
            {creating ? 'Criando...' : 'Encurtar Link'}
          </Button>
        </form>

        {error && <p className="mt-3 text-red-400 text-sm font-medium">{error}</p>}
      </CardContent>
    </Card>
  );
}