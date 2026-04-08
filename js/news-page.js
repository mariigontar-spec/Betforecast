async function loadNewsPage() {
  const newsList = document.getElementById("news-list");
  if (!newsList) return;

  try {
    const response = await fetch("data/news.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const newsItems = await response.json();

    if (!Array.isArray(newsItems)) {
      throw new Error("news.json is not an array");
    }

    newsList.innerHTML = "";

    newsItems.forEach((item) => {
      const card = document.createElement("a");
      card.className = "news-card";
      card.href = `article.html?id=${encodeURIComponent(item.id || "")}`;

      const image = document.createElement("img");
      image.src = item.image || "";
      image.alt = item.title || "News image";
      image.loading = "lazy";

      const body = document.createElement("div");
      body.className = "news-card-body";

      const category = document.createElement("div");
      category.className = "news-category";
      category.textContent = item.category || "News";

      const title = document.createElement("h3");
      title.textContent = item.title || "Untitled article";

      const excerpt = document.createElement("p");
      excerpt.textContent = item.excerpt || "";

      const meta = document.createElement("div");
      meta.className = "news-meta";
      meta.textContent = `${item.time || ""}${item.time && item.readTime ? " • " : ""}${item.readTime || ""}`;

      body.appendChild(category);
      body.appendChild(title);
      body.appendChild(excerpt);
      body.appendChild(meta);

      card.appendChild(image);
      card.appendChild(body);

      newsList.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load news.json:", error);

    newsList.innerHTML = `
      <div class="news-empty-state">
        <h3>Unable to load news</h3>
        <p>Please check data/news.json and file paths.</p>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadNewsPage);
