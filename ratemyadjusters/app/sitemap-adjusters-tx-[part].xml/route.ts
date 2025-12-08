import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const PAGE_SIZE = 50000;

export async function GET(
  request: NextRequest,
  { params }: { params: { part: string } }
) {
  const part = parseInt(params.part, 10);

  if (isNaN(part) || part < 1 || part > 2) {
    return new NextResponse('Invalid part number', { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const baseUrl = 'https://ratemyadjusters.com';
  const today = new Date().toISOString().split('T')[0];

  const offset = (part - 1) * PAGE_SIZE;

  const { data: adjusters, error } = await supabase
    .from('adjusters')
    .select('slug')
    .eq('state', 'TX')
    .order('slug')
    .range(offset, offset + PAGE_SIZE - 1);

  if (error) {
    return new NextResponse('Database error', { status: 500 });
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (const adjuster of adjusters || []) {
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
