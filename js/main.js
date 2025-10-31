const burger = document.getElementById("burger");
const nav = document.getElementById("nav-links");
const themeToggle = document.getElementById("theme-toggle");

// Navbar burger toggle
burger.addEventListener("click", () => {
  nav.classList.toggle("active");
  burger.classList.toggle("fa-times");
});



// Theme toggle
themeToggle.addEventListener("click", () => {
  const theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.body.setAttribute("data-theme", theme);
  themeToggle.classList.toggle("fa-sun");
  themeToggle.classList.toggle("fa-moon");
});

// ScrollReveal animations
ScrollReveal().reveal(".hero h1, .hero p, .hero .btn", { delay:200, distance:"50px", origin:"bottom", duration:800, interval:100 });
ScrollReveal().reveal(".section h2", { distance:"40px", origin:"bottom", duration:700 });
ScrollReveal().reveal(".project-card", { interval:150, distance:"40px", origin:"bottom", duration:700 });

// Animate skill bars
const skillBars = document.querySelectorAll(".progress");
const animateSkills = () => {
  skillBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) bar.style.width = bar.dataset.progress + "%";
  });
};
window.addEventListener("scroll", animateSkills);
animateSkills();

// Fade-in elements
const faders = document.querySelectorAll(".fade-in");
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{ threshold:0.2 });
faders.forEach(fade => appearOnScroll.observe(fade));

// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

// Project Modal
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalLink = document.getElementById("modal-link");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".project-card .btn-small").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const card = e.target.closest(".project-card");
    modalTitle.textContent = card.querySelector("h3").textContent;
    modalDesc.textContent = card.querySelector("p").textContent;
    modalLink.href = "#";
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => modal.style.display="none");
window.addEventListener("click", e => { if(e.target===modal) modal.style.display="none"; });

// Project filtering
const filterButtons = document.createElement("div");
filterButtons.className="filter-buttons";
filterButtons.innerHTML=`
  <button class="active" data-filter="all">All</button>
  <button data-filter="web">Web</button>
  <button data-filter="ai">AI</button>
  <button data-filter="iot">IoT</button>
`;
document.querySelector(".projects h2").after(filterButtons);

filterButtons.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-buttons .active").classList.remove("active");
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      card.style.display = filter==="all" || card.dataset.category===filter ? "block" : "none";
    });
  });
});

// EmailJS contact form
(function(){ emailjs.init("602CPH3gd6y_FsGnv"); })();

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
form.addEventListener("submit", function(e){
  e.preventDefault();
  status.textContent="Sending...";
  emailjs.sendForm("service_5rgg6cw","template_5s4kzg3",this)
    .then(()=>{ status.textContent="Message sent successfully ✅"; form.reset(); })
    .catch(err=>{ console.error(err); status.textContent="Oops! Something went wrong ❌"; });
});



// Configuration des animations ScrollReveal
ScrollReveal().reveal('.section h2, .section p:not(.typed-text)', {
    delay: 200,
    distance: '30px',
    origin: 'top',
    interval: 50
});

// Animation pour la section Vision (gauche et droite)
ScrollReveal().reveal('.fade-left', {
    delay: 300,
    distance: '50px',
    origin: 'left'
});

ScrollReveal().reveal('.fade-right', {
    delay: 300,
    distance: '50px',
    origin: 'right'
});

// Animation pour la section Testimonials (du bas vers le haut avec un intervalle)
ScrollReveal().reveal('.testimonial-card', {
    delay: 300,
    distance: '30px',
    origin: 'bottom',
    interval: 200, // Défilement échelonné pour chaque carte
    easing: 'ease-in-out'
});

// Conserver l'animation pour les autres éléments (Timeline, etc.)
ScrollReveal().reveal('.about-content, .skills-grid, .values-grid, .project-grid', {
    delay: 400,
    interval: 200,
    origin: 'bottom'
});

// Ajout de l'année courante au pied de page
document.getElementById('year').textContent = new Date().getFullYear();