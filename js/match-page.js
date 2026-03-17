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
<h3>Match Stats</h3>

<div class="stats-box">

  <div class="stat-card">
    <div class="stat-label">Possession</div>
    <div class="stat-values">
      <span>${match.home} ${match.stats.possessionHome}%</span>
      <span>${match.away} ${match.stats.possessionAway}%</span>
    </div>
    <div class="stat-bar">
      <div class="stat-home" style="width:${match.stats.possessionHome}%"></div>
      <div class="stat-away" style="width:${match.stats.possessionAway}%"></div>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-label">Shots</div>
    <div class="stat-values">
      <span>${match.stats.shotsHome}</span>
      <span>${match.stats.shotsAway}</span>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-label">Corners</div>
    <div class="stat-values">
      <span>${match.stats.cornersHome}</span>
      <span>${match.stats.cornersAway}</span>
    </div>
  </div>

</div>

<div class="stat">
  <div class="stat-label">Shots</div>
  <div class="stat-values">
    <span>${match.stats.shotsHome}</span>
    <span>${match.stats.shotsAway}</span>
  </div>
</div>

<div class="stat">
  <div class="stat-label">Corners</div>
  <div class="stat-values">
    <span>${match.stats.cornersHome}</span>
    <span>${match.stats.cornersAway}</span>
  </div>
</div>
    <div class="bar">
      <div class="home-bar" style="width:${match.homeChance}%"></div>
      <div class="away-bar" style="width:${match.awayChance}%"></div>
    </div>
  </div>
`;
  });
