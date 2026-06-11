# ClipRev — Agency Website

The official website for **ClipRev**, the performance-based clipping agency
(sister brand of [BloxClips](https://bloxclips.com)).

Built with **Vite + React + TypeScript**, **Tailwind CSS v4** and **Motion**
(Framer Motion). Fonts are self-hosted (Chewy for display — matching the logo —
and Plus Jakarta Sans for body text), so the site has zero external requests.

## Quick start

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

## Editing the site

| What | Where |
| --- | --- |
| **Links, contact email, hero stats** | `src/config.ts` — single source of truth |
| Brand colors & fonts | `src/index.css` (`@theme` block) |
| Logo / clapperboard icon | `src/components/ui/Logo.tsx` and `public/favicon.svg` |
| Section copy | Each section lives in its own file under `src/components/` |
| FAQ questions | `src/components/FAQ.tsx` |
| Social-share preview image | `public/og.png` (regenerate with `scripts/screenshot.mjs`) |

Two things you'll probably want to update first, both in `src/config.ts`:

1. **`contactEmail`** — currently set to the owner's Gmail so inquiries work
   from day one. Swap it for a branded inbox (e.g. `hello@cliprev.com`)
   whenever you create one.
2. **`heroStats`** — the "150M+ views" numbers in the hero are placeholders.
   Put your real figures in.

## How the contact form works

The form opens the visitor's email app with a pre-filled message to
`contactEmail` (no backend needed). If you later want submissions without an
email client, point the form at [Formspree](https://formspree.io),
[Web3Forms](https://web3forms.com) or a small API route — it's a one-file
change in `src/components/Contact.tsx`.

## Deploying

The site is a fully static build (`dist/`), so any static host works:

- **Vercel / Netlify** (recommended): import the repo, framework preset
  "Vite". Build command `npm run build`, output directory `dist`. Then attach
  your custom domain (e.g. `cliprev.com`) in the dashboard.
- **Cloudflare Pages**: same settings as above.
- **GitHub Pages**: build and publish `dist/` (set `base` in `vite.config.ts`
  if served from a sub-path).

## Project structure

```
src/
  config.ts             ← links, email, stats (edit me!)
  index.css             ← Tailwind theme: brand colors, fonts, animations
  App.tsx               ← page assembly
  components/
    Navbar.tsx  Hero.tsx  Marquee.tsx  Services.tsx  HowItWorks.tsx
    WhyUs.tsx  Clippers.tsx  FAQ.tsx  Contact.tsx  Footer.tsx
    ui/                 ← Logo, Button, Reveal, TiltCard, CountUp, …
scripts/                ← optional screenshot utilities (see file headers)
```
