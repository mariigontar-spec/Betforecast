const GNEWS_API_KEY = "e33177b1d184c448e3117610d69d51de";

function initGlowHover() {
  document.querySelectorAll(".glow-hover").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  });
}

function mapGNewsToCards(articles) {
  return articles.map((item, index) => {
    const date = item.publishedAt ? new Date(item.publishedAt) : null;
    const hoursAgo = date
      ? Math.max(1, Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60)))
      : 1;

    return {
      id: index + 1,
      category: "Football",
      title: item.title || "No title",
      excerpt: item.description || "No description available.",
      time: `${hoursAgo} hr ago`,
      readTime: "4 min read",
      image: item.image || "assets/news/arsenal.jpg",
      content: [
        item.description || "No article description available.",
        item.content || "Full content is limited on some plans.",
        `Source: ${item.source?.name || "Unknown source"}`,
        item.url || ""
      ]
    };
  });
}

async function fetchLocalNews() {
  const response = await fetch("./data/news.json?ts=" + Date.now(), {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Local news.json failed: ${response.status}`);
  }

  const news = await response.json();

  if (!Array.isArray(news) || news.length === 0) {
    throw new Error("Local news.json is empty or invalid");
  }

  return news;
}

async function fetchLiveNews() {
  const container = document.querySelector('[data-news-grid]');
  if (!container) return;

  container.innerHTML = `
    <div class="news-loading">Loading live football news...</div>
  `;

  try {
    const feeds = [
      'https://feeds.bbci.co.uk/sport/football/rss.xml',
      'https://www.espn.com/espn/rss/soccer/news',
      'https://www.goal.com/feeds/en/news'
    ];

    const requests = feeds.map(feed =>
      fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`)
        .then(res => res.json())
        .catch(() => null)
    );

    const results = await Promise.all(requests);

    const articles = results
      .filter(Boolean)
      .flatMap(result => result.items || [])
      .filter(item => item.title && item.link)
      .slice(0, 9);

    if (!articles.length) {
      container.innerHTML = `
        <div class="news-error">Live news is temporarily unavailable.</div>
      `;
      return;
    }

    container.innerHTML = articles.map(article => {
      const image =
        article.thumbnail ||
        extractImageFromDescription(article.description) ||
        'https://via.placeholder.com/600x400?text=Football+News';

      const date = article.pubDate
        ? new Date(article.pubDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })
        : '';

      return `
        <a class="news-card" href="${article.link}" target="_blank" rel="noopener noreferrer">
          <div class="news-card__image">
            <img src="${image}" alt="${escapeHtml(article.title)}" loading="lazy">
          </div>
          <div class="news-card__content">
            <div class="news-card__meta">${date}</div>
            <h3 class="news-card__title">${escapeHtml(article.title)}</h3>
            <p class="news-card__excerpt">
              ${escapeHtml(stripHtml(article.description || '').slice(0, 140))}...
            </p>
          </div>
        </a>
      `;
    }).join('');

  } catch (error) {
    console.error('Live news error:', error);
    container.innerHTML = `
      <div class="news-error">Failed to load live news.</div>
    `;
  }
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

function renderNews(news, featuredStory, newsList) {
  const featured = news[0];

  featuredStory.innerHTML = `
    <article class="featured-news-card glow-hover">
      <img
        class="featured-news-image"
        src="${featured.image || 'assets/news/arsenal.jpg'}"
        alt="${featured.title || 'Featured story'}"
        onerror="this.onerror=null;this.src='assets/news/arsenal.jpg';"
      >
      <div class="featured-news-body">
        <span class="news-category">${featured.category || "News"}</span>
        <h3>${featured.title || ""}</h3>
        <p>${featured.excerpt || ""}</p>
        <div class="featured-news-meta">${featured.time || ""} • ${featured.readTime || ""}</div>
      </div>
    </article>
  `;

  const featuredCard = featuredStory.querySelector(".featured-news-card");
  if (featuredCard) {
    featuredCard.style.cursor = "pointer";
    featuredCard.addEventListener("click", () => {
      localStorage.setItem("bf-live-news", JSON.stringify(news));
      window.location.href = `article.html?id=${encodeURIComponent(featured.id)}`;
    });
  }

  newsList.innerHTML = "";

  news.slice(1).forEach((item) => {
    const card = document.createElement("a");
    card.className = "news-card glow-hover";
    card.href = `article.html?id=${encodeURIComponent(item.id)}`;

    card.addEventListener("click", () => {
      localStorage.setItem("bf-live-news", JSON.stringify(news));
    });

    card.innerHTML = `
      <img
        src="${item.image || 'assets/news/arsenal.jpg'}"
        alt="${item.title || "News image"}"
        onerror="this.onerror=null;this.src='assets/news/arsenal.jpg';"
      >
      <div class="news-card-body">
        <span class="news-category">${item.category || "News"}</span>
        <h3>${item.title || ""}</h3>
        <p>${item.excerpt || ""}</p>
        <div class="news-meta">${item.time || ""} • ${item.readTime || ""}</div>
      </div>
    `;

    newsList.appendChild(card);
  });

  initGlowHover();
}

async function loadNewsPage() {
  const featuredStory = document.getElementById("featured-story");
  const newsList = document.getElementById("news-list");

  if (!featuredStory || !newsList) {
    console.error("Missing news containers");
    return;
  }

  featuredStory.innerHTML = `<div class="news-error-box">Loading featured story...</div>`;
  newsList.innerHTML = `<div class="news-error-box">Loading latest stories...</div>`;

  try {
    let news;

    try {
      news = await fetchLiveNews();
      console.log("Loaded live news from GNews");
    } catch (liveError) {
      console.warn("Live news failed, switching to local JSON:", liveError);
      news = await fetchLocalNews();
      console.log("Loaded local news fallback");
    }

    renderNews(news, featuredStory, newsList);
  } catch (error) {
    console.error("Failed to load any news source:", error);

    featuredStory.innerHTML = `
      <div class="news-error-box">Failed to load featured story.</div>
    `;

    newsList.innerHTML = `
      <div class="news-error-box">Failed to load latest stories.</div>
    `;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadNewsPage);
} else {
  loadNewsPage();
}
