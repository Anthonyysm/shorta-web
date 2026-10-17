import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Check, Copy, Link2, Loader2 } from 'lucide-react';

export function ShortenCard({
  originalUrl,
  setOriginalUrl,
  onSubmit,
  loading,
  error,
  shortLink,
  copied,
  onCopy,
  onReset,
}) {
  return (
    <div className="w-full max-w-2xl text-left">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Label htmlFor="original-url" className="sr-only">
            Link original
          </Label>
          <Link2 className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="original-url"
            type="url"
            placeholder="https://seu-link-muito-longo.com/..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="h-12 pl-10"
            required
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="h-12 shrink-0 gap-2 rounded-xl px-6"
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}
          {loading ? 'Encurtando…' : 'Encurtar'}
        </Button>
      </form>

      {error && (
        <p className="mt-3 text-left text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      {shortLink && (
        <Card className="animate-fade-in mt-6">
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={shortLink}
              target="_blank"
              rel="noreferrer"
              className="block min-w-0 flex-1"
            >
              <span className="mb-0.5 block text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Seu link encurtado
              </span>
              <span className="block truncate font-mono text-sm font-medium text-foreground transition-colors duration-150 hover:text-primary">
                {shortLink}
              </span>
            </a>
            <div className="flex shrink-0 gap-2">
              <Button variant="secondary" onClick={onCopy} className="gap-2">
                {copied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
                {copied ? 'Copiado!' : 'Copiar'}
              </Button>
              <Button
                variant="ghost"
                onClick={onReset}
                className="text-muted-foreground"
              >
                Encurtar outro
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
