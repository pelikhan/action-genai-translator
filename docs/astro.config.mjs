// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";

// https://astro.build/config
export default defineConfig({
  site: "https://microsoft.github.io",
  base: "/action-continuous-translation",
  integrations: [
    starlight({
      plugins: [
        starlightLinksValidator({
          errorOnRelativeLinks: false,
          errorOnInconsistentLocale: true,
        }),
      ],
      title: "Continuous Translation",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/pelikhan/action-continuous-translation",
        },
      ],
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        ar: {
          label: "Arabic",
          lang: "ar",
        },
        fr: {
          label: "French",
          lang: "fr",
        },
        es: {
          label: "Spanish",
          lang: "es",
        },
        "pt-br": {
          label: "Portuguese (Brazil)",
          lang: "pt-BR",
        },
      },
      sidebar: [
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      components: {
        PageTitle: "./src/components/PageTitle.astro",
        Hero: "./src/components/Hero.astro",
      },
    }),
  ],
});
