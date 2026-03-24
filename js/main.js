const predictions = [
  {
    id: "mci_ars",
    league: "Premier League",
    home: "Man City",
    away: "Arsenal",
    homePct: 54,
    drawPct: 24,
    awayPct: 22,
    tip: "Over 2.5",
    score: "2-2"
  },
  {
    id: "rm_bar",
    league: "La Liga",
    home: "Real Madrid",
    away: "Barcelona",
    homePct: 32,
    drawPct: 46,
    awayPct: 22,
    tip: "BTTS",
    score: "1-1"
  },
  {
    id: "liv_tot",
    league: "Premier League",
    home: "Liverpool",
    away: "Tottenham",
    homePct: 48,
    drawPct: 28,
    awayPct: 24,
    tip: "Home Win",
    score: "2-1"
  },
  {
    id: "psg_lyo",
    league: "Ligue 1",
    home: "PSG",
    away: "Lyon",
    homePct: 61,
    drawPct: 21,
    awayPct: 18,
    tip: "Over 2.5",
    score: "3-1"
  }
];

const upcomingMatches = [
  {
    league: "Premier League",
    match: "Man United vs Arsenal",
    ft: "2-2",
    ht: "1-1",
    xg: "2.1 - 2.3",
    tip: "Over 2.5",
    odds: "6.6"
  },
  {
    league: "Premier League",
    match: "Aston Villa vs Brentford",
    ft: "3-3",
    ht: "0-2",
    xg: "3.4 - 1.9",
    tip: "BTTS +",
    odds: "3.3"
  },
  {
    league: "Premier League",
    match: "Liverpool vs Tottenham",
    ft: "2-4",
    ht: "1-3",
    xg: "1.1 - 1.9",
    tip: "Away Win",
    odds: "4.1"
  },
  {
    league: "Premier League",
    match: "Arsenal vs Chelsea",
    ft: "1-0",
    ht: "1-0",
    xg: "2.6 - 0.8",
    tip: "Under 3.5",
    odds: "2.1"
  }
];

const yesterdayResults = [
  {
    match: "Chelsea vs West Ham",
    ft: "1-0",
    ht: "1-0",
    tip: "1-1",
    odds: "2.8"
  },
  {
    match: "Crystal Palace vs Man City",
    ft: "2-4",
    ht: "1-2",
    tip: "0-2",
    odds: "4.1"
  },
  {
    match: "Real Madrid vs Barcelona",
    ft: "1-1",
    ht: "0-1",
    tip: "2-1",
    odds: "4.5"
  },
  {
    match: "Napoli vs AC Milan",
    ft: "3-1",
    ht: "1-0",
    tip: "2-1",
    odds: "2.5"
  }
];

const predictionsContainer = document.getElementById("predictions-container");
const matchesContainer = document.getElementById("matches-container");
const resultsContainer = document.getElementById("results-container");

if (predictionsContainer) {
  predictions.forEach((item) => {
    const card = document.createElement("a");
    card.className = "prediction-card";
    card.href = `match.html?game=${item.id}`;

    card.innerHTML = `
      <div class="prediction-card-cover"></div>
      <div class="prediction-card-body">
        <div class="league">${item.league}</div>
        <h3>${item.home} <span style="color: rgba(255,255,255,0.45);">vs</span> ${item.away}</h3>

        <div class="percent-row">
          <div class="percent-box">
            <strong style="color:#6df0b3;">${item.homePct}%</strong>
            <span>Home</span>
          </div>
          <div class="percent-box">
            <strong>${item.drawPct}%</strong>
            <span>Draw</span>
          </div>
          <div class="percent-box">
            <strong style="color:#4fc3ff;">${item.awayPct}%</strong>
            <span>Away</span>
          </div>
        </div>

        <div class="card-bottom">
          <span class="tip-badge">${item.tip}</span>
          <span class="pred-score">${item.score}</span>
        </div>
      </div>
    `;

    predictionsContainer.appendChild(card);
  });
}

    predictionsContainer.appendChild(card);
  });
}

if (matchesContainer) {
  upcomingMatches.forEach((item) => {
    const row = document.createElement("div");
    row.className = "match-row";

    row.innerHTML = `
      <div class="cell-league">${item.league}</div>
      <div class="cell-match">
        ${item.match}<br>
        <span class="tip-badge">${item.tip}</span>
      </div>
      <div class="cell-ft">${item.ft}</div>
      <div class="cell-ht">${item.ht}</div>
      <div class="cell-xg">${item.xg}</div>
      <div class="cell-odds">${item.odds}</div>
    `;

    matchesContainer.appendChild(row);
  });
}

if (resultsContainer) {
  yesterdayResults.forEach((item) => {
    const row = document.createElement("div");
    row.className = "result-row";

    row.innerHTML = `
      <div class="cell-match">
        ${item.match}<br>
        <span style="font-size:12px;color:rgba(255,255,255,0.55);">HT ${item.ht}</span>
      </div>
      <div class="cell-ft">${item.ft}</div>
      <div>
        <span class="tip-badge">${item.tip}</span>
      </div>
      <div class="cell-odds">${item.odds}</div>
    `;

    resultsContainer.appendChild(row);
  });
}
