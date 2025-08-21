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

const reactionsOpp = {
    temple: [

    ],
    jav: [

    ],
    belly: [

    ],
    liver: [

    ],
    shin: [

    ],
}

const reactionsPlayer = {
    temple: [

    ],
    jav: [

    ],
    belly: [

    ],
    liver: [

    ],
    shin: [

    ],
}


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
        icon: "img/cross.png",
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
        icon: "img/axe.png",
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
        icon: "img/bottle.png",
        hp: 100,
        maxHp: 100,
        damage: 5,
        critChance: 0.2,
        critCoeff: 1.5,
        attacksPerTurn: 1,
        blocksPerTurn: 1
    },
]

const opp = opponents[Math.floor(Math.random() * opponents.length)];

document.querySelector(".protivnik .pers-name").textContent = opp.name;
document.querySelector(".protivnik .photo-pers").src = opp.img;
document.querySelector(".protivnik .icon-prot img").src = opp.icon;
document.querySelector(".protivnik .prot-health p").textContent = `${opp.hp}/${opp.maxHp}`;


const ZONES = ["temple", "jav", "belly", "liver", "shin"];

function choseRandomZone(k) {
    const copyZone = [...ZONES];
    const result = [];
    while (result.length < k && copyZone.length) {
        const n = Math.floor(Math.random() * copyZone.length)
        result.push(copyZone.splice(n, 1)[0]);
    }

    return result;
}

function updateHp() {
    document.querySelector(".pers-health p").textContent = `${player.hp}/${player.maxHp}`;
    document.querySelector(".prot-health p").textContent = `${opp.hp}/${opp.maxHp}`;

    const playerProts = Math.max(0, Math.round((player.hp / player.maxHp) * 100));
    const oppProts = Math.max(0, Math.round((opp.hp / opp.maxHp) * 100));

    document.querySelector(".pers-polosa .pers-life").style.width = playerProts + "%"
    document.querySelector(".prot-polosa .prot-life").style.width = oppProts + "%"
}

function minusDamage(boec, dmg) {
    boec.hp = Math.max(0, boec.hp - dmg);
}

function checkEnd() {
    if (player.hp <= 0 || opp.hp <= 0) {
        const result =
            player.hp <= 0 && opp.hp <= 0 ? "Ухты, ничья" :
                player.hp <= 0 ? "Лууузер" : "Победа, на удивление";
        alert(result);

        return true;
    }

    return false;
}

function changePhoto() {
    if (player.hp <= 50) {
        const newPersPhoto = playerPhoto.replace(".png", ".2.png");
        document.querySelector(".player-pers .photo-pers").src = newPersPhoto;
        console.log(newPersPhoto)
    }

    if (opp.hp <= 50) {
        const newOppPhoto = opp.img.replace(".png", ".2.png");
        document.querySelector(".protivnik .photo-pers").src = newOppPhoto;
        console.log(newOppPhoto)
    }
}

function addLog({who, whom, zone, dmg}) {
    const log = document.getElementById("fight-log");
    if (!log) return;

    const row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
    <span class="who">${who}</span> атаковал
    <span class="whom">${whom}</span> в
    <span class="zone">${zone}</span>, -
    <span class="dmg">${dmg}</span> hp.
    `;

    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
}

btnFight.addEventListener("click", () => {

    const playerAttacks = choseAttack;
    const playerBlocks = [...choseDefensBtn];

    const oppAttacks = choseRandomZone(opp.attacksPerTurn);
    const oppBlocks = choseRandomZone(opp.blocksPerTurn);

    let dmgToPlayer = 0;
    let dmgToOpp = 0;

    if (!oppBlocks.includes(playerAttacks)) {
        dmgToOpp += player.damage;
    }

    if (!playerBlocks.includes(oppAttacks)) {
        dmgToPlayer += opp.damage;
    }
    minusDamage(opp, dmgToOpp);
    minusDamage(player, dmgToPlayer);

    updateHp();
    changePhoto();
    if (checkEnd()) return;
})