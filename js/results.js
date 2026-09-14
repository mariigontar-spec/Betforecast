(() => {
  "use strict";
  const grid = document.getElementById("results-grid");
  const statusEl = document.getElementById("results-status");
  if (!grid) return;
  const GLOBAL_RESULTS = [
    { round: "Football · Premier League", status: "FINAL", homeName: "Leeds United", awayName: "Newcastle United", homeGoals: "4", awayGoals: "1", venue: "Elland Road", date: "14 Sep", href: "standings.html" },
    { round: "Tennis · US Open Final", status: "CHAMPION", homeName: "Alexander Zverev", awayName: "Ben Shelton", homeGoals: "3", awayGoals: "1", venue: "6-3, 7-6(2), 5-7, 6-2", date: "13 Sep", href: "news.html#tennis" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Manchester United", awayName: "Manchester City", homeGoals: "0", awayGoals: "1", venue: "Old Trafford", date: "13 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Coventry City", awayName: "Brighton", homeGoals: "0", awayGoals: "5", venue: "Coventry", date: "13 Sep", href: "standings.html" },
    { round: "Formula 1 · Spanish Grand Prix", status: "FINAL", homeName: "Kimi Antonelli", awayName: "Max Verstappen", homeGoals: "P1", awayGoals: "P2", venue: "Madring", date: "13 Sep", href: "news.html#f1" },
    { round: "Cycling · Vuelta Final GC", status: "CHAMPION", homeName: "Enric Mas", awayName: "Primož Roglič", homeGoals: "1st", awayGoals: "2nd", venue: "Granada", date: "13 Sep", href: "news.html#cycling" },
    { round: "Tennis · US Open Final", status: "CHAMPION", homeName: "Elena Rybakina", awayName: "Aryna Sabalenka", homeGoals: "2", awayGoals: "1", venue: "6-4, 5-7, 6-2", date: "12 Sep", href: "news.html#tennis" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Sunderland", awayName: "Arsenal", homeGoals: "0", awayGoals: "2", venue: "Stadium of Light", date: "12 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Chelsea", awayName: "Hull City", homeGoals: "2", awayGoals: "2", venue: "Stamford Bridge", date: "12 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Liverpool", awayName: "Fulham", homeGoals: "0", awayGoals: "0", venue: "Anfield", date: "12 Sep", href: "standings.html" }
  ];
  function setStatus(text) { if (statusEl) statusEl.textContent = text; }
  function esc(value) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
  function logo(label) { return `<span class="wc-logo-placeholder" aria-hidden="true">${esc(String(label || "BF").trim().slice(0, 2).toUpperCase())}</span>`; }
  function team(name, goals) { return `<div class="wc-team-line">${logo(name)}<span>${esc(name)}</span><b>${esc(goals ?? "-")}</b></div>`; }
  function render(items) {
    grid.className = "wc-results-grid";
    grid.innerHTML = items.map((item) => `<a class="wc-result-card" href="${esc(item.href || "news.html")}"><div class="wc-result-round"><span>${esc(item.round)}</span><strong class="wc-status-pill">${esc(item.status)}</strong></div><div class="wc-score-stack">${team(item.homeName, item.homeGoals)}${team(item.awayName, item.awayGoals)}</div><div class="wc-result-meta"><span>${esc(item.venue)}</span><span>${esc(item.date)}</span></div></a>`).join("");
    setStatus("World sports results · updated 15 Sep 2026");
  }
  function copy() {
    const badge = document.querySelector(".results-hero .hero-ai-badge");
    const title = document.querySelector(".results-hero h1");
    const intro = document.querySelector(".results-hero p");
    const heading = document.querySelector(".results-panel .panel-head h2, .results-panel h2");
    document.title = "World Sports Results | Betforecast.ai";
    if (badge) badge.textContent = "World sports results";
    if (title) title.textContent = "Latest verified results.";
    if (intro) intro.textContent = "Leeds beat Newcastle 4-1 to complete Premier League Matchweek 4. Alexander Zverev won the US Open in four sets, joining Elena Rybakina as the 2026 singles champions.";
    if (heading) heading.textContent = "Global Sports Result Board";
  }
  function run() { copy(); render(GLOBAL_RESULTS); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
