document.addEventListener('DOMContentLoaded', () => {
  fetchLiveNews();
});

async function fetchLiveNews() {
  const featuredContainer = document.getElementById('featured-story');
  const newsContainer = document.getElementById('news-list');

  if (!featuredContainer || !newsContainer) {
    console.error('❌ News containers not found');
    return;
  }

  featuredContainer.innerHTML = `<div class="news-loading">Loading featured story...</div>`;
  newsContainer.innerHTML = `<div class="news-loading">Loading live football news...</div>`;

  try {
    const feeds = [
      'https://feeds.bbci.co.uk/sport/football/rss.xml',
      'https://www.espn.com/espn/rss/soccer/news',
      'https://rss.app/feeds/Sx9M4LwzpqN8xPVR.xml'
    ];

    const requests = feeds.map(feed =>
      fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`)
        .then(res => res.json())
        .catch(err => {
          console.error('Feed error:', feed, err);
          return null;
        })
    );

    const results = await Promise.all(requests);

    const articles = results
      .filter(result => result && result.items)
      .flatMap(result => result.items)
      .filter(item => item.title && item.link)
      .slice(0, 10);

    if (!articles.length) {
      featuredContainer.innerHTML = `<div class="news-error">Live news is temporarily unavailable.</div>`;
      newsContainer.innerHTML = `<div class="news-error">No live stories available right now.</div>`;
      return;
    }

    const featured = articles[0];
    const rest = articles.slice(1);

    featuredContainer.innerHTML = renderFeaturedStory(featured);
    newsContainer.innerHTML = rest.map(renderNewsCard).join('');
  } catch (error) {
    console.error('❌ Live news error:', error);
    featuredContainer.innerHTML = `<div class="news-error">Failed to load featured story.</div>`;
    newsContainer.innerHTML = `<div class="news-error">Failed to load live news.</div>`;
  }
}

function renderFeaturedStory(article) {
  const image =
    article.thumbnail ||
    extractImageFromDescription(article.description) ||
    'https://via.placeholder.com/900x520?text=Football+News';

  const date = formatDate(article.pubDate);
  const description = truncateText(stripHtml(article.description || ''), 220);

  return `
    <a class="featured-story-card" href="${article.link}" target="_blank" rel="noopener noreferrer">
      <div class="featured-story-card__image">
        <img src="${image}" alt="${escapeHtml(article.title)}" loading="lazy">
      </div>
      <div class="featured-story-card__content">
        <div class="featured-story-card__meta">${date}</div>
        <h3 class="featured-story-card__title">${escapeHtml(article.title)}</h3>
        <p class="featured-story-card__excerpt">${escapeHtml(description)}</p>
      </div>
    </a>
  `;
}

function renderNewsCard(article) {
  const image =
    article.thumbnail ||
    extractImageFromDescription(article.description) ||
    'https://via.placeholder.com/600x400?text=Football+News';

  const date = formatDate(article.pubDate);
  const description = truncateText(stripHtml(article.description || ''), 140);

  return `
    <a class="news-card-v2" href="${article.link}" target="_blank" rel="noopener noreferrer">
      <div class="news-card-v2__image">
        <img src="${image}" alt="${escapeHtml(article.title)}" loading="lazy">
      </div>
      <div class="news-card-v2__content">
        <div class="news-card-v2__meta">${date}</div>
        <h3 class="news-card-v2__title">${escapeHtml(article.title)}</h3>
        <p class="news-card-v2__excerpt">${escapeHtml(description)}</p>
      </div>
    </a>
  `;
}

function extractImageFromDescription(description = '') {
  const match = description.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : '';
}

function stripHtml(html = '') {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

function escapeHtml(text = '') {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function truncateText(text = '', maxLength = 140) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}
