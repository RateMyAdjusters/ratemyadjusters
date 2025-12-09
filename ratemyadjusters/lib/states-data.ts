export interface StateData {
  name: string;
  slug: string;
  abbreviation: string;
  regulator: string;
  regulatorUrl: string;
  phone?: string;
  notes?: string;
}

export const statesData: StateData[] = [
  {
    name: "Alabama",
    slug: "alabama",
    abbreviation: "AL",
    regulator: "Alabama Department of Insurance",
    regulatorUrl: "https://www.aldoi.gov",
    phone: "1-334-269-3550"
  },
  {
    name: "Alaska",
    slug: "alaska",
    abbreviation: "AK",
    regulator: "Alaska Division of Insurance",
    regulatorUrl: "https://www.commerce.alaska.gov/web/ins",
    phone: "1-907-465-2515"
  },
  {
    name: "Arizona",
    slug: "arizona",
    abbreviation: "AZ",
    regulator: "Arizona Department of Insurance and Financial Institutions",
    regulatorUrl: "https://difi.az.gov",
    phone: "1-602-364-3100"
  },
  {
    name: "Arkansas",
    slug: "arkansas",
    abbreviation: "AR",
    regulator: "Arkansas Insurance Department",
    regulatorUrl: "https://insurance.arkansas.gov",
    phone: "1-800-282-9134"
  },
  {
    name: "California",
    slug: "california",
    abbreviation: "CA",
    regulator: "California Department of Insurance",
    regulatorUrl: "https://www.insurance.ca.gov",
    phone: "1-800-927-4357",
    notes: "California has some of the strongest consumer protection laws for insurance claims."
  },
  {
    name: "Colorado",
    slug: "colorado",
    abbreviation: "CO",
    regulator: "Colorado Division of Insurance",
    regulatorUrl: "https://doi.colorado.gov",
    phone: "1-800-930-3745"
  },
  {
    name: "Connecticut",
    slug: "connecticut",
    abbreviation: "CT",
    regulator: "Connecticut Insurance Department",
    regulatorUrl: "https://portal.ct.gov/CID",
    phone: "1-860-297-3900"
  },
  {
    name: "Delaware",
    slug: "delaware",
    abbreviation: "DE",
    regulator: "Delaware Department of Insurance",
    regulatorUrl: "https://insurance.delaware.gov",
    phone: "1-302-674-7300"
  },
  {
    name: "Florida",
    slug: "florida",
    abbreviation: "FL",
    regulator: "Florida Office of Insurance Regulation",
    regulatorUrl: "https://www.floir.com",
    phone: "1-877-693-5236",
    notes: "Florida sees high claim volume due to hurricanes and has specific regulations for storm-related claims."
  },
  {
    name: "Georgia",
    slug: "georgia",
    abbreviation: "GA",
    regulator: "Georgia Office of Insurance and Safety Fire Commissioner",
    regulatorUrl: "https://oci.georgia.gov",
    phone: "1-800-656-2298"
  },
  {
    name: "Hawaii",
    slug: "hawaii",
    abbreviation: "HI",
    regulator: "Hawaii Insurance Division",
    regulatorUrl: "https://cca.hawaii.gov/ins",
    phone: "1-808-586-2790"
  },
  {
    name: "Idaho",
    slug: "idaho",
    abbreviation: "ID",
    regulator: "Idaho Department of Insurance",
    regulatorUrl: "https://doi.idaho.gov",
    phone: "1-800-721-3272"
  },
  {
    name: "Illinois",
    slug: "illinois",
    abbreviation: "IL",
    regulator: "Illinois Department of Insurance",
    regulatorUrl: "https://insurance.illinois.gov",
    phone: "1-866-445-5364"
  },
  {
    name: "Indiana",
    slug: "indiana",
    abbreviation: "IN",
    regulator: "Indiana Department of Insurance",
    regulatorUrl: "https://www.in.gov/idoi",
    phone: "1-317-232-2385"
  },
  {
    name: "Iowa",
    slug: "iowa",
    abbreviation: "IA",
    regulator: "Iowa Insurance Division",
    regulatorUrl: "https://iid.iowa.gov",
    phone: "1-877-955-1212"
  },
  {
    name: "Kansas",
    slug: "kansas",
    abbreviation: "KS",
    regulator: "Kansas Insurance Department",
    regulatorUrl: "https://insurance.kansas.gov",
    phone: "1-800-432-2484"
  },
  {
    name: "Kentucky",
    slug: "kentucky",
    abbreviation: "KY",
    regulator: "Kentucky Department of Insurance",
    regulatorUrl: "https://insurance.ky.gov",
    phone: "1-800-595-6053"
  },
  {
    name: "Louisiana",
    slug: "louisiana",
    abbreviation: "LA",
    regulator: "Louisiana Department of Insurance",
    regulatorUrl: "https://www.ldi.la.gov",
    phone: "1-800-259-5300",
    notes: "Louisiana has specific regulations for hurricane and flood claims."
  },
  {
    name: "Maine",
    slug: "maine",
    abbreviation: "ME",
    regulator: "Maine Bureau of Insurance",
    regulatorUrl: "https://www.maine.gov/pfr/insurance",
    phone: "1-800-300-5000"
  },
  {
    name: "Maryland",
    slug: "maryland",
    abbreviation: "MD",
    regulator: "Maryland Insurance Administration",
    regulatorUrl: "https://insurance.maryland.gov",
    phone: "1-800-492-6116"
  },
  {
    name: "Massachusetts",
    slug: "massachusetts",
    abbreviation: "MA",
    regulator: "Massachusetts Division of Insurance",
    regulatorUrl: "https://www.mass.gov/orgs/division-of-insurance",
    phone: "1-877-563-4467"
  },
  {
    name: "Michigan",
    slug: "michigan",
    abbreviation: "MI",
    regulator: "Michigan Department of Insurance and Financial Services",
    regulatorUrl: "https://www.michigan.gov/difs",
    phone: "1-877-999-6442"
  },
  {
    name: "Minnesota",
    slug: "minnesota",
    abbreviation: "MN",
    regulator: "Minnesota Department of Commerce",
    regulatorUrl: "https://mn.gov/commerce/insurance",
    phone: "1-651-539-1500"
  },
  {
    name: "Mississippi",
    slug: "mississippi",
    abbreviation: "MS",
    regulator: "Mississippi Insurance Department",
    regulatorUrl: "https://www.mid.ms.gov",
    phone: "1-800-562-2957"
  },
  {
    name: "Missouri",
    slug: "missouri",
    abbreviation: "MO",
    regulator: "Missouri Department of Commerce and Insurance",
    regulatorUrl: "https://insurance.mo.gov",
    phone: "1-800-726-7390"
  },
  {
    name: "Montana",
    slug: "montana",
    abbreviation: "MT",
    regulator: "Montana Commissioner of Securities and Insurance",
    regulatorUrl: "https://csimt.gov",
    phone: "1-800-332-6148"
  },
  {
    name: "Nebraska",
    slug: "nebraska",
    abbreviation: "NE",
    regulator: "Nebraska Department of Insurance",
    regulatorUrl: "https://doi.nebraska.gov",
    phone: "1-402-471-2201"
  },
  {
    name: "Nevada",
    slug: "nevada",
    abbreviation: "NV",
    regulator: "Nevada Division of Insurance",
    regulatorUrl: "https://doi.nv.gov",
    phone: "1-888-872-3234"
  },
  {
    name: "New Hampshire",
    slug: "new-hampshire",
    abbreviation: "NH",
    regulator: "New Hampshire Insurance Department",
    regulatorUrl: "https://www.nh.gov/insurance",
    phone: "1-800-852-3416"
  },
  {
    name: "New Jersey",
    slug: "new-jersey",
    abbreviation: "NJ",
    regulator: "New Jersey Department of Banking and Insurance",
    regulatorUrl: "https://www.state.nj.us/dobi",
    phone: "1-800-446-7467"
  },
  {
    name: "New Mexico",
    slug: "new-mexico",
    abbreviation: "NM",
    regulator: "New Mexico Office of Superintendent of Insurance",
    regulatorUrl: "https://www.osi.state.nm.us",
    phone: "1-855-427-5674"
  },
  {
    name: "New York",
    slug: "new-york",
    abbreviation: "NY",
    regulator: "New York Department of Financial Services",
    regulatorUrl: "https://www.dfs.ny.gov",
    phone: "1-800-342-3736",
    notes: "New York has strong consumer protection regulations for insurance."
  },
  {
    name: "North Carolina",
    slug: "north-carolina",
    abbreviation: "NC",
    regulator: "North Carolina Department of Insurance",
    regulatorUrl: "https://www.ncdoi.gov",
    phone: "1-855-408-1212"
  },
  {
    name: "North Dakota",
    slug: "north-dakota",
    abbreviation: "ND",
    regulator: "North Dakota Insurance Department",
    regulatorUrl: "https://www.insurance.nd.gov",
    phone: "1-800-247-0560"
  },
  {
    name: "Ohio",
    slug: "ohio",
    abbreviation: "OH",
    regulator: "Ohio Department of Insurance",
    regulatorUrl: "https://insurance.ohio.gov",
    phone: "1-800-686-1526"
  },
  {
    name: "Oklahoma",
    slug: "oklahoma",
    abbreviation: "OK",
    regulator: "Oklahoma Insurance Department",
    regulatorUrl: "https://www.oid.ok.gov",
    phone: "1-800-522-0071",
    notes: "Oklahoma sees significant hail and tornado claims."
  },
  {
    name: "Oregon",
    slug: "oregon",
    abbreviation: "OR",
    regulator: "Oregon Division of Financial Regulation",
    regulatorUrl: "https://dfr.oregon.gov",
    phone: "1-888-877-4894"
  },
  {
    name: "Pennsylvania",
    slug: "pennsylvania",
    abbreviation: "PA",
    regulator: "Pennsylvania Insurance Department",
    regulatorUrl: "https://www.insurance.pa.gov",
    phone: "1-877-881-6388"
  },
  {
    name: "Rhode Island",
    slug: "rhode-island",
    abbreviation: "RI",
    regulator: "Rhode Island Department of Business Regulation",
    regulatorUrl: "https://dbr.ri.gov/insurance",
    phone: "1-401-462-9520"
  },
  {
    name: "South Carolina",
    slug: "south-carolina",
    abbreviation: "SC",
    regulator: "South Carolina Department of Insurance",
    regulatorUrl: "https://doi.sc.gov",
    phone: "1-800-768-3467"
  },
  {
    name: "South Dakota",
    slug: "south-dakota",
    abbreviation: "SD",
    regulator: "South Dakota Division of Insurance",
    regulatorUrl: "https://dlr.sd.gov/insurance",
    phone: "1-605-773-3563"
  },
  {
    name: "Tennessee",
    slug: "tennessee",
    abbreviation: "TN",
    regulator: "Tennessee Department of Commerce and Insurance",
    regulatorUrl: "https://www.tn.gov/commerce/insurance.html",
    phone: "1-800-342-4029"
  },
  {
    name: "Texas",
    slug: "texas",
    abbreviation: "TX",
    regulator: "Texas Department of Insurance",
    regulatorUrl: "https://www.tdi.texas.gov",
    phone: "1-800-252-3439",
    notes: "Texas has the highest number of licensed adjusters and sees significant hail, wind, and hurricane claims."
  },
  {
    name: "Utah",
    slug: "utah",
    abbreviation: "UT",
    regulator: "Utah Insurance Department",
    regulatorUrl: "https://insurance.utah.gov",
    phone: "1-800-439-3805"
  },
  {
    name: "Vermont",
    slug: "vermont",
    abbreviation: "VT",
    regulator: "Vermont Department of Financial Regulation",
    regulatorUrl: "https://dfr.vermont.gov",
    phone: "1-802-828-3301"
  },
  {
    name: "Virginia",
    slug: "virginia",
    abbreviation: "VA",
    regulator: "Virginia Bureau of Insurance",
    regulatorUrl: "https://www.scc.virginia.gov/pages/Bureau-of-Insurance",
    phone: "1-877-310-6560"
  },
  {
    name: "Washington",
    slug: "washington",
    abbreviation: "WA",
    regulator: "Washington Office of the Insurance Commissioner",
    regulatorUrl: "https://www.insurance.wa.gov",
    phone: "1-800-562-6900"
  },
  {
    name: "West Virginia",
    slug: "west-virginia",
    abbreviation: "WV",
    regulator: "West Virginia Offices of the Insurance Commissioner",
    regulatorUrl: "https://www.wvinsurance.gov",
    phone: "1-888-879-9842"
  },
  {
    name: "Wisconsin",
    slug: "wisconsin",
    abbreviation: "WI",
    regulator: "Wisconsin Office of the Commissioner of Insurance",
    regulatorUrl: "https://oci.wi.gov",
    phone: "1-800-236-8517"
  },
  {
    name: "Wyoming",
    slug: "wyoming",
    abbreviation: "WY",
    regulator: "Wyoming Department of Insurance",
    regulatorUrl: "https://doi.wyo.gov",
    phone: "1-800-438-5768"
  }
];

export function getStateBySlug(slug: string): StateData | undefined {
  return statesData.find(state => state.slug === slug);
}

export function getAllStateSlugs(): string[] {
  return statesData.map(state => state.slug);
}
