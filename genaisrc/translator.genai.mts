import { hash } from "crypto";
import { classify } from "@genaiscript/runtime";
import { mdast } from "@genaiscript/plugin-mdast";
import "mdast-util-mdxjs-esm";
import "mdast-util-mdx-jsx";
import type {
  Node,
  Text,
  Heading,
  Paragraph,
  PhrasingContent,
  Yaml,
} from "mdast";
import { basename, dirname, join, relative } from "path";
import { URL } from "url";
import { xor } from "es-toolkit";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";

script({
  title: "Automatic Markdown Translations using GenAI",
  description:
    "This action uses GitHub Models and remark to translate markdown document incrementally in your repository.",
  accept: ".md,.mdx",
  files: ["README.md", "markdown.md"],
  parameters: {
    lang: {
      type: "string",
      default: "fr,es",
      description: "The iso-code target language for translation.",
    },
    instructions: {
      type: "string",
      description:
        "Additional prompting instructions that will be injected in the translation prompt.",
    },
    instructionsFile: {
      type: "string",
      description:
        "File containing additional prompting instructions that will be injected in the translation prompt.",
    },
    starlightDir: {
      type: "string",
      description:
        "Root directory for the Astro Starlight documentation. Must specify starlightBase as well.",
    },
    starlightBase: {
      type: "string",
      description:
        "Base path for the Astro Starlight documentation. Used to patch links in translations. Must specify starlightDir as well.",
    },
    force: {
      type: "boolean",
      default: false,
      description:
        "Force translation even if the file has already been translated.",
    },
  },
});

const HASH_TEXT_LENGTH = 80;
const HASH_LENGTH = 20;
const maxPromptPerFile = 5;
const minTranslationsThreshold = 0.9;
const nodeTypes = ["text", "paragraph", "heading", "yaml"];
const MARKER_START = "┌";
const MARKER_END = "└";
type NodeType = Text | Paragraph | Heading | Yaml;
const langs = {
  fr: "French",
  es: "Spanish",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  "pt-BR": "Brazilian Portuguese",
  ru: "Russian",
  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
  ar: "Arabic",
  hi: "Hindi",
  tr: "Turkish",
  nl: "Dutch",
  pl: "Polish",
  sv: "Swedish",
  no: "Norwegian",
  fi: "Finnish",
  da: "Danish",
  cs: "Czech",
  hu: "Hungarian",
  ro: "Romanian",
  th: "Thai",
  vi: "Vietnamese",
  id: "Indonesian",
  ms: "Malay",
  he: "Hebrew",
  bg: "Bulgarian",
  uk: "Ukrainian",
  el: "Greek",
  sk: "Slovak",
  sl: "Slovenian",
  hr: "Croatian",
};

const isUri = (str: string): URL => {
  try {
    return new URL(str);
  } catch {
    return undefined;
  }
};

const hasMarker = (str: string): boolean => {
  return str.includes(MARKER_START) || str.includes(MARKER_END);
};

