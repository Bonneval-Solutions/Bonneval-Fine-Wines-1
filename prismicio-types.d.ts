import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

/**
 * Content for Domaine documents
 */
interface DomaineDocumentData {
	/**
	 * Domaine Name field in *Domaine*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Domaine Leroy
	 * - **API ID Path**: domaine.name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Appellation field in *Domaine*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Vosne-Romanée
	 * - **API ID Path**: domaine.appellation
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	appellation: prismic.KeyTextField;
	
	/**
	 * Colour field in *Domaine*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: Wine colour
	 * - **API ID Path**: domaine.color
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	color: prismic.SelectField<"rouge" | "blanc">;
	
	/**
	 * Short Descriptor field in *Domaine*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: One-line description for grid cards
	 * - **API ID Path**: domaine.descriptor
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	descriptor: prismic.KeyTextField;
	
	/**
	 * Hero Image field in *Domaine*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: domaine.hero_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	hero_image: prismic.ImageField<"card">;
	
	/**
	 * The Place field in *Domaine*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Terroir description — soil, aspect, altitude
	 * - **API ID Path**: domaine.the_place
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	the_place: prismic.RichTextField;
	
	/**
	 * The Family field in *Domaine*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Generational story, philosophy
	 * - **API ID Path**: domaine.the_family
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	the_family: prismic.RichTextField;
	
	/**
	 * Our Relationship field in *Domaine*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: How Bonneval connected with this domaine
	 * - **API ID Path**: domaine.our_relationship
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	our_relationship: prismic.RichTextField;
	
	/**
	 * Pull Quote (French) field in *Domaine*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: « Le terroir ne ment jamais… »
	 * - **API ID Path**: domaine.pull_quote_fr
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	pull_quote_fr: prismic.KeyTextField;
	
	/**
	 * Pull Quote (English) field in *Domaine*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: "The terroir never lies…"
	 * - **API ID Path**: domaine.pull_quote_en
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	pull_quote_en: prismic.KeyTextField;/**
	 * Meta Title field in *Domaine*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Domaine Name — Bonneval Fine Wines
	 * - **API ID Path**: domaine.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Domaine*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of this domaine
	 * - **API ID Path**: domaine.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Domaine*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: domaine.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Domaine document from Prismic
 *
 * - **API ID**: `domaine`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type DomaineDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<DomaineDocumentData>, "domaine", Lang>;

/**
 * Item in *Site settings → Navigation Links*
 */
export interface LayoutDocumentDataNavLinksItem {
	/**
	 * Label field in *Site settings → Navigation Links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Link label
	 * - **API ID Path**: layout.nav_links[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Link field in *Site settings → Navigation Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: layout.nav_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *Site settings → Footer Links*
 */
export interface LayoutDocumentDataFooterLinksItem {
	/**
	 * Label field in *Site settings → Footer Links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Link label
	 * - **API ID Path**: layout.footer_links[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Link field in *Site settings → Footer Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: layout.footer_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Content for Site settings documents
 */
interface LayoutDocumentData {
	/**
	 * Site Title field in *Site settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Bonneval Fine Wines
	 * - **API ID Path**: layout.site_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	site_title: prismic.KeyTextField;
	
	/**
	 * Site Description field in *Site settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief description of the site
	 * - **API ID Path**: layout.site_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	site_description: prismic.KeyTextField;/**
	 * Header Logo field in *Site settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: layout.header_logo
	 * - **Tab**: Header
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	header_logo: prismic.ImageField<never>;
	
	/**
	 * Navigation Links field in *Site settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: layout.nav_links[]
	 * - **Tab**: Header
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	nav_links: prismic.GroupField<Simplify<LayoutDocumentDataNavLinksItem>>;/**
	 * Footer Logo field in *Site settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: layout.footer_logo
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	footer_logo: prismic.ImageField<never>;
	
	/**
	 * Footer Links field in *Site settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: layout.footer_links[]
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	footer_links: prismic.GroupField<Simplify<LayoutDocumentDataFooterLinksItem>>;
	
	/**
	 * Email field in *Site settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: contact@example.com
	 * - **API ID Path**: layout.email
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	email: prismic.KeyTextField;
	
	/**
	 * Phone field in *Site settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: +359 ...
	 * - **API ID Path**: layout.phone
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	phone: prismic.KeyTextField;
	
	/**
	 * Address field in *Site settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Street, City, Country
	 * - **API ID Path**: layout.address
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	address: prismic.KeyTextField;
}

/**
 * Site settings document from Prismic
 *
 * - **API ID**: `layout`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type LayoutDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<LayoutDocumentData>, "layout", Lang>;

type PageDocumentDataSlicesSlice = HeroSlice | RichTextSlice | ThreeColumnFeaturesSlice | FeaturedWineSlice | DomainesGridSlice | MembersTeaserSlice | MembersHeroSlice | HowItWorksSlice | MembershipTiersSlice | WhatsAppPreviewSlice | ApplicationFormSlice | OriginStorySlice | GeographySlice | DomainesListSlice | ContactBlocksSlice | BottomContactCtaSlice | HeritageNoteSlice

/**
 * Content for Page documents
 */
interface PageDocumentData {
	/**
	 * Title field in *Page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Slice Zone field in *Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<PageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

export type AllDocumentTypes = DomaineDocument | LayoutDocument | PageDocument;

/**
 * Primary content in *ApplicationForm → Default → Primary*
 */
export interface ApplicationFormSliceDefaultPrimary {
	/**
	 * Eyebrow field in *ApplicationForm → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Apply
	 * - **API ID Path**: application_form.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Headline field in *ApplicationForm → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Request an invitation
	 * - **API ID Path**: application_form.default.primary.headline
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	headline: prismic.KeyTextField;
	
	/**
	 * Subline field in *ApplicationForm → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: The founder personally reviews every expression of interest.
	 * - **API ID Path**: application_form.default.primary.subline
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	subline: prismic.KeyTextField;
}

/**
 * Default variation for ApplicationForm Slice
 *
 * - **API ID**: `default`
 * - **Description**: 6-field application form with submit CTA
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ApplicationFormSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ApplicationFormSliceDefaultPrimary>, never>;

/**
 * Slice variation for *ApplicationForm*
 */
type ApplicationFormSliceVariation = ApplicationFormSliceDefault

/**
 * ApplicationForm Shared Slice
 *
 * - **API ID**: `application_form`
 * - **Description**: Membership application form on dark background
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ApplicationFormSlice = prismic.SharedSlice<"application_form", ApplicationFormSliceVariation>;

/**
 * Primary content in *BottomContactCta → Default → Primary*
 */
export interface BottomContactCtaSliceDefaultPrimary {
	/**
	 * Eyebrow field in *BottomContactCta → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Private allocations
	 * - **API ID Path**: bottom_contact_cta.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Headline field in *BottomContactCta → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Request a callback
	 * - **API ID Path**: bottom_contact_cta.default.primary.headline
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	headline: prismic.KeyTextField;
	
	/**
	 * Body field in *BottomContactCta → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: bottom_contact_cta.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Submit Label field in *BottomContactCta → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Request a callback
	 * - **API ID Path**: bottom_contact_cta.default.primary.submit_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	submit_label: prismic.KeyTextField;
	
	/**
	 * Success Message field in *BottomContactCta → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Thank you. We will contact you shortly.
	 * - **API ID Path**: bottom_contact_cta.default.primary.success_message
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	success_message: prismic.KeyTextField;
}

/**
 * Default variation for BottomContactCta Slice
 *
 * - **API ID**: `default`
 * - **Description**: Small CTA section with request-a-callback style form
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BottomContactCtaSliceDefault = prismic.SharedSliceVariation<"default", Simplify<BottomContactCtaSliceDefaultPrimary>, never>;

/**
 * Slice variation for *BottomContactCta*
 */
type BottomContactCtaSliceVariation = BottomContactCtaSliceDefault

/**
 * BottomContactCta Shared Slice
 *
 * - **API ID**: `bottom_contact_cta`
 * - **Description**: Compact bottom CTA with callback/contact form
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BottomContactCtaSlice = prismic.SharedSlice<"bottom_contact_cta", BottomContactCtaSliceVariation>;

/**
 * Primary content in *ContactBlocks → Default → Primary*
 */
export interface ContactBlocksSliceDefaultPrimary {
	/**
	 * Eyebrow field in *ContactBlocks → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Reach us
	 * - **API ID Path**: contact_blocks.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Headline field in *ContactBlocks → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Contact
	 * - **API ID Path**: contact_blocks.default.primary.headline
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	headline: prismic.KeyTextField;
	
	/**
	 * Subline field in *ContactBlocks → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: We prefer conversation to correspondence.
	 * - **API ID Path**: contact_blocks.default.primary.subline
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	subline: prismic.KeyTextField;
}

/**
 * Primary content in *ContactBlocks → Items*
 */
export interface ContactBlocksSliceDefaultItem {
	/**
	 * Icon Glyph field in *ContactBlocks → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: ◎
	 * - **API ID Path**: contact_blocks.items[].icon_glyph
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	icon_glyph: prismic.KeyTextField;
	
	/**
	 * Label field in *ContactBlocks → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: WhatsApp
	 * - **API ID Path**: contact_blocks.items[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Primary Text field in *ContactBlocks → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: +359 88 XXX XXXX
	 * - **API ID Path**: contact_blocks.items[].primary_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	primary_text: prismic.KeyTextField;
	
	/**
	 * Secondary Text field in *ContactBlocks → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact_blocks.items[].secondary_text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	secondary_text: prismic.RichTextField;
	
	/**
	 * CTA Label (optional) field in *ContactBlocks → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Message on WhatsApp
	 * - **API ID Path**: contact_blocks.items[].cta_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_label: prismic.KeyTextField;
	
	/**
	 * CTA Link (optional) field in *ContactBlocks → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact_blocks.items[].cta_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for ContactBlocks Slice
 *
 * - **API ID**: `default`
 * - **Description**: Three contact cards: WhatsApp, Email, Visit
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContactBlocksSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ContactBlocksSliceDefaultPrimary>, Simplify<ContactBlocksSliceDefaultItem>>;

/**
 * Slice variation for *ContactBlocks*
 */
type ContactBlocksSliceVariation = ContactBlocksSliceDefault

/**
 * ContactBlocks Shared Slice
 *
 * - **API ID**: `contact_blocks`
 * - **Description**: 3-card grid for contact methods
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContactBlocksSlice = prismic.SharedSlice<"contact_blocks", ContactBlocksSliceVariation>;

/**
 * Primary content in *DomainesGrid → Default → Primary*
 */
export interface DomainesGridSliceDefaultPrimary {
	/**
	 * Eyebrow field in *DomainesGrid → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: The portfolio
	 * - **API ID Path**: domaines_grid.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Headline field in *DomainesGrid → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: The ten houses of Bonneval
	 * - **API ID Path**: domaines_grid.default.primary.headline
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	headline: prismic.KeyTextField;
	
	/**
	 * CTA Label field in *DomainesGrid → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Explore all domaines
	 * - **API ID Path**: domaines_grid.default.primary.cta_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_label: prismic.KeyTextField;
	
	/**
	 * CTA Link field in *DomainesGrid → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: domaines_grid.default.primary.cta_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *DomainesGrid → Items*
 */
export interface DomainesGridSliceDefaultItem {
	/**
	 * Domaine field in *DomainesGrid → Items*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: domaines_grid.items[].domaine
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	domaine: prismic.ContentRelationshipField<"domaine">;
	
	/**
	 * Card Image field in *DomainesGrid → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: domaines_grid.items[].card_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	card_image: prismic.ImageField<never>;
}

/**
 * Default variation for DomainesGrid Slice
 *
 * - **API ID**: `default`
 * - **Description**: Grid of domaine producer cards linked to domaine pages
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type DomainesGridSliceDefault = prismic.SharedSliceVariation<"default", Simplify<DomainesGridSliceDefaultPrimary>, Simplify<DomainesGridSliceDefaultItem>>;

/**
 * Slice variation for *DomainesGrid*
 */
type DomainesGridSliceVariation = DomainesGridSliceDefault

/**
 * DomainesGrid Shared Slice
 *
 * - **API ID**: `domaines_grid`
 * - **Description**: 5x2 grid of domaine cards with hover effect
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type DomainesGridSlice = prismic.SharedSlice<"domaines_grid", DomainesGridSliceVariation>;

/**
 * Primary content in *DomainesList → Default → Primary*
 */
export interface DomainesListSliceDefaultPrimary {
	/**
	 * Eyebrow field in *DomainesList → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: The portfolio
	 * - **API ID Path**: domaines_list.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Headline field in *DomainesList → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: The ten houses of Bonneval
	 * - **API ID Path**: domaines_list.default.primary.headline
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	headline: prismic.KeyTextField;
	
	/**
	 * Source field in *DomainesList → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: Manual
	 * - **API ID Path**: domaines_list.default.primary.source
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	source: prismic.SelectField<"Manual" | "All domaines", "filled">;
}

/**
 * Primary content in *DomainesList → Items*
 */
export interface DomainesListSliceDefaultItem {
	/**
	 * Domaine field in *DomainesList → Items*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: domaines_list.items[].domaine
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	domaine: prismic.ContentRelationshipField<"domaine">;
	
	/**
	 * Card Image field in *DomainesList → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: domaines_list.items[].card_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	card_image: prismic.ImageField<never>;
	
	/**
	 * Name field in *DomainesList → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Domaine Leroy
	 * - **API ID Path**: domaines_list.items[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Appellation field in *DomainesList → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Vosne-Romanée
	 * - **API ID Path**: domaines_list.items[].appellation
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	appellation: prismic.KeyTextField;
	
	/**
	 * Colour field in *DomainesList → Items*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: domaines_list.items[].color
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	color: prismic.SelectField<"rouge" | "blanc">;
	
	/**
	 * Descriptor field in *DomainesList → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Short description
	 * - **API ID Path**: domaines_list.items[].descriptor
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	descriptor: prismic.KeyTextField;
}

/**
 * Default variation for DomainesList Slice
 *
 * - **API ID**: `default`
 * - **Description**: Two-column domaine cards with image left, details right
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type DomainesListSliceDefault = prismic.SharedSliceVariation<"default", Simplify<DomainesListSliceDefaultPrimary>, Simplify<DomainesListSliceDefaultItem>>;

/**
 * Slice variation for *DomainesList*
 */
type DomainesListSliceVariation = DomainesListSliceDefault

/**
 * DomainesList Shared Slice
 *
 * - **API ID**: `domaines_list`
 * - **Description**: 2x5 card grid with image and domaine details
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type DomainesListSlice = prismic.SharedSlice<"domaines_list", DomainesListSliceVariation>;

/**
 * Primary content in *FeaturedWine → Default → Primary*
 */
export interface FeaturedWineSliceDefaultPrimary {
	/**
	 * Section Label field in *FeaturedWine → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Featured selection
	 * - **API ID Path**: featured_wine.default.primary.label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Bottle Image field in *FeaturedWine → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: featured_wine.default.primary.bottle_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	bottle_image: prismic.ImageField<never>;
	
	/**
	 * Collection Tag field in *FeaturedWine → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Collection 2024
	 * - **API ID Path**: featured_wine.default.primary.collection_tag
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	collection_tag: prismic.KeyTextField;
	
	/**
	 * Domaine Name field in *FeaturedWine → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Armand Rousseau
	 * - **API ID Path**: featured_wine.default.primary.domaine_name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	domaine_name: prismic.KeyTextField;
	
	/**
	 * Wine Name field in *FeaturedWine → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Gevrey-Chambertin Clos St-Jacques 2021
	 * - **API ID Path**: featured_wine.default.primary.wine_name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	wine_name: prismic.KeyTextField;
	
	/**
	 * Narrative field in *FeaturedWine → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Terroir-first description
	 * - **API ID Path**: featured_wine.default.primary.narrative
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	narrative: prismic.RichTextField;
	
	/**
	 * Availability field in *FeaturedWine → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: featured_wine.default.primary.availability
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	availability: prismic.SelectField<"Available now" | "Allocation only" | "Pre-arrival">;
	
	/**
	 * CTA Label field in *FeaturedWine → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: View wine
	 * - **API ID Path**: featured_wine.default.primary.cta_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_label: prismic.KeyTextField;
	
	/**
	 * CTA Link field in *FeaturedWine → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: featured_wine.default.primary.cta_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for FeaturedWine Slice
 *
 * - **API ID**: `default`
 * - **Description**: Featured wine with bottle image and terroir narrative
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FeaturedWineSliceDefault = prismic.SharedSliceVariation<"default", Simplify<FeaturedWineSliceDefaultPrimary>, never>;

/**
 * Slice variation for *FeaturedWine*
 */
type FeaturedWineSliceVariation = FeaturedWineSliceDefault

/**
 * FeaturedWine Shared Slice
 *
 * - **API ID**: `featured_wine`
 * - **Description**: Editorial two-column featured wine section on dark background
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FeaturedWineSlice = prismic.SharedSlice<"featured_wine", FeaturedWineSliceVariation>;

/**
 * Primary content in *Geography → Default → Primary*
 */
export interface GeographySliceDefaultPrimary {
	/**
	 * Left Column Label field in *Geography → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Geography
	 * - **API ID Path**: geography.default.primary.col_left_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	col_left_label: prismic.KeyTextField;
	
	/**
	 * Left Column Headline field in *Geography → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Why Bulgaria? Why Sofia?
	 * - **API ID Path**: geography.default.primary.col_left_head
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	col_left_head: prismic.KeyTextField;
	
	/**
	 * Left Column Body field in *Geography → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: geography.default.primary.col_left_body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	col_left_body: prismic.RichTextField;
	
	/**
	 * Right Column Label field in *Geography → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: The advantage
	 * - **API ID Path**: geography.default.primary.col_right_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	col_right_label: prismic.KeyTextField;
	
	/**
	 * Right Column Headline field in *Geography → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Outside the crowd
	 * - **API ID Path**: geography.default.primary.col_right_head
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	col_right_head: prismic.KeyTextField;
	
	/**
	 * Right Column Body field in *Geography → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: geography.default.primary.col_right_body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	col_right_body: prismic.RichTextField;
}

/**
 * Default variation for Geography Slice
 *
 * - **API ID**: `default`
 * - **Description**: Two columns: Why Bulgaria left, Outside the crowd right
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type GeographySliceDefault = prismic.SharedSliceVariation<"default", Simplify<GeographySliceDefaultPrimary>, never>;

/**
 * Slice variation for *Geography*
 */
type GeographySliceVariation = GeographySliceDefault

/**
 * Geography Shared Slice
 *
 * - **API ID**: `geography`
 * - **Description**: Two-column on dark background for geography and advantage
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type GeographySlice = prismic.SharedSlice<"geography", GeographySliceVariation>;

/**
 * Primary content in *HeritageNote → Default → Primary*
 */
export interface HeritageNoteSliceDefaultPrimary {
	/**
	 * Eyebrow field in *HeritageNote → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Great wines & great men
	 * - **API ID Path**: heritage_note.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Title field in *HeritageNote → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: The Pasha of Bonneval
	 * - **API ID Path**: heritage_note.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Photo (optional) field in *HeritageNote → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: heritage_note.default.primary.photo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photo: prismic.ImageField<never>;
	
	/**
	 * Photo on right field in *HeritageNote → Default → Primary*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: heritage_note.default.primary.image_position
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	image_position: prismic.BooleanField;
	
	/**
	 * Body field in *HeritageNote → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Short anecdote
	 * - **API ID Path**: heritage_note.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Pull Quote field in *HeritageNote → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Optional quote
	 * - **API ID Path**: heritage_note.default.primary.pull_quote
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	pull_quote: prismic.KeyTextField;
	
	/**
	 * Attribution field in *HeritageNote → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Casanova
	 * - **API ID Path**: heritage_note.default.primary.attribution
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	attribution: prismic.KeyTextField;
	
	/**
	 * CTA Label field in *HeritageNote → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Read our history
	 * - **API ID Path**: heritage_note.default.primary.cta_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_label: prismic.KeyTextField;
	
	/**
	 * CTA Link field in *HeritageNote → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: heritage_note.default.primary.cta_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for HeritageNote Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeritageNoteSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeritageNoteSliceDefaultPrimary>, never>;

/**
 * Slice variation for *HeritageNote*
 */
type HeritageNoteSliceVariation = HeritageNoteSliceDefault

/**
 * HeritageNote Shared Slice
 *
 * - **API ID**: `heritage_note`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeritageNoteSlice = prismic.SharedSlice<"heritage_note", HeritageNoteSliceVariation>;

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
	/**
	 * Headline field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.headline
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	headline: prismic.RichTextField;
	
	/**
	 * Subheadline field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.subheadline
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	subheadline: prismic.RichTextField;
	
	/**
	 * Eyebrow (small line above the wordmark) field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Sofia · Bulgaria
	 * - **API ID Path**: hero.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Detail line (under the wordmark) field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Sofia's sole gateway to ten of Burgundy's most revered domaines.
	 * - **API ID Path**: hero.default.primary.detail_line
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	detail_line: prismic.KeyTextField;
	
	/**
	 * Tagline (above the CTAs) field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Sole importer. Ten domaines. By invitation.
	 * - **API ID Path**: hero.default.primary.tagline
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	tagline: prismic.KeyTextField;
	
	/**
	 * Primary CTA label field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Explore the Domaines
	 * - **API ID Path**: hero.default.primary.primary_cta_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	primary_cta_label: prismic.KeyTextField;
	
	/**
	 * Primary CTA link field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.primary_cta_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	primary_cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Secondary CTA label field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Request Membership
	 * - **API ID Path**: hero.default.primary.secondary_cta_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	secondary_cta_label: prismic.KeyTextField;
	
	/**
	 * Secondary CTA link field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.secondary_cta_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	secondary_cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Background image (optional) field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.background_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	background_image: prismic.ImageField<never>;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Hero with headline, CTAs and optional background
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeroSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Homepage hero
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Primary content in *HowItWorks → Default → Primary*
 */
export interface HowItWorksSliceDefaultPrimary {
	/**
	 * Eyebrow field in *HowItWorks → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: The process
	 * - **API ID Path**: how_it_works.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Headline field in *HowItWorks → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: How membership works
	 * - **API ID Path**: how_it_works.default.primary.headline
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	headline: prismic.KeyTextField;
}

/**
 * Primary content in *HowItWorks → Items*
 */
export interface HowItWorksSliceDefaultItem {
	/**
	 * Number field in *HowItWorks → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 01
	 * - **API ID Path**: how_it_works.items[].number
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	number: prismic.KeyTextField;
	
	/**
	 * Title field in *HowItWorks → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Apply
	 * - **API ID Path**: how_it_works.items[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Body field in *HowItWorks → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: how_it_works.items[].body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
}

/**
 * Default variation for HowItWorks Slice
 *
 * - **API ID**: `default`
 * - **Description**: Numbered process steps on parchment
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HowItWorksSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HowItWorksSliceDefaultPrimary>, Simplify<HowItWorksSliceDefaultItem>>;

/**
 * Slice variation for *HowItWorks*
 */
type HowItWorksSliceVariation = HowItWorksSliceDefault

/**
 * HowItWorks Shared Slice
 *
 * - **API ID**: `how_it_works`
 * - **Description**: 4-step numbered process with gold numerals
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HowItWorksSlice = prismic.SharedSlice<"how_it_works", HowItWorksSliceVariation>;

/**
 * Primary content in *MembersHero → Default → Primary*
 */
export interface MembersHeroSliceDefaultPrimary {
	/**
	 * Eyebrow field in *MembersHero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Private Members
	 * - **API ID Path**: members_hero.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Headline field in *MembersHero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: members_hero.default.primary.headline
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	headline: prismic.RichTextField;
	
	/**
	 * Body field in *MembersHero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: members_hero.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Background image (optional) field in *MembersHero → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: members_hero.default.primary.background_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	background_image: prismic.ImageField<never>;
}

/**
 * Default variation for MembersHero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Dark hero with eyebrow, headline, body
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type MembersHeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<MembersHeroSliceDefaultPrimary>, never>;

/**
 * Slice variation for *MembersHero*
 */
type MembersHeroSliceVariation = MembersHeroSliceDefault

/**
 * MembersHero Shared Slice
 *
 * - **API ID**: `members_hero`
 * - **Description**: Dark hero section with large serif headline for members page
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type MembersHeroSlice = prismic.SharedSlice<"members_hero", MembersHeroSliceVariation>;

/**
 * Primary content in *MembersTeaser → Default → Primary*
 */
export interface MembersTeaserSliceDefaultPrimary {
	/**
	 * Eyebrow field in *MembersTeaser → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Private Members Club
	 * - **API ID Path**: members_teaser.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Headline field in *MembersTeaser → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: members_teaser.default.primary.headline
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	headline: prismic.RichTextField;
	
	/**
	 * Body field in *MembersTeaser → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: members_teaser.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * CTA Label field in *MembersTeaser → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Apply for membership
	 * - **API ID Path**: members_teaser.default.primary.cta_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_label: prismic.KeyTextField;
	
	/**
	 * CTA Link field in *MembersTeaser → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: members_teaser.default.primary.cta_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for MembersTeaser Slice
 *
 * - **API ID**: `default`
 * - **Description**: Dark background CTA with headline, body, and gold button
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type MembersTeaserSliceDefault = prismic.SharedSliceVariation<"default", Simplify<MembersTeaserSliceDefaultPrimary>, never>;

/**
 * Slice variation for *MembersTeaser*
 */
type MembersTeaserSliceVariation = MembersTeaserSliceDefault

/**
 * MembersTeaser Shared Slice
 *
 * - **API ID**: `members_teaser`
 * - **Description**: Full-width dark CTA for members section
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type MembersTeaserSlice = prismic.SharedSlice<"members_teaser", MembersTeaserSliceVariation>;

/**
 * Primary content in *MembershipTiers → Default → Primary*
 */
export interface MembershipTiersSliceDefaultPrimary {
	/**
	 * Eyebrow field in *MembershipTiers → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Membership
	 * - **API ID Path**: membership_tiers.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Headline field in *MembershipTiers → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Two tiers, one circle
	 * - **API ID Path**: membership_tiers.default.primary.headline
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	headline: prismic.KeyTextField;
	
	/**
	 * Footnote field in *MembershipTiers → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Membership is maintained through participation.
	 * - **API ID Path**: membership_tiers.default.primary.footnote
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	footnote: prismic.KeyTextField;
}

/**
 * Primary content in *MembershipTiers → Items*
 */
export interface MembershipTiersSliceDefaultItem {
	/**
	 * Tier Name field in *MembershipTiers → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Membre
	 * - **API ID Path**: membership_tiers.items[].tier_name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	tier_name: prismic.KeyTextField;
	
	/**
	 * Sub Label field in *MembershipTiers → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Standard membership
	 * - **API ID Path**: membership_tiers.items[].sub_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sub_label: prismic.KeyTextField;
	
	/**
	 * Price Line field in *MembershipTiers → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: From €2,000 annually
	 * - **API ID Path**: membership_tiers.items[].price_line
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	price_line: prismic.KeyTextField;
	
	/**
	 * Benefits field in *MembershipTiers → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: One benefit per line
	 * - **API ID Path**: membership_tiers.items[].benefits
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	benefits: prismic.RichTextField;
	
	/**
	 * Featured (highlighted) field in *MembershipTiers → Items*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: membership_tiers.items[].is_featured
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	is_featured: prismic.BooleanField;
	
	/**
	 * CTA Label field in *MembershipTiers → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Apply for membership
	 * - **API ID Path**: membership_tiers.items[].cta_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_label: prismic.KeyTextField;
}

/**
 * Default variation for MembershipTiers Slice
 *
 * - **API ID**: `default`
 * - **Description**: Membership tier cards with benefits list
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type MembershipTiersSliceDefault = prismic.SharedSliceVariation<"default", Simplify<MembershipTiersSliceDefaultPrimary>, Simplify<MembershipTiersSliceDefaultItem>>;

/**
 * Slice variation for *MembershipTiers*
 */
type MembershipTiersSliceVariation = MembershipTiersSliceDefault

/**
 * MembershipTiers Shared Slice
 *
 * - **API ID**: `membership_tiers`
 * - **Description**: Two-column tier comparison on dark background
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type MembershipTiersSlice = prismic.SharedSlice<"membership_tiers", MembershipTiersSliceVariation>;

/**
 * Primary content in *OriginStory → Default → Primary*
 */
export interface OriginStorySliceDefaultPrimary {
	/**
	 * Eyebrow field in *OriginStory → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: The story
	 * - **API ID Path**: origin_story.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Archival Image field in *OriginStory → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: origin_story.default.primary.archival_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	archival_image: prismic.ImageField<never>;

	/**
	 * Image on right field in *OriginStory → Default → Primary*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: origin_story.default.primary.image_position
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	image_position: prismic.BooleanField;
	
	/**
	 * Headline field in *OriginStory → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: origin_story.default.primary.headline
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	headline: prismic.RichTextField;
	
	/**
	 * Body field in *OriginStory → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: origin_story.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Pull Quote field in *OriginStory → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: The constraint is the brand.
	 * - **API ID Path**: origin_story.default.primary.pull_quote
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	pull_quote: prismic.KeyTextField;
}

/**
 * Default variation for OriginStory Slice
 *
 * - **API ID**: `default`
 * - **Description**: Sticky archival image left, long narrative right with blockquote
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type OriginStorySliceDefault = prismic.SharedSliceVariation<"default", Simplify<OriginStorySliceDefaultPrimary>, never>;

/**
 * Slice variation for *OriginStory*
 */
type OriginStorySliceVariation = OriginStorySliceDefault

/**
 * OriginStory Shared Slice
 *
 * - **API ID**: `origin_story`
 * - **Description**: Two-column origin story with sticky image and narrative
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type OriginStorySlice = prismic.SharedSlice<"origin_story", OriginStorySliceVariation>;

/**
 * Primary content in *RichText → Default → Primary*
 */
export interface RichTextSliceDefaultPrimary {
	/**
	 * Content field in *RichText → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Lorem ipsum...
	 * - **API ID Path**: rich_text.default.primary.content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	content: prismic.RichTextField;
}

/**
 * Default variation for RichText Slice
 *
 * - **API ID**: `default`
 * - **Description**: RichText
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type RichTextSliceDefault = prismic.SharedSliceVariation<"default", Simplify<RichTextSliceDefaultPrimary>, never>;

/**
 * Slice variation for *RichText*
 */
type RichTextSliceVariation = RichTextSliceDefault

/**
 * RichText Shared Slice
 *
 * - **API ID**: `rich_text`
 * - **Description**: RichText
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type RichTextSlice = prismic.SharedSlice<"rich_text", RichTextSliceVariation>;

/**
 * Primary content in *ThreeColumnFeatures → Items*
 */
export interface ThreeColumnFeaturesSliceDefaultItem {
	/**
	 * Icon Glyph field in *ThreeColumnFeatures → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: ◈
	 * - **API ID Path**: three_column_features.items[].icon_glyph
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	icon_glyph: prismic.KeyTextField;
	
	/**
	 * Body field in *ThreeColumnFeatures → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Feature description
	 * - **API ID Path**: three_column_features.items[].body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
}

/**
 * Default variation for ThreeColumnFeatures Slice
 *
 * - **API ID**: `default`
 * - **Description**: Three feature cards with icon and description
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ThreeColumnFeaturesSliceDefault = prismic.SharedSliceVariation<"default", Record<string, never>, Simplify<ThreeColumnFeaturesSliceDefaultItem>>;

/**
 * Slice variation for *ThreeColumnFeatures*
 */
type ThreeColumnFeaturesSliceVariation = ThreeColumnFeaturesSliceDefault

/**
 * ThreeColumnFeatures Shared Slice
 *
 * - **API ID**: `three_column_features`
 * - **Description**: 3-card grid with icon glyph and body text on parchment
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ThreeColumnFeaturesSlice = prismic.SharedSlice<"three_column_features", ThreeColumnFeaturesSliceVariation>;

/**
 * Primary content in *WhatsAppPreview → Default → Primary*
 */
export interface WhatsAppPreviewSliceDefaultPrimary {
	/**
	 * Eyebrow field in *WhatsAppPreview → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: How offers arrive
	 * - **API ID Path**: whats_app_preview.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Headline field in *WhatsAppPreview → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: The allocation message
	 * - **API ID Path**: whats_app_preview.default.primary.headline
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	headline: prismic.KeyTextField;
	
	/**
	 * Body field in *WhatsAppPreview → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: whats_app_preview.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Sample Wine Name field in *WhatsAppPreview → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Armand Rousseau — Gevrey-Chambertin 2022
	 * - **API ID Path**: whats_app_preview.default.primary.sample_wine_name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sample_wine_name: prismic.KeyTextField;
	
	/**
	 * Sample Narrative field in *WhatsAppPreview → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: whats_app_preview.default.primary.sample_narrative
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	sample_narrative: prismic.RichTextField;
	
	/**
	 * Sample Price field in *WhatsAppPreview → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: €420 / bottle
	 * - **API ID Path**: whats_app_preview.default.primary.sample_price
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sample_price: prismic.KeyTextField;
	
	/**
	 * Available Until field in *WhatsAppPreview → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Available until Friday
	 * - **API ID Path**: whats_app_preview.default.primary.available_until
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	available_until: prismic.KeyTextField;
}

/**
 * Default variation for WhatsAppPreview Slice
 *
 * - **API ID**: `default`
 * - **Description**: WhatsApp allocation preview with sample message
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type WhatsAppPreviewSliceDefault = prismic.SharedSliceVariation<"default", Simplify<WhatsAppPreviewSliceDefaultPrimary>, never>;

/**
 * Slice variation for *WhatsAppPreview*
 */
type WhatsAppPreviewSliceVariation = WhatsAppPreviewSliceDefault

/**
 * WhatsAppPreview Shared Slice
 *
 * - **API ID**: `whats_app_preview`
 * - **Description**: Two-column with editorial text and stylised WhatsApp message mock
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type WhatsAppPreviewSlice = prismic.SharedSlice<"whats_app_preview", WhatsAppPreviewSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			DomaineDocument,
			DomaineDocumentData,
			LayoutDocument,
			LayoutDocumentData,
			LayoutDocumentDataNavLinksItem,
			LayoutDocumentDataFooterLinksItem,
			PageDocument,
			PageDocumentData,
			PageDocumentDataSlicesSlice,
			AllDocumentTypes,
			ApplicationFormSlice,
			ApplicationFormSliceDefaultPrimary,
			ApplicationFormSliceVariation,
			ApplicationFormSliceDefault,
			BottomContactCtaSlice,
			BottomContactCtaSliceDefaultPrimary,
			BottomContactCtaSliceVariation,
			BottomContactCtaSliceDefault,
			ContactBlocksSlice,
			ContactBlocksSliceDefaultPrimary,
			ContactBlocksSliceDefaultItem,
			ContactBlocksSliceVariation,
			ContactBlocksSliceDefault,
			DomainesGridSlice,
			DomainesGridSliceDefaultPrimary,
			DomainesGridSliceDefaultItem,
			DomainesGridSliceVariation,
			DomainesGridSliceDefault,
			DomainesListSlice,
			DomainesListSliceDefaultPrimary,
			DomainesListSliceDefaultItem,
			DomainesListSliceVariation,
			DomainesListSliceDefault,
			FeaturedWineSlice,
			FeaturedWineSliceDefaultPrimary,
			FeaturedWineSliceVariation,
			FeaturedWineSliceDefault,
			GeographySlice,
			GeographySliceDefaultPrimary,
			GeographySliceVariation,
			GeographySliceDefault,
			HeritageNoteSlice,
			HeritageNoteSliceDefaultPrimary,
			HeritageNoteSliceVariation,
			HeritageNoteSliceDefault,
			HeroSlice,
			HeroSliceDefaultPrimary,
			HeroSliceVariation,
			HeroSliceDefault,
			HowItWorksSlice,
			HowItWorksSliceDefaultPrimary,
			HowItWorksSliceDefaultItem,
			HowItWorksSliceVariation,
			HowItWorksSliceDefault,
			MembersHeroSlice,
			MembersHeroSliceDefaultPrimary,
			MembersHeroSliceVariation,
			MembersHeroSliceDefault,
			MembersTeaserSlice,
			MembersTeaserSliceDefaultPrimary,
			MembersTeaserSliceVariation,
			MembersTeaserSliceDefault,
			MembershipTiersSlice,
			MembershipTiersSliceDefaultPrimary,
			MembershipTiersSliceDefaultItem,
			MembershipTiersSliceVariation,
			MembershipTiersSliceDefault,
			OriginStorySlice,
			OriginStorySliceDefaultPrimary,
			OriginStorySliceVariation,
			OriginStorySliceDefault,
			RichTextSlice,
			RichTextSliceDefaultPrimary,
			RichTextSliceVariation,
			RichTextSliceDefault,
			ThreeColumnFeaturesSlice,
			ThreeColumnFeaturesSliceDefaultItem,
			ThreeColumnFeaturesSliceVariation,
			ThreeColumnFeaturesSliceDefault,
			WhatsAppPreviewSlice,
			WhatsAppPreviewSliceDefaultPrimary,
			WhatsAppPreviewSliceVariation,
			WhatsAppPreviewSliceDefault
		}
	}
}