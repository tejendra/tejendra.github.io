/**
 * Build static HTML for each post in posts/*.md.
 * Output: blog/<slug>/index.html (clean URLs like /blog/understanding-codebases/)
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const POSTS_DIR = path.join(__dirname, 'posts');
const BLOG_DIR = path.join(__dirname, 'blog');
const TEMPLATE_PATH = path.join(__dirname, 'blog-template.html');

const BASE = '../..';
const DEFAULT_DESCRIPTION =
  'Tejendra is an Associate Director of AI & Software Engineer at Kyndryl, dedicated to building end-to-end AI-driven applications.';
const DEFAULT_KEYWORDS =
  'Tejendra Patel, software engineer, Kyndryl, AI, software development, programming, leadership, thought leadership, personal blog';

function parseFrontmatter(raw) {
  const data = {};
  const lines = raw.split('\n');
  for (const line of lines) {
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (m) {
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
        val = val.slice(1, -1);
      data[m[1]] = val;
    }
  }
  return data;
}

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return isNaN(d.getTime()) ? str : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

function escapeHtml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function buildMetaHtml(fm) {
  const parts = [];
  if (fm.date) {
    const iso = fm.date.slice(0, 10);
    parts.push(`<time datetime="${escapeHtml(iso)}">${escapeHtml(formatDate(fm.date))}</time>`);
  }
  if (fm.meta) parts.push(escapeHtml(fm.meta));
  return parts.join(' · ');
}

function getPostMeta(slug) {
  const mdPath = path.join(POSTS_DIR, slug + '.md');
  const raw = fs.readFileSync(mdPath, 'utf8');
  const match = raw.match(/^\s*---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
  const fmRaw = match ? match[1].trim() : '';
  const fm = parseFrontmatter(fmRaw);
  const title = fm.title || slug.replace(/-/g, ' ');
  return {
    slug,
    title,
    date: fm.date || '',
    category: (fm.category || '').toLowerCase(),
    description: fm.description || '',
    keywords: fm.keywords || '',
  };
}

function buildPostMainContent(slug, meta) {
  const mdPath = path.join(POSTS_DIR, slug + '.md');
  const raw = fs.readFileSync(mdPath, 'utf8');
  const match = raw.match(/^\s*---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
  const fmRaw = match ? match[1].trim() : '';
  const body = match ? match[2].trim() : raw;
  const fm = parseFrontmatter(fmRaw);
  const metaHtml = buildMetaHtml(fm);
  marked.setOptions({ gfm: true });
  const bodyHtml = marked.parse(body);
  return `
    <article>
      <header>
        <h1 class="post-title">${escapeHtml(meta.title)}</h1>
        <p class="post-meta">${metaHtml}</p>
      </header>
      <div class="post-content">${bodyHtml}</div>
    </article>`;
}

function fillTemplate(template, base, title, mainContent, meta = {}) {
  const description =
    meta.description || DEFAULT_DESCRIPTION;
  const keywords = meta.keywords || DEFAULT_KEYWORDS;
  return template
    .replace(/\{\{BASE\}\}/g, base)
    .replace(/\{\{TITLE\}\}/g, escapeHtml(title))
    .replace(/\{\{DESCRIPTION\}\}/g, escapeAttr(description))
    .replace(/\{\{KEYWORDS\}\}/g, escapeAttr(keywords))
    .replace(/\{\{MAIN_CONTENT\}\}/g, mainContent);
}

function main() {
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));

  if (fs.existsSync(BLOG_DIR)) fs.rmSync(BLOG_DIR, { recursive: true });
  fs.mkdirSync(BLOG_DIR, { recursive: true });

  const allMeta = [];
  for (const file of files) {
    const slug = path.basename(file, '.md');
    const meta = getPostMeta(slug);
    allMeta.push(meta);
    const mainContent = buildPostMainContent(slug, meta);
    const html = fillTemplate(template, BASE, meta.title, mainContent, meta);
    const outDir = path.join(BLOG_DIR, slug);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    console.log('  blog/' + slug + '/index.html');
  }

  // /blog and /blog/ redirect to home (single list lives on index.html only)
  const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0;url=../index.html">
    <title>Redirecting…</title>
    <script>location.replace("../index.html");</script>
</head>
<body>
    <p>Redirecting to <a href="../index.html">home</a>.</p>
</body>
</html>
`;
  fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), redirectHtml, 'utf8');
  console.log('  blog/index.html (redirect to home)');

  // Auto-populate blog lists on home page (exclude draft-* and readme)
  const excludeSlugs = ['readme'];
  const listable = allMeta.filter((m) => {
    const slug = m.slug.toLowerCase();
    return !slug.startsWith('draft-') && !excludeSlugs.includes(slug);
  });
  const byDate = (a, b) =>
    (b.date ? new Date(b.date).getTime() : 0) -
    (a.date ? new Date(a.date).getTime() : 0);
  const musings = listable
    .filter((m) => !['project', 'resume'].includes(m.category))
    .sort(byDate);
  const projects = listable
    .filter((m) => m.category === 'project')
    .sort(byDate);
  const musingsHtml = musings
    .map((m) => `<li><a href="blog/${m.slug}/">${escapeHtml(m.title)}</a></li>`)
    .join('\n                ');
  const projectsHtml = projects
    .map((m) => `<li><a href="blog/${m.slug}/">${escapeHtml(m.title)}</a></li>`)
    .join('\n                ');

  const indexSourcePath = path.join(__dirname, 'index-source.html');
  const indexPath = path.join(__dirname, 'index.html');
  let indexContent = fs.readFileSync(indexSourcePath, 'utf8');
  indexContent = indexContent.replace(
    /\{\{MUSINGS_HTML\}\}/,
    musingsHtml || '<!-- no posts yet -->'
  );
  indexContent = indexContent.replace(
    /\{\{PROJECTS_HTML\}\}/,
    projectsHtml || '<!-- no projects yet -->'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log('  index.html (lists updated)');

  console.log('Built ' + files.length + ' post(s).');
}

main();
