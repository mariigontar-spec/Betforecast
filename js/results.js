(() => {
  "use strict";
  const grid = document.getElementById("results-grid");
  const statusEl = document.getElementById("results-status");
  if (!grid) return;
  const GLOBAL_RESULTS = [
    { round: "Tennis · US Open Semi-final", status: "FINAL", homeName: "Elena Rybakina", awayName: "Coco Gauff", homeGoals: "2", awayGoals: "1", venue: "3-6, 6-4, 6-4", date: "10 Sep", href: "news.html#tennis" },
    { round: "Tennis · US Open Semi-final", status: "FINAL", homeName: "Aryna Sabalenka", awayName: "Jessica Pegula", homeGoals: "2", awayGoals: "0", venue: "7-5, 6-2", date: "10 Sep", href: "news.html#tennis" },
    { round: "Cycling · Vuelta Stage 19", status: "FINAL", homeName: "Eddie Dunbar", awayName: "Santiago Buitrago", homeGoals: "1st", awayGoals: "+14s", venue: "Peñas Blancas", date: "11 Sep · 210.8 km", href: "news.html#cycling" },
    { round: "Cycling · Vuelta Stage 19", status: "PODIUM", homeName: "Thomas Gloag", awayName: "Urko Berrade", homeGoals: "3rd", awayGoals: "4th", venue: "Uphill finish", date: "11 Sep", href: "news.html#cycling" },
    { round: "Cycling · Vuelta GC", status: "LEADER", homeName: "Enric Mas", awayName: "Primož Roglič", homeGoals: "Red", awayGoals: "+1:37", venue: "After Stage 19", date: "11 Sep", href: "news.html#cycling" },
    { round: "Football · Champions League", status: "FINAL", homeName: "Manchester United", awayName: "Sabah", homeGoals: "4", awayGoals: "0", venue: "Old Trafford", date: "10 Sep", href: "news.html#football" },
    { round: "Football · Champions League", status: "FINAL", homeName: "PSV Eindhoven", awayName: "Shakhtar Donetsk", homeGoals: "1", awayGoals: "1", venue: "Eindhoven", date: "10 Sep", href: "news.html#football" },
    { round: "Football · Champions League", status: "FINAL", homeName: "Fenerbahçe", awayName: "Roma", homeGoals: "1", awayGoals: "1", venue: "Istanbul", date: "10 Sep", href: "news.html#football" }
  ];
  function setStatus(text) { if (statusEl) statusEl.textContent = text; }
  function esc(value) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
  function logo(label) { return `<span class="wc-logo-placeholder" aria-hidden="true">${esc(String(label || "BF").trim().slice(0, 2).toUpperCase())}</span>`; }
  function team(name, goals) { return `<div class="wc-team-line">${logo(name)}<span>${esc(name)}</span><b>${esc(goals ?? "-")}</b></div>`; }
  function render(items) {
    grid.className = "wc-results-grid";
    grid.innerHTML = items.map((item) => `<a class="wc-result-card" href="${esc(item.href || "news.html")}"><div class="wc-result-round"><span>${esc(item.round)}</span><strong class="wc-status-pill">${esc(item.status)}</strong></div><div class="wc-score-stack">${team(item.homeName, item.homeGoals)}${team(item.awayName, item.awayGoals)}</div><div class="wc-result-meta"><span>${esc(item.venue)}</span><span>${esc(item.date)}</span></div></a>`).join("");
    setStatus("World sports results · updated 12 Sep 2026");
  }
  function copy() {
    const badge = document.querySelector(".results-hero .hero-ai-badge");
    const title = document.querySelector(".results-hero h1");
    const intro = document.querySelector(".results-hero p");
    const heading = document.querySelector(".results-panel .panel-head h2, .results-panel h2");
    document.title = "World Sports Results | Betforecast.ai";
    if (badge) badge.textContent = "World sports results";
    if (title) title.textContent = "Latest verified results.";
    if (intro) intro.textContent = "Elena Rybakina and Aryna Sabalenka reached the US Open final. Eddie Dunbar won Vuelta Stage 19, while Enric Mas retained the red jersey with a 1:37 lead.";
    if (heading) heading.textContent = "Global Sports Result Board";
  }
  function run() { copy(); render(GLOBAL_RESULTS); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
