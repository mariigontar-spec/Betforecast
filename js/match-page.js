const GLOBAL_MATCH_RADAR = [
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
    summary: "Premier League champions Arsenal open the 2026/27 season at home to promoted Coventry City tonight. Arsenal begin their title defence against a Coventry side returning to the top flight after 25 years, making confirmed lineups and opening-night intensity the biggest late inputs.",
    bestTip: "Opening-night watch",
    goalsLean: "Lineup confirmation",
    btts: "Early-season variance",
    factors: ["Champions at home", "Coventry promoted", "Opening night", "Fresh lineups"],
    formHome: ["T", "I", "T", "L", "E"],
    formAway: ["P", "R", "O", "M", "O"],
    homeStats: ["Team: Arsenal", "Status: defending champions", "Venue: Emirates Stadium", "Kick-off: 20:00 UK"],
    awayStats: ["Team: Coventry City", "Status: promoted", "Top-flight return: 25 years", "Manager: Frank Lampard"],
    quickInsightTitle: "Opening-night read",
    quickInsight: "Opening-round forecasts carry more uncertainty than established-season models. Confirmed lineups, promoted-team intensity and early tactical choices can move the signal sharply before kick-off.",
    related: [
      { id: "dutch-gp", home: "Formula 1", away: "Dutch GP", league: "Formula 1" },
      { id: "cincinnati-qf", home: "Cincinnati", away: "Quarterfinals", league: "Tennis" }
    ]
  },
  {
    id: "dutch-gp",
    league: "Formula 1 · Round 12",
    date: "21–23 Aug 2026",
    time: "FP1 12:30 · Sprint Qualifying 16:30 local",
    stadium: "Circuit Zandvoort",
    home: "Formula 1",
    away: "Netherlands GP",
    homeShort: "F1",
    awayShort: "NED",
    projectedScore: "LIVE",
    homePct: 46,
    drawPct: 16,
    awayPct: 38,
    confidence: 69,
    summary: "The Dutch Grand Prix sprint weekend begins today at Zandvoort. Formula 1 has only one practice session before sprint qualifying, so track position, setup speed and clean execution carry extra weight on the narrow circuit.",
    bestTip: "Qualifying watch",
    goalsLean: "Sprint-weekend pace",
    btts: "Track-position risk",
    factors: ["Zandvoort", "Sprint format", "One practice session", "Track position"],
    formHome: ["F", "P", "1", "S", "Q"],
    formAway: ["Z", "A", "N", "D", "V"],
    homeStats: ["Category: Formula 1", "Round: 12", "Date: 21–23 Aug", "FP1: 12:30 local"],
    awayStats: ["Sprint qualifying: 16:30 local", "Sprint: 22 Aug", "Grand Prix: 23 Aug", "Venue: Zandvoort"],
    quickInsightTitle: "Zandvoort read",
    quickInsight: "A sprint weekend compresses setup work. At Zandvoort, where passing can be difficult, early confidence and qualifying position matter more than at many standard race weekends.",
    related: [
      { id: "premier-league-opener", home: "Arsenal", away: "Coventry City", league: "Premier League" },
      { id: "cincinnati-qf", home: "Cincinnati", away: "Quarterfinals", league: "Tennis" }
    ]
  },
  {
    id: "cincinnati-qf",
    league: "Tennis · ATP/WTA 1000",
    date: "21 Aug 2026",
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
    summary: "Cincinnati continues with quarterfinal sessions today. Recent upsets have increased draw volatility, while recovery, hard-court efficiency and the physical cost of long matches become more important as the tournament reaches its final weekend.",
    bestTip: "Quarterfinal form",
    goalsLean: "Recovery watch",
    btts: "Draw volatility",
    factors: ["Quarterfinals", "Hard-court form", "Recovery load", "US Open build-up"],
    formHome: ["Q", "U", "A", "R", "T"],
    formAway: ["F", "I", "N", "A", "L"],
    homeStats: ["Event: Cincinnati Open", "Level: ATP/WTA 1000", "Date: 21 Aug", "Stage: Quarterfinals"],
    awayStats: ["Surface: hard court", "Next: semifinals", "Focus: recovery", "Risk: accumulated match load"],
    quickInsightTitle: "Cincinnati read",
    quickInsight: "At this stage ranking alone is not enough. Match duration, recent physical load and serve-return efficiency can change the outlook from one session to the next.",
    related: [
      { id: "premier-league-opener", home: "Arsenal", away: "Coventry City", league: "Premier League" },
      { id: "dutch-gp", home: "Formula 1", away: "Dutch GP", league: "Formula 1" }
    ]
  },
  {
    id: "premier-league-weekend",
    league: "Football · Premier League",
    date: "22–24 Aug 2026",
    time: "Matchweek 1",
    stadium: "England",
    home: "Premier League",
    away: "Opening Weekend",
    homeShort: "PL",
    awayShort: "MW1",
    projectedScore: "NEXT",
    homePct: 44,
    drawPct: 27,
    awayPct: 29,
    confidence: 65,
    summary: "Opening weekend continues after Arsenal-Coventry with Hull vs Manchester United, Brentford vs Tottenham, Manchester City vs Bournemouth, Newcastle vs Liverpool and Fulham vs Chelsea among the key fixtures.",
    bestTip: "Matchweek 1 watch",
    goalsLean: "New-season lineups",
    btts: "Manager-change variance",
    factors: ["New managers", "Promoted clubs", "Fresh squads", "Opening weekend"],
    formHome: ["M", "W", "1", "2", "6"],
    formAway: ["O", "P", "E", "N", "R"],
    homeStats: ["Window: 22–24 Aug", "League: Premier League", "Round: Matchweek 1", "Focus: opening fixtures"],
    awayStats: ["Promoted clubs active", "Several new managers", "Squad changes", "High early-season uncertainty"],
    quickInsightTitle: "Matchweek read",
    quickInsight: "The first round has fewer reliable in-season form inputs, so lineup continuity, coaching changes and promoted-team adaptation deserve more weight than usual.",
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
