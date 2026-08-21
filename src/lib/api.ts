const BASE_URL = "/api";

/** Axios had no default timeout and neither does fetch. This is load-bearing:
 *  without it a hung request never settles, so React Query's retry never fires
 *  and the spinner stays up forever. */
const TIMEOUT_MS = 10_000;

/** Thrown for every non-2xx response and every transport failure.
 *
 *  `status` is what the retry policy in `query-provider` branches on; 0 means
 *  the request never got a response at all (offline, DNS, reset, timeout). */
export class ApiError extends Error {
  readonly status: number;
  /** Raw `Retry-After` header, when the server sent one. */
  readonly retryAfter: string | null;

  constructor(message: string, status: number, retryAfter: string | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

/** Shape the route handlers use for failures: `{ error: "Not found" }`. */
interface ApiErrorBody {
  error?: string;
}

export async function apiGet<T>(
  path: string,
  params?: Record<string, string | number>,
): Promise<T> {
  const query = params
    ? `?${new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)]),
      )}`
    : "";

  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}${query}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (cause) {
    // fetch only rejects on transport failure — never on an HTTP error status.
    const timedOut = cause instanceof DOMException && cause.name === "TimeoutError";
    throw new ApiError(
      timedOut ? `Request to ${path} timed out` : `Request to ${path} failed`,
      0,
    );
  }

  if (!response.ok) {
    // Prefer the route handler's own message over a generic status string.
    const body: ApiErrorBody | null = await response.json().catch(() => null);
    throw new ApiError(
      body?.error ?? `Request to ${path} failed (${response.status})`,
      response.status,
      response.headers.get("retry-after"),
    );
  }

  return response.json() as Promise<T>;
}
