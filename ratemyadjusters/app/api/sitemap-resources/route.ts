import { NextResponse } from 'next/server'

export async function GET() {
  const guides = [
    'what-is-an-insurance-adjuster',
    'what-to-expect-when-adjuster-visits',
    'staff-vs-independent-adjuster',
    'what-is-a-public-adjuster',
    'how-to-file-insurance-claim',
    'claim-denied-what-to-do',
    'how-to-negotiate-with-adjuster',
    'wall-street-blackrock-insurance-claims',
    'ai-insurance-claims-2025',
    'mckinsey-allstate-insurance-claims-history',
    'vendor-networks-insurance-claims',
  ]

  const today = new Date().toISOString().split('T')[0]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ratemyadjusters.com/guides</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${guides.map(slug => `  <url>
    <loc>https://ratemyadjusters.com/guides/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
  <url>
    <loc>https://ratemyadjusters.com/review-guidelines</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
