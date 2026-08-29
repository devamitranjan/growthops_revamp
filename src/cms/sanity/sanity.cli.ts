import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./env";

/**
 * CLI configuration. The Sanity CLI resolves this from its working directory,
 * so CLI commands must run from `src/cms/sanity` — the `typegen` script in
 * package.json does that for you, which is also why this file and
 * `sanity.config.ts` stay at the root of the adapter rather than moving into
 * `studio/`.
 *
 * Paths below are relative to this file's folder:
 *   ../../       -> src/
 *   generated/   -> the TypeGen output, an implementation detail of the
 *                   adapter rather than the application's content model
 */
export default defineCliConfig({
  api: { projectId, dataset },
  typegen: {
    enabled: true,
    path: "../../**/*.{ts,tsx}",
    schema: "schema.json",
    generates: "generated/sanity.types.ts",
    overloadClientMethods: true,
  },
});
