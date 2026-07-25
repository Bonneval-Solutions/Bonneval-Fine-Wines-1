export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        JSON.stringify({
          event: "turnstile_skipped",
          reason: "secret_key_not_configured",
        }),
      );
      return true;
    }
    return false;
  }

  if (!token) return false;

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      },
    );

    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch (err) {
    console.error(
      JSON.stringify({
        event: "turnstile_verification_error",
        error: String(err),
      }),
    );
    return false;
  }
}
