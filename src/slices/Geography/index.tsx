import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.GeographySlice>;

const Geography: FC<Props> = ({ slice }) => {
  const d = slice.primary;

  return (
    <section className={styles.section} data-slice-type={slice.slice_type}>
      <div className={styles.grid}>
        <div>
          <p className={styles.label}>
            {d.col_left_label || "Geography"}
          </p>
          <h2 className={styles.headline}>
            {d.col_left_head || "Why Bulgaria? Why Sofia?"}
          </h2>
          <div className={styles.divider} />
          <div className={styles.body}>
            {isFilled.richText(d.col_left_body) ? (
              <PrismicRichText field={d.col_left_body} />
            ) : (
              <p>
                Sofia is a growing European capital with a sophisticated
                collector community and virtually no competition for what
                Bonneval offers. No luxury Burgundy specialist operates from
                here — we own this territory entirely.
              </p>
            )}
          </div>
        </div>

        <div className={styles.colRight}>
          <p className={styles.label}>
            {d.col_right_label || "The advantage"}
          </p>
          <h2 className={styles.headline}>
            {d.col_right_head || "Outside the crowd"}
          </h2>
          <div className={styles.divider} />
          <div className={styles.body}>
            {isFilled.richText(d.col_right_body) ? (
              <PrismicRichText field={d.col_right_body} />
            ) : (
              <p>
                London has dozens of fine wine merchants competing for the same
                allocations, the same clients, the same shelf space. Sofia has
                zero. Our domaines give us their undivided attention. Our clients
                receive ours.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Geography;
