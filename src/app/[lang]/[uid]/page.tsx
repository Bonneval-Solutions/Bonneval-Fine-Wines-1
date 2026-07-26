import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asText, filter } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { normalizeLocale } from "@/i18n";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";
import { isLegalUid } from "@/lib/legal-placeholders";
import {
  ABOUT_DEFAULT_SLICES,
  CONTACT_DEFAULT_SLICES,
  CONTACT_HERITAGE_DEFAULT,
  MEMBERS_DEFAULT_SLICES,
  MEMBERS_HERITAGE_DEFAULT,
  WINES_DEFAULT_SLICES,
  ensureHeritageSprinkle,
  slicesOrDefault,
} from "@/lib/default-page-slices";

type Params = { lang: string; uid: string };
const domainesGridFetchLinks = [
  "domaine.name",
  "domaine.appellation",
  "domaine.descriptor",
  "domaine.hero_image",
];

function defaultsForUid(uid: string) {
  if (uid === "wines") return WINES_DEFAULT_SLICES;
  if (uid === "about") return ABOUT_DEFAULT_SLICES;
  if (uid === "members") return MEMBERS_DEFAULT_SLICES;
  if (uid === "contact") return CONTACT_DEFAULT_SLICES;
  return null;
}

function withHeritageSprinkle(
  uid: string,
  slices: ReturnType<typeof slicesOrDefault>,
) {
  if (uid === "members") {
    return ensureHeritageSprinkle(slices, MEMBERS_HERITAGE_DEFAULT);
  }
  if (uid === "contact") {
    return ensureHeritageSprinkle(slices, CONTACT_HERITAGE_DEFAULT);
  }
  return slices;
}

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

  const defaults = defaultsForUid(uid);

  if (!page) {
    if (defaults) {
      return <SliceZone slices={defaults} components={components} />;
    }
    if (isLegalUid(uid)) return <LegalPlaceholder uid={uid} />;
    notFound();
  }

  const slices = withHeritageSprinkle(
    uid,
    slicesOrDefault(page.data.slices, defaults ?? []),
  );

  // About: drop domaines_list (lives on /domaines)
  const filtered =
    uid === "about"
      ? slices.filter((s) => s.slice_type !== "domaines_list")
      : slices;

  const finalSlices =
    uid === "about" && filtered.length === 0
      ? ABOUT_DEFAULT_SLICES
      : filtered.length > 0
        ? filtered
        : defaults ?? page.data.slices;

  return <SliceZone slices={finalSlices} components={components} />;
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
    if (uid === "wines") {
      return {
        title: "The Wines",
        description:
          "A living cellar of Burgundy, Champagne, Rhône, and Bordeaux — request our current tariff.",
      };
    }
    if (uid === "about") {
      return {
        title: "Our History",
        description:
          "The mission and story of Bonneval Fine Wines — formerly Bon Château.",
      };
    }
    if (uid === "members") {
      return {
        title: "Member's Club",
        description:
          "Private allocation membership with Bonneval Fine Wines — WhatsApp offers from ten Burgundy domaines.",
      };
    }
    if (uid === "contact") {
      return {
        title: "Contact",
        description: "Begin the conversation with Bonneval Fine Wines.",
      };
    }
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
    title:
      uid === "about"
        ? page.data.meta_title || "Our History"
        : asText(page.data.title),
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

  const fromPrismic = pages
    .filter((page) => page.uid !== "domaines")
    .map((page) => {
      const lang = normalizeLocale(page.lang);
      return {
        lang: lang ?? page.lang,
        uid: page.uid,
      };
    });

  const extras = ["wines", "about", "members", "contact"].map((uid) => ({
    lang: "en-us",
    uid,
  }));

  const legalParams = ["privacy-policy", "terms", "cookie-policy"].map(
    (uid) => ({ lang: "en-us", uid }),
  );

  const seen = new Set(fromPrismic.map((p) => `${p.lang}:${p.uid}`));
  for (const p of [...extras, ...legalParams]) {
    const key = `${p.lang}:${p.uid}`;
    if (!seen.has(key)) {
      fromPrismic.push(p);
      seen.add(key);
    }
  }

  return fromPrismic;
}
