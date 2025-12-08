import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://ratemyadjusters.com';
  const today = new Date().toISOString().split('T')[0];

  const pages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/search', priority: '0.9', changefreq: 'daily' },
    { url: '/review', priority: '0.8', changefreq: 'weekly' },
    { url: '/add-adjuster', priority: '0.7', changefreq: 'weekly' },
    { url: '/login', priority: '0.5', changefreq: 'monthly' },
    { url: '/review-guidelines', priority: '0.6', changefreq: 'monthly' },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (const page of pages) {
    xml += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
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
