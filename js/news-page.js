applyMobileNewsBackgroundFix();
ensureSiteSkinManager();

function applyMobileNewsBackgroundFix() {
  if (!window.matchMedia("(max-width: 760px)").matches) return;
  const style = document.createElement("style");
  style.id = "bf-news-mobile-background-fix";
  style.textContent = `
    @media (max-width: 760px) {
      html body.page-news.site-skin-1win,
      html body.page-news.site-skin-1win.site-skin-managed {
        padding-top: 10px !important;
        background-color: #020b13 !important;
        background-image: none !important;
        background: linear-gradient(180deg, #07111d 0%, #020b13 100%) !important;
      }
      body.page-news .skin-click,
      body.page-news .skin-click-top,
      body.page-news .skin-click-left,
      body.page-news .skin-click-right {
        display: none !important;
        pointer-events: none !important;
      }
    }
  `;
  document.head.appendChild(style);
  document.querySelectorAll(".skin-click, .skin-click-top, .skin-click-left, .skin-click-right").forEach((element) => element.remove());
}

function ensureSiteSkinManager() {
  const adScript = document.querySelector('script[src="https://media.getads.online/js/code.min.js"]');
  if (adScript && !adScript.id) adScript.id = "bf-adserver-script";
  if (document.querySelector('script[src^="/js/site-skin-manager.js"], script[src^="js/site-skin-manager.js"]')) return;
  const script = document.createElement("script");
  script.src = "/js/site-skin-manager.js?v=25";
  script.defer = true;
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-news");
  updateNewsPageLabels();
  loadCachedNews();
});

function updateNewsPageLabels() {
  document.title = "World Sports News | Betforecast.ai";
  const kicker = document.querySelector(".news-title-strip span");
  const title = document.querySelector(".news-title-strip h1");
  if (kicker) kicker.textContent = "World Sports News · 22 Aug 2026";
  if (title) title.textContent = "Premier League, Formula 1, Tennis & Global Sports Updates";

  const sidebarHeads = document.querySelectorAll(".news-sidebar-v2 .panel-head h2");
  if (sidebarHeads[0]) sidebarHeads[0].textContent = "Top Categories";
  if (sidebarHeads[1]) sidebarHeads[1].textContent = "Trending Signals";
  if (sidebarHeads[2]) sidebarHeads[2].textContent = "News Focus";

  const categoryList = document.querySelector(".league-list");
  if (categoryList) {
    categoryList.innerHTML = `
      <a class="sidebar-link-card" href="news.html#football">Football</a>
      <a class="sidebar-link-card" href="news.html#f1">Formula 1</a>
      <a class="sidebar-link-card" href="news.html#tennis">Tennis</a>
      <a class="sidebar-link-card" href="news.html#transfers">Transfers</a>
      <a class="sidebar-link-card" href="news.html#injuries">Injuries</a>
      <a class="sidebar-link-card" href="news.html#ai-sports">AI Sports</a>
    `;
  }

  const trendingList = document.querySelector(".trending-list");
  if (trendingList) {
    trendingList.innerHTML = `
      <a class="sidebar-link-card" href="match.html?id=hull-man-utd">Hull vs Man United · 12:30 UK</a>
      <a class="sidebar-link-card" href="match.html?id=brentford-spurs">Brentford vs Tottenham · 17:30 UK</a>
      <a class="sidebar-link-card" href="match.html?id=dutch-gp-saturday">Dutch GP · Sprint & Qualifying</a>
      <a class="sidebar-link-card" href="match.html?id=cincinnati-semifinals">Cincinnati Open · Semifinals</a>
    `;
  }

  const focusBox = document.querySelector(".news-focus-box");
  if (focusBox) {
    focusBox.innerHTML = `
      <strong>What matters most today</strong>
      <p>Arsenal opened the Premier League season with a 3-0 win over Coventry. Saturday brings five more league fixtures, George Russell starts the Dutch GP sprint from pole, and Cincinnati moves into its singles semifinals.</p>
    `;
  }
}

