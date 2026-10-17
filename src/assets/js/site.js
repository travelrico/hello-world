(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

  /* — Langue FR / EN (mémorisée d'une page à l'autre) — */
  const applyLocale = (locale, persist) => {
    if (locale !== "fr" && locale !== "en") return;
    root.lang = locale;
    const key = locale === "en" ? "En" : "Fr";
    document.querySelectorAll("[data-alt-fr]").forEach((img) => { img.alt = img.dataset["alt" + key]; });
    document.querySelectorAll("[data-ph-fr]").forEach((el) => { el.placeholder = el.dataset["ph" + key]; });
    document.querySelectorAll("[data-set-locale]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.setLocale === locale)));
    if (persist) { try { localStorage.setItem("evh-locale", locale); } catch (_) {} }
  };
  applyLocale(root.lang === "en" ? "en" : "fr");
  document.querySelectorAll("[data-set-locale]").forEach((b) =>
    b.addEventListener("click", () => applyLocale(b.dataset.setLocale, true)));

  /* — Menu mobile — */
  const menu = document.getElementById("menu");
  const openBtn = document.querySelector("[data-menu-open]");
  const closeBtn = document.querySelector("[data-menu-close]");
  const setMenu = (open) => {
    if (!menu) return;
    menu.hidden = !open;
    openBtn && openBtn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    (open ? closeBtn : openBtn)?.focus();
  };
  openBtn?.addEventListener("click", () => setMenu(true));
  closeBtn?.addEventListener("click", () => setMenu(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu && !menu.hidden) setMenu(false); });
  window.matchMedia("(min-width: 760px)").addEventListener("change", (e) => { if (e.matches && menu && !menu.hidden) setMenu(false); });

  /* — Titres : apparition ligne par ligne — */
  if (!reduce) {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      const group = el.closest("[data-reveal-group]") || el.parentNode;
      const i = Math.max(0, [...group.querySelectorAll("[data-reveal]")].indexOf(el));
      el.animate([{ transform: "translateY(105%)" }, { transform: "translateY(0)" }],
        { duration: 600, delay: 120 + i * 90, easing: EASE, fill: "backwards" });
    });
  }

  /* — Filets : tracé de gauche à droite à l'entrée dans l'écran — */
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      entry.target.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 700, easing: EASE, fill: "both" })
        .onfinish = () => { entry.target.style.transform = ""; };
    }));
    document.querySelectorAll("[data-rule]").forEach((el) => {
      el.style.transformOrigin = "left center";
      el.style.transform = "scaleX(0)";
      io.observe(el);
    });
  }

  /* — Filtres de l'index des projets — */
  const filters = document.querySelectorAll("[data-filter]");
  if (filters.length) {
    const rows = document.querySelectorAll(".index-row");
    const count = document.querySelector("[data-count]");
    const empty = document.querySelector("[data-empty]");
    filters.forEach((btn) => btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      let n = 0;
      rows.forEach((row) => {
        const show = f === "all" || row.dataset.tags.split(" ").includes(f);
        row.hidden = !show;
        if (show) n++;
      });
      if (count) count.textContent = String(n).padStart(2, "0");
      if (empty) empty.hidden = n > 0;
    }));
  }

  /* — Formulaire de contact : ouvre la messagerie avec le message pré-rempli — */
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    const sent = document.querySelector("[data-contact-sent]");
    const email = form.querySelector("#c-email");
    const error = form.querySelector("#c-email-error");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      error.hidden = valid;
      email.setAttribute("aria-invalid", String(!valid));
      if (!valid) { email.focus(); return; }
      const data = new FormData(form);
      const subject = `[${data.get("type")}] ${data.get("name") || ""}`.trim();
      const body = `${data.get("message") || ""}\n\n— ${data.get("name") || ""}\n${data.get("email")}`;
      window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      form.hidden = true;
      sent.hidden = false;
    });
    document.querySelector("[data-contact-reset]")?.addEventListener("click", () => {
      form.reset();
      sent.hidden = true;
      form.hidden = false;
    });
  }

  /* — Retour en haut — */
  document.querySelectorAll("[data-to-top]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }));

  /* — Transition entre les pages : volet couleur accent — */
  document.addEventListener("click", (e) => {
    if (reduce || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.protocol.indexOf("http") !== 0) return;
    if (url.pathname === location.pathname && url.hash) return;
    e.preventDefault();
    try { sessionStorage.setItem("evh-wipe", "1"); } catch (_) {}
    const veil = document.createElement("div");
    veil.setAttribute("aria-hidden", "true");
    veil.style.cssText = "position:fixed;inset:0;z-index:9999;pointer-events:none;background:" + getComputedStyle(root).getPropertyValue("--accent");
    document.body.appendChild(veil);
    veil.animate([{ transform: "translateY(100%)" }, { transform: "translateY(0)" }], { duration: 450, easing: EASE, fill: "both" })
      .onfinish = () => { location.href = url.href; };
  });
  // Retour arrière du navigateur : retirer un volet resté affiché
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) document.querySelectorAll("body > div[aria-hidden='true']").forEach((v) => v.remove());
  });
})();
