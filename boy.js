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
    const areTheyLive = player.hp > 0 && opp.hp > 0;
    btnFight.disabled = !(isRight && areTheyLive);
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
        attacksPerTurn: 1,
        blocksPerTurn: 2
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

let opp;
function comeHereOpp() {
    document.querySelector(".protivnik .pers-name").textContent = opp.name;
    document.querySelector(".protivnik .photo-pers").src = opp.img;
    document.querySelector(".protivnik .icon-prot img").src = opp.icon;
    document.querySelector(".protivnik .prot-health p").textContent = `${opp.hp}/${opp.maxHp}`;
}

if (!isBattleSave()) {
    opp = opponents[Math.floor(Math.random() * opponents.length)];
    comeHereOpp();
    updateHp();
}

function isBattleSave() {
    const is = localStorage.getItem("data-fight");
    if (!is) return false;

    let str;
    try { str = JSON.parse(is) } catch (no) { return false; }

    if (str.player) {
        player.name = str.player.name ?? player.name;
        player.damage = str.player.damage ?? player.damage;
        player.hp = str.player.hp ?? player.hp;
        player.maxHp = str.player.maxHp ?? player.maxHp;
        player.attacksPerTurn = str.player.attacksPerTurn ?? player.attacksPerTurn;
        player.blocksPerTurn = str.player.blocksPerTurn ?? player.blocksPerTurn;
    }

    if (str.opp) {
        opp = { ...str.opp };
    } else {
        return false;
    };

    comeHereOpp();
    updateHp();

    if (Array.isArray(str.logRows)) {
        const log = document.getElementById("fight-log");

        if (log) {
            log.innerHTML = "";
            str.logRows.forEach(html => {
                const row = document.createElement("div");
                row.className = "row";
                row.innerHTML = html;
                log.appendChild(row)
            })
            log.scrollTop = log.scrollHeight;
        }
    }

    choseAttack = str.choseAttack ?? null;
    choseDefensBtn = Array.isArray(str.choseDefensBtn) ? str.choseDefensBtn : [];

    btnsAttack.forEach(att => {
        att.classList.toggle("selected", att.dataset.zone === choseAttack);
    });

    goLight();
    checkAttack();
    changePhoto();

    return true;
}


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

//Победа далась кровью
//Поздравляю. Теперь станешь грушей для битья кого-то посильнее
//Убежать с ринга
//Еще раунд

//Нокаут. Ожидаемо
//Из тебя сделали фарш, теперь ты официально никто
//Cдаться и уползти
//Реванш

let amountWins = 0;
let amountDefens = 0;

const itog = document.getElementById("itog-fight");
const itogHead = document.getElementById("itog-head");
const itogText = document.getElementById("itog-text");
const btnExit = document.getElementById("itog-exit");
const btnRev = document.getElementById("itog-revenge");
const exitText = document.getElementById("itog-exit-text");
const revengeText = document.getElementById("itog-revenge-text");


function checkWin() {
        itog.classList.add("open");
        itogHead.textContent = "Победа далась кровью"
        itogText.textContent = `Поздравляю, ${player.name}. Теперь станешь грушей для битья кого-то посильнее`
        btnExit.textContent = "Убежать с ринга";
        btnRev.textContent = "Ещё раунд";
        exitText.textContent = "Спасти свою шкуру. Единственный твой талант"
        revengeText.textContent = "Продолжим выбивать из тебя остатки самоуважения"
        btnExit.addEventListener("click", () => {
            localStorage.removeItem("data-fight");
            window.location.href = "menu.html";
            amountWins = Number(localStorage.getItem("amountYourWins")) + 1;
            localStorage.setItem("amountYourWins", amountWins);
        });
        btnRev.addEventListener("click", () => {
            localStorage.removeItem("data-fight");
            location.reload();
            amountWins = Number(localStorage.getItem("amountYourWins")) + 1;
            localStorage.setItem("amountYourWins", amountWins);
        })
    }

