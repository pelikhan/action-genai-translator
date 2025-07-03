# Traducción automática de Markdown usando GenAI

Esta acción utiliza Modelos de GitHub y remark para traducir documentos markdown de forma incremental en tu repositorio.

## Entradas

* `to`: El código ISO del idioma de destino para la traducción. (por defecto: `fr`)
* `force`: Forzar la traducción incluso si el archivo ya ha sido traducido.
* `files`: Archivos a procesar, separados por punto y coma (;). .md, .mdx
* `debug`: Habilitar el registro de depuración ([https://microsoft.github.io/genaiscript/reference/scripts/logging/](https://microsoft.github.io/genaiscript/reference/scripts/logging/)).
* `openai_api_key`: Clave API de OpenAI (por defecto: `${{ secrets.OPENAI_API_KEY }}`)
* `openai_api_base`: URL base de la API de OpenAI (por defecto: `${{ env.OPENAI_API_BASE }}`)
* `azure_openai_api_endpoint`: Endpoint de Azure OpenAI. En el Portal de Azure, abre tu recurso de Azure OpenAI, ve a Keys and Endpoints y copia el Endpoint. (por defecto: `${{ env.AZURE_OPENAI_API_ENDPOINT }}`)
* `azure_openai_api_key`: Clave API de Azure OpenAI. \*\*No necesitas esto si estás usando Microsoft Entra ID. (por defecto: `${{ secrets.AZURE_OPENAI_API_KEY }}`)
* `azure_openai_subscription_id`: ID de suscripción de Azure OpenAI para listar los despliegues disponibles (solo Microsoft Entra). (por defecto: `${{ env.AZURE_OPENAI_SUBSCRIPTION_ID }}`)
* `azure_openai_api_version`: Versión de la API de Azure OpenAI. (por defecto: `${{ env.AZURE_OPENAI_API_VERSION }}`)
* `azure_openai_api_credentials`: Tipo de credenciales de la API de Azure OpenAI. Déjalo como 'default' a menos que tengas una configuración especial de Azure. (por defecto: `${{ env.AZURE_OPENAI_API_CREDENTIALS }}`)
* `azure_ai_inference_api_key`: Clave de inferencia de Azure AI (por defecto: `${{ secrets.AZURE_AI_INFERENCE_API_KEY }}`)
* `azure_ai_inference_api_endpoint`: Endpoint de Azure Serverless OpenAI (por defecto: `${{ env.AZURE_AI_INFERENCE_API_ENDPOINT }}`)
* `azure_ai_inference_api_version`: Versión de la API de Azure Serverless OpenAI (por defecto: `${{ env.AZURE_AI_INFERENCE_API_VERSION }}`)
* `azure_ai_inference_api_credentials`: Tipo de credenciales de la API de Azure Serverless OpenAI (por defecto: `${{ env.AZURE_AI_INFERENCE_API_CREDENTIALS }}`)
* `github_token`: Token de GitHub con permiso de `models: read` al menos ([https://microsoft.github.io/genaiscript/reference/github-actions/#github-models-permissions](https://microsoft.github.io/genaiscript/reference/github-actions/#github-models-permissions)). (por defecto: `${{ secrets.GITHUB_TOKEN }}`)

## Salidas

* `text`: El texto generado como salida.

## Uso

Agrega lo siguiente a tu paso en tu archivo de flujo de trabajo:

```yaml
uses: pelikhan/action-continuous-translation@main
with:
  lang: fr,es
```

## Ejemplo

Guarda este archivo en tu directorio `.github/workflows/` como `genai-translator.yml`:

```yaml
name: Action-continuous-translation
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
      - uses: pelikhan/action-continuous-translation@main
        with:
          lang: fr,es
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
