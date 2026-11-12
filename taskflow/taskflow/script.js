/* TaskFlow – landing page interactions */

// ---------- Mobile menu ----------
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu');

function setMenu(open) {
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
}
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
// Close the menu after tapping a link
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));

// ---------- Interactive Kanban board (drag and drop + tap to move) ----------
const columns = ['todo', 'doing', 'done'];
const fill = document.getElementById('progress-fill');
const label = document.getElementById('progress-label');
const lists = Object.fromEntries(columns.map(c => [c, document.querySelector(`[data-list="${c}"]`)]));
let tasks = [
  { id: 1, text: 'Write homepage copy', col: 'done' },
  { id: 2, text: 'Design pricing page', col: 'doing' },
  { id: 3, text: 'Set up email sign-up', col: 'todo' },
  { id: 4, text: 'Test on mobile', col: 'todo' }
];
let nextId = 5;
let draggedId = null;

function renderBoard() {
  columns.forEach(c => lists[c].replaceChildren());
  tasks.forEach(t => {
    const card = document.createElement('li');
    card.className = 'card';
    card.draggable = true;
    card.dataset.id = t.id;
    const text = document.createElement('span');
    text.textContent = t.text;                       // textContent keeps user input safe
    const move = document.createElement('button');
    move.type = 'button';
    move.className = 'card__move';
    move.textContent = t.col === 'done' ? '↺' : '→';
    move.setAttribute('aria-label', t.col === 'done' ? 'Move back to To do' : 'Move to next column');
    card.append(text, move);
    lists[t.col].append(card);
  });
  columns.forEach(c => {
    document.querySelector(`[data-col="${c}"] .count`).textContent = tasks.filter(t => t.col === c).length;
  });
  const done = tasks.filter(t => t.col === 'done').length;
  fill.style.width = (tasks.length ? (done / tasks.length) * 100 : 0) + '%';
  label.textContent = tasks.length && done === tasks.length ? 'All tasks done!' : `${done} of ${tasks.length} done`;
}
function moveTask(id, col) {
  const task = tasks.find(t => t.id === Number(id));
  if (task && task.col !== col) { task.col = col; renderBoard(); }
}

const kanban = document.querySelector('.kanban');
// Tap/click the arrow: move to the next column (works on touch screens too)
kanban.addEventListener('click', e => {
  const btn = e.target.closest('.card__move');
  if (!btn) return;
  const task = tasks.find(t => t.id === Number(btn.closest('.card').dataset.id));
  moveTask(task.id, columns[(columns.indexOf(task.col) + 1) % columns.length]);
});
// Drag and drop between columns
kanban.addEventListener('dragstart', e => {
  const card = e.target.closest('.card');
  if (!card) return;
  draggedId = card.dataset.id;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', draggedId);
  card.classList.add('dragging');
});
kanban.addEventListener('dragend', () => {
  draggedId = null;
  kanban.querySelectorAll('.dragging, .over').forEach(el => el.classList.remove('dragging', 'over'));
});
document.querySelectorAll('.col').forEach(col => {
  col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('over'); });
  col.addEventListener('dragleave', () => col.classList.remove('over'));
  col.addEventListener('drop', e => {
    e.preventDefault();
    col.classList.remove('over');
    if (draggedId) moveTask(draggedId, col.dataset.col);
  });
});
// Add a new task
document.getElementById('add-task').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('new-task');
  const text = input.value.trim();
  if (!text) { input.focus(); return; }
  tasks.push({ id: nextId++, text, col: 'todo' });
  input.value = '';
  renderBoard();
});
renderBoard();

// ---------- Pricing buttons: preselect the plan in the form ----------
const planSelect = document.getElementById('plan');
document.querySelectorAll('[data-plan]').forEach(btn => {
  btn.addEventListener('click', () => { planSelect.value = btn.dataset.plan; });
});

// ---------- Demo form validation ----------
const form = document.getElementById('demo-form');
const success = document.getElementById('form-success');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Each rule returns an error message, or '' if the value is valid
const rules = {
  name: v => v.trim().length < 2 ? 'Enter your full name.' : '',
  email: v => !v.trim() ? 'Enter your work email.' : !emailPattern.test(v.trim()) ? 'Enter a valid email, like name@company.com.' : '',
  message: v => v.trim().length < 10 ? 'Write at least 10 characters about your team.' : ''
};

function validateField(input) {
  const message = rules[input.name](input.value);
  const field = input.closest('.field');
  field.classList.toggle('invalid', Boolean(message));
  field.querySelector('.error').textContent = message;
  input.setAttribute('aria-invalid', String(Boolean(message)));
  return !message;
}

const inputs = Object.keys(rules).map(name => form.elements[name]);

