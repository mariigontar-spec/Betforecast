(() => {
  "use strict";
  const grid = document.getElementById("results-grid");
  const statusEl = document.getElementById("results-status");
  if (!grid) return;
  const GLOBAL_RESULTS = [
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Azerbaijan", awayName: "Liechtenstein", homeGoals: "0", awayGoals: "0", venue: "UEFA Nations League", date: "1 Oct", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Germany", awayName: "Serbia", homeGoals: "2", awayGoals: "0", venue: "UEFA Nations League", date: "1 Oct", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Greece", awayName: "Netherlands", homeGoals: "2", awayGoals: "2", venue: "UEFA Nations League", date: "1 Oct", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Denmark", awayName: "Portugal", homeGoals: "2", awayGoals: "4", venue: "UEFA Nations League", date: "1 Oct", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Wales", awayName: "Norway", homeGoals: "2", awayGoals: "1", venue: "UEFA Nations League", date: "1 Oct", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Israel", awayName: "Kosovo", homeGoals: "0", awayGoals: "0", venue: "UEFA Nations League", date: "1 Oct", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Republic of Ireland", awayName: "Austria", homeGoals: "2", awayGoals: "2", venue: "UEFA Nations League", date: "1 Oct", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Malta", awayName: "Gibraltar", homeGoals: "1", awayGoals: "1", venue: "UEFA Nations League", date: "1 Oct", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Georgia", awayName: "Ukraine", homeGoals: "0", awayGoals: "0", venue: "UEFA Nations League", date: "28 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Armenia", awayName: "Montenegro", homeGoals: "2", awayGoals: "3", venue: "UEFA Nations League", date: "28 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Latvia", awayName: "Cyprus", homeGoals: "0", awayGoals: "0", venue: "UEFA Nations League", date: "28 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Belgium", awayName: "France", homeGoals: "0", awayGoals: "1", venue: "UEFA Nations League", date: "28 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Türkiye", awayName: "Italy", homeGoals: "1", awayGoals: "4", venue: "UEFA Nations League", date: "28 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Northern Ireland", awayName: "Hungary", homeGoals: "0", awayGoals: "0", venue: "UEFA Nations League", date: "28 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Romania", awayName: "Bosnia and Herzegovina", homeGoals: "2", awayGoals: "4", venue: "UEFA Nations League", date: "28 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Sweden", awayName: "Poland", homeGoals: "3", awayGoals: "1", venue: "UEFA Nations League", date: "28 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Finland", awayName: "Belarus", homeGoals: "0", awayGoals: "0", venue: "UEFA Nations League", date: "29 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Moldova", awayName: "Faroe Islands", homeGoals: "1", awayGoals: "1", venue: "UEFA Nations League", date: "29 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Czechia", awayName: "England", homeGoals: "0", awayGoals: "2", venue: "UEFA Nations League", date: "29 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Spain", awayName: "Croatia", homeGoals: "4", awayGoals: "1", venue: "UEFA Nations League", date: "29 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Scotland", awayName: "Switzerland", homeGoals: "0", awayGoals: "3", venue: "UEFA Nations League", date: "29 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Slovenia", awayName: "North Macedonia", homeGoals: "2", awayGoals: "0", venue: "UEFA Nations League", date: "29 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "San Marino", awayName: "Albania", homeGoals: "0", awayGoals: "3", venue: "UEFA Nations League", date: "29 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Slovakia", awayName: "Kazakhstan", homeGoals: "2", awayGoals: "1", venue: "UEFA Nations League", date: "29 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Bulgaria", awayName: "Estonia", homeGoals: "0", awayGoals: "0", venue: "UEFA Nations League", date: "29 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Luxembourg", awayName: "Iceland", homeGoals: "0", awayGoals: "3", venue: "UEFA Nations League", date: "29 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Lithuania", awayName: "Azerbaijan", homeGoals: "1", awayGoals: "1", venue: "UEFA Nations League", date: "27 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Serbia", awayName: "Netherlands", homeGoals: "1", awayGoals: "2", venue: "UEFA Nations League", date: "27 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Denmark", awayName: "Wales", homeGoals: "2", awayGoals: "0", venue: "UEFA Nations League", date: "27 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Austria", awayName: "Kosovo", homeGoals: "3", awayGoals: "1", venue: "UEFA Nations League", date: "27 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Gibraltar", awayName: "Andorra", homeGoals: "0", awayGoals: "0", venue: "UEFA Nations League", date: "27 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Germany", awayName: "Greece", homeGoals: "0", awayGoals: "1", venue: "UEFA Nations League", date: "27 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Norway", awayName: "Portugal", homeGoals: "1", awayGoals: "2", venue: "UEFA Nations League", date: "27 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Israel", awayName: "Republic of Ireland", homeGoals: "0", awayGoals: "3", venue: "UEFA Nations League", date: "27 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Norway", awayName: "Denmark", homeGoals: "3", awayGoals: "2", venue: "UEFA Nations League", date: "24 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "England", awayName: "Spain", homeGoals: "2", awayGoals: "3", venue: "UEFA Nations League", date: "26 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Czechia", awayName: "Croatia", homeGoals: "1", awayGoals: "2", venue: "UEFA Nations League", date: "26 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Slovenia", awayName: "Scotland", homeGoals: "0", awayGoals: "0", venue: "UEFA Nations League", date: "26 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "North Macedonia", awayName: "Switzerland", homeGoals: "0", awayGoals: "3", venue: "UEFA Nations League", date: "26 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "San Marino", awayName: "Finland", homeGoals: "0", awayGoals: "7", venue: "UEFA Nations League", date: "26 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Albania", awayName: "Belarus", homeGoals: "2", awayGoals: "0", venue: "UEFA Nations League", date: "26 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Faroe Islands", awayName: "Kazakhstan", homeGoals: "1", awayGoals: "1", venue: "UEFA Nations League", date: "26 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Slovakia", awayName: "Moldova", homeGoals: "2", awayGoals: "0", venue: "UEFA Nations League", date: "26 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Bulgaria", awayName: "Luxembourg", homeGoals: "1", awayGoals: "2", venue: "UEFA Nations League", date: "26 Sep", href: "results.html" },
    { round: "Football · UEFA Nations League", status: "FINAL", homeName: "Iceland", awayName: "Estonia", homeGoals: "1", awayGoals: "1", venue: "UEFA Nations League", date: "26 Sep", href: "results.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Manchester City", awayName: "Sunderland", homeGoals: "5", awayGoals: "3", venue: "Etihad Stadium", date: "20 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Bournemouth", awayName: "Liverpool", homeGoals: "0", awayGoals: "1", venue: "Vitality Stadium", date: "20 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Leeds United", awayName: "Crystal Palace", homeGoals: "0", awayGoals: "0", venue: "Elland Road", date: "20 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Fulham", awayName: "Manchester United", homeGoals: "1", awayGoals: "1", venue: "Craven Cottage", date: "20 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Tottenham Hotspur", awayName: "Aston Villa", homeGoals: "2", awayGoals: "3", venue: "Tottenham Hotspur Stadium", date: "19 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Brighton", awayName: "Arsenal", homeGoals: "3", awayGoals: "0", venue: "Amex Stadium", date: "19 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Everton", awayName: "Ipswich Town", homeGoals: "1", awayGoals: "0", venue: "Hill Dickinson Stadium", date: "19 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Newcastle", awayName: "Hull City", homeGoals: "2", awayGoals: "1", venue: "St James’ Park", date: "19 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Nottingham Forest", awayName: "Coventry City", homeGoals: "0", awayGoals: "1", venue: "City Ground", date: "19 Sep", href: "standings.html" },
    { round: "Football · Premier League", status: "FINAL", homeName: "Brentford", awayName: "Chelsea", homeGoals: "3", awayGoals: "0", venue: "Gtech Community Stadium", date: "18 Sep", href: "standings.html" },
    { round: "Football · UEFA Europa League", status: "FINAL", homeName: "Juventus", awayName: "N.E.C. Nijmegen", homeGoals: "5", awayGoals: "0", venue: "Turin", date: "17 Sep", href: "results.html" },
    { round: "Football · UEFA Europa League", status: "FINAL", homeName: "Real Sociedad", awayName: "Bournemouth", homeGoals: "1", awayGoals: "2", venue: "San Sebastián", date: "17 Sep", href: "results.html" },
    { round: "Football · Carabao Cup", status: "FINAL", homeName: "Manchester City", awayName: "Norwich City", homeGoals: "5", awayGoals: "0", venue: "Etihad Stadium", date: "17 Sep", href: "results.html" },
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
    setStatus("World sports results · checked 2 Oct 2026");
  }
  function copy() {
    const badge = document.querySelector(".results-hero .hero-ai-badge");
    const title = document.querySelector(".results-hero h1");
    const intro = document.querySelector(".results-hero p");
    const heading = document.querySelector(".results-panel .panel-head h2, .results-panel h2");
    document.title = "World Sports Results | Betforecast.ai";
    if (badge) badge.textContent = "World sports results";
    if (title) title.textContent = "Latest verified results.";
    if (intro) intro.textContent = "All 18 Nations League results from 28–29 September are now verified, including Spain’s 4-1 win over Croatia, England’s 2-0 win in Czechia, France’s 1-0 win in Belgium and Italy’s 4-1 win in Türkiye.";
    if (heading) heading.textContent = "Global Sports Result Board";
  }
  function run() { copy(); render(GLOBAL_RESULTS); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
