import type { Content } from "@prismicio/client";

type AnySlice = Content.PageDocumentData["slices"][number];

function rt(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    type: "paragraph" as const,
    text,
    spans: [],
  }));
}

function h1(lines: string[]) {
  return [
    {
      type: "heading1" as const,
      text: lines.join("\n"),
      spans: [],
    },
  ];
}

function sliceBase(id: string, slice_type: string) {
  return {
    id,
    slice_type,
    slice_label: null,
    variation: "default" as const,
    version: "initial",
    items: [],
  };
}

function membersHero(
  id: string,
  primary: {
    eyebrow: string;
    headline: string[];
    body: string[];
  },
): AnySlice {
  return {
    ...sliceBase(id, "members_hero"),
    primary: {
      eyebrow: primary.eyebrow,
      headline: h1(primary.headline),
      body: rt(primary.body),
    },
  } as AnySlice;
}

function featuredWine(
  id: string,
  primary: {
    label: string;
    collection_tag: string;
    domaine_name: string;
    wine_name: string;
    narrative: string[];
    availability: "Available now" | "Allocation only" | "Pre-arrival";
    cta_label: string;
  },
): AnySlice {
  return {
    ...sliceBase(id, "featured_wine"),
    primary: {
      label: primary.label,
      bottle_image: {},
      collection_tag: primary.collection_tag,
      domaine_name: primary.domaine_name,
      wine_name: primary.wine_name,
      narrative: rt(primary.narrative),
      availability: primary.availability,
      cta_label: primary.cta_label,
      cta_link: {
        link_type: "Web",
        url: "/en-us/contact",
      },
    },
  } as AnySlice;
}

function heritageNote(
  id: string,
  primary: {
    eyebrow: string;
    title: string;
    body: string[];
    pull_quote?: string;
    attribution?: string;
    cta_label?: string;
    cta_url?: string;
  },
): AnySlice {
  return {
    ...sliceBase(id, "heritage_note"),
    primary: {
      eyebrow: primary.eyebrow,
      title: primary.title,
      body: rt(primary.body),
      pull_quote: primary.pull_quote || null,
      attribution: primary.attribution || null,
      cta_label: primary.cta_label || null,
      cta_link: primary.cta_url
        ? { link_type: "Web", url: primary.cta_url }
        : { link_type: "Any" },
    },
  } as AnySlice;
}

function originStory(
  id: string,
  primary: {
    eyebrow: string;
    headline: string[];
    body: string[];
    pull_quote?: string;
  },
): AnySlice {
  return {
    ...sliceBase(id, "origin_story"),
    primary: {
      eyebrow: primary.eyebrow,
      archival_image: {},
      image_position: false,
      headline: h1(primary.headline),
      body: rt(primary.body),
      pull_quote: primary.pull_quote || null,
    },
  } as AnySlice;
}

function geography(
  id: string,
  primary: {
    col_left_label: string;
    col_left_head: string;
    col_left_body: string[];
    col_right_label: string;
    col_right_head: string;
    col_right_body: string[];
  },
): AnySlice {
  return {
    ...sliceBase(id, "geography"),
    primary: {
      col_left_label: primary.col_left_label,
      col_left_head: primary.col_left_head,
      col_left_body: rt(primary.col_left_body),
      col_right_label: primary.col_right_label,
      col_right_head: primary.col_right_head,
      col_right_body: rt(primary.col_right_body),
    },
  } as AnySlice;
}

function domainesList(
  id: string,
  primary: { eyebrow: string; headline: string; source: "Manual" | "All domaines" },
): AnySlice {
  return {
    ...sliceBase(id, "domaines_list"),
    primary: {
      eyebrow: primary.eyebrow,
      headline: primary.headline,
      source: primary.source,
    },
  } as AnySlice;
}

function bottomContactCta(
  id: string,
  primary: { eyebrow: string; headline: string; body: string[] },
): AnySlice {
  return {
    ...sliceBase(id, "bottom_contact_cta"),
    primary: {
      eyebrow: primary.eyebrow,
      headline: primary.headline,
      body: rt(primary.body),
      submit_label: "Request our tariff",
    },
  } as AnySlice;
}

