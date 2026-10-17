import { createContext, useState, useEffect, useContext } from 'react';
import api from '@/services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ao carregar a aplicação, verifica se existe um token salvo e valida com a API
  useEffect(() => {
    async function loadStorageData() {
      const storedToken = localStorage.getItem('shorta_token');

      if (storedToken) {
        try {
          const response = await api.get('/users/me');
          setUser(response.data);
        } catch (error) {
          // Se o token estiver expirado ou for inválido, limpa o storage
          localStorage.removeItem('shorta_token');
          setUser(null);
        }
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  // Função de Login (se comunica com o endpoint OAuth2 do FastAPI)
  const login = async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { access_token } = response.data;
    localStorage.setItem('shorta_token', access_token);

    // Busca os dados do perfil do usuário autenticado
    const userResponse = await api.get('/users/me');
    setUser(userResponse.data);
  };

  // Função de Logout
  const logout = () => {
    localStorage.removeItem('shorta_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}