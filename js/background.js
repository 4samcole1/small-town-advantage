/* background.js — the ambient generative node-network field, echoing
   SC Creative's HeroNetwork: drifting teal nodes with radial-gradient
   glow halos, a soft breathing pulse, and faint connecting lines.
   Kept low-opacity so slide text stays razor-legible.
   Respects prefers-reduced-motion (renders one static frame). */

(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const TEAL = '28,199,195';
  const NODE_COUNT = 56;
  const CONNECT_DIST = 190;

  let width, height, dpr, nodes = [], raf = null;

  function fit() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: 1.2 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // connecting lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.16;
          ctx.strokeStyle = 'rgba(' + TEAL + ',' + alpha + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // nodes: glow halo + solid core, each breathing independently
    for (const n of nodes) {
      const pulse = Math.sin(n.phase) * 0.12 + 0.88;
      const r = n.r * pulse;
      const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
      halo.addColorStop(0, 'rgba(' + TEAL + ',' + (0.22 * pulse) + ')');
      halo.addColorStop(1, 'rgba(' + TEAL + ',0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(' + TEAL + ',' + (0.75 * pulse) + ')';
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function step() {
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      n.phase += 0.008;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }
    draw();
    raf = requestAnimationFrame(step);
  }

  fit();
  makeNodes();
  draw();
  if (!reduceMotion) raf = requestAnimationFrame(step);

  window.addEventListener('resize', () => { fit(); makeNodes(); draw(); });
})();
