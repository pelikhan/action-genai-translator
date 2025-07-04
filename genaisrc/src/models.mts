export interface LangConfiguration {
  name: string;
  models?: {
    translation?: string;
    classify?: string;
  };
}
export const DEFAULT_MODELS = {
  translation: "github:openai/gpt-4o",
  classify: "github:openai/gpt-4o",
} as Required<LangConfiguration["models"]>;
export const LANGS = Object.freeze({
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
      classify: "core42/jais-30b-chat",
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
