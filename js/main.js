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

    if (!listMatches.length) {
      matchesContainer.innerHTML = `
        <div style="padding:20px; border-radius:16px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.75);">
          No live or upcoming matches right now.
        </div>
      `;
    }
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
  initAiMatchSearch(matches);
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

function initAiMatchSearch(matches = []) {
  const form = document.getElementById("ai-match-form");
  const input = document.getElementById("ai-match-input");
  const result = document.getElementById("ai-search-result");

  if (!form || !input || !result) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const query = input.value.trim();
    if (!query) return;

    result.innerHTML = `
      <div class="ai-search-result__empty">
        Analyzing match context and generating probabilities...
      </div>
    `;

    try {
      const found =
        matches.find((item) => {
          const text = `${item.home || ""} vs ${item.away || ""}`.toLowerCase();
          return text.includes(query.toLowerCase());
        }) || null;

      let home = "Home";
      let away = "Away";
      let homePct = 45;
      let drawPct = 28;
      let awayPct = 27;
      let summary =
        "AI sees a balanced match with moderate volatility, where form, squad news and match tempo will heavily influence the final result.";

      if (found) {
        home = found.home || "Home";
        away = found.away || "Away";
        homePct = found.homePct ?? 45;
        drawPct = found.drawPct ?? 28;
        awayPct = found.awayPct ?? 27;

        summary =
          found.summary ||
          `${home} show slightly stronger structural indicators, while ${away} remain dangerous in transitions. The draw probability stays relevant if the match opens cautiously.`;
      } else {
        const parts = query.split("vs");
        if (parts.length === 2) {
          home = parts[0].trim() || "Home";
          away = parts[1].trim() || "Away";
        } else {
          home = query;
          away = "Opponent";
        }
      }

      result.innerHTML = `
        <div class="ai-prob-card">
          <div class="ai-prob-card__match">${home} vs ${away}</div>

          <div class="ai-prob-grid">
            <div class="ai-prob-tile ai-prob-tile--home">
              <strong>${homePct}%</strong>
              <span>${home} Win</span>
            </div>
            <div class="ai-prob-tile">
              <strong>${drawPct}%</strong>
              <span>Draw</span>
            </div>
            <div class="ai-prob-tile ai-prob-tile--away">
              <strong>${awayPct}%</strong>
              <span>${away} Win</span>
            </div>
          </div>

          <div class="ai-prob-bar" aria-hidden="true">
            <div class="ai-prob-bar__home" style="width:${homePct}%"></div>
            <div class="ai-prob-bar__draw" style="width:${drawPct}%"></div>
            <div class="ai-prob-bar__away" style="width:${awayPct}%"></div>
          </div>

          <div class="ai-prob-summary">${summary}</div>
        </div>
      `;
    } catch (error) {
      console.error("AI match search failed:", error);
      result.innerHTML = `
        <div class="ai-search-result__empty">
          Could not analyze the match right now.
        </div>
      `;
    }
    
  });
  document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.metric-value[data-target]');

  counters.forEach(counter => {
    const target = Number(counter.dataset.target);
    const duration = 1200;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(update);
  });
});
}

loadHomePage();