export default async function main() {
  const { dbg, output, vars } = env;
  const dbgc = host.logger(`script:md`);
  const dbgt = host.logger(`script:tree`);
  const dbge = host.logger(`script:text`);
  const dbgm = host.logger(`script:mdx`);
  const parameters = vars as {
    lang: string;
    force: boolean;
    starlightDir?: string;
    starlightBase?: string;
    instructions?: string;
    instructionsFile?: string;
  };
  const { force, instructions } = parameters;

  const instructionsFile = parameters.instructionsFile
    ? MD.content(await workspace.readText(parameters.instructionsFile))
    : undefined;
  const starlightDir = parameters.starlightDir
    ? `${parameters.starlightDir}/src/content/docs`
    : undefined;
  dbg(`starlightDir: %s`, starlightDir);
  const starlightBase = parameters.starlightBase;
  dbg(`starlightBase: %s`, starlightBase);
  if (!!starlightDir !== !!starlightBase)
    throw new Error(
      `Both starlightDir and starlightBase must be defined or undefined together.`
    );
  const starlightBaseRx = starlightBase
    ? new RegExp(`^/${starlightBase}/`)
    : undefined;

  const tos = vars.lang
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  dbg(`tos: %o`, tos);
  const ignorer = await parsers.ignore(".ctignore");
  dbg(`ignorer: %s`, ignorer ? "loaded" : "no .ctignore found");
  dbg(
    `files (before filter): %O`,
    env.files.map((f) => f.filename)
  );
  const files = env.files
    .filter((f) => ignorer([f.filename]).length)
    // Filter files that match the ISO language code pattern in the filename
    .filter(({ filename }) => !/\.\w\w(-\w\w\w?)?\.mdx?$/i.test(filename))
    .filter(({ filename }) => !/\/\w\w(-\w\w\w?)?\//i.test(filename));
  if (!files.length) cancel("No files or not matching languages selected.");

  files.forEach(({ filename }) => output.item(filename));

  for (const to of tos) {
    let lang = langs[to];
    if (!lang) {
      const res =
        await prompt`Respond human friendly name of language: ${to}`.options({
          cache: true,
          systemSafety: false,
          responseType: "text",
          throwOnError: true,
        });
      lang = res.text;
    }
    output.heading(2, `Translating Markdown files to ${lang} (${to})`);
    const translationCacheFilename = `translations/${to.toLowerCase()}.json`;
    dbg(`cache: %s`, translationCacheFilename);
    output.itemValue("cache", translationCacheFilename);
    // hash -> text translation
    const translationCache: Record<string, string> = force
      ? {}
      : (await workspace.readJSON(translationCacheFilename)) || {};
    for (const [k, v] of Object.entries(translationCache)) {
      if (hasMarker(v)) delete translationCache[k];
    }
    dbgc(`translation cache: %O`, translationCache);

    for (const file of files) {
      const { filename } = file;
      output.heading(3, `${filename}`);

      const { visit, parse, stringify, SKIP } = await mdast({
        mdx: /\.mdx$/i.test(filename),
      });
      const hashNode = (node: Node | string) => {
        if (typeof node === "object") {
          node = structuredClone(node);
          visit(node, (node) => delete node.position);
        }
        const text =
          typeof node === "string"
            ? node
            : stringify({ type: "root", children: [node as any] });
        const chunkHash = hash("sha-256", JSON.stringify(text));
        if (text.length < HASH_TEXT_LENGTH) return text;
        else
          return (
            text.slice(0, HASH_TEXT_LENGTH) +
            "." +
            chunkHash.slice(0, HASH_LENGTH).toUpperCase()
          );
      };

      try {
        const starlight = starlightDir && filename.startsWith(starlightDir);
        dbg(`starlight: %s`, starlight);
        const translationFn = starlight
          ? filename.replace(starlightDir, join(starlightDir, to.toLowerCase()))
          : path.changeext(filename, `.${to.toLowerCase()}.md`);
        dbg(`translation %s`, translationFn);

        const patchFn = (fn: string, trailingSlash?: boolean) => {
          if (typeof fn === "string" && /^\./.test(fn) && starlight) {
            // given an local image path fn (like ./image.png) relative to the original file (filename),
            // path it to the translation file (translationFn).
            // Calculate the relative path from the translation file's directory to the original file's directory,
            // then join it with the local image path to get the correct relative path for the translation
            const originalDir = dirname(filename);
            const translationDir = dirname(translationFn);
            const relativeToOriginal = relative(translationDir, originalDir);
            let r = join(relativeToOriginal, fn);
            if (trailingSlash && !r.endsWith("/")) r += "/";
            dbg(`patching %s -> %s`, fn, r);
            return r;
          }
          return fn;
        };

        let content = file.content;
        dbgc(`md: %s`, content);

        // normalize content
        dbgc(`normalizing content`);
        content = stringify(parse(content));

        // parse to tree
        dbgc(`parsing %s`, filename);
        const root = parse(content);
        dbgt(`original %O`, root.children);
        // collect original nodes nodes
        const nodes: Record<string, NodeType> = {};
        visit(root, nodeTypes, (node) => {
          const hash = hashNode(node);
          dbg(`node: %s -> %s`, node.type, hash);
          nodes[hash] = node as NodeType;
        });

        dbg(`nodes: %d`, Object.keys(nodes).length);

        const llmHashes: Record<string, string> = {};
        const llmHashTodos = new Set<string>();

        // apply translations and mark untranslated nodes with id
        let translated = structuredClone(root);
        visit(translated, nodeTypes, (node) => {
          const nhash = hashNode(node);
          const translation = translationCache[nhash];
          if (translation) {
            dbg(`translated: %s`, nhash);
            Object.assign(node, translation);
          } else {
            // mark untranslated nodes with a unique identifier
            if (node.type === "text") {
              if (
                !/\s*[.,:;<>\]\[{}\(\)…]+\s*/.test(node.value) &&
                !isUri(node.value)
              ) {
                dbg(`text node: %s`, nhash);
                // compress long hash into LLM friendly short hash
                const llmHash = `T${Object.keys(llmHashes)
                  .length.toString()
                  .padStart(3, "0")}`;
                llmHashes[llmHash] = nhash;
                llmHashTodos.add(llmHash);
                node.value = `┌${llmHash}┐${node.value}└${llmHash}┘`;
              }
            } else if (node.type === "paragraph" || node.type === "heading") {
              dbg(`paragraph/heading node: %s`, nhash);
              const llmHash = `P${Object.keys(llmHashes)
                .length.toString()
                .padStart(3, "0")}`;
              llmHashes[llmHash] = nhash;
              llmHashTodos.add(llmHash);
              node.children.unshift({
                type: "text",
                value: `┌${llmHash}┐`,
              } as Text);
              node.children.push({
                type: "text",
                value: `└${llmHash}┘`,
              });
              return SKIP; // don't process children of paragraphs
            } else if (node.type === "yaml") {
              dbg(`yaml node: %s`, nhash);
              const data = parsers.YAML(node.value);
              if (data) {
                if (starlight) {
                  if (Array.isArray(data?.hero?.actions)) {
                    data.hero.actions.forEach((action) => {
                      if (typeof action.text === "string") {
                        const nhash = hashNode(action.text);
                        const tr = translationCache[nhash];
                        dbg(`yaml hero.action: %s -> %s`, nhash, tr);
                        if (!tr) action.text = tr;
                        else {
                          const llmHash = `T${Object.keys(llmHashes)
                            .length.toString()
                            .padStart(3, "0")}`;
                          llmHashes[llmHash] = nhash;
                          llmHashTodos.add(llmHash);
                          action.text = `┌${llmHash}┐${action.text}└${llmHash}┘`;
                        }
                      }
                    });
                  }
                  if (data?.cover?.image) {
                    data.cover.image = patchFn(data.cover.image);
                    dbg(`yaml cover image: %s`, data.cover.image);
                  }
                }
                if (typeof data.excerpt === "string") {
                  const nhash = hashNode(data.excerpt);
                  const tr = translationCache[nhash];
                  if (tr) data.excerpt = tr;
                  else {
                    const llmHash = `T${Object.keys(llmHashes)
                      .length.toString()
                      .padStart(3, "0")}`;
                    llmHashes[llmHash] = nhash;
                    llmHashTodos.add(llmHash);
                    data.excerpt = `┌${llmHash}┐${data.excerpt}└${llmHash}┘`;
                  }
                }
                if (typeof data.title === "string") {
                  const nhash = hashNode(data.title);
                  const tr = translationCache[nhash];
                  if (tr) data.title = tr;
                  else {
                    const llmHash = `T${Object.keys(llmHashes)
                      .length.toString()
                      .padStart(3, "0")}`;
                    llmHashes[llmHash] = nhash;
                    llmHashTodos.add(llmHash);
                    data.title = `┌${llmHash}┐${data.title}└${llmHash}┘`;
                  }
                }
                if (typeof data.description === "string") {
                  const nhash = hashNode(data.description);
                  const tr = translationCache[nhash];
                  if (tr) data.title = tr;
                  else {
                    const llmHash = `D${Object.keys(llmHashes)
                      .length.toString()
                      .padStart(3, "0")}`;
                    llmHashes[llmHash] = nhash;
                    llmHashTodos.add(llmHash);
                    data.description = `┌${llmHash}┐${data.description}└${llmHash}┘`;
                  }
                }
                node.value = YAML.stringify(data);
                return SKIP;
              }
            } else {
              dbg(`untranslated node type: %s`, node.type);
            }
          }
        });

        // patch images and esm imports
        visit(translated, ["mdxJsxFlowElement"], (node) => {
          const flow = node as MdxJsxFlowElement;
          for (const attribute of flow.attributes || []) {
            if (
              attribute.type === "mdxJsxAttribute" &&
              attribute.name === "title"
            ) {
              // collect title attributes
              dbgm(`attribute title: %s`, attribute.value);
              let title = attribute.value;
              const nhash = hashNode(title);
              const tr = translationCache[nhash];
              if (tr) title = tr;
              else {
                const llmHash = `T${Object.keys(llmHashes)
                  .length.toString()
                  .padStart(3, "0")}`;
                llmHashes[llmHash] = nhash;
                llmHashTodos.add(llmHash);
                title = `┌${llmHash}┐${title}└${llmHash}┘`;
              }
              attribute.value = title;
              return SKIP;
            }
          }
        });

        dbgt(`translated %O`, translated.children);
        let attempts = 0;
        let lastLLmHashTodos = llmHashTodos.size + 1;
        while (
          llmHashTodos.size &&
          llmHashTodos.size < lastLLmHashTodos &&
          attempts < maxPromptPerFile
        ) {
          attempts++;
          output.itemValue(`missing translations`, llmHashTodos.size);
          dbge(`todos: %o`, Array.from(llmHashTodos));
          const contentMix = stringify(translated);
          dbgc(`translatable content: %s`, contentMix);

          // run prompt to generate translations
          const { fences, error } = await runPrompt(
            async (ctx) => {
              const originalRef = ctx.def("ORIGINAL", file.content, {
                lineNumbers: false,
              });
              const translatedRef = ctx.def("TRANSLATED", contentMix, {
                lineNumbers: false,
              });
              ctx.$`You are an expert at translating technical documentation into ${lang} (${to}).
      
      ## Task
      Your task is to translate a Markdown (GFM) document to ${lang} (${to}) while preserving the structure and formatting of the original document.
      You will receive the original document as a variable named ${originalRef} and the currently translated document as a variable named ${translatedRef}.

      Each Markdown AST node in the translated document that has not been translated yet will be enclosed with a unique identifier in the form 
      of \`┌node_identifier┐\` at the start and \`└node_identifier┘\` at the end of the node.
      You should translate the content of each these nodes individually.
      Example:

      \`\`\`markdown
      ┌T001┐
      This is the content to be translated.
      └T001┘

      This is some other content that does not need translation.

      ┌T002┐
      This is another piece of content to be translated.
      └T002┘
      \`\`\`

      ## Output format

      Respond using code regions where the language string is the HASH value
      For example:
      
      \`\`\`T001
      translated content of text enclosed in T001 here (only T001 content!)
      \`\`\`

      \`\`\`T002
      translated content of text enclosed in T002 here (only T002 content!)
      \`\`\`

      \`\`\`T003
      translated content of text enclosed in T003 here (only T003 content!)
      \`\`\`
      ...

      ## Instructions

      - Be extremely careful about the HASH names. They are unique identifiers for each node and should not be changed.
      - Always use code regions to respond with the translated content. 
      - Do not translate the text outside of the HASH tags.
      - Do not change the structure of the document.
      - As much as possible, maintain the original formatting and structure of the document.
      - Do not translate inline code blocks, code blocks, or any other code-related content.
      - Use ' instead of ’
      - Always make sure that the URLs are not modified by the translation.
      - Translate each node individually, preserving the original meaning and context.
      - If you are unsure about the translation, skip the translation.
      ${instructions || ""}
      ${instructionsFile || ""}`.role("system");
            },
            {
              responseType: "text",
              systemSafety: true,
              system: [],
              cache: true,
              label: `translating ${filename} (${llmHashTodos.size} nodes)`,
            }
          );

          if (error) {
            // are we out of tokens?
            if (/429/.test(error.message)) {
              output.error(`Rate limit exceeded: ${error.message}`);
              cancel(`rate limit exceeded`);
            }

            output.error(`Error translating ${filename}: ${error.message}`);
            break;
          }

          // collect translations
          for (const fence of fences) {
            const llmHash = fence.language;
            if (llmHashTodos.has(llmHash)) {
              llmHashTodos.delete(llmHash);
              const hash = llmHashes[llmHash];
              dbg(`translation: %s - %s`, llmHash, hash);
              let chunkTranslated = fence.content.replace(/\r?\n$/, "").trim();
              const node = nodes[hash];
              dbg(`original node: %O`, node);
              if (node?.type === "text" && /\s$/.test(node.value)) {
                // preserve trailing space if original text had it
                dbg(`patch trailing space for %s`, hash);
                chunkTranslated += " ";
              }
              chunkTranslated = chunkTranslated
                .replace(/┌[A-Z]\d{3,5}┐/g, "")
                .replace(/└[A-Z]\d{3,5}┘/g, "");
              dbg(`content: %s`, chunkTranslated);
              translationCache[hash] = chunkTranslated;
            }
          }

          lastLLmHashTodos = llmHashTodos.size;
        }

        // apply translations
        translated = structuredClone(root);

        // apply translations
        let unresolvedTranslations = 0;
        visit(translated, nodeTypes, (node) => {
          if (node.type === "yaml") {
            const data = parsers.YAML(node.value);
            if (data) {
              if (starlight) {
                if (data?.hero?.image?.file) {
                  data.hero.image.file = patchFn(data.hero.image.file);
                  dbg(`yaml hero image: %s`, data.hero.image.file);
                }
                if (Array.isArray(data?.hero?.actions)) {
                  data.hero.actions.forEach((action) => {
                    if (typeof action.link === "string") {
                      action.link = action.link.replace(
                        starlightBaseRx,
                        `/${starlightBase}/${to.toLowerCase()}/`
                      );
                      dbg(`yaml hero action link: %s`, action.link);
                    }
                    if (typeof action.text === "string") {
                      const nhash = hashNode(action.text);
                      const tr = translationCache[nhash];
                      dbg(`yaml hero.action: %s -> %s`, nhash, tr);
                      if (tr) action.text = tr;
                      else unresolvedTranslations++;
                    }
                    if (action?.image?.file) {
                      action.image.file = patchFn(action.image.file);
                      dbg(`yaml hero action image: %s`, action.image.file);
                    }
                  });
                }
                if (data?.cover?.image) {
                  data.cover.image = patchFn(data.cover.image);
                  dbg(`yaml cover image: %s`, data.cover.image);
                }
              }
              if (typeof data.excerpt === "string") {
                const nhash = hashNode(data.excerpt);
                const tr = translationCache[nhash];
                dbg(`yaml excerpt: %s -> %s`, nhash, tr);
                if (tr) data.excerpt = tr;
                else unresolvedTranslations++;
              }
              if (typeof data.title === "string") {
                const nhash = hashNode(data.title);
                const tr = translationCache[nhash];
                dbg(`yaml title: %s -> %s`, nhash, tr);
                if (tr) data.title = tr;
                else unresolvedTranslations++;
              }
              if (typeof data.description === "string") {
                const nhash = hashNode(data.description);
                const tr = translationCache[nhash];
                dbg(`yaml description: %s -> %s`, nhash, tr);
                if (tr) data.description = tr;
                else unresolvedTranslations++;
              }
              node.value = YAML.stringify(data);
              return SKIP;
            }
          } else {
            const hash = hashNode(node);
            const translation = translationCache[hash];
            if (translation) {
              if (node.type === "text") {
                dbg(`translated text: %s -> %s`, hash, translation);
                node.value = translation;
              } else if (node.type === "paragraph" || node.type === "heading") {
                dbg(`translated %s: %s -> %s`, node.type, hash, translation);
                try {
                  const newNodes = parse(translation)
                    .children as PhrasingContent[];
                  node.children.splice(0, node.children.length, ...newNodes);
                  return SKIP;
                } catch (error) {
                  output.error(`error parsing paragraph translation`, error);
                  output.fence(node, "json");
                  output.fence(translation);
                }
              } else {
                dbg(`untranslated node type: %s`, node.type);
              }
            } else unresolvedTranslations++;
          }
        });

        // patch images and esm imports
        visit(translated, ["mdxjsEsm", "image"], (node) => {
          if (node.type === "image") {
            node.url = patchFn(node.url);
            return SKIP;
          } else if (node.type === "mdxjsEsm") {
            // path local imports
            const rx =
              /^(import|\})\s*(.*)\s+from\s+(?:\"|')(\.?\.\/.*)(?:\"|');?$/gm;
            node.value = node.value.replace(rx, (m, k, i, p) => {
              const pp = patchFn(p);
              const r =
                k === "}" ? `} from "${pp}";` : `import ${i} from "${pp}";`;
              dbg(`mdxjsEsm import: %s -> %s`, m, r);
              return r;
            });
            return SKIP;
          }
        });

        visit(translated, ["mdxJsxFlowElement"], (node) => {
          const flow = node as MdxJsxFlowElement;
          for (const attribute of flow.attributes || []) {
            if (
              attribute.type === "mdxJsxAttribute" &&
              attribute.name === "title"
            ) {
              const hash = hashNode(attribute.value);
              const tr = translationCache[hash];
              if (tr) {
                dbg(`translate title: %s -> %s`, hash, tr);
                attribute.value = tr;
              } else unresolvedTranslations++;
            }
          }
        });

        // patch links
        if (starlight) {
          visit(translated, "link", (node) => {
            if (starlightBaseRx.test(node.url)) {
              node.url = patchFn(
                node.url.replace(starlightBaseRx, "../"),
                true
              );
            }
          });
        }

        output.itemValue(`unresolved translations`, unresolvedTranslations);
        const nTranslations = Object.keys(llmHashes).length;
        if (
          (nTranslations - unresolvedTranslations) / nTranslations <
          minTranslationsThreshold
        ) {
          output.warn(`not enough translations, skipping file.`);
          continue;
        }

        dbgt(`stringifying %O`, translated.children);
        let contentTranslated = await stringify(translated);
        if (content === contentTranslated) {
          output.warn(`Unable to translate anything, skipping file.`);
          continue;
        }

        // validate it stills parses as Markdown
        try {
          parse(contentTranslated);
        } catch (error) {
          output.error(`Translated content is not valid Markdown`, error);
          output.diff(content, contentTranslated);
          continue;
        }

        // validate all external links
        // have same domain
        {
          const originalLinks = new Set<string>();
          visit(root, "link", (node) => {
            if (isUri(node.url)) {
              originalLinks.add(node.url);
            }
          });
          const translatedLinks = new Set<string>();
          visit(translated, "link", (node) => {
            if (isUri(node.url)) {
              translatedLinks.add(node.url);
            }
          });
          const diffLinks = xor(
            Array.from(originalLinks),
            Array.from(translatedLinks)
          );
          if (diffLinks.length) {
            output.warn(`some links have changed`);
            output.fence(diffLinks, "yaml");
          }
        }

        if (attempts) {
          // judge quality is good enough
          const res = await classify(
            (ctx) => {
              ctx.$`You are an expert at judging the quality of translations. 
          Your task is to determine the quality of the translation of a Markdown document from English to ${lang} (${to}).
          The original document is in ${ctx.def(
            "ORIGINAL",
            content
          )}, and the translated document is provided in ${ctx.def(
                "TRANSLATED",
                contentTranslated,
                { lineNumbers: true }
              )} (line numbers were added).`.role("system");
            },
            {
              ok: `Translation is faithful to the original document and conveys the same meaning.`,
              bad: `Translation is of low quality or has a different meaning from the original.`,
            },
            {
              label: `judge translation ${to} ${basename(filename)}`,
              explanations: true,
              cache: true,
              systemSafety: true,
            }
          );

          // are we out of tokens?
          if (/429/.test(res.error)) {
            output.error(`Rate limit exceeded: ${res.error}`);
            cancel(`rate limit exceeded`);
          }

          output.resultItem(
            res.label === "ok",
            `Translation quality: ${res.label}`
          );
          if (res.label !== "ok") {
            output.fence(res.answer);
            output.diff(content, contentTranslated);
            continue;
          }
        }

        // apply translations and save
        dbgc(`translated: %s`, contentTranslated);
        dbg(`writing translation to %s`, translationFn);

        await workspace.writeText(translationFn, contentTranslated);
        await workspace.writeText(
          translationCacheFilename,
          JSON.stringify(translationCache, null, 2)
        );
      } catch (error) {
        output.error(error);
        break;
      }
    }
  }
}