export const WINES_DEFAULT_SLICES: AnySlice[] = [
  membersHero("default-wines-hero", {
    eyebrow: "The cellar",
    headline: ["Not a shop.", "A living cellar."],
    body: [
      "Bonneval Fine Wines holds nearly 15,000 bottles — among them some of the rarest from Burgundy, Champagne, the Rhône Valley, and Bordeaux — in a dedicated, climate-controlled warehouse.",
      "We source from domaines, négociants, and merchants who meet the same standards of provenance and care. Stocks are often limited and constantly moving, so we do not sell online.",
      "To receive our current tariff, please get in touch.",
    ],
  }),
  featuredWine("default-wines-fw-1", {
    label: "Featured selection",
    collection_tag: "Collection 2024",
    domaine_name: "Armand Rousseau",
    wine_name: "Gevrey-Chambertin Clos St-Jacques 2021",
    narrative: [
      "From the steep east-facing slope of Clos Saint-Jacques, where Charles Rousseau tends vines his father planted in 1954. The limestone soils here are thinner than in the village — roots descend two metres into Bathonian rock. Three hundred cases produced. We hold forty-eight.",
    ],
    availability: "Allocation only",
    cta_label: "Request allocation",
  }),
  featuredWine("default-wines-fw-2", {
    label: "Past selection",
    collection_tag: "Collection 2023",
    domaine_name: "Domaine Leflaive",
    wine_name: "Puligny-Montrachet Les Pucelles 2020",
    narrative: [
      "Les Pucelles sits on the mid-slope of Puligny, where Bathonian limestone and a gentle eastern exposure give white Burgundy its most precise voice. Leflaive’s biodynamic farming and patient élevage yield a wine of quiet authority — reserved for members who ask.",
    ],
    availability: "Pre-arrival",
    cta_label: "Enquire",
  }),
  featuredWine("default-wines-fw-3", {
    label: "Past selection",
    collection_tag: "Collection 2023",
    domaine_name: "Georges Roumier",
    wine_name: "Chambolle-Musigny Les Amoureuses 2019",
    narrative: [
      "Les Amoureuses is the most coveted premier cru in Chambolle — weightless, aromatic, and impossibly fine. Roumier’s old vines and whole-bunch instinct make every bottle a study in perfume and length.",
    ],
    availability: "Allocation only",
    cta_label: "Request allocation",
  }),
  heritageNote("default-wines-heritage", {
    eyebrow: "Great wines & great men",
    title: "Napoléon and Chambertin",
    body: [
      "As a young artillery officer in the Côte-d’Or, Napoléon formed a lifelong preference for Chambertin. By 1798 he was rarely unfaithful to it — save, occasionally, for a coupe of champagne.",
      "He took Burgundy across the desert to Egypt and drank a half-bottle at every meal on campaign. One story claims Waterloo was lost for want of his morning glass; the English preferred another version entirely.",
    ],
    pull_quote: "Chambertin should be obligatory.",
    attribution: "Bonneval archive",
    cta_label: "Read our history →",
    cta_url: "/en-us/about",
  }),
  bottomContactCta("default-wines-cta", {
    eyebrow: "Private allocations",
    headline: "Request our current tariff",
    body: [
      "Leave your details and we will send an up-to-date list. Stocks move quickly; what is available today may not be tomorrow.",
    ],
  }),
];

export const DOMAINES_DEFAULT_SLICES: AnySlice[] = [
  membersHero("default-domaines-hero", {
    eyebrow: "Our domaines",
    headline: ["The houses", "of Bonneval."],
    body: [
      "Ten Burgundy domaines chosen for the land they farm and the families who farm it. Explore each house — place, lineage, and our relationship — then request allocation through membership.",
    ],
  }),
  domainesList("default-domaines-list", {
    eyebrow: "The portfolio",
    headline: "All domaines",
    source: "All domaines",
  }),
  heritageNote("default-domaines-heritage", {
    eyebrow: "Great wines & great men",
    title: "Charlemagne and Corton",
    body: [
      "Charlemagne kept a close eye on his vineyards and cellars. His favoured red came from the hill of Corton — until, legend says, the stains on his white beard persuaded his wife to urge him toward white wine instead.",
      "To please her and keep drinking Corton, he replanted part of the slope with white grapes — and so Chardonnay took root on the lands of Aloxe.",
    ],
    cta_label: "Read our history →",
    cta_url: "/en-us/about",
  }),
];

