import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asText, filter } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { normalizeLocale } from "@/i18n";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";
import { isLegalUid } from "@/lib/legal-placeholders";

type Params = { lang: string; uid: string };
const domainesGridFetchLinks = [
  "domaine.name",
  "domaine.appellation",
  "domaine.descriptor",
  "domaine.hero_image",
];

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, uid } = await params;
  const locale = normalizeLocale(lang);
  if (!locale) notFound();
  const client = createClient();
  const page = await client
    .getByUID("page", uid, { lang: locale, fetchLinks: domainesGridFetchLinks })
    .catch(() => null);

  if (!page) {
    if (isLegalUid(uid)) return <LegalPlaceholder uid={uid} />;
    notFound();
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, uid } = await params;
  const locale = normalizeLocale(lang);
  if (!locale) notFound();
  const client = createClient();
  const page = await client
    .getByUID("page", uid, { lang: locale, fetchLinks: domainesGridFetchLinks })
    .catch(() => null);

  if (!page) {
    if (isLegalUid(uid)) {
      const { LEGAL_PLACEHOLDERS } = await import("@/lib/legal-placeholders");
      const legal = LEGAL_PLACEHOLDERS[uid];
      return {
        title: legal.title,
        description: legal.description,
      };
    }
    notFound();
  }

  return {
    title: asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      images: page.data.meta_image.url
        ? [{ url: page.data.meta_image.url }]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client
    .getAllByType("page", {
      filters: [filter.not("my.page.uid", "home")],
    })
    .catch(() => []);

  const fromPrismic = pages.map((page) => {
    const lang = normalizeLocale(page.lang);
    return {
      lang: lang ?? page.lang,
      uid: page.uid,
    };
  });

  const legalParams = ["privacy-policy", "terms", "cookie-policy"].map(
    (uid) => ({ lang: "en-us", uid }),
  );

  const seen = new Set(fromPrismic.map((p) => `${p.lang}:${p.uid}`));
  for (const p of legalParams) {
    const key = `${p.lang}:${p.uid}`;
    if (!seen.has(key)) fromPrismic.push(p);
  }

  return fromPrismic;
}
