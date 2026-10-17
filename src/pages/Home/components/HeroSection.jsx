import { LogoFull } from '@/components/Logo';

export function HeroSection() {
  return (
    <div className="flex flex-col items-center">
      <LogoFull className="mb-8 h-40 w-auto sm:h-48" />

      <h1 className="font-wordmark mb-3 text-4xl font-bold tracking-tight text-foreground italic sm:text-5xl">
        Links curtos, sem complicação.
      </h1>

      <p className="mb-8 max-w-md text-base text-muted-foreground">
        Cole o link, a gente encurta.
      </p>
    </div>
  );
}
