# Traducción continua

Esta acción traduce de manera incremental documentos Markdown utilizando [GitHub Models](https://github.com/models).

* [Entrada de blog](https://microsoft.github.io/genaiscript/blog/continuous-translations/)
* [Francés](./README.fr.md)
* [Español](./README.es.md)

## ¿Cómo funciona?

Esta acción utiliza [GenAIScript](https://microsoft.github.io/genaiscript/) para analizar y traducir documentos Markdown de forma programática. El proceso de traducción funciona de la siguiente manera:

* analiza el archivo markdown a AST (árbol de sintaxis abstracta)
* recorre el árbol y busca traducciones existentes o marca nodos que necesitan traducción
* ejecuta inferencia LLM para recopilar nuevas traducciones
* inyecta nuevas traducciones en el documento y valida la calidad
* guarda las traducciones en el caché de archivos
* confirma los cambios

## Entradas

* `lang`: El idioma de destino para la traducción en código ISO. (por defecto: `fr`)
* `force`: Forzar la traducción incluso si el archivo ya ha sido traducido.
* `files`: Archivos a procesar, separados por punto y coma. Por defecto es `README.md`.
* `debug`: Habilitar el registro de depuración ([https://microsoft.github.io/genaiscript/reference/scripts/logging/](https://microsoft.github.io/genaiscript/reference/scripts/logging/)).
* `openai_api_key`: Clave API de OpenAI (por defecto: `${{ secrets.OPENAI_API_KEY }}`)
* `openai_api_base`: URL base de la API de OpenAI (por defecto: `${{ env.OPENAI_API_BASE }}`)
* `azure_openai_api_endpoint`: Endpoint de Azure OpenAI. En el Portal de Azure, abre tu recurso de Azure OpenAI, ve a Keys and Endpoints y copia el Endpoint. (por defecto: `${{ env.AZURE_OPENAI_API_ENDPOINT }}`)
* `azure_openai_api_key`: Clave API de Azure OpenAI. \*\*No necesitas esto si estás usando Microsoft Entra ID. (por defecto: `${{ secrets.AZURE_OPENAI_API_KEY }}`)
* `azure_openai_subscription_id`: ID de suscripción de Azure OpenAI para listar los despliegues disponibles (solo Microsoft Entra). (por defecto: `${{ env.AZURE_OPENAI_SUBSCRIPTION_ID }}`)
* `azure_openai_api_version`: Versión de la API de Azure OpenAI. (por defecto: `${{ env.AZURE_OPENAI_API_VERSION }}`)
* `azure_openai_api_credentials`: Tipo de credenciales de la API de Azure OpenAI. Déjalo como 'default' a menos que tengas una configuración especial de Azure. (por defecto: `${{ env.AZURE_OPENAI_API_CREDENTIALS }}`)
* `github_token`: Token de GitHub con permiso de `models: read` al menos ([https://microsoft.github.io/genaiscript/reference/github-actions/#github-models-permissions](https://microsoft.github.io/genaiscript/reference/github-actions/#github-models-permissions)). (por defecto: `${{ secrets.GITHUB_TOKEN }}`)

## Salidas

* `text`: El texto generado como salida.

## Uso

Agrega lo siguiente a tu paso en tu archivo de flujo de trabajo:

```yaml
uses: pelikhan/action-continuous-translation@v0
with:
  github_token: ${{ secrets.GITHUB_TOKEN }}
  lang: fr,es
```

## Ejemplo

Guarda este archivo en tu directorio `.github/workflows/` como `continuous-translation.yml`:

```yaml
name: Continuous Translation
on:
  workflow_dispatch:
  push:
    branches:
      - main
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

## Desarrollo

Esta acción fue generada automáticamente por GenAIScript a partir de los metadatos del script.
Recomendamos actualizar los metadatos del script en lugar de editar los archivos de acción directamente.

* las entradas de la acción se infieren de los parámetros del script
* las salidas de la acción se infieren del esquema de salida del script
* la descripción de la acción es la descripción del script
* la descripción del readme es la descripción del script
* el branding de la acción es el branding del script

Para **regenerar** los archivos de acción (`action.yml`), ejecuta:

```bash
npm run configure
```

Para hacer lint a los archivos del script, ejecuta:

```bash
npm run lint
```

Para verificar los tipos de los scripts, ejecuta:

```bash
npm run typecheck
```

Para construir la imagen de Docker localmente, ejecuta:

```bash
npm run docker:build
```

Para ejecutar la acción localmente en Docker (después de construirla), usa:

```bash
npm run docker:start
```

## Actualización

La versión de GenAIScript está fijada en el archivo `package.json`. Para actualizarla, ejecuta:

```bash
npm run upgrade
```

## Lanzamiento

Para lanzar una nueva versión de esta acción, ejecuta el script de lanzamiento en un directorio de trabajo limpio.

```bash
npm run release
```
