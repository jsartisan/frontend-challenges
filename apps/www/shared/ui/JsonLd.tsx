type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Renders one JSON-LD block. `<` is escaped so page content can never close the script tag.
 */
export function JsonLd(props: JsonLdProps) {
  const { data } = props;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
