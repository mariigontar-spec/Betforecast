async function loadNewsPage() {
  const newsList = document.getElementById("news-list");

  if (!newsList) return;

  try {
    const response = await fetch("data/news.json");
    const newsItems = await response.json();

    newsList.innerHTML = "";

    newsItems.forEach((item) => {
      const card = document.createElement("article");
      card.className = "news-card";

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="news-card-body">
          <div class="news-category">${item.category}</div>
          <h3>${item.title}</h3>
          <p>${item.excerpt}</p>
          <div class="news-meta">${item.time} • ${item.readTime}</div>
        </div>
      `;

      newsList.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load news.json:", error);
  }
}

loadNewsPage();
