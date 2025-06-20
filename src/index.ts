import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

interface MetaConfig {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogImage?: string;
}

const generateMetaTags = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = "https://example.com/og-image.jpg",
}: MetaConfig) => {
  return [
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
  ];
};

const useDocumentMeta = (metaConfig: MetaConfig) => {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    document.title = metaConfig.title || "Default Title";

    const metaTags = generateMetaTags(metaConfig);
    const existingMetaTags: { selector: string; content: string }[] = [];
    let existingCanonical: { href: string } | null = null;

    if (metaConfig.canonicalUrl) {
      const existingCanonicalTag = document.querySelector(
        'link[rel="canonical"]'
      );
      if (existingCanonicalTag) {
        existingCanonical = {
          href: existingCanonicalTag.getAttribute("href")!,
        };
        existingCanonicalTag.remove();
      }
      const canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      canonical.setAttribute("href", metaConfig.canonicalUrl);
      document.head.appendChild(canonical);
    }

    metaTags.forEach(({ name, property, content }) => {
      const selector = name
        ? `meta[name="${name}"]`
        : property
        ? `meta[property="${property}"]`
        : null;
      if (selector) {
        const existingTag = document.querySelector(selector);
        if (existingTag) {
          existingMetaTags.push({
            selector,
            content: existingTag.getAttribute("content")!,
          });
          existingTag.remove();
        }
      }
    });

    metaTags.forEach(({ name, property, content }) => {
      if ((name || property) && content) {
        const meta = document.createElement("meta");
        if (name) meta.setAttribute("name", name);
        if (property) meta.setAttribute("property", property);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    });

    return () => {
      metaTags.forEach(({ name, property }) => {
        const selector = name
          ? `meta[name="${name}"]`
          : property
          ? `meta[property="${property}"]`
          : null;
        if (selector) {
          const meta = document.querySelector(selector);
          if (meta) meta.remove();
        }
      });

      if (metaConfig.canonicalUrl) {
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.remove();
      }

      existingMetaTags.forEach(({ selector, content }) => {
        const meta = document.createElement("meta");
        const attribute = selector.includes("name") ? "name" : "property";
        const attributeValue =
          selector.match(/name="([^"]+)"|property="([^"]+)"/)![1] ||
          selector.match(/name="([^"]+)"|property="([^"]+)"/)![2];
        meta.setAttribute(attribute, attributeValue);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      });

      if (existingCanonical) {
        const canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        canonical.setAttribute("href", existingCanonical.href);
        document.head.appendChild(canonical);
      }
    };
  }, [location.pathname, metaConfig]);
};

export { useDocumentMeta, type MetaConfig };
