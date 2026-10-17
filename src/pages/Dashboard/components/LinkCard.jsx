import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  BarChart2,
  Check,
  Copy,
  ExternalLink,
  MousePointerClick,
  Trash2,
} from 'lucide-react';

export function LinkCard({ link, isCopied, onCopy, onDelete }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const shortUrl = `http://127.0.0.1:8000/${link.short_code}`;
  const totalClicks = link.clicks_count ?? link.clicks?.length ?? link.click_count ?? 0;

  return (
    <Card className="transition-colors duration-150 hover:border-muted-foreground/30">
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1.5">
          <div className="flex items-center gap-2">
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-w-0 items-center gap-1.5 font-mono text-sm font-medium text-foreground transition-colors duration-150 hover:text-primary"
            >
              <span className="truncate">{shortUrl}</span>
              <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
            </a>

            <Badge variant="secondary" className="shrink-0 gap-1 font-mono">
              <MousePointerClick className="size-3" />
              {totalClicks} cliques
            </Badge>
          </div>

          <Tooltip>
            <TooltipTrigger
              render={
                <span className="block max-w-xl truncate text-xs text-muted-foreground" />
              }
            >
              {link.original_url}
            </TooltipTrigger>
            <TooltipContent>{link.original_url}</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex shrink-0 items-center gap-1 self-end sm:self-center">
          <Link to={`/metrics/${link.short_code}`}>
            <Button variant="outline" size="sm" className="gap-1.5">
              <BarChart2 className="size-3.5" />
              Métricas
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onCopy(link.id, link.short_code)}
            aria-label={isCopied ? 'Link copiado' : 'Copiar link'}
            className="text-muted-foreground"
          >
            {isCopied ? (
              <Check className="text-foreground" />
            ) : (
              <Copy />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setConfirmOpen(true)}
            aria-label="Excluir link"
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 />
          </Button>

          <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir este link?</AlertDialogTitle>
                <AlertDialogDescription>
                  O link deixa de funcionar e não dá pra desfazer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => onDelete(link.id)}
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
