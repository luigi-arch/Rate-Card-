# SideStreet — Interactive Rate Card

An interactive landing page that presents SideStreet's content services as
**solutions to marketing headaches**, not a list of deliverables. It doubles as
a **lead collector and qualifier**: visitors pick the problems they recognise,
the page matches each to the right content format, and their selections pre-fill
a brief that's captured to a database.

> _“You bring the headache. We build the story.”_

## What it does

1. **Sets up the space** — who SideStreet is and the audience (160K+ followers,
   1.5M+ monthly reach, 50% under 35).
2. **Reframes the offer** — clients don't want reels, they want outcomes
   (clarity, authenticity, utility, trust, credibility, community).
3. **Qualifies the visitor** — the _Find your fix_ section lets them select their
   headaches; the page recommends matching formats live.
4. **Presents the rate card** — six formats with pricing, packages, add-ons and
   distribution logic.
5. **Proves it** — campaign results, client logos and a real portfolio wall.
6. **Captures the lead** — a brief form pre-filled with the visitor's selected
   headaches and recommended formats, written to Supabase.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Supabase** for lead capture (insert-only via RLS)

All rate-card content lives in [`src/lib/content.ts`](src/lib/content.ts) — edit
that one file to update copy, pricing, formats, packages, stats or portfolio.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + publishable key
npm run dev                  # http://localhost:3000
```

### Environment variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable (anon) key — safe to expose |

The anon key is safe in the client because the `ratecard_leads` table has Row
Level Security that **only permits `INSERT`** from the anonymous role — leads can
be written, never read, from the public key.

## Lead storage

Leads are written to the `public.ratecard_leads` table. The schema and RLS policy
are in [`supabase/migrations/0001_create_ratecard_leads.sql`](supabase/migrations/0001_create_ratecard_leads.sql).

| Column | Notes |
| --- | --- |
| `name`, `email` | required (validated server-side) |
| `company`, `role`, `phone` | optional |
| `headaches` | the problems the visitor selected |
| `recommended_formats` | formats matched to those problems |
| `budget`, `timeline`, `message` | qualifier fields |
| `source`, `referrer`, `user_agent` | attribution |

Submissions go through a Next.js **server action**
([`src/app/actions.ts`](src/app/actions.ts)) which validates input before
inserting. To read/export leads, use the Supabase dashboard or query with a
service-role key (never expose that key client-side).

## Deploy

Deploys cleanly to **Vercel** (or any Node host):

1. Push the repo and import it into Vercel.
2. Add the two environment variables above.
3. Deploy.

```bash
npm run build && npm start   # production build locally
```

## Brand

Black + gold, matching SideStreet's Media & Partnerships deck. Theme tokens
(colours, fonts) are defined in [`src/app/globals.css`](src/app/globals.css);
swap the `--color-gold` value or the logo in
[`src/components/Logo.tsx`](src/components/Logo.tsx) to rebrand.
