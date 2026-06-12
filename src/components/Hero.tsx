import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import { lazy, Suspense, useEffect, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { BadgeDollarSign, Flame } from 'lucide-react'
import { SiInstagram, SiTiktok, SiYoutube } from 'react-icons/si'
import { heroStats, site } from '../config'
import { Button } from './ui/Button'
import { ClapperIcon } from './ui/Logo'
import { CountUp } from './ui/CountUp'

/** Three.js background lives in its own chunk so the page paints before it loads. */
const HeroScene = lazy(() => import('./HeroScene'))

const rotatingWords = [
  'the feed',
  'the timeline',
  'the algorithm',
  'attention',
  'the conversation',
  'the internet',
] as const

const WORD_INTERVAL_MS = 5000

/** The brand-red headline word, swapped out every few seconds with its underline redrawn. */
function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % rotatingWords.length),
      WORD_INTERVAL_MS,
    )
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-block text-brand-500 whitespace-nowrap">
      {/* clip-path (not overflow) keeps the inline baseline intact while words slide */}
      <span className="relative inline-block [clip-path:inset(-0.18em_-0.1em)]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={rotatingWords[index]}
            className="inline-block"
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-105%', opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {rotatingWords[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <svg
        viewBox="0 0 240 20"
        fill="none"
        className="absolute -bottom-2.5 left-0 w-full sm:-bottom-3.5"
        aria-hidden="true"
      >
        <motion.path
          key={index}
          d="M5 13 C 50 5, 95 18, 138 10 S 215 7, 235 11"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
        />
      </svg>
    </span>
  )
}

/** Entry animation + endless gentle float, on separate wrappers so they don't fight. */
function Floaty({
  children,
  className = '',
  z = 0,
  enterDelay = 0,
  floatDelay = 0,
  duration = 5.5,
}: {
  children: ReactNode
  className?: string
  z?: number
  enterDelay?: number
  floatDelay?: number
  duration?: number
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ z, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, scale: 0.7, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: enterDelay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -11, 0] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

function ClipCard({
  icon,
  handle,
  views,
  caption,
  progress,
}: {
  icon: ReactNode
  handle: string
  views: string
  caption: string
  progress: string
}) {
  return (
    <div className="w-40 rounded-2xl bg-white p-3.5 shadow-xl shadow-ink/10 ring-1 ring-ink/5 sm:w-44">
      <div className="flex items-center gap-2">
        {icon}
        <span className="truncate text-[11px] font-bold text-ink-soft">{handle}</span>
      </div>
      <div className="mt-2 font-display text-3xl leading-none text-ink">{views}</div>
      <div className="mt-1 text-[11px] font-semibold text-ink-soft">{caption}</div>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-brand-100">
        <div className={`h-full rounded-full bg-brand-500 ${progress}`} />
      </div>
    </div>
  )
}

function Pill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white py-2 pr-4 pl-2 shadow-xl shadow-ink/10 ring-1 ring-ink/5">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-100 text-brand-600">
        {icon}
      </span>
      <span className="text-[13px] font-extrabold whitespace-nowrap text-ink">{label}</span>
    </div>
  )
}

export function Hero() {
  const reduceMotion = useReducedMotion()
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 16 })
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 16 })
  const rotateY = useTransform(mx, [-0.5, 0.5], [-9, 9])
  const rotateX = useTransform(my, [-0.5, 0.5], [7, -7])

  function onMouseMove(e: MouseEvent<HTMLElement>) {
    if (reduceMotion) return
    const { innerWidth, innerHeight } = window
    mx.set(e.clientX / innerWidth - 0.5)
    my.set(e.clientY / innerHeight - 0.5)
  }

  return (
    <section
      id="top"
      onMouseMove={onMouseMove}
      className="bg-dots relative overflow-hidden pt-36 pb-16 sm:pb-24"
    >
      {/* soft brand glows */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[34rem] w-[34rem] rounded-full bg-brand-200/50 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-48 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-100/60 blur-[100px]" />

      {/* three.js dot-wave ocean + wind, behind everything */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-ink shadow-sm ring-1 ring-ink/10"
          >
            <ClapperIcon className="h-4.5 w-4.5 text-brand-500" />
            The clipping agency from the team behind BloxClips
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-6 font-display text-[2.9rem] leading-[1.04] tracking-wide text-ink sm:text-6xl lg:text-[4.2rem]"
          >
            Clips that take over <RotatingWord />.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            {site.name} is a performance-based clipping agency. Our network of clippers turns
            your streams, podcasts and launches into short-form clips across TikTok, Reels and
            Shorts — and you only pay for the views they actually get.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="#contact" className="!px-8 !py-4 !text-base">
              Work with us
              <span aria-hidden>→</span>
            </Button>
            <Button href="#clippers" variant="light" className="!px-8 !py-4 !text-base">
              I'm a clipper
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-12 grid max-w-xl grid-cols-3 gap-4"
          >
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl text-brand-600 sm:text-4xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </dd>
                <dd className="mt-1 text-[13px] leading-snug font-semibold text-ink-soft">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* 3D stage */}
        <div className="relative mx-auto w-full max-w-md [perspective:1300px] lg:max-w-none">
          <motion.div
            style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative h-[420px] sm:h-[500px]"
          >
            <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/15 blur-2xl" />

            <Floaty
              className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              z={30}
              enterDelay={0.15}
              duration={7}
            >
              <ClapperIcon
                animated
                className="h-56 w-56 text-brand-500 drop-shadow-[0_24px_36px_rgba(229,71,47,0.35)] sm:h-72 sm:w-72"
              />
            </Floaty>

            <Floaty className="top-2 left-0 sm:top-6" z={70} enterDelay={0.4} floatDelay={0.6}>
              <ClipCard
                icon={<SiTiktok className="h-4 w-4 text-ink" />}
                handle="@cliprev.daily"
                views="2.4M"
                caption="views · this week"
                progress="w-4/5"
              />
            </Floaty>

            <Floaty className="top-10 right-0 sm:top-16" z={50} enterDelay={0.55} floatDelay={1.4} duration={6}>
              <ClipCard
                icon={<SiInstagram className="h-4 w-4 text-[#E1306C]" />}
                handle="@cliprev.reels"
                views="860K"
                caption="views · 3 days"
                progress="w-3/5"
              />
            </Floaty>

            <Floaty className="-right-2 bottom-20 sm:right-2 sm:bottom-24" z={90} enterDelay={0.7} floatDelay={2.1} duration={6.5}>
              <ClipCard
                icon={<SiYoutube className="h-4 w-4 text-[#FF0000]" />}
                handle="cliprev shorts"
                views="1.1M"
                caption="views · this week"
                progress="w-3/4"
              />
            </Floaty>

            <Floaty className="bottom-6 left-2 sm:bottom-10 sm:left-6" z={110} enterDelay={0.85} floatDelay={0.3} duration={5}>
              <Pill icon={<BadgeDollarSign className="h-4 w-4" />} label="$12,400 paid to clippers" />
            </Floaty>

            <Floaty className="top-40 -left-3 sm:top-48 sm:left-0" z={60} enterDelay={1} floatDelay={1.8} duration={6}>
              <Pill icon={<Flame className="h-4 w-4" />} label="38 clips posted today" />
            </Floaty>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
