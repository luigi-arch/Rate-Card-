"use client";

import { useState } from "react";
import type {
  SiteContent,
  ContentFormat,
  Headache,
  Package,
  PortfolioItem,
  ResultItem,
  AddOnGroup,
  IncludeGroup,
  ServiceItem,
  AboutPillar,
} from "@/lib/content";
import { saveSiteContent, signOutAction } from "@/app/admin/actions";
import {
  Panel,
  Group,
  TextField,
  TextArea,
  NumberField,
  ToggleField,
  StringListEditor,
  Repeater,
  ImageField,
} from "./fields";

export default function AdminEditor({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  // Update one top-level key of the document.
  function set<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  function fail(text: string) {
    setMsg({ ok: false, text });
  }

  async function handleSave() {
    setSaving(true);
    setMsg(null);
    const res = await saveSiteContent(content);
    setSaving(false);
    setMsg(
      res.ok
        ? { ok: true, text: "Saved & published. Refresh the site to see it." }
        : { ok: false, text: res.error ?? "Save failed." }
    );
  }

  const formatOptions = content.formats.map((f) => ({
    id: f.id,
    name: f.name || f.id || "(unnamed)",
  }));

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
      {/* top bar */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="font-display text-2xl tracking-[0.04em]">
            SIDE<span className="text-gold">STREET</span> CMS
          </p>
          <p className="text-xs text-muted">Edit every section of the site</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="press rounded-full border border-line-strong px-4 py-2 text-sm font-semibold hover:border-fg"
          >
            View site ↗
          </a>
          <form action={signOutAction}>
            <button className="press rounded-full border border-line-strong px-4 py-2 text-sm font-semibold hover:border-fg">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="mt-8 space-y-4 pb-28">
        {/* ---- Hero ---- */}
        <Panel title="Hero" defaultOpen>
          <TextField
            label="Headline — line 1"
            value={content.hero.line1}
            onChange={(v) => set("hero", { ...content.hero, line1: v })}
          />
          <TextField
            label="Headline — line 2"
            value={content.hero.line2}
            onChange={(v) => set("hero", { ...content.hero, line2: v })}
          />
          <TextArea
            label="Subtext"
            value={content.hero.sub}
            onChange={(v) => set("hero", { ...content.hero, sub: v })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageField
              label="Showreel video"
              accept="video/*"
              slot="hero-video"
              value={content.hero.videoUrl}
              onChange={(url) => set("hero", { ...content.hero, videoUrl: url })}
              onError={fail}
            />
            <ImageField
              label="Showreel image / poster"
              slot="hero-image"
              value={content.hero.imageUrl}
              onChange={(url) => set("hero", { ...content.hero, imageUrl: url })}
              onError={fail}
            />
          </div>
        </Panel>

        {/* ---- About ---- */}
        <Panel title="About / who we are">
          <TextField
            label="Title"
            value={content.about.title}
            onChange={(v) => set("about", { ...content.about, title: v })}
          />
          <TextArea
            label="Intro"
            value={content.about.body}
            onChange={(v) => set("about", { ...content.about, body: v })}
          />
          <Group title="Pillars">
            <Repeater<AboutPillar>
              items={content.about.pillars}
              onChange={(pillars) => set("about", { ...content.about, pillars })}
              makeBlank={() => ({ number: "", title: "", body: "" })}
              itemTitle={(p) => p.title || "Pillar"}
              addLabel="Add pillar"
            >
              {(item, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
                    <TextField
                      label="Number"
                      value={item.number}
                      onChange={(v) => update({ number: v })}
                    />
                    <TextField
                      label="Title"
                      value={item.title}
                      onChange={(v) => update({ title: v })}
                    />
                  </div>
                  <TextArea
                    label="Body"
                    value={item.body}
                    onChange={(v) => update({ body: v })}
                  />
                </>
              )}
            </Repeater>
          </Group>
        </Panel>

        {/* ---- Audience / platform stats ---- */}
        <Panel title="Audience & platform stats">
          <TextField
            label="Tagline pill"
            value={content.audience.tagline}
            onChange={(v) =>
              set("audience", { ...content.audience, tagline: v })
            }
          />

          <Group title="Headline stats">
            <Repeater<{ value: string; label: string }>
              items={content.audience.headline}
              onChange={(headline) =>
                set("audience", { ...content.audience, headline })
              }
              makeBlank={() => ({ value: "", label: "" })}
              itemTitle={(s) => s.label || "Stat"}
              addLabel="Add stat"
            >
              {(item, update) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="Value"
                    value={item.value}
                    onChange={(v) => update({ value: v })}
                  />
                  <TextField
                    label="Label"
                    value={item.label}
                    onChange={(v) => update({ label: v })}
                  />
                </div>
              )}
            </Repeater>
          </Group>

          <Group title="Follower channels">
            <Repeater<{ name: string; value: string }>
              items={content.audience.channels}
              onChange={(channels) =>
                set("audience", { ...content.audience, channels })
              }
              makeBlank={() => ({ name: "", value: "" })}
              itemTitle={(c) => c.name || "Channel"}
              addLabel="Add channel"
            >
              {(item, update) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="Name"
                    value={item.name}
                    onChange={(v) => update({ name: v })}
                  />
                  <TextField
                    label="Followers"
                    value={item.value}
                    onChange={(v) => update({ value: v })}
                  />
                </div>
              )}
            </Repeater>
          </Group>

          <Group title="Age distribution">
            <Repeater<{ range: string; pct: number }>
              items={content.audience.age}
              onChange={(age) => set("audience", { ...content.audience, age })}
              makeBlank={() => ({ range: "", pct: 0 })}
              itemTitle={(a) => a.range || "Age band"}
              addLabel="Add age band"
            >
              {(item, update) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="Range"
                    value={item.range}
                    onChange={(v) => update({ range: v })}
                  />
                  <NumberField
                    label="Percent"
                    value={item.pct}
                    placeholder="0"
                    onChange={(v) => update({ pct: v ?? 0 })}
                  />
                </div>
              )}
            </Repeater>
          </Group>

          <Group title="Gender split">
            <Repeater<{ label: string; pct: number }>
              items={content.audience.gender}
              onChange={(gender) =>
                set("audience", { ...content.audience, gender })
              }
              makeBlank={() => ({ label: "", pct: 0 })}
              itemTitle={(g) => g.label || "Group"}
              addLabel="Add group"
            >
              {(item, update) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="Label"
                    value={item.label}
                    onChange={(v) => update({ label: v })}
                  />
                  <NumberField
                    label="Percent"
                    value={item.pct}
                    placeholder="0"
                    onChange={(v) => update({ pct: v ?? 0 })}
                  />
                </div>
              )}
            </Repeater>
          </Group>
        </Panel>

        {/* ---- How it works ---- */}
        <Panel title="How it works (3 steps)">
          <Repeater<{ step: string; title: string; body: string }>
            items={content.howItWorks}
            onChange={(v) => set("howItWorks", v)}
            makeBlank={() => ({ step: "", title: "", body: "" })}
            itemTitle={(s) => s.title || "Step"}
            addLabel="Add step"
          >
            {(item, update) => (
              <>
                <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
                  <TextField
                    label="Step no."
                    value={item.step}
                    onChange={(v) => update({ step: v })}
                  />
                  <TextField
                    label="Title"
                    value={item.title}
                    onChange={(v) => update({ title: v })}
                  />
                </div>
                <TextArea
                  label="Body"
                  value={item.body}
                  onChange={(v) => update({ body: v })}
                />
              </>
            )}
          </Repeater>
        </Panel>

        {/* ---- Every format includes ---- */}
        <Panel title="“Every format includes” list">
          <StringListEditor
            items={content.alwaysIncluded}
            onChange={(v) => set("alwaysIncluded", v)}
            addLabel="Add item"
          />
        </Panel>

        {/* ---- Formats ---- */}
        <Panel title="Formats">
          <Repeater<ContentFormat>
            items={content.formats}
            onChange={(v) => set("formats", v)}
            makeBlank={() => ({
              id: "",
              name: "",
              tag: "",
              keyword: "",
              priceFrom: null,
              oneLiner: "",
              description: "",
              bestFor: "",
              length: "",
              reach: "",
              idealFor: "",
              includes: [],
              solves: [],
            })}
            itemTitle={(f) => f.name || "New format"}
            addLabel="Add format"
          >
            {(item, update, i) => (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="ID (referenced by headaches & work)"
                    value={item.id}
                    placeholder="e.g. explained"
                    onChange={(v) => update({ id: v })}
                  />
                  <TextField
                    label="Name"
                    value={item.name}
                    onChange={(v) => update({ name: v })}
                  />
                  <TextField
                    label="Tag (short label)"
                    value={item.tag}
                    onChange={(v) => update({ tag: v })}
                  />
                  <TextField
                    label="Keyword (outcome)"
                    value={item.keyword}
                    onChange={(v) => update({ keyword: v })}
                  />
                  <NumberField
                    label="Price from (€)"
                    value={item.priceFrom}
                    onChange={(v) => update({ priceFrom: v })}
                  />
                  <TextField
                    label="Best for"
                    value={item.bestFor}
                    onChange={(v) => update({ bestFor: v })}
                  />
                  <TextField
                    label="Length"
                    value={item.length}
                    onChange={(v) => update({ length: v })}
                  />
                  <TextField
                    label="Avg. reach"
                    value={item.reach}
                    onChange={(v) => update({ reach: v })}
                  />
                  <TextField
                    label="Ideal for"
                    value={item.idealFor}
                    onChange={(v) => update({ idealFor: v })}
                  />
                </div>
                <TextField
                  label="One-liner"
                  value={item.oneLiner}
                  onChange={(v) => update({ oneLiner: v })}
                />
                <TextArea
                  label="Description"
                  value={item.description}
                  onChange={(v) => update({ description: v })}
                />
                <ImageField
                  label="Logo"
                  slot={`format-${i}-logo`}
                  value={item.logo}
                  onChange={(url) => update({ logo: url })}
                  onError={fail}
                />
                <StringListEditor
                  label="Solves (client headaches)"
                  items={item.solves}
                  onChange={(solves) => update({ solves })}
                  addLabel="Add quote"
                />
                <div>
                  <p className="mb-2 text-sm font-medium">What’s included</p>
                  <Repeater<IncludeGroup>
                    items={item.includes}
                    onChange={(includes) => update({ includes })}
                    makeBlank={() => ({ group: "", items: [] })}
                    itemTitle={(g) => g.group || "Group"}
                    addLabel="Add group"
                  >
                    {(grp, updateGrp) => (
                      <>
                        <TextField
                          label="Group"
                          value={grp.group}
                          onChange={(v) => updateGrp({ group: v })}
                        />
                        <StringListEditor
                          items={grp.items}
                          onChange={(items) => updateGrp({ items })}
                          addLabel="Add line"
                        />
                      </>
                    )}
                  </Repeater>
                </div>
              </>
            )}
          </Repeater>
        </Panel>

        {/* ---- Other services ---- */}
        <Panel title="Other services (non-video)">
          <Repeater<ServiceItem>
            items={content.services}
            onChange={(v) => set("services", v)}
            makeBlank={() => ({
              id: `service-${Date.now()}`,
              name: "",
              category: "Static",
              blurb: "",
              priceFrom: null,
            })}
            itemTitle={(s) => s.name || "Service"}
            addLabel="Add service"
          >
            {(item, update) => (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="Name"
                    value={item.name}
                    onChange={(v) => update({ name: v })}
                  />
                  <TextField
                    label="Category (Static / Stories / Platform)"
                    value={item.category}
                    onChange={(v) => update({ category: v })}
                  />
                </div>
                <TextArea
                  label="Blurb"
                  value={item.blurb}
                  onChange={(v) => update({ blurb: v })}
                />
                <NumberField
                  label="Price from (€)"
                  value={item.priceFrom}
                  onChange={(v) => update({ priceFrom: v })}
                />
              </>
            )}
          </Repeater>
        </Panel>

        {/* ---- Headaches ---- */}
        <Panel title="Headaches → format mapping">
          <Repeater<Headache>
            items={content.headaches}
            onChange={(v) => set("headaches", v)}
            makeBlank={() => ({
              id: `headache-${Date.now()}`,
              label: "",
              formatId: formatOptions[0]?.id ?? "",
            })}
            itemTitle={(h) => h.label || "Headache"}
            addLabel="Add headache"
          >
            {(item, update) => (
              <>
                <TextField
                  label="Label (the quote)"
                  value={item.label}
                  onChange={(v) => update({ label: v })}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="ID"
                    value={item.id}
                    onChange={(v) => update({ id: v })}
                  />
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">
                      Recommends format
                    </span>
                    <select
                      value={item.formatId}
                      onChange={(e) => update({ formatId: e.target.value })}
                      className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-gold"
                    >
                      {formatOptions.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </>
            )}
          </Repeater>
        </Panel>

        {/* ---- Packages ---- */}
        <Panel title="Packages">
          <Repeater<Package>
            items={content.packages}
            onChange={(v) => set("packages", v)}
            makeBlank={() => ({
              tier: "",
              name: "",
              price: "",
              save: "",
              blurb: "",
              features: [],
            })}
            itemTitle={(p) => p.name || "Package"}
            addLabel="Add package"
          >
            {(item, update) => (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="Tier label (e.g. Starter)"
                    value={item.tier ?? ""}
                    onChange={(v) => update({ tier: v })}
                  />
                  <TextField
                    label="Name"
                    value={item.name}
                    onChange={(v) => update({ name: v })}
                  />
                  <TextField
                    label="Price"
                    value={item.price}
                    onChange={(v) => update({ price: v })}
                  />
                  <TextField
                    label="Savings badge (e.g. Save €250)"
                    value={item.save ?? ""}
                    onChange={(v) => update({ save: v })}
                  />
                </div>
                <TextField
                  label="Blurb"
                  value={item.blurb}
                  onChange={(v) => update({ blurb: v })}
                />
                <ToggleField
                  label="Most popular"
                  value={Boolean(item.popular)}
                  onChange={(v) => update({ popular: v })}
                />
                <StringListEditor
                  label="Features"
                  items={item.features}
                  onChange={(features) => update({ features })}
                  addLabel="Add feature"
                />
              </>
            )}
          </Repeater>
        </Panel>

        {/* ---- Add-ons ---- */}
        <Panel title="Add-ons">
          <Repeater<AddOnGroup>
            items={content.addOns}
            onChange={(v) => set("addOns", v)}
            makeBlank={() => ({ title: "", items: [] })}
            itemTitle={(g) => g.title || "Group"}
            addLabel="Add group"
          >
            {(item, update) => (
              <>
                <TextField
                  label="Group title"
                  value={item.title}
                  onChange={(v) => update({ title: v })}
                />
                <StringListEditor
                  items={item.items}
                  onChange={(items) => update({ items })}
                  addLabel="Add add-on"
                />
              </>
            )}
          </Repeater>
        </Panel>

        {/* ---- Distribution ---- */}
        <Panel title="Distribution">
          <Repeater<{ title: string; body: string }>
            items={content.distribution.channels}
            onChange={(channels) =>
              set("distribution", { ...content.distribution, channels })
            }
            makeBlank={() => ({ title: "", body: "" })}
            itemTitle={(c) => c.title || "Channel"}
            addLabel="Add channel"
          >
            {(item, update) => (
              <>
                <TextField
                  label="Title"
                  value={item.title}
                  onChange={(v) => update({ title: v })}
                />
                <TextArea
                  label="Body"
                  value={item.body}
                  onChange={(v) => update({ body: v })}
                />
              </>
            )}
          </Repeater>
          <TextArea
            label="Pull quote"
            value={content.distribution.pullQuote}
            onChange={(v) =>
              set("distribution", { ...content.distribution, pullQuote: v })
            }
          />
        </Panel>

        {/* ---- Results ---- */}
        <Panel title="Campaign results">
          <TextField
            label="Average client rating"
            value={content.clientRating}
            onChange={(v) => set("clientRating", v)}
          />
          <Repeater<ResultItem>
            items={content.results}
            onChange={(v) => set("results", v)}
            makeBlank={() => ({ client: "", project: "", stats: [] })}
            itemTitle={(r) => r.client || "Result"}
            addLabel="Add result"
          >
            {(item, update, i) => (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="Client"
                    value={item.client}
                    onChange={(v) => update({ client: v })}
                  />
                  <TextField
                    label="Project"
                    value={item.project}
                    onChange={(v) => update({ project: v })}
                  />
                </div>
                <ImageField
                  label="Case-study image"
                  slot={`result-${i}`}
                  value={item.image}
                  onChange={(url) => update({ image: url })}
                  onError={fail}
                />
                <div>
                  <p className="mb-2 text-sm font-medium">Stats</p>
                  <Repeater<{ value: string; label: string }>
                    items={item.stats}
                    onChange={(stats) => update({ stats })}
                    makeBlank={() => ({ value: "", label: "" })}
                    itemTitle={(s) => s.label || "Stat"}
                    addLabel="Add stat"
                  >
                    {(stat, updateStat) => (
                      <div className="grid gap-3 sm:grid-cols-2">
                        <TextField
                          label="Value"
                          value={stat.value}
                          onChange={(v) => updateStat({ value: v })}
                        />
                        <TextField
                          label="Label"
                          value={stat.label}
                          onChange={(v) => updateStat({ label: v })}
                        />
                      </div>
                    )}
                  </Repeater>
                </div>
              </>
            )}
          </Repeater>
        </Panel>

        {/* ---- Portfolio ---- */}
        <Panel title="Portfolio">
          <Repeater<PortfolioItem>
            items={content.portfolio}
            onChange={(v) => set("portfolio", v)}
            makeBlank={() => ({
              client: "",
              formatId: formatOptions[0]?.id ?? "",
              url: "",
            })}
            itemTitle={(p) => p.client || "Work item"}
            addLabel="Add work item"
          >
            {(item, update, i) => (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="Client"
                    value={item.client}
                    onChange={(v) => update({ client: v })}
                  />
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">
                      Format
                    </span>
                    <select
                      value={item.formatId}
                      onChange={(e) => update({ formatId: e.target.value })}
                      className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-gold"
                    >
                      {formatOptions.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <TextField
                  label="Link (Instagram URL)"
                  value={item.url}
                  onChange={(v) => update({ url: v })}
                />
                <ImageField
                  label="Thumbnail"
                  slot={`portfolio-${i}`}
                  value={item.thumbnail}
                  onChange={(url) => update({ thumbnail: url })}
                  onError={fail}
                />
              </>
            )}
          </Repeater>
        </Panel>

        {/* ---- Clients ---- */}
        <Panel title="Trusted-by clients">
          <StringListEditor
            items={content.clients}
            onChange={(v) => set("clients", v)}
            addLabel="Add client"
          />
        </Panel>

        {/* ---- Contact & booking ---- */}
        <Panel title="Contact, booking & recipients">
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField
              label="Email"
              value={content.contact.email}
              onChange={(v) =>
                set("contact", { ...content.contact, email: v })
              }
            />
            <TextField
              label="Website"
              value={content.contact.site}
              onChange={(v) => set("contact", { ...content.contact, site: v })}
            />
          </div>
          <TextField
            label="Instagram URL"
            value={content.contact.instagram}
            onChange={(v) =>
              set("contact", { ...content.contact, instagram: v })
            }
          />
          <TextField
            label="Booking page URL (embedded calendar)"
            value={content.bookingUrl}
            onChange={(v) => set("bookingUrl", v)}
          />
          <StringListEditor
            label="Internal brief recipients (emails)"
            items={content.salesRecipients}
            onChange={(v) => set("salesRecipients", v)}
            addLabel="Add recipient"
          />
        </Panel>

        {/* ---- Lead form options ---- */}
        <Panel title="Lead form options">
          <StringListEditor
            label="Budget options"
            items={content.budgetOptions}
            onChange={(v) => set("budgetOptions", v)}
            addLabel="Add option"
          />
          <StringListEditor
            label="Timeline options"
            items={content.timelineOptions}
            onChange={(v) => set("timelineOptions", v)}
            addLabel="Add option"
          />
        </Panel>
      </div>

      {/* save bar */}
      <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-2xl border border-line bg-paper/95 p-4 shadow-lg backdrop-blur">
        {msg ? (
          <p className={`text-sm ${msg.ok ? "text-fg" : "text-red-600"}`}>
            {msg.text}
          </p>
        ) : (
          <p className="text-sm text-muted">Changes publish to the live site.</p>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="press shrink-0 rounded-full bg-gold px-7 py-3 text-sm font-bold uppercase tracking-wide text-black disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save & publish"}
        </button>
      </div>
    </div>
  );
}
