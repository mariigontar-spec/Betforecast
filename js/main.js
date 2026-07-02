async function loadHomePage() {
  const predictionsContainer = document.getElementById("predictions-container");
  const matchesContainer = document.getElementById("matches-container");
  const resultsContainer = document.getElementById("results-container");
  const homepageNewsList = document.getElementById("homepage-news-list");

  let matches = [];
  let newsItems = [];
  let worldCupCache = null;

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

  try {
    const worldCupResponse = await fetch(`/data/wc-2026.json?v=${Date.now()}`, {
      cache: "no-store"
    });

    if (!worldCupResponse.ok) {
      throw new Error(`wc-2026.json failed: ${worldCupResponse.status}`);
    }

    worldCupCache = await worldCupResponse.json();
  } catch (error) {
    console.error("Failed to load World Cup cache:", error);
  }

  renderHomeWorldCupSchedule(worldCupCache);

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

function renderHomeWorldCupSchedule(cache) {
  injectHomeWorldCupScheduleStyles();

  const page = document.querySelector(".bf-page");
  const afterHero = document.querySelector(".bf-hero");

  if (!page || !afterHero || document.getElementById("home-world-cup-schedule")) {
    return;
  }

  const section = document.createElement("section");
  section.id = "home-world-cup-schedule";
  section.className = "bf-home-wc-schedule";

  afterHero.insertAdjacentElement("afterend", section);

  if (!cache || !Array.isArray(cache.fixtures)) {
    section.innerHTML = `
      <div class="home-wc-head">
        <div>
          <span class="home-wc-kicker">World Cup 2026</span>
          <h2>Upcoming Matches</h2>
        </div>
        <a href="world-cup-2026.html">Full schedule</a>
      </div>
      <div class="home-wc-empty">
        Schedule cache is not ready yet. Run the Update World Cup cache workflow.
      </div>
    `;
    return;
  }

  const matches = selectUpcomingWorldCupMatches(cache.fixtures).slice(0, 6);
  const updated = formatHomeCacheDate(cache.updatedAt);

  section.innerHTML = `
    <div class="home-wc-head">
      <div>
        <span class="home-wc-kicker">World Cup 2026</span>
        <h2>Upcoming Matches</h2>
        <p>${escapeHomeHtml(updated)}</p>
      </div>
      <a href="world-cup-2026.html">Full schedule</a>
    </div>

    <div class="home-wc-table" aria-label="Upcoming World Cup matches">
      <div class="home-wc-row home-wc-row-head">
        <span>Date</span>
        <span>Match</span>
        <span>Round</span>
        <span>Status</span>
      </div>

      ${matches.length ? matches.map(renderHomeWorldCupRow).join("") : `
        <div class="home-wc-empty">
          No upcoming World Cup matches are available in cache right now.
        </div>
      `}
    </div>
  `;
}

function selectUpcomingWorldCupMatches(fixtures = []) {
  const finishedStatuses = new Set(["FT", "AET", "PEN"]);
  const liveStatuses = new Set(["1H", "2H", "HT", "ET", "BT", "P", "LIVE", "INT"]);
  const now = Date.now();

  const live = fixtures
    .filter((item) => liveStatuses.has(String(item?.fixture?.status?.short || "").toUpperCase()))
    .sort((a, b) => (a.fixture?.timestamp || 0) - (b.fixture?.timestamp || 0));

  const upcoming = fixtures
    .filter((item) => {
      const date = item?.fixture?.date;
      const status = String(item?.fixture?.status?.short || "").toUpperCase();
      return date && new Date(date).getTime() >= now && !finishedStatuses.has(status) && !liveStatuses.has(status);
    })
    .sort((a, b) => (a.fixture?.timestamp || 0) - (b.fixture?.timestamp || 0));

  const selected = [...live, ...upcoming];

  if (selected.length) {
    return selected;
  }

  return fixtures
    .slice()
    .sort((a, b) => (b.fixture?.timestamp || 0) - (a.fixture?.timestamp || 0));
}

function renderHomeWorldCupRow(item) {
  const fixture = item.fixture || {};
  const league = item.league || {};
  const teams = item.teams || {};
  const home = teams.home || {};
  const away = teams.away || {};
  const status = fixture.status || {};
  const statusShort = String(status.short || "NS").toUpperCase();
  const isLive = ["1H", "2H", "HT", "ET", "BT", "P", "LIVE", "INT"].includes(statusShort);
  const statusLabel = isLive ? `LIVE ${status.elapsed ? `${status.elapsed}'` : ""}`.trim() : status.short === "NS" ? "Scheduled" : status.short || "Scheduled";
  const dateParts = formatHomeMatchDateParts(fixture.date);
  const href = fixture.id ? `match.html?id=${encodeURIComponent(fixture.id)}` : "match.html";

  return `
    <a class="home-wc-row home-wc-match-row glow-hover" href="${escapeHomeHtml(href)}">
      <span class="home-wc-date">
        <strong>${escapeHomeHtml(dateParts.date)}</strong>
        <em>${escapeHomeHtml(dateParts.time)}</em>
      </span>

      <span class="home-wc-teams">
        <span class="home-wc-team">
          ${renderHomeLogo(home.logo, home.name)}
          <b>${escapeHomeHtml(home.name || "Home")}</b>
        </span>
        <small>vs</small>
        <span class="home-wc-team home-wc-team-away">
          ${renderHomeLogo(away.logo, away.name)}
          <b>${escapeHomeHtml(away.name || "Away")}</b>
        </span>
      </span>

      <span class="home-wc-round">${escapeHomeHtml(league.round || "World Cup")}</span>
      <span class="home-wc-status ${isLive ? "is-live" : ""}">${escapeHomeHtml(statusLabel)}</span>
    </a>
  `;
}

function renderHomeLogo(src = "", name = "Team") {
  if (!src) {
    return `<span class="home-wc-logo-placeholder" aria-hidden="true"></span>`;
  }

  return `<img src="${escapeHomeHtml(src)}" alt="${escapeHomeHtml(name)} logo" loading="lazy">`;
}

function formatHomeMatchDateParts(value) {
  if (!value) {
    return {
      date: "TBA",
      time: "Time TBA"
    };
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return {
      date: "TBA",
      time: "Time TBA"
    };
  }

  return {
    date: new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short"
    }).format(date),
    time: new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(date)
  };
}

