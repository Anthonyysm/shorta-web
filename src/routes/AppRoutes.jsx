import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

// Componente Wrapper para proteger páginas que exigem Login
function PrivateRoute({ children }) {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center font-mono">
        Carregando...
      </div>
    );
  }

  return signed ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rota do Dashboard será criada na próxima etapa */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <div className="min-h-screen bg-zinc-950 text-white p-8">
              <h1 className="text-2xl font-bold">Painel do Usuário (Em breve)</h1>
            </div>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}