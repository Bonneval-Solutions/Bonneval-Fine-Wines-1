import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { normalizeLocale } from "@/i18n";
import {
  DOMAINES_DEFAULT_SLICES,
  slicesOrDefault,
} from "@/lib/default-page-slices";

type Params = { lang: string };

export default async function DomainesIndexPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  if (!locale) notFound();

  const client = createClient();
  const page = await client
    .getByUID("page", "domaines", { lang: locale })
    .catch(() => null);

  const slices = slicesOrDefault(page?.data.slices, DOMAINES_DEFAULT_SLICES);

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
  const page = await client
    .getByUID("page", "domaines", { lang: locale })
    .catch(() => null);

  if (!page) {
    return {
      title: "Our Domaines",
      description:
        "Ten Burgundy domaines — place, family, and our relationship with each house.",
    };
  }

  return {
    title: page.data.meta_title || asText(page.data.title) || "Our Domaines",
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
  return [{ lang: "en-us" }];
}
