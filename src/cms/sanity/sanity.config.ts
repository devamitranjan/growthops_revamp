import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./env";
import { locations } from "./presentation/locations";
import { schema } from "./schema";
import { structure } from "./studio";

/**
 * Studio configuration. Mounted into the Next.js app at /studio — see
 * `src/app/(studio)/studio/[[...tool]]/page.tsx`.
 *
 * Because the Studio is embedded rather than standalone, every version bump of
 * `sanity` / `@sanity/vision` needs an app redeploy, and TypeGen has no watch
 * mode. Run `pnpm typegen` after changing a schema or a query.
 *
 * Being embedded is also why Presentation needs no `previewUrl.initial`: the
 * site and the Studio are the same deployment, so the default —
 * `location.origin` — is already the right one in local dev, on a preview
 * deployment and in production, with nothing to configure per environment.
 * What it does need is the route that turns draft mode on, so the preview
 * iframe renders unpublished content; that lives at
 * `src/app/api/draft-mode/enable/route.ts`.
 */
export default defineConfig({
  name: "growthops",
  title: "GrowthOps Asia",
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve: locations,
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
