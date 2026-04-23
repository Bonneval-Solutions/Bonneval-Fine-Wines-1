"use client";

import { useState, useEffect } from "react";
import type { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { company } from "@/lib/company";
import styles from "./Header.module.css";

type HeaderProps = {
  config: Content.LayoutDocumentData | null;
  lang: string;
};

const placeholderLinks = [
  { label: "The Wines", href: "#" },
  { label: "Domaines", href: "#" },
  { label: "Members", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export function Header({ config, lang }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHome =
    pathname === `/${lang}` || pathname === `/${lang}/`;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const transparent = isHome && !scrolled && !mobileOpen;
  const hasNav = config?.nav_links && config.nav_links.length > 0;

  const isActive = (href: string) => {
    if (href === "#") return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`${styles.header} ${transparent ? styles.transparent : styles.solid}`}
      >
        <div className={styles.inner}>
          {config?.header_logo?.url ? (
            <PrismicNextLink href={`/${lang}`} className={styles.wordmark}>
              <PrismicNextImage
                field={config.header_logo}
                style={{ height: 32, width: "auto" }}
              />
            </PrismicNextLink>
          ) : (
            <a href={`/${lang}`} className={styles.wordmark}>
              {company.name.split(" ")[0] || "Bonneval"}
            </a>
          )}

          <nav className={styles.desktopNav}>
            {hasNav
              ? config!.nav_links.map((item, i) => {
                  const href =
                    (item.link as { url?: string })?.url || "#";
                  return (
                    <PrismicNextLink
                      key={i}
                      field={item.link}
                      className={`${styles.navLink} ${isActive(href) ? styles.active : ""}`}
                    >
                      {item.label}
                    </PrismicNextLink>
                  );
                })
              : placeholderLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={styles.navLink}
                  >
                    {link.label}
                  </a>
                ))}

            <a href={`/${lang}/members`} className={styles.ctaButton}>
              Request Access
            </a>

            <div className={styles.langWrap}>
              <LanguageSwitcher lang={lang} />
            </div>
          </nav>

          <button
            className={`${styles.hamburger} ${mobileOpen ? styles.open : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.open : ""}`}
      >
        {hasNav
          ? config!.nav_links.map((item, i) => {
              const href =
                (item.link as { url?: string })?.url || "#";
              return (
                <PrismicNextLink
                  key={i}
                  field={item.link}
                  className={`${styles.mobileNavLink} ${isActive(href) ? styles.active : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </PrismicNextLink>
              );
            })
          : placeholderLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}

        <a
          href={`/${lang}/members`}
          className={`${styles.ctaButton} ${styles.mobileCta}`}
          onClick={() => setMobileOpen(false)}
        >
          Request Access
        </a>

        <div className={styles.mobileLang}>
          <LanguageSwitcher lang={lang} />
        </div>
      </div>
    </>
  );
}
