import * as fixtures from "../fixtures/home";
import type { HomePageData } from "../types";

/**
 * The home page's content.
 *
 * Every field is currently served from `fixtures/home.ts`. When Sanity is
 * wired up, this body becomes `client.fetch(HOME_PAGE_QUERY)` and nothing that
 * calls it has to change — the signature is already async and already returns
 * the CMS-shaped object.
 */
export async function getHomePage(): Promise<HomePageData> {
  return {
    hero: fixtures.heroBanner,
    services: fixtures.services,
    growthSpurts: fixtures.growthCards,
    unrivaledGrowth: fixtures.unrivaledGrowth,
    caseStudies: fixtures.caseStudySlides,
    articles: fixtures.articles,
    team: fixtures.teamSection,
  };
}
