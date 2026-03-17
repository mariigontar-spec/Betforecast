const params = new URLSearchParams(window.location.search);
const matchId = params.get("id");

fetch("data/matches.json")
  .then(response => response.json())
  .then(data => {
    const match = data.find(m => String(m.id) === String(matchId));
    const container = document.getElementById("match-details");

    if (!container) return;

    if (!match) {
      container.innerHTML = "<h2>Select a match from the matches table</h2>";
      return;
    }

    container.innerHTML = `
  <h2>${match.home} vs ${match.away}</h2>

  <p><strong>Date:</strong> ${match.date}</p>
  <p><strong>League:</strong> ${match.league}</p>

  <h3>AI Prediction</h3>
  <p>${match.prediction}</p>

  <div class="probability">
    <div class="teams">
      <span>${match.home} ${match.homeChance}%</span>
      <span>${match.away} ${match.awayChance}%</span>
    </div>

    <div class="bar">
      <div class="home-bar" style="width:${match.homeChance}%"></div>
      <div class="away-bar" style="width:${match.awayChance}%"></div>
    </div>
  </div>
`;
  });
