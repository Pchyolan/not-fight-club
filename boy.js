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
        "Похоже, он увидел звезды.",
        "Выглядит ошеломленным..",
        "Трясет головой, приходя в себя",
        "В его взляде появилась пустота",
        "На мгновение теряет ориентацию"
    ],
    jav: [
        "Его зубы щелкают.",
        "Он прикусывает язык",
        "Его глаза закатываются",
        "Сплëвывает кровью под ноги",
        "Не в силах разжать зубы"
    ],
    belly: [
        "Издает хриплый вдох",
        "Бледнеет и замирает",
        "Слышен глухой стон",
        "Шипит от ярости и боли",
        "Отскакивает, хватаясь за бок"
    ],
    liver: [
        "Он медленно оседает",
        "На лбу выступает пот",
        "Кашляет, пытаясь вдохнуть",
        "Его взглят мутнеет от шока",
        "Падает на колено, кряхтя от боли"
    ],
    shin: [

        "Подпрыгивает на одной ноге",
        "Злобно смотрит на тебя..",
        "Пританцовывает, скрывая боль",
        "По лицу пробегает досада",
        "Спотыкается, теряя равновесие"
    ],
}

const reactionsPlayer = {
    temple: [
        "Звон в ушах",
        "Искры из глаз",
        "Череп загудел",
        "Мысли разбежались",
        "Время замедлилось"
    ],
    jav: [
        "Зубы поют хором",
        "Привет, ассиметрия",
        "Прикусил язык",
        "Сустав щелкнул",
        "Мозг завис"
    ],
    belly: [
        "Вспомнил, чем завтракал",
        "Дыхание сломалось пополам",
        "Кишки вспомнили детство",
        "Нервный узел распался",
        "Внутри все перемешалось"
    ],
    liver: [
        "Почка простилась",
        "Почувствовал вкус железа?",
        "Тело согнулось в крюк",
        "Темнота наступает с краев",
        "Дыши, если можешь.."
    ],
    shin: [
        "Хромота - твой новый стиль",
        "Походка стала интереснее",
        "Звук, как щелчок ореха",
        "Судорога сводит икру",
        "Кость возмущенно завизжала"
    ],
}

const glagols = [
    "бьет",
    "лупит",
    "мочит",
    "вмазывает",
    "пробивает",
    "врезает",
    "наносит удар"
];

const reactBlockPlayer = [
    "Тебе повезло. Пока что",
    "Удача тебе улыбнулась",
    "Ты купил себе пару секунд",
    "Наслаждайся мелкой победой",
    "Жесткий блок! Теперь ответь",
    "Отбил! Инстинкты сработали",
    "Удар заблокирован! Удивил."
];

const reactBlockOpp = [
    "Блок. Он усмехается тебе в лицо",
    "Отбил! И плюнул тебе под ноги",
    "Принял на блок и даже не моргнул",
    "Отклоняет удар. Злобно ухмыльнулся",
    "Удар заблокирован. Зевнул от скуки",
    "Защитился. «Слабо?» - шепчет он"
]

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
        name: "Чен Сян",
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

function addLog({ who, doo, whom, zone, dmg, react }) {
    const log = document.getElementById("fight-log");
    if (!log) return;

    const row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
    <span class="who">${who}</span>
    <span class="doo">${doo}</span>
    <span class="whom">${whom}</span> в
    <span class="zone">${zone}</span>,
    -<span class="dmg">${dmg}</span> hp.
    <span class="react">${react}</span>
    `;

    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
}

function toRussian(zon) {
    if (zon === "temple") {
        return "висок";
    } else if (zon === "jav") {
        return "челюсть";
    } else if (zon === "belly") {
        return "живот";
    } else if (zon === "liver") {
        return "печень";
    } else if (zon === "shin") {
        return "голень";
    }
}

btnFight.addEventListener("click", () => {

    const playerAttacks = choseAttack;
    const playerBlocks = [...choseDefensBtn];

    const oppAttacks = choseRandomZone(opp.attacksPerTurn);
    const oppBlocks = choseRandomZone(opp.blocksPerTurn);

    let dmgToPlayer = 0;
    let dmgToOpp = 0;

    function getGlagol(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function choseReaction(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function getReactionOpp(zonee, itogDamage) {
        if (itogDamage === 0) {
            return reactBlockOpp[Math.floor(Math.random() * reactBlockPlayer.length)];
        } else {
            const rea = reactionsOpp[zonee];
            return choseReaction(rea);
        }
    }

    function getReactionPlayer(zonee,itogDamage) {
        if (itogDamage === 0) {
            return reactBlockPlayer[Math.floor(Math.random() * reactBlockOpp.length)];
        } else {
            const rea = reactionsPlayer[zonee];
            return choseReaction(rea);
        }
    }

    {
        const block = oppBlocks.includes(playerAttacks);
        const itogDamage = block ? 0 : player.damage

        addLog({
            who: player.name,
            doo: getGlagol(glagols),
            whom: opp.name + "a",
            zone: toRussian(playerAttacks),
            dmg: itogDamage,
            react: getReactionOpp(playerAttacks, itogDamage)
        })

        dmgToOpp += itogDamage;


    }

    oppAttacks.forEach(zone => {
        const block = playerBlocks.includes(zone);
        const itogDamage = block ? 0 : opp.damage;
        console.log(itogDamage)
        addLog({
            who: opp.name,
            doo: getGlagol(glagols),
            whom: player.name,
            zone: toRussian(zone),
            dmg: itogDamage,
            react: getReactionPlayer(zone, itogDamage)
        })


        dmgToPlayer += itogDamage;

    })
    minusDamage(opp, dmgToOpp);
    minusDamage(player, dmgToPlayer);

    updateHp();
    changePhoto();
    if (checkEnd()) return;
})