export const ABOUT_DEFAULT_SLICES: AnySlice[] = [
  originStory("default-about-mission", {
    eyebrow: "Our mission",
    headline: [
      "A family négociant,",
      "a cellar of rare wines,",
      "and relationships built",
      "over decades.",
    ],
    body: [
      "Bonneval Fine Wines — formerly Bon Château — is a family négociant with a cellar of nearly 15,000 bottles, including some of the rarest from Burgundy, Champagne, the Rhône Valley, and Bordeaux. These wines are carefully held in a dedicated, climate-controlled warehouse.",
      "We source from a wide circle of domaines, négociants, and merchants who meet the same standards of provenance and care. Since 2009, more than two hundred négociants, cavistes, and serious private collectors have placed their trust in us.",
      "Our website does not offer online sales: stocks are often limited and constantly moving. To receive our current tariff, please complete the contact form.",
    ],
  }),
  originStory("default-about-founder", {
    eyebrow: "The founder",
    headline: ["Jean de Bonneval"],
    body: [
      "Jean de Bonneval is the CEO and founder of the family company behind Bonneval Fine Wines. With more than twenty years in the confidential world of fine wine, he established the business in 2009 after travelling the roads of France for some of the greatest houses.",
      "Under the aegis of the Domaines Lafite Rothschild distributor, then the prestigious Champagne house Philipponnat, Jean met the cavistes who still shape the trade. Along the way he stopped at the finest tables — often starred — in the company of vignerons, sommeliers, and merchants. Endless conversations among enthusiasts followed: gastronomy, oenology, and tasting.",
      "Those clients of yesterday are his peers today. Bound by friendship and a shared passion, they identify together the domaines and vintages to drink now — or to cellar for a later discovery. The trust Jean has built with suppliers over the years, and his expertise in the fine-wine market, remain the guarantee of quality and fair pricing.",
    ],
    pull_quote:
      "We do not sell wine. We extend invitations — and we keep our word.",
  }),
  geography("default-about-geography", {
    col_left_label: "Geography",
    col_left_head: "Why Bulgaria? Why Sofia?",
    col_left_body: [
      "Sofia is a growing European capital with a sophisticated collector community and virtually no competition for what Bonneval offers. No luxury Burgundy specialist operates from here — we own this territory entirely.",
    ],
    col_right_label: "The advantage",
    col_right_head: "Outside the crowd",
    col_right_body: [
      "London has dozens of fine wine merchants competing for the same allocations, the same clients, the same shelf space. Sofia has zero. Our domaines give us their undivided attention. Our clients receive ours.",
    ],
  }),
  heritageNote("default-about-pasha", {
    eyebrow: "Great wines & great men",
    title: "The Pasha of Bonneval",
    body: [
      "Claude Alexandre, Comte de Bonneval — officer, exile, and later Pasha of three tails in Constantinople — kept his finest Burgundy behind a library’s wire-mesh doors. When Casanova asked to see his books, the Pasha unlocked the cabinets and revealed rows of bottles instead.",
    ],
    pull_quote:
      "Here is my library and my harem; for, being old, women would shorten my life, while good wine can only preserve it — or at least make it more agreeable.",
    attribution: "Mémoires de Casanova",
  }),
  heritageNote("default-about-napoleon", {
    eyebrow: "Great wines & great men",
    title: "Napoléon and Chambertin",
    body: [
      "Napoléon’s preference for Chambertin began in the Côte-d’Or. He drank a half-bottle at every meal on campaign; his aide-de-camp once kept the wine warm against his chest in the Russian winter so it could be served chambré at any moment.",
    ],
  }),
  heritageNote("default-about-charlemagne", {
    eyebrow: "Great wines & great men",
    title: "Charlemagne and Corton",
    body: [
      "To keep drinking Corton while sparing his white beard the stains of red wine, Charlemagne is said to have replanted part of the hill with white grapes — helping Chardonnay take hold on Aloxe.",
    ],
  }),
  heritageNote("default-about-jefferson", {
    eyebrow: "Great wines & great men",
    title: "Thomas Jefferson in Burgundy",
    body: [
      "Before the 1855 classification, Jefferson rode through Bordeaux and Burgundy describing terroirs with a collector’s precision. Meursault and Montrachet were among his favourites; he even tried — in vain — to transplant vines to Monticello.",
    ],
  }),
  heritageNote("default-about-churchill", {
    eyebrow: "Great wines & great men",
    title: "Churchill and Pol Roger",
    body: [
      "Winston Churchill’s devotion to Pol Roger began in 1908 and deepened after he met Odette Pol-Roger in liberated Paris in 1944 — a friendship that lasted until the end of his life.",
    ],
    pull_quote:
      "I could not live without Champagne. In victory I deserve it; in defeat I need it.",
    attribution: "Winston Churchill",
  }),
];

