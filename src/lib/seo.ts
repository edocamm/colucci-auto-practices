import { site } from "@/config/site";

type HeadOptions = {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  jsonLd?: Record<string, unknown>;
};

/**
 * Costruisce i meta tag di una pagina in modo coerente.
 * Con `site.seo.siteUrl` non configurato, canonical e og:url restano relativi
 * e non viene dichiarata alcuna og:image assoluta.
 */
export function buildHead({ title, description, path, ogType = "website", jsonLd }: HeadOptions) {
  const base = site.seo.siteUrl ? site.seo.siteUrl.replace(/\/$/, "") : "";
  const url = `${base}${path}`;

  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: ogType },
    { property: "og:url", content: url },
    { property: "og:locale", content: site.seo.locale },
    { property: "og:site_name", content: site.name },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  if (site.seo.demoNoIndex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd
      ? [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }]
      : [],
  };
}

/** Dati strutturati prudenti: solo informazioni verificate. */
export function localBusinessJsonLd() {
  const sameAs = [site.social.facebook.url, site.social.tiktok.url].filter(Boolean);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.shortDescription,
    telephone: site.phone.e164,
    email: site.email.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: site.address.countryCode,
    },
  };
  if (site.seo.siteUrl) data.url = site.seo.siteUrl;
  if (sameAs.length) data.sameAs = sameAs;
  return data;
}
