import type { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { company } from "@/lib/company";
import styles from "./Footer.module.css";

type FooterProps = {
  config: Content.LayoutDocumentData | null;
  lang?: string;
};

const placeholderNavLinks = [
  "The Wines",
  "The Domaines",
  "Members",
  "About",
  "Contact",
];

export function Footer({ config }: FooterProps) {
  const hasLinks = config?.footer_links && config.footer_links.length > 0;
  const email =
    config?.email || company.contact.email || "cave@bonnevalwines.com";
  const address = config?.address || "";
  const city = company.address?.city || "Sofia";
  const country = company.address?.country || "Bulgaria";

  return (
    <footer className={styles.footer}>
      <div className={styles.topGrid}>
        <div className={styles.navLinks}>
          {hasLinks
            ? config!.footer_links.map((item, i) => (
                <PrismicNextLink
                  key={i}
                  field={item.link}
                  className={styles.navLink}
                >
                  {item.label}
                </PrismicNextLink>
              ))
            : placeholderNavLinks.map((label) => (
                <span key={label} className={styles.navLink}>
                  {label}
                </span>
              ))}
        </div>

        <div className={styles.brandCenter}>
          <p className={styles.brandName}>Bonneval</p>
          <p className={styles.brandSub}>Fine Wines</p>
        </div>

        <div className={styles.contactRight}>
          <p className={styles.contactCity}>
            {address || `${city}, ${country}`}
          </p>
          <p className={styles.contactEmail}>{email}</p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.originLine}>
          Formerly Bon Ch&acirc;teau, Loire Valley. Now Sofia. Always Burgundy.
        </p>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} {company.name}
        </p>
      </div>
    </footer>
  );
}