function formatHomeCacheDate(value) {
  if (!value) return "Cache updates every 6 hours";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Cache updates every 6 hours";
  }

  return `Updated ${new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date)} • cache every 6 hours`;
}

function injectHomeWorldCupScheduleStyles() {
  if (document.getElementById("home-world-cup-schedule-style")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "home-world-cup-schedule-style";
  style.textContent = `
    .bf-home-wc-schedule {
      position: relative;
      z-index: 20;
      width: 100%;
      margin: 24px auto 0;
      padding: 22px;
      border-radius: 24px;
      background: linear-gradient(180deg, rgba(18, 38, 55, 0.97), rgba(8, 20, 32, 0.98));
      border: 1px solid rgba(94, 224, 164, 0.18);
      box-shadow: 0 18px 50px rgba(0, 0, 0, 0.28);
      overflow: hidden;
    }

    .bf-home-wc-schedule::before {
      content: "";
      position: absolute;
      inset: -120px auto auto -120px;
      width: 260px;
      height: 260px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(94, 224, 164, 0.14), transparent 68%);
      pointer-events: none;
    }

    .home-wc-head {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 18px;
    }

    .home-wc-kicker {
      display: inline-flex;
      width: fit-content;
      margin-bottom: 8px;
      padding: 7px 10px;
      border-radius: 999px;
      color: #5ee0a4;
      background: rgba(94, 224, 164, 0.10);
      border: 1px solid rgba(94, 224, 164, 0.18);
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .home-wc-head h2 {
      margin: 0;
      color: #f8fafc;
      font-size: 28px;
      line-height: 1.08;
      font-weight: 950;
      letter-spacing: -0.035em;
    }

    .home-wc-head p {
      margin: 8px 0 0;
      color: rgba(226, 232, 240, 0.66);
      font-size: 13px;
      line-height: 1.35;
    }

    .home-wc-head a {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 40px;
      padding: 0 15px;
      border-radius: 999px;
      color: #f8fafc;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(94, 224, 164, 0.18);
      text-decoration: none;
      font-size: 13px;
      font-weight: 900;
    }

    .home-wc-table {
      position: relative;
      z-index: 1;
      display: grid;
      gap: 10px;
    }

    .home-wc-row {
      display: grid;
      grid-template-columns: 128px minmax(0, 1.7fr) minmax(150px, 0.8fr) 118px;
      align-items: center;
      gap: 14px;
      width: 100%;
      min-width: 0;
    }

    .home-wc-row-head {
      padding: 0 16px 2px;
      color: rgba(226, 232, 240, 0.58);
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .home-wc-match-row {
      min-height: 76px;
      padding: 14px 16px;
      border-radius: 18px;
      color: #f8fafc;
      background: radial-gradient(circle at 0 0, rgba(94, 224, 164, 0.10), transparent 34%), rgba(255, 255, 255, 0.045);
      border: 1px solid rgba(94, 224, 164, 0.14);
      text-decoration: none;
      transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
    }

    .home-wc-match-row:hover {
      transform: translateY(-2px);
      border-color: rgba(94, 224, 164, 0.34);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.28), 0 0 24px rgba(94, 224, 164, 0.08);
    }

    .home-wc-date strong,
    .home-wc-date em {
      display: block;
      font-style: normal;
      white-space: nowrap;
    }

    .home-wc-date strong {
      font-size: 15px;
      font-weight: 950;
      color: #f8fafc;
    }

    .home-wc-date em {
      margin-top: 3px;
      color: rgba(226, 232, 240, 0.64);
      font-size: 12px;
      font-weight: 800;
    }

    .home-wc-teams {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 28px minmax(0, 1fr);
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .home-wc-team {
      display: flex;
      align-items: center;
      gap: 9px;
      min-width: 0;
    }

    .home-wc-team-away {
      justify-content: flex-start;
    }

    .home-wc-team img,
    .home-wc-logo-placeholder {
      width: 30px;
      height: 30px;
      flex: 0 0 30px;
      border-radius: 50%;
      object-fit: contain;
      padding: 4px;
      background: rgba(255, 255, 255, 0.09);
    }

    .home-wc-logo-placeholder {
      display: inline-block;
    }

    .home-wc-team b {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      line-height: 1.15;
      font-weight: 950;
    }

    .home-wc-teams small {
      color: rgba(226, 232, 240, 0.54);
      font-size: 11px;
      font-weight: 900;
      text-align: center;
      text-transform: uppercase;
    }

    .home-wc-round {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgba(226, 232, 240, 0.76);
      font-size: 13px;
      font-weight: 800;
    }

    .home-wc-status {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 34px;
      padding: 0 11px;
      border-radius: 999px;
      color: #5ee0a4;
      background: rgba(94, 224, 164, 0.10);
      border: 1px solid rgba(94, 224, 164, 0.18);
      font-size: 12px;
      font-weight: 950;
      white-space: nowrap;
    }

    .home-wc-status.is-live {
      color: #f8fafc;
      background: rgba(239, 68, 68, 0.20);
      border-color: rgba(239, 68, 68, 0.30);
    }

    .home-wc-empty {
      padding: 18px;
      border-radius: 16px;
      color: rgba(226, 232, 240, 0.74);
      background: rgba(255, 255, 255, 0.045);
      border: 1px dashed rgba(94, 224, 164, 0.18);
      font-size: 14px;
      line-height: 1.45;
    }

    @media (max-width: 768px) {
      .bf-home-wc-schedule {
        margin: 16px 0 0 !important;
        padding: 18px 12px !important;
        border-radius: 20px !important;
      }

      .home-wc-head {
        flex-direction: column;
        gap: 12px;
      }

      .home-wc-head h2 {
        font-size: 24px;
      }

      .home-wc-head a {
        width: 100%;
      }

      .home-wc-row-head {
        display: none;
      }

      .home-wc-row,
      .home-wc-match-row {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .home-wc-match-row {
        padding: 14px 12px;
      }

      .home-wc-date {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }

      .home-wc-teams {
        grid-template-columns: 1fr;
        gap: 8px;
      }

      .home-wc-teams small {
        display: none;
      }

      .home-wc-team b {
        white-space: normal;
      }

      .home-wc-round {
        white-space: normal;
      }

      .home-wc-status {
        width: fit-content;
      }
    }
  `;

  document.head.appendChild(style);
}

function escapeHomeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

  document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".metric-value[data-target]");

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

function initAdhitPopup() {
  const popupZoneId = 161907;

  window._aso = window._aso || {};
  window._aso.queue = window._aso.queue || [];

  window._aso.queue.push(function () {
    if (!window._ASO || typeof window._ASO.loadPuHelper !== "function") {
      return;
    }

    window._ASO.PuOptions = {
      idzone: popupZoneId
    };

    window._ASO.loadPuHelper();
  });
}

initAdhitPopup();
loadHomePage();
