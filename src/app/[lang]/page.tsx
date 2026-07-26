import { type Metadata } from "next";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { locales, normalizeLocale } from "@/i18n";
import { notFound } from "next/navigation";
import {
  HOME_HERITAGE_DEFAULT,
  ensureHeritageSprinkle,
} from "@/lib/default-page-slices";

type Params = { lang: string };
const domainesGridFetchLinks = [
  "domaine.name",
  "domaine.appellation",
  "domaine.descriptor",
  "domaine.hero_image",
];

export default async function Home({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  if (!locale) notFound();
  const client = createClient();
  const home = await client
    .getByUID("page", "home", { lang: locale, fetchLinks: domainesGridFetchLinks })
    .catch(() => null);

  if (!home) {
    return (
      <SliceZone slices={[HOME_HERITAGE_DEFAULT]} components={components} />
    );
  }

  const slices = ensureHeritageSprinkle(
    home.data.slices,
    HOME_HERITAGE_DEFAULT,
  );

  return <SliceZone slices={slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  if (!locale) notFound();
  const client = createClient();
  const home = await client
    .getByUID("page", "home", { lang: locale, fetchLinks: domainesGridFetchLinks })
    .catch(() => null);

  if (!home) {
    return { title: "Bonneval Fine Wines" };
  }

  return {
    title: asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
