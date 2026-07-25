import { NextRequest, NextResponse } from "next/server";
import { addBrevoContact, sendBrevoNotification } from "@/lib/brevo";
import { checkRateLimit, getRequestIp } from "@/lib/rate-limit";
import {
  isValidEmail,
  isValidPhone,
  normalisePhone,
  sanitizeText,
} from "@/lib/sanitize";
import { verifyTurnstileToken } from "@/lib/turnstile";

type RegistrationPayload = {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  winePreferences: string;
  howHeard?: string;
};

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Invalid content type." }, { status: 415 });
  }

  const ip = getRequestIp(req.headers);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const turnstileOk = await verifyTurnstileToken(
    String(raw.turnstileToken ?? ""),
  );
  if (!turnstileOk) {
    return NextResponse.json(
      { error: "Bot verification failed. Please try again." },
      { status: 403 },
    );
  }

  const payload: RegistrationPayload = {
    name: sanitizeText(String(raw.name ?? ""), 120),
    email: sanitizeText(String(raw.email ?? ""), 254),
    phone: raw.phone ? sanitizeText(String(raw.phone), 30) : undefined,
    city: raw.city ? sanitizeText(String(raw.city), 80) : undefined,
    winePreferences: sanitizeText(String(raw.winePreferences ?? ""), 2000),
    howHeard: raw.howHeard
      ? sanitizeText(String(raw.howHeard), 500)
      : undefined,
  };

  if (!payload.name || payload.name.length < 2) {
    return NextResponse.json(
      { error: "A valid full name is required." },
      { status: 400 },
    );
  }

  if (!payload.email || !isValidEmail(payload.email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 },
    );
  }

  if (payload.phone && !isValidPhone(payload.phone)) {
    return NextResponse.json(
      {
        error:
          "Phone number must include a country code (e.g. +359 88 123 4567).",
      },
      { status: 400 },
    );
  }

  if (!payload.winePreferences || payload.winePreferences.length < 10) {
    return NextResponse.json(
      {
        error:
          "Please tell us about your collection and wine interests (at least 10 characters).",
      },
      { status: 400 },
    );
  }

  if (payload.phone) {
    payload.phone = normalisePhone(payload.phone);
  }

  const attributes: Record<string, string> = {
    FIRSTNAME: payload.name.split(" ")[0] ?? payload.name,
    LASTNAME: payload.name.split(" ").slice(1).join(" ") || "",
    FORM_TYPE: "membership_application",
    WINE_PREFERENCES: payload.winePreferences,
  };
  if (payload.phone) attributes.PHONE = payload.phone;
  if (payload.city) attributes.CITY = payload.city;
  if (payload.howHeard) attributes.HOW_HEARD = payload.howHeard;

  try {
    await addBrevoContact({ email: payload.email, attributes });
  } catch (err) {
    console.error("[register] Brevo contacts error:", err);
    return NextResponse.json(
      {
        error:
          "We could not save your application. Please try again or email us directly.",
      },
      { status: 500 },
    );
  }

  sendBrevoNotification({
    subject: `New membership request — ${payload.name}`,
    lines: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.phone ? `Phone: ${payload.phone}` : "",
      payload.city ? `City: ${payload.city}` : "",
      "",
      "Wine interests:",
      payload.winePreferences,
      "",
      payload.howHeard ? `How heard: ${payload.howHeard}` : "",
    ].filter((line, i, arr) => !(line === "" && arr[i - 1] === "")),
  }).catch((err) => console.error("[register] Brevo notification error:", err));

  return NextResponse.json({ ok: true });
}
