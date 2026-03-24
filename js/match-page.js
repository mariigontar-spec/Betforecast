const matchRows = [
  {
    league: "Premier League",
    match: "Arsenal vs Chelsea",
    ft: "2-1",
    ht: "1-0",
    tip: "Home Win",
    odds: "2.1"
  },
  {
    league: "Premier League",
    match: "Liverpool vs Tottenham",
    ft: "2-1",
    ht: "1-1",
    tip: "BTTS",
    odds: "2.7"
  },
  {
    league: "La Liga",
    match: "Real Madrid vs Barcelona",
    ft: "1-1",
    ht: "0-1",
    tip: "Draw Lean",
    odds: "4.5"
  },
  {
    league: "Serie A",
    match: "Napoli vs AC Milan",
    ft: "2-1",
    ht: "1-0",
    tip: "Home Win",
    odds: "2.5"
  },
  {
    league: "Bundesliga",
    match: "Bayern vs Dortmund",
    ft: "3-2",
    ht: "2-1",
    tip: "Over 2.5",
    odds: "2.2"
  }
];

const matchTable = document.getElementById("match-table");

if (matchTable) {
  const head = document.createElement("div");
  head.className = "match-table-head";
  head.innerHTML = `
    <div>League</div>
    <div>Match</div>
    <div>FT</div>
    <div>HT</div>
    <div>Tip</div>
    <div>Odds</div>
  `;
  matchTable.appendChild(head);

  matchRows.forEach((item) => {
    const row = document.createElement("div");
    row.className = "match-table-row";

    row.innerHTML = `
      <div class="cell-league">${item.league}</div>
      <div class="cell-match">${item.match}</div>
      <div class="cell-ft">${item.ft}</div>
      <div class="cell-ht">${item.ht}</div>
      <div><span class="tip-badge">${item.tip}</span></div>
      <div class="cell-odds">${item.odds}</div>
    `;

    matchTable.appendChild(row);
  });
}
