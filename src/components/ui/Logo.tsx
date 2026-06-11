import { motion, useReducedMotion } from 'motion/react'

/**
 * Vector recreation of the ClipRev clapperboard mark — a red board with
 * a white play button and an (optionally animated) clapper arm.
 */
export function ClapperIcon({
  className = '',
  animated = false,
}: {
  className?: string
  animated?: boolean
}) {
  const reduceMotion = useReducedMotion()
  const animate = animated && !reduceMotion

  return (
    <svg viewBox="0 0 72 72" fill="none" className={className} aria-hidden="true">
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: '8% 90%' }}
        initial={{ rotate: -12 }}
        animate={animate ? { rotate: [-12, -22, -12, -12] } : { rotate: -12 }}
        transition={
          animate
            ? { duration: 3.2, times: [0, 0.12, 0.24, 1], repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }
            : undefined
        }
      >
        <rect x="8" y="16" width="58" height="15" rx="5.5" fill="currentColor" />
        <path d="M21 18.5 h6.5 l-3.6 10 h-6.5 Z" fill="#fff" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M34 18.5 h6.5 l-3.6 10 h-6.5 Z" fill="#fff" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M47 18.5 h6.5 l-3.6 10 h-6.5 Z" fill="#fff" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </motion.g>
      <rect x="8" y="33" width="58" height="32" rx="8" fill="currentColor" />
      <path d="M31.5 42.5 L45.5 49 L31.5 55.5 Z" fill="#fff" stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
    </svg>
  )
}

export function Logo({ className = '', iconClass = 'h-9 w-9' }: { className?: string; iconClass?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <ClapperIcon className={`${iconClass} text-brand-500`} />
      <span className="font-display text-[1.65rem] leading-none text-brand-500 -rotate-2">ClipRev</span>
    </span>
  )
}
