import { type Metadata } from "next";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { locales, normalizeLocale } from "@/i18n";
import { notFound } from "next/navigation";

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
      <section style={{ padding: "4rem 2rem", paddingTop: "calc(var(--header-height) + 4rem)", textAlign: "center" }}>
        <h1>Bonneval Fine Wines</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>
    );
  }

  return <SliceZone slices={home.data.slices} components={components} />;
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
