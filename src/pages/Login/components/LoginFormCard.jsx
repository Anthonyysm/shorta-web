import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Logo } from '@/components/Logo';
import { Loader2, Lock, Mail } from 'lucide-react';

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
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center text-center">
        <Logo className="mb-2" iconClassName="size-8" />
        <CardTitle className="text-xl">Entrar na sua conta</CardTitle>
        <CardDescription>
          Digite seu e-mail e senha pra acessar seu painel.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="login-email">E-mail</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="login-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="login-password">Senha</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-center text-sm font-medium text-destructive">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full gap-2"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            {loading ? 'Entrando…' : 'Entrar'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Ainda não tem uma conta?{' '}
          <Link
            to="/register"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
