import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link2, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { signed, user, logout } = useAuth();

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <Link2 className="h-6 w-6 text-indigo-500" />
          <span className="bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">
            Shorta
          </span>
        </Link>

        <nav className="flex items-center gap-3">
          {signed ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" className="gap-2 text-zinc-300 hover:text-white hover:bg-zinc-800">
                  <LayoutDashboard className="h-4 w-4" />
                  Meu Painel
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout} 
                className="gap-2 border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Sair ({user?.email?.split('@')[0]})
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-zinc-800">
                  Entrar
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium">
                  Criar Conta
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}