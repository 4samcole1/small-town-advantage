# How Local Businesses Win Online — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-theme the existing Rotary deck into "How Local Businesses Win Online" — an SC Creative capabilities showcase for the Rotary Club of Jasper, built around SC Creative's real 5-pillar system with an SEO→AEO beat.

**Architecture:** Reuse the existing deck engine (`js/deck.js`, `js/active.js`, `js/ai-engine.js`, `js/local-data.js`, `js/background.js`) and design system (`css/deck.css`) unchanged where possible. Rewrite all slide content in `index.html`, add a handful of new components (scattered→connected, pillar ecosystem, AEO answer, client trust bar), repurpose the growth-curve and live-AI-demo, and swap in real client-logo assets.

**Tech Stack:** Vanilla HTML/CSS/JS, no build step. Verification via headless Google Chrome screenshots.

## Global Constraints

- **Big-screen, live, authority-soft.** Large type, uncluttered slides, warm not salesy.
- **Offline-capable.** No live API key required; the AI demo runs on the curated offline DB (`js/local-data.js`). Never introduce a hard network dependency for core content.
- **Palette (already in `css/deck.css`):** `--teal:#1cc7c3`, teal spectrum `#2adbd7 #13a9a6 #0b8b88 #056c6a`, dark navy ground, `--gold`, `--green`. Fonts Montserrat/Poppins.
- **Real content only.** Services come verbatim from SC Creative's 5-pillar model (below). Do not invent services or fake statistics.
- **Reuse existing classes** (`.slide`, `.slide__title`, `.slide__eyebrow`, `.slide__body`, `.slide--center`, `.slide--top`, `.scenario-header`, `.showcase`, `.showcase__left`, `.showcase__caps`, `.cap-grid`, `.cap`, `.mini-label`, `.ai-window`, `.chip-icon`, `.logo-chip`, `.title-for`, `.stat-row`/`.stat`, `.turnaround`/`.ta-*`, `.contact-line`, `.online-chip`, `data-typewriter`, `data-countup`, `data-clock`). Only add new classes where a genuinely new component is needed.

### SC Creative 5 pillars (source of truth)

| # | Pillar | Tag | Essence |
|---|---|---|---|
| 01 | Blueprint | Clarity & Strategy | Positioning, messaging, market clarity — before anything's built |
| 02 | Branding | Identity & Graphic Design | Logo → full brand system; consistent, scalable |
| 03 | Website | Design & Build | Custom, fast, converts |
| 04 | AI Systems | Automate & Scale | Workflows, automations, integrations, dashboard |
| 05 | Growth | Traffic & Revenue | SEO, paid ads, content — + AEO |

### Verification method (used by every task)

Screenshot a given slide index headless and eyeball it; also grep the console for errors. Helper (run from repo root, `~/Ai Sites/rotary-ai-presentation`):

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
shot() {  # shot <slideIndex> <outName> [virtualMs]
  local idx="$1" name="$2" vt="${3:-6000}"
  local d="/tmp/deckshot/$name"; rm -rf "$d"; mkdir -p "$d"
  cp -R css assets index.html "$d/"; cp -R js "$d/js"
  perl -0pi -e "s/let current = 0;/let current = $idx;/" "$d/js/deck.js"
  "$CHROME" --headless=new --disable-gpu --window-size=1600,900 \
    --virtual-time-budget=$vt --screenshot="/tmp/deckshot/$name.png" \
    "file://$d/index.html" >/dev/null 2>&1
  echo "/tmp/deckshot/$name.png"
}
```
Then Read the PNG to verify. Console check: run Chrome with `--enable-logging=stderr --dump-dom` and `grep -iE 'Uncaught|is not defined|SyntaxError|TypeError'`.

---

### Task 0: Preserve the Rotary deck + set up work

**Files:** none created; git only.

- [ ] **Step 1: Tag the current Rotary deck**

```bash
cd ~/"Ai Sites/rotary-ai-presentation"
git tag rotary-small-town-advantage 7927b10 -m "Rotary 'Small-Town Advantage' deck, final state before SC Creative re-theme"
git tag --list | grep rotary
```
Expected: `rotary-small-town-advantage` listed.

- [ ] **Step 2: Confirm working branch is `build-deck` and clean**

```bash
git branch --show-current   # build-deck
git status --short          # empty
```

- [ ] **Step 3: Commit (no-op marker via the spec already committed)** — nothing to commit; proceed.

---

### Task 1: Opening slides 1–4 (title, reality, scattered, shift)

**Files:**
- Modify: `index.html` (slides 1–4 markup)
- Modify: `css/deck.css` (add `.scatter` / `.assemble` component)

**Interfaces:**
- Consumes: existing `.slide`, `data-typewriter`, `data-countup`, `.title-for`, `.slide--center`.
- Produces: `.scatter` (scattered pieces visual) and `.scatter--connected` (assembled state) used only on slides 3–4.

- [ ] **Step 1: Rewrite slide 1 (title) markup**

Replace the title slide `<section>` body with:
```html
<p class="slide__eyebrow">SC Creative &middot; Prepared for Rotary Club of Jasper</p>
<h1 class="slide__title grad" data-typewriter data-text="How Local Businesses Win Online">How Local Businesses Win Online</h1>
<div class="title-underline"></div>
<p class="slide__body">The system behind a business people find, trust, and choose.</p>
<div class="title-for">
  <span class="title-for__label">Prepared for</span>
  <span class="title-for__logo"><img src="assets/rotary.png" alt="Rotary Club of Jasper"></span>
