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
  } = useHome();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full text-center">
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
        />
      </main>
    </div>
  );
}