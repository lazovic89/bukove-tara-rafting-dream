#!/usr/bin/env node
// Builds the site:
//  1. Generates the translated pages (/en, /de, /hu, /pl) from the Serbian pages in the root.
//  2. Refreshes the SEO <head> block (canonical, hreflang, Open Graph, JSON-LD) and the
//     language switcher on every page (between <!-- i18n:* --> markers).
//  3. Writes sitemap.xml and robots.txt.
//  4. Compiles css/tailwind.css (only the Tailwind classes actually used).
//
// Usage (from _build/, after a one-time `npm install`):  npm run build
//
// The Serbian .html files in the root are the single source of truth. Edit them,
// update _build/translations.js for any changed text, then re-run the build.
// Never edit files inside /en, /de, /hu, /pl by hand; they are overwritten.
// (Folders starting with "_" are not published by GitHub Pages / Jekyll.)

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://taracamp.com/';
const T = require('./translations');

const LANGS = {
  sr: { label: 'SR', name: 'Srpski', dir: '', locale: 'sr_RS', hreflang: ['sr', 'bs', 'hr'] },
  en: { label: 'EN', name: 'English', dir: 'en/', locale: 'en_GB', hreflang: ['en'] },
  de: { label: 'DE', name: 'Deutsch', dir: 'de/', locale: 'de_DE', hreflang: ['de'] },
  hu: { label: 'HU', name: 'Magyar', dir: 'hu/', locale: 'hu_HU', hreflang: ['hu'] },
  pl: { label: 'PL', name: 'Polski', dir: 'pl/', locale: 'pl_PL', hreflang: ['pl'] },
};
const X_DEFAULT = 'en'; // shown to searchers whose language we don't offer

// Page file names per language (translated for SEO).
const PAGES = {
  home:          { sr: 'index.html',      en: 'index.html',         de: 'index.html',        hu: 'index.html',        pl: 'index.html' },
  about:         { sr: 'o-nama.html',     en: 'about-us.html',      de: 'ueber-uns.html',    hu: 'rolunk.html',       pl: 'o-nas.html' },
  rafting:       { sr: 'rafting.html',    en: 'tara-rafting.html',  de: 'tara-rafting.html', hu: 'tara-rafting.html', pl: 'rafting-tara.html' },
  accommodation: { sr: 'smjestaj.html',   en: 'accommodation.html', de: 'unterkunft.html',   hu: 'szallas.html',      pl: 'noclegi.html' },
  activities:    { sr: 'aktivnosti.html', en: 'activities.html',    de: 'aktivitaeten.html', hu: 'programok.html',    pl: 'atrakcje.html' },
  contact:       { sr: 'kontakt.html',    en: 'contact.html',       de: 'kontakt.html',      hu: 'kapcsolat.html',    pl: 'kontakt.html' },
};

// Strings that stay the same in every language.
const KEEP = new Set([
  'BUKOVI TARE', 'Bukovi Tare', 'Rafting', 'WhatsApp', 'Viber', 'Facebook', 'Instagram', 'TikTok',
  'WhatsApp / Viber', 'info@bukovitare.com', 'Marko P.', 'Ana S.', 'Stefan M.',
  '82 km', '80 km', '20 km', '17 km', 'width=device-width, initial-scale=1.0', 'website',
]);
const isNumeric = (s) => /^[\s\d+€%\/.,:–—-]*$/.test(s);

const srFileToKey = Object.fromEntries(Object.entries(PAGES).map(([k, v]) => [v.sr, k]));
const pageUrl = (lang, key) => SITE + LANGS[lang].dir + (PAGES[key][lang] === 'index.html' ? '' : PAGES[key][lang]);
const relHref = (from, to, key) => (LANGS[from].dir ? '../' : '') + LANGS[to].dir + PAGES[key][to];

// ---------- injected blocks ----------
const GLOBE = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
const CHEVRON = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

