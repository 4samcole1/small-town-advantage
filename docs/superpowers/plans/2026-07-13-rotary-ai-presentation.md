# Rotary of Jasper AI Presentation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single self-contained HTML slide deck (~18 slides) for Sam Cole's 30-minute Rotary of Jasper talk on local marketing + AI.

**Architecture:** One `index.html` file with all CSS and JS inline. A tiny vanilla-JS slide engine (keyboard/click nav, fullscreen, slide counter) drives full-viewport `<section class="slide">` elements. Each slide is hand-authored HTML using a shared brand CSS system. No build step, no dependencies, must render fully **offline** on a projector.

**Tech Stack:** Plain HTML5 + CSS3 (custom properties, flexbox/grid) + vanilla JS. Google Fonts (Montserrat/Poppins) with system-sans fallback for offline. SC Creative `logo-white.png` bundled locally.

## Global Constraints

- **Single file:** all CSS/JS inline in `index.html`. No external JS/CSS dependencies. (Fonts are the only remote asset, and must degrade gracefully offline.)
- **Offline-first:** deck must present flawlessly with no internet. Fonts fall back to system sans; logo referenced from a local `assets/` copy, not a remote URL.
- **Aspect ratio:** 16:9, responsive-scaling to any projector/laptop resolution.
- **Legibility:** large type, high contrast, one idea per slide, readable from the back of a hall.
- **Brand tokens (exact):** bg `#070d17`, deep-bg `#020617`, surface `#0b1520`, surface-elevated `#071426`, teal `#1cc7c3`, teal-accent `#0EB1AB`, gold `#c8921a`, text `#e8eef4`, text-neutral `#CBD5E1`, text-muted `#94A3B8`, soft-border `rgba(255,255,255,0.08)`, teal-glow `rgba(14,177,171,0.15)`.
- **Fonts:** Montserrat (headings), Poppins (body); fallback `ui-sans-serif, system-ui, sans-serif`.
- **Nav:** `←`/`→`, spacebar (advance), click zones (left third = back, right two-thirds = forward), `F` = fullscreen. Persistent slide counter (e.g. `4 / 18`).
- **Content:** all six scenarios invented but locally believable; failure stats framed as widely-cited round figures; copy written for the ear (short lines, supports Sam speaking).
- **Verification:** each task is verified by opening `index.html` in a browser (macOS: `open index.html`) and, where relevant, testing offline by disabling Wi-Fi.

---

### Task 1: Project scaffold, brand CSS system, and slide engine

**Files:**
- Create: `index.html`
- Create: `assets/logo-white.png` (copied from SC Creative site)
- Verify: open in browser

**Interfaces:**
- Produces: the `.slide` section pattern, `:root` CSS custom properties (all brand tokens above), the JS slide engine (functions `goTo(n)`, `next()`, `prev()`, `toggleFullscreen()`), and reusable component classes: `.slide`, `.slide__eyebrow`, `.slide__title`, `.slide__body`, `.deck-counter`, `.deck-nav`. Every later task adds `<section class="slide">` blocks and relies on these.

- [ ] **Step 1: Copy the logo asset**

```bash
mkdir -p ~/"Ai Sites/rotary-ai-presentation/assets"
cp ~/"Ai Sites/sc-creative/public/images/logo-white.png" ~/"Ai Sites/rotary-ai-presentation/assets/logo-white.png"
ls -la ~/"Ai Sites/rotary-ai-presentation/assets/"
```
Expected: `logo-white.png` present in `assets/`.

- [ ] **Step 2: Create `index.html` with head, brand tokens, base slide CSS, and the engine**

