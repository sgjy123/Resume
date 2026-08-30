/* ===== Canvas Particle Background ===== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let W, H, mouseX = -1000, mouseY = -1000;

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  const glow = document.getElementById('cursorGlow');
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

class Particle {
  constructor() { this.reset(true); }
  reset(initial = false) {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r = Math.random() * 1.6 + 0.4;
    this.a = Math.random() * 0.5 + 0.2;
    this.color = Math.random() > 0.5 ? '#00f0c8' : '#00e0ff';
    if (initial) this.y = Math.random() * H;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
    const dx = mouseX - this.x, dy = mouseY - this.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 150) {
      const f = (150 - dist) / 150;
      this.x -= dx * f * 0.02;
      this.y -= dy * f * 0.02;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.a;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

const particleCount = Math.min(120, Math.floor((W * H) / 15000));
for (let i = 0; i < particleCount; i++) particles.push(new Particle());

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = '#00f0c8';
        ctx.globalAlpha = (1 - d / 130) * 0.15;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animate);
}
animate();

/* ===== Typing animation ===== */
const phrases = [
  'Frontend Developer',
  'Vue / React Engineer',
  'BI 数据可视化',
  '低代码 · 万象表单',
  'H5 · 钉钉微应用',
];
let pi = 0, ci = 0, deleting = false;
const typerEl = document.getElementById('typerText');
function type() {
  const cur = phrases[pi];
  typerEl.textContent = cur.slice(0, ci);
  if (!deleting && ci < cur.length) {
    ci++;
    setTimeout(type, 110);
  } else if (deleting && ci > 0) {
    ci--;
    setTimeout(type, 55);
  } else {
    deleting = !deleting;
    if (!deleting) {
      pi = (pi + 1) % phrases.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, 1200);
    }
  }
}
type();

/* ===== Scroll reveal ===== */
const blocks = document.querySelectorAll('.block');
const blockObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('reveal');
      // Animate skill rings
      e.target.querySelectorAll('.ring-card').forEach(card => {
        const pct = parseInt(card.dataset.ring);
        const ring = card.querySelector('.ring-fg');
        const circ = 2 * Math.PI * 52; // 326.7
        ring.style.strokeDashoffset = circ * (1 - pct / 100);
        // Animate the number
        const valEl = card.querySelector('.ring-value');
        let cur = 0;
        const step = pct / 60;
        const timer = setInterval(() => {
          cur += step;
          if (cur >= pct) { cur = pct; clearInterval(timer); }
          valEl.childNodes[0].nodeValue = Math.floor(cur);
        }, 25);
      });
    }
  });
}, { threshold: 0.15 });
blocks.forEach(b => blockObs.observe(b));

/* ===== Number counter ===== */
function animateNumber(el) {
  const target = parseInt(el.dataset.count);
  let cur = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    cur += step;
    if (cur >= target) { cur = target; clearInterval(timer); }
    el.textContent = Math.floor(cur);
  }, 25);
}
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.num').forEach(n => animateNumber(n));
      statObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stats-row').forEach(s => statObs.observe(s));

/* ===== Progress bar ===== */
const prog = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  prog.style.width = pct + '%';
});

/* ===== Side nav active ===== */
const sideLinks = document.querySelectorAll('.side-nav a');
const secObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      sideLinks.forEach(l => l.classList.remove('active'));
      const match = document.querySelector(`.side-nav a[data-sec="${e.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { threshold: 0.35 });
document.querySelectorAll('#hero, .block').forEach(s => secObs.observe(s));

/* ===== Project card mouse spotlight ===== */
document.querySelectorAll('.proj').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});
