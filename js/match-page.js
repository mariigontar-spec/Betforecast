const urlParams = new URLSearchParams(window.location.search);
const game = urlParams.get("game");

const matches = {
  mci_ars: {
    league: "Premier League",
    home: "Man City",
    away: "Arsenal",
    homeShort: "MCI",
    awayShort: "ARS",
    date: "Sunday",
    time: "17:30",
    stadium: "Etihad Stadium",
    projectedScore: "2 - 2",
    probs: [54, 24, 22],
    confidence: 78,
    summary:
      "Man City projects stronger territorial control and sustained pressure phases, while Arsenal still carries enough quality in transition and set-piece moments to keep the match balanced.",
    factors: ["Territory control", "Shot volume edge", "Arsenal transition threat", "Draw remains live"],
    bestTip: "Over 2.5",
    goalsLean: "Over 2.5",
    btts: "Live",
    xg: [2.1, 2.3],
    shots: [16.2, 12.4],
    possession: ["59%", "41%"],
    formHome: ["W", "W", "D", "W", "W"],
    formAway: ["W", "D", "W", "L", "W"],
    homeStats: ["xG trend: +0.52", "Goals last 5: 11", "Conceded last 5: 4", "Possession avg: 59%"],
    awayStats: ["xG trend: +0.21", "Goals last 5: 8", "Conceded last 5: 5", "Possession avg: 53%"],
    quickInsight:
      "If Arsenal survives the first pressure wave and keeps the score level into the second half, the draw path grows materially.",
    timeline: [
      { minute: "0-15", text: "Man City likely dominates territory early with high possession and aggressive wing occupation." },
      { minute: "15-35", text: "Arsenal’s transition routes and second-ball moments start to become a real threat." },
      { minute: "35-60", text: "This is the most balanced phase, where xG accumulation could rise for both sides." },
      { minute: "60-90", text: "If level late, draw probability strengthens, but City still carries more closing pressure." }
    ]
  },

  rm_bar: {
    league: "La Liga",
    home: "Real Madrid",
    away: "Barcelona",
    homeShort: "RMA",
    awayShort: "BAR",
    date: "Saturday",
    time: "21:00",
    stadium: "Santiago Bernabéu",
    projectedScore: "1 - 1",
    probs: [32, 46, 22],
    confidence: 71,
    summary:
      "The model sees a balanced match with neither side holding a decisive edge in chance repeatability. Midfield control and first-goal timing may define the entire rhythm.",
    factors: ["Balanced midfield", "Lower separation", "Draw-heavy model", "First-goal sensitivity"],
    bestTip: "BTTS",
    goalsLean: "Under 3.5",
    btts: "Live",
    xg: [1.4, 1.3],
    shots: [11.1, 10.8],
    possession: ["51%", "49%"],
    formHome: ["W", "D", "W", "W", "L"],
    formAway: ["W", "W", "D", "L", "W"],
    homeStats: ["xG trend: +0.18", "Goals last 5: 7", "Conceded last 5: 4", "Possession avg: 54%"],
    awayStats: ["xG trend: +0.12", "Goals last 5: 8", "Conceded last 5: 5", "Possession avg: 58%"],
    quickInsight:
      "A first-half goal changes everything here. Without it, the model naturally drifts toward a lower-event draw profile.",
    timeline: [
      { minute: "0-20", text: "Expect patient circulation and fewer defensive gambles from both sides." },
      { minute: "20-45", text: "Barcelona may edge possession, while Madrid remains dangerous in direct transitional moments." },
      { minute: "45-70", text: "This stretch likely determines whether the game opens or stays tactically compressed." },
      { minute: "70-90", text: "If still level, draw stability increases sharply." }
    ]
  },

  liv_tot: {
    league: "Premier League",
    home: "Liverpool",
    away: "Tottenham",
    homeShort: "LIV",
    awayShort: "TOT",
    date: "Sunday",
    time: "16:00",
    stadium: "Anfield",
    projectedScore: "2 - 1",
    probs: [48, 28, 24],
    confidence: 76,
    summary:
      "Liverpool carries the better pressing profile and shot volume projection, but Tottenham remains dangerous whenever the game breaks into open spaces.",
    factors: ["Press edge", "Anfield factor", "Spurs transition risk", "Goals profile active"],
    bestTip: "Home Win",
    goalsLean: "Over 2.5",
    btts: "Live",
    xg: [1.8, 1.2],
    shots: [15.1, 10.7],
    possession: ["57%", "43%"],
    formHome: ["W", "W", "W", "D", "L"],
    formAway: ["W", "L", "W", "D", "W"],
    homeStats: ["xG trend: +0.36", "Goals last 5: 10", "Conceded last 5: 5", "Possession avg: 57%"],
    awayStats: ["xG trend: +0.09", "Goals last 5: 8", "Conceded last 5: 7", "Possession avg: 47%"],
    quickInsight:
      "The more chaotic the game gets, the more Tottenham stays alive. Liverpool prefers repeat pressure and territory.",
    timeline: [
      { minute: "0-15", text: "Liverpool likely starts fast with pressing and higher box occupation." },
      { minute: "15-35", text: "Tottenham’s best route is breaking first pressure and attacking the wide channels." },
      { minute: "35-65", text: "Game state may open here, increasing BTTS and Over 2.5 value." },
      { minute: "65-90", text: "Liverpool’s home pressure gives them the stronger late-game lean." }
    ]
  },

  psg_lyo: {
    league: "Ligue 1",
    home: "PSG",
    away: "Lyon",
    homeShort: "PSG",
    awayShort: "LYO",
    date: "Friday",
    time: "20:45",
    stadium: "Parc des Princes",
    projectedScore: "3 - 1",
    probs: [61, 21, 18],
    confidence: 82,
    summary:
      "PSG rates clearly higher in possession control, final-third quality, and expected goal output, especially in a home game with sustained pressure phases.",
    factors: ["Possession dominance", "Higher xG", "Home quality gap", "Lyon upset route is narrow"],
    bestTip: "Over 2.5",
    goalsLean: "Over 2.5",
    btts: "Weak",
    xg: [2.4, 0.9],
    shots: [17.4, 8.2],
    possession: ["63%", "37%"],
    formHome: ["W", "W", "W", "W", "D"],
    formAway: ["L", "W", "D", "L", "W"],
    homeStats: ["xG trend: +0.63", "Goals last 5: 13", "Conceded last 5: 3", "Possession avg: 62%"],
    awayStats: ["xG trend: -0.04", "Goals last 5: 6", "Conceded last 5: 8", "Possession avg: 46%"],
    quickInsight:
      "Unless Lyon scores first or turns the game transitional early, PSG should control the majority of the match script.",
    timeline: [
      { minute: "0-20", text: "PSG likely establishes possession control and territorial pressure quickly." },
      { minute: "20-45", text: "Lyon’s best survival path is compact shape and limiting second-wave shots." },
      { minute: "45-70", text: "If PSG scores first, the model widens hard toward home win." },
      { minute: "70-90", text: "Late phases favor PSG even more if Lyon chases." }
    ]
  }
};

