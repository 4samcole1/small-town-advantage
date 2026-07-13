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

  /* ---- multi-step agent runs (e.g. non-profit grant workflow) ---- */
  const AGENT_STEPS = {
    nonprofit: [
      'Read new email from <b>Aaron</b> — asking for a completed grant application and supporting documents for approval',
      'Downloaded the <b>grant application PDF</b>',
      'Searched <b>local files + Google Drive</b> for everything the grant requires',
      'Found <b>501(c)(3) letter, annual budget, board roster &amp; latest impact report</b>',
      'Ran the <b>grant SOP</b> — checked off every required item',
      'Drafted the cover response in the <b>non-profit’s brand voice</b>',
      { text: '<b>Final packet assembled</b> — ready for you to review &amp; send to Aaron', final: true },
    ],
  };
  const delay = ms => new Promise(r => setTimeout(r, ms));
  let agentRun = 0;

  async function runAgent(container) {
    const steps = AGENT_STEPS[container.dataset.agent];
    if (!steps) return;
    const log = container.querySelector('.agent-run__log');
    const myRun = ++agentRun;
    log.innerHTML = '';
    for (const raw of steps) {
      if (myRun !== agentRun) return; // a newer activation superseded this run
      const step = typeof raw === 'string' ? { text: raw } : raw;
      const row = document.createElement('div');
      row.className = 'agent-step working' + (step.final ? ' agent-step--final' : '');
      row.innerHTML = '<span class="agent-step__status"></span><span class="agent-step__text">' + step.text + '</span>';
      log.appendChild(row);
      requestAnimationFrame(() => row.classList.add('show'));
      await delay(720 + Math.round(Math.random() * 320));
      if (myRun !== agentRun) return;
      row.classList.remove('working');
      row.classList.add('done');
      await delay(220);
    }
    if (myRun === agentRun) {
      const badge = container.querySelector('.ai-window__live');
      if (badge) badge.textContent = 'Done';
    }
  }

  function activate(slide) {
    stopClocks();
    agentRun++; // cancel any in-flight agent run from a previous slide
    slide.querySelectorAll('[data-countup]').forEach(countUp);
    startClocks(slide);
    slide.querySelectorAll('[data-typedemo]').forEach(typedemo);
    const agent = slide.querySelector('[data-agent]');
    if (agent) runAgent(agent);
  }

  // Interactive checklist — wired once.
  document.querySelectorAll('.check-item').forEach(item => {
    item.addEventListener('click', () => item.classList.toggle('checked'));
  });

  window.DeckActive = { activate };
})();
