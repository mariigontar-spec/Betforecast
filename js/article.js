async function loadArticlePage() {
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
    document.getElementById("article-time").innerText = article.time;
    document.getElementById("article-readtime").innerText = article.readTime;

    const articleImage = document.getElementById("article-image");
    articleImage.src = article.image;
    articleImage.alt = article.title;

    const articleContent = document.getElementById("article-content");
    articleContent.innerHTML = "";

    article.content.forEach((paragraph, index) => {
      const p = document.createElement("p");
      p.innerText = paragraph;
      articleContent.appendChild(p);

      // optional pull quote after second paragraph
      if (index === 1) {
        const quote = document.createElement("blockquote");
        quote.className = "article-pro-quote";
        quote.innerText = "Small tactical changes can quietly reshape probability, tempo, and the entire match script.";
        articleContent.appendChild(quote);
      }
    });

    const insightText = document.getElementById("article-insight-text");
    insightText.innerText = buildInsight(article);

    const relatedNewsList = document.getElementById("related-news-list");
    relatedNewsList.innerHTML = "";

    newsItems
      .filter((item) => item.id !== article.id)
      .slice(0, 4)
      .forEach((item) => {
        const a = document.createElement("a");
        a.className = "related-news-item";
        a.href = `article.html?id=${item.id}`;
        a.innerHTML = `
          <strong>${item.title}</strong>
          <span>${item.category} • ${item.readTime}</span>
        `;
        relatedNewsList.appendChild(a);
      });

  } catch (error) {
    console.error("Failed to load article page:", error);
  }
}

function buildInsight(article) {
  const category = article.category.toLowerCase();

  if (category.includes("transfer")) {
    return "Transfer stories matter because player profiles can shift team goal expectation, finishing quality, and game-state control before markets fully adjust.";
  }

  if (category.includes("premier league") || category.includes("la liga") || category.includes("serie a")) {
    return "League-specific team news changes forecast stability by affecting structure, pressing intensity, and expected chance creation across the full ninety minutes.";
  }

  if (category.includes("champions")) {
    return "In elite knockout football, emotional control after the first goal often matters as much as pre-match quality differences.";
  }

  return "This story matters because context changes models. Availability, tactical shape, and momentum often move the forecast more than headlines suggest.";
}

loadArticlePage();
