import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.ThreeColumnFeaturesSlice>;

const fallbackItems = [
  { glyph: "◈", text: "Ten of Burgundy's most revered domaines, imported exclusively to Bulgaria" },
  { glyph: "◇", text: "Private allocations delivered to members via WhatsApp and email — 2–4 times monthly" },
  { glyph: "◉", text: "From the cellar to your collection. Provenance guaranteed, handling impeccable." },
];

const ThreeColumnFeatures: FC<Props> = ({ slice }) => {
  const hasItems = slice.items && slice.items.length > 0;

  return (
    <section className={styles.section} data-slice-type={slice.slice_type}>
      <div className={styles.grid}>
        {hasItems
          ? slice.items.map((item, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.glyph}>{item.icon_glyph || "◈"}</div>
                <div className={styles.divider} />
                <div className={styles.body}>
                  <PrismicRichText field={item.body} />
                </div>
              </div>
            ))
          : fallbackItems.map((item, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.glyph}>{item.glyph}</div>
                <div className={styles.divider} />
                <div className={styles.body}>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default ThreeColumnFeatures;
