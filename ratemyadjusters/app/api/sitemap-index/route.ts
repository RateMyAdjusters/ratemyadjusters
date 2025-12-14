import { NextResponse } from 'next/server';

const URLS_PER_PAGE = 10000;

const STATE_COUNTS: Record<string, number> = {
  'tx': 125548,
  'fl': 74570,
  'ga': 25705,
  'oh': 23934,
  'az': 21148,
  'il': 19911,
  'ma': 10491,
  'ca': 8000,
  'ny': 7112,
  'al': 6870,
  'ks': 6563,
  'nc': 6000,
  'va': 5500,
  'pa': 5000,
  'mi': 4500,
  'tn': 4000,
  'sc': 3500,
  'mo': 3000,
  'nj': 2800,
  'la': 2500,
  'ok': 2000,
  'in': 2000,
  'co': 1800,
  'wa': 1500,
  'md': 1400,
  'mn': 1300,
  'wi': 1200,
  'ky': 1100,
  'ar': 1000,
  'nv': 900,
  'or': 800,
  'ia': 700,
  'id': 647,
  'ms': 600,
  'ct': 550,
  'nm': 500,
  'ne': 450,
  'ut': 400,
  'wv': 350,
  'nh': 300,
  'me': 250,
  'sd': 186,
  'mt': 150,
  'de': 120,
  'wy': 106,
  'ri': 100,
  'vt': 90,
  'ak': 80,
  'nd': 61,
  'hi': 60,
};

export async function GET() {
  const baseUrl = 'https://ratemyadjusters.com';
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-core.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-states.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-companies.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/api/sitemap-resources</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
`;

  const states = Object.keys(STATE_COUNTS).sort();
  
  for (const state of states) {
    const count = STATE_COUNTS[state];
    const totalPages = Math.max(1, Math.ceil(count / URLS_PER_PAGE));
    
    for (let page = 1; page <= totalPages; page++) {
      xml += `  <sitemap>
    <loc>${baseUrl}/api/sitemap-adjusters/${state}/${page}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
`;
    }
  }

  xml += `</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
```

---

## What This Does

**Before (your old file):**
```
/api/sitemap-adjusters → 1,000 URLs (Supabase limit)
```

**After (new file):**
```
/api/sitemap-adjusters/tx/1 → 10,000 URLs
/api/sitemap-adjusters/tx/2 → 10,000 URLs
...
/api/sitemap-adjusters/tx/13 → 5,548 URLs
/api/sitemap-adjusters/fl/1 → 10,000 URLs
...
(75+ sitemap files total = 405,000 URLs)
