module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addWatchTarget("src/assets");

  // Versions d'exploration : chaque dossier src/versions/<nom>/ est autonome.
  // Les morceaux de gabarit (_parts, _commun) ne sont pas des pages ; le style et le script sont copiés tels quels.
  eleventyConfig.ignores.add("src/versions/**/_parts/**");
  eleventyConfig.ignores.add("src/versions/_commun/*.njk");
  eleventyConfig.addPassthroughCopy("src/versions/**/*.{css,js}");
  eleventyConfig.addWatchTarget("src/versions");

  // Galerie sans l'image de couverture (déjà affichée en haut des pages projet des versions)
  eleventyConfig.addFilter("withoutCover", (gallery, cover) =>
    (gallery || []).filter((item) => item.src !== cover)
  );

  // Projet suivant (boucle sur la liste)
  eleventyConfig.addFilter("nextProject", (all, slug) => {
    const index = all.findIndex((item) => item.slug === slug);
    return all[(index + 1) % all.length];
  });

  // Renvoie la version FR ou EN d'un texte ; un texte simple est renvoyé tel quel
  eleventyConfig.addFilter("loc", (value, lang) =>
    value && typeof value === "object" ? value[lang] : value
  );

  // Liste des clients, sans doublon, dans l'ordre des projets (page À propos)
  eleventyConfig.addFilter("uniqueClients", (all) =>
    [...new Set(all.map((item) => item.client))]
  );

  // Galerie d'une page projet, rangée en lignes :
  // une image "wide" occupe toute la largeur, les autres vont par deux.
  // La première image (affichée en grand en haut de page) n'est pas répétée.
  eleventyConfig.addFilter("galleryRows", (gallery, heroSrc) => {
    const rows = [];
    let pair = [];
    const flush = () => {
      if (pair.length) rows.push({ type: pair.length === 2 ? "pair" : "wide", items: pair });
      pair = [];
    };
    (gallery || []).forEach((item, i) => {
      if (i === 0 || item.src === heroSrc) return;
      if (item.layout === "wide") { flush(); rows.push({ type: "wide", items: [item] }); }
      else { pair.push(item); if (pair.length === 2) flush(); }
    });
    flush();
    return rows;
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
