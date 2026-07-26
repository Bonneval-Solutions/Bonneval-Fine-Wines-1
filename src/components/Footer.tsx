import type { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { company } from "@/lib/company";
import styles from "./Footer.module.css";

type FooterProps = {
  config: Content.LayoutDocumentData | null;
  lang?: string;
};

export function Footer({ config, lang = "en-us" }: FooterProps) {
  const hasLinks = config?.footer_links && config.footer_links.length > 0;
  const email = config?.email || company.contact.email || "";
  const address = config?.address || "";
  const city = company.address?.city || "";
  const country = company.address?.country || "";
  const placeLine = [city, country].filter(Boolean).join(", ");

  const placeholderNavLinks = [
    { label: "The Wines", href: `/${lang}/wines` },
    { label: "Our Domaines", href: `/${lang}/domaines` },
    { label: "Members", href: `/${lang}/members` },
    { label: "Our History", href: `/${lang}/about` },
    { label: "Contact", href: `/${lang}/contact` },
  ];

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
            : placeholderNavLinks.map((link) => (
                <a key={link.label} href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              ))}
        </div>

        <div className={styles.brandCenter}>
          <div className={styles.brandBox}>
            <p className={styles.brandName}>Bonneval</p>
            <p className={styles.brandSub}>Fine Wines</p>
          </div>
        </div>

        <div className={styles.contactRight}>
          {address || placeLine ? (
            <p className={styles.contactCity}>{address || placeLine}</p>
          ) : null}
          {email ? <p className={styles.contactEmail}>{email}</p> : null}
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
