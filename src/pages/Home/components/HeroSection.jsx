import { Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="flex flex-col items-center">
      <div className="inline-flex items-center gap-2 bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 px-3 py-1 rounded-full text-xs font-medium mb-6">
        <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
        Encurtador de Links Rápido e Gratuito
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
        Encurte suas URLs em <span className="text-indigo-500">segundos</span>
      </h1>

      <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mb-8">
        Cole seus links extensos abaixo para transformá-los em endereços curtos, elegantes e fáceis de compartilhar.
      </p>
    </div>
  );
}