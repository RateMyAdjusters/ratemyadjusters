import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://ratemyadjusters.com';
  const today = new Date().toISOString().split('T')[0];

  const resources = [
    { url: '/review-guidelines', priority: '0.7' },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (const resource of resources) {
    xml += `  <url>
    <loc>${baseUrl}${resource.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${resource.priority}</priority>
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
