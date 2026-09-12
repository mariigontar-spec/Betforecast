(() => {
  "use strict";
  const grid = document.getElementById("results-grid");
  const statusEl = document.getElementById("results-status");
  if (!grid) return;
  const GLOBAL_RESULTS = [
    { round: "Football · Premier League", status: "FINAL", homeName: "Sunderland", awayName: "Arsenal", homeGoals: "0", awayGoals: "2", venue: "Stadium of Light", date: "12 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Chelsea", awayName: "Hull City", homeGoals: "2", awayGoals: "2", venue: "Stamford Bridge", date: "12 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Liverpool", awayName: "Fulham", homeGoals: "0", awayGoals: "0", venue: "Anfield", date: "12 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Crystal Palace", awayName: "Ipswich Town", homeGoals: "2", awayGoals: "3", venue: "Selhurst Park", date: "12 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Aston Villa", awayName: "Nottm Forest", homeGoals: "1", awayGoals: "2", venue: "Villa Park", date: "12 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Bournemouth", awayName: "Brentford", homeGoals: "2", awayGoals: "2", venue: "Vitality Stadium", date: "12 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Tottenham", awayName: "Everton", homeGoals: "0", awayGoals: "0", venue: "Tottenham Hotspur Stadium", date: "12 Sep", href: "standings.html" },
    { round: "Cycling · Vuelta Stage 20", status: "FINAL", homeName: "Mikel Landa", awayName: "Enric Mas", homeGoals: "1st", awayGoals: "GC", venue: "Collado del Alguacil", date: "12 Sep · 186.8 km", href: "news.html#cycling" },
    { round: "Formula 1 · Spanish GP Qualifying", status: "FINAL", homeName: "Lando Norris", awayName: "Kimi Antonelli", homeGoals: "P1", awayGoals: "P2", venue: "Madring", date: "12 Sep", href: "news.html#f1" },
    { round: "Tennis · US Open Semi-final", status: "FINAL", homeName: "Ben Shelton", awayName: "Frances Tiafoe", homeGoals: "3", awayGoals: "1", venue: "4-6, 6-3, 6-3, 7-5", date: "12 Sep", href: "news.html#tennis" }
  ];
  function setStatus(text) { if (statusEl) statusEl.textContent = text; }
  function esc(value) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
  function logo(label) { return `<span class="wc-logo-placeholder" aria-hidden="true">${esc(String(label || "BF").trim().slice(0, 2).toUpperCase())}</span>`; }
  function team(name, goals) { return `<div class="wc-team-line">${logo(name)}<span>${esc(name)}</span><b>${esc(goals ?? "-")}</b></div>`; }
  function render(items) {
    grid.className = "wc-results-grid";
    grid.innerHTML = items.map((item) => `<a class="wc-result-card" href="${esc(item.href || "news.html")}"><div class="wc-result-round"><span>${esc(item.round)}</span><strong class="wc-status-pill">${esc(item.status)}</strong></div><div class="wc-score-stack">${team(item.homeName, item.homeGoals)}${team(item.awayName, item.awayGoals)}</div><div class="wc-result-meta"><span>${esc(item.venue)}</span><span>${esc(item.date)}</span></div></a>`).join("");
    setStatus("World sports results · updated 13 Sep 2026");
  }
  function copy() {
    const badge = document.querySelector(".results-hero .hero-ai-badge");
    const title = document.querySelector(".results-hero h1");
    const intro = document.querySelector(".results-hero p");
    const heading = document.querySelector(".results-panel .panel-head h2, .results-panel h2");
    document.title = "World Sports Results | Betforecast.ai";
    if (badge) badge.textContent = "World sports results";
    if (title) title.textContent = "Latest verified results.";
    if (intro) intro.textContent = "Arsenal won 2-0 at Sunderland, while Liverpool and Chelsea were held. Mikel Landa won Vuelta Stage 20, Enric Mas extended his lead to 2:15, and Lando Norris took pole in Madrid.";
    if (heading) heading.textContent = "Global Sports Result Board";
  }
  function run() { copy(); render(GLOBAL_RESULTS); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
