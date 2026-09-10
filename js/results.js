(() => {
  "use strict";
  const grid = document.getElementById("results-grid");
  const statusEl = document.getElementById("results-status");
  if (!grid) return;
  const GLOBAL_RESULTS = [
    { round: "Football · Champions League", status: "FINAL", homeName: "Manchester United", awayName: "Sabah", homeGoals: "4", awayGoals: "0", venue: "Old Trafford", date: "10 Sep", href: "news.html#football" },
    { round: "Football · Champions League", status: "FINAL", homeName: "PSV Eindhoven", awayName: "Shakhtar Donetsk", homeGoals: "1", awayGoals: "1", venue: "Eindhoven", date: "10 Sep", href: "news.html#football" },
    { round: "Football · Champions League", status: "FINAL", homeName: "Fenerbahçe", awayName: "Roma", homeGoals: "1", awayGoals: "1", venue: "Istanbul", date: "10 Sep", href: "news.html#football" },
    { round: "Cycling · Vuelta Stage 18", status: "FINAL", homeName: "Stefan Küng", awayName: "Callum Thornley", homeGoals: "1st", awayGoals: "+3s", venue: "Jerez de la Frontera", date: "10 Sep · 32.1 km", href: "news.html#cycling" },
    { round: "Cycling · Vuelta Stage 18", status: "PODIUM", homeName: "João Almeida", awayName: "Primož Roglič", homeGoals: "3rd", awayGoals: "4th", venue: "Individual time trial", date: "10 Sep", href: "news.html#cycling" },
    { round: "Cycling · Vuelta GC", status: "LEADER", homeName: "Enric Mas", awayName: "Primož Roglič", homeGoals: "Red", awayGoals: "+1:37", venue: "After Stage 18", date: "10 Sep", href: "news.html#cycling" },
    { round: "Tennis · US Open Quarter-final", status: "FINAL", homeName: "Alexander Zverev", awayName: "Botic van de Zandschulp", homeGoals: "6-2 7-5", awayGoals: "6-1", venue: "Flushing Meadows", date: "9 Sep", href: "news.html#tennis" },
    { round: "Tennis · US Open Quarter-final", status: "RETIRED", homeName: "Karen Khachanov", awayName: "Alexander Blockx", homeGoals: "6-2 7-5", awayGoals: "3-2 ret.", venue: "Flushing Meadows", date: "9 Sep", href: "news.html#tennis" }
  ];
  function setStatus(text) { if (statusEl) statusEl.textContent = text; }
  function esc(value) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
  function logo(label) { return `<span class="wc-logo-placeholder" aria-hidden="true">${esc(String(label || "BF").trim().slice(0, 2).toUpperCase())}</span>`; }
  function team(name, goals) { return `<div class="wc-team-line">${logo(name)}<span>${esc(name)}</span><b>${esc(goals ?? "-")}</b></div>`; }
  function render(items) {
    grid.className = "wc-results-grid";
    grid.innerHTML = items.map((item) => `<a class="wc-result-card" href="${esc(item.href || "news.html")}"><div class="wc-result-round"><span>${esc(item.round)}</span><strong class="wc-status-pill">${esc(item.status)}</strong></div><div class="wc-score-stack">${team(item.homeName, item.homeGoals)}${team(item.awayName, item.awayGoals)}</div><div class="wc-result-meta"><span>${esc(item.venue)}</span><span>${esc(item.date)}</span></div></a>`).join("");
    setStatus("World sports results · updated 11 Sep 2026");
  }
  function copy() {
    const badge = document.querySelector(".results-hero .hero-ai-badge");
    const title = document.querySelector(".results-hero h1");
    const intro = document.querySelector(".results-hero p");
    const heading = document.querySelector(".results-panel .panel-head h2, .results-panel h2");
    document.title = "World Sports Results | Betforecast.ai";
    if (badge) badge.textContent = "World sports results";
    if (title) title.textContent = "Latest verified results.";
    if (intro) intro.textContent = "Manchester United won 4-0 as PSV and Fenerbahçe drew their Champions League openers. Stefan Küng won the Vuelta time trial, while Enric Mas retained the red jersey.";
    if (heading) heading.textContent = "Global Sports Result Board";
  }
  function run() { copy(); render(GLOBAL_RESULTS); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
