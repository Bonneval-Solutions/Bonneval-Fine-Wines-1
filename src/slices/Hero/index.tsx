import { type FC } from "react";
import { type Content, asText, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { company } from "@/lib/company";
import styles from "./index.module.css";

type HeroProps = SliceComponentProps<Content.HeroSlice>;

function FallbackWordmark() {
  const name = company.name;
  const i = name.indexOf(" ");
  const line1 = i === -1 ? name : name.slice(0, i);
  const line2 = i === -1 ? "" : name.slice(i + 1).trim();

  return (
    <h1>
      <span className={styles.wordmarkLine}>{line1}</span>
      {line2 ? (
        <span className={styles.wordmarkLine}>{line2}</span>
      ) : null}
    </h1>
  );
}

const Hero: FC<HeroProps> = ({ slice }) => {
  const hasHeadline = asText(slice.primary.headline).trim().length > 0;
  const hasSub = asText(slice.primary.subheadline).trim().length > 0;
  const hasPrimaryCta =
    Boolean(slice.primary.primary_cta_label) &&
    isFilled.link(slice.primary.primary_cta_link);
  const hasSecondaryCta =
    Boolean(slice.primary.secondary_cta_label) &&
    isFilled.link(slice.primary.secondary_cta_link);
  const hasAnyCta = hasPrimaryCta || hasSecondaryCta;
  const location = [company.address.city, company.address.country]
    .filter(Boolean)
    .join(" · ")
    .toUpperCase();

  return (
    <section className={styles.hero}>
      {slice.primary.background_image?.url ? (
        <div className={styles.heroBg}>
          <PrismicNextImage
            field={slice.primary.background_image}
            fill
            priority
            sizes="100vw"
          />
        </div>
      ) : (
        <div className={styles.heroBgPlaceholder} aria-hidden />
      )}

      <div className={styles.overlay} aria-hidden />

      <div className={styles.heroContent}>
        {location ? <p className={styles.location}>{location}</p> : null}

        <div className={styles.headline}>
          {hasHeadline ? (
            <PrismicRichText field={slice.primary.headline} />
          ) : (
            <FallbackWordmark />
          )}
        </div>

        {hasSub ? (
          <div className={styles.brandLine}>
            <PrismicRichText field={slice.primary.subheadline} />
          </div>
        ) : (
          <div className={styles.brandLine}>
            <p>{company.tagline}</p>
          </div>
        )}

        <p className={styles.detailLine}>{company.description}</p>
        <div className={styles.divider} aria-hidden />
        <p className={styles.tagline}>{company.tagline}</p>

        {hasAnyCta ? (
          <div className={styles.ctas}>
            {hasSecondaryCta && (
              <PrismicNextLink
                field={slice.primary.secondary_cta_link}
                className={styles.secondaryCta}
              >
                {slice.primary.secondary_cta_label}
              </PrismicNextLink>
            )}
            {hasPrimaryCta && (
              <PrismicNextLink
                field={slice.primary.primary_cta_link}
                className={styles.primaryCta}
              >
                {slice.primary.primary_cta_label}
              </PrismicNextLink>
            )}
          </div>
        ) : null}

        <p className={styles.scrollCue}>Scroll</p>
      </div>
    </section>
  );
};

export default Hero;
