import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { parseContentWebhook } from "@/content/revalidation";

/**
 * The CMS publish webhook.
 *
 * Everything CMS-shaped about the request — the signature scheme, the payload,
 * and which cache tag a published document touches — is behind
 * `parseContentWebhook`; see `src/cms/sanity/revalidate.ts` for the Sanity
 * implementation and the Studio-side setup it expects. What is left here is
 * the Next.js half: one `revalidateTag` call and a status code per outcome.
 */
export async function POST(req: NextRequest) {
  const result = await parseContentWebhook(req);

  switch (result.status) {
    case "unconfigured":
      // Loud rather than silent: a missing secret means the site has quietly
      // stopped updating, which is exactly the failure this route exists to
      // fix.
      console.error("The CMS revalidation secret is not set");
      return new NextResponse("Revalidation is not configured", { status: 500 });

    case "invalid-signature":
      return new NextResponse("Invalid signature", { status: 401 });

    case "bad-request":
      return new NextResponse(`Bad request: ${result.message}`, { status: 400 });

    case "ignored":
      // A content type the site does not read yet — acknowledge it so the CMS
      // does not retry, but say plainly that nothing was invalidated.
      return NextResponse.json({ revalidated: false, type: result.contentType });

    case "ok":
      // `{ expire: 0 }` rather than "max". "max" is stale-while-revalidate: the
      // first visitor after a publish still gets the *old* page and only
      // triggers the rebuild behind them. For an editor that is
      // indistinguishable from the site being broken — they publish, reload,
      // and see the previous copy. Next documents `{ expire: 0 }` as the form
      // for webhooks that need the data gone now; the cost is that one request
      // blocks on a refetch.
      revalidateTag(result.tag, { expire: 0 });

      return NextResponse.json({
        revalidated: true,
        tag: result.tag,
        now: Date.now(),
      });
  }
}
