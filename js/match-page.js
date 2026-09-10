const GLOBAL_MATCH_RADAR = [
  {
    id: "zverev-khachanov-sep11",
    league: "Tennis · US Open",
    date: "11 Sep 2026",
    time: "Men's semi-final",
    stadium: "Arthur Ashe Stadium, New York",
    home: "Alexander Zverev",
    away: "Karen Khachanov",
    homeShort: "ZVE",
    awayShort: "KHA",
    homeLogo: "https://flagcdn.com/w160/de.png",
    awayLogo: "https://flagcdn.com/w160/ru.png",
    projectedScore: "SF",
    homePct: 0,
    drawPct: 0,
    awayPct: 0,
    confidence: 100,
    summary: "Alexander Zverev faces Karen Khachanov in Friday's confirmed US Open semi-final.",
    bestTip: "Confirmed fixture",
    goalsLean: "Final place",
    btts: "Friday session",
    factors: ["Zverev beat Van de Zandschulp", "Khachanov advanced after Blockx retired", "Zverev leads H2H 6-3", "Men's semi-final"],
    formHome: ["W", "W", "W"],
    formAway: ["W", "W", "W"],
    homeStats: ["Round: semi-final", "Date: 11 Sep", "Top seed", "All four major semis in 2026"],
    awayStats: ["Round: semi-final", "First US Open semi since 2022", "Seed: 28", "2021 Olympic final rematch"],
    quickInsightTitle: "Final place at stake",
    quickInsight: "The fixture and route to the semi-final are verified; no unverified score prediction is presented.",
    related: [
      { id: "shelton-tiafoe-sep11", home: "Shelton", away: "Tiafoe", league: "US Open" },
      { id: "vuelta-stage19-sep11", home: "Vélez-Málaga", away: "Peñas Blancas", league: "Vuelta" }
    ]
  },
  {
    id: "shelton-tiafoe-sep11",
    league: "Tennis · US Open",
    date: "11 Sep 2026",
    time: "Men's semi-final",
    stadium: "Arthur Ashe Stadium, New York",
    home: "Ben Shelton",
    away: "Frances Tiafoe",
    homeShort: "SHE",
    awayShort: "TIA",
    homeLogo: "https://flagcdn.com/w160/us.png",
    awayLogo: "https://flagcdn.com/w160/us.png",
    projectedScore: "SF",
    homePct: 0,
    drawPct: 0,
    awayPct: 0,
    confidence: 100,
    summary: "Ben Shelton and Frances Tiafoe meet in an all-American US Open semi-final on Friday.",
    bestTip: "Confirmed fixture",
    goalsLean: "Final place",
    btts: "Friday session",
    factors: ["Shelton beat defending champion Alcaraz", "Tiafoe won a five-set quarter-final", "All-American matchup", "Men's semi-final"],
    formHome: ["W", "W", "W"],
    formAway: ["W", "W", "W"],
    homeStats: ["Round: semi-final", "Seed: 8", "Beat Alcaraz in five", "Highest-ranked US man left"],
    awayStats: ["Round: semi-final", "Seed: 11", "Third US Open semi-final", "Beat Michelsen in five"],
    quickInsightTitle: "American finalist guaranteed",
    quickInsight: "The winner will become the first American man in a major final since 2009.",
    related: [{ id: "zverev-khachanov-sep11", home: "Zverev", away: "Khachanov", league: "US Open" }]
  },
  {
    id: "vuelta-stage19-sep11",
    league: "Cycling · Vuelta a España",
    date: "11 Sep 2026",
    time: "Stage 19",
    stadium: "Vélez-Málaga to Peñas Blancas, Estepona",
    home: "Vélez-Málaga",
    away: "Peñas Blancas",
    homeShort: "VEL",
    awayShort: "PBL",
    projectedScore: "210.8 km",
    homePct: 0,
    drawPct: 0,
    awayPct: 0,
    confidence: 100,
    summary: "Stage 19 covers 210.8 hilly kilometres and finishes uphill at Peñas Blancas.",
    bestTip: "Official route",
    goalsLean: "Uphill finish",
    btts: "GC test",
    factors: ["210.8 km", "Hilly route", "Summit finish", "Mas leads Roglič by 1:37"],
    formHome: ["S", "T", "A"],
    formAway: ["G", "C"],
    homeStats: ["Start: Vélez-Málaga", "Date: 11 Sep", "Distance: 210.8 km", "Stage: 19"],
    awayStats: ["Finish: Peñas Blancas", "Leader: Enric Mas", "Roglič: +1:37", "Gall: third overall"],
    quickInsightTitle: "Climbing test after the clock",
    quickInsight: "The uphill finish follows the time trial that reduced Mas's advantage to 1:37.",
    related: [{ id: "zverev-khachanov-sep11", home: "Zverev", away: "Khachanov", league: "US Open" }]
  }
];