</div>
```

- [ ] **Step 2: Rewrite slide 2 (reality, count-up)**

```html
<section class="slide">
  <p class="slide__eyebrow">The reality</p>
  <h1 class="slide__title">People decide online &mdash; before they ever call.</h1>
  <div class="stat-row">
    <div class="stat stat--decline1"><div class="stat__number" data-countup="81" data-suffix="%">0%</div><div class="stat__bar"></div><div class="stat__label">research online before they buy</div></div>
    <div class="stat stat--decline2"><div class="stat__number" data-countup="88" data-suffix="%">0%</div><div class="stat__bar"></div><div class="stat__label">trust reviews as much as a friend</div></div>
    <div class="stat stat--decline3"><div class="stat__number" data-countup="75" data-suffix="%">0%</div><div class="stat__bar"></div><div class="stat__label">judge your credibility by your website</div></div>
  </div>
  <p class="slide__body">If they can&rsquo;t find you &mdash; or they don&rsquo;t like what they see &mdash; you never even get the call.</p>
</section>
```
(These are widely-cited industry figures; Sam may adjust the numbers/labels.)

- [ ] **Step 3: Add `.scatter` CSS**

Append to `css/deck.css`:
```css
/* Scattered → connected online presence */
.scatter { position: relative; width: 100%; height: 30vh; margin: 2rem 0 1rem; }
.scatter__piece {
  position: absolute; display: flex; align-items: center; gap: .6rem;
  background: var(--glass); border: 1px solid var(--hair); border-radius: 12px;
  padding: .8rem 1.1rem; font-family: var(--font-heading); font-weight: 600;
  color: var(--text-neutral); font-size: clamp(.8rem, 1.15vw, 1rem);
  box-shadow: 0 12px 30px rgba(0,0,0,.3); backdrop-filter: blur(10px);
}
.scatter__piece .ic { font-size: 1.2rem; }
/* scattered positions (tilted, disconnected) */
.scatter__piece:nth-child(1){ left:4%;  top:8%;  transform: rotate(-6deg); }
.scatter__piece:nth-child(2){ left:62%; top:2%;  transform: rotate(5deg); }
.scatter__piece:nth-child(3){ left:24%; top:52%; transform: rotate(3deg); }
.scatter__piece:nth-child(4){ left:70%; top:56%; transform: rotate(-4deg); }
.scatter__piece:nth-child(5){ left:40%; top:26%; transform: rotate(-2deg); opacity:.85; }
/* connected state: neat row + teal edge + connector line */
.scatter--connected .scatter__piece { transition: all .9s var(--ease); border-left: 3px solid var(--teal); transform: none; opacity: 1; top: 40%; }
.scatter--connected .scatter__piece:nth-child(1){ left:2%; }
.scatter--connected .scatter__piece:nth-child(2){ left:21.5%; }
.scatter--connected .scatter__piece:nth-child(3){ left:41%; }
.scatter--connected .scatter__piece:nth-child(4){ left:60.5%; }
.scatter--connected .scatter__piece:nth-child(5){ left:80%; opacity:1; }
.scatter--connected::before { content:""; position:absolute; left:2%; right:2%; top:calc(40% + 1.4rem); height:2px; background:linear-gradient(90deg, transparent, var(--teal), transparent); }
```

- [ ] **Step 4: Rewrite slide 3 (scattered problem)**

```html
<section class="slide">
  <p class="slide__eyebrow">The problem</p>
  <h1 class="slide__title">Most local businesses are <span class="k">scattered</span> online.</h1>
  <div class="scatter">
    <div class="scatter__piece"><span class="ic">🌐</span>DIY website</div>
    <div class="scatter__piece"><span class="ic">📘</span>Stale Facebook page</div>
    <div class="scatter__piece"><span class="ic">📍</span>Unclaimed Google listing</div>
    <div class="scatter__piece"><span class="ic">🎨</span>Mismatched logos</div>
    <div class="scatter__piece"><span class="ic">🤷</span>No real plan</div>
  </div>
  <p class="slide__body">A website here, a Facebook page there, a Google listing nobody&rsquo;s touched. Pieces that don&rsquo;t talk to each other &mdash; and don&rsquo;t add up.</p>
