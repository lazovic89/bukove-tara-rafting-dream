# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML/CSS marketing website for Bukovi Tare rafting camp (taracamp.com), written in Serbian. No build system, package manager, or backend — source files are deployed directly to GitHub Pages.

## Development

No build, test, or lint commands exist. Open any `.html` file in a browser to preview. Changes are live immediately on GitHub Pages after pushing to `main`.

**Deployment:** GitHub Pages with custom domain `taracamp.com` (configured via `CNAME`).

## Architecture

Six static HTML pages share a common sticky header/footer and the same stylesheet:

| File | Page |
|---|---|
| `index.html` | Home (hero, highlights, testimonials, map) |
| `o-nama.html` | About the camp |
| `rafting.html` | Rafting routes, pricing, safety |
| `smjestaj.html` | Accommodation |
| `aktivnosti.html` | Hiking and other activities |
| `kontakt.html` | Contact form, phone/WhatsApp/Viber, Google Maps embed |

**Styling:** Two-layer system — `css/styles.css` defines HSL design tokens and custom component classes (`.btn-accent`, `.card`, `.input`, etc.), while Tailwind CSS (CDN, configured inline in `<head>`) handles layout utilities. The Tailwind config extends the same HSL color tokens.

**Color tokens (defined in `styles.css`):**
- Primary: deep river blue `207 65% 31%`
- Secondary: forest green `142 40% 35%`
- Accent: orange/amber `30 90% 55%`

**JavaScript:** Minimal — only mobile hamburger menu toggle. No frameworks or dependencies.

**Images:** All in `assets/`, lazy-loaded via `loading="lazy"`.

**Contact form:** HTML structure is present in `kontakt.html` but has no POST endpoint wired up — it is not yet functional.

## Content Language

All user-facing content is in Serbian (Latin script). Page names and navigation labels follow Serbian conventions (e.g., "Smještaj", "O nama").
