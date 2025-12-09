// basic script helpers
function toggleNav(){
  const links = document.querySelector('.nav-links');
  if(!links) return;
  if(getComputedStyle(links).display === 'none') links.style.display = 'flex';
  else links.style.display = 'none';
}

// small animation for cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((c, i)=> c.style.animationDelay = (i*100)+'ms');
});
