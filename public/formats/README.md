# Format logos

Drop each format's logo here using these **exact** filenames. They wire into the
format showcase automatically — no code change needed. Until a file exists, the
showcase falls back to a styled text monogram, so missing files never break the page.

| Format | Filename |
| --- | --- |
| SideStreet Explained | `explained.svg` |
| Street Views | `street-views.svg` |
| SideStreet Guides | `guides.svg` |
| Mini Docs | `mini-docs.svg` |
| Interviewed by SideStreet | `interviews.svg` |
| Spotlight Reel | `spotlight-reel.svg` |
| SideQuests | `sidequests.svg` |

**Notes**
- **SVG preferred** (crisp at any size, transparent). Transparent **PNG** also works —
  if you use PNG, rename the path in `src/lib/content.ts → FORMAT_LOGOS`, or just tell me.
- Logos display on a **dark** tile, so light/gold/white marks read best.
- Recommended max height ~96px; wide or square both fine (object-contain).
