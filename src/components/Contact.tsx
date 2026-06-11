import type { FormEvent } from 'react'
import { useState } from 'react'
import { Mail, MessagesSquare, Send, Timer } from 'lucide-react'
import { SiDiscord } from 'react-icons/si'
import { site } from '../config'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'

const budgets = ['Under $1k / month', '$1k – $5k / month', '$5k – $20k / month', '$20k+ / month', 'Not sure yet']

const inputClass =
  'w-full rounded-xl bg-paper px-4 py-3.5 text-[15px] font-medium text-ink ring-1 ring-ink/10 transition-shadow placeholder:text-ink-soft/60 focus:ring-2 focus:ring-brand-500 focus:outline-none'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: budgets[4], message: '' })

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const subject = `New campaign inquiry — ${form.company || form.name}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Brand / company: ${form.company}`,
      `Budget: ${form.budget}`,
      '',
      form.message,
    ].join('\n')
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Work with us"
          title={
            <>
              Let's make you <span className="text-brand-500">unmissable</span>.
            </>
          }
          sub="Tell us what you're building and we'll come back with a campaign plan and a quote — usually within 24–48 hours."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="h-full">
            <div className="flex h-full flex-col justify-between gap-10 rounded-3xl bg-night p-8 text-white sm:p-10">
              <div>
                <h3 className="font-display text-3xl tracking-wide">Talk to the team</h3>
                <p className="mt-4 leading-relaxed text-white/70">
                  Brands, creators, labels, app studios — if you want your content everywhere,
                  we want to hear from you.
                </p>
                <ul className="mt-8 space-y-5">
                  <li className="flex items-start gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-400 ring-1 ring-brand-500/25">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-sm font-bold tracking-wide text-white/60 uppercase">Email</div>
                      <a
                        href={`mailto:${site.contactEmail}`}
                        className="font-semibold break-all text-white transition-colors hover:text-brand-300"
                      >
                        {site.contactEmail}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-400 ring-1 ring-brand-500/25">
                      <MessagesSquare className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-sm font-bold tracking-wide text-white/60 uppercase">Discord</div>
                      <p className="text-white/80">Fastest way to reach us — open a ticket in the server.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-400 ring-1 ring-brand-500/25">
                      <Timer className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-sm font-bold tracking-wide text-white/60 uppercase">Response time</div>
                      <p className="text-white/80">Within 24–48 hours, usually much faster.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <Button href={site.discord} target="_blank" rel="noreferrer" className="w-full">
                <SiDiscord className="h-5 w-5" />
                Join the ClipRev Discord
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <form
              onSubmit={onSubmit}
              className="grid h-full content-start gap-5 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-ink/5 sm:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-ink">Your name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Alex Rivera"
                    className={inputClass}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-ink">Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder="you@brand.com"
                    className={inputClass}
                  />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-ink">Brand / company</span>
                  <input
                    value={form.company}
                    onChange={(e) => set('company', e.target.value)}
                    placeholder="Acme Energy Drinks"
                    className={inputClass}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-ink">Monthly budget</span>
                  <select
                    value={form.budget}
                    onChange={(e) => set('budget', e.target.value)}
                    className={inputClass}
                  >
                    {budgets.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="grid gap-2">
                <span className="text-sm font-bold text-ink">What are we clipping?</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder="Tell us about your content, your goals and where you want to blow up…"
                  className={`${inputClass} resize-none`}
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-brand-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 active:translate-y-0"
              >
                Send inquiry
                <Send className="h-4.5 w-4.5" />
              </button>
              <p className="text-center text-[13px] font-medium text-ink-soft">
                This opens your email app with everything pre-filled — just hit send.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
