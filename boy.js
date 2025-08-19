const home = document.getElementById("menu-fight");
const character = document.getElementById("menu-character");
const settings = document.getElementById("menu-settings");

home.addEventListener("click", () => {
    window.location.href = "menu.html";
});

character.addEventListener("click", () => {
    window.location.href = "pers.html";
});

settings.addEventListener("click", () => {
    window.location.href = "settings.html";
});