async function loadNewsPage() {
  const featuredStory = document.getElementById("featured-story");
  const newsList = document.getElementById("news-list");

  try {
    const response = await fetch("./data/news.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`news.json failed: ${response.status}`);
    }

    const news = await response.json();

    if (!Array.isArray(news) || news.length === 0) {
      throw new Error("news.json is empty or invalid");
    }

    if (featuredStory) {
      const item = news[0];

      featuredStory.innerHTML = `
        <article class="featured-news-card glow-hover">
          <img
            src="${item.image || 'assets/news/arsenal.jpg'}"
            alt="${item.title || 'Featured story'}"
            class="featured-news-image"
            onerror="this.src='assets/news/arsenal.jpg'; this.alt='Featured story';"
          >
          <div class="featured-news-body">
            <div class="news-category">${item.category || "News"}</div>
            <h3>${item.title || ""}</h3>
            <p>${item.excerpt || ""}</p>
            <div class="featured-news-meta">${item.time || ""} • ${item.readTime || ""}</div>
          </div>
        </article>
      `;
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
            onerror="this.src='assets/news/arsenal.jpg'; this.alt='News image';"
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
    console.error("Failed to load news:", error);

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