const relatedMatches = [
  { id: "mci_ars", title: "Man City vs Arsenal", meta: "Premier League" },
  { id: "rm_bar", title: "Real Madrid vs Barcelona", meta: "La Liga" },
  { id: "liv_tot", title: "Liverpool vs Tottenham", meta: "Premier League" },
  { id: "psg_lyo", title: "PSG vs Lyon", meta: "Ligue 1" }
];

const match = matches[game] || matches["mci_ars"];

// top hero
document.getElementById("match-league-badge").innerText = match.league;
document.getElementById("match-title").innerText = `${match.home} vs ${match.away}`;
document.getElementById("match-subtitle").innerText = `AI-powered preview with probability, projected score, xG lean, game-state risk, and form comparison for ${match.home} vs ${match.away}.`;
document.getElementById("match-date").innerText = match.date;
document.getElementById("match-time").innerText = match.time;
document.getElementById("match-stadium").innerText = match.stadium;

// right score card
document.getElementById("match-confidence-pill").innerText = `Confidence ${match.confidence}%`;
document.getElementById("team-home-short").innerText = match.homeShort;
document.getElementById("team-away-short").innerText = match.awayShort;
document.getElementById("team-home-name").innerText = match.home;
document.getElementById("team-away-name").innerText = match.away;
document.getElementById("projected-score").innerText = match.projectedScore;

document.getElementById("prob-home").innerText = `${match.probs[0]}%`;
document.getElementById("prob-draw").innerText = `${match.probs[1]}%`;
document.getElementById("prob-away").innerText = `${match.probs[2]}%`;
document.getElementById("prob-home-label").innerText = `${match.home} Win`;
document.getElementById("prob-away-label").innerText = `${match.away} Win`;

