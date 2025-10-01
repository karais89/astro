// Rebuilt: simple HTML injector for related links
import fs from 'node:fs';
import path from 'node:path';

/**
 * Escape HTML special characters for safe text rendering.
 * @param {string} text
 */
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Normalize internal path to leading+trailing slash form: "/x/y/" */
function normalizeInternalPath(url) {
  let u = String(url);
  if (!u.startsWith('/')) {
    return u; // external or relative — leave as-is
  }
  u = `/${u.replace(/^\/+/, '')}`;
  if (!u.endsWith('/')) {
    u += '/';
  }
  return u;
}

const titleCache = new Map();
const docsRoot = path.resolve(process.cwd(), 'src', 'content', 'docs');

function parseYamlString(raw) {
  let value = String(raw || '').trim();
  if (!value) return '';
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  return value;
}

function readFrontmatterTitle(filePath) {
  try {
    const contents = fs.readFileSync(filePath, 'utf8');
    const match = contents.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) return null;
    const frontmatter = match[1];
    const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
    if (!titleMatch) return null;
    return parseYamlString(titleMatch[1]);
  } catch {
    return null;
  }
}

function getDocTitle(normalizedPath) {
  if (!normalizedPath.startsWith('/')) return null;
  if (titleCache.has(normalizedPath)) return titleCache.get(normalizedPath);
  const trimmed = normalizedPath.replace(/^\/+|\/+$/g, '');
  if (!trimmed) {
    titleCache.set(normalizedPath, null);
    return null;
  }
  const basePath = path.join(docsRoot, trimmed);
  const candidates = [`${basePath}.md`, `${basePath}.mdx`, path.join(basePath, 'index.md'), path.join(basePath, 'index.mdx')];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      const title = readFrontmatterTitle(candidate) || trimmed;
      titleCache.set(normalizedPath, title);
      return title;
    }
  }
  titleCache.set(normalizedPath, null);
  return null;
}

export default function remarkRelated(opts = {}) {
  const basePrefix = typeof opts.base === 'string' ? opts.base : '/';
  const maxItems = typeof opts.max === 'number' ? opts.max : 5;

  return async (tree, file) => {
    const data = /** @type {any} */ (file.data || {});
    const fmContainer = /** @type {any} */ (data.astro || {});
    if (!fmContainer.frontmatter && data.matter) {
      fmContainer.frontmatter = data.matter.data;
    }
    const fm = /** @type {any} */ (fmContainer.frontmatter || {});
    const raw = Array.isArray(fm.related) ? fm.related.filter(Boolean) : [];
    if (raw.length === 0) return;

    const links = raw.slice(0, maxItems).map((href) => {
      const original = String(href);
      const normalized = normalizeInternalPath(original);

      const isInternal = normalized.startsWith('/');
      const title = isInternal ? getDocTitle(normalized) : null;
      const display = title || original;

      let url = original;
      if (isInternal) {
        // apply base prefix and ensure trailing slash for internal links
        url = `${basePrefix}${normalized.replace(/^\//, '')}`;
      }

      return `<li><a href="${url}">${escapeHtml(display)}</a></li>`;
    }).join('');

    const html = `
<section class="related related--widget">
  <div class="sl-heading-wrapper"><h2>관련 글</h2></div>
  <ul>${links}</ul>
</section>`;

    /** @type {any[]} */ (tree.children).push({ type: 'html', value: html });
  };
}