</section>
```

- [ ] **Step 5: Rewrite slide 4 (the shift) — same pieces, connected**

```html
<section class="slide">
  <p class="slide__eyebrow">The shift</p>
  <h1 class="slide__title">The businesses that win treat it as <span class="k">one connected system</span>.</h1>
  <div class="scatter scatter--connected">
    <div class="scatter__piece"><span class="ic">🧭</span>Strategy</div>
    <div class="scatter__piece"><span class="ic">🎨</span>Brand</div>
    <div class="scatter__piece"><span class="ic">🌐</span>Website</div>
    <div class="scatter__piece"><span class="ic">🤖</span>AI</div>
    <div class="scatter__piece"><span class="ic">📈</span>Growth</div>
  </div>
  <p class="slide__body">Not scattered parts &mdash; a system where every piece pulls in the same direction. <span class="k">That&rsquo;s what we build.</span></p>
</section>
```

- [ ] **Step 6: Verify slides 1–4**

Screenshot indices 0,1,2,3 (title, reality, scattered, shift) and Read each PNG. Confirm: title self-types + Rotary mark; count-ups render; scattered pieces tilted/disconnected on 3; connected row + connector line on 4. Console clean.

- [ ] **Step 7: Commit**

```bash
git add index.html css/deck.css
git commit -m "feat(deck): SC Creative open — title, reality, scattered→connected"
```

---

### Task 2: System overview (slide 5) — 5-pillar ecosystem

**Files:**
- Modify: `index.html` (slide 5)
- Modify: `css/deck.css` (`.ecosystem` grid)

**Interfaces:**
- Produces: `.ecosystem`, `.eco-pillar` used only on slide 5.

- [ ] **Step 1: Add `.ecosystem` CSS**

```css
.ecosystem { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; width: 100%; margin: 2.2rem 0 1rem; }
.eco-pillar { background: var(--glass); border: 1px solid var(--hair); border-top: 3px solid var(--teal); border-radius: 14px; padding: 1.4rem 1.1rem; text-align: center; box-shadow: 0 14px 40px rgba(0,0,0,.3); }
.eco-pillar__num { font-family: var(--font-heading); font-weight: 800; font-size: .8rem; color: var(--teal); letter-spacing: .1em; }
.eco-pillar__name { font-family: var(--font-heading); font-weight: 800; font-size: clamp(1rem, 1.5vw, 1.35rem); color: var(--text); margin-top: .4rem; }
.eco-pillar__tag { color: var(--text-muted); font-size: clamp(.72rem, 1vw, .88rem); margin-top: .3rem; }
.slide.active .eco-pillar { animation: pop-in .5s var(--ease) both; }
.slide.active .eco-pillar:nth-child(1){animation-delay:.15s}
.slide.active .eco-pillar:nth-child(2){animation-delay:.30s}
.slide.active .eco-pillar:nth-child(3){animation-delay:.45s}
.slide.active .eco-pillar:nth-child(4){animation-delay:.60s}
.slide.active .eco-pillar:nth-child(5){animation-delay:.75s}
```
(Uses existing `@keyframes pop-in`.)

- [ ] **Step 2: Rewrite slide 5**

```html
<section class="slide">
  <p class="slide__eyebrow">The system</p>
  <h1 class="slide__title">Five connected pieces. <span class="k">One growth engine.</span></h1>
  <div class="ecosystem">
    <div class="eco-pillar"><div class="eco-pillar__num">01</div><div class="eco-pillar__name">Blueprint</div><div class="eco-pillar__tag">Clarity &amp; strategy</div></div>
    <div class="eco-pillar"><div class="eco-pillar__num">02</div><div class="eco-pillar__name">Branding</div><div class="eco-pillar__tag">Identity &amp; design</div></div>
    <div class="eco-pillar"><div class="eco-pillar__num">03</div><div class="eco-pillar__name">Website</div><div class="eco-pillar__tag">Design &amp; build</div></div>
    <div class="eco-pillar"><div class="eco-pillar__num">04</div><div class="eco-pillar__name">AI Systems</div><div class="eco-pillar__tag">Automate &amp; scale</div></div>
    <div class="eco-pillar"><div class="eco-pillar__num">05</div><div class="eco-pillar__name">Growth</div><div class="eco-pillar__tag">Traffic &amp; revenue</div></div>
  </div>
  <p class="slide__body">Every piece makes the next one stronger. Here&rsquo;s how each one works.</p>
