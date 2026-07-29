# The Section Dictionary

A daily-ish challenge: one design-style, one website section (hero, footer, nav, card, etc.), pushed as I go. Over time this becomes a searchable catalog of section designs across styles.

**Live gallery:** `https://YOURUSERNAME.github.io/YOURREPO/`

## How it's organized

```
/sections
  /hero
    /bauhaus-01
      index.html
      style.css (or inline)
      thumb.png
      README.md   <- style name, date, source of inspiration (private note)
    /grunge-01
    ...
  /footer
    /halftone-01
    ...
/assets
  /img            <- thumbnails used on the gallery homepage
index.html         <- the gallery homepage (GitHub Pages entry point)
STYLES.md           <- master list of the 50 styles for this run
```

## Rules for this round

- 50 styles, 50-100 days.
- New style whenever inspired. Otherwise: reuse a style already done, but on a *new section type* (e.g. did "Grunge Hero" on day 2 → do "Grunge Footer" later instead of a brand new style).
- Every pushed section gets: a folder under `/sections/<type>/<style>-<number>`, a thumbnail, and one line added to the `sections` array in the homepage `index.html`.
- Sketches/WIP don't need to be pushed — only push when the section is done enough to preview.

## Adding a new section (workflow)

1. Build the section in its own folder under `/sections/<type>/<style-slug>-<version>/`.
2. Drop a thumbnail (screenshot, ~800x600) into that folder or `/assets/img/`.
3. Add one entry to the `sections` array at the bottom of `index.html`.
4. Commit + push. GitHub Pages picks it up automatically.

## Credits

Style names (Bauhaus, Risograph, Grunge, etc.) refer to established design movements/techniques — not proprietary to any single creator. Personal inspiration references are kept privately in each section's `README.md`, not required as public credit.
