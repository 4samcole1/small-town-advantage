/* ai-engine.js — shared AI layer.
   - typewriter(): types text into an element char-by-char.
   - aiStream(): streams a live Claude completion from the browser
     (rejects when no key is configured, so callers fall back).
   - runAIBeat(): orchestrates one beat — live when possible, real
     pre-authored fallback otherwise. Always resolves. */

(function () {
  const AI = (window.AI_CONFIG || { apiKey: '', model: 'claude-haiku-4-5' });

  function typewriter(el, text, opts = {}) {
    const speed = opts.speed ?? 16;
    el.classList.add('typing');
    el.textContent = '';
    return new Promise(resolve => {
      let i = 0;
      (function tick() {
        if (i >= text.length) { el.classList.remove('typing'); return resolve(); }
        el.textContent += text[i++];
        // auto-scroll long streams into view
        el.scrollTop = el.scrollHeight;
        setTimeout(tick, speed);
      })();
    });
  }

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
          if (evt.type === 'content_block_delta' && evt.delta && evt.delta.type === 'text_delta') {
            onToken && onToken(evt.delta.text);
          }
        } catch (_) { /* ignore partial SSE line */ }
      }
    }
  }

  async function runAIBeat(el, { messages, system, fallbackText }) {
    el.classList.add('ai-thinking');
    el.textContent = 'Thinking…';
    try {
      let first = true;
      await aiStream(messages, {
        system,
        onToken: t => {
          if (first) { el.textContent = ''; el.classList.remove('ai-thinking'); first = false; }
          el.textContent += t;
          el.scrollTop = el.scrollHeight;
        },
      });
      el.classList.remove('ai-thinking');
    } catch (_) {
      el.classList.remove('ai-thinking');
      await new Promise(r => setTimeout(r, 550)); // brief "thinking" beat
      await typewriter(el, fallbackText, { speed: 11 });
    }
  }

  window.DeckAI = { typewriter, aiStream, runAIBeat };
})();
