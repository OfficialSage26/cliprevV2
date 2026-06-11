/**
 * ─── Site-wide settings ──────────────────────────────────────────────
 * Everything you'll want to tweak lives here: links, contact email,
 * stats and platform list. Edit this file and the whole site updates.
 */

export const site = {
  name: 'ClipRev',

  /**
   * Where the contact form sends inquiries (opens the visitor's email
   * app pre-filled). TODO: swap for a dedicated business inbox like
   * hello@cliprev.com once you have one.
   */
  contactEmail: 'cliprev@gmail.com',

  discord: 'https://discord.gg/EbHwauRUr',
  whop: 'https://whop.com/cliprev/?a=jauselec',

  /** Sister agency — gaming clipping (Roblox, Minecraft, Fortnite) */
  bloxclips: {
    site: 'https://bloxclips.com',
    whop: 'https://whop.com/bloxclips',
    discord: 'https://discord.gg/JWhcdFnR',
  },
} as const

/**
 * Shown in the hero. TODO: replace with your real numbers — these are
 * placeholders to show the layout.
 */
export const heroStats = [
  { value: 150, suffix: 'M+', label: 'views generated' },
  { value: 2000, suffix: '+', label: 'clippers in our network' },
  { value: 100, suffix: '%', label: 'performance-based' },
] as const

export const platforms = [
  'TikTok',
  'Instagram Reels',
  'YouTube Shorts',
  'X / Twitter',
  'Twitch',
  'Kick',
  'Facebook',
] as const
