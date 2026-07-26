(() => {
  "use strict";

  const grid = document.getElementById("results-grid");
  const statusEl = document.getElementById("results-status");

  if (!grid) return;

  const GLOBAL_RESULTS = [
    {
      round: "Cycling · Tour de France",
      status: "FINAL",
      homeName: "Tadej Pogacar",
      awayName: "Tour de France 2026",
      homeGoals: "5th",
      awayGoals: "Title",
      venue: "Paris final stage",
      date: "26 Jul · GC result",
      href: "news.html"
    },
    {
      round: "Multi-sport · Glasgow 2026",
      status: "LIVE",
      homeName: "Commonwealth Games",
      awayName: "Medal board",
      homeGoals: "23 Jul",
      awayGoals: "2 Aug",
      venue: "Glasgow, Scotland",
      date: "Daily results",
      href: "news.html"
    },
    {
      round: "Formula 1",
      status: "RACE DAY",
      homeName: "Hungarian Grand Prix",
      awayName: "Round 11",
      homeGoals: "F1",
      awayGoals: "Live",
      venue: "Hungaroring",
      date: "26 Jul",
      href: "match.html"
    },
    {
      round: "Tennis · ATP/WTA 500",
      status: "UPCOMING",
      homeName: "Mubadala DC Open",
      awayName: "Hard-court swing",
      homeGoals: "27 Jul",
      awayGoals: "2 Aug",
      venue: "Washington, D.C.",
      date: "Main draw",
      href: "match.html"
    },
    {
      round: "Football · Premier League",
      status: "WATCH",
      homeName: "Newcastle United",
      awayName: "Liverpool",
      homeGoals: "23 Aug",
      awayGoals: "Opener",
      venue: "Newcastle home opener",
      date: "Transfer context",
      href: "match.html"
    },
    {
      round: "Football Transfers",
      status: "DEVELOPING",
      homeName: "Bruno Guimaraes",
      awayName: "Arsenal interest",
      homeGoals: "Squad",
      awayGoals: "Signal",
      venue: "Premier League market",
      date: "26 Jul",
      href: "news.html"
    },
    {
      round: "Golf",
      status: "NEXT",
      homeName: "Women's Open",
      awayName: "Major week",
      homeGoals: "30 Jul",
      awayGoals: "2 Aug",
      venue: "Lancashire",
      date: "Late-July window",
      href: "news.html"
    },
    {
      round: "AI Sports",
      status: "RESEARCH",
      homeName: "SoccerNet 2026",
      awayName: "Challenge results",
      homeGoals: "AI",
      awayGoals: "Data",
      venue: "Football video understanding",
      date: "July update",
      href: "ai-insights.html"
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

    setStatus("World sports results & live-event radar · 26 Jul");
  }

  function updateHeroCopy() {
    const badge = document.querySelector(".results-hero .hero-ai-badge");
    const title = document.querySelector(".results-hero h1");
    const text = document.querySelector(".results-hero p");
    const panelTitle = document.querySelector(".results-panel .panel-head h2, .results-panel h2");

    document.title = "World Sports Results | Betforecast.ai";

    if (badge) badge.textContent = "World sports results";
    if (title) title.textContent = "Latest world sports results.";
    if (text) text.textContent = "Follow cycling results, F1 race-day status, tennis draws, medal events, football transfer signals and upcoming global sports windows.";
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