Write the full document skeleton:
- `<head>`: charset, viewport, `<title>The Small-Town Advantage — SC Creative</title>`, Google Fonts `<link>` for Montserrat + Poppins (with graceful offline fallback in CSS), and a single inline `<style>`.
- `<style>` must define, at minimum:
  - `:root` with every brand token from Global Constraints (`--bg`, `--deep-bg`, `--surface`, `--surface-elevated`, `--teal`, `--teal-accent`, `--gold`, `--text`, `--text-neutral`, `--text-muted`, `--soft-border`, `--teal-glow`).
  - `--font-heading: 'Montserrat', ui-sans-serif, system-ui, sans-serif;` and `--font-body: 'Poppins', ui-sans-serif, system-ui, sans-serif;`
  - Reset: `* { margin:0; padding:0; box-sizing:border-box; }`
  - `body { background: var(--deep-bg); color: var(--text); font-family: var(--font-body); overflow:hidden; }`
  - `.slide` = full viewport (`width:100vw; height:100vh;`), `display:none; flex-direction:column; justify-content:center;` generous padding (e.g. `padding: 8vh 10vw;`), and `.slide.active { display:flex; }`
  - Fluid type using `clamp()` so it scales to any projector: `.slide__title { font-family:var(--font-heading); font-weight:800; font-size:clamp(2.5rem,6vw,5rem); line-height:1.1; }`, `.slide__eyebrow { color:var(--teal); text-transform:uppercase; letter-spacing:.15em; font-weight:600; font-size:clamp(.9rem,1.5vw,1.2rem); margin-bottom:1.5rem; }`, `.slide__body { color:var(--text-neutral); font-size:clamp(1.2rem,2.4vw,2rem); line-height:1.5; max-width:55ch; }`
  - `.deck-counter { position:fixed; bottom:3vh; right:4vw; color:var(--text-muted); font-size:1rem; }`
  - `.deck-nav` prev/next zones (invisible clickable), `.deck-logo { position:fixed; top:4vh; left:4vw; height:5vh; opacity:.9; }`
- `<body>`: a `.deck-logo` `<img src="assets/logo-white.png" alt="SC Creative">`, one placeholder `<section class="slide active">` with an `.slide__title` reading "Slide engine works", a `.deck-counter`, and the nav zones.
- Inline `<script>` slide engine:

```html
<script>
  const slides = Array.from(document.querySelectorAll('.slide'));
  let current = 0;
  const counter = document.querySelector('.deck-counter');
  function render() {
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    counter.textContent = (current + 1) + ' / ' + slides.length;
  }
  function goTo(n) { current = Math.max(0, Math.min(slides.length - 1, n)); render(); }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { prev(); }
    else if (e.key.toLowerCase() === 'f') { toggleFullscreen(); }
  });
  document.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    (e.clientX < window.innerWidth / 3) ? prev() : next();
  });
  render();
</script>
```

- [ ] **Step 3: Verify in browser**

```bash
open ~/"Ai Sites/rotary-ai-presentation/index.html"
```
Expected: dark navy screen, white SC Creative logo top-left, "Slide engine works" centered, counter reads `1 / 1`. Pressing `F` toggles fullscreen. Clicking does nothing yet (only 1 slide).

- [ ] **Step 4: Verify offline behavior**

Turn off Wi-Fi, reload the file. Expected: still renders correctly; text falls back to system sans (no broken layout), logo still shows.

- [ ] **Step 5: Commit**

```bash
cd ~/"Ai Sites/rotary-ai-presentation" && git add -A && git commit -m "feat: scaffold deck with brand system and slide engine"
```

---

### Task 2: Opening slides (1–5) — title, fear hook, hard truth, big idea, what AI is

**Files:**
- Modify: `index.html` (replace placeholder slide; add slides 1–5)

**Interfaces:**
- Consumes: `.slide`, `.slide__eyebrow`, `.slide__title`, `.slide__body`, `.deck-counter` from Task 1.
- Produces: title slide markup and the opening arc. Later tasks append scenario slides after slide 5.

- [ ] **Step 1: Replace the placeholder with slides 1–5**

Author five `<section class="slide">` blocks (first one keeps `active`):
1. **Title:** eyebrow "SC Creative · Rotary Club of Jasper"; title "The Small-Town Advantage"; body subtitle "How AI Levels the Playing Field for Jasper." Gold underline accent on the title.
2. **Fear hook:** big centered question — "\"Isn't AI going to replace us?\"" — small body line beneath: "Let's start with the fear everyone in this room already has."
3. **The hard truth:** eyebrow "The reality"; title "Half are gone by year five."; body listing the widely-cited figures (≈1 in 5 fail in year one, ≈50% by year five, ≈65% by year ten) and the *why* — "Not because the owner wasn't talented. Because they drowned in the busywork and never got to work *on* the business." Use a `.stat-row` of three large gold/teal numbers (`20%` / `50%` / `65%`) with labels beneath.
4. **The big idea:** eyebrow "The shift"; title "For the first time, small can compete with big."; body — a Walker County shop, a city office, a two-person non-profit can now afford the same leverage as an organization 100× its size.
5. **What AI actually is:** eyebrow "In plain English"; title "A very smart assistant that never sleeps."; body — no jargon; "It reads, writes, answers, and organizes — instantly, around the clock — so you and your people don't have to."

