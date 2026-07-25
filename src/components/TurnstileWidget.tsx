"use client";

import { Turnstile } from "next-turnstile";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  theme?: "light" | "dark" | "auto";
}

export function TurnstileWidget({
  onVerify,
  onExpire,
  theme = "dark",
}: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) return null;

  return (
    <Turnstile
      siteKey={siteKey}
      onVerify={onVerify}
      onExpire={onExpire}
      theme={theme}
      size="flexible"
      appearance="interaction-only"
    />
  );
}
