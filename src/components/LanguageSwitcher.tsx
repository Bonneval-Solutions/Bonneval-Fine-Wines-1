"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { normalizeLocale, type Locale } from "@/i18n";

type LanguageSwitcherProps = {
  lang: string;
};

/**
 * Switches `/:locale/...` to the same path under the other supported locale.
 */
export function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const current: Locale = normalizeLocale(lang) ?? "en-us";
  const target: Locale = current === "en-us" ? "fr-fr" : "en-us";

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const pathAfterLocale = normalizeLocale(first)
    ? segments.slice(1)
    : segments;
  const suffix =
    pathAfterLocale.length > 0 ? `/${pathAfterLocale.join("/")}` : "";
  const href = `/${target}${suffix}`;

  const label = target.split("-")[0].toUpperCase();

  return (
    <Link
      href={href}
      prefetch
      title={target === "en-us" ? "English" : "Français"}
      style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      {label}
    </Link>
  );
}
