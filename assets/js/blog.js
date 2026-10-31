// Blog rendering — reads the `posts` array from assets/js/posts.js
// and hydrates cards into #blog-list (blog.html) and #recent-posts-list (index.html).

function formatBlogDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function blogCard(post) {
  const tags = (post.tags || [])
    .map(t => `<span class="badge badge-blue">${escapeHtml(t)}</span>`)
    .join('');
  return `
    <a href="blog/${post.slug}.html" class="blog-post-item">
      <div class="blog-post-meta-row">
        <span class="blog-date">${formatBlogDate(post.date)}</span>
        ${tags}
      </div>
      <div class="blog-post-title">${escapeHtml(post.title)}</div>
      <p class="blog-post-excerpt">${escapeHtml(post.excerpt || '')}</p>
    </a>`;
}

function renderBlog() {
  const list = document.getElementById('blog-list');
  if (list && typeof posts !== 'undefined') {
    // Only hydrate if empty or needs dynamic update
    if (list.children.length === 0 || list.querySelector('.blog-empty')) {
      if (posts.length === 0) {
        list.innerHTML = `
          <div class="blog-empty">
            <h3>No posts yet.</h3>
            <p>Writing about my progress and learnings in robotics, AI, and embedded systems. Stay tuned.</p>
          </div>`;
      } else {
        list.innerHTML = posts
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map(blogCard)
          .join('');
      }
    }
  }

  const recent = document.getElementById('recent-posts-list');
  if (recent && typeof posts !== 'undefined') {
    // Only hydrate if empty
    if (recent.children.length === 0 || recent.querySelector('.blog-empty')) {
      if (posts.length === 0) {
        recent.innerHTML = `
          <div class="blog-empty">
            <h3>No posts yet.</h3>
            <p>I'll be sharing my progress and learnings here soon.</p>
          </div>`;
      } else {
        const latest = posts
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);
        recent.innerHTML = latest
          .map(p => `
            <a href="blog/${p.slug}.html" class="post-item">
              <span class="post-date">${formatBlogDate(p.date)}</span>
              <span class="post-title">${escapeHtml(p.title)}</span>
            </a>`)
          .join('');
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', renderBlog);
