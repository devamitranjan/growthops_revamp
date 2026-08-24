import Faq from "@/components/sections/faq/faq";
import type { FaqItemData } from "@/sanity/types";

/** Sample copy so the panel can be checked before the CMS carries a section. */
const QUESTIONS: [string, string][] = [
  [
    "What is Generative Engine Optimisation (GEO)?",
    "GEO is the practice of shaping your content so that generative engines — ChatGPT, Gemini, Perplexity, AI Overviews — cite it when they answer a question.",
  ],
  [
    "How is GEO different from traditional SEO?",
    "SEO competes for a position in a list of links. GEO competes to be the source a model quotes, which rewards clear claims, structure and citable evidence over keyword coverage.",
  ],
  [
    "Why should businesses in Asia prioritise GEO now?",
    "Assistant-led search is growing faster than the content supply that feeds it, so the brands publishing answerable content today are the ones being cited tomorrow.",
  ],
  [
    "What types of content work best for GEO?",
    "Direct answers, original data, and structured explainers — anything a model can lift a self-contained, attributable statement from.",
  ],
  [
    "Can GEO and SEO work together?",
    "Yes. The technical foundations are shared; GEO layers answer-shaped structure and evidence on top of the work SEO already does.",
  ],
  [
    "How can GrowthOps Asia help with Generative Engine Optimisation?",
    "We audit how engines currently describe you, rebuild the content they draw on, and track citation share as the outcome.",
  ],
];

const ITEMS: FaqItemData[] = QUESTIONS.map(([question, answer], index) => ({
  id: `q${index}`,
  question,
  answer: [
    {
      _type: "block",
      _key: `b${index}`,
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: `s${index}`, text: answer, marks: [] }],
    },
  ],
}));

export default function Page() {
  return (
    <Faq
      data={{
        title: "Everything Thing You Need to Know About Generative Engine Optimisation",
        items: ITEMS,
        openFirst: true,
      }}
    />
  );
}
