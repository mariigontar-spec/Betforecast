(() => {
  "use strict";

  const CONFIG = {
    provider: "api-football",
    league: 1,
    season: 2026,
    timezone: "Europe/Tallinn",
    maxResults: 12,
    ...window.BF_API
  };

  const grid = document.getElementById("results-grid");
  const statusEl = document.getElementById("results-status");

  const finishedStatuses = new Set([
    "FT",
    "AET",
    "PEN"
  ]);

  if (!grid) return;

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getApiBase() {
    return String(CONFIG.baseUrl || "").replace(/\/+$/, "");
  }

  function getApiHeaders() {
    const headers = {
      Accept: "application/json"
    };

    if (CONFIG.key) {
      headers["x-apisports-key"] = CONFIG.key;
    }

    if (CONFIG.host) {
      headers["x-rapidapi-host"] = CONFIG.host;
    }

    return headers;
  }

  function formatDate(value) {
    if (!value) return "";

    try {
      return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: CONFIG.timezone || undefined
      }).format(new Date(value));
    } catch {
      return "";
    }
  }

  async function apiGet(path, params = {}) {
    const baseUrl = getApiBase();

    if (!baseUrl) {
      throw new Error("API baseUrl is missing in /api-config.js");
    }

    if (!CONFIG.key) {
      throw new Error("API key is missing in /api-config.js");
    }

    const url = new URL(`${baseUrl}${path}`, window.location.origin);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: getApiHeaders(),
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.errors && Object.keys(data.errors).length) {
      throw new Error("API returned errors");
    }

    return Array.isArray(data?.response) ? data.response : [];
  }

  function renderEmpty(message) {
    grid.innerHTML = `
      <div class="results-empty">
        ${escapeHtml(message)}
      </div>
    `;
  }

  function normalizeFixture(item) {
    const fixture = item.fixture || {};
    const league = item.league || {};
    const teams = item.teams || {};
    const goals = item.goals || {};

    const home = teams.home || {};
    const away = teams.away || {};

    return {
      id: fixture.id || "",
      date: fixture.date || "",
      status: fixture.status?.short || "FT",
      round: league.round || "FIFA World Cup 2026",
      venue: fixture.venue?.name || "World Cup venue",

      homeName: home.name || "Home",
      awayName: away.name || "Away",
      homeLogo: home.logo || "",
      awayLogo: away.logo || "",

      homeGoals: goals.home,
      awayGoals: goals.away
    };
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
      .map((item) => {
        const fixture = normalizeFixture(item);

        const matchHref =
          fixture.id
            ? `match.html?id=${encodeURIComponent(fixture.id)}`
            : "match.html";

        return `
          <a
            class="result-card"
            href="${escapeHtml(matchHref)}"
            aria-label="Open match analysis: ${escapeHtml(fixture.homeName)} vs ${escapeHtml(fixture.awayName)}">

            <div class="result-card-top">
              <span class="result-round">
                ${escapeHtml(fixture.round)}
              </span>

              <strong class="result-status">
                ${escapeHtml(fixture.status)}
              </strong>
            </div>

            <div class="result-teams">

              <div class="result-team">
                ${
                  fixture.homeLogo
                    ? `<img src="${escapeHtml(fixture.homeLogo)}" alt="${escapeHtml(fixture.homeName)} logo" loading="lazy">`
                    : `<span class="result-logo-placeholder"></span>`
                }

                <h3>
                  ${escapeHtml(fixture.homeName)}
                </h3>
              </div>

              <div class="result-score">
                <strong>${escapeHtml(fixture.homeGoals ?? "-")}</strong>
                <span>-</span>
                <strong>${escapeHtml(fixture.awayGoals ?? "-")}</strong>
              </div>

              <div class="result-team">
                ${
                  fixture.awayLogo
                    ? `<img src="${escapeHtml(fixture.awayLogo)}" alt="${escapeHtml(fixture.awayName)} logo" loading="lazy">`
                    : `<span class="result-logo-placeholder"></span>`
                }

                <h3>
                  ${escapeHtml(fixture.awayName)}
                </h3>
              </div>

            </div>

            <div class="result-card-bottom">
              <span>
                ${escapeHtml(fixture.venue)}
              </span>

              <span>
                ${escapeHtml(formatDate(fixture.date))}
              </span>
            </div>

          </a>
        `;
      })
      .join("");

    setStatus(`${fixtures.length} latest finished matches`);
  }

  async function loadResults() {
    try {
      setStatus("Loading World Cup results...");

      const fixtures = await apiGet("/fixtures", {
        league: CONFIG.league,
        season: CONFIG.season,
        timezone: CONFIG.timezone
      });

      const finished = fixtures
        .filter((item) => {
          const status = item.fixture?.status?.short;
          return finishedStatuses.has(status);
        })
        .sort((a, b) => {
          const aTime = a.fixture?.timestamp || 0;
          const bTime = b.fixture?.timestamp || 0;
          return bTime - aTime;
        })
        .slice(0, CONFIG.maxResults || 12);

      renderResults(finished);

    } catch (error) {
      console.warn("[World Cup Results API]", error);

      setStatus("Results failed to load");

      renderEmpty(
        "World Cup results could not be loaded. Check /api-config.js, API key, API limits and browser console."
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadResults);
  } else {
    loadResults();
  }
})();
