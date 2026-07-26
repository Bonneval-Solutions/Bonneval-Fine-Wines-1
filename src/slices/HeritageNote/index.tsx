import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.HeritageNoteSlice>;

const HeritageNote: FC<Props> = ({ slice }) => {
  const d = slice.primary;

  return (
    <section
      className={styles.section}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          {d.eyebrow || "Great wines & great men"}
        </p>
        <h2 className={styles.title}>
          {d.title || "The Pasha of Bonneval"}
        </h2>
        <div className={styles.divider} />

        <div className={styles.body}>
          {isFilled.richText(d.body) ? (
            <PrismicRichText field={d.body} />
          ) : (
            <p>
              Claude Alexandre, Comte de Bonneval — later Pasha of three tails
              in Constantinople — kept his finest Burgundy behind a library&apos;s
              wire-mesh doors. When Casanova asked to see his books, the Pasha
              unlocked the cabinets and revealed rows of bottles instead.
            </p>
          )}
        </div>

        {d.pull_quote && (
          <blockquote className={styles.blockquote}>
            <p>&ldquo;{d.pull_quote}&rdquo;</p>
            {d.attribution && (
              <p className={styles.attribution}>{d.attribution}</p>
            )}
          </blockquote>
        )}

        {d.cta_label && isFilled.link(d.cta_link) && (
          <PrismicNextLink field={d.cta_link} className={styles.cta}>
            {d.cta_label}
          </PrismicNextLink>
        )}
      </div>
    </section>
  );
};

export default HeritageNote;
