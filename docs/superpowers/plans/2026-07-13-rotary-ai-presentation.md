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

## AI Showcase Layer

These tasks add the "this IS AI" layer on top of the finished 18-slide deck. New Global
Constraint for all AI-layer tasks: **the deck must still run flawlessly with no `config.js`
and no internet** — live mode is a pure upgrade, and every live beat falls back to
pre-authored real Claude output through the same animation.

### Task 7: AI engine — config, streaming client, typewriter, fallback

**Files:**
- Create: `config.js.example`
- Modify: `.gitignore` (add `config.js`)
- Modify: `index.html` (add the AI engine `<script>` block + a `<script src="config.js">` optional include)

**Interfaces:**
- Produces:
  - global `AI_CONFIG` (from `config.js` if present, else a safe default `{apiKey: "", model: "claude-haiku-4-5"}`)
  - `typewriter(el, text, {speed, cursor})` → Promise that types `text` into `el` char-by-char
  - `aiStream(messages, {system, onToken})` → async fn that, when `AI_CONFIG.apiKey` is set, streams a real Claude completion token-by-token via `onToken`; otherwise rejects so callers use fallback
  - `runAIBeat(el, {messages, system, fallbackText})` → orchestrates: show "thinking…", try `aiStream` live, and on any failure/no-key type out `fallbackText` via `typewriter`. Always resolves.

- [ ] **Step 1: Add `config.js.example` and gitignore `config.js`**

`config.js.example`:
```javascript
// Rename to config.js to enable TRUE LIVE AI on stage.
// Use a rate-limited / throwaway Anthropic key. Do NOT publish index.html with a real key embedded.
window.AI_CONFIG = {
  apiKey: "sk-ant-...", // your Anthropic API key
  model:  "claude-haiku-4-5", // fastest for live stage use; swap to claude-sonnet-5 for more polish
};
```
Append `config.js` to `.gitignore`.

- [ ] **Step 2: Add the optional config include in `index.html` `<head>` (after the fonts)**

```html
<script>window.AI_CONFIG = window.AI_CONFIG || { apiKey: "", model: "claude-haiku-4-5" };</script>
<script src="config.js" onerror="/* no config.js — fallback mode */"></script>
```
(The inline default runs first; if `config.js` exists it overwrites `window.AI_CONFIG`.)

- [ ] **Step 3: Add the AI engine to the inline `<script>` (before the slide engine)**

```javascript
const AI = (window.AI_CONFIG || { apiKey: "", model: "claude-haiku-4-5" });

// Type `text` into `el` one character at a time. Returns a Promise.
function typewriter(el, text, opts = {}) {
  const speed = opts.speed ?? 18;               // ms per char
  el.classList.add('typing');
  el.textContent = '';
  return new Promise(resolve => {
    let i = 0;
    (function tick() {
      if (i >= text.length) { el.classList.remove('typing'); return resolve(); }
      el.textContent += text[i++];
      setTimeout(tick, speed);
    })();
  });
}

// Live streaming call to Claude. Rejects if no key so callers can fall back.
async function aiStream(messages, { system, onToken } = {}) {
  if (!AI.apiKey) throw new Error('no-key');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': AI.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: AI.model || 'claude-haiku-4-5',
      max_tokens: 1024,
      stream: true,
      system: system || undefined,
      messages,
    }),
  });
  if (!res.ok || !res.body) throw new Error('api-' + res.status);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split('\n');
    buf = lines.pop();
    for (const line of lines) {
      if (!line.startsWith('data:')) continue;
      const data = line.slice(5).trim();
      if (!data || data === '[DONE]') continue;
      try {
        const evt = JSON.parse(data);
        if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
          onToken?.(evt.delta.text);
        }
      } catch (_) { /* ignore partial */ }
    }
  }
}

// Orchestrate one AI beat: live when possible, real-cached fallback otherwise.
async function runAIBeat(el, { messages, system, fallbackText }) {
  el.classList.add('ai-thinking');
  el.textContent = 'Thinking…';
  try {
    let first = true;
    await aiStream(messages, {
      system,
      onToken: t => { if (first) { el.textContent = ''; el.classList.remove('ai-thinking'); first = false; } el.textContent += t; },
    });
    el.classList.remove('ai-thinking');
  } catch (_) {
    el.classList.remove('ai-thinking');
    await new Promise(r => setTimeout(r, 500)); // brief "thinking" beat
    await typewriter(el, fallbackText, { speed: 12 });
  }
}
```

