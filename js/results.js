(() => {
  "use strict";

  const grid = document.getElementById("results-grid");
  const statusEl = document.getElementById("results-status");

  if (!grid) return;

  const GLOBAL_RESULTS = [
    {
      round: "Football · Premier League",
      status: "TODAY",
      homeName: "Arsenal",
      awayName: "Coventry City",
      homeGoals: "21 Aug",
      awayGoals: "20:00 UK",
      venue: "Emirates Stadium",
      date: "2026/27 season opener",
      href: "match.html?id=premier-league-opener"
    },
    {
      round: "Formula 1 · Dutch GP",
      status: "TODAY",
      homeName: "Dutch Grand Prix",
      awayName: "Sprint qualifying",
      homeGoals: "FP1 12:30",
      awayGoals: "SQ 16:30",
      venue: "Circuit Zandvoort",
      date: "Round 12 · sprint weekend",
      href: "match.html?id=dutch-gp"
    },
    {
      round: "Tennis · ATP/WTA 1000",
      status: "TODAY",
      homeName: "Cincinnati Open",
      awayName: "Quarterfinals",
      homeGoals: "21 Aug",
      awayGoals: "QF",
      venue: "Mason, Ohio",
      date: "Day and night sessions",
      href: "match.html?id=cincinnati-qf"
    },
    {
      round: "Tennis · Cincinnati",
      status: "FINAL",
      homeName: "Sara Bejlek",
      awayName: "Aryna Sabalenka",
      homeGoals: "7-6(7) 6-4",
      awayGoals: "OUT",
      venue: "Cincinnati Open",
      date: "Bejlek reached her first Cincinnati quarterfinal",
      href: "news.html"
    },
    {
      round: "Tennis · Cincinnati",
      status: "FINAL",
      homeName: "Tommy Paul",
      awayName: "Alexander Zverev",
      homeGoals: "4-6 7-6(6) 6-4",
      awayGoals: "OUT",
      venue: "Cincinnati Open",
      date: "Paul saved a match point and advanced to the quarterfinals",
      href: "news.html"
    },
    {
      round: "Football · Opening Weekend",
      status: "NEXT",
      homeName: "Premier League",
      awayName: "Matchweek 1",
      homeGoals: "22 Aug",
      awayGoals: "24 Aug",
      venue: "England",
      date: "Hull-Man Utd, Man City-Bournemouth, Newcastle-Liverpool and more",
      href: "match.html?id=premier-league-weekend"
    },
    {
      round: "Formula 1 · Dutch GP",
      status: "TOMORROW",
      homeName: "Sprint",
      awayName: "Grand Prix Qualifying",
      homeGoals: "12:00",
      awayGoals: "16:00",
      venue: "Zandvoort",
      date: "22 Aug · local time",
      href: "match.html?id=dutch-gp"
    },
    {
      round: "Tennis · Cincinnati",
      status: "TOMORROW",
      homeName: "Cincinnati Open",
      awayName: "Semifinals",
      homeGoals: "22 Aug",
      awayGoals: "SF",
      venue: "Mason, Ohio",
      date: "Final-four sessions",
      href: "match.html?id=cincinnati-qf"
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

    setStatus("World sports results & live-event radar · 21 Aug 2026");
  }

  function updateHeroCopy() {
    const badge = document.querySelector(".results-hero .hero-ai-badge");
    const title = document.querySelector(".results-hero h1");
    const text = document.querySelector(".results-hero p");
    const panelTitle = document.querySelector(".results-panel .panel-head h2, .results-panel h2");

    document.title = "World Sports Results | Betforecast.ai";

    if (badge) badge.textContent = "World sports results";
    if (title) title.textContent = "Today’s world sports radar.";
    if (text) text.textContent = "Follow the Premier League opener, Dutch Grand Prix sprint-weekend sessions, Cincinnati quarterfinal tennis and the latest confirmed results.";
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
