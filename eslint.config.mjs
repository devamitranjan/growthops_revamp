import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import checkFile from "eslint-plugin-check-file";

const assetGlobs = [
  "public/**/*.{webp,png,jpg,jpeg,gif,svg,ico,mp3}",
  "src/**/*.css",
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Static assets aren't parsed as JS by default; attach the no-op
    // processor so their filenames still get checked below.
    files: assetGlobs,
    processor: "check-file/eslint-processor-check-file",
  },
  {
    files: ["src/**/*.{ts,tsx,js,jsx}", "*.{ts,mjs,cjs}", ...assetGlobs],
    plugins: { "check-file": checkFile },
    rules: {},
  },

  // ── The CMS boundary ────────────────────────────────────────────────
  //
  // `src/cms/sanity` is meant to be replaceable: swap the adapter, keep the
  // application. That only stays true if the dependency arrows keep pointing
  // one way, and an arrow is one careless auto-import away from turning round.
  // The two rules below are what make the architecture fail the build rather
  // than fail review.
  //
  // See `src/content/repositories.ts` for the one place the arrow reverses on
  // purpose, and `src/cms/sanity/README.md` for the whole picture.
  {
    // The domain's interface and type layer states *what* the application
    // needs. It cannot name a CMS — not even in a `import type`, which would
    // put a Sanity type in the application's public content model.
    files: [
      "src/content/domain/**/*.{ts,tsx}",
      "src/content/models/**/*.{ts,tsx}",
      "src/content/sections/**/*.{ts,tsx}",
      "src/content/types.ts",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/cms", "@/cms/*", "@/cms/**", "next-sanity", "next-sanity/*", "next-sanity/**", "sanity", "sanity/*", "sanity/**", "@sanity/*", "@sanity/**"],
              message:
                "The domain layer defines contracts; it must not depend on a CMS. Bind an implementation in src/content/repositories.ts instead.",
            },
          ],
        },
      ],
    },
  },
  {
    // Routes and components read content through `@/content`. Reaching into
    // the adapter skips the mapper, and — worse — the Sanity client carries
    // SANITY_API_READ_TOKEN.
    files: ["src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}", "src/hooks/**/*.{ts,tsx}", "src/lib/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/cms", "@/cms/*", "@/cms/**", "next-sanity", "next-sanity/*", "next-sanity/**", "sanity", "sanity/*", "sanity/**", "@sanity/*", "@sanity/**"],
              message:
                "Application code reads content through @/content (types, repositories, live). The only exception is the Studio mount under src/app/(studio).",
            },
          ],
        },
      ],
    },
  },
  {
    // The Studio is the exception the rule above names: it *is* Sanity, and it
    // is mounted at /studio by these three files and nothing else.
    files: ["src/app/(studio)/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": "off" },
  },
]);

export default eslintConfig;
