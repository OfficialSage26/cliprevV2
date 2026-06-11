/*
 * Dev utility: captures mobile viewport slices at each section anchor.
 * Requires: npm i -D puppeteer-core @sparticuz/chromium (see screenshot.mjs)
 */
import { mkdirSync } from 'node:fs'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

const url = process.env.SHOT_URL ?? 'http://localhost:4173/'
mkdirSync('/tmp/shots', { recursive: true })

const browser = await puppeteer.launch({
  args: [...chromium.args, '--force-color-profile=srgb'],
  executablePath: await chromium.executablePath(),
  headless: 'shell',
  defaultViewport: { width: 390, height: 844, isMobile: true, hasTouch: true },
})
const page = await browser.newPage()
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })

const targets = ['#top', '#services', '#how', '#why', '#clippers', '#faq', '#contact', 'footer']
for (const sel of targets) {
  await page.evaluate((s) => {
    document.querySelector(s)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    window.scrollBy({ top: -60, behavior: 'instant' })
  }, sel)
  await new Promise((r) => setTimeout(r, 1600))
  const name = sel.replace(/[#]/g, '')
  await page.screenshot({ path: `/tmp/shots/m-${name}.png` })
  console.log(`saved m-${name}.png`)
}
await browser.close()
