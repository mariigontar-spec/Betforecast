(() => {
  "use strict";

  const grid = document.getElementById("results-grid");
  const statusEl = document.getElementById("results-status");
  if (!grid) return;

  const GLOBAL_RESULTS = [
    {
      round: "Football · Premier League",
      status: "FINAL",
      homeName: "Arsenal",
      awayName: "Coventry City",
      homeGoals: "3",
      awayGoals: "0",
      venue: "Emirates Stadium",
      date: "21 Aug · Arsenal opened title defence with a win",
      href: "news.html"
    },
    {
      round: "Formula 1 · Dutch GP",
      status: "SPRINT GRID",
      homeName: "George Russell",
      awayName: "Lando Norris",
      homeGoals: "P1",
      awayGoals: "P2",
      venue: "Circuit Zandvoort",
      date: "Russell took sprint pole by 0.041s",
      href: "match.html?id=dutch-gp-saturday"
    },
    {
      round: "Tennis · Cincinnati",
      status: "SEMIFINAL",
      homeName: "Jessica Pegula",
      awayName: "Iga Swiatek",
      homeGoals: "22 Aug",
      awayGoals: "SF",
      venue: "Cincinnati Open",
      date: "Women's semifinal",
      href: "match.html?id=cincinnati-semifinals"
    },
    {
      round: "Tennis · Cincinnati",
      status: "SEMIFINAL",
      homeName: "Flavio Cobolli",
      awayName: "Arthur Fils",
      homeGoals: "22 Aug",
      awayGoals: "SF",
      venue: "Cincinnati Open",
      date: "Men's semifinal",
      href: "match.html?id=cincinnati-semifinals"
    },
    {
      round: "Football · Premier League",
      status: "TODAY",
      homeName: "Hull City",
      awayName: "Manchester United",
      homeGoals: "12:30",
      awayGoals: "UK",
      venue: "MKM Stadium",
      date: "22 Aug · Matchweek 1",
      href: "match.html?id=hull-man-utd"
    },
    {
      round: "Football · Premier League",
      status: "TODAY",
      homeName: "Everton",
      awayName: "Crystal Palace",
      homeGoals: "15:00",
      awayGoals: "UK",
      venue: "Liverpool",
      date: "22 Aug · Matchweek 1",
      href: "match.html?id=everton-palace"
    },
    {
      round: "Football · Premier League",
      status: "TODAY",
      homeName: "Nottingham Forest",
      awayName: "Leeds United",
      homeGoals: "15:00",
      awayGoals: "UK",
      venue: "City Ground",
      date: "22 Aug · Matchweek 1",
      href: "match.html?id=forest-leeds"
    },
    {
      round: "Football · Premier League",
      status: "TODAY",
      homeName: "Brentford",
      awayName: "Tottenham Hotspur",
      homeGoals: "17:30",
      awayGoals: "UK",
      venue: "Gtech Community Stadium",
      date: "22 Aug · Matchweek 1",
      href: "match.html?id=brentford-spurs"
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
    setStatus("World sports results & live-event radar · 22 Aug 2026");
  }

  function updateHeroCopy() {
    const badge = document.querySelector(".results-hero .hero-ai-badge");
    const title = document.querySelector(".results-hero h1");
    const text = document.querySelector(".results-hero p");
    const panelTitle = document.querySelector(".results-panel .panel-head h2, .results-panel h2");
    document.title = "World Sports Results | Betforecast.ai";
    if (badge) badge.textContent = "World sports results";
    if (title) title.textContent = "Today’s world sports radar.";
    if (text) text.textContent = "Arsenal's 3-0 opener is in the books. Saturday now brings five Premier League fixtures, the Dutch GP sprint and qualifying, plus Cincinnati semifinals.";
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
