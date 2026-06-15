-- Isolated table for the SideStreet rate-card landing page leads.
-- Kept separate from the Content PipeLine application tables.
-- Applied to project: otucjmkjmsbojghkgnxm (Content PipeLine).
create table if not exists public.ratecard_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text,
  company text,
  role text,
  phone text,
  headaches text[] not null default '{}',
  recommended_formats text[] not null default '{}',
  budget text,
  timeline text,
  message text,
  source text not null default 'rate-card-landing',
  user_agent text,
  referrer text
);

comment on table public.ratecard_leads is
  'Leads captured from the SideStreet interactive rate-card landing page. Public can insert only.';

alter table public.ratecard_leads enable row level security;

-- Public lead form: allow anonymous + authenticated INSERTs only.
-- No SELECT/UPDATE/DELETE policies => the public/anon role can never read or modify rows.
drop policy if exists "ratecard_leads_public_insert" on public.ratecard_leads;
create policy "ratecard_leads_public_insert"
  on public.ratecard_leads
  for insert
  to anon, authenticated
  with check (true);

create index if not exists ratecard_leads_created_at_idx
  on public.ratecard_leads (created_at desc);
