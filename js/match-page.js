const GLOBAL_MATCH_RADAR = [
  {
    id: "cincinnati-r16",
    league: "Tennis · ATP/WTA 1000",
    date: "19 Aug 2026",
    time: "Round of 16 · day/night sessions",
    stadium: "Lindner Family Tennis Center",
    home: "Cincinnati Open",
    away: "Round of 16",
    homeShort: "CIN",
    awayShort: "R16",
    projectedScore: "LIVE",
    homePct: 46,
    drawPct: 12,
    awayPct: 42,
    confidence: 69,
    summary: "Today’s main live sports window is the Cincinnati Open round of 16. Hard-court form, recovery between rounds and late-US Open preparation are the strongest tennis signals.",
    bestTip: "Hard-court form",
    goalsLean: "Recovery watch",
    btts: "Draw volatility",
    factors: ["Round of 16", "Hard-court form", "Recovery load", "US Open build-up"],
    formHome: ["R", "1", "6", "H", "C"],
    formAway: ["F", "O", "R", "M", "S"],
    homeStats: ["Event: Cincinnati Open", "Level: ATP/WTA 1000", "Date: 19 Aug", "Stage: Round of 16"],
    awayStats: ["Surface: hard court", "Focus: recovery", "Risk: match load", "Next: quarterfinals"],
    quickInsightTitle: "Cincinnati read",
    quickInsight: "At this stage of a two-week Masters event, recovery and recent match load can matter almost as much as ranking. Short turnaround and physical issues can move probabilities quickly.",
    related: [
      { id: "premier-league-opener", home: "Arsenal", away: "Coventry City", league: "Premier League" },
      { id: "dutch-gp", home: "Formula 1", away: "Dutch GP", league: "Formula 1" }
    ]
  },
  {
    id: "premier-league-opener",
    league: "Football · Premier League",
    date: "21 Aug 2026",
    time: "Opening weekend",
    stadium: "Emirates Stadium",
    home: "Arsenal",
    away: "Coventry City",
    homeShort: "ARS",
    awayShort: "COV",
    projectedScore: "PRE",
    homePct: 67,
    drawPct: 20,
    awayPct: 13,
    confidence: 72,
    summary: "Premier League champions Arsenal begin their 2026/27 title defence at home to promoted Coventry City on 21 August. New-season lineups, late transfer activity and promoted-team uncertainty are the main pre-match signals.",
    bestTip: "Opening-weekend watch",
    goalsLean: "Lineup confirmation",
    btts: "Early-season variance",
    factors: ["Champions at home", "Promoted opponent", "Opening weekend", "Transfer-window context"],
    formHome: ["T", "I", "T", "L", "E"],
    formAway: ["P", "R", "O", "M", "O"],
    homeStats: ["Team: Arsenal", "Status: champions", "Venue: Emirates", "Season: 2026/27 opener"],
    awayStats: ["Team: Coventry City", "Status: promoted", "Return: top flight", "Risk: opening-day volatility"],
    quickInsightTitle: "Opening-day read",
    quickInsight: "Pre-season projections should be treated cautiously until starting elevens are confirmed. The first league weekend often carries more lineup uncertainty than later matchweeks.",
    related: [
      { id: "cincinnati-r16", home: "Cincinnati", away: "Round of 16", league: "Tennis" },
      { id: "dutch-gp", home: "Formula 1", away: "Dutch GP", league: "Formula 1" }
    ]
  },
  {
    id: "dutch-gp",
    league: "Formula 1 · Round 12",
    date: "21–23 Aug 2026",
    time: "Zandvoort",
    stadium: "Dutch Grand Prix",
    home: "Formula 1",
    away: "Netherlands GP",
    homeShort: "F1",
    awayShort: "NED",
    projectedScore: "NEXT",
    homePct: 45,
    drawPct: 18,
    awayPct: 37,
    confidence: 68,
    summary: "Formula 1 returns from its summer break at Zandvoort for the Dutch Grand Prix on 21–23 August. The key signals are post-break upgrades, qualifying track position and how quickly teams regain race-weekend rhythm.",
    bestTip: "Qualifying watch",
    goalsLean: "Post-break upgrades",
    btts: "Track-position risk",
    factors: ["Zandvoort", "Summer-break return", "Qualifying", "Upgrade packages"],
    formHome: ["R", "1", "2", "F", "1"],
    formAway: ["N", "E", "X", "T", "G"],
    homeStats: ["Category: Formula 1", "Round: 12", "Date: 21–23 Aug", "Venue: Zandvoort"],
    awayStats: ["Focus: qualifying", "Signal: upgrades", "Risk: track position", "Status: upcoming"],
    quickInsightTitle: "Zandvoort read",
    quickInsight: "A narrow circuit increases the value of qualifying and clean strategy. Post-break upgrades can also create a bigger-than-usual gap between pre-weekend expectations and actual pace.",
    related: [
      { id: "cincinnati-r16", home: "Cincinnati", away: "Round of 16", league: "Tennis" },
      { id: "premier-league-opener", home: "Arsenal", away: "Coventry City", league: "Premier League" }
    ]
  },
  {
    id: "rodri-barcelona",
    league: "Football · Confirmed Transfer",
    date: "18 Aug 2026",
    time: "Transfer desk",
    stadium: "European transfer market",
    home: "Barcelona",
    away: "Rodri",
    homeShort: "BAR",
    awayShort: "ROD",
    projectedScore: "DONE",
    homePct: 58,
    drawPct: 20,
    awayPct: 22,
    confidence: 78,
    summary: "Barcelona have completed the signing of Rodri from Manchester City. For forecasting, the move changes midfield-depth assumptions for both clubs and should be treated as confirmed rather than speculative transfer noise.",
    bestTip: "Confirmed squad change",
    goalsLean: "Midfield impact",
    btts: "Role adjustment",
    factors: ["Confirmed transfer", "Barcelona midfield", "Man City reset", "Player fitness"],
    formHome: ["S", "I", "G", "N", "D"],
    formAway: ["M", "O", "V", "E", "D"],
    homeStats: ["Club: Barcelona", "Player: Rodri", "Contract: to 2030", "Status: confirmed"],
    awayStats: ["From: Manchester City", "Role: midfield", "Impact: squad structure", "Context: transfer market"],
    quickInsightTitle: "Transfer read",
    quickInsight: "Confirmed moves belong in projections immediately, but fitness, role and minutes still need to be learned before the full performance impact is clear.",
    related: [
      { id: "premier-league-opener", home: "Arsenal", away: "Coventry City", league: "Premier League" },
      { id: "dutch-gp", home: "Formula 1", away: "Dutch GP", league: "Formula 1" }
    ]
  }
];

