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

const floatingButton = document.querySelector('.floating-book-btn');
if (!floatingButton) {
  const calendlyButton = document.createElement('a');
  calendlyButton.href = 'https://calendly.com/hakizimanazidane/new-meeting';
  calendlyButton.target = '_blank';
  calendlyButton.rel = 'noopener noreferrer';
  calendlyButton.className = 'floating-book-btn';
  calendlyButton.setAttribute('aria-label', 'Fixer un rendez-vous');
  calendlyButton.title = 'Fixer un rendez-vous';
  calendlyButton.innerHTML = '<i class="fa-solid fa-calendar-check"></i>';
  document.body.appendChild(calendlyButton);
}

if (menuToggle && mainNav) {
  const updateMenuState = () => {
    const expanded = mainNav.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', String(expanded));
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars', !expanded);
      icon.classList.toggle('fa-xmark', expanded);
    }
  };

  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    updateMenuState();
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      updateMenuState();
    });
  });

  document.addEventListener('click', (event) => {
    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
      mainNav.classList.remove('open');
      updateMenuState();
    }
  });
}

const phrases = [
  'Embedded systems engineer and product builder.',
  'Building IoT, web, and Bitcoin-Lightning products.',
  'Turning hardware and software into real-world value.'
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

  setTimeout(typeLoop, deleting ? 36 : 86);
}

if (typedText) {
  typeLoop();
}

const reels = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reels.forEach((element) => revealObserver.observe(element));

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

    projectCards.forEach((card) => {
      const categories = card.dataset.category || '';
      const match = filter === 'all' || categories.includes(filter);
      card.style.display = match ? 'block' : 'none';
    });
  });
});

if (form) {
  const formSubmitUrl = 'https://formsubmit.co/ajax/hakizimanazidane@gmail.com';

  form.setAttribute('action', formSubmitUrl);
  form.setAttribute('method', 'POST');
  form.setAttribute('accept-charset', 'UTF-8');

  const hiddenCaptcha = document.createElement('input');
  hiddenCaptcha.type = 'hidden';
  hiddenCaptcha.name = '_captcha';
  hiddenCaptcha.value = 'false';
  form.appendChild(hiddenCaptcha);

  const hiddenSubject = document.createElement('input');
  hiddenSubject.type = 'hidden';
  hiddenSubject.name = '_subject';
  hiddenSubject.value = 'Nouveau message depuis Zedfolio';
  form.appendChild(hiddenSubject);

  const hiddenTemplate = document.createElement('input');
  hiddenTemplate.type = 'hidden';
  hiddenTemplate.name = '_template';
  hiddenTemplate.value = 'table';
  form.appendChild(hiddenTemplate);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.textContent : 'Send message';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    if (formStatus) {
      formStatus.textContent = 'Sending your message...';
    }

    try {
      const response = await fetch(formSubmitUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: new FormData(form)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Message delivery failed.');
      }

      if (formStatus) {
        formStatus.textContent = 'Thank you — your message has been sent successfully.';
      }
      form.reset();
    } catch (error) {
      console.error('Contact form error:', error);

      if (formStatus) {
        formStatus.textContent = 'The message could not be sent. Please email hakizimanazidane@gmail.com directly.';
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  });
}
