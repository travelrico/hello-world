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
> Cette charte s'applique au site principal (racine). Les **versions d'exploration** (`src/versions/`) peuvent s'en écarter librement (typo, couleurs, mise en page) ; les règles de contenu, de langue et d'accessibilité restent valables pour elles.

- Ambiance : minimaliste, actuelle, sobre, sophistication discrète, petits détails élégants.
- Style « Modernist » (refonte installée le 17/10/2026 à partir d'une maquette validée) : angles droits, filets de 2 px, grille de 12 colonnes.
- Palette : quasi monochrome (fond `#f3f2f2`, encre `#201e1d`) + **un seul accent `#0f8a5f`**. Ne pas ajouter d'autres couleurs sans me demander.
  - Les variables de couleur sont en haut de `src/assets/css/site.css` (`--accent` et ses nuances de survol `--accent-100/600/700`).
  - L'accent `#0f8a5f` suffit pour les grands titres mais pas pour le petit texte sur fond clair : pour les liens et petits textes, utiliser `--accent-700`.
- Typographie : **Archivo uniquement** (graisses 400, 600, 800), aucune autre police.
- Logo : `logo_picto_name_01.svg` (picto + nom) et `logo_picto_01.svg` (picto seul, mobile et icône d'onglet), dans `src/assets/images/`. Picto en `#0f8a5f`, nom en `#201e1d`. Sources : fichiers de charte fournis par Eric.
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
  - `src/` : **la seule source du site actuel** (Eleventy lit uniquement ce dossier, cf. `eleventy.config.js` à la racine).
    - `src/index.njk` : page d'accueil (hero, cartes des projets, encart contact).
    - `src/projets.njk` : index des projets avec filtres (adresse `/projets/`).
    - `src/projects.njk` : gabarit unique des pages projet (une page générée par projet, adresse `/projects/<slug>/`).
    - `src/a-propos.njk` et `src/contact.njk` : pages À propos et Contact (formulaire qui ouvre la messagerie du visiteur).
    - `src/_data/projects.json` : contenu des projets (textes FR/EN, images, catégories, étiquettes de filtre).
    - `src/_data/site.json` : infos communes (nom, e-mail, menu, pied de page).
    - `src/_includes/layouts/base.njk` : squelette HTML commun (police, CSS, JS).
    - `src/_includes/partials/` : header (menu ordinateur + menu plein écran mobile) et footer.
    - `src/_includes/macros.njk` : raccourcis `t()` et `tt()` pour afficher un texte en FR/EN.
    - `src/assets/` : CSS (`css/site.css`), JS (`js/site.js`), images, vidéo — copiés tels quels dans `_site/assets/`.
  - `src/versions/` : **versions d'exploration** (pistes de design radicalement différentes, publiées sur `/versions/`, non référencées).
    - `src/versions/index.njk` : page sommaire ; `src/_data/versions.json` : liste des versions (nom, intention, `ready` = construite ou non).
    - `src/versions/_commun/` : squelette commun (`base.njk`), barre de navigation entre versions, langue FR/EN.
    - `src/versions/<nom>/` : une version = un dossier autonome (`index.njk` accueil, `projects.njk` pages projet, `_parts/` squelette, `style.css`, `script.js`, `<nom>.json`). Supprimer une version = supprimer son dossier et sa ligne dans `versions.json`.
    - Les versions lisent les mêmes données (`src/_data/`) et images (`src/assets/images/`) que le site principal.
  - `_site/` : site généré, **ne jamais modifier à la main** (ignoré par Git, recréé à chaque build).
  - `.github/workflows/pages.yml` : publication automatique sur GitHub Pages à chaque envoi (push) sur `main`. Site en ligne : https://travelrico.github.io/hello-world/
  - Ancien site fait main, non utilisé par Eleventy (conservé pour mémoire) : `index.html`, `style.css`, `script.js`, `images/`, `videos/`, `projects/`, ainsi que `reference/` (archives). Ne pas les modifier ; suppression possible plus tard, sur accord.

## Façon de travailler
- Une tâche à la fois, par petites étapes vérifiables dans le navigateur.
- **Avant toute modification importante** (structure, dépendances, suppression de fichiers) : expliquer le plan et attendre mon accord.
- Proposer un commit Git après chaque étape validée, avec un message clair en français.
- Code simple et lisible, commenté là où c'est utile ; pas de dépendance ajoutée sans raison.
- Site responsive (mobile d'abord), accessible (contrastes, textes alternatifs) et léger (images optimisées).
