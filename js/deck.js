/* deck.js — slide engine, keyboard/click navigation, self-typing
   headlines, and the two interactive AI beats. Depends on window.DeckAI. */

(function () {
  const { runAIBeat, aiComplete, typewriter, hasKey } = window.DeckAI;

  /* ---------- self-typing headlines ---------- */
  document.querySelectorAll('[data-typewriter]').forEach(el => {
    if (!el.dataset.text) el.dataset.text = el.textContent;
  });
  function typeActiveHeadlines() {
    document.querySelectorAll('.slide.active [data-typewriter]:not(.typed)').forEach(el => {
      el.classList.add('typed');
      typewriter(el, el.dataset.text);
    });
  }

  /* ---------- slide engine ---------- */
  const slides = Array.from(document.querySelectorAll('.slide'));
  let current = 0;
  const counter = document.querySelector('.deck-counter');
  const fill = document.getElementById('deck-progress-fill');

  function render() {
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    if (counter) counter.innerHTML = '<b>' + (current + 1) + '</b> / ' + slides.length;
    if (fill) fill.style.width = ((current + 1) / slides.length * 100) + '%';
    typeActiveHeadlines();
  }
  function goTo(n) { current = Math.max(0, Math.min(slides.length - 1, n)); render(); }
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);
  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  }

  document.addEventListener('keydown', e => {
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { prev(); }
    else if (e.key.toLowerCase() === 'f') { toggleFullscreen(); }
  });
  document.addEventListener('click', e => {
    if (e.target.closest('a, button, input, textarea, .ai-window')) return;
    (e.clientX < window.innerWidth / 3) ? prev() : next();
  });
  render();

  /* ---------- live demo: real Walker County lookup + grounded copy ---------- */
  (function wireDemo() {
    const input = document.getElementById('demo-input');
    const go = document.getElementById('demo-go');
    const foundEl = document.getElementById('demo-found');
    const socialEl = document.getElementById('demo-social');
    const reviewEl = document.getElementById('demo-review');
    const smsEl = document.getElementById('demo-sms');
    if (!go || !input) return;

    const RESEARCH_SYS =
      "You research local businesses in Walker County, Alabama (Jasper and the surrounding towns). " +
      "The user gives a business name. Use web search to find that specific, real business in or near Walker County, AL. " +
      "Reply with ONE concrete sentence: what the business is, what they sell or do, and one real detail (location, a menu item or service, or a rating). " +
      "If you genuinely can't find a listing, reply exactly: \"Couldn't find a specific listing — I'll treat it as a local business.\" No preamble.";

    const SOCIAL_SYS =
      "You are a friendly small-business marketing assistant. Using the business details provided, write 3 short, punchy, ready-to-post social media captions (each with a relevant emoji), grounded in what this specific business actually sells or does. No preamble — just the 3 captions, one per line.";
    const REVIEW_SYS =
      "Using the business details provided, write a calm, professional, warm reply to a hypothetical 1-star Google review for this specific local business. 3-4 sentences, in the business's voice. No preamble.";
    const SMS_SYS =
      "Using the business details provided, write a short, warm after-hours text-message auto-reply from this specific local business to a customer who messaged after closing. 2 sentences. No preamble.";

    // Name-aware offline fallbacks (used when no API key is configured).
    const fb = (name) => ({
      social:
        "🔥 Come see why folks around Jasper keep coming back to " + name + " — we’re open and ready for you today.\n\n" +
        "⭐ Big thanks to Walker County for the love this week. Swing by " + name + " and bring a friend!\n\n" +
        "📣 Something new just dropped at " + name + " — come check it out before it’s gone.",
      review:
        "Thank you for taking the time to share this — I’m sorry your experience with " + name + " didn’t live up to what you should expect from us. " +
        "That’s not the standard we hold ourselves to, and I’d genuinely like to make it right. " +
        "Please reach out to me directly so we can hear what happened. We’d love the chance to earn your trust back.",
      sms:
        "Thanks for reaching out to " + name + "! We’re closed for the night, but we read every message first thing in the morning and will get right back to you.",
      found:
        "🔎 Offline sample for “" + name + ".” Add an API key in config.js for a real, live Walker County lookup.",
    });

    async function runDemo() {
      const name = input.value.trim() || 'a local business';
      go.disabled = true;
      const label = go.innerHTML;
      go.textContent = 'Working…';
      const F = fb(name);

      try {
        // 1) Research the real business (web search) — the "it actually looked them up" beat.
        let profile = '';
        if (foundEl) {
          foundEl.classList.add('ai-thinking');
          foundEl.textContent = '🔎 Looking up ' + name + ' in Walker County…';
        }
        try {
          profile = await aiComplete([{ role: 'user', content: name }], {
            system: RESEARCH_SYS,
            tools: [{ type: 'web_search_20260209', name: 'web_search' }],
          });
          if (foundEl) await typewriter(foundEl, '🔎 ' + profile, { speed: 8 });
        } catch (_) {
          profile = '';
          if (foundEl) { foundEl.classList.remove('ai-thinking'); await typewriter(foundEl, F.found, { speed: 8 }); }
        }

        // 2) Generate the three deliverables, grounded in the profile when we have one.
        const ctx = profile
          ? 'Business name: ' + name + '\nWhat we found: ' + profile
          : name;

        await Promise.all([
          runAIBeat(socialEl, { messages: [{ role: 'user', content: ctx }], system: SOCIAL_SYS, fallbackText: F.social }),
          runAIBeat(reviewEl, { messages: [{ role: 'user', content: ctx }], system: REVIEW_SYS, fallbackText: F.review }),
          runAIBeat(smsEl,    { messages: [{ role: 'user', content: ctx }], system: SMS_SYS,    fallbackText: F.sms }),
        ]);
      } finally {
        go.disabled = false;
        go.innerHTML = label;
      }
    }

    go.addEventListener('click', runDemo);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); runDemo(); } });
  })();

  /* ---------- city of jasper: live assistant ---------- */
  (function wireCity() {
    const input = document.getElementById('city-input');
    const go = document.getElementById('city-go');
    const answerEl = document.getElementById('city-answer');
    if (!go || !input || !answerEl) return;

    const CITY_SYS =
      "You are the friendly AI assistant for the City of Jasper, Alabama. Answer citizen questions helpfully and briefly (2-3 sentences) in a warm municipal tone. " +
      "You may use web search for real, current Jasper/Walker County details when helpful. If you don't know a specific local detail, give a helpful general answer and point them to city hall.";
    const trashFallback =
      "Trash pickup for most of Jasper runs every Tuesday morning, so it's best to have your cart out by 6 a.m. " +
      "Pickup days can vary a little by street — if you're not sure which day applies to your address, give City Hall a call or stop by and we'll look it up and get you squared away.";

    async function runCity() {
      const q = input.value.trim() || 'When is my trash picked up?';
      go.disabled = true;
      const label = go.innerHTML;
      go.textContent = 'Asking…';
      try {
        await runAIBeat(answerEl, {
          messages: [{ role: 'user', content: q }],
          system: CITY_SYS,
          tools: hasKey() ? [{ type: 'web_search_20260209', name: 'web_search' }] : undefined,
          fallbackText: trashFallback,
          thinkingLabel: 'Thinking…',
        });
      } finally {
        go.disabled = false;
        go.innerHTML = label;
      }
    }

    go.addEventListener('click', runCity);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); runCity(); } });
  })();
})();
