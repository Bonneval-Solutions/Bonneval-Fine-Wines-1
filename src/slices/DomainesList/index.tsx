import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.DomainesListSlice>;

const fallbackDomaines = [
  { name: "Domaine Leroy", appellation: "Vosne-Romanée", color: "rouge" as const, descriptor: "Biodynamic mastery — the pinnacle of organic viticulture on the Côte" },
  { name: "Armand Rousseau", appellation: "Gevrey-Chambertin", color: "rouge" as const, descriptor: "Seven grand crus from the historic heart of the Côte de Nuits" },
  { name: "Georges Roumier", appellation: "Chambolle-Musigny", color: "rouge" as const, descriptor: "The most coveted Chambolle — weightless precision from old vines" },
  { name: "Domaine Dujac", appellation: "Morey-Saint-Denis", color: "rouge" as const, descriptor: "Whole-bunch philosophy and unmistakable aromatic complexity" },
  { name: "Domaine Ponsot", appellation: "Morey-Saint-Denis", color: "rouge" as const, descriptor: "Clos Saint-Denis and Clos de la Roche — limestone legends" },
  { name: "Méo-Camuzet", appellation: "Vosne-Romanée", color: "rouge" as const, descriptor: "Direct neighbour to DRC, guided by Henri Jayer's enduring legacy" },
  { name: "Domaine Leflaive", appellation: "Puligny-Montrachet", color: "blanc" as const, descriptor: "The defining voice of white Burgundy for three generations" },
  { name: "Domaine Ramonet", appellation: "Chassagne-Montrachet", color: "blanc" as const, descriptor: "Old-vine Montrachet — the standard against which others are measured" },
  { name: "Étienne Sauzet", appellation: "Puligny-Montrachet", color: "blanc" as const, descriptor: "Premier cru blanc of uncommon depth and Bathonian minerality" },
  { name: "Domaine Mugnier", appellation: "Chambolle-Musigny", color: "rouge" as const, descriptor: "Musigny and Bonnes-Mares — two grand crus from one impeccable estate" },
];

const DomainesList: FC<Props> = ({ slice }) => {
  const d = slice.primary;
  const hasItems = slice.items && slice.items.length > 0;

  const renderCard = (
    name: string,
    appellation: string,
    color: string,
    descriptor: string,
    image: Content.DomainesListSliceDefaultItem["card_image"] | null,
    link: Content.DomainesListSliceDefaultItem["domaine"] | null,
    key: number,
  ) => {
    const colorLabel = color === "blanc" ? "Blanc" : "Rouge";
    const appellationClass =
      color === "blanc"
        ? styles.cardAppellationBlanc
        : styles.cardAppellationRouge;

    const inner = (
      <>
        <div className={styles.cardImage}>
          {image && isFilled.image(image) ? (
            <PrismicNextImage field={image} fill sizes="30vw" />
          ) : (
            <div className={styles.cardPlaceholder}>
              Vineyard — {appellation}
            </div>
          )}
        </div>
        <div className={styles.cardBody}>
          <p className={`${styles.cardAppellation} ${appellationClass}`}>
            {appellation} &middot; {colorLabel}
          </p>
          <p className={styles.cardName}>{name}</p>
          <p className={styles.cardDescriptor}>{descriptor}</p>
          <span className={styles.cardCta}>View domaine →</span>
        </div>
      </>
    );

    if (link && isFilled.link(link)) {
      return (
        <PrismicNextLink key={key} field={link} className={styles.card}>
          {inner}
        </PrismicNextLink>
      );
    }

    return (
      <div key={key} className={styles.card}>
        {inner}
      </div>
    );
  };

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
          ? slice.items.map((item, i) =>
              renderCard(
                item.name || "Domaine",
                item.appellation || "",
                item.color || "rouge",
                item.descriptor || "",
                item.card_image,
                item.domaine,
                i,
              ),
            )
          : fallbackDomaines.map((item, i) =>
              renderCard(
                item.name,
                item.appellation,
                item.color,
                item.descriptor,
                null,
                null,
                i,
              ),
            )}
      </div>
    </section>
  );
};

export default DomainesList;