function normalizeAlias(value) {
  return String(value || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function getSelectedEvent() {
  const params = new URLSearchParams(window.location.search);
  const requested = normalizeAlias(params.get("id") || params.get("match") || params.get("fixture"));
  return GLOBAL_MATCH_RADAR.find((item) => normalizeAlias(item.id) === requested) || GLOBAL_MATCH_RADAR[0];
}
function setText(id, value) { const element = document.getElementById(id); if (element) element.textContent = value; }
function setHtml(id, value) { const element = document.getElementById(id); if (element) element.innerHTML = value; }
function setImage(id, alt, src) { const element = document.getElementById(id); if (element) { element.src = src || "assets/default.jpg"; element.alt = alt; } }
function renderBadges(id, items = []) { setHtml(id, items.map((item) => `<span>${item}</span>`).join("")); }
function renderList(id, items = []) { setHtml(id, items.map((item) => `<li>${item}</li>`).join("")); }
function renderKeySignals(event) {
  setHtml("key-signal-list", `<div class="key-signal-item"><span>Status</span><strong>${event.league}</strong></div><div class="key-signal-item"><span>Focus</span><strong>${event.bestTip}</strong></div><div class="key-signal-item"><span>Context</span><strong>${event.goalsLean}</strong></div><div class="key-signal-item"><span>Update</span><strong>${event.btts}</strong></div>`);
}
function renderRelated(event) {
  setHtml("related-match-list", (event.related || []).map((item) => `<a class="related-match-card" href="match.html?id=${encodeURIComponent(item.id)}"><span>${item.league}</span><strong>${item.home} vs ${item.away}</strong></a>`).join(""));
}
function renderEvent(event) {
  document.title = "World Sports Matches | Betforecast.ai";
  setText("match-league-badge", event.league); setText("match-title", `${event.home} vs ${event.away}`); setText("match-subtitle", event.summary);
  setText("match-date", event.date); setText("match-time", event.time); setText("match-stadium", event.stadium); setText("match-confidence-pill", `Update ${event.confidence}%`);
  setText("team-home-short", event.homeShort); setText("team-away-short", event.awayShort); setText("team-home-name", event.home); setText("team-away-name", event.away);
  setText("projected-score", event.projectedScore); setImage("team-home-logo", event.home, event.homeLogo); setImage("team-away-logo", event.away, event.awayLogo);
  setText("prob-home", `${event.homePct}%`); setText("prob-draw", `${event.drawPct}%`); setText("prob-away", `${event.awayPct}%`);
  setText("prob-home-label", `${event.homeShort} Status`); setText("prob-away-label", `${event.awayShort} Status`);
  const bars = [["hero-bar-home", event.homePct], ["hero-bar-draw", event.drawPct], ["hero-bar-away", event.awayPct]];
  bars.forEach(([id, width]) => { const bar = document.getElementById(id); if (bar) bar.style.width = `${width}%`; });
  setText("match-summary", event.summary); setText("best-tip", event.bestTip); setText("goals-lean", event.goalsLean); setText("btts-signal", event.btts);
  setHtml("factor-tags", event.factors.map((factor) => `<span>${factor}</span>`).join("")); setText("form-home-title", event.home); setText("form-away-title", event.away);
  renderBadges("form-home-badges", event.formHome); renderBadges("form-away-badges", event.formAway); renderList("form-home-list", event.homeStats); renderList("form-away-list", event.awayStats);
  renderKeySignals(event); renderRelated(event); setText("quick-insight-title", event.quickInsightTitle); setText("quick-insight-text", event.quickInsight);
}
function loadMatchPage() { renderEvent(getSelectedEvent()); }
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", loadMatchPage); else loadMatchPage();
