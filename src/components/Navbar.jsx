import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { signed, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="text-foreground transition-opacity duration-150 hover:opacity-80"
        >
          <Logo />
        </Link>

        <nav className="flex items-center gap-2">
          {signed ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" className="gap-2 text-muted-foreground">
                  <LayoutDashboard className="size-4" />
                  Meu Painel
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-2"
              >
                <LogOut className="size-3.5" />
                Sair ({user?.email?.split('@')[0]})
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button>Criar Conta</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
