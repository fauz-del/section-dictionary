FORM / 01 — Architecture for the Unexpected

An experimental interactive web hero exploring architecture, grids, typography, geometry, motion, and spatial interaction.

The project treats the browser viewport as an architectural drawing surface. Instead of using photography or conventional decorative imagery, the visual language is constructed entirely from HTML, CSS, typography, geometric primitives, and JavaScript-generated dots.

The central idea is simple:

«Architecture is not only what is built. It is also the space, grid, rhythm, proportion, and movement around it.»

The interface therefore behaves less like a static webpage and more like a living drafting system.

---

1. Design Direction

FORM / 01 is built around an editorial architectural-art-direction aesthetic.

The visual system combines:

- Swiss / International Typographic Style
- Bauhaus-inspired geometry
- Architectural drafting systems
- Technical diagrams
- Generative grids
- Minimal editorial layouts
- Interactive motion
- Red/black/off-white visual contrast
- Experimental digital interfaces

The design deliberately avoids photographic imagery.

Instead, the composition is constructed from:

Typography
    +
Dot Matrix
    +
Geometric Construction Lines
    +
Circles
    +
Frames
    +
Measurement Marks
    +
Interaction
    =
Interactive Architectural Canvas

The goal is not to make the interface look like a literal architectural blueprint.

It should feel like a modern digital interpretation of architectural thinking.

---

2. Core Concept

The hero is designed as a layered spatial system.

There are several visual planes:

┌───────────────────────────────────────┐
│                                       │
│   INFORMATION                         │
│   FORM / 01                    NAV    │
│                                       │
│                                       │
│        DOT MATRIX                     │
│                                       │
│             GEOMETRY                  │
│                                       │
│       ARCHITECTURE                    │
│       FOR THE                         │
│       UNEXPECTED.                    │
│                                       │
│                                       │
│   KANO, NIGERIA — 2026       SCROLL ↓ │
│                                       │
└───────────────────────────────────────┘

The user is not looking at independent components.

The intention is that everything feels like part of one composition.

The dots form the underlying spatial field.

The geometric shapes establish structure.

The typography establishes hierarchy.

The red elements provide orientation and emphasis.

The pointer introduces movement.

---

3. Visual Philosophy

3.1 Less decoration, more system

The design should avoid arbitrary decoration.

Every visual element should feel as if it has a reason to exist.

For example:

Circle

Represents:

- spatial measurement
- movement
- orbit
- proportion
- construction

Square / Frame

Represents:

- structure
- architectural boundaries
- modules
- rooms
- containment

Crosshair

Represents:

- measurement
- alignment
- positioning
- technical drawing

Horizontal / Vertical Lines

Represent:

- axes
- structural alignment
- perspective
- grid references

Dot Field

Represents:

- coordinates
- pixels
- spatial data
- architectural points
- a generative construction system

Large Ghost Number

Represents:

- project indexing
- editorial identity
- technical documentation
- architectural drawing labels

---

4. Color System

The palette is intentionally extremely restrained.

--off-white: #F4F2ED;
--ink:       #111111;
--red:       #DA291C;

Off-white

"#F4F2ED"

The background is not pure white.

The slightly warm tone makes the interface feel closer to:

- paper
- architectural drawings
- editorial layouts
- physical design documents

It also reduces the harshness of pure black-and-white contrast.

---

Ink

"#111111"

Used for:

- typography
- navigation
- structural elements
- dots
- primary interface content

It is intentionally not "#000000".

This keeps the contrast strong without making the design feel overly digital.

---

Red

"#DA291C"

Red is used as an accent rather than a primary color.

It appears in:

- eyebrow text
- hover indicators
- construction lines
- crosshairs
- interactive dots

The red should therefore feel meaningful.

It signals:

«"This element is active, important, or part of the technical system."»

---

5. Typography

The typography is deliberately oversized.

The headline is the dominant visual object.

ARCHITECTURE
FOR THE
UNEXPECTED.

The large scale creates a strong editorial presence.

The headline uses:

- uppercase typography
- heavy weight
- compressed vertical rhythm
- tight letter spacing
- large viewport-relative sizing

