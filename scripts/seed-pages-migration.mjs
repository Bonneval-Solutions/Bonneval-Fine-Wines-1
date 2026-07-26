#!/usr/bin/env node
/**
 * Seed Wines / Domaines / Our History (+ nav, heritage sprinkles) via Migration API.
 *
 *   node scripts/seed-pages-migration.mjs
 *   node scripts/seed-pages-migration.mjs --dry-run
 *   node scripts/seed-pages-migration.mjs --members-only
 *
 * Requires PRISMIC_WRITE_TOKEN + PRISMIC_REPO in .env.local.
 * Optional PRISMIC_ACCESS_TOKEN to look up existing document IDs for PUT updates.
 *
 * Writes land as drafts → publish in Prismic → Migration Releases.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@prismicio/client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

function loadEnv() {
  const env = {};
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return env;
}

const {
  PRISMIC_WRITE_TOKEN,
  PRISMIC_ACCESS_TOKEN,
  PRISMIC_REPO = "bonneval-fine-wines",
} = loadEnv();

const DRY_RUN = process.argv.includes("--dry-run");
const MEMBERS_ONLY = process.argv.includes("--members-only");
const LANG = "en-us";
const MIGRATION = "https://migration.prismic.io/documents";

if (!PRISMIC_WRITE_TOKEN && !DRY_RUN) {
  console.error("Missing PRISMIC_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${PRISMIC_WRITE_TOKEN}`,
  repository: PRISMIC_REPO,
  "Content-Type": "application/json",
};

const h1 = (text) => [
  { type: "heading1", text, spans: [], direction: "ltr" },
];
const p = (...paragraphs) =>
  paragraphs.map((text) => ({
    type: "paragraph",
    text,
    spans: [],
    direction: "ltr",
  }));
const listItems = (...items) =>
  items.map((text) => ({
    type: "list-item",
    text,
    spans: [],
    direction: "ltr",
  }));
const web = (url) => ({ link_type: "Web", url });

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const DOC_IDS_PATH = resolve(__dirname, ".prismic-doc-ids.json");

function loadDocIds() {
  try {
    return JSON.parse(readFileSync(DOC_IDS_PATH, "utf8"));
  } catch {
    return {};
  }
}

function saveDocIds(ids) {
  writeFileSync(DOC_IDS_PATH, JSON.stringify(ids, null, 2) + "\n");
}


function slice(slice_type, primary, items = []) {
  return { slice_type, variation: "default", primary, items };
}

// ---------------------------------------------------------------------------
// Page payloads
// ---------------------------------------------------------------------------

const WINES_SLICES = [
  slice("members_hero", {
    eyebrow: "The cellar",
    headline: h1("Not a shop.\nA living cellar."),
    body: p(
      "Bonneval Fine Wines holds nearly 15,000 bottles — among them some of the rarest from Burgundy, Champagne, the Rhône Valley, and Bordeaux — in a dedicated, climate-controlled warehouse.",
      "We source from domaines, négociants, and merchants who meet the same standards of provenance and care. Stocks are often limited and constantly moving, so we do not sell online.",
      "To receive our current tariff, please get in touch.",
    ),
  }),
  slice("featured_wine", {
    label: "Featured selection",
    collection_tag: "Collection 2024",
    domaine_name: "Armand Rousseau",
    wine_name: "Gevrey-Chambertin Clos St-Jacques 2021",
    narrative: p(
      "From the steep east-facing slope of Clos Saint-Jacques, where Charles Rousseau tends vines his father planted in 1954. The limestone soils here are thinner than in the village — roots descend two metres into Bathonian rock. Three hundred cases produced. We hold forty-eight.",
    ),
    availability: "Allocation only",
    cta_label: "Request allocation",
    cta_link: web("/en-us/contact"),
  }),
  slice("featured_wine", {
    label: "Past selection",
    collection_tag: "Collection 2023",
    domaine_name: "Domaine Leflaive",
    wine_name: "Puligny-Montrachet Les Pucelles 2020",
    narrative: p(
      "Les Pucelles sits on the mid-slope of Puligny, where Bathonian limestone and a gentle eastern exposure give white Burgundy its most precise voice. Leflaive’s biodynamic farming and patient élevage yield a wine of quiet authority — reserved for members who ask.",
    ),
    availability: "Pre-arrival",
    cta_label: "Enquire",
    cta_link: web("/en-us/contact"),
  }),
  slice("featured_wine", {
    label: "Past selection",
    collection_tag: "Collection 2023",
    domaine_name: "Georges Roumier",
    wine_name: "Chambolle-Musigny Les Amoureuses 2019",
    narrative: p(
      "Les Amoureuses is the most coveted premier cru in Chambolle — weightless, aromatic, and impossibly fine. Roumier’s old vines and whole-bunch instinct make every bottle a study in perfume and length.",
    ),
    availability: "Allocation only",
    cta_label: "Request allocation",
    cta_link: web("/en-us/contact"),
  }),
  slice("heritage_note", {
    eyebrow: "Great wines & great men",
    title: "Napoléon and Chambertin",
    body: p(
      "As a young artillery officer in the Côte-d’Or, Napoléon formed a lifelong preference for Chambertin. By 1798 he was rarely unfaithful to it — save, occasionally, for a coupe of champagne.",
      "He took Burgundy across the desert to Egypt and drank a half-bottle at every meal on campaign. One story claims Waterloo was lost for want of his morning glass; the English preferred another version entirely.",
    ),
    pull_quote: "Chambertin should be obligatory.",
    attribution: "Bonneval archive",
    cta_label: "Read our history →",
    cta_link: web("/en-us/about"),
  }),
  slice("bottom_contact_cta", {
    eyebrow: "Private allocations",
    headline: "Request our current tariff",
    body: p(
      "Leave your details and we will send an up-to-date list. Stocks move quickly; what is available today may not be tomorrow.",
    ),
    submit_label: "Request our tariff",
  }),
];

const DOMAINES_SLICES = [
  slice("members_hero", {
    eyebrow: "Our domaines",
    headline: h1("The houses\nof Bonneval."),
    body: p(
      "Ten Burgundy domaines chosen for the land they farm and the families who farm it. Explore each house — place, lineage, and our relationship — then request allocation through membership.",
    ),
  }),
  slice("domaines_list", {
    eyebrow: "The portfolio",
    headline: "All domaines",
    source: "All domaines",
  }),
  slice("heritage_note", {
    eyebrow: "Great wines & great men",
    title: "Charlemagne and Corton",
    body: p(
      "Charlemagne kept a close eye on his vineyards and cellars. His favoured red came from the hill of Corton — until, legend says, the stains on his white beard persuaded his wife to urge him toward white wine instead.",
      "To please her and keep drinking Corton, he replanted part of the slope with white grapes — and so Chardonnay took root on the lands of Aloxe.",
    ),
    pull_quote: null,
    attribution: null,
    cta_label: "Read our history →",
    cta_link: web("/en-us/about"),
  }),
];

const ABOUT_SLICES = [
  slice("origin_story", {
    eyebrow: "Our mission",
    headline: h1(
      "A family négociant,\na cellar of rare wines,\nand relationships built\nover decades.",
    ),
    body: p(
      "Bonneval Fine Wines — formerly Bon Château — is a family négociant with a cellar of nearly 15,000 bottles, including some of the rarest from Burgundy, Champagne, the Rhône Valley, and Bordeaux. These wines are carefully held in a dedicated, climate-controlled warehouse.",
      "We source from a wide circle of domaines, négociants, and merchants who meet the same standards of provenance and care. Since 2009, more than two hundred négociants, cavistes, and serious private collectors have placed their trust in us.",
      "Our website does not offer online sales: stocks are often limited and constantly moving. To receive our current tariff, please complete the contact form.",
    ),
    pull_quote: null,
  }),
  slice("origin_story", {
    eyebrow: "The founder",
    headline: h1("Jean de Bonneval"),
    body: p(
      "Jean de Bonneval is the CEO and founder of the family company behind Bonneval Fine Wines. With more than twenty years in the confidential world of fine wine, he established the business in 2009 after travelling the roads of France for some of the greatest houses.",
      "Under the aegis of the Domaines Lafite Rothschild distributor, then the prestigious Champagne house Philipponnat, Jean met the cavistes who still shape the trade. Along the way he stopped at the finest tables — often starred — in the company of vignerons, sommeliers, and merchants. Endless conversations among enthusiasts followed: gastronomy, oenology, and tasting.",
      "Those clients of yesterday are his peers today. Bound by friendship and a shared passion, they identify together the domaines and vintages to drink now — or to cellar for a later discovery. The trust Jean has built with suppliers over the years, and his expertise in the fine-wine market, remain the guarantee of quality and fair pricing.",
    ),
    pull_quote:
      "We do not sell wine. We extend invitations — and we keep our word.",
  }),
  slice("geography", {
    col_left_label: "Geography",
    col_left_head: "Why Bulgaria? Why Sofia?",
    col_left_body: p(
      "Sofia is a growing European capital with a sophisticated collector community and virtually no competition for what Bonneval offers. No luxury Burgundy specialist operates from here — we own this territory entirely.",
    ),
    col_right_label: "The advantage",
    col_right_head: "Outside the crowd",
    col_right_body: p(
      "London has dozens of fine wine merchants competing for the same allocations, the same clients, the same shelf space. Sofia has zero. Our domaines give us their undivided attention. Our clients receive ours.",
    ),
  }),
  slice("heritage_note", {
    eyebrow: "Great wines & great men",
    title: "The Pasha of Bonneval",
    body: p(
      "Claude Alexandre, Comte de Bonneval — officer, exile, and later Pasha of three tails in Constantinople — kept his finest Burgundy behind a library’s wire-mesh doors. When Casanova asked to see his books, the Pasha unlocked the cabinets and revealed rows of bottles instead.",
    ),
    pull_quote:
      "Here is my library and my harem; for, being old, women would shorten my life, while good wine can only preserve it — or at least make it more agreeable.",
    attribution: "Mémoires de Casanova",
    cta_label: null,
    cta_link: { link_type: "Any" },
  }),
  slice("heritage_note", {
    eyebrow: "Great wines & great men",
    title: "Napoléon and Chambertin",
    body: p(
      "Napoléon’s preference for Chambertin began in the Côte-d’Or. He drank a half-bottle at every meal on campaign; his aide-de-camp once kept the wine warm against his chest in the Russian winter so it could be served chambré at any moment.",
    ),
    pull_quote: null,
    attribution: null,
    cta_label: null,
    cta_link: { link_type: "Any" },
  }),
  slice("heritage_note", {
    eyebrow: "Great wines & great men",
    title: "Charlemagne and Corton",
    body: p(
      "To keep drinking Corton while sparing his white beard the stains of red wine, Charlemagne is said to have replanted part of the hill with white grapes — helping Chardonnay take hold on Aloxe.",
    ),
    pull_quote: null,
    attribution: null,
    cta_label: null,
    cta_link: { link_type: "Any" },
  }),
  slice("heritage_note", {
    eyebrow: "Great wines & great men",
    title: "Thomas Jefferson in Burgundy",
    body: p(
      "Before the 1855 classification, Jefferson rode through Bordeaux and Burgundy describing terroirs with a collector’s precision. Meursault and Montrachet were among his favourites; he even tried — in vain — to transplant vines to Monticello.",
    ),
    pull_quote: null,
    attribution: null,
    cta_label: null,
    cta_link: { link_type: "Any" },
  }),
  slice("heritage_note", {
    eyebrow: "Great wines & great men",
    title: "Churchill and Pol Roger",
    body: p(
      "Winston Churchill’s devotion to Pol Roger began in 1908 and deepened after he met Odette Pol-Roger in liberated Paris in 1944 — a friendship that lasted until the end of his life.",
    ),
    pull_quote:
      "I could not live without Champagne. In victory I deserve it; in defeat I need it.",
    attribution: "Winston Churchill",
    cta_label: null,
    cta_link: { link_type: "Any" },
  }),
];

const HOME_HERITAGE = slice("heritage_note", {
  eyebrow: "Great wines & great men",
  title: "The Pasha of Bonneval",
  body: p(
    "Claude Alexandre, Comte de Bonneval kept his finest Burgundy behind a library’s wire-mesh doors. When Casanova asked to see his books, the Pasha revealed rows of bottles instead — and both men laughed.",
  ),
  pull_quote:
    "Here is my library and my harem… good wine can only preserve my life — or at least make it more agreeable.",
  attribution: "Mémoires de Casanova",
  cta_label: "Read our history →",
  cta_link: web("/en-us/about"),
});

const MEMBERS_HERITAGE = slice("heritage_note", {
  eyebrow: "Great wines & great men",
  title: "Churchill and Pol Roger",
  body: p(
    "Churchill’s friendship with the house of Pol Roger — and with Odette Pol-Roger herself — turned champagne into something closer to a creed than a drink.",
    "We keep that spirit: a short list of houses, known well, offered with care — never as a wholesale market, always as a relationship.",
  ),
  pull_quote: "In victory I deserve it; in defeat I need it.",
  attribution: "Winston Churchill",
  cta_label: "Read our history →",
  cta_link: web("/en-us/about"),
});

const MEMBERS_SLICES = [
  slice("members_hero", {
    eyebrow: "Fine Wine Club",
    headline: h1("Not a shop.\nA private allocation."),
    body: p(
      "Bonneval operates as a private allocation club. Members receive curated offers from ten exclusive Burgundy domaines — delivered via WhatsApp, two to four times a month.",
      "There is no public retail and no open catalogue. We review every application against the stock we hold and the collector’s interest in our allocations. Only members purchase.",
    ),
  }),
  slice(
    "how_it_works",
    {
      eyebrow: "The process",
      headline: "How membership works",
    },
    [
      {
        number: "01",
        title: "Apply",
        body: p(
          "Submit an expression of interest. Tell us about your collection and what you seek. We review every request against current allocations — if the fit is uneven, we keep your details and return when the right wines arrive.",
        ),
      },
      {
        number: "02",
        title: "Welcome",
        body: p(
          "Accepted members receive a physical welcome package and a WhatsApp invitation from the founder — the channel where every offer begins.",
        ),
      },
      {
        number: "03",
        title: "Receive offers",
        body: p(
          "Two to four times monthly, new allocations arrive via WhatsApp with terroir context, provenance, transparent pricing, and a clear window to reply.",
        ),
      },
      {
        number: "04",
        title: "Build your cellar",
        body: p(
          "Purchase, store, or drink. Your collection grows with each vintage. Bonded storage is available for members who prefer to hold.",
        ),
      },
    ],
  ),
  slice(
    "membership_tiers",
    {
      eyebrow: "Membership",
      headline: "Two tiers, one circle",
      footnote:
        "Membership is conditioned to active annual participation. We do not sell wholesale access to the cellar.",
    },
    [
      {
        tier_name: "Premium Member",
        sub_label: "Standard membership",
        price_line: "From €750 annually",
        benefits: listItems(
          "Access to exclusive allocations before the general market, at professional prices",
          "Direct delivery to your home in Sofia — expanding soon",
          "WhatsApp offers with full provenance and terroir notes",
          "Invitations to private tastings in Sofia",
        ),
        is_featured: false,
        cta_label: "Request review",
      },
      {
        tier_name: "Golden Circle",
        sub_label: "Internal exclusive",
        price_line: "From €2,000 annually",
        benefits: listItems(
          "Priority access to our most exclusive allocations — often fewer than twelve bottles a year — before everyone else",
          "Private events in Sofia and vineyard visits made available each year",
          "Personal cellar advisory from the founder",
          "Reserved for our most active collectors, by engagement",
        ),
        is_featured: true,
        cta_label: "Apply for membership",
      },
    ],
  ),
  slice("whats_app_preview", {
    eyebrow: "How offers arrive",
    headline: "The allocation message",
    body: p(
      "Every offer is crafted with the same editorial care as the website: terroir-first storytelling, precise provenance, transparent pricing.",
      "Never a flash sale. Always a personal note from someone who has stood in that cellar — with a clear window to reply and reserve.",
    ),
    sample_wine_name: "Armand Rousseau — Gevrey-Chambertin 2020",
    sample_narrative: p(
      "An exceptional vintage from a legendary vigneron. Touches of blackcurrant and blueberry unusual in Pinot — precise, fragrant, and built to surprise every guest at the table. Only a handful of cases for members.",
    ),
    sample_price: "€420 / bottle · OC6 · 6 bottles max · 24 available",
    available_until: "Available for 36 hours",
  }),
  MEMBERS_HERITAGE,
  slice("application_form", {
    eyebrow: "Apply",
    headline: "Request an invitation",
    subline:
      "The curator will personally review every request and make sure we are the right fit.",
  }),
];

const CONTACT_HERITAGE = slice("heritage_note", {
  eyebrow: "Great wines & great men",
  title: "A cellar, not a catalogue",
  body: p(
    "Like the Pasha of Bonneval, we prefer a living library of bottles to a shop window. Tell us what you seek — we will answer personally.",
  ),
  pull_quote:
    "Good wine can only preserve my life — or at least make it more agreeable.",
  attribution: "The Pasha of Bonneval",
  cta_label: null,
  cta_link: { link_type: "Any" },
});

const NAV_LINKS = [
  { label: "The Wines", link: web("/en-us/wines") },
  { label: "Our Domaines", link: web("/en-us/domaines") },
  { label: "Members", link: web("/en-us/members") },
  { label: "Our History", link: web("/en-us/about") },
  { label: "Contact", link: web("/en-us/contact") },
];

function pageData(title, slices, meta) {
  return {
    title: h1(title),
    slices,
    meta_title: meta.title,
    meta_description: meta.description,
  };
}

// ---------------------------------------------------------------------------
// Migration helpers
// ---------------------------------------------------------------------------

async function migrate(method, path, body, label) {
  if (DRY_RUN) {
    const slices = body?.data?.slices?.map((s) => s.slice_type) ?? [];
    console.log(`[dry-run] ${method} ${label}`);
    if (body?.uid) console.log(`  uid: ${body.uid}`);
    if (slices.length) console.log(`  slices: ${slices.join(", ")}`);
    return { id: `dry:${label}` };
  }

  console.log(`→ ${method} ${path || "/"} (${label})`);
  const res = await fetch(`${MIGRATION}${path}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }

  if (!res.ok) {
    console.error(`  FAIL ${res.status}`, JSON.stringify(json));
    const err = new Error(`${method} ${label} failed: ${res.status}`);
    err.status = res.status;
    err.body = json;
    throw err;
  }

  console.log(`  OK ${res.status}${json?.id ? ` id=${json.id}` : ""}`);
  await sleep(method === "POST" ? 2000 : 1200);
  return json;
}

async function lookupIds() {
  const ids = {};
  if (!PRISMIC_ACCESS_TOKEN) {
    console.log(
      "No PRISMIC_ACCESS_TOKEN — will POST new docs; existing UIDs may need PUT with known IDs.",
    );
    return ids;
  }

  const client = createClient(PRISMIC_REPO, {
    accessToken: PRISMIC_ACCESS_TOKEN,
  });

  try {
    const pages = await client.getAllByType("page", { lang: LANG });
    for (const page of pages) {
      ids[`page:${page.uid}`] = page.id;
    }
    console.log(
      `Content API: found ${pages.length} page(s):`,
      pages.map((p) => p.uid).join(", "),
    );
  } catch (e) {
    console.warn("Content API page lookup failed:", e.message);
  }

  try {
    const layout = await client.getSingle("layout", { lang: LANG });
    ids.layout = layout.id;
    ids.layoutData = layout.data;
    console.log(`Content API: layout id=${layout.id}`);
  } catch (e) {
    console.warn("Content API layout lookup failed:", e.message);
  }

  return ids;
}

async function upsertPage({ uid, title, data, existingId, cache }) {
  if (existingId) {
    const res = await migrate(
      "PUT",
      `/${existingId}/`,
      { title, uid, data },
      uid,
    );
    cache[`page:${uid}`] = existingId;
    saveDocIds(cache);
    return res;
  }

  try {
    const res = await migrate(
      "POST",
      "",
      { type: "page", uid, title, lang: LANG, data },
      uid,
    );
    if (res?.id) {
      cache[`page:${uid}`] = res.id;
      saveDocIds(cache);
    }
    return res;
  } catch (e) {
    if (e.status === 409 || e.status === 400) {
      console.warn(
        `  SKIP "${uid}" — already exists. Add PRISMIC_ACCESS_TOKEN and re-run to PUT-update.`,
      );
      return null;
    }
    throw e;
  }
}

function insertHeritage(slices, heritage) {
  if (!Array.isArray(slices)) return [heritage];
  if (slices.some((s) => s.slice_type === "heritage_note")) return slices;
  const insertAt = slices.findIndex((s) =>
    ["bottom_contact_cta", "application_form", "contact_blocks"].includes(
      s.slice_type,
    ),
  );
  if (insertAt === -1) return [...slices, heritage];
  return [...slices.slice(0, insertAt), heritage, ...slices.slice(insertAt)];
}

function pointDomainesCta(slices) {
  if (!Array.isArray(slices)) return slices;
  return slices.map((s) => {
    if (s.slice_type !== "domaines_grid") return s;
    return {
      ...s,
      primary: {
        ...s.primary,
        cta_label: s.primary?.cta_label || "Explore all domaines",
        cta_link: web("/en-us/domaines"),
      },
    };
  });
}

/** Drop image field payloads so Migration API does not reject missing asset IDs. */
function stripImages(value) {
  if (Array.isArray(value)) return value.map(stripImages);
  if (!value || typeof value !== "object") return value;

  // Prismic image field shape
  if (
    "dimensions" in value ||
    ("id" in value && ("url" in value || "edit" in value))
  ) {
    return {};
  }

  const out = {};
  for (const [key, child] of Object.entries(value)) {
    if (
      key === "meta_image" ||
      key.endsWith("_image") ||
      key.endsWith("_logo") ||
      key === "bottle_image" ||
      key === "card_image" ||
      key === "archival_image" ||
      key === "background_image" ||
      key === "header_logo" ||
      key === "footer_logo"
    ) {
      out[key] = {};
      continue;
    }
    out[key] = stripImages(child);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(
    DRY_RUN
      ? "Dry run — no writes"
      : `Seeding ${PRISMIC_REPO} via Migration API${MEMBERS_ONLY ? " (members only)" : ""}…`,
  );

  const cache = loadDocIds();
  const ids = DRY_RUN ? { ...cache } : { ...cache, ...(await lookupIds()) };
  console.log("Known doc ids:", Object.keys(ids).filter(k => k.startsWith("page:") || k === "layout").join(", ") || "(none)");

  const failures = [];

  // Members — always full replace with complete page content
  try {
    await upsertPage({
      uid: "members",
      title: "Member's Club",
      existingId: ids["page:members"],
      cache,
      data: pageData("Member's Club", MEMBERS_SLICES, {
        title: "Member's Club | Bonneval Fine Wines",
        description:
          "Private allocation membership with Bonneval Fine Wines — WhatsApp offers from ten Burgundy domaines.",
      }),
    });
  } catch (e) {
    console.error(e.message);
    failures.push("members");
  }

  if (MEMBERS_ONLY) {
    if (failures.length) console.warn("Failures:", failures.join(", "));
    console.log(`
Done (members only).
Next: open https://${PRISMIC_REPO}.prismic.io → Migration Releases → review → Publish.
`);
    return;
  }

  // 1) Core pages
  for (const job of [
    {
      uid: "wines",
      title: "The Wines",
      data: pageData("The Wines", WINES_SLICES, {
        title: "The Wines | Bonneval Fine Wines",
        description:
          "A living cellar of Burgundy, Champagne, Rhône, and Bordeaux — request our current tariff.",
      }),
    },
    {
      uid: "domaines",
      title: "Our Domaines",
      data: pageData("Our Domaines", DOMAINES_SLICES, {
        title: "Our Domaines | Bonneval Fine Wines",
        description:
          "Ten Burgundy domaines — place, family, and our relationship with each house.",
      }),
    },
    {
      uid: "about",
      title: "Our History",
      data: pageData("Our History", ABOUT_SLICES, {
        title: "Our History | Bonneval Fine Wines",
        description:
          "The mission and story of Bonneval Fine Wines — formerly Bon Château.",
      }),
    },
  ]) {
    try {
      await upsertPage({
        ...job,
        existingId: ids[`page:${job.uid}`],
        cache,
      });
    } catch (e) {
      console.error(e.message);
      failures.push(job.uid);
    }
  }

  // 2) Contact (minimal if missing; sprinkle heritage if present)
  {
    const uid = "contact";
    const title = "Contact";
    const heritage = CONTACT_HERITAGE;
    const meta = {
      title: "Contact | Bonneval Fine Wines",
      description: "Begin the conversation with Bonneval Fine Wines.",
    };
    const existingId = ids[`page:${uid}`];
    const baseSlices = [
      slice("members_hero", {
        eyebrow: "Contact",
        headline: h1("Begin the\nconversation."),
        body: p(
          "Personal contact is preferred. Tell us what you seek — we will answer with care.",
        ),
      }),
      heritage,
      slice("bottom_contact_cta", {
        eyebrow: "Private allocations",
        headline: "Request a callback",
        body: p(
          "Leave your details and a preferred time. We will be in touch.",
        ),
        submit_label: "Request a callback",
      }),
    ];

    if (existingId && PRISMIC_ACCESS_TOKEN) {
      try {
        const client = createClient(PRISMIC_REPO, {
          accessToken: PRISMIC_ACCESS_TOKEN,
        });
        const doc = await client.getByUID("page", uid, { lang: LANG });
        const slices = insertHeritage(doc.data.slices, heritage);
        await migrate(
          "PUT",
          `/${existingId}/`,
          {
            title,
            uid,
            data: {
              ...doc.data,
              title: doc.data.title?.length ? doc.data.title : h1(title),
              slices,
              meta_title: doc.data.meta_title || meta.title,
              meta_description: doc.data.meta_description || meta.description,
            },
          },
          `${uid} (+heritage)`,
        );
      } catch (e) {
        console.warn(`  Merge failed for ${uid}, falling back to full replace.`);
        try {
          await upsertPage({
            uid,
            title,
            existingId,
            cache,
            data: pageData(title, baseSlices, meta),
          });
        } catch (e2) {
          console.error(e2.message);
          failures.push(uid);
        }
      }
    } else {
      try {
        await upsertPage({
          uid,
          title,
          existingId,
          cache,
          data: pageData(title, baseSlices, meta),
        });
      } catch (e) {
        console.error(e.message);
        failures.push(uid);
      }
    }
  }

  // 3) Home — heritage sprinkle + domaines CTA
  if (ids["page:home"] && PRISMIC_ACCESS_TOKEN) {
    try {
      const client = createClient(PRISMIC_REPO, {
        accessToken: PRISMIC_ACCESS_TOKEN,
      });
      const home = await client.getByUID("page", "home", { lang: LANG });
      let slices = insertHeritage(home.data.slices, HOME_HERITAGE);
      slices = pointDomainesCta(slices);
      const data = stripImages({
        title: home.data.title?.length ? home.data.title : h1("Home"),
        slices,
        meta_title: home.data.meta_title || "Bonneval Fine Wines",
        meta_description: home.data.meta_description || "",
      });
      await migrate(
        "PUT",
        `/${ids["page:home"]}/`,
        { title: "Home", uid: "home", data },
        "home (+heritage, domaines CTA)",
      );
    } catch (e) {
      console.error(e.message);
      failures.push("home");
    }
  } else {
    console.log(
      "Skipping home update (need existing home id + PRISMIC_ACCESS_TOKEN).",
    );
  }

  // 4) Layout nav + footer
  if (ids.layout) {
    try {
      const prev = ids.layoutData || {};
      await migrate(
        "PUT",
        `/${ids.layout}/`,
        {
          title: "Site settings",
          data: stripImages({
            site_title: prev.site_title || "Bonneval Fine Wines",
            site_description:
              prev.site_description ||
              "Sofia's sole gateway to ten of Burgundy's most revered domaines.",
            nav_links: NAV_LINKS,
            footer_links: NAV_LINKS,
            email: prev.email || "jean@bonnevalfinewines.com",
            phone: prev.phone || null,
            address: prev.address || null,
          }),
        },
        "layout (nav)",
      );
    } catch (e) {
      console.error(e.message);
      failures.push("layout");
    }
  } else if (!DRY_RUN) {
    try {
      await migrate(
        "POST",
        "",
        {
          type: "layout",
          title: "Site settings",
          lang: LANG,
          data: {
            site_title: "Bonneval Fine Wines",
            site_description:
              "Sofia's sole gateway to ten of Burgundy's most revered domaines.",
            nav_links: NAV_LINKS,
            footer_links: NAV_LINKS,
            email: "jean@bonnevalfinewines.com",
          },
        },
        "layout (create)",
      );
    } catch (e) {
      console.warn(
        "Could not create layout singleton — update nav manually or set PRISMIC_ACCESS_TOKEN.",
      );
    }
  } else {
    console.log("[dry-run] layout nav_links →", NAV_LINKS.map((n) => n.label).join(", "));
  }

  if (failures.length) {
    console.warn("Failures:", failures.join(", "));
  }

  console.log(`
Done.
Next: open https://${PRISMIC_REPO}.prismic.io → Migration Releases → review → Publish.
`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
