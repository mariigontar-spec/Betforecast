async function loadNewsPage() {
  const featuredStory = document.getElementById("featured-story");
  const latestStories = document.getElementById("latest-stories");

  try {
    const response = await fetch("data/news.json");
    if (!response.ok) {
      throw new Error(`news.json failed: ${response.status}`);
    }

    const news = await response.json();

    if (featuredStory && news.length) {
      const item = news[0];

      featuredStory.innerHTML = `
        <article class="featured-news-card glow-hover">
          <img src="${item.image}" alt="${item.title}" class="featured-news-image">
          <div class="featured-news-body">
            <div class="news-category">${item.category}</div>
            <h3>${item.title}</h3>
            <p>${item.excerpt}</p>
            <div class="news-meta">${item.time} • ${item.readTime}</div>
          </div>
        </article>
      `;
    }

    if (latestStories) {
      latestStories.innerHTML = "";

      news.slice(1).forEach((item) => {
        const card = document.createElement("a");
        card.className = "news-card glow-hover";
        card.href = `article.html?id=${item.id}`;

        card.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <div class="news-card-body">
            <div class="news-category">${item.category}</div>
            <h3>${item.title}</h3>
            <p>${item.excerpt}</p>
            <div class="news-meta">${item.time} • ${item.readTime}</div>
          </div>
        `;

        latestStories.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Failed to load news:", error);
  }
}

loadNewsPage();