export const HOME_HERITAGE_DEFAULT: AnySlice = heritageNote(
  "default-home-heritage",
  {
    eyebrow: "Great wines & great men",
    title: "The Pasha of Bonneval",
    body: [
      "Claude Alexandre, Comte de Bonneval kept his finest Burgundy behind a library’s wire-mesh doors. When Casanova asked to see his books, the Pasha revealed rows of bottles instead — and both men laughed.",
    ],
    pull_quote:
      "Here is my library and my harem… good wine can only preserve my life — or at least make it more agreeable.",
    attribution: "Mémoires de Casanova",
    cta_label: "Read our history →",
    cta_url: "/en-us/about",
  },
);

export const MEMBERS_HERITAGE_DEFAULT: AnySlice = heritageNote(
  "default-members-heritage",
  {
    eyebrow: "Great wines & great men",
    title: "Churchill and Pol Roger",
    body: [
      "Churchill’s friendship with the house of Pol Roger — and with Odette Pol-Roger herself — turned champagne into something closer to a creed than a drink.",
      "We keep that spirit: a short list of houses, known well, offered with care — never as a wholesale market, always as a relationship.",
    ],
    pull_quote:
      "In victory I deserve it; in defeat I need it.",
    attribution: "Winston Churchill",
    cta_label: "Read our history →",
    cta_url: "/en-us/about",
  },
);

export const CONTACT_HERITAGE_DEFAULT: AnySlice = heritageNote(
  "default-contact-heritage",
  {
    eyebrow: "Great wines & great men",
    title: "A cellar, not a catalogue",
    body: [
      "Like the Pasha of Bonneval, we prefer a living library of bottles to a shop window. Tell us what you seek — we will answer personally.",
    ],
    pull_quote:
      "Good wine can only preserve my life — or at least make it more agreeable.",
    attribution: "The Pasha of Bonneval",
  },
);

