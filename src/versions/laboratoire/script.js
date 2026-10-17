// Version 3 — Laboratoire : filtre du tableau des études par discipline
(() => {
  const buttons = document.querySelectorAll(".lb-filters [data-filter]");
  const rows = document.querySelectorAll(".lb-table a.lb-row");
  buttons.forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    rows.forEach((row) => { row.hidden = !(filter === "all" || row.dataset.tags.split(" ").includes(filter)); });
  }));
})();
