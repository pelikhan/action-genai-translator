# Guide complet de la syntaxe Markdown

Ce document présente toutes les principales constructions syntaxiques disponibles dans Markdown.

## Table des matières

* [En-têtes](#headers)
* [Formatage du texte](#text-formatting)
* [Listes](#lists)
* [Liens et images](#links-and-images)
* [Code](#code)
* [Tables](#tables)
* [Citations](#blockquotes)
* [Règles horizontales](#horizontal-rules)
* [Sauts de ligne](#line-breaks)
* [Éléments HTML](#html-elements)
* [Fonctionnalités avancées](#advanced-features)

## En-têtes

# En-tête H1

## En-tête H2

### En-tête H3

#### En-tête H4

##### En-tête H5

###### En-tête H6

# Alternative H1

## Alternative H2

## Formatage du texte

**Texte en gras avec des astérisques**
**Texte en gras avec des underscores**

*Texte en italique avec des astérisques*
*Texte en italique avec des underscores*

***Gras et italique avec des astérisques***
***Gras et italique avec des underscores***

~~Texte barré~~

`Code en ligne`

Texte normal avec **gras**, *italique* et `code` mélangés.

## Listes

### Listes non ordonnées

* Élément 1
* Élément 2
  * Élément imbriqué 2.1
  * Élément imbriqué 2.2
    * Élément profondément imbriqué 2.2.1
* Élément 3

Syntaxe alternative :

* Élément A
* Élément B
  * Élément imbriqué B.1
  * Élément imbriqué B.2

Autre alternative :

* Élément X
* Élément Y
  * Élément imbriqué Y.1

### Listes ordonnées

1. Premier élément
2. Deuxième élément
   1. Élément numéroté imbriqué
   2. Autre élément imbriqué
      1. Élément profondément imbriqué
3. Troisième élément

Numérotation alternative :

1. Élément un
2. Élément deux (auto-numéroté)
3. Élément trois (auto-numéroté)

### Listes mixtes

1. Élément ordonné
   * Élément imbriqué non ordonné
   * Autre élément imbriqué non ordonné
2. Autre élément ordonné
   1. Élément ordonné imbriqué
   2. Autre élément ordonné imbriqué

### Listes de tâches

* [x] Tâche terminée
* [ ] Tâche incomplète
* [x] Autre tâche terminée
  * [x] Tâche imbriquée terminée
  * [ ] Tâche imbriquée incomplète

## Liens et images

### Liens

[Lien simple](https://www.example.com)

[Lien avec titre](https://www.example.com "Example Website")

// TODO désactiver MDX
< [https://www.autolink.com>](https://www.autolink.com>)

\[Lien de référence]\[ref1]

\[Autre lien de référence]\[ref2]

\[Lien de référence insensible à la casse]\[REF1]

Vous pouvez également lier des [fichiers locaux](./README.md).

### Images

![Texte alternatif](https://via.placeholder.com/150x100 "Titre de l'image")

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
TODO : corriger ce problème d'analyse

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
| Plus            | Données |             Ici |

### Tableau simple

| Premier en-tête | Deuxième en-tête |
| --------------- | ---------------- |
| Cellule 1       | Cellule 2        |
| Cellule 3       | Cellule 4        |

## Citations

> Ceci est une citation simple.

> Ceci est une citation
> qui s’étend sur plusieurs lignes.

> Citations imbriquées :
>
> > Ceci est une citation imbriquée.
> >
> > > Et ceci est imbriqué plus profondément.

> ### Citation avec d'autres éléments
>
> * Élément de liste dans la citation
> * Un autre élément
>
> **Texte en gras** dans la citation avec `code en ligne`.

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
coupure de ligne par antislash.

## Éléments HTML

Vous pouvez utiliser des <em>balises HTML</em> dans Markdown.

<strong>Gras avec HTML</strong>

<code>Code en ligne avec HTML</code>

<kbd>Ctrl</kbd> + <kbd>C</kbd>

<mark>Texte surligné</mark>

<small>Petit texte</small>

<sub>Indice</sub> et <sup>Exposant</sup>

<details>
<summary>Expandable section</summary>

Ce contenu est masqué par défaut et peut être développé.

* Élément de liste
* Un autre élément

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
:   Une autre définition pour le terme 2

### Abréviations

\*\[HTML]: Hyper Text Markup Language
\*\[CSS]: Cascading Style Sheets

HTML et CSS sont des technologies web importantes.

### Mathématiques (si supporté)

Mathématique en ligne : $E = mc^2$

Mathématique en bloc :

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### Caractères d’échappement

Utilisez des antislashs pour échapper les caractères spéciaux :

\*Pas en italique\*\
\#Pas un titre\
\[Pas un lien]\
\`Pas du code\`

### Commentaires

### Émojis

\:smile: \:heart: \:thumbsup: \:rocket: \:computer:

😀 😍 👍 🚀 💻

***

## Conclusion

Ce document couvre la plupart de la syntaxe standard du Markdown. Certaines fonctionnalités comme les notes de bas de page, les listes de définitions, les mathématiques et certains éléments HTML peuvent ne pas être prises en charge par tous les processeurs Markdown, mais elles fonctionnent dans de nombreuses versions étendues comme GitHub Flavored Markdown (GFM), CommonMark, et d’autres.

**Remarque** : Le rendu exact de ces éléments peut varier selon le processeur Markdown utilisé.
