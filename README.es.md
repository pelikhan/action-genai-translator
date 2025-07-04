# Traducción continua

Esta acción utiliza la traducción incremental de documentos markdown usando [GitHub Models](https://github.com/models).

* [Documentación](https://pelikhan.github.io/action-continuous-translation/)
* [Entrada de blog](https://microsoft.github.io/genaiscript/blog/continuous-translations/)
* [Francés](./README.fr.md)
* [Español](./README.es.md)

## ¿Cómo funciona?

Esta acción utiliza [GenAIScript](https://microsoft.github.io/genaiscript/) para analizar y traducir programáticamente documentos markdown. El proceso de traducción funciona de la siguiente manera:

* analizar el archivo markdown a AST (árbol de sintaxis abstracta)
* recorrer el árbol y buscar traducciones existentes o marcar nodos que necesitan traducción
* ejecutar inferencia LLM para recolectar nuevas traducciones
* inyectar las nuevas traducciones en el documento y validar la calidad
* guardar las traducciones en la caché de archivos
* confirmar los cambios

## Entradas

* `lang`: Código ISO del idioma de destino para la traducción. (por defecto: `fr`)
* `files`: Archivos a procesar, separados por punto y coma. Por defecto es `README.md`.
* `instructions`: Instrucciones adicionales para que el LLM las utilice durante la traducción.
* `instructions_file`: Ruta a un archivo que contiene instrucciones adicionales para que el LLM las utilice durante la traducción.
* `starlight_dir`: Carpeta raíz de la documentación de Astro Starlight.
* `starlight_base`: Alias base para la documentación de Starlight.

## Diagnóstico

* `force`: Forzar la traducción incluso si el archivo ya ha sido traducido.
* `debug`: Habilitar el registro de depuración (<https://microsoft.github.io/genaiscript/reference/scripts/logging/>).

### Configuración del LLM

* `github_token`: Token de GitHub con permiso al menos de `models: read` (<https://microsoft.github.io/genaiscript/reference/github-actions/#github-models-permissions>). (por defecto: `${{ secrets.GITHUB_TOKEN }}`)

* `openai_api_key`: Clave API de OpenAI (por defecto: `${{ secrets.OPENAI_API_KEY }}`)

* `openai_api_base`: URL base de la API de OpenAI (por defecto: `${{ env.OPENAI_API_BASE }}`)

* `azure_openai_api_endpoint`: Endpoint de Azure OpenAI. En el Portal de Azure, abre tu recurso Azure OpenAI, Keys and Endpoints, copia el Endpoint. (por defecto: `${{ env.AZURE_OPENAI_API_ENDPOINT }}`)

* `azure_openai_api_key`: Clave API de Azure OpenAI. \*\*NO necesitas esto si estás usando Microsoft Entra ID. (por defecto: `${{ secrets.AZURE_OPENAI_API_KEY }}`)

* `azure_openai_subscription_id`: ID de suscripción de Azure OpenAI para listar los despliegues disponibles (sólo Microsoft Entra). (por defecto: `${{ env.AZURE_OPENAI_SUBSCRIPTION_ID }}`)

* `azure_openai_api_version`: Versión de la API de Azure OpenAI. (por defecto: `${{ env.AZURE_OPENAI_API_VERSION }}`)

* `azure_openai_api_credentials`: Tipo de credenciales API de Azure OpenAI. Déjalo como 'default' a menos que tengas una configuración especial de Azure. (por defecto: `${{ env.AZURE_OPENAI_API_CREDENTIALS }}`)

## Salidas

* `text`: La salida de texto generada.

## Uso

Agrega lo siguiente a tu paso en el archivo de workflow:

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

## Astro Starlight

El complemento soporta la traducción de archivos markdown o MDX de Astro Starlight para un sitio que use un locale predeterminado **arraigado** y un alias **base** para la documentación.

Configura las entradas `starlight_dir` y `starlight_base` para que apunten respectivamente a la carpeta raíz de tu documentación de Astro Starlight y al alias base de la documentación.

## Desarrollo

Esta acción fue generada automáticamente por GenAIScript a partir de los metadatos del script.
Recomendamos actualizar los metadatos del script en vez de editar directamente los archivos de la acción.

* las entradas de la acción se infieren de los parámetros del script
* las salidas de la acción se infieren del esquema de salida del script
* la descripción de la acción es la descripción del script
* la descripción del readme es la descripción del script
* la imagen de marca (branding) de la acción es la del script

Para **regenerar** los archivos de la acción (`action.yml`), ejecuta:

```bash
npm run configure
```

Para ejecutar lint en los archivos de script, ejecuta:

```bash
npm run lint
```

Para comprobar los tipos de los scripts, ejecuta:

```bash
npm run typecheck
```

Para construir la imagen Docker localmente, ejecuta:

```bash
npm run docker:build
```

Para ejecutar la acción localmente en Docker (constrúyela primero), usa:

```bash
npm run docker:start
```

## Actualización

La versión de GenAIScript está fijada en el archivo `package.json`. Para actualizarla, ejecuta:

```bash
npm run upgrade
```

## Lanzamiento

Para lanzar una nueva versión de esta acción, ejecuta el script de lanzamiento en un directorio limpio.

```bash
npm run release
```
