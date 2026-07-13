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

  /* ---- City of Jasper: auto-playing internal-procedure assistant ---- */
  const CITY_QA = [
    {
      q: "What's our full procedure for approving a downtown special-event permit — and which departments sign off?",
      a: "Special-event permits run through four steps:\n1) Applicant submits the event form to the City Clerk at least 30 days out.\n2) Public Works reviews street closures & barricades; Police reviews traffic & staffing; Fire reviews access & occupancy.\n3) Each department signs off in the permit portal.\n4) The Clerk issues the permit and notifies the applicant.\nTypical turnaround: 5–7 business days. Want me to draft the applicant email and the department routing checklist?",
    },
    {
      q: "Draft a step-by-step SOP for onboarding a new Public Works employee.",
      a: "Public Works onboarding SOP:\n1) HR opens the personnel file and enrolls benefits.\n2) IT issues email, radio, and fuel card.\n3) Supervisor runs OSHA + equipment safety orientation and logs the sign-off.\n4) Issue PPE and uniforms.\n5) Verify CDL if the role requires driving.\n6) Schedule 30/60/90-day check-ins in the personnel file.\nI can generate the printable checklist and the welcome packet.",
    },
    {
      q: "A resident is disputing a water bill. What's our policy, and what are the resolution steps?",
      a: "Billing-dispute procedure:\n1) Log the dispute in the utility system by account number.\n2) Pull the last three read cycles and check for a spike or an estimated read.\n3) If a leak is likely, offer the one-time leak adjustment allowed by ordinance.\n4) Send the resident a written explanation within 10 business days.\n5) If still unresolved, escalate to the Utility Board.\nI can draft the resident letter and the internal case note now.",
    },
    {
      q: "What forms and approvals are needed to close a street for a festival on the square?",
      a: "Street-closure packet:\n1) Special Event application\n2) Certificate of insurance naming the City\n3) Traffic-control plan approved by Police\n4) Public Works barricade request\n5) Council notification if the closure runs over 24 hours\nSubmit at least 30 days ahead. I can pre-fill the barricade request and the Council memo.",
    },
  ];
  let cityIdx = 0, cityPlaying = false, cityAutoPlayed = false;

  async function runCity() {
    if (!typewriter || cityPlaying) return;
    const qEl = document.getElementById('city-q');
    const aEl = document.getElementById('city-answer');
    const nextBtn = document.getElementById('city-next');
    if (!qEl || !aEl) return;
    cityPlaying = true;
    if (nextBtn) { nextBtn.disabled = true; }
    const item = CITY_QA[cityIdx % CITY_QA.length];
    aEl.textContent = '';
    await typewriter(qEl, item.q, { speed: 24 });      // the city "types" its query
    aEl.classList.add('ai-thinking');
    aEl.textContent = 'Checking city procedures…';
    await delay(750);
    aEl.classList.remove('ai-thinking');
    await typewriter(aEl, item.a, { speed: 10 });      // the answer shown to staff
    cityIdx++;
    cityPlaying = false;
    if (nextBtn) nextBtn.disabled = false;
  }

  const cityNext = document.getElementById('city-next');
  if (cityNext) cityNext.addEventListener('click', runCity);

  function activate(slide) {
    stopClocks();
    agentRun++; // cancel any in-flight agent run from a previous slide
    slide.querySelectorAll('[data-countup]').forEach(countUp);
    startClocks(slide);
    slide.querySelectorAll('[data-typedemo]').forEach(typedemo);
    const agent = slide.querySelector('[data-agent]');
    if (agent) runAgent(agent);
    if (slide.querySelector('[data-citydemo]') && !cityAutoPlayed) {
      cityAutoPlayed = true;
      runCity();
    }
  }

  window.DeckActive = { activate };
})();
