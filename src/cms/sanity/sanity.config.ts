import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./env";
import { schema } from "./schema";
import { structure } from "./studio";

/**
 * Studio configuration. Mounted into the Next.js app at /studio — see
 * `src/app/(studio)/studio/[[...tool]]/page.tsx`.
 *
 * Because the Studio is embedded rather than standalone, every version bump of
 * `sanity` / `@sanity/vision` needs an app redeploy, and TypeGen has no watch
 * mode. Run `pnpm typegen` after changing a schema or a query.
 */
export default defineConfig({
  name: "growthops",
  title: "GrowthOps Asia",
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
