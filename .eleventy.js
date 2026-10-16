module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addWatchTarget("src/assets");
  eleventyConfig.addFilter("nextProject", (all, slug) => {
    const index = all.findIndex((item) => item.slug === slug);
    return all[(index + 1) % all.length];
  });
  // Renvoie la version FR ou EN d'un texte ; un texte simple est renvoyé tel quel
  eleventyConfig.addFilter("loc", (value, lang) =>
    value && typeof value === "object" ? value[lang] : value
  );
  // Nombre de projets portant une étiquette donnée (filtres de la mosaïque)
  eleventyConfig.addFilter("countTag", (all, tag) =>
    all.filter((item) => (item.tags || []).includes(tag)).length
  );
  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
