---
style: small{font-size:0.7em}
---

# Flipbook

Un outil [libre](https://forge.apps.education.fr/flipbook/flipbook.forge.apps.education.fr) & gratuit pour créer facilement un livre numérique à feuilleter en ligne

<small>Créé par : [Cédric Eyssette](https://eyssette.forge.apps.education.fr/)</small>

---

On peut créer son flipbook sur [CodiMD](https://codimd.apps.education.fr/).

On peut aussi utiliser d'autres outils accessibles aux élèves comme [Digipage](https://digipage.app/), [Framapad](https://framapad.org/abc/fr/) ou [Hedgedoc](https://demo.hedgedoc.org/).

---

Le flipbook sera alors à cette adresse :

```md
https://flipbook.
forge.apps.
education.fr/
#URL_DU_FLIPBOOK
```

---

Dans son fichier, on sépare simplement chaque page avec l'élément : `---`

On peut utiliser toute la syntaxe Markdown ou HTML.

- Par exemple,
- une liste
- d'éléments

---

## La taille de la police est ajustée automatiquement pour que le contenu tienne sur la page.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum mauris nec venenatis convallis. Vivamus ultrices fermentum dapibus. Sed quis erat maximus, scelerisque tellus eget, suscipit nisl. Donec vulputate purus ultricies dolor tristique bibendum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consectetur vel diam non eleifend. Proin ultrices leo pulvinar ipsum lobortis, vel sodales quam sagittis. Nam sed libero magna. Aliquam ut eleifend libero, ac malesuada massa. Nulla iaculis mi nisl, vitae tempor mi volutpat eu. Aliquam erat volutpat.

---

## Images

On peut insérer des images, mais il faut leur donner une hauteur pour que la police soit ajustée correctement.

![h:20%](img/img.jpg)

On peut indiquer une dimension en pixels :
`![](URL_image =x300)`

Ou en pourcentage de la hauteur de l'écran :
`![h:40%](URL_image)`

On peut enfin utiliser une image en fond de page en ajoutant `bg` au début du `alt` de l'image.
`![bg](URL_image)`

---

### Configuration plus avancée

On peut ajouter un en-tête YAML pour accéder à certaines options.

```
``​`​
maths: true
style: p{color:red}
`​`​`​
```

- `maths: true` permet d'utiliser des formules mathématiques en Latex
- `style: p{color:red}` permet d'ajouter des styles personnalisés en CSS

---

On peut insérer un sommaire en écrivant : `!​summary`. Seuls les titres de niveau 2 seront pris en compte dans le sommaire.

Pour avoir un lien vers une page spécifique, on écrit :
`[lien vers page 5](?page=5)`

Exemple :
[lien vers la page 3](?page=3)
