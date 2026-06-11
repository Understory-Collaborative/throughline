# Accessibility

Throughline meets **WCAG 2.2 AA**. Accessibility is a requirement, not a
nice-to-have. Our audience includes people using screen readers, large text,
keyboard only, low vision, and older or cheaper phones.

## Working checklist

Use this when building or reviewing a screen.

### Structure and semantics

- [ ] Real semantic HTML. Use `button`, `a`, `nav`, `main`, `h1`..`h6` for what
      they mean.
- [ ] One `h1` per page, with a logical heading order under it.
- [ ] Landmarks (`main`, `header`, `nav`, `footer`) so screen readers can jump
      around.

### Keyboard

- [ ] Every action works with a keyboard alone.
- [ ] Focus order follows reading order.
- [ ] Focus is always visible. Never remove the focus ring without a stronger
      replacement.
- [ ] No keyboard trap. The person can always tab away.

### Forms and questions

- [ ] Every input has a visible, associated `label`.
- [ ] Errors are described in text, not by color alone, and tied to the field.
- [ ] Inputs do not rely on placeholder text as the only label.

### Color and contrast

- [ ] Text contrast is at least 4.5:1 (3:1 for large text).
- [ ] Interactive controls and focus indicators meet 3:1 against their
      surroundings.
- [ ] Color is never the only way to convey meaning.

### Text and zoom

- [ ] Content stays usable at 200 percent text zoom with no loss of content or
      function.
- [ ] Layout reflows to a single column on small screens with no horizontal
      scroll.
- [ ] No text baked into images.

### Targets and motion (WCAG 2.2 additions)

- [ ] Touch targets are at least 24 by 24 CSS pixels, with comfortable spacing.
      Aim larger for primary actions.
- [ ] Nothing important is hidden behind hover only.
- [ ] Respect `prefers-reduced-motion`. Keep motion small and optional.
- [ ] Do not ask the person to remember information across steps to complete a
      task (WCAG 2.2 "Accessible Authentication" and "Redundant Entry" spirit).

### Media and language

- [ ] `html lang` is set.
- [ ] Images have meaningful `alt`, or empty `alt` when decorative.
- [ ] Link text makes sense on its own.

## How we check

- Keyboard-only pass on every new screen.
- A screen reader pass (VoiceOver or NVDA) on key flows.
- Automated checks in the browser (axe or Lighthouse) as a floor, not a ceiling.
- Real testing with people who use assistive technology, as we are able.
