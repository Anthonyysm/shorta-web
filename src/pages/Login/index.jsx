import Navbar from '@/components/Navbar';
import { useLogin } from './useLogin';
import { LoginFormCard } from './components/LoginFormCard';

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  } = useLogin();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <LoginFormCard
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
}