The font size is responsive:

font-size: clamp(48px, 10vw, 128px);

This allows the typography to scale with the viewport while maintaining a controlled maximum.

---

6. Typographic Hierarchy

There are three primary levels.

Level 01 — Brand

FORM / 01

Small but strong.

This establishes the identity of the project.

---

Level 02 — Eyebrow

001 — STUDIO MANIFESTO

Technical/editorial metadata.

The red color separates it from the main headline.

---

Level 03 — Hero Statement

ARCHITECTURE
FOR THE
UNEXPECTED.

This is the visual anchor.

Everything else supports this statement.

---

7. Dot Field

The dot field is the primary generative element.

It is created entirely with JavaScript.

No image or canvas is required.

Each dot is represented by a DOM element:

<div class="dot"></div>

The JavaScript dynamically determines:

- number of columns
- number of rows
- position
- spacing
- interaction radius
- scaling
- color
- animation

The grid is responsive.

Current approximate spacing:

Desktop     40px
Tablet      36px
Small       29px
Mobile      20px

This means mobile receives a much denser field than desktop.

---

8. Why the Grid Is Responsive

A fixed grid spacing would create a problem.

For example:

Desktop

●        ●        ●        ●

can look elegant.

But on a narrow phone:

●        ●        ●

the same spacing becomes sparse.

Therefore the grid density changes according to viewport width.

This preserves the visual weight of the composition across devices.

---

9. Pointer Interaction

The cursor acts as a temporary source of energy.

When the pointer enters the grid, nearby dots respond according to their distance from it.

Conceptually:

Distance from pointer
        ↓
Calculate influence
        ↓
Calculate scale
        ↓
Calculate color intensity
        ↓
Apply visual response

The closer a dot is to the pointer, the stronger its response.

---

10. Distance-Based Interaction

The core calculation is:

var dx = d.x - cx;
var dy = d.y - cy;

var dist = Math.hypot(dx, dy);

This determines the distance between the pointer and the dot.

The influence is then calculated:

var t = 1 - dist / RADIUS;

Therefore:

Pointer
   ↓
████████████████
████████████████
████████████████

becomes a radial field of influence.

---

11. Smooth Interaction

The raw distance value is passed through a smoothstep function:

t = t * t * (3 - 2 * t);

This prevents the animation from feeling mechanical.

Instead of:

0 ───────────── 1

the transition behaves more like:

0 ───╮
     │
     ╰──────╮
            │
            ╰── 1

The result is a softer and more organic interaction.

---

12. Dot Scaling

The dots grow according to pointer proximity.

The base scale is:

1

The maximum scale is controlled responsively.

Desktop:

maxScale = 2.4;

Mobile:

maxScale = 1.5;

This is important.

A 2.4× expansion that looks beautiful on desktop can become visually aggressive on a small screen.

The mobile interaction is therefore intentionally restrained.

---

13. Color Interaction

The dots transition between:

Ink
↓
Red

The base color is approximately:

rgba(17,17,17,0.16)

The active color approaches:

#DA291C

The result is a subtle red energy field around the pointer.

This gives the interaction a strong relationship with the red architectural markers.

---

14. Idle Animation

The grid should not become completely lifeless when the user stops interacting.

After approximately:

1400ms

the interface considers itself idle.

The system then creates a slow radial pulse.

The pulse originates from the center of the viewport.

Conceptually:

       ·
    ·     ·
  ·    ◉    ·
    ·     ·
       ·

The ring expands outward.

This means the page remains subtly alive even when untouched.

---

15. Release Ripple

The pointer interaction also has a secondary state:

release.

When the user stops touching the screen or leaves the interactive area, the last active position can emit a tiny ripple.

Conceptually:

Pointer active:

        ●
      ● ● ●
    ● ● 🔴 ● ●
      ● ● ●
        ●


Pointer released:

          ○
       ○     ○
     ○         ○
       ○     ○
          ○

The purpose is not to create another large animation.

It is a small visual acknowledgment.

The interface essentially says:

«"I noticed you were here."»

The ripple then disappears and the idle breathing system resumes.

---

16. Geometric System

The dot grid should eventually be complemented by several architectural primitives.

