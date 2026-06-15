# Deploying to Vercel

The app is a standard Next.js project — Vercel auto-detects everything. No
`vercel.json` needed.

## One-time setup (~2 minutes)

1. Go to **https://vercel.com/new** and sign in with the GitHub account that owns
   `luigi-arch/Rate-Card-`.
2. Click **Import** next to the `Rate-Card-` repository.
   - If you don't see it, click **Adjust GitHub App Permissions** and grant Vercel
     access to the repo.
3. On the configure screen, Vercel will detect **Next.js** automatically. Leave the
   build settings as-is.
4. Open **Environment Variables** and add these two (the key is a *publishable*
   key — safe to expose, and the `ratecard_leads` table is insert-only via RLS):

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://otucjmkjmsbojghkgnxm.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_gGmrajsiBz_jR-FBwMLCCw_u_5gAW2k` |

5. Click **Deploy**. You'll get a live URL (e.g. `rate-card.vercel.app`) in ~1 min.

## Which branch deploys?

- Vercel deploys your **production** branch (default `main`) to the main domain.
- Every branch / PR — including `claude/beautiful-brahmagupta-bfnpor` — gets its own
  **preview URL** automatically once the PR is open. Use that to review before merging.

## Custom domain

To serve it from `sidestreetmalta.com` (or a subdomain like `rates.sidestreetmalta.com`):
**Project → Settings → Domains → Add**, then point the DNS record as Vercel instructs.

## Verifying lead capture

After deploy, submit the form on the live site, then check the row landed:
**Supabase dashboard → Table editor → `ratecard_leads`**. (Leads are only readable
from the dashboard / a service-role key — never from the public site.)

## CLI alternative

If you prefer the terminal and have the Vercel CLI authenticated locally:

```bash
npm i -g vercel
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel --prod
```
