export type LegalUid = "privacy-policy" | "terms" | "cookie-policy";

export const LEGAL_PLACEHOLDERS: Record<
  LegalUid,
  { title: string; description: string; paragraphs: string[] }
> = {
  "privacy-policy": {
    title: "Privacy Policy",
    description: "How Bonneval Fine Wines handles personal information.",
    paragraphs: [
      "Bonneval Fine Wines (“we”, “us”) collects personal information you voluntarily submit through this website — for example when you request an invitation or ask for a callback.",
      "Typical data includes your name, email address, phone number, city, and any wine preferences or notes you choose to share. We use this information solely to respond to your enquiry and administer membership interest.",
      "We process submissions via Brevo (email/CRM) and host this site on Vercel. We do not sell your personal data. You may request access, correction, or deletion by emailing jean@bonnevalfinewines.com.",
      "This page is a temporary English placeholder. A fuller policy will replace it before formal launch where required.",
    ],
  },
  terms: {
    title: "Terms of Use",
    description: "Terms governing use of the Bonneval Fine Wines website.",
    paragraphs: [
      "By using this website you agree to these terms. The site presents information about Bonneval Fine Wines, our domaines, and membership by invitation. Nothing on this site constitutes an offer to sell alcohol where prohibited by law.",
      "Content is provided for general information. We may update pages without notice. Membership, allocations, and availability remain at our discretion.",
      "To the fullest extent permitted by law, Bonneval Fine Wines is not liable for indirect or consequential loss arising from use of this site.",
      "This page is a temporary English placeholder and will be replaced with final terms before formal launch where required.",
    ],
  },
  "cookie-policy": {
    title: "Cookie Policy",
    description: "How this website uses cookies and similar technologies.",
    paragraphs: [
      "This website uses essential cookies and similar technologies required for security and basic operation — including Cloudflare Turnstile for form bot protection.",
      "We currently rely on Vercel’s basic analytics capabilities and do not run third-party advertising trackers. If we add non-essential analytics later, we will update this policy and introduce consent where required.",
      "You can control cookies through your browser settings. Blocking essential cookies may prevent some forms from working.",
      "This page is a temporary English placeholder and will be expanded before formal launch where required.",
    ],
  },
};

export function isLegalUid(uid: string): uid is LegalUid {
  return uid in LEGAL_PLACEHOLDERS;
}
