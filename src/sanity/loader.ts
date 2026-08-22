import { createQueryStore } from "@sanity/react-loader";

/**
 * The loader store, shared by the server and the browser.
 *
 * `client: false` + `ssr: true` is the load-bearing part of this file, and it
 * is what makes the loader safe to use against this project's private dataset.
 * With no client configured on the browser side, `useQuery` has no fetcher, so
 * it never queries Sanity: it replays whatever `initial` the server handed it
 * and nothing else. The read token therefore has no reason to exist in the
 * bundle — see the warning in `client.ts`.
 *
 * The one thing that ever installs a browser fetcher is `useLiveMode`, and it
 * does not query Sanity either. Inside the Presentation tool the Studio pushes
 * query results to the page over postMessage; outside it the connection never
 * opens and live mode stays inert.
 *
 * The server half is registered separately, in `loader.server.ts`.
 */
const store = createQueryStore({ client: false, ssr: true });

export const { useQuery, useLiveMode } = store;

/**
 * Server-side only. Import these from `loader.server.ts` instead — it is the
 * module that installs the authenticated client, and `loadQuery` throws until
 * that has happened.
 */
export const { loadQuery, setServerClient } = store;
