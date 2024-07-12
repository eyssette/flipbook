# Flipbook

Flipbook est un outil libre et gratuit pour créer facilement un livre numérique que l'on peut feuilleter en ligne.

On peut créer son flipbook sur [CodiMD](https://codimd.apps.education.fr/). Le flipbook sera alors à cette adresse :

`https://eyssette.forge.apps.education.fr/flipbook#URL_DU_FLIPBOOK`

Dans son fichier, on sépare simplement chaque page avec l'élément : `---`

La taille de la police est ajustée automatiquement pour que le contenu tienne sur la page.

On peut utiliser toute la syntaxe Markdown ou HTML.

## Images

On peut insérer des images, mais il faut leur donner une hauteur pour que la police soit ajustée correctement.

On peut indiquer une dimension en pixels :

Par exemple : `![](URL_image =x300)`

Ou en pourcentage de la hauteur de la page :

On peut insérer des images, mais il faut leur donner une hauteur explicite pour que la police soit ajustée correctement.

Par exemple : `![h:40%](URL_image)`

On peut enfin utiliser une image en fond de page en ajoutant `bg` au début du `alt` de l'image.

Par exemple : `![bg](URL_image)`



## Configuration plus avancée

On peut ajouter un en-tête YAML pour accéder à certaines options.

```​
maths: true
style: p{color:red}​
```

- `maths: true` permet d'utiliser des formules mathématiques en Latex
- `style: p{color:red}` permet d'ajouter des styles personnalisés en CSS

## Crédits

Flipbook repose sur les librairies suivantes : 
- [StPageFlip](https://github.com/Nodlik/StPageFlip) pour l'effet de la page qui tourne
- [textFit](https://github.com/STRML/textFit) pour le calcul automatique de la taille de la police
- [js-yaml](https://github.com/nodeca/js-yaml) pour la gestion des en-têtes yaml
- [showdown](https://github.com/showdownjs/showdown) pour la conversion du markdown en html

L'image de fond a été créée par [Delany Dean](https://www.flickr.com/people/21012477@N07) et partagée sous [licence CC-by-2.0](https://commons.wikimedia.org/wiki/File:Book_cover_fabric_-_Flickr_-_Delany_Dean.jpg).