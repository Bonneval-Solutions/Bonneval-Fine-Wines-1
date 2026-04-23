import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

// ── Domaine Custom Type ──────────────────────────────────────────────────

interface DomaineDocumentData {
  name: prismic.KeyTextField;
  appellation: prismic.KeyTextField;
  color: prismic.SelectField<"rouge" | "blanc">;
  descriptor: prismic.KeyTextField;
  hero_image: prismic.ImageField<"card">;
  the_place: prismic.RichTextField;
  the_family: prismic.RichTextField;
  our_relationship: prismic.RichTextField;
  pull_quote_fr: prismic.KeyTextField;
  pull_quote_en: prismic.KeyTextField;
  meta_title: prismic.KeyTextField;
  meta_description: prismic.KeyTextField;
  meta_image: prismic.ImageField<never>;
}

export type DomaineDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<DomaineDocumentData>, "domaine", Lang>;

// ── Slice Types ──────────────────────────────────────────────────────────

// ThreeColumnFeatures
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ThreeColumnFeaturesSliceDefaultPrimary {}
interface ThreeColumnFeaturesSliceDefaultItem {
  icon_glyph: prismic.KeyTextField;
  body: prismic.RichTextField;
}
type ThreeColumnFeaturesSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<ThreeColumnFeaturesSliceDefaultPrimary>,
  Simplify<ThreeColumnFeaturesSliceDefaultItem>
>;
export type ThreeColumnFeaturesSlice = prismic.SharedSlice<
  "three_column_features",
  ThreeColumnFeaturesSliceDefault
>;

// FeaturedWine
interface FeaturedWineSliceDefaultPrimary {
  label: prismic.KeyTextField;
  bottle_image: prismic.ImageField<never>;
  collection_tag: prismic.KeyTextField;
  domaine_name: prismic.KeyTextField;
  wine_name: prismic.KeyTextField;
  narrative: prismic.RichTextField;
  availability: prismic.SelectField<"Available now" | "Allocation only" | "Pre-arrival">;
  cta_label: prismic.KeyTextField;
  cta_link: prismic.LinkField;
}
type FeaturedWineSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<FeaturedWineSliceDefaultPrimary>,
  never
>;
export type FeaturedWineSlice = prismic.SharedSlice<
  "featured_wine",
  FeaturedWineSliceDefault
>;

// DomainesGrid
interface DomainesGridSliceDefaultPrimary {
  eyebrow: prismic.KeyTextField;
  headline: prismic.KeyTextField;
  cta_label: prismic.KeyTextField;
  cta_link: prismic.LinkField;
}
interface DomainesGridSliceDefaultItem {
  domaine: prismic.LinkField;
  card_image: prismic.ImageField<never>;
}
type DomainesGridSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<DomainesGridSliceDefaultPrimary>,
  Simplify<DomainesGridSliceDefaultItem>
>;
export type DomainesGridSlice = prismic.SharedSlice<
  "domaines_grid",
  DomainesGridSliceDefault
>;

// MembersTeaser
interface MembersTeaserSliceDefaultPrimary {
  eyebrow: prismic.KeyTextField;
  headline: prismic.RichTextField;
  body: prismic.RichTextField;
  cta_label: prismic.KeyTextField;
  cta_link: prismic.LinkField;
}
type MembersTeaserSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<MembersTeaserSliceDefaultPrimary>,
  never
>;
export type MembersTeaserSlice = prismic.SharedSlice<
  "members_teaser",
  MembersTeaserSliceDefault
>;

// MembersHero
interface MembersHeroSliceDefaultPrimary {
  eyebrow: prismic.KeyTextField;
  headline: prismic.RichTextField;
  body: prismic.RichTextField;
}
type MembersHeroSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<MembersHeroSliceDefaultPrimary>,
  never
>;
export type MembersHeroSlice = prismic.SharedSlice<
  "members_hero",
  MembersHeroSliceDefault
>;

// HowItWorks
interface HowItWorksSliceDefaultPrimary {
  eyebrow: prismic.KeyTextField;
  headline: prismic.KeyTextField;
}
interface HowItWorksSliceDefaultItem {
  number: prismic.KeyTextField;
  title: prismic.KeyTextField;
  body: prismic.RichTextField;
}
type HowItWorksSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<HowItWorksSliceDefaultPrimary>,
  Simplify<HowItWorksSliceDefaultItem>
>;
export type HowItWorksSlice = prismic.SharedSlice<
  "how_it_works",
  HowItWorksSliceDefault
>;

// MembershipTiers
interface MembershipTiersSliceDefaultPrimary {
  eyebrow: prismic.KeyTextField;
  headline: prismic.KeyTextField;
  footnote: prismic.KeyTextField;
}
interface MembershipTiersSliceDefaultItem {
  tier_name: prismic.KeyTextField;
  sub_label: prismic.KeyTextField;
  price_line: prismic.KeyTextField;
  benefits: prismic.RichTextField;
  is_featured: prismic.BooleanField;
  cta_label: prismic.KeyTextField;
}
type MembershipTiersSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<MembershipTiersSliceDefaultPrimary>,
  Simplify<MembershipTiersSliceDefaultItem>
>;
export type MembershipTiersSlice = prismic.SharedSlice<
  "membership_tiers",
  MembershipTiersSliceDefault
