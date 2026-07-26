const GLOBAL_MATCH_RADAR = [
  {
    id: "f1-hungarian-gp",
    league: "Formula 1 · Race Day",
    date: "26 Jul 2026",
    time: "Hungaroring · Round 11",
    stadium: "Hungarian Grand Prix",
    home: "Formula 1",
    away: "Hungary GP",
    homeShort: "F1",
    awayShort: "HUN",
    projectedScore: "LIVE",
    homePct: 42,
    drawPct: 25,
    awayPct: 33,
    confidence: 71,
    summary: "Formula 1 is the lead match-page category today. The Hungarian GP is a race-day signal built around track position, tyre windows, safety-car timing and live strategy calls.",
    bestTip: "Race strategy watch",
    goalsLean: "Tyre windows",
    btts: "Live volatility",
    factors: ["Track position", "Tyre strategy", "Safety-car risk", "Race pace"],
    formHome: ["Q", "R", "S", "P", "L"],
    formAway: ["R", "T", "Y", "R", "E"],
    homeStats: ["Category: Formula 1", "Event: Hungarian GP", "Signal: race strategy", "Traffic: live result window"],
    awayStats: ["Round: 11", "Location: Hungaroring", "Focus: tyre degradation", "Risk: safety-car timing"],
    quickInsightTitle: "Race-day read",
    quickInsight: "The model cares less about headline speed and more about whether strategy can protect track position through the middle stint.",
    related: [
      { id: "dc-open", home: "Mubadala DC Open", away: "Hard court", league: "Tennis" },
      { id: "glasgow-commonwealth", home: "Glasgow 2026", away: "Medal board", league: "Multi-sport" },
      { id: "guimaraes-transfer-watch", home: "Guimaraes", away: "Transfer watch", league: "Football" }
    ]
  },
  {
    id: "dc-open",
    league: "Tennis · ATP/WTA 500",
    date: "27 Jul–2 Aug 2026",
    time: "Washington, D.C.",
    stadium: "FitzGerald Tennis Center",
    home: "DC Open",
    away: "Hard Court",
    homeShort: "DC",
    awayShort: "HC",
    projectedScore: "DRAW",
    homePct: 39,
    drawPct: 27,
    awayPct: 34,
    confidence: 66,
    summary: "The Mubadala DC Open starts the North American hard-court swing, so the match page treats surface change, travel rhythm and early-round volatility as the main tennis signals.",
    bestTip: "Hard-court form",
    goalsLean: "Draw watch",
    btts: "Volatility",
    factors: ["Surface change", "Travel recovery", "US Open build-up", "Early rounds"],
    formHome: ["H", "A", "R", "D", "C"],
    formAway: ["C", "O", "U", "R", "T"],
    homeStats: ["Category: Tennis", "Event: Mubadala DC Open", "Level: ATP/WTA 500", "Window: 27 Jul–2 Aug"],
    awayStats: ["Surface: hard court", "Signal: adaptation", "Risk: early-round upsets", "Traffic: draw updates"],
    quickInsightTitle: "Tennis read",
    quickInsight: "The useful signal is not only ranking. Surface fit and fast adaptation after travel can shift early-round probability.",
    related: [
      { id: "f1-hungarian-gp", home: "Formula 1", away: "Hungary GP", league: "Formula 1" },
      { id: "womens-open-golf", home: "Women's Open", away: "Major week", league: "Golf" }
    ]
  },
  {
    id: "glasgow-commonwealth",
    league: "Multi-sport · Glasgow 2026",
    date: "23 Jul–2 Aug 2026",
    time: "Daily medal events",
    stadium: "Glasgow, Scotland",
    home: "Commonwealth Games",
    away: "Medal Board",
    homeShort: "CWG",
    awayShort: "MED",
    projectedScore: "LIVE",
    homePct: 45,
    drawPct: 22,
    awayPct: 33,
    confidence: 68,
    summary: "Glasgow 2026 gives the page a multi-sport category: medal finals, national interest and live schedule density create daily update windows.",
    bestTip: "Medal-board traffic",
    goalsLean: "Daily finals",
    btts: "Live schedule",
    factors: ["Medal finals", "National demand", "Live schedule", "Daily recaps"],
    formHome: ["M", "E", "D", "A", "L"],
    formAway: ["B", "O", "A", "R", "D"],
    homeStats: ["Category: Multi-sport", "Event: Glasgow 2026", "Window: 23 Jul–2 Aug", "Focus: medal table"],
    awayStats: ["Traffic: daily results", "Signal: final events", "Audience: national interest", "Risk: schedule density"],
    quickInsightTitle: "Medal read",
    quickInsight: "The strongest multi-sport signal is timing: finals and medal-table movement create short, sharp traffic spikes.",
    related: [
      { id: "tour-de-france-final", home: "Tour de France", away: "Final result", league: "Cycling" },
      { id: "f1-hungarian-gp", home: "Formula 1", away: "Hungary GP", league: "Formula 1" }
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
