"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ApiError } from "@/lib/api";

const MAX_RETRIES = 3;

/** A rate limiter is telling us to slow down; hammering it is the one thing
 *  guaranteed to keep us limited. One polite retry, then surface the error. */
const MAX_RATE_LIMIT_RETRIES = 1;

/** Never hold the UI on a pending retry longer than this. */
const MAX_RETRY_DELAY_MS = 30_000;

/** `Retry-After` is either a delay in seconds or an HTTP date. Returns
 *  milliseconds, or null when the header is absent or unparseable. */
function retryAfterMs(error: ApiError): number | null {
  const raw = error.retryAfter;
  if (raw === null) return null;

  const seconds = Number(raw);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);

  const date = Date.parse(raw);
  return Number.isNaN(date) ? null : Math.max(0, date - Date.now());
}

/**
 * Retry lives here and *only* here.
 *
 * `apiGet` deliberately does not retry: if both layers did, the attempts would
 * multiply. React Query owns it because it already tracks `failureCount`,
 * backoff, and the `isFetching` / `error` states the UI reads.
 */
function shouldRetry(failureCount: number, error: Error) {
  // Anything that is not an ApiError escaped our own queryFn — that is a bug,
  // not a flaky network, and retrying just hides it.
  if (!(error instanceof ApiError)) return false;

  // The server named its own backoff. If it wants longer than we are willing
  // to wait, stop now rather than retry early and get limited all over again.
  const wait = retryAfterMs(error);
  if (wait !== null && wait > MAX_RETRY_DELAY_MS) return false;

  // status 0 means no response at all: offline, DNS, reset, or our timeout.
  if (error.status === 0) return failureCount < MAX_RETRIES;

  if (error.status === 429) return failureCount < MAX_RATE_LIMIT_RETRIES;

  // 4xx is otherwise a deterministic answer: a 404 stays a 404. Retrying
  // wastes a round trip and delays the error state. 408 is the exception.
  if (error.status >= 400 && error.status < 500) {
    return error.status === 408 && failureCount < MAX_RETRIES;
  }

  return error.status >= 500 && failureCount < MAX_RETRIES;
}

/** Honours `Retry-After` when the server sent one, otherwise exponential
 *  backoff with jitter so a recovering server does not get every client's
 *  retry in the same instant. */
function retryDelay(attemptIndex: number, error: Error) {
  const wait = error instanceof ApiError ? retryAfterMs(error) : null;
  if (wait !== null) return Math.min(wait, MAX_RETRY_DELAY_MS);

  const backoff = Math.min(1000 * 2 ** attemptIndex, 10_000);
  return backoff + Math.random() * 250;
}

/** One QueryClient per browser session, created lazily so it is never shared
 *  between requests on the server. */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Content is CMS-backed and changes rarely; don't refetch on every
            // focus.
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: shouldRetry,
            retryDelay,
          },
          mutations: {
            // A mutation is not safe to replay blindly; only retry when the
            // request demonstrably never landed.
            retry: (failureCount, error) =>
              failureCount < 1 &&
              error instanceof ApiError &&
              error.status === 0,
            retryDelay,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
