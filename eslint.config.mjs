import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import checkFile from "eslint-plugin-check-file";

// kebab-case, 1 to 3 hyphen-separated words (e.g. "hero-banner", not "hero-banner-section-title")
const KEBAB_CASE_MAX_3_WORDS = "+([a-z0-9])?(-+([a-z0-9]))?(-+([a-z0-9]))";

const assetGlobs = [
  "public/**/*.{webp,png,jpg,jpeg,gif,svg,ico}",
  "app/**/*.css",
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
    files: ["app/**/*.{ts,tsx,js,jsx}", "*.{ts,mjs,cjs}", ...assetGlobs],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        { "**/*": KEBAB_CASE_MAX_3_WORDS },
        { ignoreMiddleExtensions: true },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "app/**/": KEBAB_CASE_MAX_3_WORDS,
          "public/**/": KEBAB_CASE_MAX_3_WORDS,
        },
      ],
    },
  },
]);

export default eslintConfig;
