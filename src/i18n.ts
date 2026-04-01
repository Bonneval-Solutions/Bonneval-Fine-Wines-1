import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

export const locales = ["en-us", "fr-fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en-us";

export function getLocale(request: Request): Locale {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const negotiator = new Negotiator({ headers });
  const languages = negotiator.languages();

  try {
    return match(languages, [...locales], defaultLocale) as Locale;
  } catch {
    return defaultLocale;
  }
}

/**
 * Maps a path or Prismic lang tag to our canonical locale (always lowercase).
 * BCP-47 tags often arrive as `fr-FR` while routes and Prismic use `fr-fr`.
 */
export function normalizeLocale(tag: string): Locale | null {
  const lower = tag.toLowerCase();
  if ((locales as readonly string[]).includes(lower)) {
    return lower as Locale;
  }
  return null;
}

export function isValidLocale(lang: string): boolean {
  return normalizeLocale(lang) !== null;
}
