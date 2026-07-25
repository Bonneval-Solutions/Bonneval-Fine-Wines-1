"use client";

import { useState, type FC, type FormEvent } from "react";
import { type Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.ApplicationFormSlice>;

const ApplicationForm: FC<Props> = ({ slice }) => {
  const d = slice.primary;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    if (!turnstileToken) {
      setStatus("error");
      setErrorMessage("Please complete the verification challenge.");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          city: data.get("city"),
          winePreferences: data.get("winePreferences"),
          howHeard: data.get("howHeard"),
          turnstileToken,
        }),
      });

      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          json.error || "Something went wrong. Please try again.",
        );
        setTurnstileToken(null);
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
      setTurnstileToken(null);
    }
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

        {status === "success" ? (
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
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.fieldHalf}>
              <label className={styles.label} htmlFor="apply-name">
                Full name
              </label>
              <input
                id="apply-name"
                name="name"
                type="text"
                className={styles.input}
                required
                autoComplete="name"
              />
            </div>
            <div className={styles.fieldHalf}>
              <label className={styles.label} htmlFor="apply-email">
                Email address
              </label>
              <input
                id="apply-email"
                name="email"
                type="email"
                className={styles.input}
                required
                autoComplete="email"
              />
            </div>
            <div className={styles.fieldHalf}>
              <label className={styles.label} htmlFor="apply-phone">
                Phone / WhatsApp
              </label>
              <input
                id="apply-phone"
                name="phone"
                type="tel"
                className={styles.input}
                placeholder="+359 …"
                autoComplete="tel"
              />
            </div>
            <div className={styles.fieldHalf}>
              <label className={styles.label} htmlFor="apply-city">
                City
              </label>
              <input
                id="apply-city"
                name="city"
                type="text"
                className={styles.input}
                autoComplete="address-level2"
              />
            </div>
            <div className={styles.fieldFull}>
              <label className={styles.label} htmlFor="apply-wine">
                Your collection and wine interests
              </label>
              <textarea
                id="apply-wine"
                name="winePreferences"
                rows={4}
                className={styles.textarea}
                required
              />
            </div>
            <div className={styles.fieldFull}>
              <label className={styles.label} htmlFor="apply-heard">
                How did you hear about Bonneval?
              </label>
              <input
                id="apply-heard"
                name="howHeard"
                type="text"
                className={styles.input}
              />
            </div>

            <div className={styles.fieldFull}>
              <TurnstileWidget
                theme="dark"
                onVerify={setTurnstileToken}
                onExpire={() => setTurnstileToken(null)}
              />
            </div>

            {status === "error" && errorMessage ? (
              <p className={styles.error} role="alert">
                {errorMessage}
              </p>
            ) : null}

            <div className={styles.submitWrap}>
              <button
                type="submit"
                className={styles.submit}
                disabled={status === "loading" || !turnstileToken}
              >
                {status === "loading"
                  ? "Sending…"
                  : "Request an invitation"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ApplicationForm;
