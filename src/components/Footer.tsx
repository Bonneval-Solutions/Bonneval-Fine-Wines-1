import type { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { company } from "@/lib/company";

type FooterProps = {
  config: Content.LayoutDocumentData | null;
  lang?: string;
};

const placeholderLinks = [
  { label: "Mentiones Légales", href: "#" },
  { label: "Confidentialité", href: "#" },
  { label: "Conditions", href: "#" },
];

export function Footer({ config }: FooterProps) {
  const hasLinks = config?.footer_links && config.footer_links.length > 0;
  const email = config?.email || company.contact.email || "cave@bonnevalwines.com";
  const phone = config?.phone || company.contact.phone || "";
  const address = config?.address || "";

  return (
    <footer
      style={{
        borderTop: "1px solid #e5e5e5",
        padding: "2rem",
        fontFamily: "var(--font-body), sans-serif",
        fontSize: "0.875rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-heading), serif",
              fontSize: "1.125rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
              letterSpacing: "0.05em",
            }}
          >
            {company.name}
          </p>
          <p style={{ color: "#8B8590", maxWidth: "320px", lineHeight: 1.6 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum vestibulum.
          </p>
        </div>

        <div>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Contact</p>
          {email && <p style={{ color: "#8B8590" }}>{email}</p>}
          {phone && <p style={{ color: "#8B8590" }}>{phone}</p>}
          {address && <p style={{ color: "#8B8590" }}>{address}</p>}
        </div>

        <nav>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Links</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {hasLinks
              ? config!.footer_links.map((item, i) => (
                  <PrismicNextLink
                    key={i}
                    field={item.link}
                    style={{ color: "#8B8590", textDecoration: "none" }}
                  >
                    {item.label}
                  </PrismicNextLink>
                ))
              : placeholderLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{ color: "#8B8590", textDecoration: "none" }}
                  >
                    {link.label}
                  </a>
                ))}
          </div>
        </nav>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          paddingTop: "1rem",
          borderTop: "1px solid #e5e5e5",
          color: "#8B8590",
          fontSize: "0.75rem",
        }}
      >
        &copy; {new Date().getFullYear()} {company.name}. Omnia iura reservantur.
      </div>
    </footer>
  );
}
