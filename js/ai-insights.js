ensureSiteSkinManager();

function ensureSiteSkinManager() {
  if (document.querySelector('script[src^="/js/site-skin-manager.js"], script[src^="js/site-skin-manager.js"]')) {
    return;
  }

  const script = document.createElement("script");
  script.src = "/js/site-skin-manager.js?v=20";
  script.defer = true;
  document.head.appendChild(script);
}

function updateStaticInsightBlocks() {
  document.title = "AI Sports Insights | Betforecast.ai";

  const heroBadge = document.querySelector(".insights-hero-left .hero-badge");
  const heroTitle = document.querySelector(".insights-hero-left h1");
  const heroText = document.querySelector(".insights-hero-left p");

  if (heroBadge) heroBadge.textContent = "AI Sports Insights";
  if (heroTitle) heroTitle.textContent = "Read the signal behind every sports headline";
  if (heroText) {
    heroText.textContent = "We break global sports stories into form, calendar pressure, transfer context, live-event momentum and model risk so each page has its own category logic.";
  }

  const heroCardTitle = document.querySelector(".insights-hero-card h3");
  const heroCardText = document.querySelector(".insights-hero-card .ai-text");
  const heroCardLabel = document.querySelector(".insights-hero-card .mini-label");
  const heroCardTag = document.querySelector(".insights-hero-card .mini-tag");

  if (heroCardTitle) heroCardTitle.textContent = "F1 Hungary · DC Open · Glasgow 2026";
  if (heroCardText) heroCardText.textContent = "Race strategy, surface change and medal-table pressure are the current model signals.";
  if (heroCardLabel) heroCardLabel.textContent = "World Model View";
  if (heroCardTag) heroCardTag.textContent = "Live Radar";

  const featuredTitle = document.querySelector("#featured-insight .panel-head h2");
  if (featuredTitle) featuredTitle.textContent = "Featured World Sports Insight";

  const kicker = document.querySelector(".featured-main-card .insight-kicker");
  const match = document.querySelector(".featured-main-card h3");
  const meta = document.querySelector(".featured-main-card .featured-meta");
  const summaryTitle = document.querySelector(".insight-summary h4");
  const summaryText = document.querySelector(".insight-summary p");
  const factorTags = document.querySelector(".factor-tags");

  if (kicker) kicker.textContent = "Formula 1 · Tennis · Multi-sport";
  if (match) match.textContent = "Hungary GP + DC Open + Glasgow medal board";
  if (meta) meta.textContent = "Current sports week · 26 Jul";
  if (summaryTitle) summaryTitle.textContent = "AI Summary";
  if (summaryText) {
    summaryText.textContent = "The strongest global traffic windows are motorsport race-day decisions, tennis surface transition, cycling final results and Commonwealth Games medal events.";
  }

  if (factorTags) {
    factorTags.innerHTML = `
      <span>Race strategy</span>
      <span>Hard-court form</span>
      <span>Medal pressure</span>
      <span>Transfer volatility</span>
    `;
  }

  const modelTitle = document.querySelectorAll(".panel-head h2")[1];
  if (modelTitle) modelTitle.textContent = "How AI reads world sport";

  const cards = document.querySelectorAll(".model-card");
  const modelCopy = [
    ["Calendar", "Which events create the next audience and betting window."],
    ["Form", "Recent results, surface change, race pace and squad rhythm."],
    ["Risk", "Weather, rotation, transfer noise, travel and live-event swings."],
    ["Probability", "Readable signals, never fake certainty or guaranteed outcomes."]
  ];

  cards.forEach((card, index) => {
    const title = card.querySelector("h3");
    const text = card.querySelector("p");
    if (modelCopy[index]) {
      if (title) title.textContent = modelCopy[index][0];
      if (text) text.textContent = modelCopy[index][1];
    }
  });
}

const insightsMatches = [
  {
    league: "Formula 1",
    match: "Hungarian Grand Prix",
    summary: "Track position, tyre windows and safety-car timing are the key live levers for the race-day model.",
    tip: "Race Strategy",
    score: "Round 11"
  },
  {
    league: "Tennis",
    match: "Mubadala DC Open",
    summary: "The North American hard-court swing starts with surface adaptation and early-round volatility in focus.",
    tip: "Hard Court",
    score: "ATP/WTA 500"
  },
  {
    league: "Multi-sport",
    match: "Commonwealth Games Glasgow 2026",
    summary: "Medal finals, national interest and schedule density create daily live-result traffic until 2 August.",
    tip: "Medal Board",
    score: "Live"
  },
  {
    league: "Cycling",
    match: "Tour de France result",
    summary: "Pogacar's fifth Tour title closes a major July result window and moves cycling into archive and recap mode.",
    tip: "Result",
    score: "GC"
  },
  {
    league: "Football",
    match: "Guimaraes transfer watch",
    summary: "Midfield leadership uncertainty at Newcastle keeps the Premier League transfer board active before the opener.",
    tip: "Transfer Risk",
    score: "Developing"
  },
  {
    league: "AI Sports",
    match: "SoccerNet 2026",
    summary: "Sports video AI is moving deeper into action spotting, player tracking and explainable match understanding.",
    tip: "Model Data",
    score: "Research"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  updateStaticInsightBlocks();

  const insightsContainer = document.getElementById("insights-cards");

  if (insightsContainer) {
    insightsContainer.innerHTML = "";

    insightsMatches.forEach((item) => {
      const card = document.createElement("article");
      card.className = "insight-card";

      card.innerHTML = `
        <div class="insight-card-cover"></div>
        <div class="insight-card-body">
          <div class="league">${item.league}</div>
          <h3>${item.match}</h3>
          <p>${item.summary}</p>
          <div class="insight-card-bottom">
            <span class="insight-small-pill">${item.tip}</span>
            <span class="insight-small-score">${item.score}</span>
          </div>
        </div>
      `;

      insightsContainer.appendChild(card);
    });
  }
});