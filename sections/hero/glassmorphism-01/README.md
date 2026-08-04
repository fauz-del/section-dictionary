# Glassmorphism Hero — 01

**Date:** 2026-08-05
**Section type:** Hero
**Style:** Glassmorphism

Split-layout hero: a frosted glass panel (`backdrop-filter: blur`) over the
left half of a full-bleed photo, sharp/unblurred on the right. A cutout of
the same flower overlays both halves using matching `object-fit: cover` /
`object-position` math so it stays pixel-aligned with the background at any
viewport size. Fixed glass navbar on top.

**Inspiration:** A Pinterest/social flyer template ("Flower Season" event
poster) — dark background, split blur/sharp treatment, stacked vertical
type.

**Notes to self:** cutout was generated locally via a brightness-threshold
alpha mask (PIL/numpy) rather than a proper background-removal model — good
enough for a soft floral subject on a near-black background, would need a
real segmentation approach for busier source photos.