</section>
```

- [ ] **Step 3: Verify** — screenshot index 4; confirm 5 pillars render in a row, teal top edge. Console clean.

- [ ] **Step 4: Commit**

```bash
git add index.html css/deck.css
git commit -m "feat(deck): system-overview ecosystem slide"
```

---

### Task 3: Pillar showcase slides 6, 7, 8, 10 (Blueprint, Branding, Website, Growth)

**Files:** Modify `index.html` (four scenario-style slides). Reuses existing `.showcase`/`.cap-grid`/`.cap`/`.mini-label` (no CSS changes).

**Interfaces:** Consumes existing showcase classes; uses numbered `.chip-icon` (text "01".."05") in the `.scenario-header`.

- [ ] **Step 1: Slide 6 — Blueprint**

```html
<section class="slide slide--top">
  <div class="scenario-header">
    <span class="chip-icon" aria-hidden="true">01</span>
    <h1 class="slide__title">Blueprint</h1>
    <span class="scenario-tag">Clarity &amp; Strategy</span>
  </div>
  <div class="showcase">
    <div class="showcase__left">
      <div class="showcase__challenge"><span class="mini-label">The challenge</span><p>Most businesses market before they&rsquo;re clear on who they are.</p></div>
      <div class="showcase__result"><span class="mini-label mini-label--teal">The result</span><p class="result-quote">&ldquo;You can&rsquo;t build growth on a guess. We start with the plan.&rdquo;</p></div>
    </div>
    <div class="showcase__caps">
      <span class="mini-label mini-label--teal">What Blueprint delivers</span>
      <div class="cap-grid">
        <div class="cap"><span class="cap__icon">🎯</span><div class="cap__text"><b>Positioning</b><span>Who you are &amp; why you win</span></div></div>
        <div class="cap"><span class="cap__icon">💬</span><div class="cap__text"><b>Messaging</b><span>Words that land with your market</span></div></div>
        <div class="cap"><span class="cap__icon">🔍</span><div class="cap__text"><b>Market clarity</b><span>Where the real opportunity is</span></div></div>
        <div class="cap"><span class="cap__icon">👥</span><div class="cap__text"><b>Audience</b><span>Exactly who you&rsquo;re talking to</span></div></div>
        <div class="cap"><span class="cap__icon">⚔️</span><div class="cap__text"><b>Competitive edge</b><span>What sets you apart</span></div></div>
        <div class="cap"><span class="cap__icon">🗺️</span><div class="cap__text"><b>The plan</b><span>A roadmap before we build</span></div></div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Slide 7 — Branding** (chip `02`, tag "Identity &amp; Graphic Design"): same structure. Caps: **Logo &amp; identity** (Marks that stick), **Brand guide** (Rules that keep it consistent), **Graphic design** (Social, print &amp; ads), **Color &amp; type** (A system, not guesses), **Brand assets** (Everything on-brand), **Consistency** (The same everywhere). Challenge: "Inconsistent branding quietly costs you trust every day." Result: "A brand that&rsquo;s consistent, scalable, and impossible to ignore."

- [ ] **Step 3: Slide 8 — Website** (chip `03`, tag "Design &amp; Build"). Caps: **Custom design** (Not a template), **Fast load** (Seconds matter), **Mobile-first** (Most visitors are on phones), **Built to convert** (Visitors → clients), **SEO-ready** (Findable from day one), **Easy to update** (You stay in control). Challenge: "An outdated, slow website makes a great business look small." Result: "A site that reflects the real quality of your business &mdash; and converts."

- [ ] **Step 4: Slide 10 — Growth** (chip `05`, tag "Traffic &amp; Revenue"). Caps: **SEO** (Get found on Google), **Paid ads** (Reach the right people fast), **Content** (Answer what they search), **Local visibility** (Own your area), **Reviews** (Reputation that sells), **Analytics** (Know what&rsquo;s working). Challenge: "Reactive marketing means competitors get found first." Result: "Visibility that compounds &mdash; locally and beyond."

(Note: slide 9 — AI Systems — is Task 4. Slide 11 — AEO — is Task 5. Growth is slide 10, placed before AEO.)

- [ ] **Step 5: Verify** — screenshot indices 5,6,7,9; Read PNGs; confirm each pillar header (numbered chip + name + tag), 6 caps, challenge + result. Console clean.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat(deck): pillar slides — Blueprint, Branding, Website, Growth"
```

---

### Task 4: AI Systems slide 9 + repurposed live demo

**Files:** Modify `index.html` (slide 9). Reuses `.ai-window`, `#demo-input`, `#demo-go`, `#demo-found`, `.demo-out` (`#demo-social`/`#demo-review`/`#demo-sms`) — the existing demo wiring in `js/deck.js` stays; only the surrounding copy changes.

