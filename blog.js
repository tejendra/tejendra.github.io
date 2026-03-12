/**
 * Load a post from ?post=slug: fetches posts/slug.md, parses frontmatter + markdown, renders.
 */
(function () {
  function getSlug() {
    var params = new URLSearchParams(window.location.search);
    return params.get('post') || (window.location.hash ? window.location.hash.slice(1) : null);
  }

  function parseFrontmatter(raw) {
    var data = {};
    var lines = raw.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var m = lines[i].match(/^(\w+):\s*(.+)$/);
      if (m) {
        var val = m[2].trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        data[m[1]] = val;
      }
    }
    return data;
  }

  function formatDate(str) {
    if (!str) return '';
    var d = new Date(str);
    return isNaN(d.getTime()) ? str : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  }

  function buildMeta(fm) {
    var parts = [];
    if (fm.date) {
      var iso = fm.date.slice(0, 10);
      parts.push('<time datetime="' + escapeAttr(iso) + '">' + escapeHtml(formatDate(fm.date)) + '</time>');
    }
    if (fm.meta) parts.push(escapeHtml(fm.meta));
    return parts.join(' · ');
  }

  function escapeHtml(s) {
    if (!s) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function escapeAttr(s) {
    if (!s) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function showError(msg) {
    document.getElementById('post-title').textContent = 'Post not found';
    document.getElementById('post-meta').innerHTML = '';
    document.getElementById('post-content').innerHTML = '<p>' + escapeHtml(msg) + '</p><p><a href="index.html">Back to home</a></p>';
  }

  function render(post) {
    document.title = (post.title || 'Post') + ' — Tejendra Patel';
    document.getElementById('post-title').textContent = post.title || 'Untitled';
    document.getElementById('post-meta').innerHTML = post.metaHtml || '';
    document.getElementById('post-content').innerHTML = post.bodyHtml || '';
  }

  function loadPost(slug) {
    if (!slug || !/^[a-z0-9-]+$/i.test(slug)) {
      showError('Missing or invalid post slug. Use ?post=slug (e.g. ?post=bike-ride).');
      return;
    }

    // Root-relative URL so fetch works from any path (e.g. github.io/blog.html)
    var base = window.location.pathname.replace(/\/[^/]*$/, '/');
    var url = base + 'posts/' + slug + '.md';

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Post not found: ' + slug);
        return res.text();
      })
      .then(function (raw) {
        var match = raw.match(/^\s*---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
        var fmRaw = match ? match[1].trim() : '';
        var body = match ? match[2].trim() : raw;
        var fm = parseFrontmatter(fmRaw);
        var title = fm.title || slug.replace(/-/g, ' ');
        var metaHtml = buildMeta(fm);
        marked.setOptions({ gfm: true });
        var bodyHtml = marked.parse(body);
        render({ title: title, metaHtml: metaHtml, bodyHtml: bodyHtml });
      })
      .catch(function (err) {
        showError(err.message || 'Could not load post.');
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { loadPost(getSlug()); });
  } else {
    loadPost(getSlug());
  }
})();
