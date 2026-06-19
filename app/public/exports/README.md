# Marcus card, for Final Cut Pro

A quiet typography card that tells Marcus's situation on the brand cream. No
photo, no face, no stated race. The human part is his story, so the card never
assumes what a formerly incarcerated person looks like. See
`product/personas/marcus.md` and `product/design-system/brand-direction.md`.

Final Cut Pro brings in **images** (PNG) and **video** (`.mov`), not web pages.
So you render this page to one of those, then drag it onto your timeline. Three
ways, easiest first.

## The file

`marcus-card.html` is self-contained. Double-click it to open in a browser. It
shows the card on a stage sized for video and scales to fit your window.

Keys, shown bottom-left:

- `R` replay the animation
- `S` still, jump straight to the held frame
- `T` transparent background, for an alpha still you composite over footage
- `4` switch the stage between 1080p and 4K
- `H` hide the help and controls. **Hide them before you capture.**

## 1. Still image (simplest)

1. Open `marcus-card.html`. Press `S` for the held frame, then `H` to hide the
   help.
2. Screenshot the card. On a Mac, `Cmd+Shift+4`, press space, click the browser
   window. You get a PNG in Finder.
3. Drag the PNG into Final Cut Pro and set how long it holds on screen.

For a transparent PNG to lay over your own footage, press `T` first, then
screenshot. (Browser screenshots of a transparent page keep the alpha.)

## 2. Animation (screen recording)

1. Open `marcus-card.html` and press `H` to hide the help.
2. Open QuickTime Player, File, New Screen Recording. Record the browser window.
3. Press `R` to replay the breeze reveal. Stop the recording once it settles.
4. QuickTime saves a `.mov`. Drag it into Final Cut Pro and trim.

QuickTime is built into macOS and its `.mov` drops straight into Final Cut. This
is the no-install path and it is plenty for a hackathon cut.

## 3. Exact pixels or alpha video (optional, cleanest)

`capture.mjs` renders the card to exact 1920x1080 (or 4K) files with no screen
recording. Run it from the `app/` folder.

```bash
npm i -D puppeteer
node public/exports/capture.mjs          # still PNGs, on cream and transparent
node public/exports/capture.mjs -f       # also render the animation frames
node public/exports/capture.mjs -f --4k  # 4K
```

Output lands in `public/exports/out/`:

- `marcus-card.png` the held frame on cream
- `marcus-card-transparent.png` the held frame with alpha
- `frames/` one PNG per frame of the reveal (with `-f`)
- `marcus-card.mov` ProRes 4444 with alpha, if `ffmpeg` is on your PATH

ProRes 4444 keeps the alpha channel, so the transparent version composites in
Final Cut Pro with no green screen. `ffmpeg` is only needed for that last `.mov`
step (`brew install ffmpeg`). Without it you still get the PNGs and frames.

## Changing the words

Edit the card text in `marcus-card.html`. The same content lives in the reusable
React component at `app/src/MarcusSituationCard.tsx`, which takes `name`, `age`,
`intro`, and `facts` props if you want to make a card for another persona.
