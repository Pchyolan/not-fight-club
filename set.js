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

const nowYou = document.getElementById("now-you")
const changeName = document.getElementById("inputChangeName")
const btnChangeName = document.getElementById("btnChange")

const playerName = localStorage.getItem("playerName");

if (playerName) {
    nowYou.textContent = `Cейчас ты: ${playerName}`
}

btnChangeName.addEventListener("click", () => {
    const newName = changeName.value.trim();
    if (!newName) return;

    localStorage.setItem("playerName", newName);

    nowYou.textContent = `Теперь ты: ${newName}`;
    changeName.value = "";
})

const icons = document.querySelectorAll(".change-icon img");

function choseIcon(chose) {
    icons.forEach(icon => icon.classList.remove('selected'));
    chose.classList.add('selected');
    const iconDes = document.getElementById("des-icon");

    const descript = [
        "Чтобы резать не только воздух, но и твои надежды",
        "Ударник, для создания музыки из хруста костей",
        "Для тех, чьи кулаки слишком нежны для правды",
        "Безликая кость. Идеально отражает твою личность"
    ]
    icons.forEach((icon, ind) => {
        if (icon.classList.contains("selected")) {
            iconDes.textContent = descript[ind];
        }
    })

    localStorage.setItem("choseIcon", chose.src);
}

icons.forEach(icon => {
    icon.addEventListener("click", () => {
        choseIcon(icon);
    });
});

const savedIcon = localStorage.getItem("choseIcon");

if (savedIcon) {
    icons.forEach(icon => {
        if (icon.src.includes(savedIcon)) {
            choseIcon(icon);
        }
    });
}

//Ножик? Чтобы резать не только воздух, но и твои надежды
//Ударник, для создания музыки из хруста костей
//Для тех, чьи кулаки слишком нежны для правды
//Безликая кость. Идеально отражает твою личность

