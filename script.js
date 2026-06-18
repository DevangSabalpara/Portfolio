// Navigation scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Intersection Observer for scroll animations (fade-in-up)
// This is much more reliable than GSAP for simple scroll reveals
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once visible if you only want it to animate once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in-up class
document.querySelectorAll('.fade-in-up').forEach((el) => {
    observer.observe(el);
});

// For staggered animations on cards within grids
const grids = document.querySelectorAll('.projects-grid, .skills-container, .education-grid');
grids.forEach(grid => {
    const cards = grid.querySelectorAll('.card');
    cards.forEach((card, index) => {
        // Add a slight transition delay based on index for a cascading effect
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Add 3D Tilt Effect to all Cards to make it "fully animated"
const script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js";
script.onload = () => {
    VanillaTilt.init(document.querySelectorAll(".card"), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.05
    });
};
document.body.appendChild(script);

// --- Coding Animated Background ---
const canvas = document.getElementById('code-canvas');
const ctx = canvas.getContext('2d');

let cw = window.innerWidth;
let ch = window.innerHeight;
canvas.width = cw;
canvas.height = ch;

const letters = '01{}[]();:<>flutterdartwidgetblocstatebuilderifelse'.split('');
const fontSize = 14;
let columns = cw / fontSize;
let drops = [];

function initDrops() {
    drops = [];
    columns = canvas.width / fontSize;
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
}
initDrops();

function draw() {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff00'; // Hacker green color
    ctx.font = fontSize + 'px monospace';

    // Draw falling code
    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDrops();
});

// Set dynamic current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();
