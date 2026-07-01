document.addEventListener("DOMContentLoaded", function () {
  const tableWrap = document.getElementById("standings-table-wrap");
  const lastWrap = document.getElementById("standings-last-wrap");
  const upcomingWrap = document.getElementById("standings-upcoming-wrap");
  const tabs = document.querySelectorAll(".standings-view-tab");
  const leagueFilterList = document.getElementById("league-filter-list");

  const leagueCountry = document.getElementById("league-country");
  const leagueName = document.getElementById("league-name");
  const leagueSeason = document.getElementById("league-season");
  const panelTitle = document.getElementById("standings-panel-title");
  const insightTitle = document.getElementById("league-insight-title");
  const insightText = document.getElementById("league-insight-text");

  if (!tableWrap) return;

  const CONFIG = {
    league: 1,
    season: 2026,
    timezone: "Europe/Tallinn",
    cacheUrl: "/data/wc-2026.json",
    ...window.BF_API
  };

  const finishedStatuses = new Set(["FT", "AET", "PEN"]);

  setupPageHeader();
  setupLeagueFilters();
  setupTabs();
  loadWorldCupStandings();

  function setupPageHeader() {
    setText(leagueCountry, "FIFA World Cup");
    setText(leagueName, "World Cup 2026 Standings");
    setText(leagueSeason, "Cached tournament table and fixtures");
    setText(panelTitle, "Group Standings");
    setText(insightTitle, "World Cup table watch");
    setText(
      insightText,
      "Group position, goal difference, and match timing can quickly change qualification pressure during the tournament."
    );
  }

  function setupLeagueFilters() {
    if (!leagueFilterList) return;

    leagueFilterList.innerHTML = `
      <button class="league-filter-btn active" type="button">World Cup 2026</button>
      <a class="league-filter-btn" href="results.html">Results</a>
      <a class="league-filter-btn" href="match.html">Matches</a>
      <a class="league-filter-btn" href="world-cup-2026.html">Overview</a>
    `;
  }

  function setupTabs() {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        const view = tab.dataset.view;

        tabs.forEach(function (btn) {
          btn.classList.remove("active");
        });

        tab.classList.add("active");

        tableWrap.classList.toggle("hidden-view", view !== "table");

        if (lastWrap) {
          lastWrap.classList.toggle("hidden-view", view !== "last");
        }

        if (upcomingWrap) {
          upcomingWrap.classList.toggle("hidden-view", view !== "upcoming");
        }
      });
    });
  }

  async function loadWorldCupStandings() {
    tableWrap.innerHTML = `<div class="standings-loading">Loading cached World Cup standings...</div>`;

    if (lastWrap) {
      lastWrap.innerHTML = `<div class="standings-loading">Loading cached recent matches...</div>`;
    }

    if (upcomingWrap) {
      upcomingWrap.innerHTML = `<div class="standings-loading">Loading cached upcoming matches...</div>`;
    }

    try {
      const cached = await loadCachedWorldCupData();
      const groups = normalizeStandingsPayload(cached.standingsPayload);
      const fixtures = Array.isArray(cached.fixtures) ? cached.fixtures : [];
      const updatedLabel = formatCacheDate(cached.updatedAt);

      setText(leagueSeason, updatedLabel);
      renderGroups(groups);
      renderMatches(lastWrap, selectRecentFixtures(fixtures), "last");
      renderMatches(upcomingWrap, selectUpcomingFixtures(fixtures), "upcoming");
      return;
    } catch (cacheError) {
      console.warn("[Standings cache]", cacheError);
    }

    try {
      const [standingsPayload, fixtures] = await Promise.all([
        loadApiStandings(),
        loadApiFixtures()
      ]);

      renderGroups(normalizeStandingsPayload(standingsPayload));
      renderMatches(lastWrap, selectRecentFixtures(fixtures), "last");
      renderMatches(upcomingWrap, selectUpcomingFixtures(fixtures), "upcoming");
      setText(leagueSeason, "Live API fallback");
    } catch (apiError) {
      console.warn("[Standings API]", apiError);
      tableWrap.innerHTML = `
        <div class="standings-empty">
          World Cup standings cache is not ready yet. Run the Update World Cup cache workflow.
        </div>
      `;

      if (lastWrap) {
        lastWrap.innerHTML = `<div class="standings-empty">Recent matches are not available yet.</div>`;
      }

      if (upcomingWrap) {
        upcomingWrap.innerHTML = `<div class="standings-empty">Upcoming matches are not available yet.</div>`;
      }
    }
  }

  async function loadCachedWorldCupData() {
    const response = await fetch(`${CONFIG.cacheUrl}?v=1`, {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Cache request failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.standingsPayload)) {
      throw new Error("World Cup standings cache is empty or invalid");
    }

    return data;
  }

  async function loadApiStandings() {
    const url = new URL(`${getApiBase()}/standings`);
    url.searchParams.set("league", CONFIG.league);
    url.searchParams.set("season", CONFIG.season);

    return apiFetch(url);
  }

  async function loadApiFixtures() {
    const url = new URL(`${getApiBase()}/fixtures`);
    url.searchParams.set("league", CONFIG.league);
    url.searchParams.set("season", CONFIG.season);
    url.searchParams.set("timezone", CONFIG.timezone);

    return apiFetch(url);
  }

  async function apiFetch(url) {
    if (!CONFIG.key) {
      throw new Error("API key is missing");
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "x-apisports-key": CONFIG.key,
        "x-rapidapi-host": CONFIG.host || "v3.football.api-sports.io"
      },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`API status ${response.status}`);
    }

    const data = await response.json();

    if (data.errors && Object.keys(data.errors).length > 0) {
      throw new Error(JSON.stringify(data.errors));
    }

    return Array.isArray(data.response) ? data.response : [];
  }

  function getApiBase() {
    return String(CONFIG.baseUrl || "https://v3.football.api-sports.io").replace(/\/+$/, "");
  }

  function normalizeStandingsPayload(payload) {
    const league = payload?.[0]?.league;
    const standings = league?.standings;

    if (!Array.isArray(standings)) return [];

    return standings.map(function (rows, index) {
      return {
        name: rows?.[0]?.group || `Group ${String.fromCharCode(65 + index)}`,
        rows: Array.isArray(rows) ? rows : []
      };
    });
  }

  function renderGroups(groups) {
    if (!groups.length) {
      tableWrap.innerHTML = `<div class="standings-empty">World Cup standings are not available yet.</div>`;
      return;
    }

    tableWrap.innerHTML = groups
      .map(function (group) {
        return `
          <div class="standings-group-block">
            <h3 class="standings-group-title">${escapeHtml(group.name)}</h3>
            ${renderTable(group.rows)}
          </div>
        `;
      })
      .join("");
  }

  function renderTable(rows) {
    if (!rows.length) {
      return `<div class="standings-empty">No teams in this group yet.</div>`;
    }

    return `
      <table class="bf-fd-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(function (row) {
            return `
              <tr>
                <td>${escapeHtml(row.rank ?? "")}</td>
                <td class="bf-fd-team">
                  ${row.team?.logo ? `<img src="${escapeHtml(row.team.logo)}" alt="${escapeHtml(row.team.name || "Team")}">` : ""}
                  <span>${escapeHtml(row.team?.name || "Team")}</span>
                </td>
                <td>${escapeHtml(row.all?.played ?? 0)}</td>
                <td>${escapeHtml(row.all?.win ?? 0)}</td>
                <td>${escapeHtml(row.all?.draw ?? 0)}</td>
                <td>${escapeHtml(row.all?.lose ?? 0)}</td>
                <td>${escapeHtml(row.all?.goals?.for ?? 0)}</td>
                <td>${escapeHtml(row.all?.goals?.against ?? 0)}</td>
                <td>${escapeHtml(row.goalsDiff ?? 0)}</td>
                <td><strong>${escapeHtml(row.points ?? 0)}</strong></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    `;
  }

  function selectRecentFixtures(fixtures) {
    return fixtures
      .filter(function (item) {
        const status = item.fixture?.status?.short;
        return finishedStatuses.has(status);
      })
      .sort(function (a, b) {
        return (b.fixture?.timestamp || 0) - (a.fixture?.timestamp || 0);
      })
      .slice(0, 8);
  }

  function selectUpcomingFixtures(fixtures) {
    const now = Date.now();

    return fixtures
      .filter(function (item) {
        const date = item.fixture?.date;
        const status = item.fixture?.status?.short;
        return date && new Date(date).getTime() >= now && !finishedStatuses.has(status);
      })
      .sort(function (a, b) {
        return (a.fixture?.timestamp || 0) - (b.fixture?.timestamp || 0);
      })
      .slice(0, 8);
  }

  function renderMatches(target, matches, type) {
    if (!target) return;

    if (!matches.length) {
      target.innerHTML = `
        <div class="standings-empty">
          ${type === "last" ? "Finished World Cup matches will appear here." : "Upcoming World Cup fixtures will appear here."}
        </div>
      `;
      return;
    }

    target.innerHTML = `
      <div class="bf-match-list">
        ${matches.map(function (match) {
          const home = match.teams?.home || {};
          const away = match.teams?.away || {};
          const goals = match.goals || {};
          const fixture = match.fixture || {};
          const date = fixture.date ? new Date(fixture.date) : null;
          const isFinished = finishedStatuses.has(fixture.status?.short);
          const score =
            isFinished && goals.home !== null && goals.home !== undefined && goals.away !== null && goals.away !== undefined
              ? `${goals.home} - ${goals.away}`
              : "vs";
          const statusLabel = isFinished ? fixture.status?.short || "FT" : formatMatchTime(date);

          return `
            <a class="bf-match-row" href="match.html?id=${encodeURIComponent(fixture.id || "")}">
              <div class="bf-match-team">
                ${home.logo ? `<img src="${escapeHtml(home.logo)}" alt="${escapeHtml(home.name || "Home")}">` : ""}
                <span>${escapeHtml(home.name || "Home")}</span>
              </div>
              <div class="bf-match-center">
                <strong>${escapeHtml(score)}</strong>
                <em>${escapeHtml(statusLabel)}</em>
              </div>
              <div class="bf-match-team bf-match-team-away">
                <span>${escapeHtml(away.name || "Away")}</span>
                ${away.logo ? `<img src="${escapeHtml(away.logo)}" alt="${escapeHtml(away.name || "Away")}">` : ""}
              </div>
            </a>
          `;
        }).join("")}
      </div>
    `;
  }

  function formatMatchTime(date) {
    if (!date || Number.isNaN(date.getTime())) return "Date TBA";

    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: CONFIG.timezone || undefined
    });
  }

  function formatCacheDate(value) {
    if (!value) return "Cached World Cup data";

    try {
      return `Cached World Cup data • ${new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: CONFIG.timezone || undefined
      }).format(new Date(value))}`;
    } catch {
      return "Cached World Cup data";
    }
  }

  function setText(el, value) {
    if (el) el.textContent = value;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
});
