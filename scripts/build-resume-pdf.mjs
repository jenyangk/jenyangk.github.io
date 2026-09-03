#!/usr/bin/env node
/**
 * Build the resume PDF from Markdown.
 *
 * Pipeline: src/assets/Resume.md -> src/assets/Resume.html (styled template)
 *        -> public/Andy_Koh_Resume.pdf (what the site's hero link serves)
 *
 * Usage:
 *   npm run resume            regenerate Resume.html + Andy_Koh_Resume.pdf
 *   npm run resume:preview    same, then open Resume.html in your browser
 *
 * The HTML step applies the resume's fixed template (embedded CSS + contact
 * icons). The PDF step prints the page headless (Letter, backgrounds, margins
 * matching the @page rule in the template).
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const MD_PATH = path.join(ROOT, 'src/assets/Resume.md');
const HTML_PATH = path.join(ROOT, 'src/assets/Resume.html');
const PDF_PATH = path.join(ROOT, 'public/Andy_Koh_Resume.pdf');

const PREVIEW = process.argv.includes('--preview');

/* ------------------------------------------------------------------ */
/* Template: embedded CSS, copied from the resume's HTML design.       */
/* ------------------------------------------------------------------ */

const CSS = `  /* ATS-friendly: single column, simple serif/sans, no columns, no absolute positioning. */
  @page { margin: 0.3in 0.5in; }
  html { -webkit-print-color-adjust: exact; }
  body {
    font-family: "Helvetica Neue", Arial, "Liberation Sans", sans-serif;
    font-size: 9pt;
    line-height: 1.25;
    color: #111;
    margin: 0;
  }
  h1 {
    font-size: 17pt;
    margin: 0 0 2pt 0;
    letter-spacing: 0.2px;
    text-align: center;
  }
  /* tagline under the name: the italic summary line in Resume.md */
  h1 + p em, h1 + p { font-size: 9pt; }
  /* contact lines (the two <p> blocks right after h1) are centered */
  h1 + p, h1 + p + p { text-align: center; }
  h2 {
    font-size: 10pt;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1.6px solid #bbbcb6;
    padding-bottom: 2px;
    padding-top: 8px;
    margin: 6px 0 3px;
    color: #222;
  }
  h3 {
    font-size: 9.5pt;
    margin: 4px 0 1px;
    color: #000;
  }
  p { margin: 1px 0; }
  ul { margin: 2px 4px 3px 0; padding-left: 15px; padding-bottom: 4px }
  li { margin: 1.5px 0; }
  strong { font-weight: 600; }
  a { color: #111; text-decoration: underline; }
  .url { color: #444; font-size: 8.5pt; }
  /* Role header: title/company left, dates right-aligned on the same line. */
  p.role {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    margin: 4px 0 1px;
  }
  p.role .role-date { white-space: nowrap; text-align: right; }
  /* Contact + links lines sit close under the name. */
  h1 + p + p, h1 + p + p + p { margin-top: 0; }
  /* contact icons: inline SVG, currentColor */
  .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 3px;
    vertical-align: -2px;
    color: #444;
  }`;

/* Inline SVG contact icons (currentColor, match the template's .icon style). */
const ICON_MAIL =
  '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>';
const ICON_PHONE =
  '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
const ICON_PIN =
  '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>';
const ICON_LINKEDIN =
  '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>';
const ICON_GITHUB =
  '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>';
const ICON_GLOBE =
  '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>';

/* ------------------------------------------------------------------ */
/* Markdown parsing + HTML generation                                  */
/* ------------------------------------------------------------------ */

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Convert inline markdown (bold, italic, links, code) to HTML. */
function inlineMd(s) {
  s = escapeHtml(s);
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/_([^_]+)_/g, '<em>$1</em>');
  return s;
}

/** Parse Resume.md (stable structure) into structured data. */
function parseResume(md) {
  const lines = md.split(/\r?\n/);
  const data = { name: '', contacts: [], summary: '', roles: [], skills: [], education: [], other: [] };
  let section = null;
  let role = null;
  const flushRole = () => {
    if (role) { data.roles.push(role); role = null; }
  };

  let i = 0;
  while (i < lines.length && !lines[i].startsWith('# ')) i++;
  if (i < lines.length) { data.name = lines[i].slice(2).trim(); i++; }
  while (i < lines.length && !lines[i].startsWith('## ')) {
    if (lines[i].trim()) data.contacts.push(lines[i].trim());
    i++;
  }

  for (; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t.startsWith('## ')) {
      flushRole();
      section = t.slice(3).trim();
      continue;
    }
    if (!t) continue;

    if (section === 'Summary') {
      data.summary += (data.summary ? ' ' : '') + t;
    } else if (section === 'Experience') {
      if (t.startsWith('**') && t.includes('|')) {
        flushRole();
        const parts = t.split('|').map((p) => p.trim());
        role = {
          title: parts[0].replace(/^\*\*/, '').replace(/\*\*$/, ''),
          company: parts[1] || '',
          dates: parts[2] || '',
          bullets: [],
        };
      } else if (t.startsWith('- ') && role) {
        role.bullets.push(t.slice(2).trim());
      }
    } else if (section === 'Technical Skills') {
      data.skills.push(t);
    } else if (section === 'Education') {
      data.education.push(t);
    } else if (section !== null) {
      // Fallback for any other section: keep the lines so content is never lost.
      data.other.push({ section, line: t });
    }
  }
  flushRole();
  return data;
}