export const MEMBERS_DEFAULT_SLICES: AnySlice[] = [
  membersHero("default-members-hero", {
    eyebrow: "Fine Wine Club",
    headline: ["Not a shop.", "A private allocation."],
    body: [
      "Bonneval operates as a private allocation club. Members receive curated offers from ten exclusive Burgundy domaines — delivered via WhatsApp, two to four times a month.",
      "There is no public retail and no open catalogue. We review every application against the stock we hold and the collector’s interest in our allocations. Only members purchase.",
    ],
  }),
  {
    ...sliceBase("default-members-how", "how_it_works"),
    primary: {
      eyebrow: "The process",
      headline: "How membership works",
    },
    items: [
      {
        number: "01",
        title: "Apply",
        body: rt([
          "Submit an expression of interest. Tell us about your collection and what you seek. We review every request against current allocations — if the fit is uneven, we keep your details and return when the right wines arrive.",
        ]),
      },
      {
        number: "02",
        title: "Welcome",
        body: rt([
          "Accepted members receive a physical welcome package and a WhatsApp invitation from the founder — the channel where every offer begins.",
        ]),
      },
      {
        number: "03",
        title: "Receive offers",
        body: rt([
          "Two to four times monthly, new allocations arrive via WhatsApp with terroir context, provenance, transparent pricing, and a clear window to reply.",
        ]),
      },
      {
        number: "04",
        title: "Build your cellar",
        body: rt([
          "Purchase, store, or drink. Your collection grows with each vintage. Bonded storage is available for members who prefer to hold.",
        ]),
      },
    ],
  } as AnySlice,
  {
    ...sliceBase("default-members-tiers", "membership_tiers"),
    primary: {
      eyebrow: "Membership",
      headline: "Two tiers, one circle",
      footnote:
        "Membership is conditioned to active annual participation. We do not sell wholesale access to the cellar.",
    },
    items: [
      {
        tier_name: "Premium Member",
        sub_label: "Standard membership",
        price_line: "From €750 annually",
        benefits: [
          {
            type: "list-item" as const,
            text: "Access to exclusive allocations before the general market, at professional prices",
            spans: [],
          },
          {
            type: "list-item" as const,
            text: "Direct delivery to your home in Sofia — expanding soon",
            spans: [],
          },
          {
            type: "list-item" as const,
            text: "WhatsApp offers with full provenance and terroir notes",
            spans: [],
          },
          {
            type: "list-item" as const,
            text: "Invitations to private tastings in Sofia",
            spans: [],
          },
        ],
        is_featured: false,
        cta_label: "Request review",
      },
      {
        tier_name: "Golden Circle",
        sub_label: "Internal exclusive",
        price_line: "From €2,000 annually",
        benefits: [
          {
            type: "list-item" as const,
            text: "Priority access to our most exclusive allocations — often fewer than twelve bottles a year — before everyone else",
            spans: [],
          },
          {
            type: "list-item" as const,
            text: "Private events in Sofia and vineyard visits made available each year",
            spans: [],
          },
          {
            type: "list-item" as const,
            text: "Personal cellar advisory from the founder",
            spans: [],
          },
          {
            type: "list-item" as const,
            text: "Reserved for our most active collectors, by engagement",
            spans: [],
          },
        ],
        is_featured: true,
        cta_label: "Apply for membership",
      },
    ],
  } as AnySlice,
  {
    ...sliceBase("default-members-whatsapp", "whats_app_preview"),
    primary: {
      eyebrow: "How offers arrive",
      headline: "The allocation message",
      body: rt([
        "Every offer is crafted with the same editorial care as the website: terroir-first storytelling, precise provenance, transparent pricing.",
        "Never a flash sale. Always a personal note from someone who has stood in that cellar — with a clear window to reply and reserve.",
      ]),
      sample_wine_name: "Armand Rousseau — Gevrey-Chambertin 2020",
      sample_narrative: rt([
        "An exceptional vintage from a legendary vigneron. Touches of blackcurrant and blueberry unusual in Pinot — precise, fragrant, and built to surprise every guest at the table. Only a handful of cases for members.",
      ]),
      sample_price: "€420 / bottle · OC6 · 6 bottles max · 24 available",
      available_until: "Available for 36 hours",
    },
  } as AnySlice,
  MEMBERS_HERITAGE_DEFAULT,
  {
    ...sliceBase("default-members-form", "application_form"),
    primary: {
      eyebrow: "Apply",
      headline: "Request an invitation",
      subline:
        "The curator will personally review every request and make sure we are the right fit.",
    },
  } as AnySlice,
];

export const CONTACT_DEFAULT_SLICES: AnySlice[] = [
  membersHero("default-contact-hero", {
    eyebrow: "Contact",
    headline: ["Begin the", "conversation."],
    body: [
      "Personal contact is preferred. Tell us what you seek — we will answer with care.",
    ],
  }),
  CONTACT_HERITAGE_DEFAULT,
  bottomContactCta("default-contact-cta", {
    eyebrow: "Private allocations",
    headline: "Request a callback",
    body: [
      "Leave your details and a preferred time. We will be in touch.",
    ],
  }),
];

export function slicesOrDefault(
  slices: Content.PageDocumentData["slices"] | undefined,
  defaults: AnySlice[],
): AnySlice[] {
  if (slices && slices.length > 0) return slices;
  return defaults;
}

export function ensureHeritageSprinkle(
  slices: AnySlice[],
  heritage: AnySlice,
): AnySlice[] {
  if (slices.some((s) => s.slice_type === "heritage_note")) return slices;
  // Insert before bottom_contact_cta / application_form when present
  const insertAt = slices.findIndex((s) =>
    ["bottom_contact_cta", "application_form", "contact_blocks"].includes(
      s.slice_type,
    ),
  );
  if (insertAt === -1) return [...slices, heritage];
  return [...slices.slice(0, insertAt), heritage, ...slices.slice(insertAt)];
}
