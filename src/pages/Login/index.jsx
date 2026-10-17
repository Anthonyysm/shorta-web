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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex flex-1 items-center justify-center p-4">
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