>;

// WhatsAppPreview
interface WhatsAppPreviewSliceDefaultPrimary {
  eyebrow: prismic.KeyTextField;
  headline: prismic.KeyTextField;
  body: prismic.RichTextField;
  sample_wine_name: prismic.KeyTextField;
  sample_narrative: prismic.RichTextField;
  sample_price: prismic.KeyTextField;
  available_until: prismic.KeyTextField;
}
type WhatsAppPreviewSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<WhatsAppPreviewSliceDefaultPrimary>,
  never
>;
export type WhatsAppPreviewSlice = prismic.SharedSlice<
  "whats_app_preview",
  WhatsAppPreviewSliceDefault
>;

// ApplicationForm
interface ApplicationFormSliceDefaultPrimary {
  eyebrow: prismic.KeyTextField;
  headline: prismic.KeyTextField;
  subline: prismic.KeyTextField;
}
type ApplicationFormSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<ApplicationFormSliceDefaultPrimary>,
  never
>;
export type ApplicationFormSlice = prismic.SharedSlice<
  "application_form",
  ApplicationFormSliceDefault
>;

// OriginStory
interface OriginStorySliceDefaultPrimary {
  eyebrow: prismic.KeyTextField;
  archival_image: prismic.ImageField<never>;
  headline: prismic.RichTextField;
  body: prismic.RichTextField;
  pull_quote: prismic.KeyTextField;
}
type OriginStorySliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<OriginStorySliceDefaultPrimary>,
  never
>;
export type OriginStorySlice = prismic.SharedSlice<
  "origin_story",
  OriginStorySliceDefault
>;

// Geography
interface GeographySliceDefaultPrimary {
  col_left_label: prismic.KeyTextField;
  col_left_head: prismic.KeyTextField;
  col_left_body: prismic.RichTextField;
  col_right_label: prismic.KeyTextField;
  col_right_head: prismic.KeyTextField;
  col_right_body: prismic.RichTextField;
}
type GeographySliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<GeographySliceDefaultPrimary>,
  never
>;
export type GeographySlice = prismic.SharedSlice<
  "geography",
  GeographySliceDefault
>;

// DomainesList
interface DomainesListSliceDefaultPrimary {
  eyebrow: prismic.KeyTextField;
  headline: prismic.KeyTextField;
}
export interface DomainesListSliceDefaultItem {
  domaine: prismic.LinkField;
  card_image: prismic.ImageField<never>;
  name: prismic.KeyTextField;
  appellation: prismic.KeyTextField;
  color: prismic.SelectField<"rouge" | "blanc">;
  descriptor: prismic.KeyTextField;
}
type DomainesListSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<DomainesListSliceDefaultPrimary>,
  Simplify<DomainesListSliceDefaultItem>
>;
export type DomainesListSlice = prismic.SharedSlice<
  "domaines_list",
  DomainesListSliceDefault
>;

// ContactBlocks
interface ContactBlocksSliceDefaultPrimary {
  eyebrow: prismic.KeyTextField;
  headline: prismic.KeyTextField;
  subline: prismic.KeyTextField;
}
interface ContactBlocksSliceDefaultItem {
  icon_glyph: prismic.KeyTextField;
  label: prismic.KeyTextField;
  primary_text: prismic.KeyTextField;
  secondary_text: prismic.RichTextField;
  cta_label: prismic.KeyTextField;
  cta_link: prismic.LinkField;
}
type ContactBlocksSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<ContactBlocksSliceDefaultPrimary>,
  Simplify<ContactBlocksSliceDefaultItem>
>;
export type ContactBlocksSlice = prismic.SharedSlice<
  "contact_blocks",
  ContactBlocksSliceDefault
>;

// BottomContactCta
interface BottomContactCtaSliceDefaultPrimary {
  eyebrow: prismic.KeyTextField;
  headline: prismic.KeyTextField;
  body: prismic.RichTextField;
  submit_label: prismic.KeyTextField;
  success_message: prismic.KeyTextField;
}
type BottomContactCtaSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<BottomContactCtaSliceDefaultPrimary>,
  never
>;
export type BottomContactCtaSlice = prismic.SharedSlice<
  "bottom_contact_cta",
  BottomContactCtaSliceDefault
>;

// ── Module Augmentation ──────────────────────────────────────────────────

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<
      import("../../prismicio-types").AllDocumentTypes | DomaineDocument
    >;
  }

  namespace Content {
    export type {
      DomaineDocument,
      DomaineDocumentData,
      ThreeColumnFeaturesSlice,
      FeaturedWineSlice,
      DomainesGridSlice,
      DomainesGridSliceDefaultItem,
      MembersTeaserSlice,
      MembersHeroSlice,
      HowItWorksSlice,
      HowItWorksSliceDefaultItem,
      MembershipTiersSlice,
      MembershipTiersSliceDefaultItem,
      WhatsAppPreviewSlice,
      ApplicationFormSlice,
      OriginStorySlice,
      GeographySlice,
      DomainesListSlice,
      DomainesListSliceDefaultItem,
      ContactBlocksSlice,
      ContactBlocksSliceDefaultItem,
      BottomContactCtaSlice,
    };
  }
}
