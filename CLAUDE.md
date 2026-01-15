# Claude Code Guidelines for RateMyAdjusters

## REQUIRED SAFETY RULES

- **NEVER use `rm -rf`** - Use `trash` instead for recoverable deletion
- **NEVER run destructive SQL** without explicit confirmation
- **NEVER force push** to main/master branches

## Project Structure

- Main app is in `/ratemyadjusters/` subdirectory
- Next.js 14 with App Router
- Supabase for database

## Deployment

- Vercel project: ratemyadjusters
- Root Directory in Vercel: `ratemyadjusters`
- Deploy via GitHub push or `vercel --prod --yes` from inside the subdirectory
