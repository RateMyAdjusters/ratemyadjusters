export interface CompanyData {
  name: string
  tagline: string
  about: string
  claimsInfo: string
}

export const companiesMap: Record<string, CompanyData> = {
  'state-farm': {
    name: 'State Farm',
    tagline: 'The largest property and casualty insurer in the United States.',
    about: 'State Farm is the largest property and casualty insurance provider in the United States, serving millions of policyholders across all 50 states. Founded in 1922, the company offers a wide range of insurance products including homeowners, auto, and life insurance. State Farm operates through a network of exclusive agents and employs both staff and independent adjusters to handle property claims.',
    claimsInfo: 'State Farm adjusters handle a high volume of homeowners claims each year, ranging from weather-related damage to theft and liability incidents. The claims process typically begins with a policyholder report, followed by an adjuster assignment and property inspection.',
  },
  'allstate': {
    name: 'Allstate',
    tagline: 'One of the largest personal lines insurers in America.',
    about: 'Allstate Corporation is one of the largest publicly held personal lines insurers in the United States. Founded in 1931, Allstate offers insurance products including homeowners, auto, and life insurance through a network of agents and direct channels. The company serves millions of households across the country.',
    claimsInfo: 'Allstate adjusters evaluate property damage claims for homeowners policies, including damage from storms, fire, water, and other covered events. The company uses both staff adjusters and independent adjusters depending on claim volume and location.',
  },
  'usaa': {
    name: 'USAA',
    tagline: 'Serving military members and their families since 1922.',
    about: 'USAA (United Services Automobile Association) is a financial services company offering insurance, banking, and investment products primarily to military members, veterans, and their families. Founded in 1922 by a group of Army officers, USAA has grown to serve millions of members nationwide.',
    claimsInfo: 'USAA adjusters handle property claims for their membership base, which includes active duty military, veterans, and eligible family members. The company is known for its member-focused approach and offers claims service through various channels including mobile apps and phone support.',
  },
  'liberty-mutual': {
    name: 'Liberty Mutual',
    tagline: 'A global insurance company with over a century of experience.',
    about: 'Liberty Mutual is a global insurance company founded in 1912, offering a wide range of insurance products including homeowners, auto, and commercial insurance. The company operates in markets around the world and serves both individual consumers and businesses.',
    claimsInfo: 'Liberty Mutual adjusters evaluate residential property claims across the country. The company employs staff adjusters and works with independent adjusting firms to handle claims from weather events, accidents, and other covered losses.',
  },
  'progressive': {
    name: 'Progressive',
    tagline: 'Known for innovation in the insurance industry.',
    about: 'Progressive Corporation is one of the largest providers of car insurance in the United States and also offers homeowners insurance through select markets. Founded in 1937, Progressive has grown through innovation and direct-to-consumer sales channels.',
    claimsInfo: 'Progressive adjusters handle property claims for their homeowners insurance products. While Progressive is primarily known for auto insurance, their property claims team evaluates damage from covered events for residential policyholders.',
  },
  'farmers': {
    name: 'Farmers Insurance',
    tagline: 'Serving American families for nearly a century.',
    about: 'Farmers Insurance is one of the largest insurers of vehicles and homes in the United States. Founded in 1928, Farmers operates through a network of exclusive agents across the country and offers a broad range of insurance products for individuals and businesses.',
    claimsInfo: 'Farmers adjusters assess property damage for homeowners claims, including damage from natural disasters, accidents, and other covered events. The company has a large network of adjusters to handle claims across their service areas.',
  },
  'nationwide': {
    name: 'Nationwide',
    tagline: 'One of the largest diversified insurance and financial services companies.',
    about: 'Nationwide is one of the largest insurance and financial services companies in the United States. Founded in 1926, Nationwide offers a full range of insurance and financial products including homeowners, auto, life insurance, and retirement services.',
    claimsInfo: 'Nationwide adjusters handle residential property claims for policyholders across the country. The company processes claims for a variety of covered events including weather damage, theft, and liability incidents.',
  },
  'travelers': {
    name: 'Travelers',
    tagline: 'A leading provider of property and casualty insurance.',
    about: 'Travelers Companies, Inc. is one of the largest writers of commercial and personal property casualty insurance in the United States. With a history dating back to 1853, Travelers offers a wide range of insurance products through independent agents and brokers.',
    claimsInfo: 'Travelers adjusters evaluate property damage claims for both personal and commercial lines. The company has extensive experience handling claims from major weather events and employs a large team of adjusters nationwide.',
  },
  'aaa': {
    name: 'AAA Insurance',
    tagline: 'Insurance services from the trusted roadside assistance provider.',
    about: 'AAA (American Automobile Association) offers insurance products through its affiliated insurance companies. Known primarily for roadside assistance, AAA has expanded to offer homeowners, auto, and other insurance products through its regional clubs across the United States.',
    claimsInfo: 'AAA insurance adjusters handle property claims for homeowners policies written through AAA-affiliated insurers. Claims handling may vary by region as AAA operates through independent regional clubs.',
  },
  'geico': {
    name: 'GEICO',
    tagline: 'Government Employees Insurance Company, serving all Americans.',
    about: 'GEICO (Government Employees Insurance Company) is one of the largest auto insurers in the United States. A subsidiary of Berkshire Hathaway, GEICO also offers homeowners insurance in many states through partnerships with other carriers.',
    claimsInfo: 'GEICO homeowners claims are often handled through partner insurance companies. Adjusters evaluate property damage for covered events under GEICO-branded homeowners policies, which may be underwritten by various carriers depending on location.',
  },
  'the-hartford': {
    name: 'The Hartford',
    tagline: 'Over 200 years of insurance experience.',
    about: 'The Hartford Financial Services Group is one of the largest insurance companies in the United States with a history spanning over 200 years. The company offers property and casualty insurance, group benefits, and mutual funds.',
    claimsInfo: 'The Hartford adjusters evaluate property claims for both personal and commercial policyholders. The company has experience handling a wide range of claims from weather events, fires, and other covered losses.',
  },
  'amica': {
    name: 'Amica Mutual',
    tagline: 'The oldest mutual insurer of automobiles in the United States.',
    about: 'Amica Mutual Insurance Company is the oldest mutual insurer of automobiles in the United States, founded in 1907. Amica offers auto, homeowners, and umbrella insurance products and is known for selling policies directly to consumers.',
    claimsInfo: 'Amica adjusters handle property claims for their homeowners policyholders. As a mutual company, Amica is owned by its policyholders and focuses on direct relationships with customers throughout the claims process.',
  },
  'chubb': {
    name: 'Chubb',
    tagline: 'The world\'s largest publicly traded property and casualty insurer.',
    about: 'Chubb Limited is the world\'s largest publicly traded property and casualty insurance company. Chubb provides commercial and personal property insurance, accident and health insurance, and life insurance to a diverse group of clients worldwide.',
    claimsInfo: 'Chubb adjusters evaluate property claims for both high-value personal lines and commercial accounts. The company is known for insuring high-net-worth individuals and offers specialized coverage options.',
  },
  'erie-insurance': {
    name: 'Erie Insurance',
    tagline: 'Serving policyholders in the Mid-Atlantic and Midwest since 1925.',
    about: 'Erie Insurance Group is a publicly held insurance company based in Erie, Pennsylvania. Founded in 1925, Erie offers auto, home, business, and life insurance products through independent agents in 12 states and the District of Columbia.',
    claimsInfo: 'Erie Insurance adjusters handle property claims within their regional service area. The company is known for its strong presence in the Mid-Atlantic and Midwest regions of the United States.',
  },
  'auto-owners': {
    name: 'Auto-Owners Insurance',
    tagline: 'Serving policyholders through independent agents since 1916.',
    about: 'Auto-Owners Insurance Company is a mutual insurance company that sells auto, home, business, and life insurance through independent agents. Founded in 1916, the company operates in 26 states primarily in the Midwest and South.',
    claimsInfo: 'Auto-Owners adjusters evaluate property claims for homeowners policies across their service territory. As a mutual company, Auto-Owners is owned by its policyholders.',
  },
  'safeco': {
    name: 'Safeco Insurance',
    tagline: 'A Liberty Mutual company serving homeowners nationwide.',
    about: 'Safeco Insurance is a Liberty Mutual company that offers auto, home, and other personal insurance products through independent agents. Safeco has been in business since 1923 and operates throughout the United States.',
    claimsInfo: 'Safeco adjusters handle property claims for homeowners policyholders. As part of Liberty Mutual, Safeco benefits from the resources of one of the largest insurance organizations in the world.',
  },
  'metlife': {
    name: 'MetLife',
    tagline: 'A global provider of insurance and financial services.',
    about: 'MetLife, Inc. is one of the largest global providers of insurance, annuities, and employee benefit programs. While MetLife has exited some property insurance markets, the company has a long history in homeowners insurance.',
    claimsInfo: 'MetLife property claims may be handled differently depending on when the policy was written and in which market. Some MetLife homeowners policies have been transferred to other carriers over the years.',
  },
  'american-family': {
    name: 'American Family Insurance',
    tagline: 'Protecting dreams for over 90 years.',
    about: 'American Family Insurance is a mutual company that sells auto, home, business, and life insurance. Founded in 1927 and headquartered in Madison, Wisconsin, American Family operates through exclusive agents in 19 states.',
    claimsInfo: 'American Family adjusters evaluate property claims for homeowners across their service area. The company handles claims from weather events, accidents, and other covered losses.',
  },
  'cna': {
    name: 'CNA Insurance',
    tagline: 'One of the largest commercial property and casualty companies.',
    about: 'CNA Financial Corporation is one of the largest commercial property and casualty insurance companies in the United States. Founded in 1897, CNA offers a broad range of insurance products primarily for businesses.',
    claimsInfo: 'CNA adjusters primarily handle commercial property claims, though the company does offer some personal lines products. CNA is known for its expertise in specialty insurance lines.',
  },
  'mercury-insurance': {
    name: 'Mercury Insurance',
    tagline: 'Providing affordable insurance since 1962.',
    about: 'Mercury Insurance Group is an insurance company offering auto, homeowners, and commercial insurance primarily in California and other select states. Founded in 1962, Mercury focuses on providing competitive rates.',
    claimsInfo: 'Mercury Insurance adjusters handle property claims for homeowners in their service areas. The company operates primarily in California with additional presence in other states.',
  },
  'hanover': {
    name: 'The Hanover Insurance Group',
    tagline: 'Partner-focused insurance solutions since 1852.',
    about: 'The Hanover Insurance Group is a holding company for several property and casualty insurance companies. Founded in 1852, The Hanover offers personal and commercial insurance through a network of independent agents.',
    claimsInfo: 'Hanover adjusters evaluate property claims for homeowners and commercial policyholders. The company works exclusively through independent agents and brokers.',
  },
  'kemper': {
    name: 'Kemper Insurance',
    tagline: 'Specialized insurance solutions for diverse needs.',
    about: 'Kemper Corporation is an insurance holding company offering auto, home, and life insurance products. Kemper serves a variety of markets including preferred, standard, and specialty insurance segments.',
    claimsInfo: 'Kemper adjusters handle property claims across their various insurance brands and products. The company serves diverse customer segments through multiple distribution channels.',
  },
}

export const companiesList = Object.entries(companiesMap).map(([slug, data]) => ({
  slug,
  name: data.name,
}))
