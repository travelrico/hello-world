// Comportements communs aux versions d'exploration : langue FR / EN
(() => {
  const root = document.documentElement;
  const applyLocale = (locale, persist) => {
    if (locale !== "fr" && locale !== "en") return;
    root.lang = locale;
    const key = locale === "en" ? "En" : "Fr";
    document.querySelectorAll("[data-alt-fr]").forEach((img) => { img.alt = img.dataset["alt" + key]; });
    document.querySelectorAll("[data-set-locale]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.setLocale === locale)));
    if (persist) { try { localStorage.setItem("evh-locale", locale); } catch (_) {} }
  };
  applyLocale(root.lang === "en" ? "en" : "fr");
  document.querySelectorAll("[data-set-locale]").forEach((b) =>
    b.addEventListener("click", () => applyLocale(b.dataset.setLocale, true)));
})();
