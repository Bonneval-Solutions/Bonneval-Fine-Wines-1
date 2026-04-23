import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.DomainesGridSlice>;

const fallbackDomaines = [
  { name: "Domaine Leroy", appellation: "Vosne-Romanée", descriptor: "Biodynamic mastery — the pinnacle of organic viticulture on the Côte" },
  { name: "Armand Rousseau", appellation: "Gevrey-Chambertin", descriptor: "Seven grand crus from the historic heart of the Côte de Nuits" },
  { name: "Georges Roumier", appellation: "Chambolle-Musigny", descriptor: "The most coveted Chambolle — weightless precision from old vines" },
  { name: "Domaine Dujac", appellation: "Morey-Saint-Denis", descriptor: "Whole-bunch philosophy and unmistakable aromatic complexity" },
  { name: "Domaine Ponsot", appellation: "Morey-Saint-Denis", descriptor: "Clos Saint-Denis and Clos de la Roche — limestone legends" },
  { name: "Méo-Camuzet", appellation: "Vosne-Romanée", descriptor: "Direct neighbour to DRC, guided by Henri Jayer's enduring legacy" },
  { name: "Domaine Leflaive", appellation: "Puligny-Montrachet", descriptor: "The defining voice of white Burgundy for three generations" },
  { name: "Domaine Ramonet", appellation: "Chassagne-Montrachet", descriptor: "Old-vine Montrachet — the standard against which others are measured" },
  { name: "Étienne Sauzet", appellation: "Puligny-Montrachet", descriptor: "Premier cru blanc of uncommon depth and Bathonian minerality" },
  { name: "Domaine Mugnier", appellation: "Chambolle-Musigny", descriptor: "Musigny and Bonnes-Mares — two grand crus from one impeccable estate" },
];

const DomainesGrid: FC<Props> = ({ slice }) => {
  const d = slice.primary;
  const hasItems = slice.items && slice.items.length > 0;

  return (
    <section className={styles.section} data-slice-type={slice.slice_type}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>{d.eyebrow || "The portfolio"}</p>
        <h2 className={styles.headline}>
          {d.headline || "The ten houses of Bonneval"}
        </h2>
        <div className={styles.divider} />
      </div>

      <div className={styles.grid}>
        {hasItems
          ? slice.items.map((item, i) => {
              const linkedDomaine =
                isFilled.link(item.domaine) &&
                item.domaine.link_type === "Document" &&
                "data" in item.domaine
                ? (item.domaine.data as Partial<Content.DomaineDocument["data"]> | undefined)
                : undefined;
              const cardName = linkedDomaine?.name || "Domaine";
              const cardAppellation = linkedDomaine?.appellation || "Appellation";
              const cardDescriptor = linkedDomaine?.descriptor || "";
              const cardImage = isFilled.image(item.card_image)
                ? item.card_image
                : linkedDomaine?.hero_image;
              const inner = (
                <>
                  <div className={styles.cardImage}>
                    {isFilled.image(cardImage) ? (
                      <PrismicNextImage field={cardImage} fill sizes="20vw" />
                    ) : (
                      <div className={styles.cardPlaceholder}>
                        Vineyard — {cardAppellation}
                      </div>
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.cardName}>{cardName}</p>
                    <p className={styles.cardAppellation}>{cardAppellation}</p>
                    <p className={styles.cardDescriptor}>{cardDescriptor}</p>
                  </div>
                </>
              );
              return isFilled.link(item.domaine) ? (
                <PrismicNextLink key={i} field={item.domaine} className={styles.card}>
                  {inner}
                </PrismicNextLink>
              ) : (
                <div key={i} className={styles.card}>
                  {inner}
                </div>
              );
            })
          : fallbackDomaines.map((item, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardImage}>
                  <div className={styles.cardPlaceholder}>
                    Vineyard — {item.appellation}
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardName}>{item.name}</p>
                  <p className={styles.cardAppellation}>{item.appellation}</p>
                  <p className={styles.cardDescriptor}>{item.descriptor}</p>
                </div>
              </div>
            ))}
      </div>

      <div className={styles.footer}>
        {isFilled.link(d.cta_link) ? (
          <PrismicNextLink field={d.cta_link} className={styles.ctaButton}>
            {d.cta_label || "Explore all domaines"}
          </PrismicNextLink>
        ) : (
          <span className={styles.ctaButton}>
            {d.cta_label || "Explore all domaines"}
          </span>
        )}
      </div>
    </section>
  );
};

export default DomainesGrid;