**Interfaces:** Consumes existing demo IDs (must keep exact IDs so `wireDemo()` in `js/deck.js` still binds).

- [ ] **Step 1: Rewrite slide 9 — AI Systems (top-aligned, keeps the live demo window)**

```html
<section class="slide slide--demo slide--top">
  <div class="scenario-header">
    <span class="chip-icon" aria-hidden="true">04</span>
    <h1 class="slide__title">AI Systems</h1>
    <span class="scenario-tag">Automate &amp; Scale</span>
  </div>
  <p class="slide__body" style="margin:.2rem 0 1.2rem;max-width:72ch;font-size:clamp(1rem,1.5vw,1.3rem);">This isn&rsquo;t a slideshow trick &mdash; it&rsquo;s the kind of AI we build for clients. Name any local business and watch it work:</p>
  <div class="ai-window" style="max-width:960px;">
    <div class="ai-window__bar">
      <span class="ai-window__dots"><i></i><i></i><i></i></span>
      <span class="ai-window__name">SC Creative &middot; AI Marketing Studio</span>
      <span class="ai-window__live">Live</span>
    </div>
    <div class="ai-window__body">
      <div class="ai-field">
        <input type="text" id="demo-input" class="ai-input" placeholder="Name a real Walker County business…" autocomplete="off">
        <button type="button" id="demo-go" class="ai-btn">Watch AI go &rarr;</button>
      </div>
      <div class="demo-found" id="demo-found" data-rest="Enter a business name — AI will look it up and build its marketing."></div>
      <div class="demo-grid">
        <div class="demo-out"><div class="demo-out__label">📱 This week&rsquo;s social posts</div><div class="demo-stream" id="demo-social"></div></div>
        <div class="demo-out"><div class="demo-out__label">⭐ Reply to a bad review</div><div class="demo-stream" id="demo-review"></div></div>
        <div class="demo-out"><div class="demo-out__label">💬 After-hours text back</div><div class="demo-stream" id="demo-sms"></div></div>
      </div>
    </div>
  </div>
</section>
```
(Exact IDs/classes preserved so `wireDemo()` binds and the fixed-height fade boxes still apply.)

- [ ] **Step 2: Verify demo still fires** — screenshot index 8 with an injected value; reuse the demo-injection technique (`setTimeout(()=>{demo-input.value='Warehouse 319'; demo-go.click()},300)`), `virtualMs=20000`. Confirm found line + 3 cards populate, header reads "AI Systems / 04 / Automate & Scale", button visible. Console clean.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(deck): AI Systems pillar with repurposed live AI demo"
```

---

### Task 5: AEO slide 11 (the rules changed) — mock AI answer

**Files:**
- Modify: `index.html` (slide 11)
- Modify: `css/deck.css` (`.aeo-*` styles)
- Modify: `js/active.js` (auto-typing AEO answer on activation)

**Interfaces:**
- Consumes: `window.DeckAI.typewriter`, existing `.ai-window` shell, and the `activate(slide)` dispatcher.
- Produces: `data-aeo` hook on the slide; `runAeo()` internal to `active.js`; DOM ids `#aeo-answer`.

- [ ] **Step 1: Add `.aeo` CSS**

```css
.aeo-wrap { width:100%; max-width: 900px; margin-top: 1.4rem; }
.aeo-q { display:flex; align-items:center; gap:.7rem; background: rgba(0,0,0,.28); border:1px solid var(--hair); border-radius:12px; padding:.85rem 1.1rem; }
.aeo-q__label { flex-shrink:0; font-family:var(--font-heading); font-weight:700; text-transform:uppercase; letter-spacing:.1em; font-size:clamp(.58rem,.82vw,.7rem); color:var(--text-muted); }
.aeo-q__text { color:var(--text); font-size:clamp(.9rem,1.25vw,1.12rem); }
.aeo-a { margin-top:1rem; background:rgba(28,199,195,0.06); border:1px solid rgba(28,199,195,0.28); border-left:3px solid var(--teal); border-radius:12px; padding:1.1rem 1.3rem; color:var(--text-neutral); font-size:clamp(.9rem,1.25vw,1.1rem); line-height:1.5; min-height:3rem; }
.aeo-a b { color: var(--text); }
```

- [ ] **Step 2: Rewrite slide 11 markup**

