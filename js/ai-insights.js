ensureSiteSkinManager();

function ensureSiteSkinManager() {
  if (document.querySelector('script[src^="/js/site-skin-manager.js"], script[src^="js/site-skin-manager.js"]')) return;
  const script = document.createElement("script");
  script.src = "/js/site-skin-manager.js?v=38";
  script.defer = true;
  document.head.appendChild(script);
}

const insightsMatches = [
  { league: "Champions League", match: "Sporting CP vs Man United", summary: "Official Matchday 5 fixture. Kick-off is 22:00 EET on 25 November; no score or probability is inferred.", tip: "Verified fixture", score: "22:00 EET" },
  { league: "Champions League", match: "Sabah vs Barcelona", summary: "Official UEFA schedule: 19:45 EET on 25 November.", tip: "Early kick-off", score: "19:45 EET" },
  { league: "Champions League", match: "Club Brugge vs Liverpool", summary: "Official Matchday 5 fixture at 22:00 EET on 25 November.", tip: "Verified fixture", score: "22:00 EET" },
  { league: "Champions League", match: "Real Madrid 5-1 PSV", summary: "Verified final score from 24 November, kept as a result rather than a live prediction.", tip: "Final", score: "5-1" },
  { league: "Champions League", match: "Man City 2-2 Napoli", summary: "Verified final score from 24 November.", tip: "Final", score: "2-2" },
  { league: "Premier League", match: "Matchweek 11 table", summary: "No league match was played on 24 November, so the last verified table is retained unchanged.", tip: "Checked", score: "25 Nov" }
];

function updateStaticInsightBlocks() {
  document.title = "AI Sports Insights | Betforecast.ai";
  const set = (selector, value) => { const el = document.querySelector(selector); if (el) el.textContent = value; };
  set(".insights-hero-left .hero-badge", "AI Sports Insights · 25 Nov 2026");
  set(".insights-hero-left h1", "Verified schedule context, without invented probabilities");
  set(".insights-hero-left p", "Today’s insight layer separates confirmed fixtures and final scores from forecasts. Missing metrics stay unavailable rather than being guessed.");
  set(".insights-hero-card h3", "Sporting CP vs Man United");
  set(".insights-hero-card .ai-text", "Official UEFA fixture · 25 November · 22:00 EET.");
  set(".insights-hero-card .mini-label", "Current default match");
  set(".insights-hero-card .mini-tag", "Verified");
  set("#featured-insight .panel-head h2", "Featured verified match context");
  set(".featured-main-card .insight-kicker", "UEFA Champions League · Matchday 5");
  set(".featured-main-card h3", "Sporting CP vs Man United");
  set(".featured-main-card .featured-meta", "25 November 2026 · 22:00 EET");
  set(".confidence-pill", "Verified");
  set(".insight-summary h4", "What is confirmed");
  set(".insight-summary p", "The date, competition and kick-off are confirmed by UEFA. No unverified probability, score forecast, odds or performance metric is shown.");
  const hidden = [".insights-hero-card .probabilities", ".insights-hero-card .probability-bar", ".featured-prob-grid", ".featured-long-bar"];
  hidden.forEach(selector => { const el = document.querySelector(selector); if (el) el.style.display = "none"; });
  const factorTags = document.querySelector(".factor-tags");
  if (factorTags) factorTags.innerHTML = "<span>Official fixture</span><span>22:00 EET</span><span>No invented odds</span><span>No guessed metrics</span>";
  const stats = document.querySelectorAll(".mini-stat-card");
  const values = [["Status", "Upcoming"], ["Kick-off", "22:00 EET"], ["Source", "UEFA"]];
  stats.forEach((card, i) => { if (!values[i]) return; const a=card.querySelector("span"), b=card.querySelector("strong"); if(a)a.textContent=values[i][0]; if(b)b.textContent=values[i][1]; });
}

document.addEventListener("DOMContentLoaded", () => {
  updateStaticInsightBlocks();
  const container = document.getElementById("insights-cards");
  if (!container) return;
  container.innerHTML = "";
  insightsMatches.forEach(item => {
    const card = document.createElement("article");
    card.className = "insight-card";
    card.innerHTML = `<div class="insight-card-cover"></div><div class="insight-card-body"><div class="league">${item.league}</div><h3>${item.match}</h3><p>${item.summary}</p><div class="insight-card-bottom"><span class="insight-small-pill">${item.tip}</span><span class="insight-small-score">${item.score}</span></div></div>`;
    container.appendChild(card);
  });
});
