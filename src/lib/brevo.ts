import config from "../../company-config.json";

const SENDER = {
  name: "Bonneval Fine Wines",
  email: "jean@bonnevalfinewines.com",
} as const;

const NOTIFY_TO = {
  email: "jean@bonnevalfinewines.com",
  name: "Jean",
} as const;

function getApiKey(): string {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY not configured");
  return apiKey;
}

function getListId(): number | null {
  const fromEnv = process.env.BREVO_LIST_ID;
  const fromConfig = config.integrations.brevo.listId;
  const raw = fromEnv || fromConfig;
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

async function ensureBrevoAttributes(apiKey: string, names: string[]) {
  await Promise.all(
    names.map((name) =>
      fetch(`https://api.brevo.com/v3/contacts/attributes/normal/${name}`, {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "text" }),
      }),
    ),
  );
}

export type BrevoContactInput = {
  email: string;
  attributes: Record<string, string>;
};

export async function addBrevoContact(input: BrevoContactInput) {
  const apiKey = getApiKey();
  const listId = getListId();

  await ensureBrevoAttributes(apiKey, Object.keys(input.attributes));

  const body: Record<string, unknown> = {
    email: input.email,
    attributes: input.attributes,
    updateEnabled: true,
  };
  if (listId != null) body.listIds = [listId];

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok && res.status !== 204) {
    const text = await res.text();
    throw new Error(`Brevo contacts API error ${res.status}: ${text}`);
  }
}

export async function sendBrevoNotification(opts: {
  subject: string;
  lines: string[];
}) {
  const apiKey = getApiKey();

  const htmlLines = opts.lines
    .map((l) => (l === "" ? "<br>" : `<p style="margin:4px 0">${l}</p>`))
    .join("");

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: SENDER,
      to: [NOTIFY_TO],
      subject: opts.subject,
      htmlContent: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:32px;background:#3C141C;color:#f5f0e8;">
          <h2 style="font-size:22px;letter-spacing:0.1em;color:#c2a355;margin-bottom:24px;">
            ${opts.subject}
          </h2>
          ${htmlLines}
          <hr style="border:none;border-top:1px solid rgba(194,163,85,0.2);margin:28px 0;">
          <p style="font-size:11px;color:#8b8590;letter-spacing:0.05em;">
            Bonneval Fine Wines · Sofia, Bulgaria
          </p>
        </div>`,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo email API error ${res.status}: ${text}`);
  }
}
