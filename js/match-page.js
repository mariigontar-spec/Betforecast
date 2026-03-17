const params = new URLSearchParams(window.location.search);
const matchId = params.get("id");

fetch("data/matches.json")
  .then(response => response.json())
  .then(data => {
    const match = data.find(m => String(m.id) === String(matchId));
    const container = document.getElementById("match-details");

    if (!container) {
      console.log("match-details block not found");
      return;
    }

    if (!match) {
      container.innerHTML = "<h2>Match not found</h2>";
      return;
    }

    container.innerHTML = `
<h2>${match.home} vs ${match.away}</h2>

<p><strong>Date:</strong> ${match.date}</p>
<p><strong>League:</strong> ${match.league}</p>

<h3>AI Prediction</h3>
<p>${match.prediction}</p>

<div class="probability">
  <div class="team">${match.home} ${match.homeChance}%</div>

  <div class="bar">
    <div class="home-bar" style="width:${match.homeChance}%"></div>
    <div class="away-bar" style="width:${match.awayChance}%"></div>
  </div>

  <div class="team">${match.away} ${match.awayChance}%</div>
</div>
`;
  })
  .catch(error => {
    const container = document.getElementById("match-details");
    if (container) {
      container.innerHTML = "<h2>Error loading match data</h2>";
    }
    console.log("Error:", error);
  });
