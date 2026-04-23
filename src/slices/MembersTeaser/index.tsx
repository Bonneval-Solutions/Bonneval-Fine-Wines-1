import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.MembersTeaserSlice>;

const MembersTeaser: FC<Props> = ({ slice }) => {
  const d = slice.primary;
  const hasHeadline = isFilled.richText(d.headline);

  return (
    <section className={styles.section} data-slice-type={slice.slice_type}>
      <p className={styles.eyebrow}>{d.eyebrow || "Private Members Club"}</p>

      <div className={styles.headline}>
        {hasHeadline ? (
          <PrismicRichText field={d.headline} />
        ) : (
          <h2>
            We do not sell wine.
            <br />
            We extend invitations.
          </h2>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.body}>
        {isFilled.richText(d.body) ? (
          <PrismicRichText field={d.body} />
        ) : (
          <p>
            Bonneval operates as a private allocation club. Members receive
            curated offers from ten Burgundy domaines — delivered directly via
            WhatsApp. There is no public retail. Only members purchase.
          </p>
        )}
      </div>

      {isFilled.link(d.cta_link) ? (
        <PrismicNextLink field={d.cta_link} className={styles.cta}>
          {d.cta_label || "Apply for membership"}
        </PrismicNextLink>
      ) : (
        <span className={styles.cta}>
          {d.cta_label || "Apply for membership"}
        </span>
      )}
    </section>
  );
};

export default MembersTeaser;
