// Thème sombre/clair + sauvegarde dans localStorage
(function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  // Initialisation du thème
  const saved = localStorage.getItem('senpay-theme');
  if(saved === 'light') root.classList.add('light');

  // Basculer thème
  themeToggle.addEventListener('click', ()=>{
    root.classList.toggle('light');
    const now = root.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('senpay-theme', now);
  });

  // Menu mobile
  menuBtn.addEventListener('click', ()=>{
    const open = mobileMenu.style.display === 'block';
    mobileMenu.style.display = open ? 'none' : 'block';
  });

  // Lazy load images
  document.addEventListener('DOMContentLoaded', ()=>{
    const imgs = document.querySelectorAll('img');
    imgs.forEach(img=>{
      if(!img.hasAttribute('loading')) img.setAttribute('loading','lazy');
    });
  });
})();
