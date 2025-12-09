const button = document.getElementById("themeToggle");

button.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}
// Menu mobile
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("show");
});
// ===== SLIDER =====

let index = 0;
const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
    document.querySelector(".slides").style.transform = `translateX(-${i * 100}%)`;
}

// Boutons
next.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
});

prev.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
});

// Défilement automatique toutes les 5 sec
setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
}, 5000);
// ==== ANIMATION SCROLL ==== //

const elements = document.querySelectorAll('.fade-in');

function revealOnScroll() {
    elements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
