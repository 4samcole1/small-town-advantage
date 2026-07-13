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

## Slide-by-slide outline (~18 slides)

1. **Title** — "The Small-Town Advantage: How AI Levels the Playing Field for Jasper." SC Creative white logo, name.
2. **The hook / fear** — Name the elephant: "Isn't AI going to replace us / put us out of business?"
3. **The hard truth** — Everyone in the room — business *or* institution — runs on limited time and money. Sharpest example: business failure stats: ~1 in 5 fail in year one, ~half gone by year five, ~65% by year ten. *Why* — owners drown in busywork and never work *on* the business. (Framed as widely-cited BLS-style figures.)
4. **The big idea** — For the first time, a Walker County shop — or a city office — can afford the same leverage as an organization 100× its size.
5. **What AI actually is** — Plain English: "a very smart assistant that never sleeps." No jargon.
6. **Scenario — City of Jasper** — Problem (citizen questions/requests pile up) → answer them without adding staff → hours reclaimed.
7. **Scenario — Walker County Sheriff's Department** — Problem (deputies buried in paperwork/reports) → AI cuts report time → deputies stay on the street.
8. **Scenario — Local non-profit** — Problem (tiny team, big mission) → AI helps with outreach & grant writing → more done with the same people.
9. **Scenario — Clothing store on the square** — Problem (can't keep up with marketing/social) → AI fix → result.
10. **Scenario — Insurance office** — Problem (buried in admin/paperwork) → AI fix → agents serve clients.
11. **Scenario — HVAC contractor** — Problem (after-hours leads go cold) → AI fix → no lost jobs.
12. **The turning point** — Reclaimed hours → better margins → **hire people for the tangible, physical, day-to-day work** → scale.
13. **The changed outcome** — Replay the failure stat, flipped: this business survives and grows.
14. **The economy angle** — Every Main Street business *and* public office doing this → more local jobs, money stays in Walker County, better services, Jasper scales and competes.
15. **Humans + AI (the honest part)** — AI doesn't replace people; it replaces the *tasks nobody has time for.* Humans + AI.
16. **Start small** — 3 things anyone in the room can try Monday morning.
17. **Vision close** — Jasper / Walker County as a model small town for the AI era.
18. **SC Creative + contact** — Soft authority: local, here to help. Name, contact.

The six scenarios (slides 6–11) share a repeatable visual template:
**who → the problem → the simple AI fix → hours/dollars reclaimed.** They deliberately
span the whole community — public sector (city, sheriff), non-profit, and business
(retail, insurance, trades) — so both the inspiration goal and the economy/civic goal
are carried by the same examples.

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

- **All six scenarios are invented but locally believable Walker County organizations**
  (not real clients/agencies) — spanning public sector (City of Jasper, Walker County
  Sheriff's Dept.), a non-profit, and businesses (clothing store, insurance, HVAC) — so
  everyone in the room sees their own world in them.
- Failure statistics presented as widely-cited/round figures, not precise claims.
- Copy written for the ear as much as the eye — short lines, one idea per slide,
  designed to *support* Sam speaking, not to be read verbatim.

## Success criteria

- A single HTML file that opens and presents flawlessly offline on a projector.
- Legible from the back of the room; one clear idea per slide.
- Follows the nervous → curious → inspired arc with the failure-stat throughline.
- Unmistakably SC Creative brand.
- Sam can tweak wording by editing plain text in the file.

## AI Showcase Layer (the "this IS AI" upgrade)

The deck must not merely *describe* AI — it must **be** a live demonstration of it, so Sam
can point at the screen and say "this is AI, right now." Four additions layer on top of the
16-slide structure without changing the narrative arc.

**Goal reframed:** the deck itself is the strongest proof point in the room. Wow first,
inspire second.

### 1. The Live Demo slide (hero / mic-drop)

A dedicated slide near the payoff section: *"Name a business. Any business in this room."*
Sam types what the audience shouts (e.g. "Joe's Barbecue") into an input and hits go. The
screen **streams out, live, word-by-word**: (a) three ready-to-post social captions, (b) a
calm reply to a nasty Google review, (c) an instant after-hours text-back to a customer.
Then his line: *"That took nine seconds. That's AI. Every business in this room can do that."*

- **Live mode (when an API key is present):** streams a real Claude completion via
  `fetch` to `https://api.anthropic.com/v1/messages`, `stream: true`, headers
  `x-api-key`, `anthropic-version: 2023-06-01`, `anthropic-dangerous-direct-browser-access: true`.
  Default model `claude-haiku-4-5` (lowest latency for stage use; one-line configurable).
- **Fallback mode (no key / offline / API error):** plays a **real, pre-authored Claude
  output** (bundled in the file) through the *same* streaming typewriter animation, so the
  beat never fails and is still honestly "AI output."
- The two modes are indistinguishable to the audience; the deck auto-selects at runtime.

### 2. Live "Ask the City of Jasper AI assistant" beat (second interactive punch)

On the City of Jasper scenario slide, a small chat box: Sam types a citizen question
("When's my trash picked up?") and it answers live. Same live/fallback architecture and a
short system prompt casting it as the city's assistant.

### 3. Ambient "alive" background

A subtle, slow generative **canvas animation** (drifting particle / neural-network field in
brand teal) behind every slide — pure JS, offline, low-opacity so text stays razor-legible.
Makes the whole deck *feel* intelligent, not static. Respects `prefers-reduced-motion`.

### 4. Self-typing text

Key headlines and all AI outputs type themselves in with a cursor, reinforcing "something is
thinking here." A shared typewriter utility drives both the scripted headlines and the live
stream.

### AI-layer technical constraints

- **Key handling:** the API key is read from a separate `config.js` (git-ignored, never
  committed). If absent, the deck runs in fallback mode. `config.js.example` documents the
  shape. Sam is advised to use a rate-limited/throwaway key and not to publish the raw file.
- **Still offline-first:** with no key and no internet, the entire deck — including both
  interactive beats — runs flawlessly on pre-authored content. Live mode is a pure upgrade.
- **Graceful failure:** any network/API error during a live beat silently falls back to the
  pre-authored stream mid-beat; the show never visibly breaks.
- **Latency UX:** a "thinking…" indicator shows while a live call is in flight; streaming
  begins as tokens arrive.

## Open questions / deferred

- Exact "3 things to try Monday" (slide 16) — drafted during build.
- Sam's contact details for the closing slide — to confirm before final.
- Whether Sam supplies an API key for true-live mode (deck ships working without one).
