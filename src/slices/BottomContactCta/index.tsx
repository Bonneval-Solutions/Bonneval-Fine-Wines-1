"use client";

import { useState, type FC, type FormEvent } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.BottomContactCtaSlice>;

const BottomContactCta: FC<Props> = ({ slice }) => {
  const d = slice.primary;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={styles.section} data-slice-type={slice.slice_type}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{d.eyebrow || "Private allocations"}</p>
          <h2 className={styles.headline}>{d.headline || "Request a callback"}</h2>
          <div className={styles.divider} />
          <div className={styles.body}>
            {isFilled.richText(d.body) ? (
              <PrismicRichText field={d.body} />
            ) : (
              <p>
                Leave your details and we will call you back personally to discuss
                availability and preferences.
              </p>
            )}
          </div>
        </div>

        <div className={styles.formWrap}>
          {submitted ? (
            <div className={styles.success}>
              <p className={styles.successGlyph}>◈</p>
              <p className={styles.successText}>
                {d.success_message || "Thank you. We will contact you shortly."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.label}>
                Full name
                <input type="text" className={styles.input} required />
              </label>
              <label className={styles.label}>
                Phone / WhatsApp
                <input type="tel" className={styles.input} required />
              </label>
              <label className={styles.label}>
                Email (optional)
                <input type="email" className={styles.input} />
              </label>
              <label className={styles.label}>
                Preferred time
                <input type="text" className={styles.input} placeholder="Morning / Afternoon" />
              </label>
              <label className={styles.labelFull}>
                Short note (optional)
                <textarea rows={3} className={styles.textarea} />
              </label>
              <button type="submit" className={styles.submit}>
                {d.submit_label || "Request a callback"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default BottomContactCta;
