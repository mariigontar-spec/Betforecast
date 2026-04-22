const GNEWS_API_KEY = e33177b1d184c448e3117610d69d51de;

function initGlowHover() {
  document.querySelectorAll(".glow-hover").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  });
}

// 🔄 Преобразуем API → твой формат
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
      excerpt: item.description || "No description",
      time: `${hoursAgo} hr ago`,
      readTime: "4 min read",
      image: item.image || "assets/news/arsenal.jpg"
    };
  });
}

async function loadNewsPage() {
  const featuredStory = document.getElementById("featured-story");
  const newsList = document.getElementById("news-list");

  console.log("news-page.js LIVE mode");

  if (!featuredStory || !newsList) {
    console.error("Missing containers");
    return;
  }

  featuredStory.innerHTML = `<div class="news-error-box">Loading live news...</div>`;
  newsList.innerHTML = `<div class="news-error-box">Loading...</div>`;

  try {
    const url =
      `https://gnews.io/api/v4/search` +
      `?q=football OR soccer OR "premier league" OR "champions league" OR "transfer news"` +
      `&lang=en` +
      `&max=10` +
      `&apikey=${GNEWS_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      throw new Error("No articles");
    }

    const news = mapGNewsToCards(data.articles);
    const featured = news[0];

    // ⭐ Featured
    featuredStory.innerHTML = `
      <article class="featured-news-card glow-hover">
        <img
          class="featured-news-image"
          src="${featured.image}"
          alt="${featured.title}"
          onerror="this.onerror=null;this.src='assets/news/arsenal.jpg';"
        >
        <div class="featured-news-body">
          <span class="news-category">${featured.category}</span>
          <h3>${featured.title}</h3>
          <p>${featured.excerpt}</p>
          <div class="featured-news-meta">${featured.time} • ${featured.readTime}</div>
        </div>
      </article>
    `;

    // 📰 List
    newsList.innerHTML = "";

    news.slice(1).forEach((item) => {
      const card = document.createElement("a");
      card.className = "news-card glow-hover";
      card.href = "#";

      card.innerHTML = `
        <img
          src="${item.image}"
          alt="${item.title}"
          onerror="this.onerror=null;this.src='assets/news/arsenal.jpg';"
        >
        <div class="news-card-body">
          <span class="news-category">${item.category}</span>
          <h3>${item.title}</h3>
          <p>${item.excerpt}</p>
          <div class="news-meta">${item.time} • ${item.readTime}</div>
        </div>
      `;

      newsList.appendChild(card);
    });

    initGlowHover();
  } catch (error) {
    console.error("LIVE NEWS ERROR:", error);

    featuredStory.innerHTML = `<div class="news-error-box">Failed to load live news</div>`;
    newsList.innerHTML = `<div class="news-error-box">Check API / CORS</div>`;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadNewsPage);
} else {
  loadNewsPage();
}
