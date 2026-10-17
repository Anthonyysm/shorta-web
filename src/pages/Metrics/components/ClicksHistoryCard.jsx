import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Globe, Monitor } from 'lucide-react';

export function ClicksHistoryCard({ clicks = [] }) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Histórico de Cliques ({clicks.length})
        </CardTitle>
        <CardDescription className="text-zinc-400 text-xs">
          Registros individuais de cada acesso redirecionado pelo sistema
        </CardDescription>
      </CardHeader>

      <CardContent>
        {clicks.length === 0 ? (
          <p className="text-center py-8 text-zinc-500 text-sm font-mono">
            Nenhum clique registrado até o momento.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300 font-mono">
              <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Data / Hora</th>
                  <th className="py-3 px-4">Endereço IP</th>
                  <th className="py-3 px-4">Dispositivo / User Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {clicks.map((click) => (
                  <tr key={click.id} className="hover:bg-zinc-950/50 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap text-zinc-200">
                      {new Date(click.created_at).toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-indigo-400 flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-zinc-500" />
                      {click.ip_address || '127.0.0.1'}
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate text-zinc-400">
                      <span className="flex items-center gap-1.5" title={click.user_agent}>
                        <Monitor className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
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