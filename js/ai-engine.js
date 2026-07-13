/* ai-engine.js — shared AI layer.
   - typewriter(): reveals text into an element char-by-char (used for
     both live results and offline fallbacks, so they look identical).
   - aiComplete(): one non-streaming Claude call. Supports server tools
     (e.g. web_search) and resumes on pause_turn. Rejects when no key.
   - runAIBeat(): orchestrates one beat — live when a key is present,
     real pre-authored fallback otherwise. Always resolves. */

(function () {
  const AI = (window.AI_CONFIG || { apiKey: '', model: 'claude-sonnet-5' });
  const ENDPOINT = 'https://api.anthropic.com/v1/messages';

  function typewriter(el, text, opts = {}) {
    const speed = opts.speed ?? 10;
    el.classList.remove('ai-thinking');
    el.classList.add('typing');
    el.textContent = '';
    return new Promise(resolve => {
      let i = 0;
      (function tick() {
        if (i >= text.length) { el.classList.remove('typing'); return resolve(); }
        el.textContent += text[i++];
        el.scrollTop = el.scrollHeight;
        setTimeout(tick, speed);
      })();
    });
  }

  // One completion. `tools` may include the web_search server tool, which
  // runs on Anthropic's side; we just resume the turn if it pauses.
  async function aiComplete(messages, { system, tools, maxTokens } = {}) {
    if (!AI.apiKey) throw new Error('no-key');
    let msgs = messages.slice();
    for (let iter = 0; iter < 4; iter++) {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': AI.apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: AI.model || 'claude-sonnet-5',
          max_tokens: maxTokens || 1024,
          system: system || undefined,
          tools: tools || undefined,
          messages: msgs,
        }),
      });
      if (!res.ok) throw new Error('api-' + res.status);
      const data = await res.json();
      if (data.stop_reason === 'pause_turn') {
        // Server tool paused mid-turn — resume by echoing its output back.
        msgs = msgs.concat([{ role: 'assistant', content: data.content }]);
        continue;
      }
      const text = (data.content || [])
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('')
        .trim();
      if (text) return text;
      // No text (e.g. only tool calls) — nudge once for a final answer.
      msgs = msgs.concat([{ role: 'assistant', content: data.content }]);
    }
    throw new Error('no-final-text');
  }

  // Run one beat into `el`. opts:
  //   messages, system, tools    — the live request
  //   fallbackText               — real pre-authored offline copy
  //   thinkingLabel              — status shown while working
  async function runAIBeat(el, opts) {
    el.classList.add('ai-thinking');
    el.textContent = opts.thinkingLabel || 'Thinking…';
    try {
      const text = await aiComplete(opts.messages, { system: opts.system, tools: opts.tools });
      await typewriter(el, text, { speed: 9 });
    } catch (_) {
      el.classList.remove('ai-thinking');
      await new Promise(r => setTimeout(r, 500));
      await typewriter(el, opts.fallbackText, { speed: 11 });
    }
  }

  window.DeckAI = { typewriter, aiComplete, runAIBeat, hasKey: () => !!AI.apiKey };
})();