document.getElementById("hero-bar-home").style.width = `${match.probs[0]}%`;
document.getElementById("hero-bar-draw").style.width = `${match.probs[1]}%`;
document.getElementById("hero-bar-away").style.width = `${match.probs[2]}%`;

// core
document.getElementById("match-summary").innerText = match.summary;
document.getElementById("best-tip").innerText = match.bestTip;
document.getElementById("goals-lean").innerText = match.goalsLean;
document.getElementById("btts-signal").innerText = match.btts;

// factors
const factorTags = document.getElementById("factor-tags");
factorTags.innerHTML = "";
match.factors.forEach((factor) => {
  const span = document.createElement("span");
  span.innerText = factor;
  factorTags.appendChild(span);
});

// stats
document.getElementById("xg-home-team").innerText = match.home;
document.getElementById("xg-away-team").innerText = match.away;
document.getElementById("shots-home-team").innerText = match.home;
document.getElementById("shots-away-team").innerText = match.away;
document.getElementById("pos-home-team").innerText = match.home;
document.getElementById("pos-away-team").innerText = match.away;

document.getElementById("xg-home").innerText = match.xg[0];
document.getElementById("xg-away").innerText = match.xg[1];
document.getElementById("shots-home").innerText = match.shots[0];
document.getElementById("shots-away").innerText = match.shots[1];
document.getElementById("pos-home").innerText = match.possession[0];
document.getElementById("pos-away").innerText = match.possession[1];

document.getElementById("confidence-fill").style.width = `${match.confidence}%`;
document.getElementById("confidence-value").innerText = `${match.confidence}%`;

// form
document.getElementById("form-home-title").innerText = match.home;
document.getElementById("form-away-title").innerText = match.away;

const formHomeBadges = document.getElementById("form-home-badges");
const formAwayBadges = document.getElementById("form-away-badges");
formHomeBadges.innerHTML = "";
formAwayBadges.innerHTML = "";

function createFormBadge(value) {
  const span = document.createElement("span");
  span.innerText = value;
  if (value === "W") span.className = "form-win";
  else if (value === "D") span.className = "form-draw";
  else span.className = "form-loss";
  return span;
}

match.formHome.forEach((item) => formHomeBadges.appendChild(createFormBadge(item)));
match.formAway.forEach((item) => formAwayBadges.appendChild(createFormBadge(item)));

const formHomeList = document.getElementById("form-home-list");
const formAwayList = document.getElementById("form-away-list");
formHomeList.innerHTML = "";
formAwayList.innerHTML = "";

match.homeStats.forEach((item) => {
  const li = document.createElement("li");
  li.innerHTML = item.replace(": ", ": <strong>") + "</strong>";
  formHomeList.appendChild(li);
});

match.awayStats.forEach((item) => {
  const li = document.createElement("li");
  li.innerHTML = item.replace(": ", ": <strong>") + "</strong>";
  formAwayList.appendChild(li);
});

// quick insight
document.getElementById("quick-insight-text").innerText = match.quickInsight;

// timeline
const timelineList = document.getElementById("timeline-list");
timelineList.innerHTML = "";
match.timeline.forEach((item) => {
  const row = document.createElement("div");
  row.className = "timeline-item";
  row.innerHTML = `
    <div class="timeline-minute">${item.minute}</div>
    <div class="timeline-text">${item.text}</div>
  `;
  timelineList.appendChild(row);
});

// key signals
const keySignals = document.getElementById("key-signal-list");
keySignals.innerHTML = "";
[
  ["Best Tip", match.bestTip],
  ["Goals Lean", match.goalsLean],
  ["BTTS", match.btts],
  ["Model Confidence", `${match.confidence}%`]
].forEach(([label, value]) => {
  const row = document.createElement("div");
  row.className = "key-signal-item";
  row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  keySignals.appendChild(row);
});

// related
const relatedList = document.getElementById("related-match-list");
relatedList.innerHTML = "";
relatedMatches
  .filter((item) => item.id !== (game || "mci_ars"))
  .forEach((item) => {
    const a = document.createElement("a");
    a.className = "related-match-item";
    a.href = `match.html?game=${item.id}`;
    a.innerHTML = `<strong>${item.title}</strong><span>${item.meta}</span>`;
    relatedList.appendChild(a);
  });
