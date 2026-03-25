async function loadHomePage() {
  const predictionsContainer = document.getElementById("predictions-container");
  const matchesContainer = document.getElementById("matches-container");
  const resultsContainer = document.getElementById("results-container");

  try {
    const response = await fetch("data/matches.json");
    const matches = await response.json();

    if (predictionsContainer) {
      matches.forEach((item) => {
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
              <span class="pred-score">${item.projectedScore}</span>
            </div>
          </div>
        `;

        predictionsContainer.appendChild(card);
      });
    }

    if (matchesContainer) {
      matches.forEach((item) => {
        const row = document.createElement("a");
        row.className = "match-row";
        row.href = `match.html?game=${item.id}`;

        row.innerHTML = `
          <div class="cell-league">${item.league}</div>
          <div class="cell-match">
            ${item.home} vs ${item.away}<br>
            <span class="tip-badge">${item.tip}</span>
          </div>
          <div class="cell-ft">${item.projectedScore}</div>
          <div class="cell-ht">${item.time}</div>
          <div class="cell-xg">${item.xg}</div>
          <div class="cell-odds">${item.odds}</div>
        `;

        matchesContainer.appendChild(row);
      });
    }

    if (resultsContainer) {
      matches.forEach((item) => {
        const row = document.createElement("a");
        row.className = "result-row";
        row.href = `match.html?game=${item.id}`;

        row.innerHTML = `
          <div class="cell-match">
            ${item.home} vs ${item.away}<br>
            <span style="font-size:12px;color:rgba(255,255,255,0.55);">${item.league}</span>
          </div>
          <div class="cell-ft">${item.projectedScore}</div>
          <div>
            <span class="tip-badge">${item.tip}</span>
          </div>
          <div class="cell-odds">${item.odds}</div>
        `;

        resultsContainer.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Failed to load matches.json:", error);
  }
}

loadHomePage();
