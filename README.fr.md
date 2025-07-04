# Traduction Continue

Cette action permet de traduire de manière incrémentale les documents markdown en utilisant les [Modèles GitHub](https://github.com/models).

* [Documentation](https://pelikhan.github.io/action-continuous-translation/)
* [Article de blog](https://microsoft.github.io/genaiscript/blog/continuous-translations/)
* [Français](./README.fr.md)
* [Espagnol](./README.es.md)
* [Arabe](./README.ar.md)

## Comment ça fonctionne ?

Cette action utilise [GenAIScript](https://microsoft.github.io/genaiscript/) pour analyser et traduire automatiquement les documents markdown. Le processus de traduction fonctionne ainsi :

* analyse le fichier markdown en AST (arbre de syntaxe abstraite)
* parcourt l’arbre pour rechercher une traduction existante ou marque le nœud nécessitant une traduction
* effectue une inférence LLM pour collecter de nouvelles traductions
* injecte les nouvelles traductions dans le document et valide la qualité
* enregistre les traductions dans le cache de fichiers
* valide les modifications (commit)

## Entrées

* `lang` : Code ISO de la langue cible pour la traduction. (par défaut : `fr`)
* `source`: Le code ISO de la langue source pour la traduction. (par défaut : `en`)
* `files` : Fichiers à traiter, séparés par des points-virgules. Par défaut : `README.md`.
* `instructions` : Instructions supplémentaires à utiliser par le LLM lors de la traduction.
* `instructions_file` : Chemin d'accès à un fichier contenant des instructions supplémentaires à utiliser par le LLM lors de la traduction.
* `starlight_dir` : dossier racine de la documentation Astro Starlight.
* `starlight_base` : alias de base pour la documentation Starlight.

## Diagnostics

* `force` : Force la traduction même si le fichier a déjà été traduit.
* `debug` : Active la journalisation de debug (<https://microsoft.github.io/genaiscript/reference/scripts/logging/>).

### Configuration du LLM

* `github_token` : Jeton GitHub avec une permission `models: read` au minimum (<https://microsoft.github.io/genaiscript/reference/github-actions/#github-models-permissions>). (par défaut : `${{ secrets.GITHUB_TOKEN }}`)

* `openai_api_key` : Clé API OpenAI (par défaut : `${{ secrets.OPENAI_API_KEY }}`)

* `openai_api_base` : URL de base de l'API OpenAI (par défaut : `${{ env.OPENAI_API_BASE }}`)

* `azure_openai_api_endpoint` : Point de terminaison Azure OpenAI. Dans le Portail Azure, ouvrez votre ressource Azure OpenAI, sélectionnez « Clés et points de terminaison », puis copiez le point de terminaison. (par défaut : `${{ env.AZURE_OPENAI_API_ENDPOINT }}`)

* `azure_openai_api_key` : Clé API Azure OpenAI. \*\*Vous N’AVEZ PAS BESOIN de ceci si vous utilisez Microsoft Entra ID. (par défaut : `${{ secrets.AZURE_OPENAI_API_KEY }}`)

* `azure_openai_subscription_id` : ID d’abonnement Azure OpenAI pour lister les déploiements disponibles (seulement Microsoft Entra). (par défaut : `${{ env.AZURE_OPENAI_SUBSCRIPTION_ID }}`)

* `azure_openai_api_version` : Version de l’API Azure OpenAI. (par défaut : `${{ env.AZURE_OPENAI_API_VERSION }}`)

* `azure_openai_api_credentials` : Type d’identifiants Azure OpenAI API. Laisser sur 'default' sauf si vous avez une configuration Azure spéciale. (par défaut : `${{ env.AZURE_OPENAI_API_CREDENTIALS }}`)

## Sorties

* `text` : Résultat textuel généré.

## Utilisation

Ajoutez ce qui suit à votre étape dans votre fichier de workflow :

```yaml
uses: pelikhan/action-continuous-translation@v0
with:
  github_token: ${{ secrets.GITHUB_TOKEN }}
  lang: fr,es
```

## Exemple

Enregistrez ce fichier dans votre dossier `.github/workflows/` sous le nom `continuous-translation.yml` :

```yaml
name: Continuous Translation
on:
  workflow_dispatch:
  push:
    branches:
      - main
    paths:
      - "README.md"
      - "docs/src/content/docs/**"
permissions:
  contents: write
  models: read
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
jobs:
  continuous_translation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/cache@v4
        with:
          path: .genaiscript/cache/**
          key: continuous-translation-${{ github.run_id }}
          restore-keys: |
            continuous-translation-
      - uses: pelikhan/action-continuous-translation@v0
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          lang: fr,es
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          file_pattern: "translations/*.json **.md* translations/*.json"
          commit_message: "[cai] translated docs"
          commit_user_name: "genaiscript"
```

## Développement

Cette action a été générée automatiquement par GenAIScript à partir des métadonnées du script.
Il est recommandé de modifier les métadonnées du script plutôt que de modifier directement les fichiers de l’action.

* les entrées de l’action sont déduites des paramètres du script
* les sorties de l’action sont déduites du schéma de sortie du script
* la description de l’action est celle du script
* la description du readme est celle du script
* le branding de l’action est celui du script

Pour **régénérer** les fichiers d’action (`action.yml`), exécutez :

```bash
npm run configure
```

Pour analyser les fichiers du script, exécutez :

```bash
npm run lint
```

Pour vérifier les types des scripts, exécutez :

```bash
npm run typecheck
```

Pour construire l’image Docker localement, exécutez :

```bash
npm run docker:build
```

Pour exécuter l’action localement dans Docker (après l’avoir construite), utilisez :

```bash
npm run docker:start
```

## Mise à niveau

La version de GenAIScript est fixée dans le fichier `package.json`. Pour la mettre à jour, exécutez :

```bash
npm run upgrade
```

## Publication

Pour publier une nouvelle version de cette action, exécutez le script de publication sur un dossier de travail propre.

```bash
npm run release
```
