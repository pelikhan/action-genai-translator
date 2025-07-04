# Tradução Contínua

Esta ação usa a tradução incremental de documentos Markdown usando [GitHub Models](https://github.com/models).

* [Documentação](https://pelikhan.github.io/action-continuous-translation/)
* [Post no Blog](https://microsoft.github.io/genaiscript/blog/continuous-translations/)
* [Francês](./README.fr.md)
* [Espanhol](./README.es.md)
* [Árabe](./README.ar.md)

## Como funciona?

Esta ação usa o [GenAIScript](https://microsoft.github.io/genaiscript/) para analisar e traduzir programaticamente documentos Markdown. O processo de tradução funciona da seguinte forma:

* analisar o arquivo Markdown para AST (árvore de sintaxe abstrata)
* visitar a árvore e buscar traduções existentes ou marcar o nó que precisa de tradução
* executar inferência LLM para coletar novas traduções
* injetar novas traduções no documento e validar a qualidade
* salvar traduções no cache de arquivos
* realizar commit das alterações

## Entradas

* `lang`: O idioma de destino para tradução, no formato de código ISO. (padrão: `fr`)
* `source`: O idioma de origem para tradução, no formato de código ISO. (padrão: `en`)
* `files`: Arquivos a serem processados, separados por ponto e vírgula. O padrão é `README.md`.
* `instructions`: Instruções extras para o LLM usar durante a tradução.
* `instructions_file`: Caminho para um arquivo contendo instruções extras para o LLM usar durante a tradução.
* `starlight_dir`: Pasta raiz da documentação do Astro Starlight.
* `starlight_base`: Alias base para a documentação do Starlight.

## Diagnósticos

* `force`: Forçar a tradução, mesmo que o arquivo já tenha sido traduzido.
* `debug`: Habilitar logging de depuração (<https://microsoft.github.io/genaiscript/reference/scripts/logging/>).

### Configuração do LLM

* `github_token`: Token do GitHub com permissão mínima de `models: read` (<https://microsoft.github.io/genaiscript/reference/github-actions/#github-models-permissions>). (padrão: `${{ secrets.GITHUB_TOKEN }}`)

* `openai_api_key`: Chave de API da OpenAI (padrão: `${{ secrets.OPENAI_API_KEY }}`)

* `openai_api_base`: URL base da API da OpenAI (padrão: `${{ env.OPENAI_API_BASE }}`)

* `azure_openai_api_endpoint`: Endpoint do Azure OpenAI. No Portal do Azure, abra seu recurso Azure OpenAI, em Chaves e Endpoints, copie o Endpoint. (padrão: `${{ env.AZURE_OPENAI_API_ENDPOINT }}`)

* `azure_openai_api_key`: Chave de API do Azure OpenAI. \*\*Você NÃO precisa disso se estiver utilizando Microsoft Entra ID. (padrão: `${{ secrets.AZURE_OPENAI_API_KEY }}`)

* `azure_openai_subscription_id`: ID da assinatura Azure OpenAI para listar implantações disponíveis (somente para Microsoft Entra). (padrão: `${{ env.AZURE_OPENAI_SUBSCRIPTION_ID }}`)

* `azure_openai_api_version`: Versão da API do Azure OpenAI. (padrão: `${{ env.AZURE_OPENAI_API_VERSION }}`)

* `azure_openai_api_credentials`: Tipo de credenciais da API do Azure OpenAI. Deixe como 'default' a menos que você tenha uma configuração especial no Azure. (padrão: `${{ env.AZURE_OPENAI_API_CREDENTIALS }}`)

## Saídas

* `text`: A saída de texto gerada.

## Uso

Adicione o seguinte ao seu passo no arquivo de workflow:

```yaml
uses: pelikhan/action-continuous-translation@v0
with:
  github_token: ${{ secrets.GITHUB_TOKEN }}
  lang: fr,es
```

## Exemplo

Salve este arquivo no diretório `.github/workflows/` como `continuous-translation.yml`:

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

## Desenvolvimento

Esta ação foi gerada automaticamente pelo GenAIScript a partir dos metadados do script.
Recomendamos atualizar os metadados do script em vez de editar os arquivos da ação diretamente.

* as entradas da ação são inferidas dos parâmetros do script
* as saídas da ação são inferidas do esquema de saída do script
* a descrição da ação é a descrição do script
* a descrição do readme é a descrição do script
* a marca da ação é a marca do script

Para **regenerar** os arquivos da ação (`action.yml`), execute:

```bash
npm run configure
```

Para verificar arquivos de script, execute:

```bash
npm run lint
```

Para verificar o tipo dos scripts, execute:

```bash
npm run typecheck
```

Para construir a imagem Docker localmente, execute:

```bash
npm run docker:build
```

Para executar a ação localmente no Docker (primeiro construa), use:

```bash
npm run docker:start
```

## Atualizar

A versão do GenAIScript está fixada no arquivo `package.json`. Para atualizá-la, execute:

```bash
npm run upgrade
```

## Lançamento

Para lançar uma nova versão desta ação, execute o script de lançamento em um diretório de trabalho limpo.

```bash
npm run release
```
