import { ArrowUpRight, Scissors, Upload, Wallet } from 'lucide-react'
import { SiDiscord } from 'react-icons/si'
import { site } from '../config'
import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'
import { ClapperIcon } from './ui/Logo'

const steps = [
  { icon: <Scissors className="h-5 w-5" />, text: 'Pick a campaign & clip the best moments' },
  { icon: <Upload className="h-5 w-5" />, text: 'Post natively on TikTok, Reels or Shorts' },
  { icon: <Wallet className="h-5 w-5" />, text: 'Get paid for every 1,000 views you generate' },
]

export function Clippers() {
  return (
    <section id="clippers" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 px-6 py-16 shadow-2xl shadow-brand-900/30 sm:px-14 sm:py-20">
            <div className="bg-dots-light pointer-events-none absolute inset-0" />
            <ClapperIcon className="pointer-events-none absolute -top-10 -right-10 h-56 w-56 rotate-12 text-white/10 sm:h-72 sm:w-72" />
            <ClapperIcon className="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 -rotate-12 text-white/10" />

            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-extrabold tracking-[0.14em] text-white uppercase ring-1 ring-white/25 backdrop-blur-sm">
                For clippers
              </span>
              <h2 className="mt-5 font-display text-4xl leading-[1.08] tracking-wide text-white sm:text-5xl">
                Get paid to clip.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
                No experience needed — just a phone and good taste in moments. Join the community,
                pick a campaign and earn for every 1,000 views your clips pull in.
              </p>

              <ul className="mt-8 space-y-3.5">
                {steps.map((s) => (
                  <li key={s.text} className="flex items-center gap-3.5 text-white">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
                      {s.icon}
                    </span>
                    <span className="text-[15.5px] font-semibold">{s.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  href={site.discord}
                  target="_blank"
                  rel="noreferrer"
                  variant="white"
                  className="!px-7 !py-4 !text-base"
                >
                  <SiDiscord className="h-5 w-5" />
                  Join the Discord
                </Button>
                <Button
                  href={site.whop}
                  target="_blank"
                  rel="noreferrer"
                  variant="ghostLight"
                  className="!px-7 !py-4 !text-base"
                >
                  Browse campaigns on Whop
                  <ArrowUpRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
