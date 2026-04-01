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

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}
