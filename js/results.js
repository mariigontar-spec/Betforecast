(() => {
  "use strict";

  const CONFIG = {
    provider: "api-football",
    league: 1,
    season: 2026,
    timezone: "Europe/Tallinn",
    maxResults: 12,
    cacheUrl: "/data/wc-2026.json",
    ...window.BF_API
  };

  const grid = document.getElementById("results-grid");
  const statusEl = document.getElementById("results-status");
  const finishedStatuses = new Set(["FT", "AET", "PEN"]);

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

  function cleanRound(value) {
    return String(value || "World Cup")
      .replace("FIFA World Cup", "World Cup")
      .replace("World Cup - ", "")
      .trim();
  }

  function formatKickoff(value) {
    if (!value) return "";

    try {
      const parts = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: CONFIG.timezone || undefined
      }).formatToParts(new Date(value));

      const get = (type) => parts.find((part) => part.type === type)?.value || "";
      return `${get("day")} ${get("month")} · ${get("hour")}:${get("minute")}`.trim();
    } catch {
      return "";
    }
  }

  function formatCacheDate(value) {
    if (!value) return "Cached results";

    try {
      return `Cached results · ${new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: CONFIG.timezone || undefined
      }).format(new Date(value))}`;
    } catch {
      return "Cached results";
    }
  }

  async function apiGet(path, params = {}) {
    const baseUrl = String(CONFIG.baseUrl || "").replace(/\/+$/, "");
    if (!baseUrl) throw new Error("API baseUrl is missing in /api-config.js");
    if (!CONFIG.key) throw new Error("API key is missing in /api-config.js");

    const url = new URL(`${baseUrl}${path}`, window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });

    const headers = { Accept: "application/json" };
    if (CONFIG.key) headers["x-apisports-key"] = CONFIG.key;
    if (CONFIG.host) headers["x-rapidapi-host"] = CONFIG.host;

    const response = await fetch(url.toString(), {
      method: "GET",
      headers,
      cache: "no-store"
    });

    if (!response.ok) throw new Error(`API request failed: ${response.status}`);

    const data = await response.json();
    if (data && data.errors && Object.keys(data.errors).length) {
      throw new Error("API returned errors");
    }

    return Array.isArray(data?.response) ? data.response : [];
  }

  async function cacheGet() {
    const response = await fetch(`${CONFIG.cacheUrl}?v=2`, {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) throw new Error(`Cache request failed: ${response.status}`);

    const data = await response.json();
    if (!data || !Array.isArray(data.fixtures)) {
      throw new Error("World Cup cache is empty or invalid");
    }

    return data;
  }

  function normalizeFixture(item) {
    const fixture = item.fixture || {};
    const league = item.league || {};
    const teams = item.teams || {};
    const goals = item.goals || {};
    const score = item.score || {};
    const home = teams.home || {};
    const away = teams.away || {};
    const penalties = score.penalty || {};

    const hasPens =
      penalties.home !== null &&
      penalties.home !== undefined &&
      penalties.away !== null &&
      penalties.away !== undefined;

    return {
      id: fixture.id || "",
      date: fixture.date || "",
      status: fixture.status?.short || "FT",
      round: cleanRound(league.round),
      venue: fixture.venue?.name || "World Cup venue",
      homeName: home.name || "Home",
      awayName: away.name || "Away",
      homeLogo: home.logo || "",
      awayLogo: away.logo || "",
      homeGoals: goals.home,
      awayGoals: goals.away,
      penaltyText: hasPens ? `${penalties.home}-${penalties.away} on pens` : ""
    };
  }

  function logoMarkup(src, name) {
    if (!src) return `<span class="wc-logo-placeholder" aria-hidden="true"></span>`;
    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(name)} logo" loading="lazy">`;
  }

  function teamLine(name, logo, goals) {
    return `
      <div class="wc-team-line">
        ${logoMarkup(logo, name)}
        <span>${escapeHtml(name)}</span>
        <b>${escapeHtml(goals ?? "-")}</b>
      </div>
    `;
  }

  function selectFinishedFixtures(fixtures) {
    return fixtures
      .filter((item) => finishedStatuses.has(item.fixture?.status?.short))
      .sort((a, b) => (b.fixture?.timestamp || 0) - (a.fixture?.timestamp || 0))
      .slice(0, CONFIG.maxResults || 12);
  }

  function renderEmpty(message) {
    grid.innerHTML = `<div class="wc-empty">${escapeHtml(message)}</div>`;
  }

  function renderResults(fixtures, sourceLabel = "") {
    if (!fixtures.length) {
      setStatus(sourceLabel || "No finished World Cup matches yet");
      renderEmpty("World Cup finished results will appear here as soon as completed matches are available.");
      return;
    }

    grid.className = "wc-results-grid";
    grid.innerHTML = fixtures
      .map((item) => {
        const match = normalizeFixture(item);
        const href = match.id ? `match.html?id=${encodeURIComponent(match.id)}` : "match.html";

        return `
          <a class="wc-result-card" href="${escapeHtml(href)}" aria-label="Open match analysis: ${escapeHtml(match.homeName)} vs ${escapeHtml(match.awayName)}">
            <div class="wc-result-round">
              <span>${escapeHtml(match.round)}</span>
              <strong class="wc-status-pill">${escapeHtml(match.status)}</strong>
              ${match.penaltyText ? `<em class="wc-penalty-pill">${escapeHtml(match.penaltyText)}</em>` : ""}
            </div>

            <div class="wc-score-stack">
              ${teamLine(match.homeName, match.homeLogo, match.homeGoals)}
              ${teamLine(match.awayName, match.awayLogo, match.awayGoals)}
            </div>

            <div class="wc-result-meta">
              <span>${escapeHtml(match.venue)}</span>
              <span>${escapeHtml(formatKickoff(match.date))}</span>
            </div>
          </a>
        `;
      })
      .join("");

    setStatus(sourceLabel || `${fixtures.length} latest finished matches`);
  }

  async function loadFromApi() {
    const fixtures = await apiGet("/fixtures", {
      league: CONFIG.league,
      season: CONFIG.season,
      timezone: CONFIG.timezone
    });

    renderResults(selectFinishedFixtures(fixtures), "Live API fallback");
  }

  async function loadResults() {
    setStatus("Loading cached World Cup results...");

    try {
      const cached = await cacheGet();
      const finished = selectFinishedFixtures(cached.fixtures);
      renderResults(finished, formatCacheDate(cached.updatedAt));
      return;
    } catch (cacheError) {
      console.warn("[World Cup Results cache]", cacheError);
    }

    setStatus("Loading API fallback...");

    try {
      await loadFromApi();
    } catch (error) {
      console.warn("[World Cup Results API]", error);
      setStatus("Results failed to load");
      renderEmpty("World Cup results could not be loaded. Run the Update World Cup cache workflow or check API settings.");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadResults);
  } else {
    loadResults();
  }
})();
