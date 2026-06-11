import type { ReactNode } from 'react'
import {
  SiFacebook,
  SiInstagram,
  SiKick,
  SiTiktok,
  SiTwitch,
  SiX,
  SiYoutube,
} from 'react-icons/si'
import { ClapperIcon } from './ui/Logo'

const items: { name: string; icon: ReactNode }[] = [
  { name: 'TikTok', icon: <SiTiktok /> },
  { name: 'Instagram Reels', icon: <SiInstagram /> },
  { name: 'YouTube Shorts', icon: <SiYoutube /> },
  { name: 'X / Twitter', icon: <SiX /> },
  { name: 'Twitch', icon: <SiTwitch /> },
  { name: 'Kick', icon: <SiKick /> },
  { name: 'Facebook', icon: <SiFacebook /> },
]

export function Marquee() {
  return (
    <section
      aria-label="Platforms we post on"
      className="relative border-y border-ink/[0.06] bg-white/60 py-6"
    >
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-12 pr-12">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex items-center gap-12">
              {items.map((item) => (
                <span key={item.name} className="flex items-center gap-12">
                  <span className="flex items-center gap-3 text-ink/65">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-display text-2xl tracking-wide whitespace-nowrap">
                      {item.name}
                    </span>
                  </span>
                  <ClapperIcon className="h-4 w-4 text-brand-300" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
