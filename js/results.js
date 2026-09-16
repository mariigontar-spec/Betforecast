(() => {
  "use strict";
  const grid = document.getElementById("results-grid");
  const statusEl = document.getElementById("results-status");
  if (!grid) return;
  const GLOBAL_RESULTS = [
    { round: "Football · Carabao Cup", status: "FINAL", homeName: "Manchester United", awayName: "Brighton", homeGoals: "2", awayGoals: "3", venue: "Old Trafford", date: "16 Sep", href: "results.html" },
    { round: "Football · Carabao Cup", status: "FINAL", homeName: "Coventry City", awayName: "Aston Villa", homeGoals: "1", awayGoals: "3", venue: "Coventry", date: "16 Sep", href: "results.html" },
    { round: "Football · Carabao Cup", status: "FINAL", homeName: "Everton", awayName: "Wolverhampton Wanderers", homeGoals: "1", awayGoals: "0", venue: "Everton", date: "16 Sep", href: "results.html" },
    { round: "Football · Carabao Cup", status: "FINAL", homeName: "Fleetwood Town", awayName: "Sheffield United", homeGoals: "1", awayGoals: "0", venue: "Fleetwood", date: "16 Sep", href: "results.html" },
    { round: "Football · Carabao Cup", status: "FINAL", homeName: "Liverpool", awayName: "Tottenham Hotspur", homeGoals: "3", awayGoals: "1", venue: "Anfield", date: "15 Sep", href: "results.html" },
    { round: "Football · Carabao Cup", status: "FINAL", homeName: "Ipswich Town", awayName: "Arsenal", homeGoals: "2", awayGoals: "4", venue: "Portman Road", date: "15 Sep", href: "results.html" },
    { round: "Football · Carabao Cup", status: "FINAL", homeName: "West Ham United", awayName: "Fulham", homeGoals: "2", awayGoals: "3", venue: "London Stadium", date: "15 Sep", href: "results.html" },
    { round: "Football · Carabao Cup", status: "FINAL", homeName: "Reading", awayName: "Brentford", homeGoals: "1", awayGoals: "2", venue: "Reading", date: "15 Sep", href: "results.html" },
    { round: "Football · Carabao Cup", status: "PENS", homeName: "Peterborough United", awayName: "Barnsley", homeGoals: "3 (7)", awayGoals: "3 (6)", venue: "Peterborough", date: "15 Sep", href: "results.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Leeds United", awayName: "Newcastle United", homeGoals: "4", awayGoals: "1", venue: "Elland Road", date: "14 Sep", href: "standings.html" }
  ];
  function setStatus(text) { if (statusEl) statusEl.textContent = text; }
  function esc(value) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
  function logo(label) { return `<span class="wc-logo-placeholder" aria-hidden="true">${esc(String(label || "BF").trim().slice(0, 2).toUpperCase())}</span>`; }
  function team(name, goals) { return `<div class="wc-team-line">${logo(name)}<span>${esc(name)}</span><b>${esc(goals ?? "-")}</b></div>`; }
  function render(items) {
    grid.className = "wc-results-grid";
    grid.innerHTML = items.map((item) => `<a class="wc-result-card" href="${esc(item.href || "news.html")}"><div class="wc-result-round"><span>${esc(item.round)}</span><strong class="wc-status-pill">${esc(item.status)}</strong></div><div class="wc-score-stack">${team(item.homeName, item.homeGoals)}${team(item.awayName, item.awayGoals)}</div><div class="wc-result-meta"><span>${esc(item.venue)}</span><span>${esc(item.date)}</span></div></a>`).join("");
    setStatus("World sports results · updated 17 Sep 2026");
  }
  function copy() {
    const badge = document.querySelector(".results-hero .hero-ai-badge");
    const title = document.querySelector(".results-hero h1");
    const intro = document.querySelector(".results-hero p");
    const heading = document.querySelector(".results-panel .panel-head h2, .results-panel h2");
    document.title = "World Sports Results | Betforecast.ai";
    if (badge) badge.textContent = "World sports results";
    if (title) title.textContent = "Latest verified results.";
    if (intro) intro.textContent = "Brighton recovered from two goals down to beat Manchester United 3-2. Aston Villa, Everton and Fleetwood also advanced in the Carabao Cup on 16 September.";
    if (heading) heading.textContent = "Global Sports Result Board";
  }
  function run() { copy(); render(GLOBAL_RESULTS); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
