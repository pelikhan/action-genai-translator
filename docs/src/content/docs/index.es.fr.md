---
title: Traduction continue
description: Documents traduits à l'aide de GenAI
template: splash
hero:
  tagline: Automated Translated Docs using GitHub Actions and Models
  image:
    file: ../../assets/houston.webp
  actions:
    - text: Example Guide
      link: /action-continuous-translation/guides/example/
      icon: right-arrow
    - text: Read the blog post
      link: https://microsoft.github.io/genaiscript/blog/continuous-translations/
      icon: external
      variant: minimal

---

import { Card, CardGrid } from "@astrojs/starlight/components";

Ce site web est traduit à l'aide de l'IA, consultez les autres langues (coin supérieur droit)...

## Traductions assistées par l'IA

<CardGrid>
  <Card title="Acciones de GitHub" icon="github">
    Cuando realices cambios en tus archivos de documentación, el flujo de traducción inicia automáticamente un trabajo de traducción.
  </Card>

  <Card title="Modelos de GitHub" icon="seti:markdown">
    El flujo de trabajo de IA utiliza analizadores de Markdown e inferencia LLM para traducir tu documentación de manera precisa e incremental.
  </Card>
</CardGrid>

<Card title="IA continua" icon="rocket">
  Explorando la automatización potenciada por LLM en la colaboración de software basada en plataformas

<https://githubnext.com/projects/continuous-ai/>

## Prochaines étapes

<CardGrid stagger>
  <Card title="Agrega el flujo de trabajo" icon="pencil">
    Agrega el flujo de traducción diciendo a tu agente...

````
```
add the workflow for the pelikhan/action-continuous-translation action
```
````

  </Card>

  <Card title="Configura tu sitio" icon="setting">
    Edita el flujo de trabajo con la información de Astro Starlight.
  </Card>

  <Card title="¡Traduce!" icon="add-document">
    Haz commit y deja que el flujo de trabajo haga el resto.
  </Card>

  <Card title="Lee la documentación" icon="open-book">
    Aprende más en
    [README](https://github.com/pelikhan/action-continuous-translation).
  </Card>
</CardGrid>

## Fonctionnalités

* Traduction assistée par l'IA pour votre documentation.
* Intégration transparente avec GitHub Actions.
* Mises à jour de traduction incrémentielles utilisant l'inférence LLM.
* Utilise Remark et la manipulation de l'AST pour des traductions fiables.
* Contrôle de qualité avec un LLM comme juge et vérifications de compilateur.
* Prend en charge les formats Markdown, GFM et MDX (dans une certaine mesure).
* Intégration avec Astro Starlight

Ce projet est construit avec [GenAIScript](https://microsoft.github.io/genaiscript).
