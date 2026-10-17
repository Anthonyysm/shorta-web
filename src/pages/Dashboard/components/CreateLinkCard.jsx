import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link2, Loader2, Plus } from 'lucide-react';

export function CreateLinkCard({
  originalUrl,
  setOriginalUrl,
  onSubmit,
  creating,
  error,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="size-4 text-muted-foreground" />
          Novo link
        </CardTitle>
        <CardDescription>
          Cole o link longo e a gente encurta pra você.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Label htmlFor="dashboard-original-url" className="sr-only">
              Link original
            </Label>
            <Link2 className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="dashboard-original-url"
              type="url"
              placeholder="https://seu-link-muito-longo.com/..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          <Button type="submit" disabled={creating} className="shrink-0 gap-2">
            {creating && <Loader2 className="size-4 animate-spin" />}
            {creating ? 'Encurtando…' : 'Encurtar'}
          </Button>
        </form>

        {error && (
          <p className="mt-3 text-sm font-medium text-destructive">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}
