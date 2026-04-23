import { type FC } from "react";
import { type Content, isFilled, asText } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.MembershipTiersSlice>;

const fallbackTiers = [
  {
    name: "Membre",
    sub: "Standard membership",
    price: "From €2,000 annually",
    items: [
      "Access to all standard allocations",
      "WhatsApp group — direct offer delivery",
      "Invitations to Sofia private tastings",
      "Monthly editorial newsletter",
    ],
    cta: "Apply for membership",
    featured: false,
  },
  {
    name: "Cercle Intérieur",
    sub: "By invitation",
    price: "By engagement",
    items: [
      "Priority access — grand cru and micro-allocation wines",
      "Personal cellar advisory service",
      "Annual Burgundy visit — hosted cellar tours",
      "Winemaker dinner invitations in Sofia",
    ],
    cta: "Enquire",
    featured: true,
  },
];

const MembershipTiers: FC<Props> = ({ slice }) => {
  const d = slice.primary;
  const hasItems = slice.items && slice.items.length > 0;

  return (
    <section className={styles.section} data-slice-type={slice.slice_type}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>{d.eyebrow || "Membership"}</p>
        <h2 className={styles.headline}>
          {d.headline || "Two tiers, one circle"}
        </h2>
        <div className={styles.divider} />
      </div>

      <div className={styles.grid}>
        {hasItems
          ? slice.items.map((item, i) => {
              const featured = item.is_featured === true;
              const benefitsText = isFilled.richText(item.benefits)
                ? asText(item.benefits).split("\n").filter(Boolean)
                : [];
              return (
                <div
                  key={i}
                  className={`${styles.card} ${featured ? styles.cardFeatured : styles.cardDefault}`}
                >
                  <p className={styles.subLabel}>{item.sub_label}</p>
                  <h3 className={styles.tierName}>{item.tier_name}</h3>
                  <p className={styles.priceLine}>{item.price_line}</p>
                  <div className={styles.cardDivider} />
                  <div className={styles.benefits}>
                    {benefitsText.map((text, j) => (
                      <div key={j} className={styles.benefitItem}>
                        <span className={styles.benefitDash}>—</span>
                        <span className={styles.benefitText}>{text}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className={`${styles.cta} ${featured ? styles.ctaFeatured : styles.ctaDefault}`}
                  >
                    {item.cta_label || "Apply"}
                  </button>
                </div>
              );
            })
          : fallbackTiers.map((tier) => (
              <div
                key={tier.name}
                className={`${styles.card} ${tier.featured ? styles.cardFeatured : styles.cardDefault}`}
              >
                <p className={styles.subLabel}>{tier.sub}</p>
                <h3 className={styles.tierName}>{tier.name}</h3>
                <p className={styles.priceLine}>{tier.price}</p>
                <div className={styles.cardDivider} />
                <div className={styles.benefits}>
                  {tier.items.map((text, j) => (
                    <div key={j} className={styles.benefitItem}>
                      <span className={styles.benefitDash}>—</span>
                      <span className={styles.benefitText}>{text}</span>
                    </div>
                  ))}
                </div>
                <button
                  className={`${styles.cta} ${tier.featured ? styles.ctaFeatured : styles.ctaDefault}`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
      </div>

      {d.footnote && <p className={styles.footnote}>{d.footnote}</p>}
    </section>
  );
};

export default MembershipTiers;
