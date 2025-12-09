// script.js - hamburger + small UI helpers
document.addEventListener('DOMContentLoaded', ()=> {
  // mobile nav hide on load for small screens
  if (window.innerWidth < 640) {
    const links = document.querySelector('.nav-links');
    if (links) links.style.display = 'none';
  }
});

// simple float animations for cards (optional)
const cards = document.querySelectorAll('.card');
cards.forEach((c, i)=>{
  c.style.animationDelay = (i * 100) + 'ms';
});
// ==== ANIMATION SCROLL ==== //
const elements = document.querySelectorAll('.fade-in');
function revealOnScroll() {
    elements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if(top < window.innerHeight - 100) el.classList.add('visible');
    });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ==== THÈME SOMBRE/CLAIR ==== //
const toggle = document.querySelector('.theme-toggle');
toggle.addEventListener('click', () => {
    if(document.documentElement.style.getPropertyValue('--bg') === '#111'){
        document.documentElement.style.setProperty('--bg','#fff');
        document.documentElement.style.setProperty('--text','#111');
        document.documentElement.style.setProperty('--card','#eee');
        toggle.textContent = '🌙';
    }else{
        document.documentElement.style.setProperty('--bg','#111');
        document.documentElement.style.setProperty('--text','#eee');
        document.documentElement.style.setProperty('--card','#1a1a1a');
        toggle.textContent = '☀️';
    }
});
