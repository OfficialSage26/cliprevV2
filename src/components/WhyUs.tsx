import type { ReactNode } from 'react'
import {
  ArrowUpRight,
  BadgeCheck,
  Gamepad2,
  HandCoins,
  ShieldCheck,
  Timer,
  Users,
} from 'lucide-react'
import { site } from '../config'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

const reasons: { icon: ReactNode; title: string; body: ReactNode }[] = [
  {
    icon: <HandCoins className="h-5 w-5" />,
    title: '100% performance-based',
    body: 'No fat retainers or vague deliverables. You pay per 1,000 verified views — nothing else.',
  },
  {
    icon: <BadgeCheck className="h-5 w-5" />,
    title: 'Verified views only',
    body: 'Submissions are tracked through Whop and reviewed before payout, so botted or recycled clips never reach your bill.',
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'A real clipper army',
    body: 'Thousands of clippers competing to make your moments hit — not one overworked editor posting twice a day.',
  },
  {
    icon: <Timer className="h-5 w-5" />,
    title: 'Live in days',
    body: 'Brief us today and watch clips start rolling out this week. Virality doesn’t wait for onboarding decks.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Hands-off for you',
    body: 'We handle briefs, clipper management, moderation and payouts. You just watch the view counter climb.',
  },
  {
    icon: <Gamepad2 className="h-5 w-5" />,
    title: 'A proven playbook',
    body: (
      <>
        We also run{' '}
        <a
          href={site.bloxclips.site}
          target="_blank"
          rel="noreferrer"
          className="font-bold text-brand-300 underline decoration-brand-300/40 underline-offset-4 transition-colors hover:text-brand-200"
        >
          BloxClips
          <ArrowUpRight className="inline h-3.5 w-3.5 align-text-top" />
        </a>{' '}
        — our gaming clipping agency for Roblox, Minecraft and Fortnite. ClipRev brings that same
        engine to every niche.
      </>
    ),
  },
]

export function WhyUs() {
  return (
    <section id="why" className="scroll-mt-24 bg-night py-24 sm:py-32">
      <div className="bg-dots-light relative">
        <div className="pointer-events-none absolute top-0 left-1/2 h-80 w-[42rem] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand-600/25 blur-[110px]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            dark
            eyebrow="Why ClipRev"
            title={
              <>
                Why brands pick <span className="text-brand-400">ClipRev</span>.
              </>
            }
            sub="Most marketing makes you pay for effort. Clipping makes you pay for outcomes — and we've been running that model at scale."
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.07} className="h-full">
                <div className="group h-full rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.07] hover:ring-brand-500/40">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/15 text-brand-400 ring-1 ring-brand-500/20 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                      {r.icon}
                    </span>
                    <h3 className="font-display text-xl tracking-wide text-white">{r.title}</h3>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/65">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
