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

  if (predictionsContainer) {
    predictionsContainer.innerHTML = "";

    const predictionMatches = matches.filter(
      (item) => item.status === "live" || item.status === "upcoming"
    );

    predictionMatches.forEach((item) => {
      const card = document.createElement("a");
      card.className = "prediction-card glow-hover";
      card.href = `match.html?game=${item.id}`;

      const isLive = item.status === "live";

      const scoreText = isLive
        ? item.liveScore || item.projectedScore || item.predictedScore || "-"
        : item.projectedScore || item.predictedScore || "-";

      const liveBadge = isLive
        ? `<span class="live-badge">LIVE ${item.minute || ""}</span>`
        : `<span class="tip-badge">${item.tip || "Prediction"}</span>`;

      const homePct = item.homePct ?? "-";
      const drawPct = item.drawPct ?? "-";
      const awayPct = item.awayPct ?? "-";

      card.innerHTML = `
        <div class="prediction-card-cover"></div>
        <div class="prediction-card-body">
          <div class="league">${item.league || ""}</div>
          <h3>${item.home || ""} <span style="color: rgba(255,255,255,0.45);">vs</span> ${item.away || ""}</h3>

          <div class="percent-row">
            <div class="percent-box">
              <strong style="color:#6df0b3;">${homePct}${homePct !== "-" ? "%" : ""}</strong>
              <span>Home</span>
            </div>
            <div class="percent-box">
              <strong>${drawPct}${drawPct !== "-" ? "%" : ""}</strong>
              <span>Draw</span>
            </div>
            <div class="percent-box">
              <strong style="color:#4fc3ff;">${awayPct}${awayPct !== "-" ? "%" : ""}</strong>
              <span>Away</span>
            </div>
          </div>

          <div class="card-bottom">
            ${liveBadge}
            <span class="pred-score">${scoreText}</span>
          </div>
        </div>
      `;

      predictionsContainer.appendChild(card);
    });

    if (!predictionMatches.length) {
      predictionsContainer.innerHTML = `
        <div style="padding:20px; border-radius:16px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.75);">
          No live or upcoming matches right now.
        </div>
      `;
    }
  }

  if (matchesContainer) {
    matchesContainer.innerHTML = "";

    const listMatches = matches.filter(
      (item) => item.status === "live" || item.status === "upcoming"
    );

    listMatches.forEach((item) => {
      const row = document.createElement("a");
      row.className = "match-row glow-hover";
      row.href = `match.html?game=${item.id}`;

      const isLive = item.status === "live";
      const badgeHtml = isLive
        ? `<span class="live-badge">LIVE ${item.minute || ""}</span>`
        : `<span class="tip-badge">${item.tip || "Prediction"}</span>`;

      row.innerHTML = `
        <div class="cell-league">
          <span class="league-dot"></span>
          <span class="league-name">${item.league || ""}</span>
        </div>

        <div class="cell-match">
          <div class="teams">
            <span class="team-inline">
              <span class="team-dot home-dot"></span>
              <span class="team-name-short">${item.home || ""}</span>
            </span>
            <span class="vs-sep">vs</span>
            <span class="team-inline">
              <span class="team-dot away-dot"></span>
              <span class="team-name-short">${item.away || ""}</span>
            </span>
          </div>
          <div class="match-sub">${badgeHtml}</div>
        </div>

        <div class="cell-ft">${isLive ? (item.liveScore || "-") : (item.projectedScore || item.predictedScore || "-")}</div>
        <div class="cell-ht">${item.time || item.minute || "-"}</div>
        <div class="cell-xg">${item.xg || "-"}</div>
        <div class="cell-odds">${item.odds || "-"}</div>
      `;

      matchesContainer.appendChild(row);
    });
  }

  if (resultsContainer) {
    resultsContainer.innerHTML = "";

    const finishedMatches = matches.filter((item) => item.status === "finished");

    finishedMatches.forEach((item) => {
      const row = document.createElement("a");
      row.className = "result-row glow-hover";
      row.href = `match.html?game=${item.id}`;

      row.innerHTML = `
        <div class="cell-match">
          <div class="cell-league" style="margin-bottom:6px;">
            <span class="league-dot"></span>
            <span class="league-name">${item.league || ""}</span>
          </div>

          <div class="teams">
            <span class="team-inline">
              <span class="team-dot home-dot"></span>
              <span class="team-name-short">${item.home || ""}</span>
            </span>
            <span class="vs-sep">vs</span>
            <span class="team-inline">
              <span class="team-dot away-dot"></span>
              <span class="team-name-short">${item.away || ""}</span>
            </span>
          </div>
        </div>

        <div class="cell-ft">${item.finalScore || item.projectedScore || item.predictedScore || "-"}</div>
        <div>
          <span class="tip-badge">${item.tip || "Finished"}</span>
        </div>
        <div class="cell-odds">${item.odds || "-"}</div>
      `;

      resultsContainer.appendChild(row);
    });

    if (!finishedMatches.length) {
      resultsContainer.innerHTML = `
        <div style="padding:20px; border-radius:16px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.75);">
          No finished matches yet.
        </div>
      `;
    }
  }

  if (homepageNewsList) {
    homepageNewsList.innerHTML = "";

    newsItems.slice(0, 4).forEach((item) => {
      const card = document.createElement("a");
      card.className = "homepage-news-card glow-hover";
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

  initGlowHover();
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

loadHomePage();
