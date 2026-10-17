import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogIn, Mail, Lock } from 'lucide-react';

export function LoginFormCard({
  email,
  setEmail,
  password,
  setPassword,
  error,
  loading,
  onSubmit,
}) {
  return (
    <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-zinc-100 shadow-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-white flex items-center justify-center gap-2">
          <LogIn className="h-6 w-6 text-indigo-500" />
          Entrar na sua conta
        </CardTitle>
        <CardDescription className="text-center text-zinc-400 text-sm">
          Digite seu e-mail e senha para acessar seu painel
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center font-medium bg-red-950/40 border border-red-800/50 p-2 rounded">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium h-10"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-400">
          Ainda não tem uma conta?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Cadastre-se
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}