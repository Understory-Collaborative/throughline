# Throughline video exports, for Final Cut Pro

Self-contained pages that render Throughline's brand cards for video. They share
one type system and the warm cream background, so the clips feel like one family.

- **`marcus-card.html`** — a quiet typography card that tells Marcus's situation.
  No photo, no face, no stated race. The human part is his story, so it never
  assumes what a formerly incarcerated person looks like. See
  `product/personas/marcus.md` and `product/design-system/brand-direction.md`.
- **`throughline-pieces.html`** — simple text cards naming the four pieces of
  Throughline (First Step Out, On Time, Clear Path, Good People), a beat on the
  thesis ("Software supports the work. People deliver it."), a slide for the
  product address (throughline.understorycollab.com) in the brand green, then a
  closing Understory Collaborative card with a vine that grows in.

Final Cut Pro brings in **images** (PNG) and **video** (`.mov`), not web pages.
So you render a page to one of those, then drag it onto your timeline. Three
ways, easiest first. The steps are the same for both pages.

## Opening a page

Double-click the `.html` file to open it in a browser. It shows the card on a
stage sized for video and scales to fit your window.

Keys, shown bottom-left:

- `R` replay the animation
- `S` jump to the held end frame (the Marcus still, or the pieces end card)
- `T` transparent background, for an alpha still you composite over footage
- `4` switch the stage between 1080p and 4K
- `H` hide the help and controls. **Hide them before you capture.**

## 1. Still image (simplest)

1. Open the page. Press `S` for the held frame, then `H` to hide the help.
2. Screenshot the card. On a Mac, `Cmd+Shift+4`, press space, click the browser
   window. You get a PNG in Finder.
3. Drag the PNG into Final Cut Pro and set how long it holds on screen.

For a transparent PNG to lay over your own footage, press `T` first, then
screenshot. (Browser screenshots of a transparent page keep the alpha.)

## 2. Animation (screen recording)

1. Open the page and press `H` to hide the help.
2. Open QuickTime Player, File, New Screen Recording. Record the browser window.
3. Press `R` to replay from the top. Stop the recording once it settles on the
   final frame.
4. QuickTime saves a `.mov`. Drag it into Final Cut Pro and trim.

QuickTime is built into macOS and its `.mov` drops straight into Final Cut. This
is the no-install path and it is plenty for a hackathon cut.

## 3. Exact pixels or alpha video (optional, cleanest)

`capture.mjs` renders a page to exact 1920x1080 (or 4K) files with no screen
recording. Run it from the `app/` folder.

```bash
npm i -D puppeteer
node public/exports/capture.mjs                            # Marcus card
node public/exports/capture.mjs --page throughline-pieces.html
node public/exports/capture.mjs -f                         # also the frames
node public/exports/capture.mjs -f --4k                    # 4K
node public/exports/capture.mjs --seconds 27               # override length
```

Output lands in `public/exports/out/`, named after the page (`NAME`):

- `NAME.png` the held frame on cream
- `NAME-transparent.png` the held frame with alpha
- `frames/` one PNG per frame of the reveal (with `-f`)
- `NAME.mov` ProRes 4444 with alpha, if `ffmpeg` is on your PATH

ProRes 4444 keeps the alpha channel, so the transparent version composites in
Final Cut Pro with no green screen. `ffmpeg` is only needed for that last `.mov`
step (`brew install ffmpeg`). Without it you still get the PNGs and frames.

## Timing

Both clips pace themselves so each line has reading room, then hold at the end.

- **Marcus card:** runs about 24 seconds. Change `DURATION` near the top of the
  script in `marcus-card.html` to match a different clip length. Every line
  repaces itself from that one number.
- **Pieces clip:** runs about 33 seconds and ends on the Understory
  Collaborative card. Each scene has a `data-secs` value in the markup. Edit
  those to retime a scene. To match your voiceover, set each scene's seconds to
  its line in the audio.

If you use `capture.mjs` after retiming, pass `--seconds` to match.

## Changing the words

Edit the text directly in the `.html` file. The Marcus card's content also lives
in the reusable React component at `app/src/MarcusSituationCard.tsx`, which takes
`name`, `age`, `intro`, and `facts` props for other personas.
