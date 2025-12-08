import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://ratemyadjusters.com';
  const today = new Date().toISOString().split('T')[0];

  const companies = [
    'state-farm', 'allstate', 'usaa', 'liberty-mutual', 'progressive',
    'farmers', 'nationwide', 'travelers', 'geico', 'american-family',
    'erie', 'auto-owners', 'hartford', 'chubb', 'amica'
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (const company of companies) {
    xml += `  <url>
    <loc>${baseUrl}/company/${company}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
