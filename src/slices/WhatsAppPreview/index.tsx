import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.WhatsAppPreviewSlice>;

const WhatsAppPreview: FC<Props> = ({ slice }) => {
  const d = slice.primary;

  return (
    <section className={styles.section} data-slice-type={slice.slice_type}>
      <div className={styles.grid}>
        <div>
          <p className={styles.eyebrow}>{d.eyebrow || "How offers arrive"}</p>
          <h2 className={styles.headline}>
            {d.headline || "The allocation message"}
          </h2>
          <div className={styles.divider} />
          <div className={styles.body}>
            {isFilled.richText(d.body) ? (
              <PrismicRichText field={d.body} />
            ) : (
              <p>
                Every offer is crafted with the same editorial care as the
                website: terroir-first storytelling, precise provenance,
                transparent pricing. Never a flash sale. Always a personal note
                from someone who has stood in that cellar.
              </p>
            )}
          </div>
        </div>

        <div className={styles.mockWrap}>
          <p className={styles.mockHeader}>
            WhatsApp &middot; Bonneval Fine Wines
          </p>
          <div className={styles.mockMessage}>
            <p className={styles.mockWineName}>
              {d.sample_wine_name ||
                "Armand Rousseau — Gevrey-Chambertin 2022"}
            </p>
            <div className={styles.mockNarrative}>
              {isFilled.richText(d.sample_narrative) ? (
                <PrismicRichText field={d.sample_narrative} />
              ) : (
                <p>
                  From the east-facing slopes of Clos Saint-Jacques, where
                  Charles Rousseau tends vines planted by his father in 1954.
                  Only 2,400 bottles produced. We have 36 for our members.
                </p>
              )}
            </div>
            <div className={styles.mockFooter}>
              <span className={styles.mockPrice}>
                {d.sample_price || "€420 / bottle"}
              </span>
              <span className={styles.mockReply}>Reply to reserve</span>
            </div>
          </div>
          <p className={styles.mockAvail}>
            {d.available_until || "Available until Friday"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppPreview;
