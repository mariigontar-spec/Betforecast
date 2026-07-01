/* =========================================================
   Betforecast.ai — World Cup 2026 cached data loader
   Uses /data/wc-2026.json first, then falls back to API.
   ========================================================= */

(() => {
  "use strict";

  const CONFIG = {
    league: 1,
    season: 2026,
    timezone: "Europe/Tallinn",
    maxFixtures: 8,
    cacheUrl: "/data/wc-2026.json",
    ...window.BF_API
  };

  const state = {
    fixtures: [],
    standings: []
  };

  const $ = (id) => document.getElementById(id);

  const els = {
    days: $("wc-days"),
    hours: $("wc-hours"),
    minutes: $("wc-minutes"),
    fixtures: $("wc-fixtures"),
    fixturesStatus: $("wc-fixtures-status"),
    predictions: $("wc-predictions"),
    standingsTabs: $("wc-standings-tabs"),
    standings: $("wc-standings"),
    standingsStatus: $("wc-standings-status"),
    matchesPlayed: $("wc-matches-played"),
    goals: $("wc-goals"),
    avgGoals: $("wc-avg-goals")
  };

  function setText(el, text) {
    if (el) el.textContent = text;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatDate(value) {
    if (!value) return "Date TBA";

    try {
      return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: CONFIG.timezone || undefined
      }).format(new Date(value));
    } catch {
      return "Date TBA";
    }
  }

  function formatCacheDate(value) {
    if (!value) return "Cached data";

    try {
      return `Cached • ${new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: CONFIG.timezone || undefined
      }).format(new Date(value))}`;
    } catch {
      return "Cached data";
    }
  }

  function updateCountdown() {
    const target = new Date(CONFIG.countdownTarget || "2026-07-19T19:00:00Z");
    const now = new Date();
    const diff = Math.max(0, target.getTime() - now.getTime());

    const totalMinutes = Math.floor(diff / 60000);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    setText(els.days, days);
    setText(els.hours, hours);
    setText(els.minutes, minutes);
  }

  function getApiBase() {
    return String(CONFIG.baseUrl || "").replace(/\/+$/, "");
  }

  function getApiHeaders() {
    const headers = {
      Accept: "application/json"
    };

    const baseUrl = getApiBase();

    if (CONFIG.key) {
      headers["x-apisports-key"] = CONFIG.key;
    }

    if (CONFIG.host && baseUrl.includes("api-sports")) {
      headers["x-rapidapi-host"] = CONFIG.host;
    }

    return headers;
  }

  async function apiGet(path, params = {}) {
    const baseUrl = getApiBase();

    if (!baseUrl) {
      throw new Error("API baseUrl is not configured in /api-config.js");
    }

    if (baseUrl.includes("api-sports") && !CONFIG.key) {
      throw new Error("API key is not configured in /api-config.js");
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

  async function cacheGet() {
    const response = await fetch(`${CONFIG.cacheUrl}?v=1`, {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Cache request failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.fixtures)) {
      throw new Error("World Cup cache is empty or invalid");
    }

    return data;
  }

  function renderEmpty(container, message) {
    if (!container) return;
    container.innerHTML = `<div class="wc-empty">${escapeHtml(message)}</div>`;
  }

  function renderError(container, message) {
    if (!container) return;
    container.innerHTML = `<div class="wc-error">${escapeHtml(message)}</div>`;
  }

  function normalizeFixture(item) {
    const fixture = item.fixture || {};
    const league = item.league || {};
    const teams = item.teams || {};
    const goals = item.goals || {};
    const score = item.score || {};

    const homeName = teams.home?.name || "Home";
    const awayName = teams.away?.name || "Away";
    const homeGoals = goals.home;
    const awayGoals = goals.away;

    const hasScore =
      homeGoals !== null &&
      homeGoals !== undefined &&
      awayGoals !== null &&
      awayGoals !== undefined;

    return {
      id: fixture.id,
      date: fixture.date,
      status: fixture.status?.short || fixture.status?.long || "NS",
      round: league.round || "",
      venue: fixture.venue?.name || "",
      homeName,
      awayName,
      homeGoals,
      awayGoals,
      hasScore,
      scoreText: hasScore ? `${homeGoals} - ${awayGoals}` : formatDate(fixture.date),
      elapsed: fixture.status?.elapsed || null,
      rawScore: score
    };
  }

  function renderFixtures(fixtures) {
    if (!els.fixtures) return;

    const normalized = fixtures
      .map(normalizeFixture)
      .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));

    const now = Date.now();

    const upcoming = normalized.filter((fixture) => {
      if (!fixture.date) return true;
      return new Date(fixture.date).getTime() >= now || !fixture.hasScore;
    });

    const selected = (upcoming.length ? upcoming : normalized)
      .slice(0, CONFIG.maxFixtures || 8);

    if (!selected.length) {
      renderEmpty(els.fixtures, "Fixtures are not available yet.");
      setText(els.fixturesStatus, "No fixtures available");
      return;
    }

    els.fixtures.innerHTML = selected.map((fixture) => {
      const meta = [
        fixture.round,
        fixture.venue,
        fixture.status && fixture.status !== "NS" ? fixture.status : ""
      ].filter(Boolean).join(" • ");

      return `
        <article class="wc-fixture">
          <div>
            <strong>${escapeHtml(fixture.homeName)} vs ${escapeHtml(fixture.awayName)}</strong>
            <span>${escapeHtml(meta || formatDate(fixture.date))}</span>
          </div>
          <div class="wc-score">${escapeHtml(fixture.scoreText)}</div>
        </article>
      `;
    }).join("");

    setText(els.fixturesStatus, "Fixtures loaded");
  }

  function getPredictionText(fixture, index) {
    const homeBase = 42 + (index % 4);
    const drawBase = 28 - (index % 3);
    const awayBase = Math.max(18, 100 - homeBase - drawBase);

    return {
      home: homeBase,
      draw: drawBase,
      away: awayBase,
      pick: `${fixture.homeName} or Draw`
    };
  }

  function renderPredictions(fixtures) {
    if (!els.predictions) return;

    const upcoming = fixtures
      .map(normalizeFixture)
      .filter((fixture) => !fixture.hasScore)
      .slice(0, 5);

    if (!upcoming.length) {
      renderEmpty(
        els.predictions,
        "Predictions will appear when real fixtures are available."
      );
      return;
    }

    els.predictions.innerHTML = upcoming.map((fixture, index) => {
      const prediction = getPredictionText(fixture, index);

      return `
        <article class="wc-prediction">
          <div>
            <strong>${escapeHtml(prediction.pick)}</strong>
            <span>${escapeHtml(fixture.homeName)} vs ${escapeHtml(fixture.awayName)}</span>
          </div>
          <div class="wc-prob">${prediction.home}%</div>
        </article>
      `;
    }).join("");
  }

  function renderStats(fixtures) {
    const finished = fixtures
      .map(normalizeFixture)
      .filter((fixture) => fixture.hasScore);

    const goals = finished.reduce((sum, fixture) => {
      return sum + Number(fixture.homeGoals || 0) + Number(fixture.awayGoals || 0);
    }, 0);

    setText(els.matchesPlayed, finished.length);
    setText(els.goals, goals);
    setText(
      els.avgGoals,
      finished.length ? (goals / finished.length).toFixed(2) : "0.00"
    );
  }

  function normalizeStandingsPayload(payload) {
    const league = payload?.[0]?.league;
    const standings = league?.standings;

    if (!Array.isArray(standings)) return [];

    return standings.map((groupRows, index) => ({
      name: groupRows?.[0]?.group || `Group ${String.fromCharCode(65 + index)}`,
      rows: Array.isArray(groupRows) ? groupRows : []
    }));
  }

  function renderStandings(groups) {
    if (!els.standings || !els.standingsTabs) return;

    if (!groups.length) {
      renderEmpty(els.standings, "Standings are not available yet.");
      els.standingsTabs.innerHTML = "";
      setText(els.standingsStatus, "No standings available");
      return;
    }

    let activeIndex = 0;

    const drawTabs = () => {
      els.standingsTabs.innerHTML = groups.map((group, index) => `
        <button
          type="button"
          class="${index === activeIndex ? "active" : ""}"
          data-group-index="${index}">
          ${escapeHtml(group.name)}
        </button>
      `).join("");
    };

    const drawTable = () => {
      const group = groups[activeIndex];

      els.standings.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GD</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
            ${group.rows.map((row) => `
              <tr>
                <td>${escapeHtml(row.rank)}</td>
                <td>${escapeHtml(row.team?.name || "Team")}</td>
                <td>${escapeHtml(row.all?.played ?? 0)}</td>
                <td>${escapeHtml(row.all?.win ?? 0)}</td>
                <td>${escapeHtml(row.all?.draw ?? 0)}</td>
                <td>${escapeHtml(row.all?.lose ?? 0)}</td>
                <td>${escapeHtml(row.goalsDiff ?? 0)}</td>
                <td>${escapeHtml(row.points ?? 0)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    };

    drawTabs();
    drawTable();
    setText(els.standingsStatus, "Standings loaded");

    els.standingsTabs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-group-index]");
      if (!button) return;

      activeIndex = Number(button.dataset.groupIndex) || 0;
      drawTabs();
      drawTable();
    }, { once: false });
  }

  function applyWorldCupData(fixtures, standingsPayload, sourceLabel) {
    state.fixtures = Array.isArray(fixtures) ? fixtures : [];
    state.standings = normalizeStandingsPayload(Array.isArray(standingsPayload) ? standingsPayload : []);

    renderFixtures(state.fixtures);
    renderPredictions(state.fixtures);
    renderStats(state.fixtures);
    renderStandings(state.standings);

    if (sourceLabel) {
      setText(els.fixturesStatus, sourceLabel);
      setText(els.standingsStatus, sourceLabel);
    }
  }

  async function loadFromApi() {
    const [fixtures, standingsPayload] = await Promise.all([
      apiGet("/fixtures", {
        league: CONFIG.league,
        season: CONFIG.season,
        timezone: CONFIG.timezone
      }),
      apiGet("/standings", {
        league: CONFIG.league,
        season: CONFIG.season
      })
    ]);

    applyWorldCupData(fixtures, standingsPayload, "Live API fallback");
  }

  async function loadWorldCupData() {
    updateCountdown();
    setInterval(updateCountdown, 30000);

    setText(els.fixturesStatus, "Loading cached fixtures...");
    setText(els.standingsStatus, "Loading cached standings...");

    try {
      const cached = await cacheGet();
      applyWorldCupData(
        cached.fixtures,
        cached.standingsPayload,
        formatCacheDate(cached.updatedAt)
      );
      return;
    } catch (cacheError) {
      console.warn("[World Cup 2026 cache]", cacheError);
    }

    setText(els.fixturesStatus, "Loading API fallback...");
    setText(els.standingsStatus, "Loading API fallback...");

    try {
      await loadFromApi();
    } catch (error) {
      console.warn("[World Cup 2026 API]", error);

      setText(els.fixturesStatus, "API needs configuration");
      setText(els.standingsStatus, "API needs configuration");

      renderError(
        els.fixtures,
        "World Cup cache is not ready yet. Run the Update World Cup cache workflow."
      );

      renderEmpty(
        els.predictions,
        "Predictions will appear after fixtures load from cache."
      );

      renderError(
        els.standings,
        "Standings cache is not ready yet. Run the Update World Cup cache workflow."
      );

      renderStats([]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadWorldCupData);
  } else {
    loadWorldCupData();
  }
})();