Recommended elements:

Large circle

A low-opacity construction circle.

        ╭────────╮
     ╭──╯        ╰──╮
    │                │
    │                │
     ╰──╮        ╭──╯
        ╰────────╯

Nested circle

A smaller circle inside the primary circle.

This creates depth without using shadows.

Architectural frame

A thin outlined rectangle.

┌─────────────────┐
│                 │
│                 │
│                 │
└─────────────────┘

Crosshair

A small technical marker.

      │
──────┼──────
      │

Construction axes

Very thin horizontal and vertical lines.

Measurement marks

Small repeated ticks that reinforce the drafting language.

---

17. Layer Architecture

The visual system should be treated as multiple layers.

LAYER 05
────────────────────
Typography / Content
────────────────────

LAYER 04
────────────────────
Interactive geometry
────────────────────

LAYER 03
────────────────────
Static architectural geometry
────────────────────

LAYER 02
────────────────────
Dot field
────────────────────

LAYER 01
────────────────────
Off-white canvas
────────────────────

This hierarchy is important.

The background should never overpower the content.

---

18. Interaction Hierarchy

The interactions should have different strengths.

Strong

Pointer → dots

Medium

Pointer release → ripple

Subtle

Idle pulse

Extremely subtle

Geometric movement

This creates a hierarchy:

        POINTER
           │
           ▼
      DOT RESPONSE
           │
           ▼
      RELEASE RIPPLE
           │
           ▼
       IDLE PULSE
           │
           ▼
      STATIC GEOMETRY

The user should notice the pointer effect first.

The other systems should reveal themselves gradually.

---

19. No Images

The project intentionally avoids image assets.

This is an important design constraint.

The visual system is generated from:

HTML
CSS
JavaScript
Typography
DOM geometry

This creates several advantages:

- extremely lightweight visual assets
- no image loading
- scalable geometry
- responsive behavior
- programmable interaction
- easier experimentation
- strong technical identity

The page becomes closer to a generative composition than a conventional marketing page.

---

20. Responsive Philosophy

Responsive design should not simply mean:

«"Make everything smaller."»

Instead, the composition should change proportionally.

Desktop

Large:

- typography
- spacing
- geometric forms
- dot spacing
- interaction radius

Tablet

Moderate:

- typography
- geometry
- grid density

Mobile

Dense:

- dot spacing
- typography
- interaction radius
- navigation spacing

The mobile design should feel like a compressed architectural drawing, not a broken desktop layout.

---

21. Mobile Composition

On mobile, the following are especially important:

20px dot spacing
↓
dense visual field

36–64px headline
↓
strong typography

20px page margin
↓
controlled breathing room

Smaller interaction radius
↓
focused pointer/touch effect

The goal is to preserve the visual character of the desktop version while respecting the smaller viewport.

---

22. Navigation

The navigation is deliberately minimal.

WORK     ABOUT     CONTACT

The navigation uses a monospace typeface to distinguish it from the large editorial headline.

Hovering over a link creates a small red underline.

This reinforces the overall red interaction language.

---

23. Metadata

The following information appears at the bottom:

KANO, NIGERIA — 2026

and:

SCROLL TO EXPLORE ↓

This makes the page feel like the opening frame of an architectural studio presentation.

The metadata is intentionally small.

It should feel discovered rather than announced.

---

24. Motion Principles

Motion should follow three rules.

1. Slow

Background motion should be slow.

2. Responsive

Pointer interactions should respond immediately.

3. Controlled

Nothing should bounce excessively or constantly demand attention.

The ideal feeling is:

«quiet until touched, alive when interacted with.»

---

25. Accessibility

The decorative dot field is marked:

aria-hidden="true"

because it does not communicate semantic information.

The navigation remains normal semantic HTML.

Interactive links maintain visible focus states.

The project also respects:

prefers-reduced-motion

When reduced motion is enabled:

- idle animation is disabled
- unnecessary motion is removed
- the interface remains usable

This is important because the design relies heavily on animation.

---

26. Performance Considerations

The dot field uses DOM elements rather than "<canvas>".

This makes the implementation simple and inspectable, but it also means performance should be considered.

