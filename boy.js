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

const persName = document.getElementById("pers-fight-name");

const playerName = localStorage.getItem("playerName");
const playerPhoto = localStorage.getItem("chosenPhoto");
const playerIcon = localStorage.getItem("choseIcon");
persName.textContent = playerName;
document.getElementById("photo-fight").src = playerPhoto;
document.getElementById("pers-icon-fight").src = playerIcon;