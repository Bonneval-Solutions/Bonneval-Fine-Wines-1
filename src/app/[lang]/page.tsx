import { type Metadata } from "next";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { locales } from "@/i18n";

type Params = { lang: string };

export default async function Home({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang } = await params;
  const client = createClient();
  const home = await client
    .getByUID("page", "home", { lang })
    .catch(() => null);

  if (!home) {
    return (
      <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
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
  const client = createClient();
  const home = await client
    .getByUID("page", "home", { lang })
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
