/* ── custom cursor ─────────────────────────────────────────── */
const cur = document.getElementById('cur');
const ring = document.getElementById('ring');
let mx = 0, my = 0, rx = 0, ry = 0;
const isTouch = window.matchMedia('(pointer: coarse), (hover: none)').matches;

if (!isTouch) {
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function tick() {
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    rx += (mx - rx) * .14; ry += (my - ry) * .14;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(tick);
  })();
  document.querySelectorAll('a, button, .glass').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });
}

/* ── navbar scroll state ───────────────────────────────────── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── scroll reveal ─────────────────────────────────────────── */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('on'), i * 70);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── background orb parallax (mouse) ──────────────────────── */
if (!isTouch) {
  const orbs = document.querySelectorAll('.orb');
  let px = 0, py = 0;
  document.addEventListener('mousemove', e => {
    px = (e.clientX / window.innerWidth - 0.5);
    py = (e.clientY / window.innerHeight - 0.5);
  });
  (function parallax() {
    orbs.forEach((orb, i) => {
      const depth = (i + 1) * 8;
      orb.style.transform = `translate(${px * depth}px, ${py * depth}px)`;
    });
    requestAnimationFrame(parallax);
  })();
}

/* ── subtle 3D tilt on glass cards ────────────────────────── */
if (!isTouch) {
  document.querySelectorAll('.acard, .scard, .pcard').forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${cy * -5}deg) rotateY(${cx * 6}deg) translateZ(0)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
