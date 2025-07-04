# الترجمة المستمرة

يستخدم هذا الإجراء ترجمة مستندات Markdown تدريجيًا باستخدام [نماذج GitHub](https://github.com/models).

* [التوثيق](https://pelikhan.github.io/action-continuous-translation/)
* [مدونة](https://microsoft.github.io/genaiscript/blog/continuous-translations/)
* [الفرنسية](./README.fr.md)
* [الإسبانية](./README.es.md)

## كيف يعمل؟

يستخدم هذا الإجراء [GenAIScript](https://microsoft.github.io/genaiscript/) لتحليل وترجمة مستندات Markdown برمجيًا. يعمل عملية الترجمة كما يلي:

* تحليل ملف Markdown إلى شجرة بناء تجريدية (AST)
* زيارة الشجرة والتحقق من وجود ترجمة سابقة أو تحديد العقد التي تحتاج إلى ترجمة
* تشغيل استدلال LLM لجمع الترجمات الجديدة
* إدخال الترجمات الجديدة في المستند والتحقق من الجودة
* حفظ الترجمات في ذاكرة التخزين المؤقت للملفات
* تسجيل التغييرات

## المدخلات

* `lang`: رمز ISO للغة الهدف للترجمة. (الافتراضي: `fr`)
* `files`: الملفات التي سيتم معالجتها، مفصولة بفواصل منقوطة. الافتراضي هو `README.md`.
* `instructions`: تعليمات إضافية لـ LLM لاستخدامها أثناء الترجمة.
* `instructions_file`: مسار إلى ملف يحتوي على تعليمات إضافية لـ LLM لاستخدامها أثناء الترجمة.
* `starlight_dir`: مجلد الجذر لتوثيق Astro Starlight.
* `starlight_base`: الاسم المستعار الأساسي لتوثيق Starlight.

## التشخيصات

* `force`: فرض الترجمة حتى لو تم ترجمة الملف بالفعل.
* `debug`: تمكين تسجيل التصحيح (<https://microsoft.github.io/genaiscript/reference/scripts/logging/>).

### تكوين LLM

* `github_token`: رمز GitHub مع إذن `models: read` على الأقل (<https://microsoft.github.io/genaiscript/reference/github-actions/#github-models-permissions>). (الافتراضي: `${{ secrets.GITHUB_TOKEN }}`)

* `openai_api_key`: مفتاح API OpenAI (الافتراضي: `${{ secrets.OPENAI_API_KEY }}`)

* `openai_api_base`: عنوان قاعدة OpenAI API (الافتراضي: `${{ env.OPENAI_API_BASE }}`)

* `azure_openai_api_endpoint`: نقطة نهاية Azure OpenAI. في بوابة Azure، افتح مورد Azure OpenAI الخاص بك، المفاتيح ونقاط النهاية، وانسخ نقطة النهاية. (الافتراضي: `${{ env.AZURE_OPENAI_API_ENDPOINT }}`)

* `azure_openai_api_key`: مفتاح API لـ Azure OpenAI. \*\*لا تحتاج إلى هذا إذا كنت تستخدم Microsoft Entra ID. (الافتراضي: `${{ secrets.AZURE_OPENAI_API_KEY }}`)

* `azure_openai_subscription_id`: معرف اشتراك Azure OpenAI لسرد عمليات النشر المتاحة (Microsoft Entra فقط). (الافتراضي: `${{ env.AZURE_OPENAI_SUBSCRIPTION_ID }}`)

* `azure_openai_api_version`: إصدار API الخاص بـ Azure OpenAI. (الافتراضي: `${{ env.AZURE_OPENAI_API_VERSION }}`)

* `azure_openai_api_credentials`: نوع بيانات اعتماد Azure OpenAI API. اتركه كـ "default" ما لم يكن لديك إعداد خاص لـ Azure. (الافتراضي: `${{ env.AZURE_OPENAI_API_CREDENTIALS }}`)

## المخرجات

* `text`: النص المُوَلّد الناتج.

## الاستخدام

أضف التالي إلى الخطوة الخاصة بك في ملف سير العمل:

```yaml
uses: pelikhan/action-continuous-translation@v0
with:
  github_token: ${{ secrets.GITHUB_TOKEN }}
  lang: fr,es
```

## مثال

احفظ هذا الملف في دليل `.github/workflows/` الخاص بك كـ `continuous-translation.yml`:

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

## Astro Starlight

يدعم المكون الإضافي ترجمة ملفات Markdown أو MDX الخاصة بـ Astro Starlight لموقع يستخدم لغة افتراضية **مرتبطة** واسم مستعار **أساسي** للتوثيق.

قم بتكوين مدخلات `starlight_dir` و`starlight_base` للإشارة إلى مجلد الجذر لتوثيق Astro Starlight والاسم المستعار الأساسي للتوثيق، على التوالي.

## التطوير

تم إنشاء هذا الإجراء تلقائيًا بواسطة GenAIScript من بيانات التعريف الخاصة بالبرنامج النصي. نوصي بتحديث بيانات التعريف الخاصة بالبرنامج النصي بدلًا من تحرير ملفات الإجراء مباشرة.

* مدخلات الإجراء مشتقة من معلمات البرنامج النصي
* مخرجات الإجراء مشتقة من مخطط إخراج البرنامج النصي
* وصف الإجراء هو وصف البرنامج النصي
* وصف ملف readme هو وصف البرنامج النصي
* العلامة التجارية للإجراء هي العلامة التجارية للبرنامج النصي

لإعادة **توليد** ملفات الإجراء (`action.yml`)، قم بتشغيل:

```bash
npm run configure
```

لتحليل ملفات البرنامج النصي، قم بتشغيل:

```bash
npm run lint
```

للتحقق من نوع البرنامج النصي، قم بتشغيل:

```bash
npm run typecheck
```

لبناء صورة Docker محليًا، قم بتشغيل:

```bash
npm run docker:build
```

لتشغيل الإجراء محليًا في Docker (قم ببنائه أولاً)، استخدم:

```bash
npm run docker:start
```

## التحديث

تم تثبيت إصدار GenAIScript في ملف `package.json`. لتحديثه، قم بتشغيل:

```bash
npm run upgrade
```

## الإصدار

لإصدار نسخة جديدة من هذا الإجراء، قم بتشغيل سكريبت الإصدار على دليل عمل نظيف.

```bash
npm run release
```
