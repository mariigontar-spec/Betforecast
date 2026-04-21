document.addEventListener("DOMContentLoaded", async () => {
  const featuredStory = document.getElementById("featured-story");
  const newsList = document.getElementById("news-list");

  console.log("news-page.js loaded");

  if (!featuredStory || !newsList) {
    console.error("Missing containers:", {
      featuredStory: !!featuredStory,
      newsList: !!newsList
    });
    return;
  }

  try {
    const response = await fetch("data/news.json?ts=" + Date.now());

    if (!response.ok) {
      throw new Error(`news.json failed: ${response.status}`);
    }

    const news = await response.json();

    if (!Array.isArray(news) || news.length === 0) {
      throw new Error("news.json is empty or invalid");
    }

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

    newsList.innerHTML = "";

    news.slice(1).forEach((item) => {
      const card = document.createElement("a");
      card.className = "news-card glow-hover";
      card.href = `article.html?id=${encodeURIComponent(item.id)}`;

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
  } catch (error) {
    console.error("Failed to load news page:", error);

    featuredStory.innerHTML = `
      <div class="news-error-box">Failed to load featured story.</div>
    `;

    newsList.innerHTML = `
      <div class="news-error-box">Failed to load latest stories.</div>
    `;
  }
});
