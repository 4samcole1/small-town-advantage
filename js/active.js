/* active.js — per-slide "active element" behaviors, fired when a slide
   becomes active: number count-ups, a live ticking clock, and live
   typewriter mini-demos of real AI output. CSS handles the rest
   (bar growth, chain flow, check pops, title sheen). */

(function () {
  const typewriter = window.DeckAI ? window.DeckAI.typewriter : null;
  let clockTimers = [];
  let geoTimer = null;

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
    automation: [
      'Mapped the business’s workflows, tools &amp; bottlenecks',
      'Designed a custom <b>CRM</b> — leads, jobs &amp; customers in one place',
      'Automated <b>invoicing, payments &amp; finance</b> reminders',
      'Built <b>scheduling, dispatch &amp; follow-ups</b> that run themselves',
      'Connected every tool — <b>no more double data-entry</b>',
      { text: '<b>Live dashboard launched</b> — revenue, pipeline &amp; tasks at a glance', final: true },
    ],
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
      q: "What's our procedure for approving a downtown special-event permit — and who signs off?",
      a: "Four steps: (1) the applicant submits the event form to the City Clerk 30 days out; (2) Public Works, Police, and Fire each review their part; (3) all three sign off in the permit portal; (4) the Clerk issues it. Want me to draft the applicant email and the routing checklist?",
    },
    {
      q: "Draft a quick SOP for onboarding a new Public Works employee.",
      a: "HR opens the file and enrolls benefits → IT issues email, radio, and fuel card → the supervisor runs safety orientation and logs the sign-off → issue PPE → verify CDL if the role drives → set 30/60/90-day check-ins. I can generate the printable checklist.",
    },
    {
      q: "A resident is disputing a water bill. What's our policy?",
      a: "Log the dispute by account number, pull the last three read cycles, and check for a spike or an estimated read. If a leak is likely, offer the one-time adjustment allowed by ordinance, then send a written explanation within 10 business days. Still unresolved? Escalate to the Utility Board. I can draft the resident letter.",
    },
    {
      q: "What's needed to close a street for a festival on the square?",
      a: "You'll need the Special Event application, a certificate of insurance naming the City, a Police-approved traffic plan, a Public Works barricade request, and Council notice if it runs over 24 hours. Submit 30 days out. I can pre-fill the barricade request and the Council memo.",
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

  /* ---- Growth proof: flip the geo-grid between Before and After ---- */
  function stopGeo() { if (geoTimer) { clearInterval(geoTimer); geoTimer = null; } }
  function runGeo(slide) {
    const map = slide.querySelector('[data-geo-map]');
    if (!map) return;
    const before = map.querySelector('.geogrid--before');
    const after  = map.querySelector('.geogrid--after');
    const toggle = slide.querySelector('.geo-toggle');
    const tagB = slide.querySelector('.geo-toggle__tag--before');
    const tagA = slide.querySelector('.geo-toggle__tag--after');
    if (!before || !after) return;

    let showAfter = false;
    function paint() {
      before.classList.toggle('is-shown', !showAfter);
      after.classList.toggle('is-shown', showAfter);
      if (toggle) toggle.classList.toggle('is-after', showAfter);
      if (tagB) tagB.classList.toggle('is-active', !showAfter);
      if (tagA) tagA.classList.toggle('is-active', showAfter);
    }
    // Always land on the slide showing "Before" first, then flip on a loop.
    showAfter = false; paint();
    geoTimer = setInterval(() => { showAfter = !showAfter; paint(); }, 2600);
  }

  function activate(slide) {
    stopClocks();
    stopGeo();
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
    if (slide.hasAttribute('data-aeo')) runAeo(slide);
    if (slide.hasAttribute('data-geo')) runGeo(slide);
  }

  /* ---- AEO slide: a mock AI answer types out and cites the local business ---- */
  const AEO_ANSWER = "For shrimp &amp; grits in Jasper, <b>Warehouse 319</b> is the local favorite — a downtown sports bar &amp; grill known for Southern fare with flair, and regulars rave about the signature wings. It’s a go-to spot right on the square.";
  let aeoDone = false;
  function runAeo(slide) {
    const el = slide.querySelector('#aeo-answer');
    if (!el) return;
    if (aeoDone) { el.innerHTML = AEO_ANSWER; return; }
    aeoDone = true;
    const plain = AEO_ANSWER.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
    el.classList.add('ai-thinking');
    el.textContent = 'Searching local businesses…';
    setTimeout(() => {
      el.classList.remove('ai-thinking');
      if (typewriter) {
        typewriter(el, plain, { speed: 14 }).then(() => { el.innerHTML = AEO_ANSWER; });
      } else {
        el.innerHTML = AEO_ANSWER;
      }
    }, 800);
  }

  window.DeckActive = { activate };
})();
