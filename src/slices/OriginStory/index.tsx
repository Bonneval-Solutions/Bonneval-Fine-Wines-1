import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.OriginStorySlice>;

const OriginStory: FC<Props> = ({ slice, index }) => {
  const d = slice.primary;
  const isPageIntro = index === 0;
  const isFounder =
    (d.eyebrow || "").toLowerCase().includes("founder") ||
    (d.eyebrow || "").toLowerCase().includes("jean");

  return (
    <section
      className={`${styles.section} ${isPageIntro ? "" : styles.sectionFollow}`}
      data-slice-type={slice.slice_type}
    >
      <div className={styles.grid}>
        <div className={styles.imageCol}>
          {isFilled.image(d.archival_image) ? (
            <PrismicNextImage field={d.archival_image} fill sizes="40vw" />
          ) : (
            <div className={styles.placeholder}>
              {isFounder
                ? "Jean de Bonneval — portrait"
                : "Cellar — archival photograph"}
            </div>
          )}
        </div>

        <div className={styles.textCol}>
          <p className={styles.eyebrow}>
            {d.eyebrow || (isFounder ? "The founder" : "Our mission")}
          </p>

          <div className={styles.headline}>
            {isFilled.richText(d.headline) ? (
              <PrismicRichText field={d.headline} />
            ) : isFounder ? (
              <h1>Jean de Bonneval</h1>
            ) : (
              <h1>
                A family négociant,
                <br />
                a cellar of rare wines,
                <br />
                and relationships built
                <br />
                over decades.
              </h1>
            )}
          </div>

          <div className={styles.divider} />

          <div className={styles.body}>
            {isFilled.richText(d.body) ? (
              <PrismicRichText field={d.body} />
            ) : isFounder ? (
              <>
                <p>
                  Jean de Bonneval is the CEO and founder of the family company
                  behind Bonneval Fine Wines. With more than twenty years in the
                  confidential world of fine wine, he established the business
                  in 2009 after travelling the roads of France for some of the
                  greatest houses.
                </p>
                <p>
                  Under the aegis of the Domaines Lafite Rothschild distributor,
                  then Champagne Philipponnat, Jean met the cavistes who still
                  shape the trade — and built the relationships that define
                  Bonneval today.
                </p>
              </>
            ) : (
              <>
                <p>
                  Bonneval Fine Wines — formerly Bon Château — is a family
                  négociant with a cellar of nearly 15,000 bottles, including
                  some of the rarest from Burgundy, Champagne, the Rhône Valley,
                  and Bordeaux. These wines are carefully held in a dedicated,
                  climate-controlled warehouse.
                </p>
                <p>
                  We source from a wide circle of domaines, négociants, and
                  merchants who meet the same standards of provenance and care.
                  Since 2009, more than two hundred négociants, cavistes, and
                  serious private collectors have placed their trust in us.
                </p>
                <p>
                  Our website does not offer online sales: stocks are often
                  limited and constantly moving. To receive our current tariff,
                  please complete the contact form.
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
