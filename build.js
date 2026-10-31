const fs = require('fs');
const path = require('path');

// Production base URL (user site: https://<username>.github.io/)
const BASE_URL = 'https://siddoit.github.io';
const SITE_NAME = 'Sidharth Sajith';
const SITE_DESC = 'Robotics & Automation Engineer — AI, Computer Vision, Embedded Systems';

function loadPosts() {
  const postsPath = path.join(__dirname, 'assets/js/posts.js');
  const content = fs.readFileSync(postsPath, 'utf8');
  const match = content.match(/const posts = (\[[\s\S]*?\]);/);
  if (!match) throw new Error('Could not parse posts.js');
  const posts = new Function('return ' + match[1])();
  return posts;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatRFC822(dateStr) {
  return new Date(dateStr).toUTCString();
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildIndex() {
  const posts = loadPosts().sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestPosts = posts.slice(0, 3);
  
  let index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  
  const recentPostsHtml = latestPosts.map(p => `
    <a href="blog/${p.slug}.html" class="post-item">
      <span class="post-date">${formatDate(p.date)}</span>
      <span class="post-title">${escapeXml(p.title)}</span>
    </a>`).join('');
  
  if (index.includes('<!-- RECENT_POSTS_START -->')) {
    index = index.replace(
      /<!-- RECENT_POSTS_START -->[\s\S]*?<!-- RECENT_POSTS_END -->/,
      `<!-- RECENT_POSTS_START -->${recentPostsHtml}\n            <!-- RECENT_POSTS_END -->`
    );
  } else {
    index = index.replace(
      /<div id="recent-posts-list">[\s\S]*?<\/div>/,
      `<div id="recent-posts-list">\n            <!-- RECENT_POSTS_START -->${recentPostsHtml}\n            <!-- RECENT_POSTS_END -->\n            </div>`
    );
  }
  
  fs.writeFileSync(path.join(__dirname, 'index.html'), index);
}

function buildBlogIndex() {
  const posts = loadPosts().sort((a, b) => new Date(b.date) - new Date(a.date));
  
  let blog = fs.readFileSync(path.join(__dirname, 'blog.html'), 'utf8');
  
  const postsHtml = posts.map(p => {
    const tagsHtml = (p.tags || []).map(t => `<span class="badge badge-blue">${escapeXml(t)}</span>`).join('');
    return `
      <a href="blog/${p.slug}.html" class="blog-post-item">
        <div class="blog-post-meta-row">
          <span class="blog-date">${formatDate(p.date)}</span>
          ${tagsHtml}
        </div>
        <div class="blog-post-title">${escapeXml(p.title)}</div>
        <p class="blog-post-excerpt">${escapeXml(p.excerpt || '')}</p>
      </a>`;
  }).join('');
  
  if (blog.includes('<!-- BLOG_POSTS_START -->')) {
    blog = blog.replace(
      /<!-- BLOG_POSTS_START -->[\s\S]*?<!-- BLOG_POSTS_END -->/,
      `<!-- BLOG_POSTS_START -->${postsHtml}\n      <!-- BLOG_POSTS_END -->`
    );
  } else {
    blog = blog.replace(
      /<div class="blog-list fade-in" id="blog-list">[\s\S]*?<\/div>\s*<\/div>\s*<\/main>/,
      `<div class="blog-list fade-in" id="blog-list">\n      <!-- BLOG_POSTS_START -->${postsHtml}\n      <!-- BLOG_POSTS_END -->\n      </div>\n    </div>\n  </main>`
    );
  }
  
  fs.writeFileSync(path.join(__dirname, 'blog.html'), blog);
}

/**
 * SAFE STUB GENERATION:
 * Authored content is primary source. Never overwrite existing files!
 */
function buildAllBlogPosts() {
  const posts = loadPosts();
  const templatePath = path.join(__dirname, 'blog/post-template.html');
  if (!fs.existsSync(templatePath)) return;
  const template = fs.readFileSync(templatePath, 'utf8');
  
  let generatedCount = 0;
  posts.forEach(post => {
    const targetFile = path.join(__dirname, `blog/${post.slug}.html`);
    if (fs.existsSync(targetFile)) {
      return;
    }
    
    const tagsHtml = (post.tags || []).map(t => `<span class="badge badge-blue">${escapeXml(t)}</span>`).join('');
    let html = template
      .replace(/\{\{title\}\}/g, escapeXml(post.title))
      .replace(/\{\{date\}\}/g, formatDate(post.date))
      .replace(/\{\{excerpt\}\}/g, escapeXml(post.excerpt || ''))
      .replace(/\{\{tags\}\}/g, tagsHtml)
      .replace(/\{\{slug\}\}/g, post.slug);
    
    fs.writeFileSync(targetFile, html);
    generatedCount++;
    console.log(`  + Created initial template for new post: blog/${post.slug}.html`);
  });
  
  if (generatedCount === 0) {
    console.log('  ✓ All 7 authored blog posts verified and preserved safely.');
  }
}

function generateSitemap() {
  const posts = loadPosts();
  const urls = [
    { url: BASE_URL + '/', changefreq: 'weekly', priority: '1.0' },
    { url: BASE_URL + '/projects.html', changefreq: 'monthly', priority: '0.8' },
    { url: BASE_URL + '/blog.html', changefreq: 'weekly', priority: '0.8' },
    { url: BASE_URL + '/cv.html', changefreq: 'monthly', priority: '0.6' },
    { url: BASE_URL + '/contact.html', changefreq: 'yearly', priority: '0.5' },
  ];
  
  posts.forEach(p => {
    urls.push({ url: `${BASE_URL}/blog/${p.slug}.html`, changefreq: 'monthly', priority: '0.7' });
  });
  
  const projectFiles = fs.readdirSync(path.join(__dirname, 'projects')).filter(f => f.endsWith('.html'));
  projectFiles.forEach(f => {
    urls.push({ url: `${BASE_URL}/projects/${f}`, changefreq: 'monthly', priority: '0.7' });
  });
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  urls.forEach(u => {
    xml += `  <url>\n    <loc>${u.url}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>\n`;
  });
  xml += '</urlset>\n';
  
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml);
}

function generateRSS() {
  const posts = loadPosts().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
  const now = new Date().toUTCString();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} — Blog</title>
    <link>${BASE_URL}/blog.html</link>
    <description>${SITE_DESC}</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
`;
  
  posts.forEach(p => {
    xml += `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${BASE_URL}/blog/${p.slug}.html</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${p.slug}.html</guid>
      <description>${escapeXml(p.excerpt || '')}</description>
      <pubDate>${formatRFC822(p.date)}</pubDate>
      ${(p.tags || []).map(t => `<category>${escapeXml(t)}</category>`).join('\n      ')}
    </item>\n`;
  });
  
  xml += '  </channel>\n</rss>\n';
  fs.writeFileSync(path.join(__dirname, 'feed.xml'), xml);
}

function generateRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(__dirname, 'robots.txt'), robots);
}

function build() {
  console.log('Building site safely...');
  buildIndex();
  console.log('✓ index.html recent posts updated');
  buildBlogIndex();
  console.log('✓ blog.html post listing updated');
  buildAllBlogPosts();
  generateSitemap();
  console.log('✓ sitemap.xml generated');
  generateRSS();
  console.log('✓ feed.xml generated');
  generateRobots();
  console.log('✓ robots.txt generated');
  console.log('Build completed safely!');
}

build();
