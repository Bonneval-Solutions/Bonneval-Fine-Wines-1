import config from "../../company-config.json";

export const company = {
  name: config.company.name,
  tagline: config.company.tagline,
  description: config.company.description,
  owner: config.company.owner,
  address: config.company.address,
  contact: config.company.contact,
  social: config.company.social,
  legal: config.company.legal,
} as const;

export const branding = {
  logo: config.branding.logo,
} as const;

export const integrations = {
  prismic: config.integrations.prismic,
} as const;

export type Company = typeof company;
