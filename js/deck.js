/* deck.js — slide engine, keyboard/click navigation, self-typing
   headlines, and the two interactive AI beats (live demo + city
   assistant). Depends on window.DeckAI (ai-engine.js). */

(function () {
  const { runAIBeat, typewriter } = window.DeckAI;

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
    if (tag === 'input' || tag === 'textarea') return; // let AI inputs receive keys
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { prev(); }
    else if (e.key.toLowerCase() === 'f') { toggleFullscreen(); }
  });
  document.addEventListener('click', e => {
    if (e.target.closest('a, button, input, textarea, .ai-window')) return;
    (e.clientX < window.innerWidth / 3) ? prev() : next();
  });
  render();

  /* ---------- live demo: marketing generator ---------- */
  (function wireDemo() {
    const input = document.getElementById('demo-input');
    const go = document.getElementById('demo-go');
    const socialEl = document.getElementById('demo-social');
    const reviewEl = document.getElementById('demo-review');
    const smsEl = document.getElementById('demo-sms');
    if (!go || !input) return;

    const socialFallback =
      "🔥 Fall-off-the-bone tender, smoked low & slow all night — Joe's Barbecue is fired up and ready for you today.\n\n" +
      "🍖 Big trays, bigger flavor. Grab the crew and swing by Joe's Barbecue this weekend — first come, first served.\n\n" +
      "🎉 Fresh brisket just hit the smoker. Come get it before it's gone — Joe's Barbecue, open till 8!";
    const reviewFallback =
      "Thank you for taking the time to share this — I'm sorry your visit didn't live up to what you should expect from us. " +
      "That's not the experience we want for anyone who walks through our door, and I'd genuinely like to make it right. " +
      "Please reach out to me directly so we can hear what happened. We hope for the chance to welcome you back to Joe's Barbecue soon.";
    const smsFallback =
      "Thanks for reaching out to Joe's Barbecue! We're closed for the night, but we read every message first thing in the morning and will get right back to you. 🍖";

    async function runDemo() {
      const name = input.value.trim() || "Joe's Barbecue";
      go.disabled = true;
      const label = go.innerHTML;
      go.textContent = 'Working…';
      try {
        await Promise.all([
          runAIBeat(socialEl, {
            messages: [{ role: 'user', content: name }],
            system: "You are a friendly small-business marketing assistant. Write 3 short, punchy, ready-to-post social media captions (each with a relevant emoji) for the business named by the user. No preamble — just the 3 captions, one per line.",
            fallbackText: socialFallback,
          }),
          runAIBeat(reviewEl, {
            messages: [{ role: 'user', content: name }],
            system: "Write a calm, professional, warm reply to a hypothetical 1-star Google review for the named local business. 3-4 sentences. No preamble.",
            fallbackText: reviewFallback,
          }),
          runAIBeat(smsEl, {
            messages: [{ role: 'user', content: name }],
            system: "Write a short, warm after-hours text-message auto-reply from the named local business to a customer who messaged after closing. 2 sentences. No preamble.",
            fallbackText: smsFallback,
          }),
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
          system: "You are the friendly AI assistant for the City of Jasper, Alabama. Answer citizen questions helpfully and briefly (2-3 sentences) in a warm municipal tone. If you don't know a specific local detail, give a helpful general answer and point them to city hall.",
          fallbackText: trashFallback,
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
