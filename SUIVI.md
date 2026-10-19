# SUIVI — Portfolio Eric Van Hees

> Fichier de suivi pour reprendre le travail sur n'importe quel poste.
> **Pour Claude :** lis d'abord `CLAUDE.md` (règles du projet), puis ce fichier (où on en est). Mets-le à jour à la fin de chaque séance.
>
> Dernière mise à jour : 19/10/2026 (dernier commit : `cec16ee`).

---

## 1. Où on en est

### En ligne : https://travelrico.github.io/hello-world/
- **Racine du site** = version « Modernist » (Archivo, accent `#0f8a5f`), installée depuis un export de maquette. Toujours en place pour les visiteurs.
- **Versions d'exploration** : https://travelrico.github.io/hello-world/versions/
  1. Éditorial · 2. Cinéma · 3. Laboratoire · 4. Brut · 5. Organique · **6. Book**
- Publication automatique : chaque envoi (`git push`) sur `main` met le site en ligne en 1 à 2 minutes.

### Décision : Eric a choisi la version 6 « Book »
Raison : simple, sans parti pris, prolonge le book PDF envoyé aux agences.
On la retravaille **à son emplacement actuel** (`src/versions/book/`, adresse `/versions/book/`) jusqu'à ce qu'elle convienne, puis elle remplacera le Modernist à la racine.

### Déjà fait sur Book
- Charte du book : Albert Sans, fond `#f2f0ec`, accent `#00a19a` (picto), mention verticale « Artistic director | Directeur artistique » fixe à gauche.
- **Français et anglais affichés ensemble** (FR en noir, EN en gris), comme le book — pas de bouton FR/EN.
- **En-tête fixe** toujours au premier plan : fond `#f2f0ec`, logo picto + nom (`logo-evh.svg`, ensemble insécable), navigation Projets / À propos / Contact (traduction anglaise en gris dessous, sauf « Contact » identique).
  - 130 px en haut de page, réduit à ~80 px dès qu'on défile (grand écran), filet fin en dessous.
  - Se réduit progressivement avec la fenêtre ; sous 760 px : logo à sa taille minimale, bouton burger → menu plein écran.
- **Hero** : vidéo temporaire `src/assets/video/hero.mp4` (1920×1080) en 16:9, alignée sur la grille du book (bord à bord sur mobile), bouton pause (accessibilité), image fixe si le visiteur limite les animations.
- Accueil : hero → À propos (texte du book FR/EN + sommaire des projets) → une page paysage par projet (texte à gauche, mosaïque 1 grande + 3 vignettes) → Contact.
- Pages projet : colonne de texte fixe à gauche (FR puis EN), visuels entiers en mosaïque à droite, projet suivant.

### Fichiers de la version Book
- `src/versions/book/_parts/base.njk` : squelette (en-tête, menu mobile, mention verticale)
- `src/versions/book/index.njk` : accueil · `projects.njk` : pages projet
- `src/versions/book/style.css` : styles (variables en haut : couleurs, `--head`, `--head-small`…)
- `src/versions/book/script.js` : en-tête réduit, menu burger, pause vidéo
- Données communes : `src/_data/projects.json` (7 projets), `src/_data/site.json`

---

## 2. Prochaines étapes

1. **Continuer les modifications d'Eric sur Book** (il en a d'autres à apporter).
2. Remplacer la vidéo temporaire par le **showreel** quand il sera prêt (recommandation : 2 versions MP4 — ordinateur 1920×1080 ~4–6 Mo, mobile 1280×720 ~1,5–2,5 Mo — + une image fixe tirée du film).
3. Quand les **visuels définitifs** arriveront : permettre de choisir la mise en page projet par projet dans `projects.json` (accueil : « 1 grande + 3 », « 2 égales », « plein cadre » ; page projet : pleine largeur / demi / tiers).
4. Compléter Book en site complet : sections du book PDF à reprendre éventuellement (Recommandations, Logos, Motion design + lien YouTube, IA générative, Awards, Références) — **à demander à Eric**.
5. **Placer Book à la racine** (modification de structure : plan à présenter et accord d'Eric avant), mettre à jour la charte dans `CLAUDE.md` (Albert Sans, `#00a19a`, FR+EN simultanés au lieu du sélecteur).
6. Ensuite seulement, sur accord : supprimer les 5 autres versions et le gabarit Modernist (tout reste dans l'historique Git).

## 3. Questions en attente (posées à Eric, sans réponse)
- Sigle **« OIE / WOAA »** (repris du book) → passer au sigle officiel **« WOAH »** ?
- Textes du projet **Héliopolis** : écrits par une IA précédente, à réécrire par Eric.
- **Accroches** courtes des projets (`intro` dans `projects.json`) : reformulées par Claude à partir du book, à valider.
- Textes de la maquette Modernist non écrits par Eric (bio à la 3e personne, « Rôle : Direction artistique » par défaut…) : à revoir seulement si le Modernist est conservé.
- Fichiers inutilisés (`img_01`–`05.jpg`, `logo-symbol.svg`, ancien site à la racine : `index.html`, `style.css`, `script.js`, `images/`, `videos/`, `projects/`) : suppression **sur accord uniquement**.

---

## 4. Mémo pratique

### Reprendre sur un autre poste
- Dossier déjà présent : `git pull` · Sinon : `git clone https://github.com/travelrico/hello-world.git` puis `npm.cmd ci`
- Prévisualisation : `npm.cmd start` → http://localhost:8080/versions/book/

### Façon de travailler (validée avec Eric)
Pour chaque modification : branche d'essai → changements → vérification (ordinateur + mobile) → résumé simple en français avec les points à valider → **sur l'accord d'Eric** : commit (message clair en français), fusion dans `main`, envoi sur GitHub (= mise en ligne).

### Piège connu (Windows)
Arrêter la commande `npm.cmd start` depuis un outil peut laisser un **serveur de prévisualisation fantôme** sur le port 8080 (pages lentes ou pas à jour, le nouveau serveur part sur 8081).
Vérifier : `netstat -ano | findstr :808` · Arrêter : `Stop-Process -Id <numéro>` (PowerShell), après avoir vérifié qu'il s'agit bien d'un processus `eleventy --serve`.
