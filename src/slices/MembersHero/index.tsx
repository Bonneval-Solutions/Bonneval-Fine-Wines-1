import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.MembersHeroSlice>;

const MembersHero: FC<Props> = ({ slice }) => {
  const d = slice.primary;

  return (
    <section className={styles.section} data-slice-type={slice.slice_type}>
      <p className={styles.eyebrow}>{d.eyebrow || "Private Members"}</p>

      <div className={styles.headline}>
        {isFilled.richText(d.headline) ? (
          <PrismicRichText field={d.headline} />
        ) : (
          <h1>
            Not a shop.
            <br />
            A private allocation.
          </h1>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.body}>
        {isFilled.richText(d.body) ? (
          <PrismicRichText field={d.body} />
        ) : (
          <p>
            Bonneval operates as a private allocation club. Members receive
            curated offers from ten exclusive Burgundy domaines — delivered via
            WhatsApp, 2–4 times monthly. There is no public retail. Only members
            purchase.
          </p>
        )}
      </div>
    </section>
  );
};

export default MembersHero;
