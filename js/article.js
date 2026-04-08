async function loadArticlePage() {
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id");

  const categoryEl = document.getElementById("article-category");
  const titleEl = document.getElementById("article-title");
  const excerptEl = document.getElementById("article-excerpt");
  const timeEl = document.getElementById("article-time");
  const readTimeEl = document.getElementById("article-readtime");
  const imageEl = document.getElementById("article-image");
  const contentEl = document.getElementById("article-content");
  const insightTextEl = document.getElementById("article-insight-text");
  const relatedNewsListEl = document.getElementById("related-news-list");

  if (
    !categoryEl ||
    !titleEl ||
    !excerptEl ||
    !timeEl ||
    !readTimeEl ||
    !imageEl ||
    !contentEl ||
    !insightTextEl ||
    !relatedNewsListEl
  ) {
    console.error("Article page: required DOM elements are missing.");
    return;
  }

  try {
    const response = await fetch("data/news.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const newsItems = await response.json();

    if (!Array.isArray(newsItems) || newsItems.length === 0) {
      throw new Error("news.json is empty or invalid.");
    }

    const normalizedId = articleId ? String(articleId).trim() : "";
    const article =
      newsItems.find((item) => String(item.id).trim() === normalizedId) || newsItems[0];

    document.title = `${article.title || "Article"} | BetForecast.ai`;

    categoryEl.textContent = article.category || "News";
    titleEl.textContent = article.title || "Untitled article";
    excerptEl.textContent = article.excerpt || "";
    timeEl.textContent = article.time || "";
    readTimeEl.textContent = article.readTime || "";

    imageEl.src = article.image || "";
    imageEl.alt = article.title || "Article image";

    contentEl.innerHTML = "";

    const contentArray = Array.isArray(article.content) ? article.content : [];

    if (contentArray.length === 0) {
      const fallbackParagraph = document.createElement("p");
      fallbackParagraph.textContent = "Article content is not available yet.";
      contentEl.appendChild(fallbackParagraph);
    } else {
      contentArray.forEach((paragraph, index) => {
        const p = document.createElement("p");
        p.textContent = paragraph;
        contentEl.appendChild(p);

        if (index === 1) {
          const quote = document.createElement("blockquote");
          quote.className = "article-pro-quote";
          quote.textContent =
            "Small tactical changes can quietly reshape probability, tempo, and the entire match script.";
          contentEl.appendChild(quote);
        }
      });
    }

    insightTextEl.textContent = buildInsight(article);

    relatedNewsListEl.innerHTML = "";

    newsItems
      .filter((item) => String(item.id).trim() !== String(article.id).trim())
      .slice(0, 4)
      .forEach((item) => {
        const link = document.createElement("a");
        link.className = "related-news-item";
        link.href = `article.html?id=${encodeURIComponent(item.id)}`;

        const strong = document.createElement("strong");
        strong.textContent = item.title || "Untitled article";

        const meta = document.createElement("span");
        meta.textContent = `${item.category || "News"} • ${item.readTime || ""}`;

        link.appendChild(strong);
        link.appendChild(meta);
        relatedNewsListEl.appendChild(link);
      });
  } catch (error) {
    console.error("Failed to load article page:", error);

    document.title = "Article | BetForecast.ai";
    titleEl.textContent = "Unable to load article";
    excerptEl.textContent = "Please try again later.";
    contentEl.innerHTML = "<p>We could not load the article content.</p>";
    relatedNewsListEl.innerHTML = "";
  }
}

function buildInsight(article) {
  const category = (article.category || "").toLowerCase();

  if (category.includes("transfer")) {
    return "Transfer stories matter because player profiles can shift team goal expectation, finishing quality, and game-state control before markets fully adjust.";
  }

  if (
    category.includes("premier league") ||
    category.includes("la liga") ||
    category.includes("serie a")
  ) {
    return "League-specific team news changes forecast stability by affecting structure, pressing intensity, and expected chance creation across the full ninety minutes.";
  }

  if (category.includes("champions")) {
    return "In elite knockout football, emotional control after the first goal often matters as much as pre-match quality differences.";
  }

  return "This story matters because context changes models. Availability, tactical shape, and momentum often move the forecast more than headlines suggest.";
}

document.addEventListener("DOMContentLoaded", loadArticlePage);
