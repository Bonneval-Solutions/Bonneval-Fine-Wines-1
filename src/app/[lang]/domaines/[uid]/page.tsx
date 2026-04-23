import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { normalizeLocale } from "@/i18n";
import styles from "./page.module.css";

type Params = { lang: string; uid: string };

export default async function DomainePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, uid } = await params;
  const locale = normalizeLocale(lang);
  if (!locale) notFound();

  const client = createClient();
  const domaine = await client
    .getByUID("domaine", uid, { lang: locale })
    .catch(() => notFound());

  const { data } = domaine;
  const colorLabel = data.color === "blanc" ? "Blanc" : "Rouge";

  return (
    <div style={{ background: "var(--bv-parchment)", paddingTop: "var(--header-height)" }}>
      {/* Hero */}
      <section className={styles.hero}>
        {isFilled.image(data.hero_image) ? (
          <div className={styles.heroBg}>
            <PrismicNextImage field={data.hero_image} fill sizes="100vw" priority />
          </div>
        ) : (
          <div className={styles.heroPlaceholder} aria-hidden />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroAppellation}>
            {data.appellation} &middot; {colorLabel}
          </p>
          <h1 className={styles.heroName}>{data.name}</h1>
        </div>
      </section>

      {/* Main two-column layout */}
      <div className={styles.mainGrid}>
        {/* Narrative */}
        <div className={styles.narrative}>
          {[
            { label: "The place", field: data.the_place },
            { label: "The family", field: data.the_family },
            { label: "Our relationship", field: data.our_relationship },
          ].map(
            (section) =>
              isFilled.richText(section.field) && (
                <div key={section.label} className={styles.narrativeBlock}>
                  <p className={styles.sectionLabel}>{section.label}</p>
                  <div className={styles.divider} />
                  <div className={styles.narrativeText}>
                    <PrismicRichText field={section.field} />
                  </div>
                </div>
              ),
          )}

          {/* Pull quote */}
          {(data.pull_quote_fr || data.pull_quote_en) && (
            <div className={styles.pullQuote}>
              {data.pull_quote_fr && (
                <p className={styles.pullQuoteFr}>
                  &laquo; {data.pull_quote_fr} &raquo;
                </p>
              )}
              {data.pull_quote_en && (
                <p className={styles.pullQuoteEn}>
                  &ldquo;{data.pull_quote_en}&rdquo;
                </p>
              )}
              <p className={styles.pullQuoteAttr}>&mdash; {data.name}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          <p className={styles.sectionLabel}>The wines</p>
          <div className={styles.divider} />
          <p className={styles.winePlaceholder}>
            Wines available to members. Request access for current allocations.
          </p>

          <a href={`/${lang}/about`} className={styles.backLink}>
            &larr; All domaines
          </a>
        </div>
      </div>
    </div>
  );
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
  const domaine = await client
    .getByUID("domaine", uid, { lang: locale })
    .catch(() => notFound());

  return {
    title: domaine.data.meta_title || `${domaine.data.name} — Bonneval Fine Wines`,
    description: domaine.data.meta_description || domaine.data.descriptor,
    openGraph: {
      title: domaine.data.meta_title || domaine.data.name || undefined,
      images: domaine.data.meta_image?.url
        ? [{ url: domaine.data.meta_image.url }]
        : domaine.data.hero_image?.url
          ? [{ url: domaine.data.hero_image.url }]
          : [],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const domaines = await client.getAllByType("domaine").catch(() => []);

  return domaines.map((d) => {
    const lang = normalizeLocale(d.lang);
    return { lang: lang ?? d.lang, uid: d.uid };
  });
}
