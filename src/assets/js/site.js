(() => {
  const root = document.documentElement;
  const supported = new Set(["fr", "en"]);
  let locale = "fr";
  try {
    const stored = localStorage.getItem("evh-locale");
    if (supported.has(stored)) locale = stored;
  } catch (_) { /* Storage can be unavailable in private browsing. */ }

  const applyLocale = (next, persist = false) => {
    if (!supported.has(next)) return;
    locale = next;
    root.lang = locale;
    document.querySelectorAll("[data-locale]").forEach((node) => {
      node.hidden = node.dataset.locale !== locale;
    });
    document.querySelectorAll("[data-alt-fr][data-alt-en]").forEach((image) => {
      image.alt = image.dataset[`alt${locale.toUpperCase()}`];
    });
    document.querySelectorAll("[data-set-locale]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.setLocale === locale));
    });
    if (persist) {
      try { localStorage.setItem("evh-locale", locale); } catch (_) { /* Keep the current page usable. */ }
    }
  };

  applyLocale(locale);
  document.querySelectorAll("[data-set-locale]").forEach((button) => {
    button.addEventListener("click", () => applyLocale(button.dataset.setLocale, true));
  });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  menuButton?.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    nav?.classList.toggle("is-open", !expanded);
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }));

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add("is-visible"));
})();

// Variante B (index) : aperçu du visuel qui suit la souris, sur ordinateur uniquement
(() => {
  const preview = document.querySelector(".index-preview");
  const rows = document.querySelectorAll(".index-row[data-preview]");
  if (!preview || !rows.length) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const image = preview.querySelector("img");
  let targetX = 0, targetY = 0, x = 0, y = 0, frame = null;
  // Léger retard du suivi pour un mouvement plus doux
  const follow = () => {
    x += (targetX - x) * 0.18;
    y += (targetY - y) * 0.18;
    preview.style.left = `${x}px`;
    preview.style.top = `${y}px`;
    frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.5 ? requestAnimationFrame(follow) : null;
  };
  document.addEventListener("mousemove", (event) => {
    targetX = event.clientX + 40;
    targetY = event.clientY;
    if (!frame) frame = requestAnimationFrame(follow);
  });
  rows.forEach((row) => {
    row.addEventListener("mouseenter", (event) => {
      if (!preview.classList.contains("is-visible")) { x = targetX = event.clientX + 40; y = targetY = event.clientY; }
      image.src = row.dataset.preview;
      preview.classList.add("is-visible");
    });
    row.addEventListener("mouseleave", () => preview.classList.remove("is-visible"));
  });
})();

// Variante C (mosaïque) : filtres par discipline
(() => {
  const buttons = document.querySelectorAll(".mosaic-filters [data-filter]");
  const items = document.querySelectorAll(".mosaic-item");
  const status = document.querySelector(".mosaic-status");
  if (!buttons.length) return;
  buttons.forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    buttons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
    let visible = 0;
    items.forEach((item) => {
      const show = filter === "all" || item.dataset.tags.split(" ").includes(filter);
      item.hidden = !show;
      if (show) {
        visible += 1;
        // Relance l'animation d'apparition
        item.style.animation = "none";
        void item.offsetWidth;
        item.style.animation = "";
      }
    });
    if (status) status.textContent = `${visible} projet(s) / project(s)`;
  }));
})();
