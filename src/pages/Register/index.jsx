import Navbar from '@/components/Navbar';
import { useRegister } from './useRegister';
import { RegisterFormCard } from './components/RegisterFormCard';

export default function Register() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleSubmit,
  } = useRegister();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex flex-1 items-center justify-center p-4">
        <RegisterFormCard
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          error={error}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
}
