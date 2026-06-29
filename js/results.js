(function () {
  const config = window.BF_API || {};

  const apiKey = config.key || "";
  const baseUrl = config.baseUrl || "https://v3.football.api-sports.io";
  const league = config.league || 1;
  const season = config.season || 2026;
  const timezone = config.timezone || "Europe/Tallinn";

  const grid = document.getElementById("results-grid");
  const statusEl = document.getElementById("results-status");

  const finishedStatuses = new Set([
    "FT",
    "AET",
    "PEN"
  ]);

  if (!grid) return;

  function setStatus(text) {
    if (statusEl) {
      statusEl.textContent = text;
    }
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatDate(dateString) {
    if (!dateString) return "";

    try {
      return new Intl.DateTimeFormat("en-GB", {
        timeZone: timezone,
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(dateString));
    } catch (error) {
      return "";
    }
  }

  async function apiGet(endpoint, params) {
    const url = new URL(endpoint, baseUrl);

    Object.entries(params || {}).forEach(function ([key, value]) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });

    const response = await fetch(url.toString(), {
      headers: {
        "x-apisports-key": apiKey
      }
    });

    if (!response.ok) {
      throw new Error("API error " + response.status);
    }

    const data = await response.json();

    if (data.errors && Object.keys(data.errors).length) {
      throw new Error(JSON.stringify(data.errors));
    }

    return data.response || [];
  }

  function renderEmpty(message) {
    grid.innerHTML = `
      <div class="results-empty">
        ${escapeHtml(message)}
      </div>
    `;
  }

  function renderResults(fixtures) {
    if (!fixtures.length) {
      setStatus("No finished World Cup matches yet");

      renderEmpty(
        "World Cup finished results will appear here as soon as completed matches are available in the API."
      );

      return;
    }

    grid.innerHTML = fixtures
      .map(function (match) {
        const home = match.teams?.home || {};
        const away = match.teams?.away || {};
        const goals = match.goals || {};
        const fixture = match.fixture || {};
        const leagueData = match.league || {};
        const venue = fixture.venue?.name || "World Cup venue";
        const date = formatDate(fixture.date);
        const status = fixture.status?.short || "FT";
        const round = leagueData.round || "FIFA World Cup 2026";
        const fixtureId = fixture.id || "";

        const homeName = home.name || "Home";
        const awayName = away.name || "Away";

        const matchHref =
          fixtureId
            ? "match.html?id=" + encodeURIComponent(fixtureId)
            : "match.html";

        return `
          <a
            class="result-card"
            href="${escapeHtml(matchHref)}"
            aria-label="Open match analysis: ${escapeHtml(homeName)} vs ${escapeHtml(awayName)}">

            <div class="result-card-top">
              <span class="result-round">
                ${escapeHtml(round)}
              </span>

              <strong class="result-status">
                ${escapeHtml(status)}
              </strong>
            </div>

            <div class="result-teams">

              <div class="result-team">
                ${
                  home.logo
                    ? `<img src="${escapeHtml(home.logo)}" alt="${escapeHtml(homeName)} logo" loading="lazy">`
                    : `<span class="result-logo-placeholder"></span>`
                }

                <h3>
                  ${escapeHtml(homeName)}
                </h3>
              </div>

              <div class="result-score">
                <strong>${goals.home ?? "-"}</strong>
                <span>-</span>
                <strong>${goals.away ?? "-"}</strong>
              </div>

              <div class="result-team">
                ${
                  away.logo
                    ? `<img src="${escapeHtml(away.logo)}" alt="${escapeHtml(awayName)} logo" loading="lazy">`
                    : `<span class="result-logo-placeholder"></span>`
                }

                <h3>
                  ${escapeHtml(awayName)}
                </h3>
              </div>

            </div>

            <div class="result-card-bottom">
              <span>
                ${escapeHtml(venue)}
              </span>

              <span>
                ${escapeHtml(date)}
              </span>
            </div>

          </a>
        `;
      })
      .join("");

    setStatus(fixtures.length + " latest finished matches");
  }

  async function initResults() {
    if (!apiKey || apiKey === "PASTE_YOUR_API_KEY_HERE") {
      setStatus("API key is missing");

      renderEmpty(
        "Add your API key in /api-config.js to load World Cup results."
      );

      return;
    }

    try {
      setStatus("Loading World Cup results...");

      const fixtures = await apiGet("/fixtures", {
        league,
        season,
        timezone
      });

      const latestFinished = fixtures
        .filter(function (match) {
          const status = match.fixture?.status?.short;
          return finishedStatuses.has(status);
        })
        .sort(function (a, b) {
          const aTime = a.fixture?.timestamp || 0;
          const bTime = b.fixture?.timestamp || 0;
          return bTime - aTime;
        })
        .slice(0, 12);

      renderResults(latestFinished);

    } catch (error) {
      console.error("World Cup results failed:", error);

      setStatus("Results failed to load");

      renderEmpty(
        "World Cup results could not be loaded. Check /api-config.js, API key, API limits, and browser console errors."
      );
    }
  }

  document.addEventListener("DOMContentLoaded", initResults);
})();
