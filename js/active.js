/* active.js — per-slide "active element" behaviors, fired when a slide
   becomes active: number count-ups, a live ticking clock, and live
   typewriter mini-demos of real AI output. CSS handles the rest
   (bar growth, chain flow, check pops, title sheen). */

(function () {
  const typewriter = window.DeckAI ? window.DeckAI.typewriter : null;
  let clockTimers = [];

  function countUp(el) {
    const target = parseFloat(el.dataset.countup);
    const suffix = el.dataset.suffix || '';
    const dur = 1100, start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(frame);
  }

  function fmtTime() {
    const d = new Date();
    let h = d.getHours(); const m = d.getMinutes(), s = d.getSeconds();
    const ampm = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12;
    const pad = n => String(n).padStart(2, '0');
    return h + ':' + pad(m) + ':' + pad(s) + ' ' + ampm;
  }
  function startClocks(slide) {
    const els = slide.querySelectorAll('[data-clock]');
    if (!els.length) return;
    const tick = () => els.forEach(el => { el.textContent = fmtTime(); });
    tick();
    clockTimers.push(setInterval(tick, 1000));
  }
  function stopClocks() { clockTimers.forEach(clearInterval); clockTimers = []; }

  function typedemo(el) {
    if (!typewriter) { el.textContent = el.dataset.text; return; }
    if (el.dataset.done) { el.textContent = el.dataset.text; return; }
    el.dataset.done = '1';
    typewriter(el, el.dataset.text, { speed: 22 });
  }

  function activate(slide) {
    stopClocks();
    slide.querySelectorAll('[data-countup]').forEach(countUp);
    startClocks(slide);
    slide.querySelectorAll('[data-typedemo]').forEach(typedemo);
  }

  // Interactive checklist — wired once.
  document.querySelectorAll('.check-item').forEach(item => {
    item.addEventListener('click', () => item.classList.toggle('checked'));
  });

  window.DeckActive = { activate };
})();