Every interaction currently involves iterating through the dot collection.

For example:

for (var i = 0; i < dots.length; i++) {
    ...
}

As grid density increases, the number of DOM elements increases.

Therefore:

Desktop
    ↓
40px spacing
    ↓
Moderate number of dots

Mobile
    ↓
20px spacing
    ↓
Much higher number of dots

The mobile value should therefore not be reduced indefinitely.

Around "20px" is a reasonable balance between:

- visual density
- interaction quality
- DOM size
- mobile performance

If the project later needs a much denser grid, "<canvas>" would be the natural next step.

---

27. Current File Structure

A simple version of the project can remain:

FORM-01/
│
├── index.html
├── style.css
├── script.js
└── README.md

No build system is necessary for the current experiment.

This keeps the project easy to inspect and experiment with.

---

28. Development Philosophy

The project should be developed as a series of visual experiments rather than one giant implementation.

Recommended progression:

01
Basic typography
        ↓
02
Dot grid
        ↓
03
Pointer interaction
        ↓
04
Idle pulse
        ↓
05
Release ripple
        ↓
06
Architectural geometry
        ↓
07
Geometry interaction
        ↓
08
Scroll transitions
        ↓
09
Additional sections
        ↓
10
Complete interactive studio site

Each stage should remain visually understandable on its own.

---

29. Future Experiments

Potential future interactions include:

A. Magnetic geometry

Geometric objects subtly move toward the pointer.

B. Grid distortion

The dot grid bends around the pointer instead of only scaling.

C. Ripple propagation

A click creates a ripple that travels across the entire grid.

D. Geometric collision

The pointer pushes dots away physically.

E. Typography displacement

Individual headline lines shift by a few pixels based on cursor position.

F. Scroll-driven construction

As the user scrolls, the architectural geometry gradually constructs itself.

G. Section transitions

The grid could reorganize itself into new geometric arrangements between sections.

H. Generative layouts

Different visits could produce slightly different arrangements while maintaining the same design system.

---

30. Potential Second Section

The hero should eventually transition into another architectural composition.

For example:

FORM / 01

HERO
─────
Architecture for the unexpected.


↓

SECTION 02

THE GRID
───────

A grid isn't merely
a collection of points.

It is a system
of relationships.


        ● ───── ●
        │       │
        │   ●   │
        │       │
        ● ───── ●


↓

SECTION 03

SELECTED WORK


↓

SECTION 04

STUDIO


↓

SECTION 05

CONTACT

The visual system established in the hero can then become the design language for the entire site.

---

31. Design Rules

To keep the project coherent, follow these rules.

Rule 01

Do not introduce unnecessary colors.

Use:

Off-white
Ink
Red

primarily.

Rule 02

Do not add photographic imagery unless the concept explicitly changes.

Rule 03

Keep geometric elements thin and subtle.

Rule 04

Typography should remain the primary visual anchor.

Rule 05

Interactive effects should feel physical rather than flashy.

Rule 06

Motion should have purpose.

Rule 07

Negative space is part of the design.

Rule 08

Do not make every element interactive.

Some things should remain quiet.

---

32. Overall Experience

The intended experience can be summarized as:

FIRST IMPRESSION
        ↓
Minimal
        ↓
Typography
        ↓
Architectural geometry becomes visible
        ↓
User moves pointer
        ↓
Grid reacts
        ↓
User pauses
        ↓
Grid breathes
        ↓
User leaves
        ↓
Tiny ripple
        ↓
System returns to rest

The important part is the final state.

The interface should never feel like it is constantly performing.

It should feel alive but restrained.

---

33. Final Design Statement

FORM / 01 is an exploration of what happens when a traditional architectural language is translated into an interactive digital environment.

Instead of photographs of buildings, the project uses:

- points
- lines
- circles
- frames
- measurements
- typography
- movement

The result is a visual system that behaves like an architectural drawing while responding like a digital interface.

The project is intentionally minimal.

But the minimalism is not emptiness.

It is a framework for interaction.

«FORM / 01 — Architecture for the Unexpected.»

A system of points, proportions, and movement designed to make the interface itself feel constructed.