(() => {
  "use strict";

  const grid = document.getElementById("results-grid");
  const statusEl = document.getElementById("results-status");

  if (!grid) return;

  const GLOBAL_RESULTS = [
    {
      round: "Cycling · Tour de France Femmes",
      status: "LIVE",
      homeName: "Stage 7",
      awayName: "Mont Ventoux",
      homeGoals: "7 Aug",
      awayGoals: "Queen stage",
      venue: "La Voulte-sur-Rhône → Mont Ventoux",
      date: "GC battle: Reusser vs Vollering",
      href: "news.html"
    },
    {
      round: "Tennis · ATP/WTA 1000",
      status: "LIVE",
      homeName: "National Bank Open",
      awayName: "Canada",
      homeGoals: "ATP",
      awayGoals: "WTA",
      venue: "Montreal / Toronto",
      date: "3–9 Aug",
      href: "match.html?id=canada-tennis"
    },
    {
      round: "Golf · PGA Tour",
      status: "ROUND 2",
      homeName: "Wyndham Championship",
      awayName: "Friday play",
      homeGoals: "6 Aug",
      awayGoals: "9 Aug",
      venue: "Sedgefield Country Club, Greensboro",
      date: "Cut-line watch",
      href: "match.html?id=wyndham-championship"
    },
    {
      round: "Gymnastics",
      status: "IN PROGRESS",
      homeName: "U.S. Championships",
      awayName: "Championship weekend",
      homeGoals: "6 Aug",
      awayGoals: "9 Aug",
      venue: "United States",
      date: "All-around & event signals",
      href: "news.html"
    },
    {
      round: "Football · Transfer Window",
      status: "DEVELOPING",
      homeName: "Premier League",
      awayName: "Squad moves",
      homeGoals: "7 Aug",
      awayGoals: "Live",
      venue: "Summer transfer market",
      date: "Confirmed deals & rumours",
      href: "news.html"
    },
    {
      round: "Aquatics · European Championships",
      status: "LIVE",
      homeName: "European Aquatics",
      awayName: "Paris 2026",
      homeGoals: "31 Jul",
      awayGoals: "16 Aug",
      venue: "Paris",
      date: "Medal programme",
      href: "news.html"
    },
    {
      round: "Snooker · China Open",
      status: "NEXT",
      homeName: "China Open",
      awayName: "World Snooker Tour",
      homeGoals: "8 Aug",
      awayGoals: "16 Aug",
      venue: "China",
      date: "Starts Saturday",
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
      date: "Current research radar",
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

    setStatus("World sports results & live-event radar · 7 Aug 2026");
  }

  function updateHeroCopy() {
    const badge = document.querySelector(".results-hero .hero-ai-badge");
    const title = document.querySelector(".results-hero h1");
    const text = document.querySelector(".results-hero p");
    const panelTitle = document.querySelector(".results-panel .panel-head h2, .results-panel h2");

    document.title = "World Sports Results | Betforecast.ai";

    if (badge) badge.textContent = "World sports results";
    if (title) title.textContent = "Today’s world sports radar.";
    if (text) text.textContent = "Follow today’s cycling, tennis, golf, gymnastics, aquatics and football transfer windows, plus the next major events on the calendar.";
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
