/**
 * Single source of truth for the SideStreet rate-card landing page.
 * Content is drawn from the SideStreet Media & Partnerships Deck 2026,
 * the detailed format rate card, and the Content Archives portfolio.
 * Edit here to update the page.
 */

/**
 * A format id. Was a literal union; relaxed to `string` so new formats can be
 * added from the CMS. Headaches and portfolio items reference a format by id.
 */
export type FormatId = string;

export interface IncludeGroup {
  group: string;
  items: string[];
}

export interface ContentFormat {
  id: FormatId;
  name: string;
  tag: string; // short style label, e.g. "Explainer"
  keyword: string; // the outcome word, e.g. "Clarity"
  priceFrom: number | null; // EUR, null = custom
  oneLiner: string;
  description: string;
  bestFor: string;
  length: string;
  reach: string;
  idealFor: string;
  logo?: string; // public URL of an uploaded logo; falls back to a monogram
  includes: IncludeGroup[];
  solves: string[]; // client headache quotes this format answers
}

export interface Headache {
  id: string;
  label: string; // the quote a client recognises
  formatId: FormatId; // the format that answers it
}

/* ------------------------------------------------------------------ */
/* Audience / platform stats                                          */
/* ------------------------------------------------------------------ */

export const AUDIENCE = {
  tagline: "Malta's largest youth news platform.",
  headline: [
    { value: "160K+", label: "Total followers" },
    { value: "1.5M+", label: "Monthly reach" },
    { value: "14M+", label: "Monthly views" },
    { value: "50%", label: "Audience under 35" },
  ],
  channels: [
    { name: "Instagram", value: "56K", url: "https://www.instagram.com/sidestreetmalta/" },
    { name: "TikTok", value: "53K", url: "https://www.tiktok.com/@sidestreetmalta" },
    { name: "Facebook", value: "51K", url: "https://www.facebook.com/sidestreetmalta" },
  ],
  age: [
    { range: "25–34", pct: 35.6 },
    { range: "35–44", pct: 26.9 },
    { range: "45–54", pct: 22.5 },
    { range: "18–24", pct: 15.0 },
  ],
  gender: [
    { label: "Men", pct: 53.5 },
    { label: "Women", pct: 46.2 },
  ],
};

/* ------------------------------------------------------------------ */
/* The "how it works" three-step logic                                */
/* ------------------------------------------------------------------ */

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Tell us your headache",
    body: "“People don’t understand what we do.” You bring the objective and the problem — not a shopping list of deliverables.",
  },
  {
    step: "02",
    title: "We match it to a video format",
    body: "Street Views, Explained, Guides, Spotlight Reels, Mini Docs or Interviews — each one engineered to solve a specific problem.",
  },
  {
    step: "03",
    title: "We build content that works",
    body: "Strategy, production, editing and organic distribution included. Built to earn attention, not interrupt it.",
  },
];

/* ------------------------------------------------------------------ */
/* What every format includes                                          */
/* ------------------------------------------------------------------ */

export const ALWAYS_INCLUDED = [
  "Customised campaign timeline",
  "Idea generation & brainstorming",
  "Narrative storyboards",
  "Final files delivered to you",
  "Regular progress check-ins",
  "Comprehensive analytics report",
  "Provision for revisions",
  "Flexible payment structure",
];

/* ------------------------------------------------------------------ */
/* Formats                                                             */
/* ------------------------------------------------------------------ */

