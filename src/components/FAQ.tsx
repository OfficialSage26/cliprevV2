import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

const faqs = [
  {
    q: 'What exactly is "clipping"?',
    a: 'Clipping is turning long-form content — streams, podcasts, interviews, launches — into short, punchy clips and posting them across TikTok, Instagram Reels and YouTube Shorts. Instead of one account posting once a day, hundreds of clippers post your best moments simultaneously, multiplying your shots at going viral.',
  },
  {
    q: 'How does pricing work?',
    a: "It's performance-based (CPM). You set a budget, we set a rate per 1,000 verified views, and clippers earn from that pool as their clips rack up views. When the budget runs out, the campaign ends — you never pay for views you didn't get. Budgets are flexible, from creator-sized tests to full brand takeovers.",
  },
  {
    q: 'How do you prevent fake or botted views?',
    a: 'Every submission runs through our tracking on Whop and is reviewed before it counts toward payouts. Recycled content, view-botting and spam accounts get filtered out and banned from the network, so the views you pay for are real ones.',
  },
  {
    q: 'Which platforms do you cover?',
    a: 'TikTok, Instagram Reels and YouTube Shorts are the core. We also distribute on X (Twitter) and Facebook, and clip directly from Twitch and Kick streams. If short-form lives there, we can flood it.',
  },
  {
    q: 'Who is clipping a good fit for?',
    a: 'Streamers, podcasters, musicians, apps, games and consumer brands — anyone with footage worth watching or a product worth talking about. If you also operate in gaming, our sister agency BloxClips specializes in Roblox, Minecraft and Fortnite content.',
  },
  {
    q: 'How fast can my campaign go live?',
    a: "Usually within days. Once we've agreed on the brief and budget, the campaign is published to our clipper network and the first clips typically start going up within 48 hours.",
  },
  {
    q: 'How do I get paid as a clipper?',
    a: 'Join our Discord, claim a campaign on Whop, post your clips and submit the links. Views are verified automatically and payouts are sent per 1,000 views — no minimum follower count required.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-ink/5 transition-shadow hover:shadow-md">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[16.5px] font-bold text-ink">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${
            open ? 'bg-brand-500 text-white' : 'bg-brand-100 text-brand-600'
          }`}
        >
          <Plus className="h-4.5 w-4.5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-soft">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions? <span className="text-brand-500">Answered.</span>
            </>
          }
        />
        <div className="mt-14 space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <FAQItem q={f.q} a={f.a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
