const GLOBAL_MATCH_RADAR = [
  {
    id: "cincinnati-qf",
    league: "Tennis · ATP/WTA 1000",
    date: "20 Aug 2026",
    time: "Quarterfinals · day/night sessions",
    stadium: "Lindner Family Tennis Center",
    home: "Cincinnati Open",
    away: "Quarterfinals",
    homeShort: "CIN",
    awayShort: "QF",
    projectedScore: "LIVE",
    homePct: 47,
    drawPct: 10,
    awayPct: 43,
    confidence: 70,
    summary: "Today’s main live sports window is the Cincinnati Open quarterfinal stage. Hard-court form, recovery between rounds and accumulated match load are the strongest tennis signals before the weekend semifinals.",
    bestTip: "Quarterfinal form",
    goalsLean: "Recovery watch",
    btts: "Match-load volatility",
    factors: ["Quarterfinals", "Hard-court form", "Recovery load", "US Open build-up"],
    formHome: ["Q", "U", "A", "R", "T"],
    formAway: ["F", "I", "N", "A", "L"],
    homeStats: ["Event: Cincinnati Open", "Level: ATP/WTA 1000", "Date: 20 Aug", "Stage: Quarterfinals"],
    awayStats: ["Surface: hard court", "Focus: recovery", "Risk: match load", "Next: semifinals"],
    quickInsightTitle: "Cincinnati read",
    quickInsight: "Quarterfinal probability can move quickly when recent three-set matches, physical issues or short turnarounds pile up. Ranking remains useful, but recovery becomes a larger input this deep in the draw.",
    related: [
      { id: "premier-league-opener", home: "Arsenal", away: "Coventry City", league: "Premier League" },
      { id: "dutch-gp", home: "Formula 1", away: "Dutch GP", league: "Formula 1" }
    ]
  },
  {
    id: "premier-league-opener",
    league: "Football · Premier League",
    date: "21 Aug 2026",
    time: "20:00 UK",
    stadium: "Emirates Stadium",
    home: "Arsenal",
    away: "Coventry City",
    homeShort: "ARS",
    awayShort: "COV",
    projectedScore: "PRE",
    homePct: 68,
    drawPct: 19,
    awayPct: 13,
    confidence: 73,
    summary: "Premier League champions Arsenal open their 2026/27 title defence at home to promoted Coventry City on Friday night. Arsenal arrive off a 3-0 Community Shield win over Manchester City, while Coventry return to the top flight after 25 years.",
    bestTip: "Opening-night watch",
    goalsLean: "Lineup confirmation",
    btts: "Early-season variance",
    factors: ["Champions at home", "Promoted opponent", "Community Shield form", "Opening weekend"],
    formHome: ["W", "I", "N", "3", "0"],
    formAway: ["P", "R", "O", "M", "O"],
    homeStats: ["Team: Arsenal", "Status: champions", "Venue: Emirates", "Last major result: 3-0 Community Shield win"],
    awayStats: ["Team: Coventry City", "Status: promoted", "Return: first top-flight season in 25 years", "Risk: opening-day volatility"],
    quickInsightTitle: "Opening-day read",
    quickInsight: "The Community Shield gives Arsenal a recent competitive reference point, but opening-weekend projections still carry extra uncertainty because promoted sides and new-season lineups can shift quickly.",
    related: [
      { id: "cincinnati-qf", home: "Cincinnati", away: "Quarterfinals", league: "Tennis" },
      { id: "dutch-gp", home: "Formula 1", away: "Dutch GP", league: "Formula 1" }
    ]
  },
  {
    id: "dutch-gp",
    league: "Formula 1 · Round 12",
    date: "21–23 Aug 2026",
    time: "Sprint weekend · Zandvoort",
    stadium: "Dutch Grand Prix",
    home: "Formula 1",
    away: "Netherlands GP",
    homeShort: "F1",
    awayShort: "NED",
    projectedScore: "NEXT",
    homePct: 46,
    drawPct: 16,
    awayPct: 38,
    confidence: 69,
    summary: "Formula 1 returns from its summer break at Zandvoort for a sprint weekend. Track position is especially valuable on the narrow circuit, while Red Bull must also absorb a late driver change after Isack Hadjar was ruled out with a wrist injury and Liam Lawson stepped in.",
    bestTip: "Qualifying watch",
    goalsLean: "Sprint-weekend pace",
    btts: "Track-position risk",
    factors: ["Zandvoort", "Sprint format", "Hadjar out", "Lawson steps in"],
    formHome: ["R", "1", "2", "F", "1"],
    formAway: ["N", "E", "X", "T", "G"],
    homeStats: ["Category: Formula 1", "Round: 12", "Date: 21–23 Aug", "Venue: Zandvoort"],
    awayStats: ["Format: sprint weekend", "Driver change: Lawson for Hadjar", "Focus: qualifying", "Risk: overtaking difficulty"],
    quickInsightTitle: "Zandvoort read",
    quickInsight: "Zandvoort rewards qualifying position and clean execution. The sprint format reduces practice time, so any upgrade package or late driver change carries more uncertainty than on a standard weekend.",
    related: [
      { id: "cincinnati-qf", home: "Cincinnati", away: "Quarterfinals", league: "Tennis" },
      { id: "premier-league-opener", home: "Arsenal", away: "Coventry City", league: "Premier League" }
    ]
  },
  {
    id: "hadjar-lawson",
    league: "Formula 1 · Driver Update",
    date: "19 Aug 2026",
    time: "Dutch GP paddock",
    stadium: "Zandvoort",
    home: "Red Bull",
    away: "Liam Lawson",
    homeShort: "RBR",
    awayShort: "LAW",
    projectedScore: "CONF",
    homePct: 50,
    drawPct: 20,
    awayPct: 30,
    confidence: 80,
    summary: "Red Bull confirmed Liam Lawson will replace the injured Isack Hadjar for the Dutch Grand Prix. Yuki Tsunoda will fill Lawson’s Racing Bulls seat, creating a late lineup change across both teams before a compressed sprint weekend.",
    bestTip: "Driver-change watch",
    goalsLean: "Adaptation risk",
    btts: "Practice-time pressure",
    factors: ["Hadjar wrist injury", "Lawson to Red Bull", "Tsunoda to Racing Bulls", "Sprint weekend"],
    formHome: ["C", "H", "A", "N", "G"],
    formAway: ["L", "A", "W", "S", "N"],
    homeStats: ["Team: Red Bull", "Regular driver: Isack Hadjar", "Replacement: Liam Lawson", "Status: confirmed"],
    awayStats: ["Racing Bulls replacement: Yuki Tsunoda", "Venue: Zandvoort", "Format: sprint", "Risk: limited preparation"],
    quickInsightTitle: "Driver-change read",
    quickInsight: "A driver swap on a sprint weekend matters more because there is less practice time before competitive sessions. Adaptation and setup feedback become immediate forecasting inputs.",
    related: [
      { id: "dutch-gp", home: "Formula 1", away: "Dutch GP", league: "Formula 1" },
      { id: "premier-league-opener", home: "Arsenal", away: "Coventry City", league: "Premier League" }
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
