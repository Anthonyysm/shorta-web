import Navbar from '@/components/Navbar';
import { useHome } from './useHome';
import { HeroSection } from './components/HeroSection';
import { ShortenCard } from './components/ShortenCard';

export default function Home() {
  const {
    originalUrl,
    setOriginalUrl,
    shortLink,
    loading,
    error,
    copied,
    handleShorten,
    handleCopy,
    reset,
  } = useHome();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-6">
        <HeroSection />
        <ShortenCard
          originalUrl={originalUrl}
          setOriginalUrl={setOriginalUrl}
          onSubmit={handleShorten}
          loading={loading}
          error={error}
          shortLink={shortLink}
          copied={copied}
          onCopy={handleCopy}
          onReset={reset}
        />
      </main>
    </div>
  );
}