// Validate when the user leaves a field, and re-check as they fix it
inputs.forEach(input => {
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => {
    if (input.closest('.field').classList.contains('invalid')) validateField(input);
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  success.hidden = true;

  const results = inputs.map(validateField);   // validate all fields, show every error
  const firstInvalid = inputs.find((_, i) => !results[i]);
  if (firstInvalid) { firstInvalid.focus(); return; }

  const firstName = form.elements.name.value.trim().split(' ')[0];
  success.textContent = `Thanks, ${firstName}! We received your request and will email you within one business day.`;
  success.hidden = false;
  form.reset();
  planSelect.value = 'Pro';
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Nav: shadow on scroll, highlight current section, back-to-top ----------
const nav = document.querySelector('.nav');
const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
  toTop.hidden = window.scrollY < 600;
}, { passive: true });
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    menu.querySelectorAll('a').forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => sectionObserver.observe(s));

// ---------- Stats: count up once when scrolled into view ----------
const counters = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '+';
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / 1200, 1);
      el.textContent = Math.round(target * p).toLocaleString() + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
    })(start);
    obs.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(c => countObserver.observe(c));

// ---------- Pricing: monthly / yearly toggle ----------
const billingButtons = document.querySelectorAll('.billing__btn');
billingButtons.forEach(btn => btn.addEventListener('click', () => {
  billingButtons.forEach(b => {
    const on = b === btn;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', String(on));
  });
  document.querySelectorAll('.price b').forEach(p => { p.textContent = p.dataset[btn.dataset.billing]; });
}));

// ---------- FAQ: keep one answer open at a time ----------
const faqItems = document.querySelectorAll('.faq details');
faqItems.forEach(item => item.addEventListener('toggle', () => {
  if (item.open) faqItems.forEach(other => { if (other !== item) other.open = false; });
}));

// ---------- Sign-up modal ----------
const modal = document.getElementById('signup-modal');
const signupForm = document.getElementById('signup-form');
const signupSuccess = document.getElementById('signup-success');
let lastFocused = null;

function openModal() {
  lastFocused = document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  signupForm.elements.email.focus();
}
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}
document.querySelectorAll('[data-open-modal]').forEach(b => b.addEventListener('click', () => { setMenu(false); openModal(); }));
modal.addEventListener('click', e => { if (e.target === modal || e.target.hasAttribute('data-close-modal')) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

// Reuse the same rule pattern as the demo form
const signupRules = {
  email: rules.email,
  password: v => v.length < 8 ? 'Use at least 8 characters.' : !/\d/.test(v) ? 'Include at least one number.' : ''
};
function checkSignup(input) {
  const msg = signupRules[input.name](input.value);
  const field = input.closest('.field');
  field.classList.toggle('invalid', Boolean(msg));
  field.querySelector('.error').textContent = msg;
  return !msg;
}
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  signupSuccess.hidden = true;
  const ok = ['email', 'password'].map(n => checkSignup(signupForm.elements[n])).every(Boolean);
  if (!ok) return;
  signupSuccess.textContent = 'Account created! Check your inbox to confirm your email.';
  signupSuccess.hidden = false;
  signupForm.reset();
});

// ---------- Dark mode (remembers the choice) ----------
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
function setTheme(theme) {
  root.dataset.theme = theme;
  themeBtn.textContent = theme === 'dark' ? '☀' : '☾';
  themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  try { localStorage.setItem('theme', theme); } catch (err) { /* storage unavailable */ }
}
let savedTheme = null;
try { savedTheme = localStorage.getItem('theme'); } catch (err) { /* ignore */ }
setTheme(savedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeBtn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

// ---------- Team-size price estimator ----------
const slider = document.getElementById('team-size');
const sliderOut = document.getElementById('team-size-out');
const estimate = document.getElementById('estimate');
const planPrice = name => Number(document.querySelector(`[data-plan-card="${name}"] .price b`).textContent);

function updateEstimate() {
  const n = Number(slider.value);
  sliderOut.textContent = `${n} ${n === 1 ? 'person' : 'people'}`;
  const plan = n <= 5 ? 'Free' : n <= 25 ? 'Pro' : 'Business';
  estimate.textContent = plan === 'Free'
    ? 'Your team fits the Free plan: $0 per month.'
    : `We suggest ${plan}: about $${n * planPrice(plan)} per month for ${n} people.`;
  document.querySelectorAll('[data-plan-card]').forEach(card =>
    card.classList.toggle('recommended', card.dataset.planCard === plan));
}
slider.addEventListener('input', updateEstimate);
billingButtons.forEach(b => b.addEventListener('click', updateEstimate));  // prices change with billing period
updateEstimate();

// ---------- Scroll progress bar ----------
const progressBar = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
}, { passive: true });

// ---------- Reveal cards as they scroll into view ----------
root.classList.add('js');
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    obs.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.feature, .steps li, .quote, .plan, .faq details').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 4) * 80 + 'ms';   // small stagger inside a row
  revealObserver.observe(el);
});
