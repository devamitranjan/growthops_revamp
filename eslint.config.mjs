import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import checkFile from "eslint-plugin-check-file";

const assetGlobs = [
  "public/**/*.{webp,png,jpg,jpeg,gif,svg,ico,mp3}",
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
    rules: {},
  },
]);

export default eslintConfig;