/** One contact item on the first contact line (email / phone / location). */
function contactPrimary(token) {
  if (token.includes('@') && !token.includes('://')) return `${ICON_MAIL}${escapeHtml(token)}`;
  if (/^[\d\s()+.\-]{7,}$/.test(token)) return `${ICON_PHONE}${escapeHtml(token)}`;
  return `${ICON_PIN}${escapeHtml(token)}`;
}

/** One contact item on the links line (LinkedIn / GitHub / portfolio site). */
function contactLink(token) {
  // Drop textual labels like "LinkedIn:" / "GitHub:" / "Portfolio:" — icons carry that.
  let t = token.replace(/^[A-Za-z][A-Za-z/]*:\s*/, '');
  const link = t.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  const text = link ? link[1] : t;
  const url = link ? link[2] : (/^[\w.-]+\.[a-z]{2,}(\/\S*)?$/i.test(t) ? `https://${t}` : null);

  let icon = ICON_GLOBE;
  if (/linkedin/i.test(url || t)) icon = ICON_LINKEDIN;
  else if (/github/i.test(url || t)) icon = ICON_GITHUB;

  const body = url ? `<a href="${escapeHtml(url)}">${escapeHtml(text)}</a>` : escapeHtml(text);
  return `${icon}${body}`;
}

function roleRow(leftHtml, dateHtml) {
  return `<p class="role"><span class="role-left">${leftHtml}</span><span class="role-date"><strong>${dateHtml}</strong></span></p>`;
}

/** Render parsed data into the full styled HTML document. */
function buildHtml(data) {
  const out = [];
  out.push('<!doctype html>');
  out.push('<html lang="en">');
  out.push('<head>');
  out.push('<meta charset="utf-8">');
  out.push('<title>Resume</title>');
  out.push(`<style>\n${CSS}\n</style>`);
  out.push('</head>');
  out.push('<body>');

  // Header: name + contact lines (centered, with icons).
  out.push(`<h1>${escapeHtml(data.name)}</h1>`);
  if (data.contacts[0]) {
    out.push(`<p>${data.contacts[0].split('|').map((c) => contactPrimary(c.trim())).join(' | ')}</p>`);
  }
  if (data.contacts[1]) {
    out.push(`<p>${data.contacts[1].split('|').map((c) => contactLink(c.trim())).join(' | ')}</p>`);
  }

  // Summary.
  if (data.summary) {
    out.push('<h2>Summary</h2>');
    out.push(`<p>${inlineMd(data.summary)}</p>`);
  }

  // Experience.
  if (data.roles.length) {
    out.push('<h2>Experience</h2>');
    for (const r of data.roles) {
      out.push(roleRow(
        `<strong>${escapeHtml(r.title)}</strong> | <strong>${escapeHtml(r.company)}</strong>`,
        escapeHtml(r.dates),
      ));
      if (r.bullets.length) {
        out.push('<ul>');
        for (const b of r.bullets) out.push(`<li>${inlineMd(b)}</li>`);
        out.push('</ul>');
      }
    }
  }

  // Technical Skills.
  if (data.skills.length) {
    out.push('<h2>Technical Skills</h2>');
    for (const s of data.skills) out.push(`<p>${inlineMd(s)}</p>`);
  }

  // Education.
  if (data.education.length) {
    out.push('<h2>Education</h2>');
    for (const line of data.education) {
      const parts = line.split('|').map((p) => p.trim());
      const school = inlineMd(parts[0] || '');
      const degree = parts[1] ? ` | ${inlineMd(parts[1])}` : '';
      const dates = parts[2] ? escapeHtml(parts[2]) : '';
      out.push(roleRow(`${school}${degree}`, dates));
    }
  }

  // Any other sections found in the markdown (safety net).
  const seenOther = new Set();
  for (const { section } of data.other) {
    if (!seenOther.has(section)) {
      seenOther.add(section);
      out.push(`<h2>${escapeHtml(section)}</h2>`);
    }
    const item = data.other.find((o) => o.section === section);
    if (item) out.push(`<p>${inlineMd(item.line)}</p>`);
  }

  out.push('</body>');
  out.push('</html>');
  return out.join('\n') + '\n';
}

