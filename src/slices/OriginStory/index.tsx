import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.OriginStorySlice>;

const OriginStory: FC<Props> = ({ slice }) => {
  const d = slice.primary;

  return (
    <section className={styles.section} data-slice-type={slice.slice_type}>
      <div className={styles.grid}>
        <div className={styles.imageCol}>
          {isFilled.image(d.archival_image) ? (
            <PrismicNextImage field={d.archival_image} fill sizes="40vw" />
          ) : (
            <div className={styles.placeholder}>
              Founder in cellar — archival photograph
            </div>
          )}
        </div>

        <div className={styles.textCol}>
          <p className={styles.eyebrow}>{d.eyebrow || "The story"}</p>

          <div className={styles.headline}>
            {isFilled.richText(d.headline) ? (
              <PrismicRichText field={d.headline} />
            ) : (
              <h1>
                Formerly Bon Ch&acirc;teau,
                <br />
                Loire Valley.
                <br />
                Now Sofia.
                <br />
                Always Burgundy.
              </h1>
            )}
          </div>

          <div className={styles.divider} />

          <div className={styles.body}>
            {isFilled.richText(d.body) ? (
              <PrismicRichText field={d.body} />
            ) : (
              <>
                <p>
                  The story begins not in Burgundy but in the Loire — at Bon
                  Ch&acirc;teau, a small estate where we first learned to read
                  the relationship between soil and wine.
                </p>
                <p>
                  The first visit to a Burgundy cellar changed everything.
                  Standing in the dark beneath Gevrey-Chambertin, tasting from
                  barrel beside a vigneron whose family had worked the same soil
                  for four generations, we understood that these wines occupied a
                  different world.
                </p>
                <p>
                  The move to Sofia was deliberate. In a market defined by London
                  and New York, we saw an opportunity: to bring something
                  genuinely exclusive to a collector community that had been
                  entirely underserved.
                </p>
              </>
            )}
          </div>

          {d.pull_quote && (
            <blockquote className={styles.blockquote}>
              <p>&ldquo;{d.pull_quote}&rdquo;</p>
            </blockquote>
          )}
        </div>
      </div>
    </section>
  );
};

export default OriginStory;
