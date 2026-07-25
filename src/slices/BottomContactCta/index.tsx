"use client";

import { useState, type FC, type FormEvent } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import styles from "./index.module.css";

type Props = SliceComponentProps<Content.BottomContactCtaSlice>;

const BottomContactCta: FC<Props> = ({ slice }) => {
  const d = slice.primary;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    if (!turnstileToken) {
      setStatus("error");
      setErrorMessage("Please complete the verification challenge.");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          preferredTime: data.get("preferredTime"),
          note: data.get("note"),
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
    <section className={styles.section} data-slice-type={slice.slice_type}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{d.eyebrow || "Private allocations"}</p>
          <h2 className={styles.headline}>
            {d.headline || "Request a callback"}
          </h2>
          <div className={styles.divider} />
          <div className={styles.body}>
            {isFilled.richText(d.body) ? (
              <PrismicRichText field={d.body} />
            ) : (
              <p>
                Leave your details and we will call you back personally to
                discuss availability and preferences.
              </p>
            )}
          </div>
        </div>

        <div className={styles.formWrap}>
          {status === "success" ? (
            <div className={styles.success}>
              <p className={styles.successGlyph}>◈</p>
              <p className={styles.successText}>
                {d.success_message || "Thank you. We will contact you shortly."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <label className={styles.label} htmlFor="callback-name">
                Full name
                <input
                  id="callback-name"
                  name="name"
                  type="text"
                  className={styles.input}
                  required
                  autoComplete="name"
                />
              </label>
              <label className={styles.label} htmlFor="callback-phone">
                Phone / WhatsApp
                <input
                  id="callback-phone"
                  name="phone"
                  type="tel"
                  className={styles.input}
                  required
                  placeholder="+359 …"
                  autoComplete="tel"
                />
              </label>
              <label className={styles.label} htmlFor="callback-email">
                Email (optional)
                <input
                  id="callback-email"
                  name="email"
                  type="email"
                  className={styles.input}
                  autoComplete="email"
                />
              </label>
              <label className={styles.label} htmlFor="callback-time">
                Preferred time
                <input
                  id="callback-time"
                  name="preferredTime"
                  type="text"
                  className={styles.input}
                  placeholder="Morning / Afternoon"
                />
              </label>
              <label className={styles.labelFull} htmlFor="callback-note">
                Short note (optional)
                <textarea
                  id="callback-note"
                  name="note"
                  rows={3}
                  className={styles.textarea}
                />
              </label>

              <div className={styles.turnstile}>
                <TurnstileWidget
                  theme="light"
                  onVerify={setTurnstileToken}
                  onExpire={() => setTurnstileToken(null)}
                />
              </div>

              {status === "error" && errorMessage ? (
                <p className={styles.error} role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="submit"
                className={styles.submit}
                disabled={status === "loading" || !turnstileToken}
              >
                {status === "loading"
                  ? "Sending…"
                  : d.submit_label || "Request a callback"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default BottomContactCta;
