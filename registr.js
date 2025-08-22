document.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem("playerName")

    if (savedName && savedName.trim() !== "") {
        window.location.replace("menu.html");
        return;
    }
    const input = document.getElementById("inputName");
    const button = document.getElementById("btnSave");

    button.addEventListener("click", () => {
        const name = input.value.trim();
        if (!name) return;

        localStorage.setItem("playerName", name);
        window.location.href = "menu.html";
    });

});