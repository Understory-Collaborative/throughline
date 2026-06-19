// Optional: render the Marcus card to exact-pixel files for Final Cut Pro.
//
// The marcus-card.html page is enough on its own (screenshot or screen record).
// Use this only when you want pixel-perfect output without screen recording.
//
// What it makes, in ./out next to this script:
//   marcus-card.png              the held frame, on cream, 1920x1080
//   marcus-card-transparent.png  the held frame with an alpha background
//   frames/0001.png ...          one PNG per animation frame (optional, -f)
//   marcus-card.mov              ProRes 4444 with alpha, if ffmpeg is present
//
// Run from app/ (the dev server does not need to be running):
//   npm i -D puppeteer
//   node public/exports/capture.mjs            still PNGs only
//   node public/exports/capture.mjs -f         also render the animation frames
//   node public/exports/capture.mjs -f --4k    4K (3840x2160)
//
// ProRes 4444 keeps the alpha channel, so the transparent version drops onto
// your own footage in Final Cut Pro with no green screen. Assembling frames into
// a .mov needs ffmpeg on your PATH (brew install ffmpeg). Without it, the frames
// are left in place and you can import the sequence yourself.

import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdir, rm } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import puppeteer from 'puppeteer'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = join(here, 'out')
const framesDir = join(outDir, 'frames')

const args = process.argv.slice(2)
const wantFrames = args.includes('-f') || args.includes('--frames')
const is4k = args.includes('--4k')

const width = is4k ? 3840 : 1920
const height = is4k ? 2160 : 1080
const fps = 30
// Match DURATION in marcus-card.html, so the render covers the full reveal plus
// the calm hold at the end.
const seconds = 24

async function shoot(page, file, { transparent } = {}) {
  await page.screenshot({
    path: join(outDir, file),
    omitBackground: !!transparent,
    clip: { x: 0, y: 0, width, height },
  })
}

async function main() {
  await mkdir(outDir, { recursive: true })

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width, height, deviceScaleFactor: 1 },
  })
  const page = await browser.newPage()

  await page.goto('file://' + join(here, 'marcus-card.html'), {
    waitUntil: 'networkidle0',
  })

  // Pin the stage to native pixels (no preview scaling) and hide the help.
  async function configure({ play, bg }) {
    await page.evaluate(
      (cfg) => {
        const stage = document.querySelector('.stage')
        stage.dataset.size = cfg.is4k ? '4k' : '1080'
        stage.dataset.play = cfg.play
        stage.dataset.bg = cfg.bg
        stage.style.transform = 'none'
        document.body.style.background = cfg.bg === 'transparent' ? 'transparent' : ''
        document.getElementById('help').hidden = true
      },
      { ...{ is4k }, play, bg },
    )
  }

  // Held frame on cream.
  await configure({ play: 'still', bg: 'cream' })
  await new Promise((r) => setTimeout(r, 300))
  await shoot(page, 'marcus-card.png')

  // Held frame with alpha, for compositing.
  await configure({ play: 'still', bg: 'transparent' })
  await new Promise((r) => setTimeout(r, 300))
  await shoot(page, 'marcus-card-transparent.png', { transparent: true })
  console.log('Wrote still PNGs to', outDir)

  if (wantFrames) {
    await rm(framesDir, { recursive: true, force: true })
    await mkdir(framesDir, { recursive: true })

    // Replay the breeze reveal and step through it frame by frame.
    await configure({ play: 'on', bg: 'cream' })
    await page.evaluate(() => {
      const stage = document.querySelector('.stage')
      stage.dataset.play = 'off'
      void stage.offsetWidth
      stage.dataset.play = 'on'
    })

    const total = fps * seconds
    for (let i = 0; i < total; i++) {
      await new Promise((r) => setTimeout(r, 1000 / fps))
      const name = String(i + 1).padStart(4, '0') + '.png'
      await page.screenshot({
        path: join(framesDir, name),
        clip: { x: 0, y: 0, width, height },
      })
    }
    console.log(`Wrote ${total} frames to`, framesDir)

    const ffmpeg = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' })
    if (ffmpeg.status === 0) {
      // ProRes 4444 over the cream frames. For alpha, render transparent frames.
      spawnSync(
        'ffmpeg',
        [
          '-y',
          '-framerate', String(fps),
          '-i', join(framesDir, '%04d.png'),
          '-c:v', 'prores_ks',
          '-profile:v', '4',
          '-pix_fmt', 'yuva444p10le',
          join(outDir, 'marcus-card.mov'),
        ],
        { stdio: 'inherit' },
      )
      console.log('Wrote marcus-card.mov (ProRes 4444)')
    } else {
      console.log(
        'ffmpeg not found. The PNG frames are in',
        framesDir,
        '— import the sequence in Final Cut Pro, or install ffmpeg.',
      )
    }
  }

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
