-- Behavioural analytics for the SideStreet rate-card landing page.
-- Mirrors ratecard_leads: the anon role may INSERT only; no SELECT/UPDATE/DELETE
-- policies, so events can never be read or modified by the public. The admin
-- dashboard reads via the service-role key (bypasses RLS).
-- Applied to project: otucjmkjmsbojghkgnxm (Content PipeLine).
--
-- Privacy: metadata only. No raw click coordinates (no heatmap) and no typed form
-- values are stored here — `name` holds element/section/field labels or a picked
-- option value; actual contact details land in ratecard_leads on submit.
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id text not null,
  event_type text not null,   -- session_start | heartbeat | scroll_depth | section_view | click | cta_click | select | form_field
  name text,                  -- element/section/field label or selected value (never typed input text)
  detail jsonb not null default '{}',
  path text,
  referrer text,
  user_agent text,
  viewport text,
  active_ms integer,
  scroll_pct integer,
  source text not null default 'rate-card-landing'
);

comment on table public.analytics_events is
  'Behavioural analytics for the SideStreet rate-card page. Public can insert only; metadata-only (no coords, no typed values).';

alter table public.analytics_events enable row level security;

-- Public site: allow anonymous + authenticated INSERTs only.
drop policy if exists "analytics_events_public_insert" on public.analytics_events;
create policy "analytics_events_public_insert"
  on public.analytics_events
  for insert
  to anon, authenticated
  with check (true);

create index if not exists analytics_events_created_at_idx
  on public.analytics_events (created_at desc);
create index if not exists analytics_events_session_idx
  on public.analytics_events (session_id);
create index if not exists analytics_events_type_idx
  on public.analytics_events (event_type);
