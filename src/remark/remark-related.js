// Rebuilt: simple HTML injector for related links

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

let titleMapPromise;
async function getDocsTitleMap() {
  if (!titleMapPromise) {
    titleMapPromise = (async () => {
      // Dynamic import to avoid resolving at config-eval time
      const { getCollection } = await import('astro:content');
      const entries = await getCollection('docs');
      const map = new Map();
      for (const entry of entries) {
        const slug = String(entry.slug || ''); // e.g. blog/2025-09-23-dr-dc
        if (!slug) continue;
        const title = entry.data && (entry.data.title || (entry.data.sidebar && entry.data.sidebar.label)) || slug;
        const key = normalizeInternalPath(`/${slug}`);
        map.set(key, String(title));
      }
      return map;
    })();
  }
  return titleMapPromise;
}

export default function remarkRelated(opts = {}) {
  const basePrefix = typeof opts.base === 'string' ? opts.base : '/';
  const maxItems = typeof opts.max === 'number' ? opts.max : 5;

  return async (tree, file) => {
    const data = /** @type {any} */ (file.data || {});
    const fm = /** @type {any} */ (data.astro || {}).frontmatter || {};
    const raw = Array.isArray(fm.related) ? fm.related.filter(Boolean) : [];
    if (raw.length === 0) return;

    const titleMap = await getDocsTitleMap();

    const links = raw.slice(0, maxItems).map((href) => {
      const original = String(href);
      const normalized = normalizeInternalPath(original);

      const isInternal = normalized.startsWith('/');
      const display = isInternal ? (titleMap.get(normalized) || original) : original;

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


