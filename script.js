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
