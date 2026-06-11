/*
 * Dev utility: renders the built site and saves screenshots to /tmp/shots,
 * plus the social-share image to public/og.png.
 *
 * Requires (not kept in package.json to keep installs lean):
 *   npm i -D puppeteer-core @sparticuz/chromium
 * Then: npm run preview & node scripts/screenshot.mjs
 */
import { mkdirSync } from 'node:fs'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

const url = process.env.SHOT_URL ?? 'http://localhost:4173/'
const outDir = '/tmp/shots'
mkdirSync(outDir, { recursive: true })

const browser = await puppeteer.launch({
  args: [...chromium.args, '--force-color-profile=srgb'],
  executablePath: await chromium.executablePath(),
  headless: 'shell',
  defaultViewport: { width: 1440, height: 900 },
})

async function shoot(name, viewport, { fullPage = true, scrollFirst = true } = {}) {
  const page = await browser.newPage()
  await page.setViewport(viewport)
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
  if (scrollFirst) {
    // trigger whileInView animations down the whole page, then settle
    await page.evaluate(async () => {
      const delay = (ms) => new Promise((r) => setTimeout(r, ms))
      const step = window.innerHeight / 2
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: 'instant' })
        await delay(160)
      }
      await delay(900)
      window.scrollTo({ top: 0, behavior: 'instant' })
      await delay(500)
    })
  }
  await new Promise((r) => setTimeout(r, 1200))
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage })
  await page.close()
  console.log(`saved ${outDir}/${name}.png`)
}

async function shootElement(name, selector) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 1800))
  const el = await page.$(selector)
  if (el) {
    await el.screenshot({ path: `${outDir}/${name}.png` })
    console.log(`saved ${outDir}/${name}.png`)
  } else {
    console.log(`MISSING selector ${selector}`)
  }
  await page.close()
}

await shoot('desktop-full', { width: 1440, height: 900 })
await shoot('desktop-hero', { width: 1440, height: 900 }, { fullPage: false, scrollFirst: false })
await shoot('mobile-full', { width: 390, height: 844, isMobile: true, hasTouch: true })
await shootElement('logo', 'header nav a[aria-label]')
await shootElement('stage', '#top .\\[perspective\\:1300px\\]')

// social share image (og:image)
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 630 })
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 2200))
  await page.screenshot({ path: 'public/og.png' })
  await page.close()
  console.log('saved public/og.png')
}

await browser.close()
