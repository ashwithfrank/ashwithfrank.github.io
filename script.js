/* ── PIXEL CURSOR (stepped, not smooth — feels 8-bit) ─── */
const cur = document.getElementById('cur');
const ring = document.getElementById('ring');

if (cur && ring && window.matchMedia('(hover: hover)').matches) {
  const STEP = 6; // snap grid in px
  let mx = 0, my = 0;
  let frame = 0;

  document.addEventListener('mousemove', (e) => {
    mx = Math.round(e.clientX / STEP) * STEP;
    my = Math.round(e.clientY / STEP) * STEP;
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
  });

  (function tick() {
    frame++;
    // ring updates every 4th frame -> visible "trailing" stepped motion
    if (frame % 4 === 0) {
      ring.style.left = mx + 'px';
      ring.style.top = my + 'px';
    }
    requestAnimationFrame(tick);
  })();

  document.querySelectorAll('a, button, .pxl-btn, .cbtn, .plink').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cur.style.width = '20px';
      cur.style.height = '20px';
      ring.style.width = '42px';
      ring.style.height = '42px';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width = '14px';
      cur.style.height = '14px';
      ring.style.width = '30px';
      ring.style.height = '30px';
    });
  });
}

/* ── SCROLL REVEAL (blocky snap-in) ─────────────────────── */
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('on'), i * 60);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

/* ── BUTTON PRESS FEEDBACK (touch + mouse) ──────────────── */
document.querySelectorAll('.pxl-btn, .cbtn, .plink').forEach((el) => {
  el.addEventListener('pointerdown', () => el.classList.add('is-pressed'));
  el.addEventListener('pointerup', () => el.classList.remove('is-pressed'));
  el.addEventListener('pointerleave', () => el.classList.remove('is-pressed'));
});