```html
<section class="slide slide--top" data-aeo>
  <p class="slide__eyebrow">The rules just changed</p>
  <h1 class="slide__title">SEO gets you found on Google. <span class="k">AEO gets you found inside AI.</span></h1>
  <p class="slide__body" style="max-width:74ch;">Your customers are asking ChatGPT and Google&rsquo;s AI for recommendations now. We make sure your business is the answer they get.</p>
  <div class="aeo-wrap">
    <div class="ai-window">
      <div class="ai-window__bar">
        <span class="ai-window__dots"><i></i><i></i><i></i></span>
        <span class="ai-window__name">AI Assistant</span>
        <span class="ai-window__live">Live</span>
      </div>
      <div class="ai-window__body">
        <div class="aeo-q"><span class="aeo-q__label">Someone asks</span><span class="aeo-q__text">&ldquo;Best place for shrimp &amp; grits in Jasper, AL?&rdquo;</span></div>
        <div class="aeo-a" id="aeo-answer" data-rest="…"></div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add `runAeo` to `js/active.js`** — inside the IIFE, before `window.DeckActive`:

```js
const AEO_ANSWER = "For shrimp & grits in Jasper, <b>Warehouse 319</b> is the local favorite — a downtown sports bar & grill known for Southern fare with flair. Regulars also rave about their signature wings. It&rsquo;s a go-to spot right on the square.";
let aeoDone = false;
function runAeo(slide) {
  const el = slide.querySelector('#aeo-answer');
  if (!el || aeoDone || !typewriter) { if (el) el.innerHTML = AEO_ANSWER; return; }
  aeoDone = true;
  el.classList.add('ai-thinking'); el.textContent = 'Searching local businesses…';
  setTimeout(() => { el.classList.remove('ai-thinking'); typewriter(el, AEO_ANSWER, { speed: 14 }); }, 800);
}
```
Then in `activate(slide)` add: `if (slide.querySelector('[data-aeo]') || slide.hasAttribute('data-aeo')) runAeo(slide);` (the slide itself carries `data-aeo`, so use `slide.hasAttribute('data-aeo')`).

Note: `typewriter` renders text, not HTML. For the bolded answer, either (a) type plain text then set innerHTML at end, or (b) keep the answer plain (drop `<b>`). Use approach (a): type a plain version, then on completion set `el.innerHTML = AEO_ANSWER`. Implement:
```js
function runAeo(slide) {
  const el = slide.querySelector('#aeo-answer');
  if (!el || aeoDone) { if (el) el.innerHTML = AEO_ANSWER; return; }
  aeoDone = true;
  const plain = AEO_ANSWER.replace(/<[^>]+>/g, '');
  el.classList.add('ai-thinking'); el.textContent = 'Searching local businesses…';
  setTimeout(() => {
    el.classList.remove('ai-thinking');
    if (typewriter) { typewriter(el, plain, { speed: 14 }).then(() => { el.innerHTML = AEO_ANSWER; }); }
    else el.innerHTML = AEO_ANSWER;
  }, 800);
}
```

- [ ] **Step 4: Verify** — screenshot index 10 at `virtualMs=8000`; confirm the AI answer types out and Warehouse 319 is bolded in the final state. Console clean.

- [ ] **Step 5: Commit**

```bash
git add index.html css/deck.css js/active.js
git commit -m "feat(deck): AEO 'rules changed' slide with live AI-answer demo"
```

---

### Task 6: Payoff (slide 12) — repurposed growth curve

**Files:** Modify `index.html` (slide 12). Reuses existing `.turnaround`/`.ta-chart`/`.ta-line`/`.ta-dot`/`.ta-labels`/`.ta-lbl` — only label text changes.

- [ ] **Step 1: Rewrite slide 12** using the existing turnaround SVG structure, changing eyebrow/title/labels:
  - Eyebrow: "The payoff"
  - Title: `When the pieces connect, <span class="k">growth compounds</span>.`
  - Keep the `<svg>` + 3 `.ta-dot`s unchanged.
  - `.ta-labels`: **Found** / *Get seen*, **Trusted** / *Look the part*, **Growing** / *Win the work* (replace Survives/Grows/Hires, Year 1/3/5).
  - Body: "Each piece makes the others work harder. That&rsquo;s the difference between busy and growing."

- [ ] **Step 2: Verify** — screenshot index 11 with end-state CSS override (`.ta-chart{clip-path:none!important}.ta-lbl{opacity:1!important}`); confirm new labels. Console clean.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(deck): payoff slide — growth compounds curve"
```

---

### Task 7: Proof slide 13 — client trust bar

**Files:**
- Copy: client logos into `assets/clients/`
- Modify: `index.html` (slide 13)
- Modify: `css/deck.css` (`.trust-bar`)

**Interfaces:** Produces `.trust-bar` / `.trust-logo` used only on slide 13.

