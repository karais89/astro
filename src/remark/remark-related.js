// Rebuilt: simple HTML injector for related links
export default function remarkRelated(opts = {}) {
  const basePrefix = typeof opts.base === 'string' ? opts.base : '/';
  const maxItems = typeof opts.max === 'number' ? opts.max : 5;

  return (tree, file) => {
    const data = /** @type {any} */ (file.data || {});
    const fm = /** @type {any} */ (data.astro || {}).frontmatter || {};
    const raw = Array.isArray(fm.related) ? fm.related.filter(Boolean) : [];
    if (raw.length === 0) return;

    const links = raw.slice(0, maxItems).map((href) => {
      let url = String(href);
      if (url.startsWith('/')) {
        url = `${basePrefix}${url.replace(/^\//, '')}`;
      }
      if (!/\/$/.test(url)) url += '/';
      return `<li><a href="${url}">${href}</a></li>`;
    }).join('');

    const html = `
<section class="related related--widget">
  <div class="sl-heading-wrapper"><h2>관련 글</h2></div>
  <ul>${links}</ul>
</section>`;

    /** @type {any[]} */ (tree.children).push({ type: 'html', value: html });
  };
}