/* ------------------------------------------------------------------ */
/* PDF rendering (headless Chromium)                                   */
/* ------------------------------------------------------------------ */

/** Find a usable Chromium/Chrome executable on this machine. */
function findChromium() {
  const home = process.env.HOME || '.';
  const candidates = [];

  // Playwright's cache: any chromium revision, newest first.
  const pwCache = path.join(home, '.cache', 'ms-playwright');
  try {
    const revs = readdirSync(pwCache)
      .filter((d) => /^chromium(-\d+)?$/.test(d) || /^chromium-\d+$/.test(d))
      .sort()
      .reverse();
    for (const rev of revs) {
      candidates.push(path.join(pwCache, rev, 'chrome-linux64', 'chrome'));
      candidates.push(path.join(pwCache, rev, 'chrome-linux', 'chrome'));
    }
  } catch { /* no playwright cache */ }

  // Puppeteer's cache: any Chrome for Testing revision.
  const puCache = path.join(home, '.cache', 'puppeteer', 'chrome');
  try {
    for (const rev of readdirSync(puCache).sort().reverse()) {
      candidates.push(path.join(puCache, rev, 'chrome-linux64', 'chrome'));
      candidates.push(path.join(puCache, rev, 'chrome-linux', 'chrome'));
    }
  } catch { /* no puppeteer cache */ }

  for (const c of candidates) {
    try { if (statSync(c).isFile()) return c; } catch { /* next */ }
  }
  return null;
}

async function renderPdf(htmlPath, pdfPath) {
  const require = createRequire(import.meta.url);

  // Prefer playwright-core; fall back to puppeteer-core.
  let launch = null;
  let browserName = null;
  for (const name of ['playwright-core', 'puppeteer-core']) {
    try {
      const mod = require(name);
      // playwright-core exposes browser factories ({ chromium, firefox, ... });
      // puppeteer-core exports launch() directly.
      launch = mod.chromium?.launch ? mod.chromium.launch.bind(mod.chromium) : mod;
      if (typeof launch !== 'function') launch = null;
      if (launch) { browserName = name; break; }
    } catch { /* next */ }
  }
  if (!launch) {
    throw new Error(
      'No PDF renderer found. Install one of:\n' +
      '  npm install -D playwright-core && npx playwright-core install chromium\n' +
      '  npm install -D puppeteer-core  (plus a Chrome in ~/.cache/puppeteer)',
    );
  }

  // The playwright-core copy in node_modules may pin a chromium revision that
  // is not installed (it often arrives as a transitive dependency). Resolve an
  // executable explicitly so any cached Chromium is used instead.
  const executablePath = findChromium();
  const launchOpts = { args: ['--no-sandbox'] };
  if (executablePath) launchOpts.executablePath = executablePath;
  if (browserName === 'playwright-core') launchOpts.headless = true;

  const browser = await launch(launchOpts);
  try {
    const page = await browser.newPage();
    await page.goto(`file://${htmlPath}`, { waitUntil: 'load' });
    await page.pdf({
      path: pdfPath,
      format: 'Letter',
      printBackground: true,
      margin: { top: '0.3in', right: '0.5in', bottom: '0.3in', left: '0.5in' },
    });
  } finally {
    await browser.close();
  }
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

async function main() {
  const md = readFileSync(MD_PATH, 'utf8');
  const data = parseResume(md);
  const html = buildHtml(data);
  writeFileSync(HTML_PATH, html);
  console.log(`Generated ${path.relative(ROOT, HTML_PATH)} from ${path.relative(ROOT, MD_PATH)}`);

  await renderPdf(HTML_PATH, PDF_PATH);
  console.log(`Generated ${path.relative(ROOT, PDF_PATH)} from ${path.relative(ROOT, HTML_PATH)}`);

  if (PREVIEW) {
    // Open the generated HTML in whatever browser the environment has.
    const { spawn } = await import('node:child_process');
    const openers = [
      ['xdg-open', [HTML_PATH]],
      ['x-www-browser', [HTML_PATH]],
      ['firefox', [`file://${HTML_PATH}`]],
      ['google-chrome', [`file://${HTML_PATH}`]],
      ['chromium', [`file://${HTML_PATH}`]],
      ['open', [HTML_PATH]], // macOS
    ];
    let opened = false;
    for (const [cmd, args] of openers) {
      try {
        const child = spawn(cmd, args, { detached: true, stdio: 'ignore' });
        child.on('error', () => {}); // may fail asynchronously; already moved on
        opened = true;
        break;
      } catch { /* try next */ }
    }
    console.log(opened ? `Preview: ${HTML_PATH}` : `Preview manually: ${HTML_PATH}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});