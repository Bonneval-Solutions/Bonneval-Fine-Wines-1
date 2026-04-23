import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.HowItWorksSlice>;

const fallbackSteps = [
  { n: "01", title: "Apply", body: "Submit an expression of interest. Tell us about your collection and what you seek." },
  { n: "02", title: "Welcome", body: "Accepted members receive a physical welcome package and a WhatsApp invitation from the founder." },
  { n: "03", title: "Receive offers", body: "2–4 times monthly, new allocations arrive via WhatsApp with full terroir context and provenance." },
  { n: "04", title: "Build your cellar", body: "Purchase, store, or drink. Your collection grows with each vintage. Bonded storage available." },
];

const HowItWorks: FC<Props> = ({ slice }) => {
  const d = slice.primary;
  const hasItems = slice.items && slice.items.length > 0;

  return (
    <section className={styles.section} data-slice-type={slice.slice_type}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>{d.eyebrow || "The process"}</p>
        <h2 className={styles.headline}>
          {d.headline || "How membership works"}
        </h2>
        <div className={styles.divider} />
      </div>

      <div className={styles.grid}>
        {hasItems
          ? slice.items.map((item, i) => (
              <div key={i}>
                <p className={styles.number}>{item.number || String(i + 1).padStart(2, "0")}</p>
                <div className={styles.stepDivider} />
                <p className={styles.stepTitle}>{item.title || "Step"}</p>
                <div className={styles.stepBody}>
                  {isFilled.richText(item.body) ? (
                    <PrismicRichText field={item.body} />
                  ) : null}
                </div>
              </div>
            ))
          : fallbackSteps.map((step) => (
              <div key={step.n}>
                <p className={styles.number}>{step.n}</p>
                <div className={styles.stepDivider} />
                <p className={styles.stepTitle}>{step.title}</p>
                <div className={styles.stepBody}>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default HowItWorks;