function normalizeAlias(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getSelectedEvent() {
  const params = new URLSearchParams(window.location.search);
  const requested = normalizeAlias(params.get("id") || params.get("match") || params.get("fixture"));

  if (!requested) return GLOBAL_MATCH_RADAR[0];

  return GLOBAL_MATCH_RADAR.find((item) => normalizeAlias(item.id) === requested) || GLOBAL_MATCH_RADAR[0];
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function setHtml(id, value) {
  const element = document.getElementById(id);
  if (element) element.innerHTML = value;
}

function setImage(id, alt) {
  const element = document.getElementById(id);
  if (!element) return;
  element.src = "assets/default.jpg";
  element.alt = alt;
}

function renderBadges(id, badges = []) {
  setHtml(id, badges.map((badge) => `<span>${badge}</span>`).join(""));
}

function renderList(id, items = []) {
  setHtml(id, items.map((item) => `<li>${item}</li>`).join(""));
}

function renderKeySignals(event) {
  setHtml("key-signal-list", `
    <div class="key-signal-item"><span>Status</span><strong>${event.league}</strong></div>
    <div class="key-signal-item"><span>Best Tip</span><strong>${event.bestTip}</strong></div>
    <div class="key-signal-item"><span>Market</span><strong>${event.goalsLean}</strong></div>
    <div class="key-signal-item"><span>Signal</span><strong>${event.btts}</strong></div>
  `);
}

function renderRelated(event) {
  const related = Array.isArray(event.related) ? event.related : [];
  setHtml("related-match-list", related.map((item) => `
    <a class="related-match-card" href="match.html?id=${encodeURIComponent(item.id)}">
      <span>${item.league}</span>
      <strong>${item.home} vs ${item.away}</strong>
    </a>
  `).join(""));
}

function renderEvent(event) {
  document.title = "World Sports Matches | Betforecast.ai";

  setText("match-league-badge", event.league);
  setText("match-title", `${event.home} vs ${event.away}`);
  setText("match-subtitle", event.summary);
  setText("match-date", event.date);
  setText("match-time", event.time);
  setText("match-stadium", event.stadium);

  setText("match-confidence-pill", `Confidence ${event.confidence}%`);
  setText("team-home-short", event.homeShort);
  setText("team-away-short", event.awayShort);
  setText("team-home-name", event.home);
  setText("team-away-name", event.away);
  setText("projected-score", event.projectedScore);

  setImage("team-home-logo", event.home);
  setImage("team-away-logo", event.away);

  setText("prob-home", `${event.homePct}%`);
  setText("prob-draw", `${event.drawPct}%`);
  setText("prob-away", `${event.awayPct}%`);
  setText("prob-home-label", `${event.homeShort} Signal`);
  setText("prob-away-label", `${event.awayShort} Signal`);

  const homeBar = document.getElementById("hero-bar-home");
  const drawBar = document.getElementById("hero-bar-draw");
  const awayBar = document.getElementById("hero-bar-away");
  if (homeBar) homeBar.style.width = `${event.homePct}%`;
  if (drawBar) drawBar.style.width = `${event.drawPct}%`;
  if (awayBar) awayBar.style.width = `${event.awayPct}%`;

  setText("match-summary", event.summary);
  setText("best-tip", event.bestTip);
  setText("goals-lean", event.goalsLean);
  setText("btts-signal", event.btts);

  setHtml("factor-tags", event.factors.map((factor) => `<span>${factor}</span>`).join(""));

  setText("form-home-title", event.home);
  setText("form-away-title", event.away);
  renderBadges("form-home-badges", event.formHome);
  renderBadges("form-away-badges", event.formAway);
  renderList("form-home-list", event.homeStats);
  renderList("form-away-list", event.awayStats);

  renderKeySignals(event);
  renderRelated(event);

  setText("quick-insight-title", event.quickInsightTitle);
  setText("quick-insight-text", event.quickInsight);
}

function loadMatchPage() {
  renderEvent(getSelectedEvent());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadMatchPage);
} else {
  loadMatchPage();
}
