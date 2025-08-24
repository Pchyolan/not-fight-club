document.addEventListener('DOMContentLoaded', () => {
    
    const input = document.getElementById("inputName");
    const button = document.getElementById("btnSave");

    button.addEventListener("click", () => {
        const name = input.value.trim();
        if (!name) return;

        localStorage.setItem("playerName", name);
        window.location.href = "menu.html";
    });

});