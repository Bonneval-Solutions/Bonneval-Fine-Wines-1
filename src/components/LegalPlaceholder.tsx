import styles from "./LegalPlaceholder.module.css";
import {
  LEGAL_PLACEHOLDERS,
  type LegalUid,
} from "@/lib/legal-placeholders";

export function LegalPlaceholder({ uid }: { uid: LegalUid }) {
  const page = LEGAL_PLACEHOLDERS[uid];

  return (
    <article className={styles.article}>
      <p className={styles.eyebrow}>Legal</p>
      <h1 className={styles.title}>{page.title}</h1>
      <div className={styles.divider} aria-hidden />
      <p className={styles.lead}>{page.description}</p>
      <div className={styles.body}>
        {page.paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
    </article>
  );
}
