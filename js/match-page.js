const GLOBAL_MATCH_RADAR = [
  {
    id: "hull-man-utd",
    league: "Football · Premier League",
    date: "22 Aug 2026",
    time: "12:30 UK",
    stadium: "MKM Stadium",
    home: "Hull City",
    away: "Manchester United",
    homeShort: "HUL",
    awayShort: "MUN",
    projectedScore: "PRE",
    homePct: 26,
    drawPct: 27,
    awayPct: 47,
    confidence: 64,
    summary: "Premier League Saturday opens with promoted Hull City hosting Manchester United. Early-season uncertainty remains high, so confirmed lineups, United's attacking availability and Hull's home intensity are the main late inputs.",
    bestTip: "Lineup watch",
    goalsLean: "Early-season variance",
    btts: "Transition risk",
    factors: ["Promoted Hull", "United away opener", "12:30 kickoff", "Fresh lineups"],
    formHome: ["P", "R", "O", "M", "O"],
    formAway: ["O", "P", "E", "N", "R"],
    homeStats: ["Team: Hull City", "Status: promoted", "Venue: MKM Stadium", "Kick-off: 12:30 UK"],
    awayStats: ["Team: Manchester United", "Round: Matchweek 1", "Focus: attacking lineup", "Risk: opening-day volatility"],
    quickInsightTitle: "Saturday opener read",
    quickInsight: "Opening-week models have less reliable in-season form, so lineup continuity, promoted-team intensity and game-state reaction deserve extra weight.",
    related: [
      { id: "brentford-spurs", home: "Brentford", away: "Tottenham", league: "Premier League" },
      { id: "dutch-gp-saturday", home: "Dutch GP", away: "Sprint", league: "Formula 1" },
      { id: "cincinnati-semifinals", home: "Cincinnati", away: "Semifinals", league: "Tennis" }
    ]
  },
  {
    id: "brentford-spurs",
    league: "Football · Premier League",
    date: "22 Aug 2026",
    time: "17:30 UK",
    stadium: "Gtech Community Stadium",
    home: "Brentford",
    away: "Tottenham Hotspur",
    homeShort: "BRE",
    awayShort: "TOT",
    projectedScore: "PRE",
    homePct: 35,
    drawPct: 29,
    awayPct: 36,
    confidence: 61,
    summary: "Brentford host Tottenham in Saturday's late Premier League game. Tottenham enter with attacking availability concerns, while Brentford's home pressure and transition threat make this one of the tighter opening-week signals.",
    bestTip: "Late-game watch",
    goalsLean: "Transition chances",
    btts: "Live",
    factors: ["Brentford home edge", "Spurs attacking absences", "Late kickoff", "Transition game"],
    formHome: ["H", "O", "M", "E", "1"],
    formAway: ["A", "W", "A", "Y", "1"],
    homeStats: ["Team: Brentford", "Venue: Gtech Community Stadium", "Kick-off: 17:30 UK", "Focus: home pressure"],
    awayStats: ["Team: Tottenham", "Round: Matchweek 1", "Focus: attacking availability", "Risk: late transitions"],
    quickInsightTitle: "Late-kickoff read",
    quickInsight: "If Tottenham's available front line lacks continuity, Brentford's compact home structure can keep the match balanced deeper into the second half.",
    related: [
      { id: "hull-man-utd", home: "Hull City", away: "Manchester United", league: "Premier League" },
      { id: "dutch-gp-saturday", home: "Dutch GP", away: "Sprint", league: "Formula 1" }
    ]
  },
  {
    id: "dutch-gp-saturday",
    league: "Formula 1 · Dutch Grand Prix",
    date: "22 Aug 2026",
    time: "Sprint 12:00 · Qualifying 16:00 local",
    stadium: "Circuit Zandvoort",
    home: "George Russell",
    away: "Sprint Pole",
    homeShort: "RUS",
    awayShort: "SPR",
    projectedScore: "LIVE",
    homePct: 42,
    drawPct: 19,
    awayPct: 39,
    confidence: 70,
    summary: "George Russell starts the Dutch Grand Prix sprint from pole after edging Lando Norris by 0.041 seconds. The sprint is followed by qualifying for Sunday's Grand Prix, making track position, tyre life and clean execution the key Saturday signals.",
    bestTip: "Sprint start watch",
    goalsLean: "Track position",
    btts: "Qualifying swing",
    factors: ["Russell on sprint pole", "Norris P2", "Zandvoort passing limits", "Qualifying later today"],
    formHome: ["P", "O", "L", "E", "1"],
    formAway: ["S", "P", "R", "I", "N"],
    homeStats: ["Driver: George Russell", "Sprint grid: P1", "Margin to Norris: 0.041s", "Sprint: 12:00 local"],
    awayStats: ["Grand Prix qualifying: 16:00 local", "Venue: Zandvoort", "Format: sprint weekend", "Risk: track position"],
    quickInsightTitle: "Zandvoort Saturday read",
    quickInsight: "At a circuit where overtaking is difficult, a clean sprint launch and qualifying execution can matter more than raw long-run pace.",
    related: [
      { id: "hull-man-utd", home: "Hull City", away: "Manchester United", league: "Premier League" },
      { id: "cincinnati-semifinals", home: "Cincinnati", away: "Semifinals", league: "Tennis" }
    ]
  },
  {
    id: "cincinnati-semifinals",
    league: "Tennis · ATP/WTA 1000",
    date: "22 Aug 2026",
    time: "Semifinals · day/night sessions",
    stadium: "Lindner Family Tennis Center",
    home: "Cincinnati Open",
    away: "Semifinals",
    homeShort: "CIN",
    awayShort: "SF",
    projectedScore: "LIVE",
    homePct: 48,
    drawPct: 8,
    awayPct: 44,
    confidence: 69,
    summary: "Cincinnati reaches its singles semifinals today. Jessica Pegula faces Iga Swiatek, while Flavio Cobolli meets Arthur Fils in the men's draw. Recovery, serve efficiency and physical load are now more important than ranking alone.",
    bestTip: "Semifinal form",
    goalsLean: "Recovery load",
    btts: "Serve-return balance",
    factors: ["Pegula vs Swiatek", "Cobolli vs Fils", "Hard-court form", "Finals on 23 Aug"],
    formHome: ["S", "E", "M", "I", "S"],
    formAway: ["F", "I", "N", "A", "L"],
    homeStats: ["Event: Cincinnati Open", "Level: ATP/WTA 1000", "Date: 22 Aug", "Stage: Semifinals"],
    awayStats: ["Surface: hard court", "Finals: 23 Aug", "Focus: recovery", "Risk: accumulated match load"],
    quickInsightTitle: "Cincinnati semifinal read",
    quickInsight: "At this stage the useful signal is often physical: match duration, recent recovery and first-serve efficiency can outweigh seed number.",
    related: [
      { id: "hull-man-utd", home: "Hull City", away: "Manchester United", league: "Premier League" },
      { id: "dutch-gp-saturday", home: "Dutch GP", away: "Sprint", league: "Formula 1" }
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