- [ ] **Step 4: Verify**

Open `index.html` (no `config.js`). Expected: page still loads, no console errors, `typeof runAIBeat === 'function'`. Grep-confirm the three functions exist and `anthropic-dangerous-direct-browser-access` is present. `config.js` is gitignored (`git status` must not list it if created).

- [ ] **Step 5: Commit**
```bash
cd ~/"Ai Sites/rotary-ai-presentation" && git add -A && git commit -m "feat: AI engine — streaming client, typewriter, real-cached fallback"
```

---

### Task 8: Ambient generative background + self-typing headlines

**Files:**
- Modify: `index.html` (canvas element, canvas animation script, hook typewriter into title slides)

**Interfaces:**
- Consumes: `typewriter` (Task 7), the slide engine's `render()` (Task 1/6).
- Produces: a full-viewport `<canvas id="bg-canvas">` behind all slides; a `data-typewriter` attribute convention that makes flagged headlines self-type when their slide activates.

- [ ] **Step 1: Add the canvas + CSS**

Add `<canvas id="bg-canvas" aria-hidden="true"></canvas>` as the first element in `<body>`. CSS: `position:fixed; inset:0; z-index:0; pointer-events:none;` and ensure `.slide { position:relative; z-index:1; }` so slides sit above it.

- [ ] **Step 2: Add the particle/neural-net animation script**

A lightweight canvas animation: ~60 slowly drifting nodes in `rgba(28,199,195,…)` (brand teal) with faint lines between nearby nodes. Cap opacity low (~0.25) so text stays legible. Wrap the whole animation in a `prefers-reduced-motion` check — if reduced motion is requested, draw one static frame and stop. Handle window resize. Use `requestAnimationFrame`. Keep nodes/lines subtle.

- [ ] **Step 3: Self-typing headlines**

