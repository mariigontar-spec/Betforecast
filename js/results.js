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
      card.className = "match-card glow-hover";

      card.innerHTML = `
        <div class="match-card__top">
          <span class="cell-league">
            <span class="league-dot"></span>
            <span class="league-name">${item.league || ""}</span>
          </span>
          <span>FT</span>
        </div>

        <div class="match-card__teams">
          <div class="team-inline">
            <span class="team-dot home-dot"></span>
            <span class="team-name-short">${item.home || ""}</span>
          </div>

          <strong>${item.finalScore || item.projectedScore || item.predictedScore || "-"}</strong>

          <div class="team-inline" style="justify-content:flex-end;">
            <span class="team-dot away-dot"></span>
            <span class="team-name-short">${item.away || ""}</span>
          </div>
        </div>

        <div class="match-card__meta">
          <span>Predicted: ${item.predictedScore || item.projectedScore || "-"}</span>
          <span>${item.stadium || ""}</span>
        </div>
      `;

      container.appendChild(card);
    });

    if (!finishedMatches.length) {
      container.innerHTML = `
        <div style="padding:20px; border-radius:16px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.75);">
          No finished matches yet.
        </div>
      `;
    }

    initGlowHover();
  } catch (error) {
    console.error("Failed to load results page:", error);
    container.innerHTML = `
      <div style="padding:20px; border-radius:16px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.75);">
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
