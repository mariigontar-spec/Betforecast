async function loadHomeMatches() {
  const container = document.getElementById("matches-container");

  if (!container) return;
  container.innerHTML = `
    <div class="results-empty-state">
      Loading live matches...
    </div>
  `;

  try {
    const response = await fetch(`${BF_API.baseUrl}/fixtures?next=20`, {
      method: "GET",
      headers: {
        "x-apisports-key": BF_API.key
      }
    });

    const data = await response.json();
    const matches = data.response || [];

    if (!matches.length) {
      container.innerHTML = `
        <div class="results-empty-state">
          No upcoming matches found.
        </div>
      `;
      return;
    }

    container.innerHTML = "";

    matches.forEach((item) => {
      const home = item.teams?.home?.name || "Home";
      const away = item.teams?.away?.name || "Away";
      const league = item.league?.name || "Football";
      const date = new Date(item.fixture?.date);

      const row = document.createElement("article");
      row.className = "bf-prediction-row glow-hover";

      row.innerHTML = `
        <span>${league}</span>
        <strong>${home} <small>vs</small> ${away}</strong>
        <b>Upcoming</b>
        <b>${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</b>
        <em>${date.toLocaleDateString()}</em>
      `;

      container.appendChild(row);
    });

    initGlowHoverMatches();
  } catch (error) {
    console.error("Failed to load home matches:", error);

    container.innerHTML = `
      <div class="results-empty-state">
        Could not load matches.
      </div>
    `;
  }
}

function initGlowHoverMatches() {
  document.querySelectorAll(".glow-hover").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  });
}

document.addEventListener("DOMContentLoaded", loadHomeMatches);
