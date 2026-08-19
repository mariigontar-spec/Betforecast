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
      awayName: "Quarterfinals",
      homeGoals: "20 Aug",
      awayGoals: "QF",
      venue: "Mason, Ohio",
      date: "Day and night sessions",
      href: "match.html?id=cincinnati-qf"
    },
    {
      round: "Football · Premier League",
      status: "TOMORROW",
      homeName: "Arsenal",
      awayName: "Coventry City",
      homeGoals: "21 Aug",
      awayGoals: "20:00",
      venue: "Emirates Stadium",
      date: "2026/27 season opener",
      href: "match.html?id=premier-league-opener"
    },
    {
      round: "Formula 1 · Dutch GP",
      status: "STARTS 21 AUG",
      homeName: "Dutch Grand Prix",
      awayName: "Sprint weekend",
      homeGoals: "21 Aug",
      awayGoals: "23 Aug",
      venue: "Zandvoort",
      date: "Round 12",
      href: "match.html?id=dutch-gp"
    },
    {
      round: "Formula 1 · Driver Update",
      status: "CONFIRMED",
      homeName: "Isack Hadjar",
      awayName: "Liam Lawson",
      homeGoals: "OUT",
      awayGoals: "IN",
      venue: "Red Bull · Dutch GP",
      date: "Wrist injury replacement",
      href: "match.html?id=hadjar-lawson"
    },
    {
      round: "Tennis · Cincinnati",
      status: "RESULT",
      homeName: "Brandon Nakashima",
      awayName: "Daniil Medvedev",
      homeGoals: "6-7 7-6 6-1",
      awayGoals: "OUT",
      venue: "Cincinnati Open",
      date: "Nakashima saved three match points",
      href: "news.html"
    },
    {
      round: "Football · Community Shield",
      status: "FINAL",
      homeName: "Arsenal",
      awayName: "Manchester City",
      homeGoals: "3",
      awayGoals: "0",
      venue: "Wembley",
      date: "Arsenal enter league opener with a trophy",
      href: "news.html"
    },
    {
      round: "Golf · LIV",
      status: "SCHEDULE CHANGE",
      homeName: "LIV Golf",
      awayName: "Michigan event",
      homeGoals: "Season",
      awayGoals: "Cancelled",
      venue: "2026 calendar",
      date: "Season now ends in Indianapolis",
      href: "news.html"
    },
    {
      round: "Football · Opening Weekend",
      status: "WATCH",
      homeName: "Premier League",
      awayName: "Matchweek 1",
      homeGoals: "21 Aug",
      awayGoals: "24 Aug",
      venue: "England",
      date: "Champions, promoted clubs and new managers in focus",
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

    setStatus("World sports results & live-event radar · 20 Aug 2026");
  }

  function updateHeroCopy() {
    const badge = document.querySelector(".results-hero .hero-ai-badge");
    const title = document.querySelector(".results-hero h1");
    const text = document.querySelector(".results-hero p");
    const panelTitle = document.querySelector(".results-panel .panel-head h2, .results-panel h2");

    document.title = "World Sports Results | Betforecast.ai";

    if (badge) badge.textContent = "World sports results";
    if (title) title.textContent = "Today’s world sports radar.";
    if (text) text.textContent = "Follow Cincinnati quarterfinal tennis, Premier League opening-night build-up, the Dutch Grand Prix sprint weekend and the latest confirmed sports changes.";
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
