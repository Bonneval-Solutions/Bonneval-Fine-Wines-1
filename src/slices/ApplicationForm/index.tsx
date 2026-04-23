"use client";

import { useState, type FC, type FormEvent } from "react";
import { type Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.ApplicationFormSlice>;

const ApplicationForm: FC<Props> = ({ slice }) => {
  const d = slice.primary;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="apply-form"
      className={styles.section}
      data-slice-type={slice.slice_type}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{d.eyebrow || "Apply"}</p>
          <h2 className={styles.headline}>
            {d.headline || "Request an invitation"}
          </h2>
          <div className={styles.divider} />
          <p className={styles.subline}>
            {d.subline ||
              "The founder personally reviews every expression of interest."}
          </p>
        </div>

        {submitted ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>◈</div>
            <h3 className={styles.successTitle}>
              Your invitation is requested
            </h3>
            <div className={styles.divider} style={{ margin: "0 auto 22px" }} />
            <p className={styles.successText}>
              We will be in touch personally within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldHalf}>
              <label className={styles.label}>Full name</label>
              <input type="text" className={styles.input} required />
            </div>
            <div className={styles.fieldHalf}>
              <label className={styles.label}>Email address</label>
              <input type="email" className={styles.input} required />
            </div>
            <div className={styles.fieldHalf}>
              <label className={styles.label}>Phone / WhatsApp</label>
              <input type="tel" className={styles.input} />
            </div>
            <div className={styles.fieldHalf}>
              <label className={styles.label}>City</label>
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.fieldFull}>
              <label className={styles.label}>
                Your collection and wine interests
              </label>
              <textarea rows={4} className={styles.textarea} />
            </div>
            <div className={styles.fieldFull}>
              <label className={styles.label}>
                How did you hear about Bonneval?
              </label>
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.submitWrap}>
              <button type="submit" className={styles.submit}>
                Request an invitation
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ApplicationForm;
