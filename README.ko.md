# 연속 번역

이 액션은 [GitHub Models](https://github.com/models)를 사용하여 마크다운 문서를 점진적으로 번역합니다. [Astro Starlight](https://starlight.astro.build/)에 대한 기본 지원 포함!

* [문서](https://pelikhan.github.io/action-continuous-translation/)
* [블로그 게시물](https://microsoft.github.io/genaiscript/blog/continuous-translations/)
* [프랑스어](./README.fr.md)
* [스페인어](./README.es.md)
* [아랍어](./README.ar.md)

## 작동 방식

이 액션은 [GenAIScript](https://microsoft.github.io/genaiscript/)를 사용하여 마크다운 문서를 프로그래밍 방식으로 분석하고 번역합니다. 번역 과정은 다음과 같습니다:

* 마크다운 파일을 AST(추상 구문 트리)로 파싱
* 트리를 방문하며 기존 번역을 조회하거나 번역이 필요한 노드 표시
* LLM 추론을 실행하여 새로운 번역을 수집
* 문서에 새로운 번역을 주입하고 품질을 검증
* 번역을 파일 캐시에 저장
* 변경 사항 커밋

## 입력값

* `lang`: 번역 대상 언어의 ISO 코드. (기본값: `fr`)
* `source`: 번역 소스 언어의 ISO 코드. (기본값: `en`)
* `files`: 처리할 파일들. 세미콜론으로 구분. 기본값은 `README.md`.
* `instructions`: 번역 시 LLM이 사용할 추가 지침.
* `instructions_file`: 번역 시 LLM이 사용할 추가 지침이 포함된 파일 경로.
* `starlight_dir`: Astro Starlight 문서의 루트 폴더.
* `starlight_base`: Starlight 문서의 기본 별칭.

### 진단

* `force`: 파일이 이미 번역되었더라도 번역을 강제 실행.
* `debug`: 디버그 로깅 활성화 (<https://microsoft.github.io/genaiscript/reference/scripts/logging/>).

### LLM 구성

* `github_token`: 최소한 `models: read` 권한을 가진 GitHub 토큰 (<https://microsoft.github.io/genaiscript/reference/github-actions/#github-models-permissions>). (기본값: `${{ secrets.GITHUB_TOKEN }}`)

* `openai_api_key`: OpenAI API 키 (기본값: `${{ secrets.OPENAI_API_KEY }}`)

* `openai_api_base`: OpenAI API 기본 URL (기본값: `${{ env.OPENAI_API_BASE }}`)

* `azure_openai_api_endpoint`: Azure OpenAI 엔드포인트. Azure 포털에서 Azure OpenAI 리소스를 열어 키 및 엔드포인트를 복사하세요. (기본값: `${{ env.AZURE_OPENAI_API_ENDPOINT }}`)

* `azure_openai_api_key`: Azure OpenAI API 키. \*\*Microsoft Entra ID를 사용하는 경우 필요하지 않습니다. (기본값: `${{ secrets.AZURE_OPENAI_API_KEY }}`)

* `azure_openai_subscription_id`: 배포 가능한 목록을 나열하기 위한 Azure OpenAI 구독 ID (Microsoft Entra 전용). (기본값: `${{ env.AZURE_OPENAI_SUBSCRIPTION_ID }}`)

* `azure_openai_api_version`: Azure OpenAI API 버전. (기본값: `${{ env.AZURE_OPENAI_API_VERSION }}`)

* `azure_openai_api_credentials`: Azure OpenAI API 자격 증명 유형. 특별한 Azure 설정이 없다면 'default'로 남겨두십시오. (기본값: `${{ env.AZURE_OPENAI_API_CREDENTIALS }}`)

## 출력값

* `text`: 생성된 텍스트 출력.

## 사용법

워크플로 파일의 해당 단계에 다음을 추가하세요:

```yaml
uses: pelikhan/action-continuous-translation@v0
with:
  github_token: ${{ secrets.GITHUB_TOKEN }}
  lang: fr,es
```

## 예제

이 파일을 `.github/workflows/` 디렉터리에 `continuous-translation.yml`로 저장하세요:

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

## 개발

이 액션은 GenAIScript의 스크립트 메타데이터에서 자동 생성되었습니다. 액션 파일을 직접 편집하지 않고 스크립트 메타데이터를 업데이트할 것을 권장합니다.

* 액션 입력값은 스크립트 매개변수에서 추론됩니다.
* 액션 출력값은 스크립트 출력 스키마에서 추론됩니다.
* 액션 설명은 스크립트 설명입니다.
* README 설명은 스크립트 설명입니다.
* 액션 브랜딩은 스크립트 브랜딩입니다.

**액션 파일(`action.yml`)을 재생성**하려면 다음 명령을 실행하십시오:

```bash
npm run configure
```

스크립트 파일을 린트하려면 다음 명령을 실행하십시오:

```bash
npm run lint
```

스크립트를 타입체크하려면 다음 명령을 실행하십시오:

```bash
npm run typecheck
```

번역기를 테스트하려면 다음 명령을 실행하십시오:

```bash
npm run test:genai
```

## 업그레이드

GenAIScript 버전은 `package.json` 파일에 고정되어 있습니다. 업그레이드하려면 다음 명령을 실행하십시오:

```bash
npm run upgrade
```
