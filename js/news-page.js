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

function renderNews(news, featuredStory, newsList) {
  if (!Array.isArray(news) || news.length === 0) {
    featuredStory.innerHTML = `
      <div class="news-error-box">No featured story available.</div>
    `;
    newsList.innerHTML = `
      <div class="news-error-box">No latest stories available.</div>
    `;
    return;
  }

  const featured = news[0];

  const featuredImage =
    featured.thumbnail ||
    extractImageFromDescription(featured.description) ||
    'assets/news/arsenal.jpg';

  const featuredDate = featured.pubDate
    ? new Date(featured.pubDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    : '';

  featuredStory.innerHTML = `
    <article class="featured-news-card glow-hover">
      <a href="${featured.link}" target="_blank" rel="noopener noreferrer">
        <img
          class="featured-news-image"
          src="${featuredImage}"
          alt="${escapeHtml(featured.title || 'Featured story')}"
          onerror="this.onerror=null;this.src='assets/news/arsenal.jpg';"
        >
        <div class="featured-news-body">
          <span class="news-category">Live News</span>
          <h3>${escapeHtml(featured.title || "")}</h3>
          <p>${escapeHtml(stripHtml(featured.description || "").slice(0, 180))}...</p>
          <div class="featured-news-meta">${featuredDate}</div>
        </div>
      </a>
    </article>
  `;

  newsList.innerHTML = "";

  news.slice(1).forEach((item) => {
    const image =
      item.thumbnail ||
      extractImageFromDescription(item.description) ||
      'assets/news/arsenal.jpg';

    const date = item.pubDate
      ? new Date(item.pubDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      : '';

    const card = document.createElement("a");
    card.className = "news-card glow-hover";
    card.href = item.link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    card.innerHTML = `
      <img
        src="${image}"
        alt="${escapeHtml(item.title || "News image")}"
        onerror="this.onerror=null;this.src='assets/news/arsenal.jpg';"
      >
      <div class="news-card-body">
        <span class="news-category">Live News</span>
        <h3>${escapeHtml(item.title || "")}</h3>
        <p>${escapeHtml(stripHtml(item.description || "").slice(0, 120))}...</p>
        <div class="news-meta">${date}</div>
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
