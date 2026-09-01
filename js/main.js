const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const typedText = document.getElementById('typed-text');
const year = document.getElementById('year');
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (year) {
  year.textContent = new Date().getFullYear();
}

const savedTheme = localStorage.getItem('zedfolio-theme');
if (savedTheme === 'light') {
  body.setAttribute('data-theme', 'light');
  if (themeToggle) {
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', nextTheme);
    localStorage.setItem('zedfolio-theme', nextTheme);
    themeToggle.innerHTML = nextTheme === 'light'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  });
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
}

const phrases = [
  'Web developer with product thinking.',
  'AI and systems builder.',
  'Designing clean interfaces and solid logic.'
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typedText) return;

  const phrase = phrases[phraseIndex];

  if (!deleting) {
    typedText.textContent = phrase.slice(0, charIndex + 1);
    charIndex += 1;

    if (charIndex >= phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    typedText.textContent = phrase.slice(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex <= 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 36 : 88);
}

if (typedText) {
  typeLoop();
}

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((element) => revealObserver.observe(element));

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (formStatus) {
      formStatus.textContent = 'Thank you — your message is ready to be sent.';
    }

    form.reset();
  });
}
