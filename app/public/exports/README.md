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
- **`understory-card.html`** — the closing Understory Collaborative card on its
  own, with the growing vine and understorycollab.com. The same card as the last
  scene of the pieces clip, so you can capture it by itself.

Final Cut Pro brings in **images** (PNG) and **video** (`.mov`), not web pages.
So you capture a page as one of those, then drag it onto your timeline. Two
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

QuickTime is built into macOS and its `.mov` drops straight into Final Cut.

## Timing

Both clips pace themselves so each line has reading room, then hold at the end.

- **Marcus card:** runs about 24 seconds. Change `DURATION` near the top of the
  script in `marcus-card.html` to match a different clip length. Every line
  repaces itself from that one number.
- **Pieces clip:** runs about 33 seconds and ends on the Understory
  Collaborative card. Each scene has a `data-secs` value in the markup. Edit
  those to retime a scene. To match your voiceover, set each scene's seconds to
  its line in the audio.

## Changing the words

Edit the text directly in the `.html` file. The Marcus card's content also lives
in the reusable React component at `app/src/MarcusSituationCard.tsx`, which takes
`name`, `age`, `intro`, and `facts` props for other personas.
