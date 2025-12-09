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
}function afficherMessage() {
    document.getElementById("message").innerText = "Merci d'avoir visité Senpay !";
}

