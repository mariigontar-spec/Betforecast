async function loadResultsPage() {
  const container =
    document.getElementById("results-page-container") ||
    document.getElementById("results-container");

  if (!container) return;

  container.innerHTML = `
    <div class="results-empty-state">
      Loading latest results...
    </div>
  `;

  try {
    const response = await fetch(`${BF_API.baseUrl}/fixtures?last=10`, {
      method: "GET",
      headers: {
        "x-apisports-key": BF_API.key
      }
    });

    const data = await response.json();
    const matches = data.response || [];

    container.innerHTML = "";

    if (!matches.length) {
      container.innerHTML = `
        <div class="results-empty-state">
          No finished matches found.
        </div>
      `;
      return;
    }

    matches.forEach((item) => {
      const card = document.createElement("article");
      card.className = "match-card result-card glow-hover";

      const home = item.teams?.home?.name || "Home";
      const away = item.teams?.away?.name || "Away";
      const homeLogo = item.teams?.home?.logo || "";
      const awayLogo = item.teams?.away?.logo || "";
      const homeGoals = item.goals?.home ?? "-";
      const awayGoals = item.goals?.away ?? "-";
      const league = item.league?.name || "Football";
      const status = item.fixture?.status?.short || "FT";
      const venue = item.fixture?.venue?.name || "Match analysis";

      card.innerHTML = `
        <div class="result-card__top">
          <span class="result-card__league">
            <span class="league-dot"></span>
            <span>${league}</span>
          </span>

          <span class="result-card__status">${status}</span>
        </div>

        <div class="result-team">
          <img
            class="result-team__logo"
            src="${homeLogo}"
            alt="${home}"
            onerror="this.style.display='none';"
          />
          <span class="result-team__name">${home}</span>
        </div>

        <div class="result-score">
          <span>${homeGoals} - ${awayGoals}</span>
        </div>

        <div class="result-team result-team--away">
          <span class="result-team__name">${away}</span>
          <img
            class="result-team__logo"
            src="${awayLogo}"
            alt="${away}"
            onerror="this.style.display='none';"
          />
        </div>

        <div class="result-card__ai">
          <div>
            <span class="result-card__label">AI predicted</span>
            <strong>Coming soon</strong>
          </div>

          <div class="result-card__confidence">
            <span>Live data result</span>
            <div class="result-card__bar">
              <span style="width:72%"></span>
            </div>
          </div>
        </div>

        <div class="result-card__meta">
          <span>${venue}</span>
          <span>${new Date(item.fixture.date).toLocaleDateString()}</span>
        </div>
      `;

      container.appendChild(card);
    });

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
