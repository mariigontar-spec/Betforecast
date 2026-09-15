(() => {
  "use strict";
  const grid = document.getElementById("results-grid");
  const statusEl = document.getElementById("results-status");
  if (!grid) return;
  const GLOBAL_RESULTS = [
    { round: "Football · Carabao Cup", status: "FINAL", homeName: "Liverpool", awayName: "Tottenham Hotspur", homeGoals: "3", awayGoals: "1", venue: "Anfield", date: "15 Sep", href: "match.html?id=liverpool-tottenham-result-sep15" },
    { round: "Football · Carabao Cup", status: "FINAL", homeName: "Ipswich Town", awayName: "Arsenal", homeGoals: "2", awayGoals: "4", venue: "Portman Road", date: "15 Sep", href: "match.html?id=ipswich-arsenal-result-sep15" },
    { round: "Football · Carabao Cup", status: "FINAL", homeName: "West Ham United", awayName: "Fulham", homeGoals: "2", awayGoals: "3", venue: "London Stadium", date: "15 Sep", href: "results.html" },
    { round: "Football · Carabao Cup", status: "FINAL", homeName: "Reading", awayName: "Brentford", homeGoals: "1", awayGoals: "2", venue: "Reading", date: "15 Sep", href: "results.html" },
    { round: "Football · Carabao Cup", status: "PENS", homeName: "Peterborough United", awayName: "Barnsley", homeGoals: "3 (7)", awayGoals: "3 (6)", venue: "Peterborough", date: "15 Sep", href: "results.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Leeds United", awayName: "Newcastle United", homeGoals: "4", awayGoals: "1", venue: "Elland Road", date: "14 Sep", href: "standings.html" },
    { round: "Tennis · US Open Final", status: "CHAMPION", homeName: "Alexander Zverev", awayName: "Ben Shelton", homeGoals: "3", awayGoals: "1", venue: "6-3, 7-6(2), 5-7, 6-2", date: "13 Sep", href: "news.html#tennis" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Manchester United", awayName: "Manchester City", homeGoals: "0", awayGoals: "1", venue: "Old Trafford", date: "13 Sep", href: "standings.html" },
    { round: "Formula 1 · Spanish Grand Prix", status: "FINAL", homeName: "Kimi Antonelli", awayName: "Max Verstappen", homeGoals: "P1", awayGoals: "P2", venue: "Madring", date: "13 Sep", href: "news.html#f1" },
    { round: "Cycling · Vuelta Final GC", status: "CHAMPION", homeName: "Enric Mas", awayName: "Primož Roglič", homeGoals: "1st", awayGoals: "2nd", venue: "Granada", date: "13 Sep", href: "news.html#cycling" }
  ];
  function setStatus(text) { if (statusEl) statusEl.textContent = text; }
  function esc(value) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
  function logo(label) { return `<span class="wc-logo-placeholder" aria-hidden="true">${esc(String(label || "BF").trim().slice(0, 2).toUpperCase())}</span>`; }
  function team(name, goals) { return `<div class="wc-team-line">${logo(name)}<span>${esc(name)}</span><b>${esc(goals ?? "-")}</b></div>`; }
  function render(items) {
    grid.className = "wc-results-grid";
    grid.innerHTML = items.map((item) => `<a class="wc-result-card" href="${esc(item.href || "news.html")}"><div class="wc-result-round"><span>${esc(item.round)}</span><strong class="wc-status-pill">${esc(item.status)}</strong></div><div class="wc-score-stack">${team(item.homeName, item.homeGoals)}${team(item.awayName, item.awayGoals)}</div><div class="wc-result-meta"><span>${esc(item.venue)}</span><span>${esc(item.date)}</span></div></a>`).join("");
    setStatus("World sports results · updated 16 Sep 2026");
  }
  function copy() {
    const badge = document.querySelector(".results-hero .hero-ai-badge");
    const title = document.querySelector(".results-hero h1");
    const intro = document.querySelector(".results-hero p");
    const heading = document.querySelector(".results-panel .panel-head h2, .results-panel h2");
    document.title = "World Sports Results | Betforecast.ai";
    if (badge) badge.textContent = "World sports results";
    if (title) title.textContent = "Latest verified results.";
    if (intro) intro.textContent = "Liverpool and Arsenal advanced in the Carabao Cup, while Fulham, Brentford and Peterborough also secured places in round four. Wednesday brings four more verified third-round ties.";
    if (heading) heading.textContent = "Global Sports Result Board";
  }
  function run() { copy(); render(GLOBAL_RESULTS); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
