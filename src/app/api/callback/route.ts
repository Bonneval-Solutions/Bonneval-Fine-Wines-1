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

type CallbackPayload = {
  name: string;
  phone: string;
  email?: string;
  preferredTime?: string;
  note?: string;
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

  const payload: CallbackPayload = {
    name: sanitizeText(String(raw.name ?? ""), 120),
    phone: sanitizeText(String(raw.phone ?? ""), 30),
    email: raw.email ? sanitizeText(String(raw.email), 254) : undefined,
    preferredTime: raw.preferredTime
      ? sanitizeText(String(raw.preferredTime), 80)
      : undefined,
    note: raw.note ? sanitizeText(String(raw.note), 2000) : undefined,
  };

  if (!payload.name || payload.name.length < 2) {
    return NextResponse.json(
      { error: "A valid full name is required." },
      { status: 400 },
    );
  }

  if (!payload.phone || !isValidPhone(payload.phone)) {
    return NextResponse.json(
      {
        error:
          "A phone number with country code is required (e.g. +359 88 123 4567).",
      },
      { status: 400 },
    );
  }

  if (payload.email && !isValidEmail(payload.email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  payload.phone = normalisePhone(payload.phone);

  const attributes: Record<string, string> = {
    FIRSTNAME: payload.name.split(" ")[0] ?? payload.name,
    LASTNAME: payload.name.split(" ").slice(1).join(" ") || "",
    FORM_TYPE: "callback_request",
    PHONE: payload.phone,
  };
  if (payload.preferredTime) attributes.PREFERRED_TIME = payload.preferredTime;
  if (payload.note) attributes.OTHER_INFO = payload.note;

  // Brevo contacts require an email — only list when provided; always notify Jean.
  if (payload.email) {
    try {
      await addBrevoContact({ email: payload.email, attributes });
    } catch (err) {
      console.error("[callback] Brevo contacts error:", err);
      return NextResponse.json(
        {
          error:
            "We could not save your request. Please try again or email us directly.",
        },
        { status: 500 },
      );
    }
  }

  try {
    await sendBrevoNotification({
      subject: `Callback request — ${payload.name}`,
      lines: [
        `Name: ${payload.name}`,
        `Phone: ${payload.phone}`,
        payload.email ? `Email: ${payload.email}` : "Email: (not provided)",
        payload.preferredTime
          ? `Preferred time: ${payload.preferredTime}`
          : "",
        "",
        payload.note ? `Note:\n${payload.note}` : "",
      ].filter((line, i, arr) => !(line === "" && arr[i - 1] === "")),
    });
  } catch (err) {
    console.error("[callback] Brevo notification error:", err);
    if (!payload.email) {
      return NextResponse.json(
        {
          error:
            "We could not send your request. Please try again or email us directly.",
        },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
