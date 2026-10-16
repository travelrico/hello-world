# CLAUDE.md — Portfolio Eric Van Hees

## Qui je suis
Eric Van Hees, Directeur Artistique et Motion Designer basé à Paris, 20 ans de métier.
Spécialité : campagnes publicitaires et films d'animation (promotionnels ou didactiques), principalement dans la **santé animale**.
Je suis graphiste, pas développeur : **explique tes choix simplement**, sans jargon inutile, et dis-moi ce que tu modifies et pourquoi.

## Objectif du site
- Mettre en avant mon savoir-faire, mon expérience et mes domaines d'intervention.
- Double usage : attirer des clients **et** servir de vitrine pour postuler en agence.
- Différenciation clé : ma niche santé animale.
- Valeurs à faire ressentir : **créativité, réactivité, fiabilité**.

## Direction artistique (à respecter strictement)
- Ambiance : minimaliste, actuelle, sobre, sophistication discrète, petits détails élégants.
- Palette : quasi monochrome + **un seul accent terracotta**. Ne pas ajouter d'autres couleurs sans me demander.
- Typographies : **Archivo Black** (titres), **Inter** (texte courant).
- Beaucoup d'espace blanc, hiérarchie claire, animations discrètes et utiles (jamais gadget).
- Les visuels et vidéos de projets sont le cœur du site : ils doivent être mis en valeur, chargés rapidement et bien cadrés.

## Contenu et contraintes
- Certains projets clients ne peuvent pas être montrés publiquement (statut salarié) : ne jamais inventer ni ajouter de projets, noms de clients ou logos sans validation.
- Ne pas inventer de textes biographiques : la page « À propos » sera rédigée séparément.
- Langues du site : **bilingue français / anglais** (français par défaut, sélecteur FR/EN). Tout texte ajouté doit exister dans les deux langues.

## Projet technique
- Site statique généré avec **Eleventy (11ty)** et npm, initialement créé par une autre IA : vérifier la structure avant de supposer quoi que ce soit.
- Commandes (terminal PowerShell de VS Code, à la racine du dépôt) :
  - `npm.cmd ci` : installe les dépendances (une seule fois, ou après un changement de package-lock.json).
  - `npm.cmd start` : prévisualisation locale sur http://localhost:8080, rechargement automatique. Arrêt : Ctrl+C.
  - `npm.cmd run build` : génère le site final dans `_site/`.
- Structure des dossiers :
  - `src/` : **la seule source du site actuel** (Eleventy lit uniquement ce dossier, cf. `.eleventy.js`).
    - `src/index.njk` : page d'accueil (hero, projets, à propos, contact).
    - `src/projects.njk` : gabarit unique des pages projet (une page générée par projet).
    - `src/_data/projects.json` : contenu des projets (textes FR/EN, images, crédits).
    - `src/_data/site.json` : infos communes (nom, e-mail, menu, pied de page).
    - `src/_includes/layouts/base.njk` : squelette HTML commun (polices, CSS, JS).
    - `src/_includes/partials/` : header et footer.
    - `src/assets/` : CSS (`css/site.css`), JS (`js/site.js`), images, vidéo — copiés tels quels dans `_site/assets/`.
  - `_site/` : site généré, **ne jamais modifier à la main** (ignoré par Git, recréé à chaque build).
  - `.github/workflows/pages.yml` : publication automatique sur GitHub Pages à chaque push sur la branche `refonte-portfolio-2026` uniquement.
  - Ancien site fait main, non utilisé par Eleventy (conservé pour mémoire) : `index.html`, `style.css`, `script.js`, `images/`, `videos/`, `projects/`, ainsi que `reference/` (archives). Ne pas les modifier ; suppression possible plus tard, sur accord.

## Façon de travailler
- Une tâche à la fois, par petites étapes vérifiables dans le navigateur.
- **Avant toute modification importante** (structure, dépendances, suppression de fichiers) : expliquer le plan et attendre mon accord.
- Proposer un commit Git après chaque étape validée, avec un message clair en français.
- Code simple et lisible, commenté là où c'est utile ; pas de dépendance ajoutée sans raison.
- Site responsive (mobile d'abord), accessible (contrastes, textes alternatifs) et léger (images optimisées).
