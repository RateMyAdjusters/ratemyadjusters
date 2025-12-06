# RateMyAdjusters.com

Rate and review insurance company adjusters. The first platform of its kind.

## Quick Start

### Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Name it `ratemyadjusters`
4. Set a secure database password (save this!)
5. Choose region closest to you
6. Wait for project to be created (~2 minutes)

Once created:
1. Go to **SQL Editor** in the left sidebar
2. Copy the entire contents of `supabase-schema.sql` from this project
3. Paste it into the SQL editor
4. Click **Run** to create all tables

Get your keys:
1. Go to **Settings** → **API**
2. Copy `Project URL` → This is your `NEXT_PUBLIC_SUPABASE_URL`
3. Copy `anon public` key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 2: Set Up Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import from GitHub (connect your GitHub account if needed)
4. Select this repository
5. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = (your project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (your anon key)
6. Click **Deploy**

### Step 3: Connect Domain

1. In Vercel, go to your project → **Settings** → **Domains**
2. Add `ratemyadjusters.com`
3. Go to GoDaddy (or your registrar)
4. Update nameservers OR add the DNS records Vercel provides

## Local Development

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
ratemyadjusters/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── adjuster/
│   │   └── [company]/
│   │       └── [slug]/
│   │           └── page.tsx        # Adjuster profile page (THE MONEY PAGE)
│   ├── company/
│   │   └── [slug]/
│   │       └── page.tsx            # Company page
│   ├── review/
│   │   └── page.tsx                # Write a review
│   └── search/
│       └── page.tsx                # Search/browse
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── StarRating.tsx
├── lib/
│   ├── supabase.ts                 # Supabase client
│   ├── types.ts                    # TypeScript types
│   └── utils.ts                    # Utility functions
├── supabase-schema.sql             # Database schema
└── package.json
```

## URL Structure (Critical for SEO)

```
/                                   → Homepage
/adjuster/state-farm/john-smith     → Adjuster profile
/company/state-farm                 → Company page
/search                             → Search/browse
/review                             → Write a review
```

## Next Steps After Deployment

1. **Add Your First Adjusters**
   - Go to your deployed site
   - Click "Write a Review"
   - Add adjusters you know from claims

2. **Seed Reviews**
   - Get contractors you know to leave reviews
   - Have friends/family who've had claims leave reviews
   - Target: 100 reviews in first month

3. **SEO Setup**
   - Add Google Search Console
   - Submit sitemap
   - Google will index adjuster profiles

4. **Scale Data Collection**
   - Reach out to contractors
   - Pull adjuster names from claim documents
   - Build email list of reviewers

## Key Files to Customize

1. `app/page.tsx` - Homepage content
2. `app/adjuster/[company]/[slug]/page.tsx` - Profile page layout
3. `components/Header.tsx` - Logo and navigation
4. `app/globals.css` - Brand colors

## Support

Questions? Issues? This is your project - make it yours.

---

Built for accountability in insurance claims.
