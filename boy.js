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


const btnsAttack = document.querySelectorAll(".attack-btn");
const btnFight = document.getElementById("fight-btn");
let choseAttack = null;
const btnsDefens = document.querySelectorAll(".defens-btn");
let choseDefensBtn = [];


function checkAttack() {
    const isRight = choseAttack !== null && choseDefensBtn.length == 2;
    btnFight.disabled = !isRight;
}

function choseBtn(chose) {
    btnsAttack.forEach(btn => btn.classList.remove('selected'));
    chose.classList.add('selected');
    choseAttack = chose.dataset.zone;
    checkAttack();
}

btnsAttack.forEach(btn => {
    btn.addEventListener("click", () => {
        choseBtn(btn);
    });
});

function goLight() {
    btnsDefens.forEach(btn => {
        const zone = btn.dataset.zone;
        if (choseDefensBtn.includes(zone)) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

btnsDefens.forEach(btn => {
    btn.addEventListener("click", () => {
        const zone = btn.dataset.zone;
        if (choseDefensBtn.includes(zone)) {
            choseDefensBtn = choseDefensBtn.filter(n => n !== zone);
        } else {
            if (choseDefensBtn.length >= 2) {
                choseDefensBtn.shift();
            }
            choseDefensBtn.push(zone);
        }
        goLight();
        checkAttack()
    });
});

goLight();

const player = {
    name: playerName,
    hp: 100,
    maxHp: 100,
    damage: 10,
    critChance: 0.2,
    critCoeff: 1.5,
    attacksPerTurn: 1,
    blocksPerTurn: 2
}

const opponents = [
    {
        name: "Лао Инь",
        img: "img/prot-1.png",
        hp: 100,
        maxHp: 100,
        damage: 10,
        critChance: 0.2,
        critCoeff: 1.5,
        attacksPerTurn: 2,
        blocksPerTurn: 1
    },
    {
        name: "Мясник",
        img: "img/prot-2.png",
        hp: 100,
        maxHp: 100,
        damage: 20,
        critChance: 0.2,
        critCoeff: 1.5,
        attacksPerTurn: 1,
        blocksPerTurn: 3
    },
    {
        name: "Шиз",
        img: "img/prot-3.png",
        hp: 100,
        maxHp: 100,
        damage: 15,
        critChance: 0.2,
        critCoeff: 1.5,
        attacksPerTurn: 1,
        blocksPerTurn: 1
    },
]

const randomOpp = opponents[Math.floor(Math.random * opponents.length)]