// Version 6 — Book : en-tête réduit au défilement, menu mobile (burger) et vidéo du hero
(() => {
  /* — En-tête : passe en version réduite dès qu'on a défilé de quelques pixels — */
  const root = document.documentElement;
  let ticking = false;
  const updateHead = () => { root.classList.toggle("bk-scrolled", window.scrollY > 24); ticking = false; };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(updateHead); } }, { passive: true });
  updateHead();

  /* — Menu mobile — */
  const burger = document.querySelector(".bk-burger");
  const menu = document.getElementById("bk-menu");
  const setMenu = (open) => {
    if (!burger || !menu) return;
    menu.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("bk-menu-open", open);
  };
  burger?.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu && !menu.hidden) { setMenu(false); burger.focus(); }
  });
  // Retour en grand écran : on referme le menu
  window.matchMedia("(min-width: 761px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  /* — Vidéo du hero : pause / lecture, et image fixe si l'utilisateur limite les animations — */
  const video = document.querySelector(".bk-hero-video");
  const toggle = document.querySelector(".bk-hero-toggle");
  if (!video || !toggle) return;
  const setPaused = (paused) => {
    if (paused) video.pause(); else video.play().catch(() => {});
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.setAttribute("aria-label", paused ? "Lire la vidéo / Play video" : "Mettre la vidéo en pause / Pause video");
  };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  toggle.addEventListener("click", () => setPaused(!video.paused));
})();