Add support so any element with `data-typewriter` types its text when its slide becomes active. In `render()`, after toggling `.active`, find `.slide.active [data-typewriter]:not(.typed)` and call `typewriter(el, el.dataset.text || el.textContent)` then mark `.typed` (store original text in `data-text` up front so re-visits don't re-scramble). Apply `data-typewriter` to the **title slide** headline and the **fear-hook** headline only (over-using it slows the talk).

- [ ] **Step 4: Verify**

Reload. Expected: subtle animated teal field behind slides; text fully legible; title + fear-hook headlines type themselves in on first view; re-visiting a slide doesn't wipe its text; reduced-motion setting freezes the background. No console errors.

- [ ] **Step 5: Commit**
```bash
cd ~/"Ai Sites/rotary-ai-presentation" && git add -A && git commit -m "feat: ambient generative background + self-typing headlines"
```

---

### Task 9: The Live Demo hero slide (marketing generator)

**Files:**
- Modify: `index.html` (insert a new slide + its wiring)

**Interfaces:**
- Consumes: `runAIBeat` (Task 7).
- Produces: a new `.slide` placed right BEFORE slide 12 ("The turning point") so it lands at the payoff. Note: this shifts later slide numbers by one (deck becomes 19 slides — acceptable; the counter auto-updates).

- [ ] **Step 1: Author the Live Demo slide**

Insert a `<section class="slide slide--demo">` with: eyebrow "Live — right now"; title "Name a business. Any business in this room."; a form row with a text `<input id="demo-input" placeholder="e.g. Joe's Barbecue">` and a `<button id="demo-go">Watch AI go →</button>`; and an output area with three labeled cards (`.demo-out` blocks): "This week's social posts", "Reply to a bad review", "After-hours text back". Each card has an inner `<div class="demo-stream">` target.

- [ ] **Step 2: Wire the demo**

On `#demo-go` click (and Enter in the input), read the business name (default "Joe's Barbecue" if blank), then for each of the three cards call `runAIBeat(streamEl, {...})`:
- Social: system "You are a friendly small-business marketing assistant. Write 3 short, punchy, ready-to-post social media captions (with a relevant emoji each) for the business named by the user. No preamble — just the 3 captions." ; messages `[{role:'user', content: businessName}]`.
- Review reply: system "Write a calm, professional, warm reply to a hypothetical 1-star Google review for the named local business. 3-4 sentences. No preamble." ; message = businessName.
- SMS: system "Write a short, warm after-hours text message auto-reply from the named local business to a customer who just messaged after closing. 2 sentences. No preamble." ; message = businessName.

Each card also has a hand-written **`fallbackText`** — real, on-brand example output for "Joe's Barbecue" — so with no key it still streams believable content. (Write these fallbacks in the file; make them genuinely good.)

Run the three beats concurrently (`Promise.all`) so the whole thing lands in seconds. Disable the button while running; re-enable after.

- [ ] **Step 3: Verify**

Reload; navigate to the demo slide. With no key: clicking "Watch AI go" streams the three fallback outputs with the thinking→typewriter effect. Input + Enter works. Layout fits 16:9, legible. No console errors. (If a test key is placed in `config.js`, confirm it streams live instead — but do not commit `config.js`.)

- [ ] **Step 4: Commit**
```bash
cd ~/"Ai Sites/rotary-ai-presentation" && git add -A && git commit -m "feat: live AI demo slide (marketing generator)"
```

---

### Task 10: City of Jasper live assistant + final dress rehearsal

**Files:**
- Modify: `index.html` (add the mini-chat to the City of Jasper scenario slide; final checks)

**Interfaces:**
- Consumes: `runAIBeat` (Task 7).
- Produces: an "Ask the city's AI assistant" chat box on the City of Jasper slide.

- [ ] **Step 1: Add the chat box to the City of Jasper slide**

Below the scenario cards on the City of Jasper slide, add a compact chat: a text `<input id="city-input" placeholder="Ask the city's AI assistant…">`, a `<button id="city-go">Ask</button>`, and a `<div class="city-answer">` stream target. Keep it small so it doesn't crowd the slide.

- [ ] **Step 2: Wire it**

On ask (click or Enter), call `runAIBeat(answerEl, {system, messages, fallbackText})`:
- system: "You are the friendly AI assistant for the City of Jasper, Alabama. Answer citizen questions helpfully and briefly (2-3 sentences), in a warm municipal tone. If you don't know a specific local detail, give a helpful general answer and point them to city hall."
- messages: `[{role:'user', content: question}]` (default question "When is my trash picked up?" if blank).
- `fallbackText`: a real, warm sample answer about trash pickup that reads as if the city assistant wrote it.

- [ ] **Step 3: Final full dress rehearsal**

Reload with no `config.js`, Wi-Fi off. Click through ALL slides start to finish in fullscreen. Confirm: ambient background animates; headlines self-type; the Live Demo slide streams all three fallbacks; the City assistant answers from fallback; nothing errors; nothing depends on the network. Then resize to 16:9 / 16:10 / 4:3 and confirm legibility. Fix anything that breaks.

- [ ] **Step 4: Commit**
```bash
cd ~/"Ai Sites/rotary-ai-presentation" && git add -A && git commit -m "feat: City of Jasper live assistant + final AI-layer dress rehearsal"
```

---

## Self-Review

**Spec coverage:** All 18 spec slides map to tasks (1–5 → Task 2; 6–11 → Task 3; 12–15 → Task 4; 16–18 → Task 5; engine/brand/offline → Tasks 1 & 6). Goals inspiration + economy carried by scenario span and slides 14/17. Brand tokens, offline-first, nav, legibility all covered in Global Constraints + tasks.

**Placeholder scan:** Two intentional, spec-tracked deferrals remain and are flagged for Sam, not the engineer: the exact contact line (slide 18) and any wording tweaks. The "3 things Monday" copy is now written in Task 5. No un-actioned TODOs.

**Type consistency:** Engine functions (`goTo`, `next`, `prev`, `toggleFullscreen`, `render`) and CSS classes (`.slide`, `.slide__eyebrow`, `.slide__title`, `.slide__body`, `.scenario`, `.stat-row`, `.chain`, `.start-list`, `.deck-counter`, `.deck-logo`) are named consistently across tasks.
