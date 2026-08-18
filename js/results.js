(() => {
  "use strict";

  const grid = document.getElementById("results-grid");
  const statusEl = document.getElementById("results-status");

  if (!grid) return;

  const GLOBAL_RESULTS = [
    {
      round: "Tennis · ATP/WTA 1000",
      status: "TODAY",
      homeName: "Cincinnati Open",
      awayName: "Round of 16",
      homeGoals: "19 Aug",
      awayGoals: "R16",
      venue: "Mason, Ohio",
      date: "Day and night sessions",
      href: "match.html?id=cincinnati-r16"
    },
    {
      round: "Football · Premier League",
      status: "NEXT",
      homeName: "Arsenal",
      awayName: "Coventry City",
      homeGoals: "21 Aug",
      awayGoals: "Opener",
      venue: "Emirates Stadium",
      date: "2026/27 season opener",
      href: "match.html?id=premier-league-opener"
    },
    {
      round: "Formula 1",
      status: "UPCOMING",
      homeName: "Dutch Grand Prix",
      awayName: "Round 12",
      homeGoals: "21 Aug",
      awayGoals: "23 Aug",
      venue: "Zandvoort",
      date: "F1 returns after summer break",
      href: "match.html?id=dutch-gp"
    },
    {
      round: "Football · Confirmed Transfer",
      status: "DONE",
      homeName: "Rodri",
      awayName: "Barcelona",
      homeGoals: "Man City",
      awayGoals: "Barça",
      venue: "European transfer market",
      date: "Confirmed 18 Aug",
      href: "news.html"
    },
    {
      round: "Football · Confirmed Transfer",
      status: "DONE",
      homeName: "Amar Dedic",
      awayName: "Newcastle United",
      homeGoals: "Benfica",
      awayGoals: "NUFC",
      venue: "Premier League transfer market",
      date: "Five-year deal",
      href: "news.html"
    },
    {
      round: "Tennis · Cincinnati",
      status: "WITHDRAWN",
      homeName: "Elina Svitolina",
      awayName: "Ankle injury",
      homeGoals: "18 Aug",
      awayGoals: "OUT",
      venue: "Cincinnati Open",
      date: "US Open recovery focus",
      href: "news.html"
    },
    {
      round: "Tennis · US Open",
      status: "CONFIRMED",
      homeName: "Venus Williams",
      awayName: "Wildcard",
      homeGoals: "USO",
      awayGoals: "IN",
      venue: "New York",
      date: "Wildcard announced 18 Aug",
      href: "news.html"
    },
    {
      round: "Football · Transfer Window",
      status: "LIVE",
      homeName: "Premier League",
      awayName: "Squad moves",
      homeGoals: "19 Aug",
      awayGoals: "Live",
      venue: "Summer transfer market",
      date: "Final pre-season adjustments",
      href: "news.html"
    }
  ];

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function logoMarkup(label) {
    const text = String(label || "BF").trim().slice(0, 2).toUpperCase();
    return `<span class="wc-logo-placeholder" aria-hidden="true">${escapeHtml(text)}</span>`;
  }

  function teamLine(name, goals) {
    return `
      <div class="wc-team-line">
        ${logoMarkup(name)}
        <span>${escapeHtml(name)}</span>
        <b>${escapeHtml(goals ?? "-")}</b>
      </div>
    `;
  }

  function renderResults(items) {
    grid.className = "wc-results-grid";
    grid.innerHTML = items.map((item) => `
      <a class="wc-result-card" href="${escapeHtml(item.href || "news.html")}" aria-label="Open sports update: ${escapeHtml(item.homeName)}">
        <div class="wc-result-round">
          <span>${escapeHtml(item.round)}</span>
          <strong class="wc-status-pill">${escapeHtml(item.status)}</strong>
        </div>

        <div class="wc-score-stack">
          ${teamLine(item.homeName, item.homeGoals)}
          ${teamLine(item.awayName, item.awayGoals)}
        </div>

        <div class="wc-result-meta">
          <span>${escapeHtml(item.venue)}</span>
          <span>${escapeHtml(item.date)}</span>
        </div>
      </a>
    `).join("");

    setStatus("World sports results & live-event radar · 19 Aug 2026");
  }

  function updateHeroCopy() {
    const badge = document.querySelector(".results-hero .hero-ai-badge");
    const title = document.querySelector(".results-hero h1");
    const text = document.querySelector(".results-hero p");
    const panelTitle = document.querySelector(".results-panel .panel-head h2, .results-panel h2");

    document.title = "World Sports Results | Betforecast.ai";

    if (badge) badge.textContent = "World sports results";
    if (title) title.textContent = "Today’s world sports radar.";
    if (text) text.textContent = "Follow Cincinnati round-of-16 tennis, Premier League opening-weekend build-up, the Dutch Grand Prix, confirmed transfers and the latest injury news.";
    if (panelTitle) panelTitle.textContent = "Global Sports Result Board";
  }

  function run() {
    updateHeroCopy();
    renderResults(GLOBAL_RESULTS);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
