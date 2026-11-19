/**
 * Renders schema.org structured data as a JSON-LD script tag. The `<` escape stops a string in the
 * data from closing the script tag early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...(Array.isArray(data) ? { "@graph": data } : data) }).replace(/</g, "\\u003c") }}
    />
  );
}
