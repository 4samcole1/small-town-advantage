# Design Spec — "How Local Businesses Win Online" (SC Creative × Rotary)

**Date:** 2026-07-20
**Supersedes direction of:** the "Small-Town Advantage" Rotary AI talk (same project, re-themed)

## Goal

Re-theme the existing Rotary deck. Instead of a general "AI is good for small towns"
talk, this is now an **SC Creative capabilities showcase** delivered *to the same room*
— positioning Sam Cole Creative as the local expert who grows businesses online, built
around SC Creative's real, advanced services.

## Audience, format, tone

- **Audience:** Rotary Club of Jasper, AL — local business owners/leaders, mixed tech
  literacy. Same room as the original talk.
- **Format:** Live, in-person, **large screen (projector)**. ~30 min, ~18 slides.
  Presenter-driven. Must stay readable at distance — big type, uncluttered.
- **Tone:** **Authority, softly.** Educate the room on how modern online growth works,
  using SC Creative's services as the framework. They leave thinking "these are the
  experts." The pitch is implied; the close is a warm invitation, not a hard sell.
- **Delivery:** Same as before — self-contained offline-capable HTML deck, presented
  fullscreen in browser; already hosted at
  https://4samcole1.github.io/small-town-advantage/ (this project). Transforming this
  project updates that link. The original Rotary deck is preserved via git tag +
  the Desktop zip backup.

## Narrative direction

**① Integrated System spine + ③ "the rules changed: SEO + AEO" beat.**

Thesis (SC Creative's real brand line): *"We focus on systems — one connected partner."*
Most local businesses have a **scattered** online presence (a DIY site, a stale Facebook
page, no plan). The ones that win treat it as **one connected system**. Walk the room
through SC Creative's 5-pillar system, then land the forward-looking AEO beat.

## Source of truth — SC Creative's real model

Pulled from the live SC Creative site (`~/Ai Sites/sc-creative`). Use these verbatim —
do not invent services.

**5 pillars:**
1. **Blueprint** — *Clarity & Strategy.* Positioning, messaging, market clarity — built
   before anything touches a screen.
2. **Branding** — *Identity & System.* Complete visual identity, logo → brand guide;
   consistent, scalable. (This is where **graphic design / brand development** lives —
   give it prominence per Sam's ask.)
3. **Website** — *Design & Build.* Custom design + fast load times that reflect real
   quality and convert.
4. **AI Systems** — *Automate & Scale.* Custom workflows, automations, integrations, the
   CRM/dashboard. (This is **AI development**.)
5. **Growth** — *Traffic & Revenue.* SEO, paid ads, content that compound. (This is where
   **SEO + AEO** live.)

Brand voice/lines to reuse: "Strategy, branding, websites, and AI — integrated." ·
"We focus on systems." · "One connected partner." · "Your AI teammate that plans,
builds, and automates."

Palette (already in the deck, matches the SC site): teal spectrum
`#2adbd7 · #1cc7c3 · #13a9a6 · #0b8b88 · #056c6a`, dark navy ground, gold accent.
Type: Montserrat / Poppins.

## Slide map (18)

**Open — the setup**
1. **Title** — *"How Local Businesses Win Online."* Eyebrow: SC Creative · Prepared for
   Rotary Club of Jasper. (Self-typing headline.)
2. **The reality** — Customers judge your business online before they ever call — and
   most local businesses lose them right there. (Count-up stat.)
3. **The problem: scattered** — DIY site, stale Facebook page, no plan — pieces that
   don't talk to each other. (Animated "scattered pieces.")
4. **The shift** — The businesses that win treat it as **one connected system**, not
   scattered parts. ("We focus on systems." Scattered → connected animation.)

**The system — the 5 pillars (the heart)**
5. **The system overview** — all 5 pillars shown as one connected ecosystem. (Animated
   assemble.)
6. **01 · Blueprint** — Strategy & clarity. Capability-showcase grid.
7. **02 · Branding** — Identity & **graphic design**: logo → full brand system.
8. **03 · Website** — Custom design + fast, converting builds.
9. **04 · AI Systems** — Automations, workflows, dashboard — **+ the live AI demo** as
   proof ("name a business, watch our AI build its marketing").
10. **05 · Growth** — SEO, paid ads, content that compounds.
11. **The rules just changed** — SEO gets you found on Google; **AEO** gets you found
    *inside* AI (ChatGPT, Google AI). Signature moment: a mock AI answer types out and
    *cites the local business*.

**Payoff & close**
12. **When it's connected** — all 5 working together compound. (Growth-curve visual,
    repurposed.)
13. **Proof** — real SC Creative client work. (Trust bar of actual client logos from
    Sam's `Logo Trust Bar/` + `Logo Designs/`; Sam vets which appear.)
14. **Why local matters** — when Walker County businesses win online, the whole town
    rises. (Civic warmth carried over.)
15. **The SC Creative difference** — one connected partner, real people right here — not
    a faceless agency.
16. **Start** — warm invitation: how to begin with SC Creative.
17. **Vision close** — *"Main Street can win online."* (Gradient sheen.)
18. **Contact** — Sam Cole · SC Creative · (678) 997-1106 · sam@samcolecreative.com ·
    site. (Live clock.)

## Interactive / motion layer (reuse the existing engine)

- Self-typing headlines; count-up stat (2); scattered→connected animation (3–4).
- 5-pillar ecosystem assembles into one system (5).
- Pillar slides (6–10) use the existing capability-showcase grid pattern.
- **Live AI demo stays**, repurposed on AI Systems (9). Keeps the offline curated
  Walker County business DB (`js/local-data.js`) — bulletproof on the big screen,
  no key needed.
- **AEO slide (11):** a mock AI-assistant answer types out and cites the local business
  (new interactive; builds on the typewriter + AI-window components).
- Growth curve repurposed for the "compounds" payoff (12).
- Live clock on contact (18).

## What's reused vs new

- **Reuse:** the whole slide engine (`js/deck.js`), active-element system
  (`js/active.js`), AI window + typewriter (`js/ai-engine.js`), curated business DB
  (`js/local-data.js`), node-network background (`js/background.js`), design system
  (`css/deck.css`), the SC Creative logo.
- **New/changed:** all slide *content* in `index.html`; new pillar/ecosystem/AEO/
  trust-bar components + styles; client-logo assets added to `assets/`.
- **Removed:** the Rotary local-scenario slides (City of Jasper, Walker County Sheriff,
  Jasper City Schools, HVAC Contractor, Local Non-Profit) and their org logos from the
  header chips (logos may be repurposed only if relevant; otherwise dropped).

## Preservation

- Before any edit, tag the current Rotary deck: `git tag rotary-small-town-advantage`
  (and keep the Desktop zip). The live GitHub Pages link will switch to the new deck.

## Out of scope

- No live API key / paid web-search path required — the AI demo runs on the curated
  offline DB. (A key remains optional as before.)
- No new backend, CRM, or data collection.
- Repo/URL rename (`small-town-advantage` → something SC-branded) is optional and can be
  done later; not required for the deck to work.

## Open items for Sam at build time

- Which specific client logos to feature on slide 13.
- Any real metric/stat he's comfortable citing on slide 2 (else use an honest,
  attributable general figure).
