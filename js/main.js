const predictions = [
  {
    league: "Premier League",
    home: "Man City",
    away: "Arsenal",
    tip: "Over 2.5",
    score: "2-2"
  },
  {
    league: "La Liga",
    home: "Real Madrid",
    away: "Barcelona",
    tip: "BTTS",
    score: "1-1"
  }
];

const container = document.getElementById("predictions-container");

predictions.forEach(match => {
  const div = document.createElement("div");
  div.className = "prediction-card";

  div.innerHTML = `
    <h3>${match.home} vs ${match.away}</h3>
    <p>${match.league}</p>
    <p><b>${match.tip}</b></p>
    <p>Predicted: ${match.score}</p>
  `;

  container.appendChild(div);
});
