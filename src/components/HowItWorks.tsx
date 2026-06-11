import { CalendarCheck, Eye, Rocket, Wallet } from 'lucide-react'
import type { ReactNode } from 'react'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'

const steps: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <CalendarCheck className="h-6 w-6" />,
    title: 'Tell us about your brand',
    body: 'Send us a message or hop on a quick call. We figure out your goals, your audience and the budget that fits.',
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: 'We launch your campaign',
    body: 'Your brief and bounty go live to our clipper network on Whop. Campaigns are typically live within days, not weeks.',
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: 'Clippers flood the feed',
    body: 'Hundreds of clips, posted natively across TikTok, Reels and Shorts — each one a fresh shot at going viral.',
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: 'You pay per 1,000 views',
    body: 'No retainers, no promises — just verified views, tracked in real time. If it doesn’t get watched, you don’t pay.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From brief to <span className="text-brand-500">millions of views</span>.
            </>
          }
          sub="A simple, performance-based pipeline. You always know what you're paying for, because you only pay for results."
        />

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <li className="relative h-full">
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute top-7 left-16 hidden h-0.5 w-[calc(100%-3rem)] border-t-2 border-dashed border-brand-200 lg:block"
                  />
                )}
                <div className="relative inline-flex">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                    {step.icon}
                  </span>
                  <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-ink font-display text-sm text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[1.4rem] tracking-wide text-ink">{step.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14 text-center" delay={0.2}>
          <Button href="#contact" className="!px-8 !py-4 !text-base">
            Start a campaign
            <span aria-hidden>→</span>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
