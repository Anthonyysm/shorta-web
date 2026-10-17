import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

export function useRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não combinam. Confere pra gente?');
      return;
    }

    setLoading(true);

    try {
      // 1. Cria a conta no FastAPI
      await api.post('/auth/register', {
        email,
        password,
      });

      // 2. Faz o login automático em seguida
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Algo deu errado criando a conta. Tenta de novo?'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleSubmit,
  };
}
