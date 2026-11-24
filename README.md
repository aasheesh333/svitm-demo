# SVITM — Demo Website

A multi-page demo website for **Swami Vivekanand Institute of Technology & Management (SVITM)**, modelled on the structure and brand language of svivekananditm.com.

> **Demo only.** All data, fees, dates, affiliations and placement claims are fictional sample content. This is not the official SVITM website.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `about.html` | About the institute — story, vision, leadership, milestones |
| `courses.html` | Programme catalogue with live filters + search |
| `centres.html` | Study-centre network with live search + region filters |
| `verification.html` | Result check & certificate verification (demo forms) |
| `admissions.html` | Process, eligibility, dates, 3-step application UI |
| `contact.html` | Enquiries, map, department directory |
| `404.html` | Not-found page |

## Run locally

```bash
cd demo-svitm
python3 -m http.server 4173
# open http://localhost:4173
```

No build step. Shared assets live in `assets/`.

## Structure

```
assets/
  css/base.css        shared design system (brand, header/footer, components)
  css/home.css        home page
  css/inner-pages.css about + courses
  css/utility-pages.css centres, verification, contact
  css/admissions.css  admissions page
  js/icons.js         local Lucide SVG sprite
  js/layout.js        shared header + footer injection
  js/site.js          nav, scroll reveals, counters, tabs, demo toasts, lightbox
  fonts/              local Outfit + Newsreader
  img/                demo photography
```

## Live demo

https://aasheesh333.github.io/svitm-demo/ — hosted on GitHub Pages from this repo (`master` branch, root). Push to `master` to update.

## Deploy

Fully static — works on Vercel, Netlify, Cloudflare Pages or any static host. No build command; output directory is this folder. For Cloudflare Workers, `wrangler.jsonc` is included.

## Credits

Demo photography: Unsplash (presentation only). Icons: Lucide (ISC). Fonts: Outfit and Newsreader (SIL OFL).
