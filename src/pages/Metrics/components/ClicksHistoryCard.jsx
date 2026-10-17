import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Globe, Monitor } from 'lucide-react';

export function ClicksHistoryCard({ clicks = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de cliques ({clicks.length})</CardTitle>
        <CardDescription>
          Cada acesso ao seu link encurtado.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {clicks.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nenhum clique registrado até agora.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-xs tracking-wider text-muted-foreground uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Data / hora</th>
                  <th className="px-4 py-3 font-medium">Endereço IP</th>
                  <th className="px-4 py-3 font-medium">Dispositivo</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {clicks.map((click) => (
                  <tr
                    key={click.id}
                    className="transition-colors duration-150 hover:bg-muted/40"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-foreground">
                      {new Date(click.created_at).toLocaleString('pt-BR')}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="flex items-center gap-1.5 font-mono text-foreground">
                        <Globe className="size-3.5 text-muted-foreground" />
                        {click.ip_address || '127.0.0.1'}
                      </span>
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                      <span
                        className="flex items-center gap-1.5"
                        title={click.user_agent}
                      >
                        <Monitor className="size-3.5 shrink-0 text-muted-foreground" />
                        {click.user_agent || 'Navegador desconhecido'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
