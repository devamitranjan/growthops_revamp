import { PostDetailData } from "../types";

/**
 * Full article bodies, keyed by the same slug the listing card uses. Only the
 * posts present here render in-site; every other card still links out to
 * growthops.asia while its copy is migrated.
 */
export const postDetails: Record<string, PostDetailData> = {
  "why-your-creative-is-the-new-targeting-strategy": {
    slug: "why-your-creative-is-the-new-targeting-strategy",
    category: "Featured",
    title: "Why Your Creative is the New Targeting Strategy",
    authorName: "CHRISTOPHER GREENOUGH",
    publishDate: "04 FEB 2026",
    featuredImage: "/post/why-your-creative-is-the-new-targeting-strategy.webp",
    content: [
      {
        type: "paragraph",
        content: [
          {
            text: "For years, the marketing process followed a set path: you set the strategy, you bought the media, and finally, you made the ads to fill the space. In 2026, that old order is officially broken.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "The reason is simple: Platforms like Meta, Google and TikTok no longer just optimise against audiences. Their systems now analyse the creative itself, the images, the language, the emotional signals, to decide who sees your ad and how hard it’s pushed. In other words, your Creative has become a targeting signal.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        text: 'The "Sameness" Trap',
      },
      {
        type: "paragraph",
        content: [
          {
            text: "This matters, because brands are leaning into a sea of sameness. As generative tools make it easier to produce more content, faster, a lot of work starts to look and feel identical. When that happens, platforms treat it as “mass” content with weak signals. Costs rise, efficiency drops, and brands wonder why performance plateaus.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "There’s strong evidence this isn’t just a creative preference, it’s a commercial one. Effie and System1’s ",
          },
          {
            text: "The Creative Dividend",
            italic: true,
          },
          {
            text: " analysed over 1,200 campaigns and found that creative quality and media support together explain around 60% of business results. At higher levels, the relationship becomes exponential. Campaigns with a strong “Excess Share of Creativity” were up to seven times more likely to deliver profit growth than average work .",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: 'As more brands use basic AI tools to churn out content, we’re seeing a "sea of sameness." When everything looks and sounds identical, the algorithm treats it as "mass" content with no clear meaning. This makes your ads more expensive and less effective because the machine doesn\'t know where to "point" the content.',
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Human Effort as a Competitive Advantage",
      },
      {
        type: "paragraph",
        content: [
          {
            text: "Human work, work with emotion, distinctiveness and a clear point of view, doesn’t just perform better with people. It performs better with machines. Strong Creative gives algorithms clearer signals about who the message is for, often more effectively than manual targeting ever could.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "The Big Shift for Marketing Teams",
      },
      {
        type: "paragraph",
        content: [
          {
            text: "In 2026, Creative isn’t just the output of a campaign. It’s the input. This is the real shift marketing teams need to internalise. Creative choices now shape distribution, cost efficiency and learning loops before a single result comes in. This changes three specific things for marketing leaders:",
          },
        ],
      },
      {
        type: "list",
        style: "bullet",
        variant: "statements",
        items: [
          [
            {
              text: "Briefing:",
              bold: true,
            },
            {
              text: ' You aren\'t just briefing for an audience; you’re briefing for a "signal" that the AI can recognize.',
            },
          ],
          [
            {
              text: "Testing:",
              bold: true,
            },
            {
              text: " You need to test which creative choices help the algorithm find your best customers, not just which one gets the most clicks.",
            },
          ],
          [
            {
              text: "Priority:",
              bold: true,
            },
            {
              text: " You must prioritize distinctiveness over volume. Five high-signal ads are worth more than 500 generic ones.",
            },
          ],
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: 'In 2026, your creative choices will determine your campaign\'s success long before the first result comes in. If you want to drive distribution and sales, you have to stop making "content" and start sending better signals. Or, as I (and most other Millennials) like to call them - vibes.',
          },
        ],
      },
    ],
  },
  "from-search-everywhere-to-ai-everywhere": {
    slug: "from-search-everywhere-to-ai-everywhere",
    category: "Featured",
    title:
      "From Search Everywhere to AI Everywhere: The Evolution of Brand Visibility",
    authorName: "NITESH SHRIVASTAVA",
    publishDate: "03 OCT 2025",
    featuredImage: "/post/from-search-everywhere-to-ai-everywhere.webp",
    content: [
      {
        type: "paragraph",
        content: [
          {
            text: 'Last year, I wrote about a concept I called "Search Everywhere Optimisation" - the idea that as search engines began crawling and incorporating more diverse sources into their search engine results pages (SERPs), brands needed to ensure their presence across every possible touchpoint.',
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "The premise was simple: Google wasn't just showing ten blue links anymore. Search results were becoming rich ecosystems featuring social media posts, Reddit discussions, Wikipedia entries, YouTube videos, images, infographics, and countless other content formats. To maintain visibility, brands had to optimise their presence across all these platforms - not just their own websites.",
          },
        ],
      },
      { type: "heading", level: 2, text: "Search Everywhere Framework" },
      {
        type: "image",
        src: "/post/search-everywhere-framework-diagram.webp",
        alt: "Search Everywhere Framework Diagram",
        width: 441,
        height: 440,
      },
      {
        type: "paragraph",
        content: [
          { text: "In my " },
          {
            text: "Campaign Asia article",
            href: "https://www.campaignasia.com/article/search-everywhere-optimisation-why-brands-need-to-think-beyond-google/495208",
          },
          {
            text: ", I outlined six critical channels where this optimisation needed to happen:",
          },
        ],
      },
      // The channels read as a run of paragraphs led by the channel name, not
      // as a bulleted list — each one carries a full argument.
      {
        type: "paragraph",
        content: [
          { text: "Search Engines", bold: true },
          {
            text: " remained the foundation, but with evolving algorithms prioritising E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) and comprehensive content that addresses user intent.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Social Media", bold: true },
          {
            text: " has transformed into powerful search tools, with 24% of users turning to platforms like TikTok and Instagram for answers, and 46% of Gen Z using them as primary search engines.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Podcasts", bold: true },
          {
            text: " were driving brand discovery, with 46% of listeners learning about new brands through audio content and 23% making purchases based on recommendations from podcasts.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Marketplaces", bold: true },
          {
            text: " like Amazon and Shopee have become search-first destinations, with 63% of online shoppers starting their product searches on Amazon rather than Google.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Forums and Communities", bold: true },
          {
            text: " like Reddit and Quora were building trust through authentic conversations, with 90% of Reddit users trusting the platform to learn about products - often more than Google itself.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "The strategy was clear: be everywhere your audience might search, in every format they might consume.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "The Generative AI Parallel: Same Behaviour, New Stakes",
      },
      {
        type: "paragraph",
        content: [
          {
            text: "Fast forward to today, and I'm observing something fascinating: ",
          },
          {
            text: "generative AI engines behave remarkably similarly to traditional search engines in how they source and synthesise information.",
            bold: true,
          },
          {
            text: " They crawl the same diverse content sources - websites, social media, forums, marketplaces, and multimedia content - to build their understanding of brands and topics.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "But here's the critical question that's been driving my recent research: ",
          },
          {
            text: "Can optimising all these traditional platforms actually impact how generative AI engines understand and represent your brand?",
            bold: true,
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "The answer, based on my ongoing experiments, appears to be a resounding yes - but with important nuances.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Testing the AI Visibility Hypothesis",
      },
      {
        type: "paragraph",
        content: [
          {
            text: "I've been running controlled experiments to understand exactly how content optimisation across different platforms influences AI-generated responses. The testing framework involves three strategic tracks:",
          },
        ],
      },
      {
        type: "paragraph",
        content: [{ text: "Track 1: Technical Foundation", bold: true }],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "Ensuring AI bots (GPTBot, PerplexityBot, ClaudeBot) can properly access, crawl, and interpret content through improved technical infrastructure. This includes clean canonical hierarchies, proper schema markup, and structured data that AI systems can easily parse.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "One critical discovery: unstructured data leads to AI confusion. When contact information, product details, or service descriptions aren't properly structured, AI platforms often surface incorrect information - like showing business banking numbers for personal banking queries.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Track 2: First-Party Content Optimisation", bold: true },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: 'Restructuring content into formats that AI systems prefer: H2-anchored Q&A blocks, conversational formats, and "direct-answer" structures. Instead of traditional marketing copy, we\'re creating content that answers specific questions in the exact format AI systems use to generate responses.',
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: 'The key insight: AI systems don\'t just extract information - they synthesise it. Content structured as clear questions and answers, comparison templates ("Brand X vs Y"), and authority-backed references significantly increases citation likelihood in AI-generated responses.',
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          { text: "Track 3: Third-Party Authority Building", bold: true },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "Establishing external credibility through high-quality third-party mentions and backlinks that AI systems rely on to validate information. This involves strategic content placement across trusted platforms that AI systems reference when building their knowledge graphs.",
          },
        ],
      },
      { type: "heading", level: 2, text: "The Multimodal Advantage" },
      {
        type: "paragraph",
        content: [
          {
            text: "One of the most interesting discoveries is how AI systems respond to multimodal content. Pages that combine structured text with infographics, explainer videos, and rich media consistently perform better in AI citations. The key is providing proper schema markup (VideoObject, ImageObject) and transcripts that AI systems can process. This aligns perfectly with the original Search Everywhere concept - but now we're optimising for AI comprehension rather than just human discovery.",
          },
        ],
      },
      { type: "heading", level: 2, text: "Early Results and Implications" },
      {
        type: "paragraph",
        content: [
          {
            text: 'The preliminary data suggests that brands optimising across traditional "search everywhere" channels do indeed see improved representation in AI-generated responses. However, the optimisation approach needs to be AI-first:',
          },
        ],
      },
      {
        type: "list",
        style: "bullet",
        variant: "statements",
        items: [
          [
            { text: "Structured over stylised:", bold: true },
            {
              text: " AI systems prefer clear, structured information over creative marketing copy",
            },
          ],
          [
            { text: "Conversational over corporate:", bold: true },
            {
              text: " Content that matches natural language patterns performs better",
            },
          ],
          [
            { text: "Comprehensive over concise:", bold: true },
            {
              text: " AI systems favour detailed, authoritative content that provides complete context",
            },
          ],
          [
            { text: "Consistent over creative:", bold: true },
            {
              text: " Brand information must be consistent across all sources to avoid AI confusion",
            },
          ],
        ],
      },
      { type: "heading", level: 2, text: "The Measurement Challenge" },
      {
        type: "paragraph",
        content: [
          {
            text: "Traditional SEO metrics don't capture AI visibility. We're developing new measurement frameworks that track:",
          },
        ],
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Citation frequency across different AI platforms",
          "Quality and accuracy of AI-generated brand descriptions",
          "Traffic and conversion from AI referrals",
          "Brand sentiment in AI-generated responses",
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "The goal isn't just visibility - it's ensuring AI systems represent your brand accurately and favourably.",
          },
        ],
      },
      { type: "heading", level: 2, text: "The Automation Opportunity" },
      {
        type: "paragraph",
        content: [
          {
            text: "Here's where the story gets really interesting: if optimising for AI visibility requires consistent, structured content across dozens of platforms and formats, how can brands possibly scale this manually?",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "The answer lies in the same technology that's creating the challenge: ",
          },
          {
            text: "Agentic AI systems that can automate the optimisation process itself.",
            href: "https://www.growthops.asia/post/agentic-ai-the-next-frontier",
            bold: true,
          },
        ],
      },
      {
        type: "paragraph",
        content: [{ text: "Imagine AI agents that can:" }],
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Automatically structure your content for optimal AI comprehension",
          "Monitor how different AI systems represent your brand",
          "Generate platform-specific optimised content at scale",
          "Continuously test and refine your AI visibility strategy",
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "This isn't science fiction - it's the logical next step in the Search Everywhere evolution.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Looking Ahead: The AI-Everywhere Era",
      },
      {
        type: "paragraph",
        content: [
          {
            text: "We're transitioning from Search Everywhere Optimisation to AI Everywhere Optimisation. The platforms remain largely the same, but the optimisation strategies must evolve for both AI consumption and human discovery.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "The brands that succeed will be those that understand AI systems aren't just new search engines - they're new media channels that require their own optimisation strategies, measurement frameworks, and content approaches.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "The question isn't whether your brand will be represented in AI-generated responses - it's whether you'll control how that representation happens.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "Learn how GrowthOps helps businesses navigate the Search Everywhere Era with impact.",
            href: "https://www.growthops.asia/generative-engine-optimisation",
          },
        ],
      },
    ],
  },
  "signals-in-the-noise-winning-in-malaysias-mature-telco-market": {
    slug: "signals-in-the-noise-winning-in-malaysias-mature-telco-market",
    category: "Featured",
    title: "Signals in the Noise: Winning in Malaysia’s Mature Telco Market",
    authorName: "GROWTHOPS",
    publishDate: "11 SEP 2025",
    featuredImage:
      "/post/signals-in-the-noise-winning-in-malaysias-mature-telco-market.webp",
    content: [
      {
        type: "paragraph",
        content: [
          {
            text: "In this new paper, we delve into fresh data-driven insights that show driving Malaysians to switch or stay with a mobile provider goes beyond surface-level digital changes. Instead, it requires a deeper understanding of customer behavior. We explore the key forces shaping the Malaysian telecom market.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "Here are some highlights from our findings:",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Shrinking Demand in an Oversaturated Telco Market",
      },
      {
        type: "paragraph",
        content: [
          {
            text: "Following a surge in digital needs during and after the pandemic, search demand for telco products peaked in early 2022. Since then, it has steadily declined amid market saturation. Despite this drop in interest, competition has intensified, with providers expanding their offerings to stay relevant. As of January 2024, mobile connections in Malaysia stood at 129% of the population—a clear sign of a mature, oversaturated market where multiple SIM ownership is common.",
          },
        ],
      },
      {
        type: "image",
        src: "/post/search-demand-prepaid-postpaid.webp",
        alt: "Search Demand for Prepaid and Postpaid from 2022-2025",
        width: 1200,
        height: 675,
      },
      {
        type: "heading",
        level: 2,
        text: "Malaysians are More Loyal and Locked-In with Their Current Providers",
      },
      {
        type: "paragraph",
        content: [
          {
            text: "Searches about switching or terminating telco providers have steadily declined from early 2022 to early 2025. Switching intent, historically higher than termination, is also trending downward, indicating fewer consumers are exploring alternatives. Termination-related searches have stayed mostly flat with a slight decline. This trend suggests easing churn pressure, with consumers appearing more loyal, locked-in, or less driven to switch due to similar service offerings and bundled packages. The prepaid-to-postpaid shift may have stabilized, leaving telcos in a saturated market where boosting loyalty and user value matters more than aggressive acquisition.",
          },
        ],
      },
      {
        type: "image",
        src: "/post/search-demand-mobile-subscription-termination-vs-switching.webp",
        alt: "Search Demand for Mobile Subscription 'Termination' vs. 'Changing' and 'Switching'",
        width: 1200,
        height: 675,
      },
      {
        type: "heading",
        level: 2,
        text: "A Polarised Market: Telco Brands Diverge on Price Perception, Converge on Network Quality",
      },
      {
        type: "paragraph",
        content: [
          {
            text: "In a market where nearly every provider offers similar bundles and price points, what sets brands apart is no longer just what they offer — but how clearly and consistently they deliver value across multiple dimensions.",
          },
        ],
      },
      {
        type: "image",
        src: "/post/consumer-perception-maps-price-value-vs-network-quality.webp",
        alt: "Consumer Perception Maps on Price & Value vs Network Quality",
        width: 1200,
        height: 675,
      },
      {
        type: "heading",
        level: 2,
        text: "The Hidden Opportunity",
      },
      {
        type: "paragraph",
        content: [
          {
            text: "The overall market is polarized: one all-round leader (CelcomDigi), one premium provider (Maxis), and a cluster of challengers. This leaves a notable gap, where high-quality service is paired with innovative value. We also see widening gaps in preference by region, indicating opportunities for brands to move into more region-based strategies.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "Any brand capable of moving into the top-right quadrant of the Price–Network map stands to gain substantial market share. Remaining in the low-value, low-quality quadrant, on the other hand, is a strategy that leads to irrelevance over time, unless supported by a focused niche, regional or significant service innovation.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "Discover how Malaysian Telco Players can move beyond their current positioning and tap into deeper growth drivers.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            text: "Head to ",
          },
          {
            text: "https://www.growthops.asia/signals-in-the-noise-winning-in-malaysia-mature-telco-market",
            href: "https://www.growthops.asia/signals-in-the-noise-winning-in-malaysia-mature-telco-market",
          },
          {
            text: " for in-depth insights and access to the full report.",
          },
        ],
      },
    ],
  },
};

export function getPostDetail(slug: string): PostDetailData | undefined {
  return postDetails[slug];
}

/** Cards for these slugs route in-site instead of out to growthops.asia. */
export function hasPostDetail(slug: string) {
  return slug in postDetails;
}
