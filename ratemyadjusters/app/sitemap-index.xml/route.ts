import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://ratemyadjusters.com';
  const today = new Date().toISOString().split('T')[0];

  const stateCodes = [
    'al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'fl', 'ga',
    'hi', 'id', 'il', 'in', 'ia', 'ks', 'ky', 'la', 'me', 'md',
    'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj',
    'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc',
    'sd', 'tn', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy'
  ];

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
    <loc>${baseUrl}/sitemap-resources.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
`;

  for (const state of stateCodes) {
    xml += `  <sitemap>
    <loc>${baseUrl}/api/sitemap-adjusters/${state}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
`;
  }

  xml += `  <sitemap>
    <loc>${baseUrl}/api/sitemap-adjusters-tx/1</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/api/sitemap-adjusters-tx/2</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
`;

  xml += `</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
