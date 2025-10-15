
document.addEventListener("DOMContentLoaded", () => {
    const btn_a_propos = document.getElementById("aPropos");
    const sousmenu = document.querySelector(".sousmenu");

    btn_a_propos.addEventListener("click", (e) => {
        e.stopPropagation(); 
        sousmenu.classList.toggle("sousmenu-open");
    });
    document.addEventListener("click", () => {
        sousmenu.classList.remove("sousmenu-open");
    });
});
