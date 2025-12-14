// ============================================
// FILE: app/api/sitemap-adjusters/[state]/[page]/route.ts
// ============================================
// This handles ALL states with pagination
// URL format: /api/sitemap-adjusters/tx/1, /api/sitemap-adjusters/fl/3, etc.

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 10,000 URLs per sitemap file (Google allows 50K but smaller = faster)
const URLS_PER_PAGE = 10000;

const stateMap: Record<string, string> = {
  'al': 'AL', 'ak': 'AK', 'az': 'AZ', 'ar': 'AR', 'ca': 'CA',
  'co': 'CO', 'ct': 'CT', 'de': 'DE', 'fl': 'FL', 'ga': 'GA',
  'hi': 'HI', 'id': 'ID', 'il': 'IL', 'in': 'IN', 'ia': 'IA',
  'ks': 'KS', 'ky': 'KY', 'la': 'LA', 'me': 'ME', 'md': 'MD',
  'ma': 'MA', 'mi': 'MI', 'mn': 'MN', 'ms': 'MS', 'mo': 'MO',
  'mt': 'MT', 'ne': 'NE', 'nv': 'NV', 'nh': 'NH', 'nj': 'NJ',
  'nm': 'NM', 'ny': 'NY', 'nc': 'NC', 'nd': 'ND', 'oh': 'OH',
  'ok': 'OK', 'or': 'OR', 'pa': 'PA', 'ri': 'RI', 'sc': 'SC',
  'sd': 'SD', 'tn': 'TN', 'tx': 'TX', 'ut': 'UT', 'vt': 'VT',
  'va': 'VA', 'wa': 'WA', 'wv': 'WV', 'wi': 'WI', 'wy': 'WY'
};

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ state: string; page: string }> }
) {
  const { state, page } = await context.params;
  const stateCode = state.toLowerCase().replace('.xml', '');
  const pageNum = parseInt(page.replace('.xml', '')) || 1;
  const stateUpper = stateMap[stateCode];

  if (!stateUpper) {
    return new NextResponse('State not found', { status: 404 });
  }

  // Allow up to 20 pages per state (200K adjusters max per state)
  if (pageNum < 1 || pageNum > 20) {
    return new NextResponse('Invalid page number', { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const baseUrl = 'https://ratemyadjusters.com';
  const today = new Date().toISOString().split('T')[0];

  // Calculate offset for pagination
  const offset = (pageNum - 1) * URLS_PER_PAGE;

  // Fetch adjusters with proper pagination using range()
  const { data: adjusters, error } = await supabase
    .from('adjusters')
    .select('slug')
    .eq('state', stateUpper)
    .order('slug')
    .range(offset, offset + URLS_PER_PAGE - 1);

  if (error) {
    console.error('Sitemap error:', error);
    return new NextResponse('Database error', { status: 500 });
  }

  // Return 404 if no adjusters for this page (page number too high)
  if (!adjusters || adjusters.length === 0) {
    return new NextResponse('No adjusters found for this page', { status: 404 });
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (const adjuster of adjusters) {
    xml += `  <url>
    <loc>${baseUrl}/adjuster/${adjuster.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
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
