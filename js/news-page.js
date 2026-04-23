document.addEventListener('DOMContentLoaded', () => {
  fetchLiveNews();
});

async function fetchLiveNews() {
  console.log('🚀 fetchLiveNews started');

  const featuredContainer = document.getElementById('featured-story');
  const newsContainer = document.getElementById('news-list');

  if (!featuredContainer || !newsContainer) {
    console.error('News containers not found');
    return;
  }

  featuredContainer.innerHTML = `<div class="news-loading">Loading featured story...</div>`;
  newsContainer.innerHTML = `<div class="news-loading">Loading live football news...</div>`;

  try {
    const feeds = [
      'https://feeds.bbci.co.uk/sport/football/rss.xml',
      'https://www.espn.com/espn/rss/soccer/news'
    ];

    const requests = feeds.map(async (feed) => {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data || data.status !== 'ok' || !Array.isArray(data.items)) {
          console.warn('Bad feed response:', feed, data);
          return [];
        }

        return data.items;
      } catch (error) {
        console.error('Feed error:', feed, error);
        return [];
      }
    });

    const feedItems = await Promise.all(requests);

    const articles = feedItems
      .flat()
      .filter(item => item && item.title && item.link)
      .sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0))
      .slice(0, 10);

    console.log('📦 articles:', articles);

    if (!articles.length) {
      featuredContainer.innerHTML = `
        <div class="news-error">Live news is temporarily unavailable.</div>
      `;
      newsContainer.innerHTML = `
        <div class="news-error">No live stories available right now.</div>
      `;
      return;
    }

    const featured = articles[0];
    const rest = articles.slice(1);

    featuredContainer.innerHTML = renderFeaturedStory(featured);

    newsContainer.innerHTML = rest.length
      ? rest.map((article, index) => renderNewsCard(article, index)).join('')
      : `<div class="news-error">Only one live story is available right now.</div>`;
  } catch (error) {
    console.error('Live news error:', error);

    featuredContainer.innerHTML = `
      <div class="news-error">Failed to load featured story.</div>
    `;

    newsContainer.innerHTML = `
      <div class="news-error">Failed to load live news.</div>
    `;
  }
}

function renderFeaturedStory(article) {
  const cleanTitle = cleanNewsTitle(article.title || '');

  const image =
    article.thumbnail ||
    extractImageFromDescription(article.description) ||
    getKeywordFallbackImage(cleanTitle, 0, true);

  const date = formatDate(article.pubDate);
  const description = truncateText(stripHtml(article.description || ''), 220);

  return `
    <a class="featured-story-card" href="${article.link}" target="_blank" rel="noopener noreferrer">
      <div class="featured-story-card__image">
        <img
          src="${image}"
          alt="${escapeHtml(cleanTitle)}"
          loading="lazy"
          onerror="this.onerror=null;this.src='assets/news/default-1.jpg';"
        >
      </div>
      <div class="featured-story-card__content">
        <div class="featured-story-card__meta">${date}</div>
        <h3 class="featured-story-card__title">${escapeHtml(cleanTitle)}</h3>
        <p class="featured-story-card__excerpt">${escapeHtml(description)}</p>
      </div>
    </a>
  `;
}

function renderNewsCard(article, index = 0) {
  const cleanTitle = cleanNewsTitle(article.title || '');

  const image =
    article.thumbnail ||
    extractImageFromDescription(article.description) ||
    getKeywordFallbackImage(cleanTitle, index, false);

  const date = formatDate(article.pubDate);
  const description = truncateText(stripHtml(article.description || ''), 140);

  return `
    <a class="news-card-v2" href="${article.link}" target="_blank" rel="noopener noreferrer">
      <div class="news-card-v2__image">
        <img
          src="${image}"
          alt="${escapeHtml(cleanTitle)}"
          loading="lazy"
          onerror="this.onerror=null;this.src='assets/news/default-1.jpg';"
        >
      </div>
      <div class="news-card-v2__content">
        <div class="news-card-v2__meta">${date}</div>
        <h3 class="news-card-v2__title">${escapeHtml(cleanTitle)}</h3>
        <p class="news-card-v2__excerpt">${escapeHtml(description)}</p>
      </div>
    </a>
  `;
}

function getKeywordFallbackImage(title = '', index = 0, isFeatured = false) {
  const text = title.toLowerCase();

  if (text.includes('arsenal')) {
    return 'assets/news/arsenal.jpg';
  }

  if (text.includes('chelsea')) {
    return 'assets/news/chelsea.jpg';
  }

  if (
    text.includes('barcelona') ||
    text.includes('barça') ||
    text.includes('barca') ||
    text.includes('yamal')
  ) {
    return 'assets/news/barcelona.jpg';
  }

  if (text.includes('liverpool')) {
    return 'assets/news/liverpool.jpg';
  }

  if (
    text.includes('transfer') ||
    text.includes('move') ||
    text.includes('sign') ||
    text.includes('deal')
  ) {
    return 'assets/news/transfer.jpg';
  }

  if (
    text.includes('title race') ||
    (text.includes('title') && text.includes('race'))
  ) {
    return 'assets/news/title-race.jpg';
  }

  if (
    text.includes('injury') ||
    text.includes('injured') ||
    text.includes('hamstring') ||
    text.includes('fitness')
  ) {
    return 'assets/news/injury.jpg';
  }

  if (
    text.includes('coach') ||
    text.includes('manager') ||
    text.includes('sack') ||
    text.includes('boss')
  ) {
    return 'assets/news/default-2.jpg';
  }

  const defaultImages = isFeatured
    ? ['assets/news/default-1.jpg', 'assets/news/default-2.jpg']
    : [
        'assets/news/default-1.jpg',
        'assets/news/default-2.jpg',
        'assets/news/default-3.jpg',
        'assets/news/default-4.jpg'
      ];

  return defaultImages[index % defaultImages.length];
}

function cleanNewsTitle(title = '') {
  return title
    .replace(/^sources:\s*/i, '')
    .replace(/^source:\s*/i, '')
    .trim();
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

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}
