import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./env";

/**
 * CLI configuration. The Sanity CLI resolves this from its working directory,
 * so CLI commands must run from `src/sanity` — the `typegen` script in
 * package.json does that for you.
 *
 * Paths below are relative to this file's folder:
 *   ../          -> src/
 *   ../../       -> repo root
 */
export default defineCliConfig({
  api: { projectId, dataset },
  typegen: {
    enabled: true,
    path: "../**/*.{ts,tsx}",
    schema: "schema.json",
    generates: "../../sanity.types.ts",
    overloadClientMethods: true,
  },
});
