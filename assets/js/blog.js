// Blog rendering — reads the `posts` array from assets/js/posts.js
// and renders cards into #blog-list (blog.html) and #recent-posts-list (index.html).
// Also renders an empty state when there are no posts.

function blogCard(post) {
  const tags = (post.tags || [])
    .map(t => `<span class="badge badge-blue">${t}</span>`)
    .join('');
  return `
    <a href="blog/${post.slug}.html" class="blog-post-item">
      <div class="blog-post-meta-row">
        <span class="blog-date">${post.date}</span>
        ${tags}
      </div>
      <div class="blog-post-title">${post.title}</div>
      <p class="blog-post-excerpt">${post.excerpt || ''}</p>
    </a>`;
}

function renderBlog() {
  const list = document.getElementById('blog-list');
  if (list && typeof posts !== 'undefined') {
    if (posts.length === 0) {
      list.innerHTML = `
        <div class="blog-empty">
          <h3>No posts yet.</h3>
          <p>Writing about my progress and learnings in robotics, AI, and embedded systems. Stay tuned.</p>
        </div>`;
    } else {
      list.innerHTML = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date))
        .map(blogCard)
        .join('');
    }
  }

  const recent = document.getElementById('recent-posts-list');
  if (recent && typeof posts !== 'undefined') {
    if (posts.length === 0) {
      recent.innerHTML = `
        <div class="blog-empty">
          <h3>No posts yet.</h3>
          <p>I'll be sharing my progress and learnings here soon.</p>
        </div>`;
    } else {
      const latest = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 3);
      recent.innerHTML = latest
        .map(p => `
          <a href="blog/${p.slug}.html" class="post-item">
            <span class="post-date">${p.date}</span>
            <span class="post-title">${p.title}</span>
          </a>`)
        .join('');
    }
  }
}

document.addEventListener('DOMContentLoaded', renderBlog);
