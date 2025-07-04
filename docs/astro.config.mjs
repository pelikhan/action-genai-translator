// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://microsoft.github.io",
  base: "/action-continous-translation",
  integrations: [
    starlight({
      title: "Continous Translation",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/pelikhan/action-continous-translation",
        },
      ],
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        fr: {
          label: "French",
          lang: "fr",
        },
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", slug: "guides/example" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
