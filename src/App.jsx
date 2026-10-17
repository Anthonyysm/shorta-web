import { AuthProvider } from '@/contexts/AuthContext';
import AppRoutes from '@/routes/AppRoutes';
import { Toaster } from 'sonner';
import { getCurrentTheme } from '@/lib/theme';

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster theme={getCurrentTheme()} position="bottom-center" closeButton />
    </AuthProvider>
  );
}
