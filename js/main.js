/* ─── MAIN.JS ─── */

// ─── LOADER ───
window.addEventListener('load', () => {
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.innerHTML = `<div class="loader-text">CG.</div>`;
  document.body.prepend(loader);
  setTimeout(() => { loader.classList.add('done'); loader.remove(); }, 900);
});

// ─── CUSTOM CURSOR ───
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
});
(function animateFollower() {
  fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px'; follower.style.top = fy + 'px';
  requestAnimationFrame(animateFollower);
})();
document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    follower.style.opacity = '0.15';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.opacity = '0.5';
  });
});

// ─── NAV SCROLL ───
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── HAMBURGER ───
const hamburger = document.getElementById('hamburger');
let mobileMenu = null;
hamburger.addEventListener('click', () => {
  if (!mobileMenu) {
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    const links = ['#about','#skills','#projects','#certifications','#contact'];
    const labels = ['About','Skills','Projects','Certs','Contact'];
    links.forEach((href, i) => {
      const a = document.createElement('a');
      a.href = href; a.textContent = labels[i];
      a.addEventListener('click', closeMobile);
      mobileMenu.appendChild(a);
    });
    const adminLink = document.createElement('a');
    adminLink.href = 'admin/index.html'; adminLink.textContent = 'Admin ↗';
    adminLink.style.color = 'var(--accent)';
    mobileMenu.appendChild(adminLink);
    document.body.appendChild(mobileMenu);
  }
  mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
});
function closeMobile() { mobileMenu && mobileMenu.classList.remove('open'); hamburger.classList.remove('active'); }

// ─── REVEAL ON SCROLL ───
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => revealObs.observe(el));

// ─── COUNTER ANIMATION ───
function animateCounter(el, target) {
  const isYear = target > 100;
  const duration = isYear ? 1500 : 1000;
  const start = isYear ? target - 4 : 0;
  let startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(start + (target - start) * ease);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}
const statNums = document.querySelectorAll('.stat-num');
const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target, parseInt(e.target.dataset.target));
      statObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObs.observe(el));

// ─── RENDER SKILLS ───
function renderSkills() {
  const data = window.PORTFOLIO || DEFAULT_DATA;
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;
  grid.innerHTML = data.skills.map(s => `
    <div class="skill-card reveal">
      <div class="skill-icon">${s.icon}</div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-level">${s.level}</div>
      <div class="skill-bar"><div class="skill-bar-fill" data-width="${s.percent}"></div></div>
    </div>
  `).join('');

  // Re-observe new reveal elements
  grid.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // Animate skill bars
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target.querySelector('.skill-bar-fill');
        if (fill) setTimeout(() => { fill.style.width = fill.dataset.width + '%'; }, 200);
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  grid.querySelectorAll('.skill-card').forEach(el => barObs.observe(el));
}

// ─── RENDER PROJECTS ───
function renderProjects() {
  const data = window.PORTFOLIO || DEFAULT_DATA;
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = data.projects.map(p => `
    <div class="project-card reveal">
      <div class="project-thumb" style="background:${p.bgColor}">${p.emoji}</div>
      <div class="project-body">
        <div class="project-tag">${p.tag}</div>
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-links">
          ${p.link ? `<a href="${p.link}" target="_blank" class="project-link">🔗 Read More</a>` : ''}
          ${p.github ? `<a href="${p.github}" target="_blank" class="project-link">⭐ GitHub</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
  grid.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
}

// ─── RENDER CERTS ───
function renderCerts() {
  const data = window.PORTFOLIO || DEFAULT_DATA;
  const grid = document.getElementById('certsGrid');
  if (!grid) return;
  grid.innerHTML = data.certifications.map(c => `
    <div class="cert-card reveal">
      <div class="cert-icon">${c.icon}</div>
      <div class="cert-content">
        <div class="cert-name">${c.name}</div>
        <div class="cert-body">${c.body}</div>
        <div class="cert-year">${c.year}</div>
      </div>
    </div>
  `).join('');
  grid.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
}

// ─── CONTACT FORM ───
function handleContactForm(e) {
  e.preventDefault();
  const form = e.target;
  const msg = document.getElementById('formMsg');
  const btn = form.querySelector('button[type=submit]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    msg.textContent = '✓ Message sent! I\'ll get back to you shortly.';
    form.reset();
    btn.textContent = 'Send Message →';
    btn.disabled = false;
  }, 1500);
}

// ─── YEAR ───
document.getElementById('year').textContent = new Date().getFullYear();

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  window.PORTFOLIO = getPortfolioData();
  renderSkills();
  renderProjects();
  renderCerts();

  // Staggered hero reveals
  document.querySelectorAll('.hero-content .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 120);
  });
});
