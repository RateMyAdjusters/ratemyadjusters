import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const STATES = [
  { slug: 'alabama', abbr: 'AL' },
  { slug: 'alaska', abbr: 'AK' },
  { slug: 'arizona', abbr: 'AZ' },
  { slug: 'arkansas', abbr: 'AR' },
  { slug: 'california', abbr: 'CA' },
  { slug: 'colorado', abbr: 'CO' },
  { slug: 'connecticut', abbr: 'CT' },
  { slug: 'delaware', abbr: 'DE' },
  { slug: 'florida', abbr: 'FL' },
  { slug: 'georgia', abbr: 'GA' },
  { slug: 'hawaii', abbr: 'HI' },
  { slug: 'idaho', abbr: 'ID' },
  { slug: 'illinois', abbr: 'IL' },
  { slug: 'indiana', abbr: 'IN' },
  { slug: 'iowa', abbr: 'IA' },
  { slug: 'kansas', abbr: 'KS' },
  { slug: 'kentucky', abbr: 'KY' },
  { slug: 'louisiana', abbr: 'LA' },
  { slug: 'maine', abbr: 'ME' },
  { slug: 'maryland', abbr: 'MD' },
  { slug: 'massachusetts', abbr: 'MA' },
  { slug: 'michigan', abbr: 'MI' },
  { slug: 'minnesota', abbr: 'MN' },
  { slug: 'mississippi', abbr: 'MS' },
  { slug: 'missouri', abbr: 'MO' },
  { slug: 'montana', abbr: 'MT' },
  { slug: 'nebraska', abbr: 'NE' },
  { slug: 'nevada', abbr: 'NV' },
  { slug: 'new-hampshire', abbr: 'NH' },
  { slug: 'new-jersey', abbr: 'NJ' },
  { slug: 'new-mexico', abbr: 'NM' },
  { slug: 'new-york', abbr: 'NY' },
  { slug: 'north-carolina', abbr: 'NC' },
  { slug: 'north-dakota', abbr: 'ND' },
  { slug: 'ohio', abbr: 'OH' },
  { slug: 'oklahoma', abbr: 'OK' },
  { slug: 'oregon', abbr: 'OR' },
  { slug: 'pennsylvania', abbr: 'PA' },
  { slug: 'rhode-island', abbr: 'RI' },
  { slug: 'south-carolina', abbr: 'SC' },
  { slug: 'south-dakota', abbr: 'SD' },
  { slug: 'tennessee', abbr: 'TN' },
  { slug: 'texas', abbr: 'TX' },
  { slug: 'utah', abbr: 'UT' },
  { slug: 'vermont', abbr: 'VT' },
  { slug: 'virginia', abbr: 'VA' },
  { slug: 'washington', abbr: 'WA' },
  { slug: 'west-virginia', abbr: 'WV' },
  { slug: 'wisconsin', abbr: 'WI' },
  { slug: 'wyoming', abbr: 'WY' },
  { slug: 'district-of-columbia', abbr: 'DC' },
]

function nameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export async function GET() {
  const baseUrl = 'https://ratemyadjusters.com'
  const today = new Date().toISOString().split('T')[0]

  let urls: string[] = []

  // Main public adjusters page
  urls.push(`
  <url>
    <loc>${baseUrl}/public-adjusters</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`)

  // Add/review pages
  urls.push(`
  <url>
    <loc>${baseUrl}/add-public-adjuster</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`)

  urls.push(`
  <url>
    <loc>${baseUrl}/review-public-adjuster</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`)

  // State pages
  for (const state of STATES) {
    urls.push(`
  <url>
    <loc>${baseUrl}/public-adjusters/${state.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`)
  }

  // Get cities with significant PA presence (5+ public adjusters)
  for (const state of STATES) {
    const { data: cityData } = await supabase
      .from('public_adjusters')
      .select('city')
      .eq('state', state.abbr)
      .not('city', 'is', null)
      .neq('city', '')

    if (cityData) {
      const cityCounts: Record<string, number> = {}
      cityData.forEach(row => {
        if (row.city) {
          cityCounts[row.city] = (cityCounts[row.city] || 0) + 1
        }
      })

      const significantCities = Object.entries(cityCounts)
        .filter(([_, count]) => count >= 5)
        .map(([city]) => city)

      for (const city of significantCities) {
        urls.push(`
  <url>
    <loc>${baseUrl}/public-adjusters/${state.slug}/${nameToSlug(city)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`)
      }
    }
  }

  // Get all public adjuster profile pages
  const { data: publicAdjusters } = await supabase
    .from('public_adjusters')
    .select('slug, updated_at')
    .order('total_reviews', { ascending: false })
    .limit(50000)

  if (publicAdjusters) {
    for (const pa of publicAdjusters) {
      const lastmod = pa.updated_at ? new Date(pa.updated_at).toISOString().split('T')[0] : today
      urls.push(`
  <url>
    <loc>${baseUrl}/public-adjuster/${pa.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`)
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