Add a small reusable `.stat-row`/`.stat` CSS block for slide 3 (three columns, big `clamp()` numbers in teal/gold, muted labels).

- [ ] **Step 2: Verify in browser**

Reload; arrow through slides 1→5. Expected: counter shows `1 / 5`; each renders centered, legible, on-brand; stat numbers on slide 3 are large and colored.

- [ ] **Step 3: Commit**

```bash
cd ~/"Ai Sites/rotary-ai-presentation" && git add -A && git commit -m "feat: add opening slides (title, fear, stakes, big idea, what AI is)"
```

---

### Task 3: The six scenario slides (6–11) with a shared template

**Files:**
- Modify: `index.html` (add scenario CSS component + six scenario slides)

**Interfaces:**
- Consumes: base slide classes from Task 1.
- Produces: a `.scenario` layout component reused by all six slides; scenario slides appended after slide 5.

- [ ] **Step 1: Add the `.scenario` CSS component**

A consistent template per scenario: a header row (icon/emoji + organization name as `.slide__title`), then a 3-part flow — **The problem** → **The AI fix** → **The payoff (hours/dollars reclaimed)** — as three stacked or side-by-side `.scenario__step` cards on `var(--surface)` with `1px solid var(--soft-border)`, the payoff card accented with teal border + `var(--teal-glow)` box-shadow. Include a `.scenario__label` (teal eyebrow) reading "The problem / The fix / The result".

- [ ] **Step 2: Author the six scenario slides**

Each uses the same template, invented-but-believable, with a concrete reclaimed-hours/result payoff:

6. **City of Jasper** — Problem: residents flood the office with the same questions (trash pickup, permits, payments). Fix: an AI assistant on the city website + phone answers instantly, 24/7. Result: staff freed from repetitive calls to do real work — "like adding a full-time clerk without adding payroll."
7. **Walker County Sheriff's Department** — Problem: deputies spend hours writing reports instead of patrolling. Fix: AI drafts incident reports from their notes/dictation. Result: "Hours of paperwork back every shift — more deputies on the street, not behind a desk."
8. **Local non-profit** — Problem: a two-person team, big mission, no time for outreach or grants. Fix: AI drafts newsletters, social posts, and first-pass grant applications. Result: "The reach of a 10-person team with the staff of two."
9. **Clothing store on the square** — Problem: owner can't keep up with posting, promos, product descriptions. Fix: AI writes a week of social posts and product copy in minutes. Result: "Consistent marketing without hiring an agency — and foot traffic follows."
10. **Insurance office** — Problem: agents buried in admin, quotes, follow-ups. Fix: AI handles first-draft emails, summaries, and reminders. Result: "Agents back to selling and serving clients — not shuffling paper."
11. **HVAC contractor** — Problem: after-hours calls go to voicemail and the lead calls the next company. Fix: AI answers, books, and texts back instantly, day or night. Result: "Not one more job lost to a missed call."

- [ ] **Step 3: Verify in browser**

Reload; arrow 6→11. Expected: counter `6/11` region correct; all six share an identical, clean template; payoff card visually pops (teal glow); readable from a distance.

- [ ] **Step 4: Commit**

```bash
cd ~/"Ai Sites/rotary-ai-presentation" && git add -A && git commit -m "feat: add six community scenario slides"
```

---

### Task 4: Turn, payoff, economy, and honest slides (12–15)

**Files:**
- Modify: `index.html` (add slides 12–15)

**Interfaces:**
- Consumes: base slide classes + `.stat-row` from Task 2.
- Produces: the arc's turning point and civic close setup.

- [ ] **Step 1: Author slides 12–15**

12. **The turning point:** eyebrow "What happens next"; title "The hours come back. Then the margins. Then the people."; body — a visual chain: reclaimed hours → healthier margins → **hire real people for the hands-on work AI can't do** → the business scales. Render the chain as `.chain` of arrow-linked pills.
13. **The changed outcome:** replay the failure stat, flipped. Reuse `.stat-row` but recolor to teal and change labels — "survives," "grows," "hires" — with title "Now watch the same business… survive." Body: "Same owner. Same town. Different ending."
14. **The economy angle:** eyebrow "Why this matters for Jasper"; title "When Main Street rises, the whole town rises."; body — every business *and* public office doing this → more local jobs, money stays in Walker County, better public services, Jasper competes with Birmingham.
15. **Humans + AI (honest part):** eyebrow "The honest part"; title "AI doesn't replace people. It replaces the tasks nobody has time for."; body — "The human work — the handshake, the craft, the care — is exactly what this frees you to do more of."