- [ ] **Step 1: Copy real client logos** (Sam vets which). Candidates on Desktop:

```bash
mkdir -p assets/clients
cp "/Users/samueldempsey/Desktop/Logo Trust Bar/Glory-Fellowship-Horizontal-Dark-2048x585.png" assets/clients/glory-fellowship.png
cp "/Users/samueldempsey/Desktop/Logo Trust Bar/Miller-Roofing-Horizontal-Dark.png" assets/clients/miller-roofing.png
cp "/Users/samueldempsey/Desktop/Logo Trust Bar/Lemon-Ridge-Logo.png" assets/clients/lemon-ridge.png
cp "/Users/samueldempsey/Desktop/Logo Trust Bar/Sanders Logo.png" assets/clients/sanders.png
cp "/Users/samueldempsey/Desktop/Logo Trust Bar/WMD-Logo-1.png" assets/clients/wmd.png
cp "/Users/samueldempsey/Desktop/Logo Designs/Mann Home Services.png" assets/clients/mann-home-services.png
ls assets/clients
```
(Confirm with Sam before finalizing which appear; some logos are dark-on-transparent → put them on white tokens.)

- [ ] **Step 2: Add `.trust-bar` CSS**

```css
.trust-bar { display:grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; width:100%; max-width:1000px; margin: 2.2rem auto 1rem; }
.trust-logo { background:#fff; border-radius:14px; height: clamp(70px, 9vw, 110px); display:grid; place-items:center; padding: 1rem 1.4rem; box-shadow: 0 12px 30px rgba(0,0,0,.35); }
.trust-logo img { max-width:100%; max-height:100%; object-fit:contain; display:block; }
```

- [ ] **Step 3: Rewrite slide 13**

```html
<section class="slide slide--center">
  <p class="slide__eyebrow">The proof</p>
  <h1 class="slide__title">Real businesses. <span class="k">Real work.</span></h1>
  <div class="trust-bar">
    <div class="trust-logo"><img src="assets/clients/glory-fellowship.png" alt="Glory Fellowship"></div>
    <div class="trust-logo"><img src="assets/clients/miller-roofing.png" alt="Miller Roofing"></div>
    <div class="trust-logo"><img src="assets/clients/lemon-ridge.png" alt="Lemon Ridge"></div>
    <div class="trust-logo"><img src="assets/clients/sanders.png" alt="Sanders"></div>
    <div class="trust-logo"><img src="assets/clients/wmd.png" alt="WMD"></div>
    <div class="trust-logo"><img src="assets/clients/mann-home-services.png" alt="Mann Home Services"></div>
  </div>
  <p class="slide__body">From roofing to retail to non-profits &mdash; we build the systems local businesses grow on.</p>
</section>
```

- [ ] **Step 4: Verify** — screenshot index 12; confirm 6 client logos render on white tokens, no broken images (check sizes > 0 via curl-like `ls`). Console clean.

- [ ] **Step 5: Commit**

```bash
git add assets/clients index.html css/deck.css
git commit -m "feat(deck): client trust-bar proof slide"
```

---

### Task 8: Close slides 14–18 (local, difference, start, vision, contact)

**Files:** Modify `index.html`. Reuses `.slide--center`, `.slide__title.grad`, `.title-underline`, `.contact-line`, `.online-chip`, `data-clock`, `.deck-logo`.

- [ ] **Step 1: Slide 14 — Why local matters**

```html
<section class="slide slide--center">
  <p class="slide__eyebrow">Why this matters for Jasper</p>
  <h1 class="slide__title">When local businesses win online, <span class="k">the whole town rises</span>.</h1>
  <p class="slide__body">Every local business that competes online keeps jobs, dollars, and pride right here in Walker County &mdash; instead of losing them to a chain three states away.</p>
</section>
```

- [ ] **Step 2: Slide 15 — The SC Creative difference**

```html
<section class="slide slide--center">
  <p class="slide__eyebrow">The difference</p>
  <h1 class="slide__title grad">One connected partner — right here.</h1>
  <p class="slide__body">Not a faceless agency in another state. Real people who answer the phone, know your market, and treat your growth like our own.</p>
</section>
```

- [ ] **Step 3: Slide 16 — Start (warm invitation)**

```html
<section class="slide slide--center">
  <p class="slide__eyebrow">Getting started</p>
  <h1 class="slide__title">It starts with a conversation.</h1>
  <p class="slide__body">No pressure, no jargon &mdash; just a clear look at where your business stands online today, and what&rsquo;s possible. That part&rsquo;s on us.</p>
</section>
```

- [ ] **Step 4: Slide 17 — Vision close**

