const GLOBAL_MATCH_RADAR = [
  {
    id: "tdff-ventoux",
    league: "Cycling · Tour de France Femmes",
    date: "7 Aug 2026",
    time: "Stage 7 · Queen stage",
    stadium: "Mont Ventoux",
    home: "Marlen Reusser",
    away: "Demi Vollering",
    homeShort: "MR",
    awayShort: "DV",
    projectedScore: "12s",
    homePct: 51,
    drawPct: 8,
    awayPct: 41,
    confidence: 74,
    summary: "Today’s lead sports signal is the Tour de France Femmes queen stage to Mont Ventoux. Reusser starts with a narrow GC advantage over Vollering, so climbing form, heat, pacing and late-stage attacks matter more than headline reputation.",
    bestTip: "GC battle watch",
    goalsLean: "Mountain stage",
    btts: "High volatility",
    factors: ["12-second GC gap", "Mont Ventoux", "Heat", "Climbing form"],
    formHome: ["G", "C", "L", "E", "A"],
    formAway: ["C", "L", "I", "M", "B"],
    homeStats: ["Leader: Marlen Reusser", "Gap: 12 seconds", "Stage: Mont Ventoux", "Signal: defend yellow"],
    awayStats: ["Challenger: Demi Vollering", "Terrain: decisive climb", "Signal: attack window", "Risk: late-stage pacing"],
    quickInsightTitle: "Ventoux read",
    quickInsight: "A 12-second lead is tiny on a summit finish. The decisive signal is whether the GC contenders can isolate one another before the steepest final kilometres.",
    related: [
      { id: "canada-tennis", home: "ATP Montreal", away: "WTA Toronto", league: "Tennis" },
      { id: "wyndham-championship", home: "Wyndham", away: "Round 2", league: "Golf" },
      { id: "premier-league-transfer-window", home: "Premier League", away: "Transfer watch", league: "Football" }
    ]
  },
  {
    id: "canada-tennis",
    league: "Tennis · ATP/WTA 1000",
    date: "3–9 Aug 2026",
    time: "Canada · hard court",
    stadium: "Montreal / Toronto",
    home: "ATP Montreal",
    away: "WTA Toronto",
    homeShort: "ATP",
    awayShort: "WTA",
    projectedScore: "LIVE",
    homePct: 46,
    drawPct: 12,
    awayPct: 42,
    confidence: 69,
    summary: "The National Bank Open is the main tennis window today. Hard-court adaptation, recovery between rounds and the build-up to the US Open are the key signals across Montreal and Toronto.",
    bestTip: "Hard-court form",
    goalsLean: "Recovery watch",
    btts: "Draw volatility",
    factors: ["Hard-court form", "Recovery", "Travel load", "US Open build-up"],
    formHome: ["H", "A", "R", "D", "C"],
    formAway: ["F", "O", "R", "M", "S"],
    homeStats: ["Category: ATP 1000", "Location: Montreal", "Surface: hard", "Window: 3–9 Aug"],
    awayStats: ["Category: WTA 1000", "Location: Toronto", "Surface: hard", "Signal: late-round form"],
    quickInsightTitle: "Canada tennis read",
    quickInsight: "Ranking alone is not enough this week. Recovery, surface rhythm and recent match load can move probabilities sharply between rounds.",
    related: [
      { id: "tdff-ventoux", home: "Tour Femmes", away: "Mont Ventoux", league: "Cycling" },
      { id: "wyndham-championship", home: "Wyndham", away: "Round 2", league: "Golf" }
    ]
  },
  {
    id: "wyndham-championship",
    league: "Golf · PGA Tour",
    date: "6–9 Aug 2026",
    time: "Round 2 · Friday",
    stadium: "Sedgefield Country Club",
    home: "Wyndham Championship",
    away: "Cut Line",
    homeShort: "PGA",
    awayShort: "CUT",
    projectedScore: "R2",
    homePct: 44,
    drawPct: 18,
    awayPct: 38,
    confidence: 65,
    summary: "Friday’s Wyndham Championship round is a useful golf traffic window because the cut line, scoring conditions and weekend position all become clearer during round two.",
    bestTip: "Cut-line watch",
    goalsLean: "Round 2 scoring",
    btts: "Weather risk",
    factors: ["Cut line", "Round 2 scoring", "Tee-time wave", "Weekend position"],
    formHome: ["R", "O", "U", "N", "D"],
    formAway: ["C", "U", "T", "L", "N"],
    homeStats: ["Category: PGA Tour", "Venue: Sedgefield", "Round: 2", "Window: 6–9 Aug"],
    awayStats: ["Signal: cut line", "Focus: scoring", "Risk: tee-time conditions", "Traffic: Friday live"],
    quickInsightTitle: "Golf read",
    quickInsight: "The strongest Friday signal is not the final winner yet. It is who is gaining strokes consistently enough to survive the cut and carry position into the weekend.",
    related: [
      { id: "tdff-ventoux", home: "Tour Femmes", away: "Mont Ventoux", league: "Cycling" },
      { id: "canada-tennis", home: "ATP Montreal", away: "WTA Toronto", league: "Tennis" }
    ]
  },
  {
    id: "premier-league-transfer-window",
    league: "Football · Premier League",
    date: "7 Aug 2026",
    time: "Transfer desk",
    stadium: "Summer transfer window",
    home: "Premier League",
    away: "Transfer Watch",
    homeShort: "PL",
    awayShort: "TR",
    projectedScore: "LIVE",
    homePct: 48,
    drawPct: 22,
    awayPct: 30,
    confidence: 62,
    summary: "Premier League transfer activity remains the main football news signal today. Confirmed deals, contract decisions and squad trimming can change early-season projections before the league starts.",
    bestTip: "Squad-depth watch",
    goalsLean: "Confirmed deals",
    btts: "Market volatility",
    factors: ["Confirmed transfers", "Squad depth", "Pre-season roles", "Contract news"],
    formHome: ["S", "Q", "U", "A", "D"],
    formAway: ["M", "A", "R", "K", "T"],
    homeStats: ["Category: Football", "Window: summer market", "Focus: confirmed moves", "Signal: squad strength"],
    awayStats: ["Risk: rumours", "Context: pre-season", "Deadline: September", "Traffic: developing news"],
    quickInsightTitle: "Transfer read",
    quickInsight: "For forecasting, confirmed squad changes matter far more than rumours. Minutes, roles and depth should be updated only after a move is official.",
    related: [
      { id: "tdff-ventoux", home: "Tour Femmes", away: "Mont Ventoux", league: "Cycling" },
      { id: "canada-tennis", home: "ATP Montreal", away: "WTA Toronto", league: "Tennis" }
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