function checkDefeat() {
    itog.classList.add("open");
    itogHead.textContent = "Нокаут. Ожидаемо"
    itogText.textContent = `${opp.name} из тебя сделал фарш. Хах, теперь ты официально никто...`;
    btnExit.textContent = "Сдаться и уползти";
    btnRev.textContent = "Реванш";
    exitText.textContent = "Признать свою ничтожность. Мудрое решение"
    revengeText.textContent = "Попытка №100500. В этот раз проиграешь еще быстрее"
    btnExit.addEventListener("click", () => {
        localStorage.removeItem("data-fight");
        window.location.href = "menu.html";
        amountDefens = Number(localStorage.getItem("amountYourDefens")) + 1;
        localStorage.setItem("amountYourDefens", amountDefens);
    });
    btnRev.addEventListener("click", () => {
        localStorage.removeItem("data-fight");
        location.reload();
        amountDefens = Number(localStorage.getItem("amountYourDefens")) + 1;
        localStorage.setItem("amountYourDefens", amountDefens);
    })

}

function checkDraw() {
    itog.classList.add("open");
    itogHead.textContent = "Ничья. Как скучно"
    itogText.textContent = "М-да.. Идеальный результат для двух лузеров";
    btnExit.textContent = "Слиться";
    btnRev.textContent = "Еще раз";
    exitText.textContent = "Твое коренное умение. Да, хватит позориться"
    revengeText.textContent = "Чтобы снова получить по зубам? Ну-ну"
    btnExit.addEventListener("click", () => {
        localStorage.removeItem("data-fight");
        window.location.href = "menu.html";
    });
    btnRev.addEventListener("click", () => {
        localStorage.removeItem("data-fight");
        location.reload();
    })
}

if (opp.hp <= 0 && player.hp > 0) {
    checkWin();
} else if (player.hp <= 0 && opp.hp > 0){
    checkDefeat();
} else if (player.hp <= 0 && opp.hp <= 0) {
    checkDraw();
}

function checkEnd() {
    if (player.hp <= 0 || opp.hp <= 0) {
        const result =
            player.hp <= 0 && opp.hp <= 0 ? checkDraw() :
                player.hp <= 0 ? checkDefeat() : checkWin();
        return result;
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

    function getReactionOpp(zone, itogDamage) {
        if (itogDamage === 0) {
            return reactBlockOpp[Math.floor(Math.random() * reactBlockOpp.length)];
        } else {
            const rea = reactionsOpp[zone];
            return choseReaction(rea);
        }
    }

    function getReactionPlayer(zonee, itogDamage) {
        if (itogDamage === 0) {
            return reactBlockPlayer[Math.floor(Math.random() * reactBlockPlayer.length)];
        } else {
            const rea = reactionsPlayer[zonee];
            return choseReaction(rea);
        }
    }

    const playerCrit = [2, 4]
    const oppCrit = [5, 7]

    function critPlayerUdar() {
        const randomNumb = Math.floor(Math.random() * 10);
        return playerCrit.includes(randomNumb)
    }

    function critOppUdar() {
        const randomNumb = Math.floor(Math.random() * 10);
        return oppCrit.includes(randomNumb)
    }

    {
        const block = oppBlocks.includes(playerAttacks);
        let isItCrit = critOppUdar()
        let itogDamage = isItCrit 
        ? Math.floor(player.damage * 1.5) :
        (block ? 0 : player.damage);

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
        let isItCrit = critOppUdar()
        let itogDamage = isItCrit 
        ? Math.floor(opp.damage * 1.5) :
        (block ? 0 : opp.damage);

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
    saveBattle()
    changePhoto();

    if (checkEnd()) return;
})

function colectLogs() {
    const log = document.getElementById("fight-log");
    const rows = [...log.querySelectorAll(".row")].map(row => row.innerHTML);
    return rows;
}

function saveBattle() {
    const data = {
        player: {
            name: player.name,
            hp: player.hp,
            maxHp: player.maxHp,
            damage: player.damage,
            attacksPerTurn: player.attacksPerTurn,
            blocksPerTurn: player.blocksPerTurn
        },
        opp: {
            name: opp.name,
            img: opp.img,
            icon: opp.icon,
            hp: opp.hp,
            maxHp: opp.maxHp,
            damage: opp.damage,
            attacksPerTurn: opp.attacksPerTurn,
            blocksPerTurn: opp.blocksPerTurn
        },
        logRows: colectLogs(),
        choseAttack: choseAttack,
        choseDefensBtn: [...choseDefensBtn]
    }

    const json = JSON.stringify(data)
    localStorage.setItem("data-fight", json);

}