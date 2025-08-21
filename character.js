const home = document.getElementById("menu-fight");
const character = document.getElementById("menu-character");
const settings = document.getElementById("menu-settings");

home.addEventListener("click", () => {
    window.location.href = "menu.html";
})

character.addEventListener("click", () => {
    window.location.href = "pers.html";
})

settings.addEventListener("click", () => {
    window.location.href = "settings.html";
})


const avatar = document.getElementById("pers-img");
const text = document.getElementById("biograph");
const btnRight = document.getElementById("btnRight");
const btnLeft = document.getElementById("btnLeft");

const photos = [
    { photo: "img/boec-1.png", bio: "Его мать продавала тело, а отец был очередным безымянным клиентом. Он вырос среди мусорных баков и разбитых подъездов. Кулаки стали его учебниками, а каждое рассечённое лицо — уроком, выученным лучше любой школьной программы." },
    { photo: "img/boec-2.png", bio: "Выпускник гимназии, витрина родительского успеха. Белая рубашка, ухоженные волосы, улыбка из рекламы жвачки. Но глянец исчезает после первого удара в челюсть. Теперь он здесь, чтобы доказать — за этой оболочкой золотого мальчика спрятана сталь." },
    { photo: "img/boec-3.png", bio: "Она росла без семьи, и мир показал ей зубы слишком рано. В детдоме она научилась воровать, чтобы есть, и драться, чтобы выжить. Теперь на ринге её имя звучит громче, чем любые приказы воспитателей. Там, где боль — там, наконец, честность." },
    { photo: "img/boec-4.png", bio: "Была идеальной дочерью в чужих руках. Репетиторы, кружки, вечные «будь примером» и улыбки на семейных фото. Всё детство она жила под давлением чужих ожиданий. Теперь её дипломы пылятся, а на ринге она берёт то, чего ей всегда запрещали — свободу." },
];

let index = 0;
const keyIndex = "chosenIndex";

function changePhoto(number) {
    avatar.src = photos[number].photo;
    text.textContent = photos[number].bio;
}

const savedIndex = localStorage.getItem(keyIndex)

if (savedIndex !== null) {
    index = Number(savedIndex);
}

btnRight.addEventListener("click", () => {
    index++;
    if (index >= photos.length) {
        index = 0;
    }

    changePhoto(index);

    localStorage.setItem(keyIndex, String(index))
    localStorage.setItem("chosenPhoto", photos[index].photo)
})

btnLeft.addEventListener("click", () => {
    index = index - 1;
    if (index < 0) {
        index = photos.length - 1;
    }

    changePhoto(index);

    localStorage.setItem("chosenPhoto", photos[index].photo)
    localStorage.setItem(keyIndex, index)
})

changePhoto(index);

const playerName = localStorage.getItem("playerName");
const changePhotoSay = document.getElementById("change-photo-say");

changePhotoSay.textContent = `Изменить внешность в цифровом мире? Оригинально, ${playerName}`

const savePhoto = document.getElementById("savePhoto");

savePhoto.addEventListener("click", () => {
    window.location.href = "menu.html";
})