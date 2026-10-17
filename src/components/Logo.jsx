import { cn } from 'cn'

export function Logo({ className, iconClassName }) {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <img
        src="/brand/shorta-logo.png"
        alt=""
        aria-hidden="true"
        className={cn('size-7 object-contain', iconClassName)}
      />
      <span className="font-wordmark text-2xl leading-none font-bold italic tracking-wide">
        SHORTA
      </span>
    </span>
  )
}

export function LogoFull({ className }) {
  return (
    <img
      src="/brand/SHORTA_logo_name.png"
      alt="Shorta"
      className={cn('object-contain', className)}
    />
  )
}
