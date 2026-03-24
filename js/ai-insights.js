const insightsMatches = [
  {
    league: "Premier League",
    match: "Liverpool vs Tottenham",
    summary: "Liverpool carries stronger shot volume, but Tottenham still projects enough transition threat to keep BTTS alive.",
    tip: "BTTS",
    score: "2-1"
  },
  {
    league: "La Liga",
    match: "Real Madrid vs Barcelona",
    summary: "The model sees balance in central control and chance quality, making the draw a live probability rather than a fallback.",
    tip: "Draw Lean",
    score: "1-1"
  },
  {
    league: "Serie A",
    match: "Napoli vs AC Milan",
    summary: "Napoli’s recent attacking rhythm and stronger home pressure produce a cleaner edge in the final third.",
    tip: "Home Win",
    score: "2-1"
  },
  {
    league: "Bundesliga",
    match: "Bayern vs Dortmund",
    summary: "Open-game profile, high pace, and repeated xG spikes suggest a goals-heavy matchup with both teams landing chances.",
    tip: "Over 2.5",
    score: "3-2"
  },
  {
    league: "Ligue 1",
    match: "PSG vs Marseille",
    summary: "PSG rates better in possession control and expected shot quality, but Marseille can distort game state with aggressive pressing.",
    tip: "Home Lean",
    score: "2-1"
  },
  {
    league: "Champions League",
    match: "Inter vs Atletico",
    summary: "Tight tactical shape, compact spacing, and lower-event patterns keep the under and draw scenarios heavily involved.",
    tip: "Under 2.5",
    score: "1-0"
  }
];

const insightsContainer = document.getElementById("insights-cards");

if (insightsContainer) {
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
