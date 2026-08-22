import { client } from "./client";
import { loadQuery, setServerClient } from "./loader";

/**
 * SERVER-SIDE ONLY, for exactly the reason spelled out in `client.ts`:
 * importing this module pulls in the read token. Never import it from a
 * "use client" component — reach for `useQuery` from `loader.ts` there and let
 * a Server Component pass the `initial` down as a prop.
 *
 * The registration runs at module scope so that importing `loadQuery` from
 * here is itself the guarantee that it is initialised. Importing `loadQuery`
 * straight out of `loader.ts` skips this file entirely and yields a store with
 * no client, which throws on the first read.
 */
setServerClient(client);

export { loadQuery };
