# Continuous Markdown Translations using GenAI

Cette action utilise les modèles GitHub et remark pour traduire progressivement des documents markdown dans votre dépôt.

* [Blog post](https://microsoft.github.io/genaiscript/blog/continuous-translations/)
* [French](./README.fr.md)
* [Spanish](./README.es.md)

## Entrées

* `to` : Code ISO de la langue cible pour la traduction. (par défaut : `fr`)
* `force` : Force la traduction même si le fichier a déjà été traduit.
* `files` : Fichiers à traiter, séparés par des points-virgules (;). .md, .mdx
* `debug` : Active la journalisation de débogage ([https://microsoft.github.io/genaiscript/reference/scripts/logging/](https://microsoft.github.io/genaiscript/reference/scripts/logging/)).
* `openai_api_key` : Clé API OpenAI (par défaut : `${{ secrets.OPENAI_API_KEY }}`)
* `openai_api_base` : URL de base de l'API OpenAI (par défaut : `${{ env.OPENAI_API_BASE }}`)
* `azure_openai_api_endpoint` : Point de terminaison Azure OpenAI. Dans le Portail Azure, ouvrez votre ressource Azure OpenAI, puis Clés et points de terminaison, copiez le point de terminaison. (par défaut : `${{ env.AZURE_OPENAI_API_ENDPOINT }}`)
* `azure_openai_api_key` : Clé API Azure OpenAI. \*\*Vous N'AVEZ PAS besoin de ceci si vous utilisez Microsoft Entra ID. (par défaut : `${{ secrets.AZURE_OPENAI_API_KEY }}`)
* `azure_openai_subscription_id` : ID d'abonnement Azure OpenAI pour lister les déploiements disponibles (Microsoft Entra uniquement). (par défaut : `${{ env.AZURE_OPENAI_SUBSCRIPTION_ID }}`)
* `azure_openai_api_version` : Version de l'API Azure OpenAI. (par défaut : `${{ env.AZURE_OPENAI_API_VERSION }}`)
* `azure_openai_api_credentials` : Type d'identifiants pour l'API Azure OpenAI. Laisser sur 'default' sauf si vous avez une configuration Azure spéciale. (par défaut : `${{ env.AZURE_OPENAI_API_CREDENTIALS }}`)
* `azure_ai_inference_api_key` : Clé d'inférence Azure AI (par défaut : `${{ secrets.AZURE_AI_INFERENCE_API_KEY }}`)
* `azure_ai_inference_api_endpoint` : Point de terminaison Azure Serverless OpenAI (par défaut : `${{ env.AZURE_AI_INFERENCE_API_ENDPOINT }}`)
* `azure_ai_inference_api_version` : Version de l'API Azure Serverless OpenAI (par défaut : `${{ env.AZURE_AI_INFERENCE_API_VERSION }}`)
* `azure_ai_inference_api_credentials` : Type d'identifiants pour l'API Azure Serverless OpenAI (par défaut : `${{ env.AZURE_AI_INFERENCE_API_CREDENTIALS }}`)
* `github_token` : Jeton GitHub avec au moins la permission `models: read` ([https://microsoft.github.io/genaiscript/reference/github-actions/#github-models-permissions](https://microsoft.github.io/genaiscript/reference/github-actions/#github-models-permissions)). (par défaut : `${{ secrets.GITHUB_TOKEN }}`)

## Sorties

* `text` : Texte généré en sortie.

## Utilisation

Ajoutez ce qui suit à votre étape dans votre fichier de workflow :

```yaml
uses: pelikhan/action-genai-markdown-translator@main
with:
  github_token: ${{ secrets.GITHUB_TOKEN }}
  lang: fr,es
```

## Exemple

Enregistrez ce fichier dans votre répertoire `.github/workflows/` sous le nom `genai-translator.yml` :

```yaml
name: Action-Genai-Markdown-Translator
on:
    push:
permissions:
    contents: write
    models: read
concurrency:
    group: ${{ github.workflow }}-${{ github.ref }}
    cancel-in-progress: true
jobs:
  action_genai_markdown_translator:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pelikhan/action-genai-markdown-translator@main
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          lang: fr,es
```

## Développement

Cette action a été générée automatiquement par GenAIScript à partir des métadonnées du script.
Nous recommandons de mettre à jour les métadonnées du script au lieu de modifier directement les fichiers de l'action.

* les entrées de l'action sont déduites des paramètres du script
* les sorties de l'action sont déduites du schéma de sortie du script
* la description de l'action est celle du script
* la description du readme est celle du script
* le branding de l'action correspond à celui du script

Pour **re-générer** les fichiers de l'action (`action.yml`), exécutez :

```bash
npm run configure
```

Pour analyser les fichiers du script (lint), exécutez :

```bash
npm run lint
```

Pour vérifier les types des scripts, exécutez :

```bash
npm run typecheck
```

Pour construire l'image Docker localement, exécutez :

```bash
npm run docker:build
```

Pour exécuter l'action localement dans Docker (à construire d'abord), utilisez :

```bash
npm run docker:start
```

## Mise à jour

La version de GenAIScript est fixée dans le fichier `package.json`. Pour la mettre à jour, exécutez :

```bash
npm run upgrade
```

## Publication

Pour publier une nouvelle version de cette action, exécutez le script de release sur un espace de travail propre.

```bash
npm run release
```
