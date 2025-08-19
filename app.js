const home = document.getElementById("menu-fight");
const character = document.getElementById("menu-character");
const settings = document.getElementById("menu-settings");
const fight = document.getElementById("btnFight");

home.addEventListener("click", () => {
    window.location.href = "index.html";
});

character.addEventListener("click", () => {
    window.location.href = "pers.html";
});

settings.addEventListener("click", () => {
    window.location.href = "settings.html";
});

fight.addEventListener("click", () => {
    window.location.href = "fight.html";
});

const helloWords = [
    "{name} на ринге! Как приятно видеть твое еще не разбитое личико.",
    "О, {name}! Сколько секунд продержишься сегодня - 10 или целых 15?",
    "Смотрите-ка, {name} снова с нами. Твой стон боли - моя любимая мелодия",
    "С возвращением, {name}. Сегодня будем бить по твоему самолюбию или по печени?",
    "{name} в игре! Давай проверим, что сломается первым - твоя воля или челюсть",
    "Смотри, кто пришёл… {name}, ты точно мазохист",
    "И снова {name}. Сколько ударов нужно, чтобы стереть твою улыбку?",
    "Добро пожаловать, {name}. Ринг соскучился по твоей боли",
    "{name}, ты пахнешь страхом. Отличный аромат для боя"
];

const tylerHello = document.getElementById("tyler-hello");
const playerName = localStorage.getItem("playerName");

function randomWord() {
    const index = Math.floor(Math.random() * helloWords.length);
    return helloWords[index];
}
const fraza = randomWord();
tylerHello.textContent = fraza.replaceAll("{name}", playerName);