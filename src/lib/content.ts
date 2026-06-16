/**
 * Single source of truth for the SideStreet rate-card landing page.
 * Content is drawn from the SideStreet Media & Partnerships Deck 2026,
 * the detailed format rate card, and the Content Archives portfolio.
 * Edit here to update the page.
 */

export type FormatId =
  | "explained"
  | "street-views"
  | "guides"
  | "mini-docs"
  | "interviews";

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
  includes: { group: string; items: string[] }[];
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
    { name: "Instagram", value: "56K" },
    { name: "TikTok", value: "53K" },
    { name: "Facebook", value: "51K" },
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
    title: "We match it to a format",
    body: "Street Views, Explained, Mini Docs, Guides or Interviews — each one engineered to solve a specific problem.",
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
  "Strategy & concept",
  "Filming & production",
  "Editing & graphics",
  "Organic cross-posting",
  "Analytics report",
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
    priceFrom: 1350,
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
    priceFrom: 1200,
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
    id: "mini-docs",
    name: "Mini Docs",
    tag: "Storytelling",
    keyword: "Trust",
    priceFrom: 1200,
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
    priceFrom: 1250,
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
];

/* ------------------------------------------------------------------ */
/* Ready-made packages                                                 */
/* ------------------------------------------------------------------ */

export interface Package {
  name: string;
  price: string;
  blurb: string;
  features: string[];
  popular?: boolean;
}

export const PACKAGES: Package[] = [
  {
    name: "Starter",
    price: "€2,500",
    blurb: "Perfect for one-off campaigns",
    features: ["1× Explained or Street Views", "1× Carousel post", "6× Social stories"],
  },
  {
    name: "Growth",
    price: "€5,000",
    blurb: "The most popular choice",
    popular: true,
    features: [
      "2× Videos (any format)",
      "2× Carousel posts",
      "6× Social stories",
      "Analytics report",
    ],
  },
  {
    name: "Always On",
    price: "€10,000+",
    blurb: "Monthly content partnership",
    features: [
      "4× Videos / month",
      "4× Carousels / month",
      "Stories & community",
      "Monthly strategy call",
      "Analytics & reporting",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Add-on system                                                       */
/* ------------------------------------------------------------------ */

export const ADD_ONS = {
  creative: {
    title: "Creative & production",
    items: [
      "Extra filming day",
      "Additional host",
      "Motion graphics",
      "Photography stills from shoot",
      "Maltese subtitling",
    ],
  },
  distribution: {
    title: "Distribution",
    items: [
      "Paid boosting & ad management",
      "Companion carousel",
      "Cross-posting to client channels",
      "Pinned to Highlights for 1 week",
      "Broadcast channel push",
      "Story reshares",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Proof — campaign results & rating                                   */
/* ------------------------------------------------------------------ */

export const RESULTS = [
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

export const CLIENTS = [
  "APS Bank",
  "FORM",
  "ERA",
  "Embassy Cinemas",
  "Malta Tourism Authority",
  "Government of Malta",
  "L-Università ta’ Malta",
  "HSBC",
  "humm",
  "BOV",
  "MGA",
  "VisitMalta",
  "National Book Council",
  "Puttinu Cares",
];

/* ------------------------------------------------------------------ */
/* Portfolio — real work from the Content Archives                     */
/* ------------------------------------------------------------------ */

export interface PortfolioItem {
  client: string;
  formatId: FormatId;
  url: string;
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
/* Drop uploaded logos in /public/formats (e.g. street-views.svg) and  */
/* map them here. Anything left out falls back to a styled monogram.   */
/* ------------------------------------------------------------------ */

export const FORMAT_LOGOS: Partial<Record<FormatId, string>> = {
  explained: "/formats/explained.svg",
  "street-views": "/formats/street-views.svg",
  guides: "/formats/guides.svg",
  "mini-docs": "/formats/mini-docs.svg",
  interviews: "/formats/interviews.svg",
};
