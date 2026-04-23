import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.ContactBlocksSlice>;

const fallbackBlocks = [
  {
    glyph: "◎",
    label: "WhatsApp",
    primary: "+359 88 XXX XXXX",
    secondary: "Preferred — direct line to the founder. The fastest way to begin.",
    cta: "Message on WhatsApp",
  },
  {
    glyph: "◇",
    label: "Email",
    primary: "cave@bonnevalwines.com",
    secondary: "For enquiries, introductions, and longer correspondence.",
    cta: "Send an email",
  },
  {
    glyph: "◈",
    label: "Visit",
    primary: "Sofia, Bulgaria",
    secondary: "By appointment. Private tastings available for members at our Sofia address.",
    cta: null,
  },
];

const ContactBlocks: FC<Props> = ({ slice }) => {
  const d = slice.primary;
  const hasItems = slice.items && slice.items.length > 0;

  return (
    <section className={styles.section} data-slice-type={slice.slice_type}>
      <div className={styles.pageHeader}>
        <p className={styles.eyebrow}>{d.eyebrow || "Reach us"}</p>
        <h1 className={styles.headline}>{d.headline || "Contact"}</h1>
        <div className={styles.divider} />
        <p className={styles.subline}>
          {d.subline || "We prefer conversation to correspondence. Reach us directly."}
        </p>
      </div>

      <div className={styles.cardGrid}>
        <div className={styles.cardGridInner}>
          {hasItems
            ? slice.items.map((item, i) => (
                <div key={i} className={styles.card}>
                  <div className={styles.cardGlyph}>
                    {item.icon_glyph || "◈"}
                  </div>
                  <p className={styles.cardLabel}>{item.label}</p>
                  <div className={styles.cardDivider} />
                  <p className={styles.cardPrimary}>{item.primary_text}</p>
                  <div className={styles.cardSecondary}>
                    {isFilled.richText(item.secondary_text) ? (
                      <PrismicRichText field={item.secondary_text} />
                    ) : null}
                  </div>
                  {item.cta_label &&
                    (isFilled.link(item.cta_link) ? (
                      <PrismicNextLink
                        field={item.cta_link}
                        className={styles.cardCta}
                      >
                        {item.cta_label}
                      </PrismicNextLink>
                    ) : (
                      <span className={styles.cardCta}>{item.cta_label}</span>
                    ))}
                </div>
              ))
            : fallbackBlocks.map((block, i) => (
                <div key={i} className={styles.card}>
                  <div className={styles.cardGlyph}>{block.glyph}</div>
                  <p className={styles.cardLabel}>{block.label}</p>
                  <div className={styles.cardDivider} />
                  <p className={styles.cardPrimary}>{block.primary}</p>
                  <div className={styles.cardSecondary}>
                    <p>{block.secondary}</p>
                  </div>
                  {block.cta && (
                    <span className={styles.cardCta}>{block.cta}</span>
                  )}
                </div>
              ))}
        </div>
      </div>

      <div className={styles.closingLine}>
        <p className={styles.closingText}>
          Every relationship begins with a conversation.
        </p>
      </div>
    </section>
  );
};

export default ContactBlocks;
