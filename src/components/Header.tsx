import type { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { company } from "@/lib/company";

type HeaderProps = {
  config: Content.LayoutDocumentData | null;
  lang: string;
};

const placeholderLinks = [
  { label: "Domaines", href: "#" },
  { label: "Cuvées", href: "#" },
  { label: "Cercle Privé", href: "#" },
  { label: "Notre Histoire", href: "#" },
  { label: "Contact", href: "#" },
];

export function Header({ config, lang }: HeaderProps) {
  const hasNav = config?.nav_links && config.nav_links.length > 0;

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <div>
        {config?.header_logo?.url ? (
          <PrismicNextImage
            field={config.header_logo}
            style={{ height: 40, width: "auto" }}
          />
        ) : (
          <span
            style={{
              fontFamily: "var(--font-heading), serif",
              fontSize: "1.25rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            {company.name}
          </span>
        )}
      </div>

      <nav style={{ display: "flex", gap: "1.5rem" }}>
        {hasNav
          ? config!.nav_links.map((item, i) => (
              <PrismicNextLink
                key={i}
                field={item.link}
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {item.label}
              </PrismicNextLink>
            ))
          : placeholderLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {link.label}
              </a>
            ))}
      </nav>

      <LanguageSwitcher lang={lang} />
    </header>
  );
}
