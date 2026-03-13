const params = new URLSearchParams(window.location.search);
const matchId = params.get("id");

fetch("data/matches.json")
  .then(response => response.json())
  .then(data => {

    const match = data.find(m => m.id == Number(matchId));

    const container = document.getElementById("match-details");

    if (!match) {
      container.innerHTML = "<h2>Match not found</h2>";
      return;
    }

    container.innerHTML = `
      <h2>${match.home} vs ${match.away}</h2>
      <p><strong>Date:</strong> ${match.date}</p>
      <p><strong>League:</strong> ${match.league}</p>

      <h3>Prediction</h3>
      <p>${match.prediction}</p>
    `;
  });
