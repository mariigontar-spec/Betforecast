async function loadResultsPage() {
  const container = document.getElementById("results-page-container");
  if (!container) return;

  try {
    const response = await fetch("data/matches.json");

    if (!response.ok) {
      throw new Error(`Failed to load matches.json: ${response.status}`);
    }

    const matches = await response.json();
    container.innerHTML = "";

    matches
  .filter(item => item.status === "finished")
  .forEach((item) => {
      const card = document.createElement("article");
      card.className = "match-card";

      card.innerHTML = `
        <div class="match-card__top">
          <span>${item.league}</span>
          <span>FT</span>
        </div>
        <div class="match-card__teams">
          <div>${item.home}</div>
          <strong>${item.finalScore}</strong>
<br>
<span style="font-size:12px; opacity:0.6;">
  Predicted: ${item.predictedScore}
</span>
          <div>${item.away}</div>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load results page:", error);
    container.innerHTML = `
      <div style="padding:20px; border-radius:16px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.75);">
        Failed to load results.
      </div>
    `;
  }
}

loadResultsPage();
