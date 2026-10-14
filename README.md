# Portfolio — Eric Van Hees

Portfolio bilingue créé avec Eleventy (11ty) dans le dépôt GitHub `travelrico/hello-world`. Les fichiers sources de la nouvelle version sont dans `src/` ; Eleventy génère le site à publier dans `_site/`.

## Ouvrir et prévisualiser dans VS Code

1. Ouvrez dans VS Code le dossier racine du dépôt `hello-world`.
2. Vérifiez Node.js avec `node --version` et npm avec `npm.cmd --version`.
3. Dans le terminal PowerShell de VS Code, installez les dépendances une première fois avec `npm.cmd ci`.
4. Lancez `npm.cmd start` et visitez `http://localhost:8080`. Laissez le terminal ouvert pendant la prévisualisation. Arrêtez le serveur avec `Ctrl+C`.
5. Pour regénérer le site destiné à la publication, exécutez `npm.cmd run build`. Les pages prêtes à publier sont générées dans `_site/`.

Dans l’invite de commandes Windows (cmd.exe), `npm` peut remplacer `npm.cmd`.

## Modifier le site

- `src/index.njk` compose l’accueil et ses sections Projets, À propos et Contact.
- `src/projects.njk` est le modèle partagé des études de cas. Eleventy génère six pages indépendantes.
- `src/_data/projects.json` contient les titres, crédits et textes français et anglais. Les cinq projets autres qu’Héliopolis sont fictifs et indiqués comme tels.
- `src/_data/site.json` contient les informations communes.
- `src/_includes/partials/` regroupe le header et le footer.
- `src/assets/css/site.css` contient les styles, couleurs, adaptations mobiles et réglages pour la réduction des animations.
- `src/assets/js/site.js` contient le menu mobile, les apparitions au défilement et le sélecteur de langue. Le choix FR/EN est mémorisé dans le navigateur.
- `src/assets/images/` et `src/assets/video/` contiennent les médias utilisés par le nouveau site.

Les fichiers historiques du dépôt (`index.html`, `style.css`, `script.js`, `images/`, `projects/` et `videos/`) sont conservés tels quels. La version Eleventy utilise `src/` et le site publié est produit dans `_site/`.

Albert Sans semi-bold est chargée depuis Google Fonts. Si la connexion est indisponible, une police système prend le relais. Les couleurs principales sont définies au début de `src/assets/css/site.css`.

## Médias Héliopolis

Les pièces jointes de la conversation comprenaient `heliopolis.html` et le visuel `heliopolis_05.jpg`, mais pas les fichiers `heliopolis_01.jpg` à `heliopolis_04.jpg` que le HTML d’origine référence. La page présente cinq compositions de campagne à partir du visuel reçu, avec recadrages et accroches différents. Elles ne remplacent pas les quatre originaux manquants. Quand ils seront disponibles, ajoutez-les dans `src/assets/images/` et mettez à jour `gallery` du projet `heliopolis` dans `src/_data/projects.json` pour utiliser les cinq images distinctes. Les fichiers historiques reçus sont préservés dans le dépôt.

## Envoyer les changements sur GitHub

Cette copie est sur la branche `refonte-portfolio-2026`, reliée à la branche du même nom sur GitHub. Après vos changements, depuis le terminal :

```powershell
git add .
git commit -m "Mise à jour du portfolio"
git push
```

Cela met à jour la branche de refonte. La branche `main` n’est pas modifiée. Vous pourrez ensuite créer une Pull Request sur GitHub si vous souhaitez intégrer cette refonte à `main`.

## Publication avec GitHub Pages

Le workflow `.github/workflows/pages.yml` construit puis publie le site à chaque push sur `refonte-portfolio-2026`. Dans les réglages GitHub du dépôt, choisissez **GitHub Actions** comme source de GitHub Pages. Le workflow ajoute automatiquement le préfixe d’adresse nécessaire pour un dépôt hébergé sous `https://compte.github.io/nom-du-depot/`.

Le site est statique : Node.js n’est pas nécessaire sur le serveur de publication. La vidéo est conservée dans Git ; si vous déplacez le dépôt vers un hébergement qui limite la taille des fichiers, vous pourrez héberger `hero.mp4` séparément et modifier son adresse dans `src/index.njk`.
