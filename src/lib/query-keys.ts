/**
 * Single source of truth for React Query cache keys.
 *
 * Keys are built as hierarchies so a broad key invalidates everything beneath
 * it: `invalidateQueries({ queryKey: queryKeys.articles.all })` clears every
 * article list and detail at once.
 */
export const queryKeys = {
  home: {
    all: ["home"] as const,
    detail: () => [...queryKeys.home.all, "detail"] as const,
  },

  articles: {
    all: ["articles"] as const,
    lists: () => [...queryKeys.articles.all, "list"] as const,
    list: (page: number) => [...queryKeys.articles.lists(), { page }] as const,
    details: () => [...queryKeys.articles.all, "detail"] as const,
    detail: (slug: string) => [...queryKeys.articles.details(), slug] as const,
  },

  reports: {
    all: ["reports"] as const,
    lists: () => [...queryKeys.reports.all, "list"] as const,
    list: () => [...queryKeys.reports.lists()] as const,
    details: () => [...queryKeys.reports.all, "detail"] as const,
    detail: (slug: string) => [...queryKeys.reports.details(), slug] as const,
  },

  testimonials: {
    all: ["testimonials"] as const,
    detail: () => [...queryKeys.testimonials.all, "detail"] as const,
  },
} as const;
