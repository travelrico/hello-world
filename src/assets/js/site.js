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
