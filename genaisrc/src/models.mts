export function resolveModels(lang: string): LangConfiguration {
  const config = LANGS[lang];
  if (!config)
    throw new Error(`Language configuration for "${lang}" not found.`);
  const res = structuredClone(config);
  if (!res.models) res.models = {};
  res.models.translation ??= DEFAULT_MODELS.translation;
  res.models.classify ??= DEFAULT_MODELS.classify;
  return res;
}

export interface LangConfiguration {
  name: string;
  models?: {
    translation?: string;
    classify?: string;
  };
}

const DEFAULT_MODELS = {
  translation: "github:openai/gpt-4o",
  classify: "github:openai/gpt-4o",
} as Required<LangConfiguration["models"]>;

const LANGS = Object.freeze({
  en: { name: "English" },
  fr: { name: "French" },
  es: { name: "Spanish" },
  de: { name: "German" },
  it: { name: "Italian" },
  pt: { name: "Portuguese" },
  "pt-br": { name: "Brazilian Portuguese" },
  ru: { name: "Russian" },
  zh: { name: "Chinese" },
  ja: { name: "Japanese" },
  ko: { name: "Korean" },
  ar: {
    name: "Arabic",
    models: {
      translation: "github:openai/gpt-4o",
      classify: "github:core42/jais-30b-chat",
    },
  },
  hi: { name: "Hindi" },
  tr: { name: "Turkish" },
  nl: { name: "Dutch" },
  pl: { name: "Polish" },
  sv: { name: "Swedish" },
  no: { name: "Norwegian" },
  fi: { name: "Finnish" },
  da: { name: "Danish" },
  cs: { name: "Czech" },
  hu: { name: "Hungarian" },
  ro: { name: "Romanian" },
  th: { name: "Thai" },
  vi: { name: "Vietnamese" },
  id: { name: "Indonesian" },
  ms: { name: "Malay" },
  he: { name: "Hebrew" },
  bg: { name: "Bulgarian" },
  uk: { name: "Ukrainian" },
  el: { name: "Greek" },
  sk: { name: "Slovak" },
  sl: { name: "Slovenian" },
  hr: { name: "Croatian" },
} as Record<string, LangConfiguration>);
