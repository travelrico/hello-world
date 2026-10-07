const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("main-nav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.textContent = isOpen ? "CLOSE" : "MENU";

    });

    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "MENU";

        });

    });

}