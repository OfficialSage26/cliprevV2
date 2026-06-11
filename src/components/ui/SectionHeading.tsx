import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function SectionHeading({
  eyebrow,
  title,
  sub,
  dark = false,
  align = 'center',
}: {
  eyebrow: string
  title: ReactNode
  sub?: ReactNode
  dark?: boolean
  align?: 'center' | 'left'
}) {
  const centered = align === 'center'
  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <span
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-extrabold tracking-[0.14em] uppercase ${
          dark
            ? 'bg-white/10 text-brand-300 ring-1 ring-white/15'
            : 'bg-brand-100 text-brand-700 ring-1 ring-brand-200'
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-5 font-display text-4xl leading-[1.08] tracking-wide sm:text-5xl ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-ink-soft'}`}>
          {sub}
        </p>
      )}
    </Reveal>
  )
}