// Business facts for structured data (schema.org). Keep in sync with the contact page.
const BUSINESS = {
  name: 'Bukovi Tare',
  alternateName: 'Rafting kamp Bukovi Tare',
  telephone: '+387 66 843 043',
  email: 'info@bukovitare.com',
  logo: SITE + 'assets/logo.png',
  address: { '@type': 'PostalAddress', streetAddress: 'Bastasi bb', addressLocality: 'Foča', postalCode: '73300', addressCountry: 'BA' },
  geo: { '@type': 'GeoCoordinates', latitude: 43.3667611, longitude: 18.8072149 },
  hasMap: 'https://www.google.com/maps?q=43.3667611,18.8072149',
  sameAs: [
    'https://www.facebook.com/raftingbukovitare',
    'https://www.instagram.com/bukovi_tare/',
    'https://www.tiktok.com/@bukovi_tare',
  ],
  priceRange: '€20–€295',
  // Tours: Serbian name (translated via translations.js) + price in EUR.
  offers: [
    ['Rafting na Tari + Ručak', 55],
    ['Rafting na Tari — 2 dana', 110],
    ['Rafting na Tari — 3 dana', 150],
    ['Rafting na Tari 80 km', 295],
    ['Rafting + Foto safari Velenići', 190],
    ['Rafting + Foto safari Perućica', 190],
  ],
};

