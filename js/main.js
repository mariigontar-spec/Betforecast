async function loadHomePage() {
  const predictionsContainer = document.getElementById("predictions-container");
  const matchesContainer = document.getElementById("matches-container");
  const resultsContainer = document.getElementById("results-container");
  const homepageNewsList = document.getElementById("homepage-news-list");

  try {
    const [matchesResponse, newsResponse] = await Promise.all([
      fetch("data/matches.json"),
      fetch("data/news.json")
    ]);

    const matches = await matchesResponse.json();
    const newsItems = await newsResponse.json();

    if (predictionsContainer) {
      predictionsContainer.innerHTML = "";

      matches.forEach((item) => {
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

    if (matchesContainer) {
      matchesContainer.innerHTML = "";

      matches.forEach((item) => {
        const row = document.createElement("a");
        row.className = "match-row";
        row.href = `match.html?game=${item.id}`;

        row.innerHTML = `
          <div class="cell-league">${item.league}</div>
          <div class="cell-match">
            ${item.home} vs ${item.away}<br>
            <span class="tip-badge">${item.tip}</span>
          </div>
          <div class="cell-ft">${item.projectedScore}</div>
          <div class="cell-ht">${item.time}</div>
          <div class="cell-xg">${item.xg}</div>
          <div class="cell-odds">${item.odds}</div>
        `;

        matchesContainer.appendChild(row);
      });
    }

    if (resultsContainer) {
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

    if (homepageNewsList) {
      homepageNewsList.innerHTML = "";

      newsItems.slice(0, 4).forEach((item) => {
        const card = document.createElement("a");
        card.className = "homepage-news-card";
        card.href = `news-article.html?id=${item.id}`;

        card.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <div class="homepage-news-card-body">
            <div class="news-category">${item.category}</div>
            <h3>${item.title}</h3>
            <div class="news-meta">${item.time} • ${item.readTime}</div>
          </div>
        `;

        homepageNewsList.appendChild(card);
      });
    }

  } catch (error) {
    console.error("Failed to load homepage data:", error);
  }
}

loadHomePage();
