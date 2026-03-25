async function loadNewsArticle() {
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id");

  try {
    const response = await fetch("data/news.json");
    const newsItems = await response.json();

    const article = newsItems.find((item) => item.id === articleId) || newsItems[0];

    document.title = `${article.title} | BetForecast.ai`;
    document.getElementById("article-category").innerText = article.category;
    document.getElementById("article-title").innerText = article.title;
    document.getElementById("article-excerpt").innerText = article.excerpt;
    document.getElementById("article-meta").innerText = `${article.time} • ${article.readTime}`;

    const articleImage = document.getElementById("article-image");
    articleImage.src = article.image;
    articleImage.alt = article.title;

    const articleContent = document.getElementById("article-content");
    articleContent.innerHTML = "";

    article.content.forEach((paragraph) => {
      const p = document.createElement("p");
      p.innerText = paragraph;
      articleContent.appendChild(p);
    });

    const relatedNewsList = document.getElementById("related-news-list");
    relatedNewsList.innerHTML = "";

    newsItems
      .filter((item) => item.id !== article.id)
      .slice(0, 4)
      .forEach((item) => {
        const a = document.createElement("a");
        a.className = "related-news-item";
        a.href = `news-article.html?id=${item.id}`;
        a.innerHTML = `
          <strong>${item.title}</strong>
          <span>${item.category}</span>
        `;
        relatedNewsList.appendChild(a);
      });

  } catch (error) {
    console.error("Failed to load article page:", error);
  }
}

loadNewsArticle();
