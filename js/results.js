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

    const finishedMatches = matches.filter((item) => item.status === "finished");

    finishedMatches.forEach((item) => {
      const card = document.createElement("article");
      card.className = "match-card result-card glow-hover";

      const finalScore =
        item.finalScore || item.projectedScore || item.predictedScore || "-";

      const predictedScore =
        item.predictedScore || item.projectedScore || "-";

      const confidence =
        item.confidence || item.aiConfidence || item.probability || "78";

      card.innerHTML = `
        <div class="result-card__top">
          <span class="result-card__league">
            <span class="league-dot"></span>
            <span>${item.league || "Football"}</span>
          </span>

          <span class="result-card__status">FT</span>
        </div>

    <div class="result-team">
  <img
    class="result-team__logo"
    src="assets/teams/${(item.homeShort || "").toLowerCase()}.png"
    alt="${item.home || ""}"
    onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-flex';"
  />

  <span class="result-team__fallback home-dot">
    ${item.homeShort || ""}
  </span>

  <span class="result-team__name">${item.home || ""}</span>
</div>
          <div class="result-score">
            <span>${finalScore}</span>
          </div>

 <div class="result-team result-team--away">
  <span class="result-team__name">${item.away || ""}</span>

  <img
    class="result-team__logo"
    src="assets/teams/${(item.awayShort || "").toLowerCase()}.png"
    alt="${item.away || ""}"
    onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-flex';"
  />

  <span class="result-team__fallback away-dot">
    ${item.awayShort || ""}
  </span>
</div>
        </div>

        <div class="result-card__ai">
          <div>
            <span class="result-card__label">AI predicted</span>
            <strong>${predictedScore}</strong>
          </div>

          <div class="result-card__confidence">
            <span>${confidence}% confidence</span>
            <div class="result-card__bar">
              <span style="width:${confidence}%"></span>
            </div>
          </div>
        </div>

        <div class="result-card__meta">
          <span>${item.stadium || "Match analysis"}</span>
          <span>Open details</span>
        </div>
      `;

      container.appendChild(card);
    });

    if (!finishedMatches.length) {
      container.innerHTML = `
        <div class="results-empty-state">
          No finished matches yet.
        </div>
      `;
    }

    initGlowHover();
  } catch (error) {
    console.error("Failed to load results page:", error);
    container.innerHTML = `
      <div class="results-empty-state">
        Failed to load results.
      </div>
    `;
  }
}

function initGlowHover() {
  document.querySelectorAll(".glow-hover").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  });
}

loadResultsPage();
