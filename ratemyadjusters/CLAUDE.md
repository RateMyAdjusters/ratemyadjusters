# RateMyAdjusters - Claude Code Instructions

## After Every Deployment

**IMPORTANT: Remind user to purge Cloudflare cache after every Vercel deployment.**

Steps:
1. Go to Cloudflare dashboard
2. Select ratemyadjusters.com
3. Caching → Configuration → Purge Everything

Without this, users will see the old cached version of the site.

## Project Info

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase
- **Hosting:** Vercel
- **CDN:** Cloudflare

## Color Psychology Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Navy Blue | #0A3D62 | Headers, trust elements (~30%) |
| Off-White | #F8F9FA | Backgrounds (~60%) |
| Soft Green | #4CAF50 | Success, checkmarks |
| Teal | #20A39E | Secondary accents |
| Warm Orange | #FF9800 | CTAs, action buttons |
| Charcoal | #333333 | Body text |
| Slate | #666666 | Secondary text |
