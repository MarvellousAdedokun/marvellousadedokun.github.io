// Theme toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Load stored theme on start
(() => {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

// Smooth scroll navigation
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Highlight active nav item on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) current = section.getAttribute('id');
  });
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// Simple contact form mailto handler
function sendMsg(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim() || 'Contact from Portfolio';
  const message = form.message.value.trim();
  const mailto = `mailto:your@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
  window.location.href = mailto;
  form.reset();
}

// Optional: Example dynamic project cards
const projects = [
  {
    title: 'Customer Churn Prediction',
    desc: 'Predicting churn using gradient boosting and SHAP interpretability.',
    tags: ['ml'],
    link: 'https://github.com/yourusername/churn-prediction'
  },
  {
    title: 'NLP Text Classifier',
    desc: 'Fine-tuned BERT for multi-label news classification.',
    tags: ['nlp'],
    link: 'https://github.com/yourusername/nlp-text-classifier'
  },
  {
    title: 'COVID-19 Dashboard',
    desc: 'Interactive D3.js dashboard visualizing case trends and forecasts.',
    tags: ['viz'],
    link: 'https://github.com/yourusername/covid-dashboard'
  }
];

const grid = document.getElementById('projectsGrid');
projects.forEach(p => {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.tags = p.tags.join(' ');
  card.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p><a href="${p.link}" target="_blank">View on GitHub</a>`;
  grid.appendChild(card);
});

// Filter projects
document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.projects-grid .card').forEach(card => {
      if (filter === 'all' || card.dataset.tags.includes(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
