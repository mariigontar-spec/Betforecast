async function loadHomePage() {
  const predictionsContainer = document.getElementById("predictions-container");
  const matchesContainer = document.getElementById("matches-container");
  const resultsContainer = document.getElementById("results-container");
  const homepageNewsList = document.getElementById("homepage-news-list");

  let matches = [];
  let newsItems = [];

  try {
    const matchesResponse = await fetch("data/matches.json");
    if (!matchesResponse.ok) {
      throw new Error(`matches.json failed: ${matchesResponse.status}`);
    }
    matches = await matchesResponse.json();
  } catch (error) {
    console.error("Failed to load matches:", error);
  }

  try {
    const newsResponse = await fetch("data/news.json");
    if (!newsResponse.ok) {
      throw new Error(`news.json failed: ${newsResponse.status}`);
    }
    newsItems = await newsResponse.json();
  } catch (error) {
    console.error("Failed to load news:", error);
  }

  if (predictionsContainer && matches.length) {
    predictionsContainer.innerHTML = "";

   matches
  .filter(item => item.status === "upcoming")
  .forEach((item) => {
      const card = document.createElement("a");
      card.className = "prediction-card";
      card.href = `match.html?game=${item.id}`;

      card.innerHTML = `
        <div class="prediction-card-cover"></div>
        <div class="prediction-card-body">
          <div class="league">${item.league}</div>
          <h3>${item.home} <span style="color: rgba(255,255,255,0.45);">vs</span> ${item.away}</h3>

          <div class="percent-row">
            <div class="percent-box">
              <strong style="color:#6df0b3;">${item.homePct}%</strong>
              <span>Home</span>
            </div>
            <div class="percent-box">
              <strong>${item.drawPct}%</strong>
              <span>Draw</span>
            </div>
            <div class="percent-box">
              <strong style="color:#4fc3ff;">${item.awayPct}%</strong>
              <span>Away</span>
            </div>
          </div>

          <div class="card-bottom">
            <span class="tip-badge">${item.tip}</span>
            <span class="pred-score">${item.projectedScore}</span>
          </div>
        </div>
      `;

      predictionsContainer.appendChild(card);
    });
  }

  if (resultsContainer && matches.length) {
    resultsContainer.innerHTML = "";

    matches.forEach((item) => {
      const row = document.createElement("a");
      row.className = "result-row";
      row.href = `match.html?game=${item.id}`;

      row.innerHTML = `
        <div class="cell-match">
          ${item.home} vs ${item.away}<br>
          <span style="font-size:12px;color:rgba(255,255,255,0.55);">${item.league}</span>
        </div>
        <div class="cell-ft">${item.projectedScore}</div>
        <div>
          <span class="tip-badge">${item.tip}</span>
        </div>
        <div class="cell-odds">${item.odds}</div>
      `;

      resultsContainer.appendChild(row);
    });
  }

  if (homepageNewsList && newsItems.length) {
    homepageNewsList.innerHTML = "";

    newsItems.slice(0, 4).forEach((item) => {
      const card = document.createElement("a");
      card.className = "homepage-news-card";
      card.href = `article.html?id=${item.id}`;

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="homepage-news-card-body">
          <div class="news-category">${item.category}</div>
          <h3>${item.title}</h3>
          <p class="news-excerpt">${item.excerpt}</p>
          <div class="news-meta">${item.time} • ${item.readTime}</div>
        </div>
      `;

      homepageNewsList.appendChild(card);
    });
  }
}

loadHomePage();
