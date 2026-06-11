import type { ReactNode } from 'react'
import { ChartNoAxesCombined, Clapperboard, Megaphone, Share2 } from 'lucide-react'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { TiltCard } from './ui/TiltCard'

const services: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <Megaphone className="h-6 w-6" />,
    title: 'Clipper campaigns',
    body: 'We brief, manage and pay a swarm of clippers to flood short-form feeds with your best moments. You set the budget — we handle everything else.',
  },
  {
    icon: <Clapperboard className="h-6 w-6" />,
    title: 'Editing & repurposing',
    body: 'Streams, podcasts and long-form videos chopped into native, platform-perfect clips with hooks, captions and pacing built to hold attention.',
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: 'Distribution at scale',
    body: 'Hundreds of clipper-run pages across TikTok, Instagram Reels and YouTube Shorts pushing your content at the same time, every single day.',
  },
  {
    icon: <ChartNoAxesCombined className="h-6 w-6" />,
    title: 'Tracking & payouts',
    body: 'Every view is tracked and verified through Whop before anyone gets paid. Transparent reporting for you, automated payouts for clippers.',
  },
]

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              One agency, <span className="text-brand-500">every step</span> of viral.
            </>
          }
          sub="From raw footage to millions of verified views — we run the whole pipeline so you can stay focused on what you're building."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="h-full">
              <TiltCard className="group h-full rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-500/10">
                <div
                  style={{ transform: 'translateZ(30px)' }}
                  className="grid h-13 w-13 place-items-center rounded-2xl bg-brand-100 text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white"
                >
                  {s.icon}
                </div>
                <h3
                  style={{ transform: 'translateZ(24px)' }}
                  className="mt-5 font-display text-2xl tracking-wide text-ink"
                >
                  {s.title}
                </h3>
                <p
                  style={{ transform: 'translateZ(16px)' }}
                  className="mt-3 text-[15px] leading-relaxed text-ink-soft"
                >
                  {s.body}
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
