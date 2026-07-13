# The Small-Town Advantage — SC Creative × Rotary of Jasper

**Design spec** · 2026-07-13

## Purpose

A ~30-minute keynote-style talk delivered by Sam Cole (SC Creative) to the
**Rotary Club of Jasper, Alabama**. The audience is local business owners,
professionals, and community leaders with a **wide range of tech comfort**.

**Goals (in priority order):**

1. **Inspire & build authority** — position Sam as the memorable, forward-thinking
   local voice on AI. No hard sell.
2. **Make the civic/economy case** — Jasper and Walker County can punch above their
   weight in the AI era; when Main Street businesses grow, the whole town rises.

**Non-goals:** No product pitch, no "book a consult" CTA, no live demo. Authority
and inspiration are the win. SC Creative appears only as a soft, local "here to
help" note at the end.

## Audience & tone

- **Room:** Rotary lunch meeting, mixed ages, mixed tech literacy.
- **Tone:** Warm, plain-spoken, story-driven, optimistic. Zero jargon. Every
  abstract idea is grounded in a concrete Walker County scenario.
- **The two emotional risks to avoid:** (1) sounding too technical → heads nod off;
  (2) sounding like doom/hype → distrust. The deck must feel *approachable and
  exciting*, never intimidating.

## The narrative spine

The emotional shape moves the room from **nervous → curious → inspired**, anchored
by a single throughline: **most small businesses fail — but they don't have to.**

- **Open with the fear** everyone secretly has ("Isn't AI coming for us?").
- **Raise the stakes** with the failure statistic — good businesses die not from
  lack of talent but from drowning in hundreds of hours of busywork.
- **Turn** — AI absorbs the invisible busywork → healthier margins → **margins fund
  hiring real people** for the hands-on, human work AI can't do → the business
  scales and survives.
- **Replay the failure stat, flipped** — this business now survives and grows.
- **Zoom out to the town** — every Main Street business doing this → jobs stay,
  money stays local, Jasper competes with Birmingham.

AI never replaces people in this story; it **funds** them. That reframe is the
heart of the talk and ties the inspiration goal to the economy goal.

## Slide-by-slide outline (~16 slides)

1. **Title** — "The Small-Town Advantage: How AI Levels the Playing Field for Jasper." SC Creative white logo, name.
2. **The hook / fear** — Name the elephant: "Isn't AI going to replace us / put us out of business?"
3. **The hard truth** — Failure stats: ~1 in 5 fail in year one, ~half gone by year five, ~65% by year ten. *Why* — owners drown in busywork and never work *on* the business. (Framed as widely-cited BLS-style figures.)
4. **The big idea** — For the first time, a Walker County shop can afford the same leverage as a company 100× its size.
5. **What AI actually is** — Plain English: "a very smart assistant that never sleeps." No jargon.
6. **Scenario — The BBQ joint** — Problem (misses after-hours orders/calls) → simple AI fix → hours reclaimed.
7. **Scenario — The HVAC contractor** — Problem (leads go cold, no time to follow up) → AI fix → result.
8. **Scenario — The boutique on the square** — Problem (can't keep up with marketing/social) → AI fix → result.
9. **Scenario — The insurance office** — Problem (buried in admin/paperwork) → AI fix → result.
10. **The turning point** — Reclaimed hours → better margins → **hire people for the tangible, physical, day-to-day work** → scale.
11. **The changed outcome** — Replay the failure stat, flipped: this business survives and grows.
12. **The economy angle** — Every Main Street business doing this → more local jobs, money stays in Walker County, Jasper scales and competes.
13. **Humans + AI (the honest part)** — AI doesn't replace people; it replaces the *tasks nobody has time for.* Humans + AI.
14. **Start small** — 3 things anyone in the room can try Monday morning.
15. **Vision close** — Jasper / Walker County as a model small town for the AI era.
16. **SC Creative + contact** — Soft authority: local, here to help. Name, contact.

Each of the four scenarios (slides 6–9) shares a repeatable visual template:
**business name → the problem → the simple AI fix → hours/dollars reclaimed.**

## Technical approach

- **Single self-contained `index.html` file** — all CSS and JS inline; no build
  step, no dependencies, no server required. Opens by double-click in any browser.
- **Navigation:** Arrow keys (← / →), spacebar, on-screen click zones, and clickable
  prev/next. Slide counter. `F` or a button for fullscreen.
- **Aspect ratio:** 16:9, scales responsively to any projector/laptop resolution.
- **Fonts:** Montserrat (headings) + Poppins (body), loaded via Google Fonts with a
  system-sans fallback so it still works if the venue Wi-Fi is down. Logo image
  embedded/referenced locally so it renders offline.
- **Presentation robustness:** Must render fully offline (venue Wi-Fi is unreliable).
  Fonts degrade gracefully; logo bundled into the project folder.

## Visual / brand system (from SC Creative)

- **Background:** deep navy `#070d17` / `#020617`
- **Surface / elevated:** `#0b1520` / `#071426`
- **Primary teal:** `#1cc7c3`, accent `#0EB1AB`
- **Gold accent (sparingly, for emphasis/highlights):** `#c8921a`
- **Text:** `#e8eef4` primary, `#CBD5E1` neutral, `#94A3B8` muted
- **Borders/glow:** soft white `rgba(255,255,255,0.08)`, teal glow `rgba(14,177,171,0.15)`
- **Logo:** `logo-white.png` on dark slides.
- **Feel:** dark, bold, future-forward, high-contrast, generous whitespace, large
  readable type (must be legible from the back of a Rotary hall).

## Content

- **All four scenarios are invented but locally believable Walker County businesses**
  (not real clients) — so every owner in the room sees their own business in them.
- Failure statistics presented as widely-cited/round figures, not precise claims.
- Copy written for the ear as much as the eye — short lines, one idea per slide,
  designed to *support* Sam speaking, not to be read verbatim.

## Success criteria

- A single HTML file that opens and presents flawlessly offline on a projector.
- Legible from the back of the room; one clear idea per slide.
- Follows the nervous → curious → inspired arc with the failure-stat throughline.
- Unmistakably SC Creative brand.
- Sam can tweak wording by editing plain text in the file.

## Open questions / deferred

- Exact "3 things to try Monday" (slide 14) — to be drafted during build.
- Sam's contact details for the closing slide — to confirm before final.
