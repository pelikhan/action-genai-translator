# Guide complet de la syntaxe Markdown

Ce document présente toutes les principales constructions syntaxiques disponibles en Markdown.

## Table des matières

* [En-têtes](#headers)
* [Formatage du texte](#text-formatting)
* [Listes](#lists)
* [Liens et images](#links-and-images)
* [Code](#code)
* [Tableaux](#tables)
* [Citations](#blockquotes)
* [Règles horizontales](#horizontal-rules)
* [Sauts de ligne](#line-breaks)
* [Éléments HTML](#html-elements)
* [Fonctionnalités avancées](#advanced-features)

## En-têtes

# Titre H1

## Titre H2

### Titre H3

#### Titre H4

##### Titre H5

###### Titre H6

# H1 alternatif

## H2 alternatif

## Formatage du texte

**Texte en gras avec des astérisques**
**Texte en gras avec des tirets bas**

*Texte en italique avec des astérisques*
*Texte en italique avec des tirets bas*

***Gras et italique avec des astérisques***
***Gras et italique avec des tirets bas***

~~Texte barré~~

`Code en ligne`

Texte normal avec du **gras**, de l’*italique*, et du `code` mélangés.

## Listes

### Listes à puces

* Élément 1
* Élément 2
  * Sous-élément 2.1
  * Sous-élément 2.2
    * Sous-élément imbriqué 2.2.1
* Élément 3

Syntaxe alternative :

* Élément A
* Élément B
  * Sous-élément B.1
  * Sous-élément B.2

Autre alternative :

* Élément X
* Élément Y
  * Sous-élément Y.1

### Listes numérotées

1. Premier élément
2. Deuxième élément
   1. Sous-élément numéroté
   2. Autre sous-élément
      1. Sous-élément imbriqué
3. Troisième élément

Numérotation alternative :

1. Élément un
2. Élément deux (numérotation automatique)
3. Élément trois (numérotation automatique)

### Listes mixtes

1. Élément ordonné
   * Sous-élément non ordonné
   * Autre sous-élément non ordonné
2. Autre élément ordonné
   1. Sous-élément ordonné
   2. Autre sous-élément ordonné

### Listes de tâches

* [x] Tâche complétée
* [ ] Tâche incomplète
* [x] Autre tâche complétée
  * [x] Sous-tâche complétée
  * [ ] Sous-tâche incomplète

## Liens et images

### Liens

[Lien simple](https://www.example.com)

[Lien avec titre](https://www.example.com "Example Website")

// TODO désactiver MDX
\< [https://www.autolink.com>](https://www.autolink.com>)

\[Lien de référence]\[ref1]

\[Autre lien de référence]\[ref2]

\[Lien de référence insensible à la casse]\[REF1]

Vous pouvez aussi lier des [fichiers locaux](./README.md).

### Images

![Texte alternatif](https://via.placeholder.com/150x100 "Titre de l’image")

!\[Image de référence]\[img1]

### Définitions de référence

[ref1]: https://www.reference1.com "Reference 1 Title"

[ref2]: https://www.reference2.com

[img1]: https://via.placeholder.com/200x150 "Reference Image"

## Code

### Code en ligne

Utilisez `console.log()` pour afficher dans la console.

### Blocs de code

```
Simple code block without syntax highlighting
```

```javascript
// JavaScript code block
function greet(name) {
    console.log(`Hello, ${name}!`);
}

greet("World");
```

```python
# Python code block
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

```bash
# Bash script
#!/bin/bash
echo "Hello, World!"
for i in {1..5}; do
    echo "Number: $i"
done
```

```json
{
    "name": "Sample JSON",
    "version": "1.0.0",
    "dependencies": {
        "express": "^4.18.0"
    }
}
```

Bloc de code indenté (4 espaces) :
TODO: corriger ce problème de parsing

## Tableaux

| Colonne 1 | Colonne 2 | Colonne 3       |
| --------- | --------- | --------------- |
| Ligne 1   | Données   | Plus de données |
| Ligne 2   | Info      | Détails         |

### Tableau avec alignement

| Aligné à gauche |  Centré | Aligné à droite |
| :-------------- | :-----: | --------------: |
| Gauche          |  Centre |          Droite |
| Texte           |  Texte  |           Texte |
| Encore          | Données |             Ici |

### Tableau simple

| En-tête 1         | En-tête 2         |
| ----------------- | ----------------- |
| Cellule contenu 1 | Cellule contenu 2 |
| Cellule contenu 3 | Cellule contenu 4 |

## Citations

> Ceci est une simple citation.

> Ceci est une citation
> qui s’étend sur plusieurs lignes.

> Citations imbriquées :
>
> > Ceci est une citation imbriquée.
> >
> > > Et voici une citation très imbriquée.

> ### Citation avec d’autres éléments
>
> * Élément de liste dans la citation
> * Autre élément
>
> **Texte en gras** dans une citation avec du `code en ligne`.

## Règles horizontales

***

***

***

***

***

***

## Sauts de ligne

Ceci est la première ligne.\
Ceci est la deuxième ligne (deux espaces à la fin de la ligne précédente).

Ceci est la troisième ligne.

Ceci est la quatrième ligne (une ligne vide crée une coupure de paragraphe).

Ceci est une ligne avec une\
coupure grâce à un antislash.

## Éléments HTML

Vous pouvez utiliser des <em>balises HTML</em> dans du Markdown.

<strong>Gras avec HTML</strong>

<code>Code en ligne avec HTML</code>

<kbd>Ctrl</kbd> + <kbd>C</kbd>

<mark>Texte surligné</mark>

<small>Petit texte</small>

<sub>Indice</sub> et <sup>Exposant</sup>

<details>
  <summary>Section extensible</summary>

  Ce contenu est masqué par défaut et peut être affiché.

  * Élément de liste
  * Autre élément

  ```javascript
  console.log("Code in details");
  ```
</details>

## Fonctionnalités avancées

### Notes de bas de page

Voici une phrase avec une note de bas de page\[^1].

Une autre phrase avec une note de bas de page\[^note].

[^1]: Ceci est la première note de bas de page.

[^note]: Ceci est une note de bas de page nommée avec plus de détails.

### Listes de définitions

Terme 1
:   Définition du terme 1

Terme 2
:   Définition du terme 2
:   Une autre définition du terme 2

### Abréviations

\*\[HTML]: Hyper Text Markup Language
\*\[CSS]: Cascading Style Sheets

HTML et CSS sont des technologies web importantes.

### Mathématiques (si supporté)

Math en ligne : $E = mc^2$

Math en bloc :

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### Caractères d’échappement

Utilisez des antislashs pour échapper les caractères spéciaux :

\*Pas d’italique\*
\#Pas de titre
\[Pas de lien]
\`Pas de code\`

### Commentaires

TODO : Il doit être possible de désactiver MDX.

### Émojis

\:smile: \:heart: \:thumbsup: \:rocket: \:computer:

😀 😍 👍 🚀 💻

***

## Conclusion

Ce document couvre la plupart des syntaxes Markdown standards. Certaines fonctionnalités telles que les notes de bas de page, les listes de définitions, les mathématiques et certains éléments HTML peuvent ne pas être supportées par tous les interpréteurs Markdown, mais elles fonctionnent dans de nombreuses versions étendues comme GitHub Flavored Markdown (GFM), CommonMark et d’autres.

**Remarque** : Le rendu exact de ces éléments peut varier selon l’interpréteur Markdown utilisé.
