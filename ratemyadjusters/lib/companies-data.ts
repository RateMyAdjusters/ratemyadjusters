export interface CompanyData {
  name: string;
  slug: string;
  shortName?: string;
  tagline?: string;
  claimsPhone?: string;
  website?: string;
}

export const companiesData: CompanyData[] = [
  {
    name: "State Farm",
    slug: "state-farm",
    shortName: "State Farm",
    tagline: "Like a good neighbor",
    claimsPhone: "1-800-732-5246",
    website: "https://www.statefarm.com"
  },
  {
    name: "Allstate",
    slug: "allstate",
    shortName: "Allstate",
    tagline: "You're in good hands",
    claimsPhone: "1-800-255-7828",
    website: "https://www.allstate.com"
  },
  {
    name: "USAA",
    slug: "usaa",
    shortName: "USAA",
    tagline: "Serving military families",
    claimsPhone: "1-800-531-8722",
    website: "https://www.usaa.com"
  },
  {
    name: "Liberty Mutual",
    slug: "liberty-mutual",
    shortName: "Liberty Mutual",
    tagline: "Only pay for what you need",
    claimsPhone: "1-800-225-2467",
    website: "https://www.libertymutual.com"
  },
  {
    name: "Progressive",
    slug: "progressive",
    shortName: "Progressive",
    tagline: "Name your price",
    claimsPhone: "1-800-776-4737",
    website: "https://www.progressive.com"
  },
  {
    name: "Farmers Insurance",
    slug: "farmers",
    shortName: "Farmers",
    tagline: "We know a thing or two",
    claimsPhone: "1-800-435-7764",
    website: "https://www.farmers.com"
  },
  {
    name: "Nationwide",
    slug: "nationwide",
    shortName: "Nationwide",
    tagline: "On your side",
    claimsPhone: "1-800-421-3535",
    website: "https://www.nationwide.com"
  },
  {
    name: "Travelers",
    slug: "travelers",
    shortName: "Travelers",
    claimsPhone: "1-800-252-4633",
    website: "https://www.travelers.com"
  },
  {
    name: "American Family Insurance",
    slug: "american-family",
    shortName: "American Family",
    tagline: "Dream fearlessly",
    claimsPhone: "1-800-692-6326",
    website: "https://www.amfam.com"
  },
  {
    name: "Erie Insurance",
    slug: "erie-insurance",
    shortName: "Erie",
    claimsPhone: "1-800-367-3743",
    website: "https://www.erieinsurance.com"
  },
  {
    name: "The Hartford",
    slug: "hartford",
    shortName: "The Hartford",
    claimsPhone: "1-800-243-5860",
    website: "https://www.thehartford.com"
  },
  {
    name: "Chubb",
    slug: "chubb",
    shortName: "Chubb",
    claimsPhone: "1-800-252-4670",
    website: "https://www.chubb.com"
  },
  {
    name: "Safeco Insurance",
    slug: "safeco",
    shortName: "Safeco",
    claimsPhone: "1-800-332-3226",
    website: "https://www.safeco.com"
  },
  {
    name: "MetLife",
    slug: "metlife",
    shortName: "MetLife",
    claimsPhone: "1-800-854-6011",
    website: "https://www.metlife.com"
  },
  {
    name: "Auto-Owners Insurance",
    slug: "auto-owners",
    shortName: "Auto-Owners",
    claimsPhone: "1-800-346-0346",
    website: "https://www.auto-owners.com"
  }
];

export function getCompanyBySlug(slug: string): CompanyData | undefined {
  return companiesData.find(company => company.slug === slug);
}

export function getAllCompanySlugs(): string[] {
  return companiesData.map(company => company.slug);
}