async function loadCachedNews() {
  const featuredContainer = document.getElementById("featured-story");
  const newsContainer = document.getElementById("news-list");
  if (!featuredContainer || !newsContainer) return;
  featuredContainer.innerHTML = `<div class="news-loading">Loading featured story...</div>`;
  newsContainer.innerHTML = `<div class="news-loading">Loading cached world sports news...</div>`;

  try {
    const response = await fetch(`/data/news.json?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`news.json failed: ${response.status}`);
    const newsItems = await response.json();
    if (!Array.isArray(newsItems) || !newsItems.length) throw new Error("news.json is empty or invalid");
    const articles = dedupeNews(newsItems).filter((item) => item && item.title).slice(0, 30);
    featuredContainer.innerHTML = renderFeaturedStory(articles[0]);
    const rest = articles.slice(1);
    newsContainer.innerHTML = rest.length ? rest.map((article, index) => renderNewsCard(article, index)).join("") : `<div class="news-error">Only one story is available right now.</div>`;
  } catch (error) {
    console.error("Cached news error:", error);
    featuredContainer.innerHTML = `<div class="news-error">Failed to load featured story.</div>`;
    newsContainer.innerHTML = `<div class="news-error">Failed to load cached news.</div>`;
  }
}

function renderFeaturedStory(article) {
  const title = article.title || "Untitled story";
  const image = article.image || getKeywordFallbackImage(title, 0);
  const date = article.time || article.date || "Latest update";
  const description = truncateText(article.excerpt || firstContentParagraph(article), 220);
  const href = getArticleHref(article);
  return `<a class="featured-story-card" href="${escapeHtml(href)}"${getLinkAttrs(href)}>
    <div class="featured-story-card__image"><img src="${escapeHtml(image)}" alt="${escapeHtml(title)}" loading="lazy" onerror="this.onerror=null;this.src='assets/news/default-1.jpg';"></div>
    <div class="featured-story-card__content"><div class="featured-story-card__meta">${escapeHtml(article.category || "World Sport")} • ${escapeHtml(date)}</div><h3 class="featured-story-card__title">${escapeHtml(title)}</h3><p class="featured-story-card__excerpt">${escapeHtml(description)}</p></div>
  </a>`;
}

function renderNewsCard(article, index = 0) {
  const title = article.title || "Untitled story";
  const image = article.image || getKeywordFallbackImage(title, index);
  const date = article.time || article.date || "Latest update";
  const description = truncateText(article.excerpt || firstContentParagraph(article), 140);
  const href = getArticleHref(article);
  return `<a class="news-card-v2" href="${escapeHtml(href)}"${getLinkAttrs(href)}>
    <div class="news-card-v2__image"><img src="${escapeHtml(image)}" alt="${escapeHtml(title)}" loading="lazy" onerror="this.onerror=null;this.src='assets/news/default-1.jpg';"></div>
    <div class="news-card-v2__content"><div class="news-card-v2__meta">${escapeHtml(article.category || "World Sport")} • ${escapeHtml(date)}</div><h3 class="news-card-v2__title">${escapeHtml(title)}</h3><p class="news-card-v2__excerpt">${escapeHtml(description)}</p></div>
  </a>`;
}

function dedupeNews(items = []) {
  const seen = new Set();
  return items.filter((item) => {
    const titleKey = String(item.title || "").toLowerCase().replace(/[^a-z0-9а-яё]+/gi, "-");
    const urlKey = String(item.sourceUrl || item.url || "").toLowerCase().replace(/[?#].*$/, "");
    const key = urlKey || titleKey;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getArticleHref(article) {
  return article.sourceUrl || article.url || `article.html?id=${encodeURIComponent(article.id || "")}`;
}

function getLinkAttrs(href = "") {
  return /^https?:\/\//i.test(href) ? ` target="_blank" rel="noopener noreferrer"` : "";
}

function firstContentParagraph(article) {
  return Array.isArray(article.content) && article.content.length ? article.content[0] || "" : "";
}

function getKeywordFallbackImage(title = "", index = 0) {
  const text = title.toLowerCase();
  if (text.includes("arsenal")) return "assets/news/arsenal.jpg";
  if (text.includes("chelsea")) return "assets/news/chelsea.jpg";
  if (text.includes("liverpool")) return "assets/news/liverpool.jpg";
  if (text.includes("transfer") || text.includes("sign") || text.includes("deal")) return "assets/news/transfer.jpg";
  if (text.includes("injury") || text.includes("injured") || text.includes("fitness")) return "assets/news/injury.jpg";
  const defaults = ["assets/news/default-1.jpg", "assets/news/default-2.jpg", "assets/news/default-3.jpg", "assets/news/default-4.jpg"];
  return defaults[index % defaults.length];
}

function escapeHtml(value = "") {
  const div = document.createElement("div");
  div.textContent = String(value);
  return div.innerHTML;
}

function truncateText(text = "", maxLength = 140) {
  const cleanText = String(text).trim();
  return cleanText.length <= maxLength ? cleanText : cleanText.slice(0, maxLength).trim() + "...";
}