```html
<section class="slide slide--center">
  <h1 class="slide__title grad" data-typewriter data-text="Main Street can win online.">Main Street can win online.</h1>
  <div class="title-underline"></div>
  <p class="slide__body">Let&rsquo;s build the system that gets you there.</p>
</section>
```

- [ ] **Step 5: Slide 18 — Contact** (keep existing structure, ensure real info)

```html
<section class="slide slide--center">
  <img class="contact-logo" src="assets/logo-white.png" alt="SC Creative">
  <p class="slide__eyebrow">Local, and here to help.</p>
  <p class="contact-line">Sam Cole &middot; <a href="mailto:sam@samcolecreative.com">sam@samcolecreative.com</a> &middot; <a href="tel:+16789971106">(678) 997-1106</a></p>
  <div class="online-chip">Online now &middot; <b data-clock>12:00:00 PM</b></div>
</section>
```
(If `.contact-logo` isn't already styled, reuse the existing contact slide's markup from the current deck verbatim.)

- [ ] **Step 6: Verify** — screenshot indices 13,14,15,16,17; Read PNGs; confirm copy, gradient titles, self-typing vision, contact info + live clock. Console clean.

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "feat(deck): close — local, difference, start, vision, contact"
```

---

### Task 9: Cleanup, full pass, deploy

**Files:** Modify `index.html` (remove dead references), possibly delete unused assets.

- [ ] **Step 1: Remove obsolete org-logo assets** no longer referenced (sheriff, jasper-schools, city-of-jasper). Keep `rotary.png` (title mark) and `logo-white.png`.

```bash
grep -o 'assets/[a-z-]*\.\(png\|svg\)' index.html | sort -u   # see what's still referenced
git rm assets/sheriff.png assets/jasper-schools.png assets/city-of-jasper.svg
```
(Only remove ones NOT referenced by the grep.)

- [ ] **Step 2: Confirm slide count = 18 and no stale copy**

```bash
grep -c '<section class="slide' index.html   # expect 18
grep -iE 'small-town|isn.t ai going|walker county sheriff|hvac|non-profit' index.html || echo "no stale Rotary copy (good)"
```

- [ ] **Step 3: Full 18-slide screenshot pass** — loop indices 0–17 (per the contact-sheet approach), Read every PNG, confirm the whole flow reads cleanly at big-screen scale. Fix any overflow/spacing.

- [ ] **Step 4: Console-error sweep** on 3–4 representative slides; expect none.

- [ ] **Step 5: Commit + deploy to the live link**

```bash
git add -A
git commit -m "chore(deck): remove obsolete org assets; final SC Creative pass"
git push origin build-deck:main   # updates https://4samcole1.github.io/small-town-advantage/
```

- [ ] **Step 6: Verify live** — after ~1 min, screenshot the live URL (`https://4samcole1.github.io/small-town-advantage/`) and confirm it matches local.

- [ ] **Step 7: Refresh the Desktop zip backup**

```bash
cd ~/"Ai Sites"
rm -f ~/Desktop/"How Local Businesses Win Online — Presentation.zip"
zip -r -X ~/Desktop/"How Local Businesses Win Online — Presentation.zip" "rotary-ai-presentation" \
  -x "*/.git/*" -x "*/node_modules/*" -x "*/.DS_Store" -x "*/.superpowers/*" -x "*/config.js" >/dev/null
```

---

## Self-Review

**Spec coverage:** Title (T1) · reality stat (T1) · scattered→connected (T1) · system overview (T2) · 5 pillars: Blueprint/Branding/Website/Growth (T3), AI Systems + live demo (T4) · AEO beat (T5) · payoff curve (T6) · client proof (T7) · local/difference/start/vision/contact (T8) · preservation tag (T0) · cleanup+deploy (T9). All spec sections covered.

**Placeholder scan:** Real copy provided for every slide; new-component CSS/JS given in full; client-logo list concrete (Sam vets). The count-up stats and client-logo selection are flagged as Sam-adjustable, not placeholders.

**Type/name consistency:** Demo IDs (`#demo-input`, `#demo-go`, `#demo-found`, `#demo-social/review/sms`) preserved exactly so `wireDemo()` binds. `runAeo` reads `#aeo-answer`; slide carries `data-aeo`; `activate()` calls it via `slide.hasAttribute('data-aeo')`. Turnaround classes unchanged (label text only). New classes (`.scatter`, `.eco-pillar`, `.aeo-*`, `.trust-*`) are self-contained.

**Ordering note:** Slide order is Blueprint(6) Branding(7) Website(8) AI Systems(9) Growth(10) AEO(11) — Task 3 builds 6/7/8/10, Task 4 builds 9, Task 5 builds 11. All land at correct indices in the final `index.html`.
