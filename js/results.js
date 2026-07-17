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

  function injectResultsAds() {
    if (!document.getElementById("bf-results-ad-size-fix")) {
      const style = document.createElement("style");
      style.id = "bf-results-ad-size-fix";
      style.textContent = `
        body.site-skin-1win .content-banner {
          position: relative !important;
          z-index: 20 !important;
          width: 100% !important;
          max-width: 100% !important;
          min-height: 90px !important;
          margin: 28px auto !important;
          padding: 0 !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          overflow: visible !important;
          background: transparent !important;
          border: 0 !important;
          box-shadow: none !important;
          text-align: center !important;
        }

        body.site-skin-1win .content-banner-desktop,
        body.site-skin-1win .content-banner .banner-728 {
          display: block !important;
          width: 728px !important;
          min-width: 728px !important;
          max-width: 728px !important;
          height: 90px !important;
          min-height: 90px !important;
          max-height: 90px !important;
          margin: 0 auto !important;
          padding: 0 !important;
          overflow: hidden !important;
          background: transparent !important;
          transform: none !important;
        }

        body.site-skin-1win .content-banner-desktop > .ins-zone,
        body.site-skin-1win .content-banner-desktop > ins,
        body.site-skin-1win .content-banner .banner-728 > .ins-zone,
        body.site-skin-1win .content-banner .banner-728 > ins,
        body.site-skin-1win .content-banner .banner-728 iframe,
        body.site-skin-1win .content-banner-desktop iframe {
          display: block !important;
          width: 728px !important;
          min-width: 728px !important;
          max-width: 728px !important;
          height: 90px !important;
          min-height: 90px !important;
          max-height: 90px !important;
          margin: 0 auto !important;
          padding: 0 !important;
          border: 0 !important;
          transform: none !important;
        }

        body.site-skin-1win .content-banner-mobile,
        body.site-skin-1win .content-banner .adhit-300x250 {
          display: none !important;
        }

        @media (max-width: 768px) {
          body.site-skin-1win .content-banner {
            min-height: 250px !important;
            margin: 20px auto !important;
          }

          body.site-skin-1win .content-banner-desktop,
          body.site-skin-1win .content-banner .banner-728 {
            display: none !important;
          }

          body.site-skin-1win .content-banner-mobile,
          body.site-skin-1win .content-banner .adhit-300x250 {
            display: block !important;
            width: 300px !important;
            min-width: 300px !important;
            max-width: 300px !important;
            height: 250px !important;
            min-height: 250px !important;
            max-height: 250px !important;
            margin: 0 auto !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: transparent !important;
            transform: none !important;
          }

          body.site-skin-1win .content-banner-mobile > .ins-zone,
          body.site-skin-1win .content-banner-mobile > ins,
          body.site-skin-1win .content-banner .adhit-300x250 > .ins-zone,
          body.site-skin-1win .content-banner .adhit-300x250 > ins,
          body.site-skin-1win .content-banner .adhit-300x250 iframe,
          body.site-skin-1win .content-banner-mobile iframe {
            display: block !important;
            width: 300px !important;
            min-width: 300px !important;
            max-width: 300px !important;
            height: 250px !important;
            min-height: 250px !important;
            max-height: 250px !important;
            margin: 0 auto !important;
            padding: 0 !important;
            border: 0 !important;
            transform: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const hero = document.querySelector(".results-hero");
    if (hero && !document.getElementById("results-top-728-ad")) {
      const banner = document.createElement("div");
      banner.id = "results-top-728-ad";
      banner.className = "content-banner content-banner-top";
      banner.innerHTML = getAdMarkup();
      hero.insertAdjacentElement("afterend", banner);
    }

    document.querySelectorAll(".content-banner").forEach((banner) => {
      if (!banner.querySelector(".banner-728") && !banner.querySelector(".adhit-300x250")) {
        banner.innerHTML = getAdMarkup();
      }
    });
  }

  function getAdMarkup() {
    return `
      <div class="banner-728 content-banner-desktop">
        <ins class="ins-zone" data-zone="163631"></ins>
      </div>
      <div class="adhit-300x250 content-banner-mobile">
        <ins class="ins-zone" data-zone="163623"></ins>
      </div>
    `;
  }

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
    const headers = { Accept: "application/json" };
    if (CONFIG.key) headers["x-apisports-key"] = CONFIG.key;
    if (CONFIG.host) headers["x-rapidapi-host"] = CONFIG.host;
    return headers;
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
      return `${get("day")} ${get("month")} • ${get("hour")}:${get("minute")}`.trim();
    } catch {
      return "";
    }
  }

  function formatCacheDate(value) {
    if (!value) return "Cached results";

    try {
      return `Cached results • ${new Intl.DateTimeFormat("en-GB", {
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
    const baseUrl = getApiBase();
    if (!baseUrl) throw new Error("API baseUrl is missing in /api-config.js");
    if (!CONFIG.key) throw new Error("API key is missing in /api-config.js");

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

    if (!response.ok) throw new Error(`API request failed: ${response.status}`);

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

    if (!response.ok) throw new Error(`Cache request failed: ${response.status}`);

    const data = await response.json();
    if (!data || !Array.isArray(data.fixtures)) {
      throw new Error("World Cup cache is empty or invalid");
    }

    return data;
  }

  function renderEmpty(message) {
    grid.innerHTML = `<div class="results-empty">${escapeHtml(message)}</div>`;
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

    const homePenalty = penalties.home;
    const awayPenalty = penalties.away;
    const penaltyText =
      homePenalty !== null &&
      homePenalty !== undefined &&
      awayPenalty !== null &&
      awayPenalty !== undefined
        ? `${homePenalty}-${awayPenalty} on pens`
        : "";

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
      awayGoals: goals.away,
      penaltyText
    };
  }

  function logoMarkup(src, name) {
    if (!src) return `<span class="result-logo-placeholder" aria-hidden="true"></span>`;
    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(name)} logo" loading="lazy">`;
  }

  function renderTeamRow(name, logo, goals) {
    return `
      <div class="result-row">
        <div class="result-side">
          ${logoMarkup(logo, name)}
          <span>${escapeHtml(name)}</span>
        </div>
        <strong class="result-goals">${escapeHtml(goals ?? "-")}</strong>
      </div>
    `;
  }

  function selectFinishedFixtures(fixtures) {
    return fixtures
      .filter((item) => finishedStatuses.has(item.fixture?.status?.short))
      .sort((a, b) => (b.fixture?.timestamp || 0) - (a.fixture?.timestamp || 0))
      .slice(0, CONFIG.maxResults || 12);
  }

  function renderResults(fixtures, sourceLabel = "") {
    if (!fixtures.length) {
      setStatus(sourceLabel || "No finished World Cup matches yet");
      renderEmpty("World Cup finished results will appear here as soon as completed matches are available.");
      return;
    }

    grid.innerHTML = fixtures
      .map((item) => {
        const fixture = normalizeFixture(item);
        const matchHref = fixture.id ? `match.html?id=${encodeURIComponent(fixture.id)}` : "match.html";

        return `
          <a class="result-card" href="${escapeHtml(matchHref)}" aria-label="Open match analysis: ${escapeHtml(fixture.homeName)} vs ${escapeHtml(fixture.awayName)}">
            <div class="result-card-top">
              <span class="result-round">${escapeHtml(fixture.round)}</span>
              <strong class="result-status">${escapeHtml(fixture.status)}</strong>
            </div>

            <div class="result-scoreboard">
              ${renderTeamRow(fixture.homeName, fixture.homeLogo, fixture.homeGoals)}
              ${renderTeamRow(fixture.awayName, fixture.awayLogo, fixture.awayGoals)}
            </div>

            ${fixture.penaltyText ? `<div class="result-penalty">${escapeHtml(fixture.penaltyText)}</div>` : ""}

            <div class="result-card-bottom">
              <span class="result-venue">${escapeHtml(fixture.venue)}</span>
              <span class="result-date">${escapeHtml(formatKickoff(fixture.date))}</span>
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
    injectResultsAds();
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
