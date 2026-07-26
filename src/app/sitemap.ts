import type { MetadataRoute } from "next";
import { createClient } from "@/prismicio";
import { defaultLocale, normalizeLocale } from "@/i18n";

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://bonnevalfinewines.com"
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const client = createClient();

  const [pages, domaines] = await Promise.all([
    client.getAllByType("page").catch(() => []),
    client.getAllByType("domaine").catch(() => []),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    const lang = normalizeLocale(page.lang) ?? defaultLocale;
    const path =
      page.uid === "home"
        ? `/${lang}`
        : page.uid === "domaines"
          ? `/${lang}/domaines`
          : `/${lang}/${page.uid}`;
    entries.push({
      url: `${base}${path}`,
      lastModified: page.last_publication_date
        ? new Date(page.last_publication_date)
        : undefined,
    });
  }

  for (const domaine of domaines) {
    const lang = normalizeLocale(domaine.lang) ?? defaultLocale;
    entries.push({
      url: `${base}/${lang}/domaines/${domaine.uid}`,
      lastModified: domaine.last_publication_date
        ? new Date(domaine.last_publication_date)
        : undefined,
    });
  }

  for (const uid of ["privacy-policy", "terms", "cookie-policy"]) {
    const url = `${base}/${defaultLocale}/${uid}`;
    if (!entries.some((e) => e.url === url)) {
      entries.push({ url });
    }
  }

  return entries;
}
