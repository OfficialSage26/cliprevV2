import { ArrowUpRight } from 'lucide-react'
import { SiDiscord } from 'react-icons/si'
import { site } from '../config'
import { Logo } from './ui/Logo'

function WhopBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`grid h-5 w-5 place-items-center rounded-md bg-current text-[10px] leading-none ${className}`}
      aria-hidden="true"
    >
      <span className="font-display text-paper">W</span>
    </span>
  )
}

const columns = [
  {
    title: 'Agency',
    links: [
      { label: 'What we do', href: '#services' },
      { label: 'How it works', href: '#how' },
      { label: 'Why ClipRev', href: '#why' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Work with us', href: '#contact' },
    ],
  },
  {
    title: 'For clippers',
    links: [
      { label: 'Join the Discord', href: site.discord, external: true },
      { label: 'Campaigns on Whop', href: site.whop, external: true },
      { label: 'How payouts work', href: '#faq' },
    ],
  },
  {
    title: 'BloxClips — our gaming arm',
    links: [
      { label: 'bloxclips.com', href: site.bloxclips.site, external: true },
      { label: 'BloxClips Discord', href: site.bloxclips.discord, external: true },
      { label: 'BloxClips on Whop', href: site.bloxclips.whop, external: true },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm leading-relaxed text-white/60">
              The performance-based clipping agency. Your best moments, clipped and posted
              everywhere — you only pay for the views.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.discord}
                target="_blank"
                rel="noreferrer"
                aria-label="ClipRev Discord"
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/8 ring-1 ring-white/15 transition-colors hover:bg-brand-500 hover:ring-brand-500"
              >
                <SiDiscord className="h-5 w-5" />
              </a>
              <a
                href={site.whop}
                target="_blank"
                rel="noreferrer"
                aria-label="ClipRev on Whop"
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/8 ring-1 ring-white/15 transition-colors hover:bg-brand-500 hover:ring-brand-500"
              >
                <WhopBadge />
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-extrabold tracking-[0.14em] text-white/50 uppercase">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...('external' in link && link.external
                          ? { target: '_blank', rel: 'noreferrer' }
                          : {})}
                        className="inline-flex items-center gap-1 text-[15px] font-medium text-white/75 transition-colors hover:text-brand-300"
                      >
                        {link.label}
                        {'external' in link && link.external && (
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/45">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-sm text-white/45">
            A sister brand of{' '}
            <a
              href={site.bloxclips.site}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white/70 transition-colors hover:text-brand-300"
            >
              BloxClips
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
