import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.FeaturedWineSlice>;

function getBadgeClass(availability: string | null) {
  if (availability === "Available now") return styles.badgeAvailable;
  if (availability === "Allocation only") return styles.badgeAllocation;
  return styles.badgePreArrival;
}

const FeaturedWine: FC<Props> = ({ slice }) => {
  const d = slice.primary;
  const availability = d.availability || "Available now";

  return (
    <section className={styles.section} data-slice-type={slice.slice_type}>
      <div className={styles.grid}>
        <div className={styles.imageWrap}>
          {isFilled.image(d.bottle_image) ? (
            <PrismicNextImage field={d.bottle_image} fill sizes="50vw" />
          ) : (
            <div className={styles.placeholder}>
              Single bottle on limestone surface — editorial photography
            </div>
          )}
          {d.collection_tag && (
            <div className={styles.collectionTag}>{d.collection_tag}</div>
          )}
        </div>

        <div>
          <p className={styles.label}>{d.label || "Featured selection"}</p>
          <h2 className={styles.domaineName}>
            {d.domaine_name || "Armand Rousseau"}
          </h2>
          <p className={styles.wineName}>
            {d.wine_name || "Gevrey-Chambertin Clos St-Jacques 2021"}
          </p>
          <div className={styles.divider} />
          <div className={styles.narrative}>
            {isFilled.richText(d.narrative) ? (
              <PrismicRichText field={d.narrative} />
            ) : (
              <p>
                From the steep east-facing slope of Clos Saint-Jacques, where
                Charles Rousseau tends vines his father planted in 1954. The
                limestone soils here are thinner than in the village — roots
                descend two metres into Bathonian rock. Three hundred cases
                produced. We hold forty-eight.
              </p>
            )}
          </div>
          <span className={`${styles.badge} ${getBadgeClass(availability)}`}>
            {availability}
          </span>
          <div className={styles.ctas}>
            {isFilled.link(d.cta_link) ? (
              <PrismicNextLink field={d.cta_link} className={styles.ctaPrimary}>
                {d.cta_label || "View wine"}
              </PrismicNextLink>
            ) : (
              <span className={styles.ctaPrimary}>
                {d.cta_label || "View wine"}
              </span>
            )}
            <span className={styles.ctaSecondary}>Request access →</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWine;
