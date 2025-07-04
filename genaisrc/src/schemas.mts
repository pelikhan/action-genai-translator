import type { JSONSchemaObject } from "@genaiscript/core";

export const TranslatorConfigurationSchema = Object.freeze({
  type: "object",
  properties: {
    instructions: {
      type: "string",
      description:
        "Instructions for the translator, such as preferred style or tone.",
    },
  },
  additionalProperties: false,
  required: [],
} satisfies JSONSchemaObject);

export const FrontmatterWithTranslatorSchema = Object.freeze({
  type: "object",
  properties: {
    translator: TranslatorConfigurationSchema,
  },
  additionalProperties: false,
  required: [],
} satisfies JSONSchemaObject);
