import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

export function CountUp({
  to,
  suffix = '',
  className = '',
}: {
  to: number
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setDisplay(to.toLocaleString('en-US'))
      return
    }
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString('en-US')),
    })
    return () => controls.stop()
  }, [inView, to, reduceMotion])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
