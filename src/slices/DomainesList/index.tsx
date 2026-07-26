import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { type SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.DomainesListSlice>;

type CardData = {
  name: string;
  appellation: string;
  color: string;
  descriptor: string;
  image: Content.DomainesListSliceDefaultItem["card_image"] | null;
  href: string | null;
  linkField: Content.DomainesListSliceDefaultItem["domaine"] | null;
};

const fallbackDomaines: CardData[] = [
  {
    name: "Domaine Leroy",
    appellation: "Vosne-Romanée",
    color: "rouge",
    descriptor:
      "Biodynamic mastery — the pinnacle of organic viticulture on the Côte",
    image: null,
    href: null,
    linkField: null,
  },
  {
    name: "Armand Rousseau",
    appellation: "Gevrey-Chambertin",
    color: "rouge",
    descriptor:
      "Seven grand crus from the historic heart of the Côte de Nuits",
    image: null,
    href: null,
    linkField: null,
  },
  {
    name: "Georges Roumier",
    appellation: "Chambolle-Musigny",
    color: "rouge",
    descriptor:
      "The most coveted Chambolle — weightless precision from old vines",
    image: null,
    href: null,
    linkField: null,
  },
  {
    name: "Domaine Dujac",
    appellation: "Morey-Saint-Denis",
    color: "rouge",
    descriptor: "Whole-bunch philosophy and unmistakable aromatic complexity",
    image: null,
    href: null,
    linkField: null,
  },
  {
    name: "Domaine Ponsot",
    appellation: "Morey-Saint-Denis",
    color: "rouge",
    descriptor: "Clos Saint-Denis and Clos de la Roche — limestone legends",
    image: null,
    href: null,
    linkField: null,
  },
  {
    name: "Méo-Camuzet",
    appellation: "Vosne-Romanée",
    color: "rouge",
    descriptor:
      "Direct neighbour to DRC, guided by Henri Jayer's enduring legacy",
    image: null,
    href: null,
    linkField: null,
  },
  {
    name: "Domaine Leflaive",
    appellation: "Puligny-Montrachet",
    color: "blanc",
    descriptor: "The defining voice of white Burgundy for three generations",
    image: null,
    href: null,
    linkField: null,
  },
  {
    name: "Domaine Ramonet",
    appellation: "Chassagne-Montrachet",
    color: "blanc",
    descriptor:
      "Old-vine Montrachet — the standard against which others are measured",
    image: null,
    href: null,
    linkField: null,
  },
  {
    name: "Étienne Sauzet",
    appellation: "Puligny-Montrachet",
    color: "blanc",
    descriptor:
      "Premier cru blanc of uncommon depth and Bathonian minerality",
    image: null,
    href: null,
    linkField: null,
  },
  {
    name: "Domaine Mugnier",
    appellation: "Chambolle-Musigny",
    color: "rouge",
    descriptor:
      "Musigny and Bonnes-Mares — two grand crus from one impeccable estate",
    image: null,
    href: null,
    linkField: null,
  },
];

function renderCard(card: CardData, key: number) {
  const colorLabel = card.color === "blanc" ? "Blanc" : "Rouge";
  const appellationClass =
    card.color === "blanc"
      ? styles.cardAppellationBlanc
      : styles.cardAppellationRouge;

  const inner = (
    <>
      <div className={styles.cardImage}>
        {card.image && isFilled.image(card.image) ? (
          <PrismicNextImage field={card.image} fill sizes="30vw" />
        ) : (
          <div className={styles.cardPlaceholder}>
            Vineyard — {card.appellation}
          </div>
        )}
      </div>
      <div className={styles.cardBody}>
        <p className={`${styles.cardAppellation} ${appellationClass}`}>
          {card.appellation} &middot; {colorLabel}
        </p>
        <p className={styles.cardName}>{card.name}</p>
        <p className={styles.cardDescriptor}>{card.descriptor}</p>
        <span className={styles.cardCta}>View domaine →</span>
      </div>
    </>
  );

  if (card.linkField && isFilled.link(card.linkField)) {
    return (
      <PrismicNextLink key={key} field={card.linkField} className={styles.card}>
        {inner}
      </PrismicNextLink>
    );
  }

  if (card.href) {
    return (
      <a key={key} href={card.href} className={styles.card}>
        {inner}
      </a>
    );
  }

  return (
    <div key={key} className={styles.card}>
      {inner}
    </div>
  );
}

const DomainesList: FC<Props> = async ({ slice }) => {
  const d = slice.primary;
  const useAll = d.source === "All domaines";
  let cards: CardData[] = [];

  if (useAll) {
    const client = createClient();
    const domaines = await client.getAllByType("domaine").catch(() => []);
    cards = domaines.map((doc) => {
      const hero = doc.data.hero_image;
      const cardThumb =
        isFilled.image(hero) && hero.card && isFilled.image(hero.card)
          ? hero.card
          : null;
      const image = cardThumb || (isFilled.image(hero) ? hero : null);
      return {
        name: doc.data.name || "Domaine",
        appellation: doc.data.appellation || "",
        color: doc.data.color || "rouge",
        descriptor: doc.data.descriptor || "",
        image,
        href: doc.url || `/${doc.lang}/domaines/${doc.uid}`,
        linkField: null,
      };
    });
  } else if (slice.items && slice.items.length > 0) {
    cards = slice.items.map((item) => ({
      name: item.name || "Domaine",
      appellation: item.appellation || "",
      color: item.color || "rouge",
      descriptor: item.descriptor || "",
      image: item.card_image,
      href: null,
      linkField: item.domaine,
    }));
  }

  if (cards.length === 0) {
    cards = fallbackDomaines;
  }

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
        {cards.map((card, i) => renderCard(card, i))}
      </div>
    </section>
  );
};

export default DomainesList;
