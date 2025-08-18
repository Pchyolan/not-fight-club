const home = document.getElementById("menu-fight");
const character = document.getElementById("menu-character");
const settings = document.getElementById("menu-settings");
const fight = document.getElementById("btnFight")

home.addEventListener("click", () => {
    window.location.href = "index.html";
})

character.addEventListener("click", () => {
    window.location.href = "pers.html";
})

settings.addEventListener("click", () => {
    window.location.href = "settings.html";
})

fight.addEventListener("click", () => {
    window.location.href = "fight.html";
})