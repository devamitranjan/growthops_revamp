import DOMPurify from "isomorphic-dompurify";
import type { SeoMetadata } from "@/content/models/seo";

interface JsonLdRendererProps {
  schemas?: SeoMetadata["jsonld"];
}

export function JsonLdRenderer({ schemas }: JsonLdRendererProps) {
  if (!schemas || schemas.length === 0) return null;
  return (
    <>
      {schemas.map((item, index) => {
        try {
          const parsed = JSON.parse(item.schema);
          const jsonString = JSON.stringify(parsed);
          const sanitized = DOMPurify.sanitize(jsonString, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: [],
          });
          return (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: sanitized }}
            />
          );
        } catch {
          return null;
        }
      })}
    </>
  );
}
