async function loadNewsPage() {
  const featuredStory = document.getElementById("featured-story");
  const newsList = document.getElementById("news-list");

  if (!featuredStory && !newsList) {
    console.error("News page: required containers not found.");
    return;
  }

  try {
    const news = await loadNewsData();

    if (!Array.isArray(news) || news.length === 0) {
      throw new Error("news.json is empty or invalid");
    }

    if (featuredStory) {
      const item = news[0];

      featuredStory.innerHTML = `
        <article class="featured-news-card glow-hover" href="article.html?id=${encodeURIComponent(item.id)}">
          <img
            src="${item.image || 'assets/news/arsenal.jpg'}"
            alt="${item.title || 'Featured story'}"
            class="featured-news-image"
            onerror="this.onerror=null; this.src='assets/news/arsenal.jpg'; this.alt='Featured story';"
          >
          <div class="featured-news-body">
            <div class="news-category">${item.category || "News"}</div>
            <h3>${item.title || ""}</h3>
            <p>${item.excerpt || ""}</p>
            <div class="featured-news-meta">${item.time || ""} • ${item.readTime || ""}</div>
          </div>
        </article>
      `;

      const featuredCard = featuredStory.querySelector(".featured-news-card");
      if (featuredCard) {
        featuredCard.style.cursor = "pointer";
        featuredCard.addEventListener("click", () => {
          window.location.href = `article.html?id=${encodeURIComponent(item.id)}`;
        });
      }
    }

    if (newsList) {
      newsList.innerHTML = "";

      news.slice(1).forEach((item) => {
        const card = document.createElement("a");
        card.className = "news-card glow-hover";
        card.href = `article.html?id=${encodeURIComponent(item.id)}`;

        card.innerHTML = `
          <img
            src="${item.image || 'assets/news/arsenal.jpg'}"
            alt="${item.title || 'News image'}"
            onerror="this.onerror=null; this.src='assets/news/arsenal.jpg'; this.alt='News image';"
          >
          <div class="news-card-body">
            <div class="news-category">${item.category || "News"}</div>
            <h3>${item.title || ""}</h3>
            <p>${item.excerpt || ""}</p>
            <div class="news-meta">${item.time || ""} • ${item.readTime || ""}</div>
          </div>
        `;

        newsList.appendChild(card);
      });
    }

    initGlowHover();
  } catch (error) {
    console.error("Failed to load news page:", error);

    if (featuredStory) {
      featuredStory.innerHTML = `
        <div class="news-error-box">
          Failed to load featured story.
        </div>
      `;
    }

    if (newsList) {
      newsList.innerHTML = `
        <div class="news-error-box">
          Failed to load latest stories.
        </div>
      `;
    }
  }
}

async function loadNewsData() {
  const candidatePaths = [
    "./data/news.json",
    "data/news.json",
    "/Betforecast/data/news.json"
  ];

  let lastError = null;

  for (const path of candidatePaths) {
    try {
      const response = await fetch(path, { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`${path} failed: ${response.status}`);
      }

      const text = await response.text();

      if (!text.trim()) {
        throw new Error(`${path} is empty`);
      }

      const data = JSON.parse(text);
      return data;
    } catch (error) {
      lastError = error;
      console.warn(`News fetch attempt failed for "${path}":`, error);
    }
  }

  throw lastError || new Error("Unable to load news.json");
}

function initGlowHover() {
  document.querySelectorAll(".glow-hover").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  });
}

document.addEventListener("DOMContentLoaded", loadNewsPage);