export const FORMATS: ContentFormat[] = [
  {
    id: "explained",
    name: "SideStreet Explained",
    tag: "Explainer",
    keyword: "Clarity",
    priceFrom: 1100,
    oneLiner: "Break down complex, misunderstood or boring topics into something instantly understandable.",
    description:
      "A short-form editorial video that explains not just what something is, but why it matters now. Informed but accessible — like a smart friend explaining something you should probably know, not a brand talking at you.",
    bestFor: "Awareness",
    length: "60–90 sec",
    reach: "20K–50K",
    idealFor: "Government, NGOs, Education",
    includes: [
      {
        group: "Strategy & editorial",
        items: [
          "Topic alignment and angle selection",
          "Research and fact-checking",
          "Scriptwriting (60–90s)",
          "Basic storyboard plan",
        ],
      },
      {
        group: "Production",
        items: [
          "1 SideStreet host/presenter",
          "1 videographer",
          "Studio or controlled location",
          "Pro lighting & audio capture",
        ],
      },
      {
        group: "Post-production",
        items: [
          "Vertical edit (9:16), tight pacing",
          "Platform-native subtitles",
          "On-screen keywords & light graphics",
          "Caption drafted + exports for IG / TikTok / FB",
        ],
      },
    ],
    solves: [
      "People don’t understand what we do",
      "Our message is complicated and we can’t simplify it",
      "We need to educate without sounding like a brochure",
      "We want younger audiences to grasp the point fast",
    ],
  },
  {
    id: "street-views",
    name: "Street Views",
    tag: "Vox Pop",
    keyword: "Authenticity",
    priceFrom: 1300,
    oneLiner: "Real, unscripted opinions from people on the street — the message comes from the public, not the brand.",
    description:
      "Anchored by a SideStreet host who frames the conversation toward a clear theme. The value is in its unpredictability and honesty — instant relatability and social proof. Intentionally raw, fast-paced and culturally current.",
    bestFor: "Social proof",
    length: "60–90 sec",
    reach: "20K–60K",
    idealFor: "FMCG, Retail, Government",
    includes: [
      {
        group: "Strategy & creative",
        items: [
          "Question & answer mapping",
          "Location planning (footfall, vibe, demo)",
          "Brand integration without killing authenticity",
        ],
      },
      {
        group: "Production",
        items: [
          "1 SideStreet host + 1 videographer",
          "On-street session (2–3 hours)",
          "Run-and-gun wireless audio + backup",
          "High-volume capture (10–15 interactions)",
        ],
      },
      {
        group: "Post-production",
        items: [
          "Fast-paced montage edit (60–90s)",
          "Subtitles",
          "Light branding overlay",
        ],
      },
    ],
    solves: [
      "We feel out of touch and corporate",
      "We need authenticity, not actors",
      "We want content that doesn’t feel sponsored",
      "We need engagement, conversation and comments",
    ],
  },
  {
    id: "guides",
    name: "SideStreet Guides",
    tag: "How-To",
    keyword: "Utility",
    priceFrom: 1250,
    oneLiner: "Step-by-step content that shows people exactly how to do something, from start to finish.",
    description:
      "Removes intimidation and confusion by breaking processes into clear, human-sized steps. Structured, repeatable and designed to be saved and revisited. It positions the brand as helpful and competent — content people use, not just watch.",
    bestFor: "Education",
    length: "60–90 sec",
    reach: "20K–50K",
    idealFor: "Finance, Tech, Lifestyle",
    includes: [
      {
        group: "Strategy & concept",
        items: [
          "Topics rooted in real adult-life pain points",
          "Partner integration mapping",
        ],
      },
      {
        group: "Production",
        items: [
          "1 SideStreet host (key for trust)",
          "1 videographer",
          "Real-world location filming",
          "Natural, observational style (no glossy ad feel)",
        ],
      },
      {
        group: "Post-production",
        items: [
          "Vertical edit (60–90s)",
          "Problem-first hook in first 2 seconds",
          "Subtitles throughout + light branding",
          "Post captions",
        ],
      },
    ],
    solves: [
      "People don’t know where to start",
      "We need to appear helpful, not sales-driven",
      "We want to demonstrate value without overt promotion",
      "We need trust from younger audiences",
    ],
  },
  {
    id: "spotlight-reel",
    name: "Spotlight Reel",
    tag: "Brand Reel",
    keyword: "Energy",
    priceFrom: 1250,
    oneLiner: "A high-energy, narrative-driven brand reel that lands your story in under 90 seconds.",
    description:
      "A punchy, fast-cut brand film built to grab attention and carry one clear narrative. Designed to feel native to the feed — energetic, current and made to be shared, not skipped.",
    bestFor: "Brand reach",
    length: "Under 90 sec",
    reach: "20K–60K",
    idealFor: "Brands, Retail, Events",
    includes: [
      {
        group: "Strategy & creative",
        items: [
          "Concept & narrative angle",
          "Shot list & treatment",
          "Music & pacing direction",
        ],
      },
      {
        group: "Production",
        items: [
          "1 SideStreet host (optional)",
          "1 videographer",
          "Dynamic location or studio capture",
          "Pro lighting & audio",
        ],
      },
      {
        group: "Post-production",
        items: [
          "High-energy vertical edit (9:16)",
          "Sound design & motion accents",
          "Subtitles + light branding",
          "Exports for IG / TikTok / FB",
        ],
      },
    ],
    solves: [
      "We need to grab attention fast",
      "Our content feels flat and forgettable",
      "We want a hero reel for a launch or campaign",
      "We need something punchy and on-trend",
    ],
  },
  {
    id: "mini-docs",
    name: "Mini Docs",
    tag: "Storytelling",
    keyword: "Trust",
    priceFrom: 1250,
    oneLiner: "Short-form documentary pieces about real people, real stories and real impact.",
    description:
      "Prioritises narrative, emotion and context over quick hooks. Designed to humanise organisations and build emotional connection rather than immediate clicks. This is where brands show who they are, not just what they sell.",
    bestFor: "Emotional connection",
    length: "2–5 min + cutdowns",
    reach: "40K–120K",
    idealFor: "NGOs, Government, Purpose-driven brands",
    includes: [
      {
        group: "Story & editorial",
        items: [
          "Story discovery & narrative shaping",
          "Interview prep & question design",
          "Story arc planning + shot list",
        ],
      },
      {
        group: "Production",
        items: [
          "Director/producer + videographer",
          "1–2 interview setups + observational b-roll",
          "Pro audio capture",
          "Half-day to full-day shoot",
        ],
      },
      {
        group: "Post-production",
        items: [
          "Hero edit (2–5 min), cinematic pacing & sound design",
          "Full subtitles",
          "3–4 cutdowns (~45s) + 3 cover options",
          "Emotion-led caption pack",
        ],
      },
    ],
    solves: [
      "People don’t feel what we do, they just see posts",
      "Our CSR content feels fake or performative",
      "We need reputation and trust, not just awareness",
      "We want something that can live beyond one week",
    ],
  },
  {
    id: "interviews",
    name: "Interviewed by SideStreet",
    tag: "Interview Series",
    keyword: "Credibility",
    priceFrom: 2500,
    oneLiner: "A structured editorial interview that humanises leadership and builds thought leadership without PR cringe.",
    description:
      "Blends serious questions with accessible language — avoiding both PR fluff and aggressive interrogation. It positions the interviewee as human, thoughtful and accountable, and produces months of assets from a single sitting.",
    bestFor: "Credibility",
    length: "10–20 min + clips",
    reach: "30K–100K",
    idealFor: "Leaders, Experts, Institutions",
    includes: [
      {
        group: "Editorial & prep",
        items: [
          "Guest research & angle planning",
          "Structured question design",
          "Pre-interview alignment + hook planning",
        ],
      },
      {
        group: "Production",
        items: [
          "1 SideStreet interviewer/host",
          "2-camera studio or controlled setup",
          "Pro audio capture + b-roll",
        ],
      },
      {
        group: "Post-production",
        items: [
          "Full episode edit (6–12 min)",
          "5–6 quote clips (10–60s) + 1 trailer",
          "Thumbnail + subtitles",
          "Debate-led & clarity-led caption pack",
        ],
      },
    ],
    solves: [
      "Our leadership feels distant",
      "We need credibility and a serious tone, but can’t be boring",
      "We want thought leadership without PR cringe",
      "We need assets for months, not one post",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* The interactive qualifier — headaches mapped to formats            */
/* ------------------------------------------------------------------ */

export const HEADACHES: Headache[] = [
  { id: "understand", label: "People don’t understand what we do", formatId: "explained" },
  { id: "complex", label: "Our message is too complex to simplify", formatId: "explained" },
  { id: "corporate", label: "We feel corporate and out of touch", formatId: "street-views" },
  { id: "authentic", label: "We need authentic engagement, not actors", formatId: "street-views" },
  { id: "howto", label: "People don’t know how to use what we offer", formatId: "guides" },
  { id: "overwhelmed", label: "Our audience feels overwhelmed", formatId: "guides" },
  { id: "impact", label: "People don’t feel our impact", formatId: "mini-docs" },
  { id: "csr", label: "Our good work goes unseen", formatId: "mini-docs" },
  { id: "leadership", label: "Our leadership feels distant", formatId: "interviews" },
  { id: "credibility", label: "We need credibility & thought leadership", formatId: "interviews" },
  { id: "attention", label: "We need to grab attention fast", formatId: "spotlight-reel" },
  { id: "forgettable", label: "Our content feels flat and forgettable", formatId: "spotlight-reel" },
];

/* ------------------------------------------------------------------ */
/* Ready-made packages                                                 */
/* ------------------------------------------------------------------ */

export interface Package {
  name: string;
  tier?: string; // e.g. "Starter", "Awareness"
  price: string;
  save?: string; // e.g. "Save €250"
  blurb: string;
  features: string[];
  popular?: boolean;
}

export const PACKAGES: Package[] = [
  {
    tier: "Starter",
    name: "Launch Pack",
    price: "€1,950",
    save: "Save €250",
    blurb: "Perfect for a first campaign",
    features: ["Spotlight Reel", "Carousel Post", "Social Stories (Set of 6)"],
  },
  {
    tier: "Awareness",
    name: "Buzz Pack",
    price: "€2,000",
    save: "Save €250",
    blurb: "Drive street-level attention",
    features: ["Street Views (Vox Pop)", "Carousel Post", "Social Stories (Set of 6)"],
  },
  {
    tier: "Authority",
    name: "Expert Pack",
    price: "€2,500",
    save: "Save €400",
    blurb: "Build trust and expertise",
    popular: true,
    features: ["SideStreet Explained", "SideStreet Guides", "Carousel Post"],
  },
  {
    tier: "Premium",
    name: "Full Feature",
    price: "€3,650",
    save: "Save €500",
    blurb: "Maximum editorial impact",
    features: ["Interviewed by SideStreet", "Spotlight Reel", "Social Stories (Set of 6)"],
  },
];

/* ------------------------------------------------------------------ */
/* Other (non-video) services                                          */
/* ------------------------------------------------------------------ */

export interface ServiceOption {
  label: string; // e.g. "Set of 10"
  priceFrom: number | null;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string; // "Static" | "Stories" | "Platform"
  blurb: string;
  priceFrom: number | null;
  icon?: string; // illustration key: carousel | static | stories | giveaway | banners
  options?: ServiceOption[]; // when present, the card shows a quantity dropdown
}

export const SERVICES: ServiceItem[] = [
  {
    id: "carousel",
    name: "Carousel Post",
    category: "Static",
    blurb: "Multi-slide swipe post with custom visuals and copy.",
    priceFrom: 550,
    icon: "carousel",
  },
  {
    id: "static",
    name: "Static Post",
    category: "Static",
    blurb: "Single impactful visual with copywriting.",
    priceFrom: 300,
    icon: "static",
  },
  {
    id: "stories",
    name: "Social Stories (Set of 6)",
    category: "Stories",
    blurb: "Branded stories with polls, quizzes or CTAs.",
    priceFrom: 400,
    icon: "stories",
  },
  {
    id: "giveaway",
    name: "Giveaway",
    category: "Platform",
    blurb: "Branded giveaway campaign management & execution.",
    priceFrom: 600,
    icon: "giveaway",
  },
  {
    id: "banners",
    name: "Banner Ads",
    category: "Platform",
    blurb: "A sponsored graphic (AD) slid into the middle of a swipe carousel post — choose how many.",
    priceFrom: 650,
    icon: "banners",
    options: [
      { label: "Set of 10", priceFrom: 650 },
      { label: "Set of 15", priceFrom: 800 },
      { label: "Set of 20", priceFrom: 900 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* About — "who we are"                                                */
/* ------------------------------------------------------------------ */

export interface AboutPillar {
  number: string;
  title: string;
  body: string;
}

export interface About {
  title: string;
  body: string;
  pillars: AboutPillar[];
}

export const ABOUT: About = {
  title: "Who we are",
  body: "SideStreet is one of Malta’s leading independent news and media platforms, with over 160,000 followers across Instagram, Facebook and TikTok. We create short-form content that informs, entertains and connects — from breaking stories and explainers to documentaries, street interviews and brand partnerships.",
  pillars: [
    {
      number: "01",
      title: "We don’t make ads",
      body: "Every format is built to feel native. Content that earns attention, not buys it.",
    },
    {
      number: "02",
      title: "We’re local",
      body: "We understand Malta: the culture, the humour, the platforms your audience is on.",
    },
    {
      number: "03",
      title: "We listen",
      body: "Every campaign starts fresh. No generic templates, no recycled concepts.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Add-on system                                                       */
/* ------------------------------------------------------------------ */

export interface AddOnItem {
  label: string;
  priceFrom?: number | null; // EUR; null/undefined = no price shown yet
}

export interface AddOnGroup {
  title: string;
  items: AddOnItem[];
}

export const ADD_ONS: AddOnGroup[] = [
  {
    title: "Creative & production",
    items: [
      { label: "Extra filming day" },
      { label: "Additional host" },
      { label: "Motion graphics" },
      { label: "Photography stills from shoot" },
      { label: "Maltese subtitling" },
    ],
  },
  {
    title: "Distribution",
    items: [
      { label: "Paid boosting & ad management" },
      { label: "Companion carousel" },
      { label: "Cross-posting to client channels" },
      { label: "Pinned to Highlights for 1 week" },
      { label: "Broadcast channel push" },
      { label: "Story reshares" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Proof — campaign results & rating                                   */
/* ------------------------------------------------------------------ */

export interface ResultStat {
  value: string;
  label: string;
}

export interface ResultItem {
  client: string;
  project: string;
  image?: string; // public URL of an uploaded case-study image
  link?: string; // opens when the card thumbnail is clicked
  stats: ResultStat[];
}

export const RESULTS: ResultItem[] = [
  {
    client: "APS Bank",
    project: "Pension Reform Explained",
    stats: [
      { value: "120K", label: "Reach" },
      { value: "95%", label: "Completion rate" },
      { value: "3.2K", label: "Engagements" },
    ],
  },
  {
    client: "FORM",
    project: "The Future of Work",
    stats: [
      { value: "180K", label: "Reach" },
      { value: "4.5K", label: "Engagements" },
      { value: "6.8%", label: "Engagement rate" },
    ],
  },
  {
    client: "Embassy Cinemas",
    project: "A New Era",
    stats: [
      { value: "250K", label: "Reach" },
      { value: "8.1K", label: "Engagements" },
      { value: "12%", label: "Engagement rate" },
    ],
  },
];

export const CLIENT_RATING = "4.9 / 5";

/* ------------------------------------------------------------------ */
/* Trusted-by logos (text wordmarks)                                   */
/* ------------------------------------------------------------------ */

export interface Client {
  name: string;
  logo?: string; // public URL of an uploaded logo (white/mono reads best)
}

export const CLIENTS: Client[] = [
  { name: "APS Bank" },
  { name: "FORM" },
  { name: "ERA" },
  { name: "Embassy Cinemas" },
  { name: "Malta Tourism Authority" },
  { name: "Government of Malta" },
  { name: "L-Università ta’ Malta" },
  { name: "HSBC" },
  { name: "humm" },
  { name: "BOV" },
  { name: "MGA" },
  { name: "VisitMalta" },
  { name: "National Book Council" },
  { name: "Puttinu Cares" },
];

/* ------------------------------------------------------------------ */
/* Portfolio — real work from the Content Archives                     */
/* ------------------------------------------------------------------ */

export interface PortfolioItem {
  client: string;
  formatId: FormatId;
  url: string;
  thumbnail?: string; // public URL of an uploaded thumbnail
}

export const PORTFOLIO: PortfolioItem[] = [
  { client: "National Book Council", formatId: "explained", url: "https://www.instagram.com/reels/DNDITY9ICNr/" },
  { client: "National Skills Council", formatId: "explained", url: "https://www.instagram.com/reel/DMH1UefICzI/" },
  { client: "UM Earth Systems", formatId: "explained", url: "https://www.instagram.com/reel/DMAZiEEsxqT/" },
  { client: "APS Bank", formatId: "explained", url: "https://www.instagram.com/reel/DSclwO8DGgv/" },
  { client: "Riformi", formatId: "explained", url: "https://www.instagram.com/reel/DKzbgm3Ivlp/" },
  { client: "Spazzju Kreattiv", formatId: "explained", url: "https://www.instagram.com/reel/DKZPN11Iokp/" },
  { client: "Mr. Riley’s", formatId: "street-views", url: "https://www.instagram.com/sidestreetmalta/reel/DPgg96aDAlv/" },
  { client: "Zeppi’s", formatId: "street-views", url: "https://www.instagram.com/reels/DNkxKd5op1h/" },
  { client: "Just", formatId: "street-views", url: "https://www.instagram.com/reel/DMNWqrwo7t4/" },
  { client: "Embassy Cinemas", formatId: "street-views", url: "https://www.instagram.com/reel/DL41v7AIlg-/" },
  { client: "Form", formatId: "guides", url: "https://www.instagram.com/reel/DLCu79RouT-/" },
  { client: "ESS", formatId: "guides", url: "https://www.instagram.com/reel/DKy7qyMIlF9/" },
  { client: "Ben Estates", formatId: "guides", url: "https://www.instagram.com/reel/DKeew53IIBU/" },
  { client: "National Book Council", formatId: "mini-docs", url: "https://www.instagram.com/reel/DJY6ZOQoCFv/" },
  { client: "Puttinu Cares", formatId: "mini-docs", url: "https://www.instagram.com/reel/DIgd19yo76u/" },
  { client: "L-istrina", formatId: "mini-docs", url: "https://www.instagram.com/reel/DSt4CU-jBO9/" },
  { client: "Cadbury · Foodbank", formatId: "mini-docs", url: "https://www.instagram.com/reel/DSiJHyxjF0q/" },
  { client: "Housing Authority — CEO M. Zerafa", formatId: "interviews", url: "https://www.instagram.com/reel/DLR3A3bIua2/" },
  { client: "EP Valletta", formatId: "interviews", url: "https://www.instagram.com/reel/DUGaPKNjUKM/" },
];

/* ------------------------------------------------------------------ */
/* Distribution logic                                                  */
/* ------------------------------------------------------------------ */

export const DISTRIBUTION = {
  channels: [
    {
      title: "SideStreet’s audience",
      body: "Published to 160K+ engaged followers across Instagram, TikTok and Facebook.",
    },
    {
      title: "Your audience",
      body: "Reposted and cross-posted to your own channels so the content works twice.",
    },
    {
      title: "Optional paid boost",
      body: "Amplification behind content that’s already performing — never to rescue a weak idea.",
    },
  ],
  pullQuote:
    "Boosting isn’t there to rescue bad content. It’s there to amplify content that’s already working.",
};

/* ------------------------------------------------------------------ */
/* Budget / timeline options for the lead form                         */
/* ------------------------------------------------------------------ */

export const BUDGET_OPTIONS = [
  "Under €2,500",
  "€2,500 – €5,000",
  "€5,000 – €10,000",
  "€10,000+ / monthly partnership",
  "Not sure yet",
];

export const TIMELINE_OPTIONS = [
  "ASAP",
  "This month",
  "This quarter",
  "Just exploring",
];

export const CONTACT = {
  email: "hello@sidestreetmalta.com",
  site: "sidestreetmalta.com",
  instagram: "https://www.instagram.com/sidestreetmalta/",
};

/** Internal recipients that receive every brief. */
export const SALES_RECIPIENTS = [
  "sales@sidestreetmalta.com",
  "luigi@sidestreetmalta.com",
];

/**
 * Google Calendar appointment-schedule booking page.
 * Set NEXT_PUBLIC_BOOKING_URL (e.g. the public
 * https://calendar.google.com/calendar/appointments/schedules/... URL) to
 * enable the embedded "book a call" step. Empty = show a graceful fallback.
 */
export const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "";

/* ------------------------------------------------------------------ */
/* Format logos                                                        */
/* Default logos live in /public/formats. The CMS can override any     */
/* format's `logo` with an uploaded file; anything left out falls back */
/* to a styled monogram.                                               */
/* ------------------------------------------------------------------ */

export const FORMAT_LOGOS: Record<string, string> = {
  explained: "/formats/explained.svg",
  "street-views": "/formats/street-views.svg",
  guides: "/formats/guides.svg",
  "mini-docs": "/formats/mini-docs.svg",
  interviews: "/formats/interviews.svg",
};

/* ------------------------------------------------------------------ */
/* Team / behind-the-scenes photos                                     */
/* ------------------------------------------------------------------ */

export interface TeamPhoto {
  url: string;
  alt?: string;
}

export const TEAM_PHOTOS: TeamPhoto[] = [
  { url: "/team/team-interview-1.jpg", alt: "SideStreet host interviewing a guest on location" },
  { url: "/team/team-on-set-1.jpg", alt: "Filming talent on location" },
  { url: "/team/team-on-set-2.jpg", alt: "SideStreet filming an interview" },
  { url: "/team/team-interview-2.jpg", alt: "SideStreet host and guest on the street" },
  { url: "/team/team-out-1.jpg", alt: "SideStreet out shooting content" },
  { url: "/team/team-interview-3.jpg", alt: "SideStreet host and guest" },
];

/* ------------------------------------------------------------------ */
/* The full editable site document                                     */
/* DEFAULT_CONTENT is built from the exports above; the CMS stores a    */
/* document that overrides these defaults per top-level key.            */
/* ------------------------------------------------------------------ */

export interface AudienceStat {
  value: string;
  label: string;
}

export interface ChannelStat {
  name: string;
  value: string;
  url?: string; // link to the platform page
}

export interface AgeRow {
  range: string;
  pct: number;
}

export interface GenderRow {
  label: string;
  pct: number;
}

export interface Audience {
  tagline: string;
  headline: AudienceStat[];
  channels: ChannelStat[];
  age: AgeRow[];
  gender: GenderRow[];
}

export interface HowItWorksStep {
  step: string;
  title: string;
  body: string;
}

export interface DistributionChannel {
  title: string;
  body: string;
}

export interface Distribution {
  channels: DistributionChannel[];
  pullQuote: string;
}

export interface HeroContent {
  line1: string;
  line2: string;
  sub: string;
  videoUrl?: string; // uploaded showreel video
  imageUrl?: string; // uploaded showreel image / poster
}

export interface Contact {
  email: string;
  site: string;
  instagram: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: About;
  teamPhotos: TeamPhoto[];
  audience: Audience;
  howItWorks: HowItWorksStep[];
  alwaysIncluded: string[];
  formats: ContentFormat[];
  services: ServiceItem[];
  headaches: Headache[];
  packages: Package[];
  addOns: AddOnGroup[];
  results: ResultItem[];
  clientRating: string;
  clients: Client[];
  portfolio: PortfolioItem[];
  distribution: Distribution;
  budgetOptions: string[];
  timelineOptions: string[];
  contact: Contact;
  salesRecipients: string[];
  bookingUrl: string;
}

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    line1: "What’s keeping your marketing team awake?",
    line2: "",
    sub: "Most agencies ask what content you want. We start by asking what isn’t working — pick the headache below and we’ll prescribe the fix.",
  },
  about: ABOUT,
  teamPhotos: TEAM_PHOTOS,
  audience: AUDIENCE,
  howItWorks: HOW_IT_WORKS,
  alwaysIncluded: ALWAYS_INCLUDED,
  // Fold default logos onto each format so the CMS can override per-format.
  formats: FORMATS.map((f) => ({ ...f, logo: f.logo ?? FORMAT_LOGOS[f.id] })),
  services: SERVICES,
  headaches: HEADACHES,
  packages: PACKAGES,
  addOns: ADD_ONS,
  results: RESULTS,
  clientRating: CLIENT_RATING,
  clients: CLIENTS,
  portfolio: PORTFOLIO,
  distribution: DISTRIBUTION,
  budgetOptions: BUDGET_OPTIONS,
  timelineOptions: TIMELINE_OPTIONS,
  contact: CONTACT,
  salesRecipients: SALES_RECIPIENTS,
  bookingUrl: BOOKING_URL,
};
