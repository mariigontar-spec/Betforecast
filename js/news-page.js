function injectAdhitBackgroundSlot() {
  const zoneId = "163743";
  const slotId = "bf-adhit-background-zone";

  if (
    document.getElementById(slotId) ||
    document.querySelector(`ins.ins-zone[data-zone="${zoneId}"]`)
  ) {
    return;
  }

  const slot = document.createElement("ins");
  slot.id = slotId;
  slot.className = "ins-zone";
  slot.dataset.zone = zoneId;

  document.body.insertBefore(slot, document.body.firstChild);
}

injectAdhitBackgroundSlot();

document.addEventListener("DOMContentLoaded", () => {
  injectAdhitBackgroundSlot();
  loadCachedNews();
});

async function loadCachedNews() {
  const featuredContainer = document.getElementById("featured-story");
  const newsContainer = document.getElementById("news-list");

  if (!featuredContainer || !newsContainer) {
    console.error("News containers not found");
    return;
  }

  featuredContainer.innerHTML = `<div class="news-loading">Loading featured story...</div>`;
  newsContainer.innerHTML = `<div class="news-loading">Loading cached football news...</div>`;

  try {
    const response = await fetch(`/data/news.json?v=${Date.now()}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`news.json failed: ${response.status}`);
    }

    const newsItems = await response.json();

    if (!Array.isArray(newsItems) || !newsItems.length) {
      throw new Error("news.json is empty or invalid");
    }

    const articles = dedupeNews(newsItems)
      .filter((item) => item && item.title)
      .slice(0, 30);

    const featured = articles[0];
    const rest = articles.slice(1);

    featuredContainer.innerHTML = renderFeaturedStory(featured);

    newsContainer.innerHTML = rest.length
      ? rest.map((article, index) => renderNewsCard(article, index)).join("")
      : `<div class="news-error">Only one story is available right now.</div>`;
  } catch (error) {
    console.error("Cached news error:", error);

    featuredContainer.innerHTML = `
      <div class="news-error">Failed to load featured story.</div>
    `;

    newsContainer.innerHTML = `
      <div class="news-error">Failed to load cached news.</div>
    `;
  }
}

function renderFeaturedStory(article) {
  const title = article.title || "Untitled story";
  const image = article.image || getKeywordFallbackImage(title, 0, true);
  const date = article.time || article.date || "Latest update";
  const description = truncateText(article.excerpt || firstContentParagraph(article), 220);
  const href = getArticleHref(article);
  const attrs = getLinkAttrs(href);

  return `
    <a class="featured-story-card" href="${escapeHtml(href)}"${attrs}>
      <div class="featured-story-card__image">
        <img
          src="${escapeHtml(image)}"
          alt="${escapeHtml(title)}"
          loading="lazy"
          onerror="this.onerror=null;this.src='assets/news/default-1.jpg';"
        >
      </div>
      <div class="featured-story-card__content">
        <div class="featured-story-card__meta">${escapeHtml(article.category || "Football")} • ${escapeHtml(date)}</div>
        <h3 class="featured-story-card__title">${escapeHtml(title)}</h3>
        <p class="featured-story-card__excerpt">${escapeHtml(description)}</p>
      </div>
    </a>
  `;
}

function renderNewsCard(article, index = 0) {
  const title = article.title || "Untitled story";
  const image = article.image || getKeywordFallbackImage(title, index, false);
  const date = article.time || article.date || "Latest update";
  const description = truncateText(article.excerpt || firstContentParagraph(article), 140);
  const href = getArticleHref(article);
  const attrs = getLinkAttrs(href);

  return `
    <a class="news-card-v2" href="${escapeHtml(href)}"${attrs}>
      <div class="news-card-v2__image">
        <img
          src="${escapeHtml(image)}"
          alt="${escapeHtml(title)}"
          loading="lazy"
          onerror="this.onerror=null;this.src='assets/news/default-1.jpg';"
        >
      </div>
      <div class="news-card-v2__content">
        <div class="news-card-v2__meta">${escapeHtml(article.category || "Football")} • ${escapeHtml(date)}</div>
        <h3 class="news-card-v2__title">${escapeHtml(title)}</h3>
        <p class="news-card-v2__excerpt">${escapeHtml(description)}</p>
      </div>
    </a>
  `;
}

function dedupeNews(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const titleKey = String(item.title || "")
      .toLowerCase()
      .replace(/[^a-z0-9а-яё]+/gi, "-");

    const urlKey = String(item.sourceUrl || item.url || "")
      .toLowerCase()
      .replace(/[?#].*$/, "");

    const key = urlKey || titleKey;
    if (!key || seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

function getArticleHref(article) {
  if (article.sourceUrl) {
    return article.sourceUrl;
  }

  if (article.url) {
    return article.url;
  }

  return `article.html?id=${encodeURIComponent(article.id || "")}`;
}

function getLinkAttrs(href = "") {
  if (/^https?:\/\//i.test(href)) {
    return ` target="_blank" rel="noopener noreferrer"`;
  }

  return "";
}

function firstContentParagraph(article) {
  if (Array.isArray(article.content) && article.content.length) {
    return article.content[0] || "";
  }

  return "";
}

function getKeywordFallbackImage(title = "", index = 0, isFeatured = false) {
  const text = title.toLowerCase();

  if (text.includes("arsenal")) return "assets/news/arsenal.jpg";
  if (text.includes("chelsea")) return "assets/news/chelsea.jpg";

  if (
    text.includes("barcelona") ||
    text.includes("barça") ||
    text.includes("barca") ||
    text.includes("yamal")
  ) {
    return "assets/news/barcelona.jpg";
  }

  if (text.includes("liverpool")) return "assets/news/liverpool.jpg";

  if (
    text.includes("transfer") ||
    text.includes("move") ||
    text.includes("sign") ||
    text.includes("deal")
  ) {
    return "assets/news/transfer.jpg";
  }

  if (
    text.includes("title race") ||
    (text.includes("title") && text.includes("race"))
  ) {
    return "assets/news/title-race.jpg";
  }

  if (
    text.includes("injury") ||
    text.includes("injured") ||
    text.includes("hamstring") ||
    text.includes("fitness")
  ) {
    return "assets/news/injury.jpg";
  }

  const defaultImages = isFeatured
    ? ["assets/news/default-1.jpg", "assets/news/default-2.jpg"]
    : [
        "assets/news/default-1.jpg",
        "assets/news/default-2.jpg",
        "assets/news/default-3.jpg",
        "assets/news/default-4.jpg"
      ];

  return defaultImages[index % defaultImages.length];
}

function escapeHtml(value = "") {
  const div = document.createElement("div");
  div.textContent = String(value);
  return div.innerHTML;
}

function truncateText(text = "", maxLength = 140) {
  const cleanText = String(text).trim();
  if (cleanText.length <= maxLength) return cleanText;
  return cleanText.slice(0, maxLength).trim() + "...";
}
