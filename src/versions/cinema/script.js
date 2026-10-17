// Version 2 — Cinéma : repère de la scène en cours (léger zoom arrière + index à droite)
(() => {
  const scenes = document.querySelectorAll(".cn-shot");
  const links = document.querySelectorAll("[data-scene-link]");
  if (!scenes.length || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      scenes.forEach((s) => s.classList.toggle("is-active", s === entry.target));
      const id = entry.target.dataset.scene;
      links.forEach((l) => l.classList.toggle("is-active", l.dataset.sceneLink === id));
    });
  }, { threshold: 0.55 });
  scenes.forEach((s) => observer.observe(s));
})();