- [ ] **Step 2: Verify in browser**

Reload; arrow 12→15. Expected: chain on slide 12 reads left-to-right; slide 13 stat-row is teal and mirrors slide 3; all legible.

- [ ] **Step 3: Commit**

```bash
cd ~/"Ai Sites/rotary-ai-presentation" && git add -A && git commit -m "feat: add turning point, flipped outcome, economy, and humans+AI slides"
```

---

### Task 5: Closing slides (16–18) — start small, vision, SC Creative

**Files:**
- Modify: `index.html` (add slides 16–18)

**Interfaces:**
- Consumes: base slide classes.
- Produces: the "Start Monday" checklist, vision close, and contact slide.

- [ ] **Step 1: Author slides 16–18**

16. **Start small:** eyebrow "Try this Monday"; title "Three things you can do this week."; body as a numbered `.start-list` — (1) "Pick your most annoying repetitive task and ask an AI tool to do a first draft." (2) "Let AI answer your after-hours messages so no lead goes cold." (3) "Ask it to write one week of your marketing — then edit, don't start from scratch." Keep each to one plain sentence.
17. **Vision close:** full-bleed statement slide — title "Jasper doesn't have to catch up. Jasper can lead."; body — "A model small town for the AI era. It starts with the people in this room." Gold accent.
18. **SC Creative + contact:** SC Creative white logo (larger, centered), eyebrow "Local, and here to help."; body — a soft one-liner ("If you ever want to talk through what this looks like for your business — I'm right here in Walker County."). Contact line placeholder `[Sam Cole · sam@samcolecreative.com · phone]` to confirm with Sam before final.

- [ ] **Step 2: Verify full run in browser**

Reload; arrow through all 18 slides start to finish. Expected: counter ends `18 / 18`; arc flows; no layout breaks; logo on 18 renders.

- [ ] **Step 3: Commit**

```bash
cd ~/"Ai Sites/rotary-ai-presentation" && git add -A && git commit -m "feat: add closing slides (start small, vision, contact)"
```

---

### Task 6: Polish, offline hardening, and full dress rehearsal

**Files:**
- Modify: `index.html` (transitions, progress bar, responsive checks)

**Interfaces:**
- Consumes: everything.
- Produces: final presentation-ready deck.

- [ ] **Step 1: Add subtle polish**

- A slide fade/slide-in transition (CSS `opacity`/`transform` on `.slide.active`, ~250ms) — subtle, not distracting.
- A thin top progress bar reflecting `current / slides.length` (teal fill), updated in `render()`.
- Ensure the click-nav ignores clicks on the contact link (`e.target.closest('a')` guard already present) so the email link is clickable.

- [ ] **Step 2: Responsive / projector check**

Resize the browser window to several aspect ratios (16:9, 16:10, 4:3) and a small laptop width. Expected: `clamp()` type stays legible, nothing clips or overflows, logo/counter stay in place.

- [ ] **Step 3: Offline dress rehearsal**

Turn off Wi-Fi. Reload and click through all 18 slides in fullscreen. Expected: full deck presents perfectly offline; only change is system-font fallback. Fix any slide that depends on the network.

- [ ] **Step 4: Final commit**

```bash
cd ~/"Ai Sites/rotary-ai-presentation" && git add -A && git commit -m "feat: polish, transitions, progress bar, offline hardening"
```

---

## Self-Review

**Spec coverage:** All 18 spec slides map to tasks (1–5 → Task 2; 6–11 → Task 3; 12–15 → Task 4; 16–18 → Task 5; engine/brand/offline → Tasks 1 & 6). Goals inspiration + economy carried by scenario span and slides 14/17. Brand tokens, offline-first, nav, legibility all covered in Global Constraints + tasks.

**Placeholder scan:** Two intentional, spec-tracked deferrals remain and are flagged for Sam, not the engineer: the exact contact line (slide 18) and any wording tweaks. The "3 things Monday" copy is now written in Task 5. No un-actioned TODOs.

**Type consistency:** Engine functions (`goTo`, `next`, `prev`, `toggleFullscreen`, `render`) and CSS classes (`.slide`, `.slide__eyebrow`, `.slide__title`, `.slide__body`, `.scenario`, `.stat-row`, `.chain`, `.start-list`, `.deck-counter`, `.deck-logo`) are named consistently across tasks.
