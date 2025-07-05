# Traduzione Continua

Questa azione utilizza la traduzione incrementale di documenti markdown usando i [Modelli di GitHub](https://github.com/models).
Supporto integrato per [Astro Starlight](https://starlight.astro.build/)!

* [Documentazione](https://pelikhan.github.io/action-continuous-translation/)
* [Post del blog](https://microsoft.github.io/genaiscript/blog/continuous-translations/)
* [Francese](./README.fr.md)
* [Spagnolo](./README.es.md)
* [Arabo](./README.ar.md)

## Come funziona?

Questa azione utilizza [GenAIScript](https://microsoft.github.io/genaiscript/) per analizzare e tradurre programmaticamente documenti markdown. Il processo di traduzione funziona come segue:

* analizza il file markdown in AST (albero di sintassi astratta)
* visita l'albero e controlla la traduzione esistente o segna il nodo che necessita di traduzione
* esegue un'inferenza LLM per raccogliere nuove traduzioni
* inietta nuove traduzioni nel documento e ne valida la qualità
* salva le traduzioni nella cache dei file
* registra le modifiche

## Input

* `lang`: Il codice ISO della lingua di destinazione per la traduzione. (predefinito: `fr`)
* `source`: Il codice ISO della lingua sorgente per la traduzione. (predefinito: `en`)
* `files`: File da processare, separati da punti e virgola. Il predefinito è `README.md`.
* `instructions`: Istruzioni aggiuntive per l'LLM da utilizzare durante la traduzione.
* `instructions_file`: Percorso di un file contenente istruzioni aggiuntive per l'LLM da utilizzare durante la traduzione.
* `starlight_dir`: cartella principale della documentazione Astro Starlight.
* `starlight_base`: alias di base per la documentazione Starlight.

### Diagnostica

* `force`: Forza la traduzione, anche se il file è già stato tradotto.
* `debug`: Abilita il registro di debug (<https://microsoft.github.io/genaiscript/reference/scripts/logging/>).

### Configurazione LLM

* `github_token`: Token GitHub con almeno il permesso `models: read` (<https://microsoft.github.io/genaiscript/reference/github-actions/#github-models-permissions>). (predefinito: `${{ secrets.GITHUB_TOKEN }}`)

* `openai_api_key`: Chiave API di OpenAI (predefinito: `${{ secrets.OPENAI_API_KEY }}`)

* `openai_api_base`: URL base dell'API di OpenAI (predefinito: `${{ env.OPENAI_API_BASE }}`)

* `azure_openai_api_endpoint`: Endpoint di Azure OpenAI. Nel portale Azure, apri la tua risorsa Azure OpenAI, "Chiavi ed Endpoint", copia l'Endpoint. (predefinito: `${{ env.AZURE_OPENAI_API_ENDPOINT }}`)

* `azure_openai_api_key`: Chiave API di Azure OpenAI. **Non hai bisogno di questa se stai utilizzando Microsoft Entra ID**. (predefinito: `${{ secrets.AZURE_OPENAI_API_KEY }}`)

* `azure_openai_subscription_id`: ID sottoscrizione Azure OpenAI per elencare i deployment disponibili (solo Microsoft Entra). (predefinito: `${{ env.AZURE_OPENAI_SUBSCRIPTION_ID }}`)

* `azure_openai_api_version`: Versione API di Azure OpenAI. (predefinito: `${{ env.AZURE_OPENAI_API_VERSION }}`)

* `azure_openai_api_credentials`: Tipo di credenziali API di Azure OpenAI. Lascia 'default' a meno che tu non abbia una configurazione speciale di Azure. (predefinito: `${{ env.AZURE_OPENAI_API_CREDENTIALS }}`)

## Output

* `text`: L'output del testo generato.

## Utilizzo

Aggiungi quanto segue al tuo passaggio nel file del tuo flusso di lavoro:

```yaml
uses: pelikhan/action-continuous-translation@v0
with:
  github_token: ${{ secrets.GITHUB_TOKEN }}
  lang: fr,es
```

## Esempio

Salva questo file nella tua cartella `.github/workflows/` come `continuous-translation.yml`:

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

## Sviluppo

Questa azione è stata generata automaticamente da GenAIScript dai metadata dello script.
Consigliamo di aggiornare i metadata dello script invece di modificare direttamente i file dell'azione.

* gli input dell'azione sono dedotti dai parametri dello script
* gli output dell'azione sono dedotti dallo schema di output dello script
* la descrizione dell'azione è la descrizione dello script
* la descrizione del readme è la descrizione dello script
* il branding dell'azione è il branding dello script

Per **rigenerare** i file dell'azione (`action.yml`), esegui:

```bash
npm run configure
```

Per controllare con linter i file di script, esegui:

```bash
npm run lint
```

Per verificare le tipologie negli script, esegui:

```bash
npm run typecheck
```

Per testare il traduttore, esegui:

```bash
npm run test:genai
```

## Aggiorna

La versione di GenAIScript è fissata nel file `package.json`. Per aggiornarla, esegui:

```bash
npm run upgrade
```
