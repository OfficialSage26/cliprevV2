import type { ComponentProps } from 'react'

const styles = {
  primary:
    'bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-600/30',
  dark: 'bg-ink text-white shadow-lg shadow-ink/20 hover:bg-black',
  light: 'bg-white text-ink shadow-sm ring-1 ring-ink/10 hover:ring-ink/25',
  ghostLight: 'bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-sm hover:bg-white/25',
  white: 'bg-white text-brand-600 shadow-lg shadow-brand-900/20 hover:bg-brand-50',
} as const

type Props = ComponentProps<'a'> & { variant?: keyof typeof styles }

export function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  return (
    <a
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  )
}