const absAsset = (src) => SITE + src.replace(/^(\.\.\/)+/, '');
const tr = (sr, lang) => (lang === 'sr' ? sr : T[sr][lang]);
const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function jsonLd(lang, html, heroSrc) {
  const description = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  const data = {
    '@context': 'https://schema.org',
    '@type': ['LodgingBusiness', 'SportsActivityLocation'],
    '@id': SITE + '#business',
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateName,
    description,
    url: pageUrl(lang, 'home'),
    image: absAsset(heroSrc),
    logo: BUSINESS.logo,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: BUSINESS.address,
    geo: BUSINESS.geo,
    hasMap: BUSINESS.hasMap,
    sameAs: BUSINESS.sameAs,
    priceRange: BUSINESS.priceRange,
    makesOffer: BUSINESS.offers.map(([name, price]) => ({
      '@type': 'Offer',
      name: tr(name, lang),
      price: String(price),
      priceCurrency: 'EUR',
      url: pageUrl(lang, 'rafting'),
    })),
  };
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

function headBlock(lang, key, html) {
  const heroSrc = (html.match(/<img src="([^"]+)"[^>]*class="hero-img"/) || [])[1] || 'assets/hero-tara.jpg';
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || BUSINESS.name;
  const lines = [`<link rel="canonical" href="${pageUrl(lang, key)}" />`];
  for (const l of Object.keys(LANGS)) {
    for (const code of LANGS[l].hreflang) lines.push(`<link rel="alternate" hreflang="${code}" href="${pageUrl(l, key)}" />`);
  }
  lines.push(`<link rel="alternate" hreflang="x-default" href="${pageUrl(X_DEFAULT, key)}" />`);
  lines.push(`<meta property="og:site_name" content="${BUSINESS.name}" />`);
  lines.push(`<meta property="og:url" content="${pageUrl(lang, key)}" />`);
  lines.push(`<meta property="og:locale" content="${LANGS[lang].locale}" />`);
  lines.push(`<meta property="og:image" content="${absAsset(heroSrc)}" />`);
  lines.push(`<meta property="og:image:alt" content="${attr(title)}" />`);
  lines.push(`<meta name="twitter:card" content="summary_large_image" />`);
  if (key === 'home') lines.push(jsonLd(lang, html, heroSrc));
  lines.push(`<script>document.addEventListener('click',function(e){document.querySelectorAll('details.lang-switch[open]').forEach(function(d){if(!d.contains(e.target))d.removeAttribute('open');});});</script>`);
  return `<!-- i18n:head -->\n${lines.join('\n')}\n<!-- /i18n:head -->\n`;
}

function switchBlock(lang, key) {
  const items = Object.keys(LANGS).map((l) =>
    `<li><a href="${relHref(lang, l, key)}" hreflang="${l}" lang="${l}"${l === lang ? ' class="active" aria-current="true"' : ''}>${LANGS[l].name}<span>${LANGS[l].label}</span></a></li>`
  ).join('');
  return `<!-- i18n:switch --><details class="lang-switch"><summary aria-label="${LANGS[lang].name}">${GLOBE}${LANGS[lang].label}${CHEVRON}</summary><ul>${items}</ul></details><!-- /i18n:switch -->`;
}

function mobileSwitchBlock(lang, key) {
  const items = Object.keys(LANGS).map((l) =>
    `<a href="${relHref(lang, l, key)}" hreflang="${l}" lang="${l}" title="${LANGS[l].name}"${l === lang ? ' class="active" aria-current="true"' : ''}>${LANGS[l].label}</a>`
  ).join('');
  return `<!-- i18n:switch-m --><div class="lang-switch-mobile">${items}</div><!-- /i18n:switch-m -->`;
}

// Each injected block occupies whole line(s), so stripping restores the original exactly.
const stripBlocks = (html) => html.replace(/^[ \t]*<!-- i18n:([\w-]+) -->[\s\S]*?<!-- \/i18n:\1 -->\n/gm, '');

// Google tag (Google Tag Manager container). Google requires it immediately after <head>,
// exactly once per page. 404.html (not built) carries a hand-copied version of this snippet.
const GOOGLE_TAG_ID = 'GTM-P29BR526';
const googleTagBlock = () => `<!-- i18n:gtag -->
<script async src="https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
</script>
<!-- /i18n:gtag -->
`;

function injectBlocks(html, lang, key, file) {
  // Blocks are inserted as a new line just above these anchor lines, with the same indentation.
  const desk = /^([ \t]*)(<a href="tel:\+38766843043" class="hidden xl:flex items-center gap-2 text-sm)/m;
  const mob = /^([ \t]*)(<a href="tel:\+38766843043" class="flex items-center gap-2 py-3)/m;
  for (const [re, desc] of [[/^<head>\n/m, 'google tag'], [/^<\/head>/m, 'head block'], [desk, 'desktop switcher'], [mob, 'mobile switcher']]) {
    if (!re.test(html)) throw new Error(`${file}: anchor not found for ${desc}`);
  }
  if (html.includes('googletagmanager.com')) throw new Error(`${file}: contains a Google tag outside the generated block — remove it`);
  return html
    .replace(/^<head>\n/m, () => '<head>\n' + googleTagBlock())
    .replace(/^<\/head>/m, () => headBlock(lang, key, html) + '</head>')
    .replace(desk, (m, ind, a) => `${ind}${switchBlock(lang, key)}\n${ind}${a}`)
    .replace(mob, (m, ind, a) => `${ind}${mobileSwitchBlock(lang, key)}\n${ind}${a}`);
}

// ---------- translation ----------
function translatePage(html, lang, file, missing, used) {
  const masks = [];
  html = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>|<!--[\s\S]*?-->/g, (m) => {
    masks.push(m);
    return `\u0000${masks.length - 1}\u0000`;
  });

  const tr = (raw, where) => {
    const s = raw.trim();
    if (!s || isNumeric(s) || KEEP.has(s)) return raw;
    const entry = T[s];
    if (!entry || !entry[lang]) { missing.add(`[${lang}] ${file} (${where}): ${JSON.stringify(s)}`); return raw; }
    used.add(s);
    return raw.replace(s, () => entry[lang]);
  };

  // text nodes (split around masked blocks so their content is untouched)
  html = html.replace(/>([^<]+)</g, (m, text) =>
    '>' + text.split(/(\u0000\d+\u0000)/).map((seg) => (/^\u0000\d+\u0000$/.test(seg) ? seg : tr(seg, 'text'))).join('') + '<');
  // translatable attributes
  html = html.replace(/\b(alt|aria-label|title|placeholder|content)="([^"]*)"/g, (m, attr, val) => `${attr}="${tr(val, attr)}"`);

  html = html.replace(/\u0000(\d+)\u0000/g, (m, i) => masks[+i]);

  // links between pages, then asset paths (pages live one folder deeper)
  html = html.replace(/href="([a-z-]+\.html)(#[^"]*)?"/g, (m, f, hash = '') =>
    srFileToKey[f] ? `href="${PAGES[srFileToKey[f]][lang]}${hash}"` : m);
  html = html.replace(/(src|href)="(assets\/|css\/|favicon\.ico)/g, '$1="../$2');
  html = html.replace(/<html lang="sr">/, `<html lang="${lang}">`);
  html = html.replace(/(https:\/\/www\.google\.com\/maps\?[^"]*output=embed)"/g, `$1&amp;hl=${lang}"`); // map labels in page language
  return html;
}

// ---------- main ----------
function main() {
  const sources = {};
  for (const key of Object.keys(PAGES)) {
    const file = PAGES[key].sr;
    // Normalize line endings: git on Windows (core.autocrlf) may check files out with CRLF.
    sources[key] = stripBlocks(fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/\r\n/g, '\n'));
  }

  const missing = new Set();
  const used = new Set();
  const outputs = [];
  for (const lang of Object.keys(LANGS)) {
    for (const key of Object.keys(PAGES)) {
      const srFile = PAGES[key].sr;
      let html = sources[key];
      if (lang !== 'sr') html = translatePage(html, lang, srFile, missing, used);
      html = injectBlocks(html, lang, key, srFile);
      outputs.push({ out: path.join(ROOT, LANGS[lang].dir, PAGES[key][lang]), html });
    }
  }

  if (missing.size) {
    console.error(`Missing translations (${missing.size}). Add them to _build/translations.js:\n`);
    for (const m of missing) console.error('  ' + m);
    process.exit(1);
  }

  for (const { out, html } of outputs) {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
  }

  // sitemap.xml + robots.txt
  const urls = [];
  for (const lang of Object.keys(LANGS)) {
    for (const key of Object.keys(PAGES)) {
      const alts = Object.keys(LANGS).flatMap((l) => LANGS[l].hreflang.map((code) =>
        `    <xhtml:link rel="alternate" hreflang="${code}" href="${pageUrl(l, key)}"/>`));
      alts.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(X_DEFAULT, key)}"/>`);
      urls.push(`  <url>\n    <loc>${pageUrl(lang, key)}</loc>\n${alts.join('\n')}\n  </url>`);
    }
  }
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);
  fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);

  const unused = Object.keys(T).filter((k) => !used.has(k));
  if (unused.length) {
    console.warn(`Unused translation keys (Serbian text changed or removed?):`);
    for (const k of unused) console.warn('  ' + JSON.stringify(k));
  }
  console.log(`Built ${outputs.length} pages in ${Object.keys(LANGS).length} languages + sitemap.xml + robots.txt`);

  // Tailwind: compile only the classes used in the pages.
  let cli;
  try { cli = require.resolve('tailwindcss/lib/cli.js', { paths: [__dirname] }); } catch {
    console.error('\nTailwind is not installed. Run `npm install` inside _build/ and build again.');
    process.exit(1);
  }
  execFileSync(process.execPath, [cli,
    '-c', path.join(__dirname, 'tailwind.config.js'),
    '-i', path.join(__dirname, 'tailwind.input.css'),
    '-o', path.join(ROOT, 'css', 'tailwind.css'),
    '--minify'], { stdio: ['ignore', 'ignore', 'inherit'], env: { ...process.env, BROWSERSLIST_IGNORE_OLD_DATA: '1' } });
  console.log('Compiled css/tailwind.css');
}

main();
