document.addEventListener("DOMContentLoaded", function () {
  const tableWrap = document.getElementById("standings-table-wrap");
  const lastWrap = document.getElementById("standings-last-wrap");
  const upcomingWrap = document.getElementById("standings-upcoming-wrap");
  const tabs = document.querySelectorAll(".standings-view-tab");

  if (!tableWrap) return;

  if (typeof BF_API === "undefined") {
    tableWrap.innerHTML = `<div class="standings-empty">API config not found.</div>`;
    return;
  }

  const LEAGUE_ID = 39;
  const SEASON = 2024;
  const CACHE_TIME = 6 * 60 * 60 * 1000;
  const STANDINGS_CACHE_KEY = `bf_standings_${LEAGUE_ID}_${SEASON}`;

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

      if (view === "last" && lastWrap && !lastWrap.dataset.loaded) {
        loadMatches("last");
      }

      if (view === "upcoming" && upcomingWrap && !upcomingWrap.dataset.loaded) {
        loadMatches("upcoming");
      }
    });
  });

  async function loadStandings() {
    const cached = getCache(STANDINGS_CACHE_KEY);

    if (cached) {
      renderTable(cached);
      return;
    }

    tableWrap.innerHTML = `<div class="standings-loading">Loading league table...</div>`;

    try {
      const response = await fetch(
        `${BF_API.baseUrl}/standings?league=${LEAGUE_ID}&season=${SEASON}`,
        {
          method: "GET",
          headers: {
            "x-apisports-key": BF_API.key
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`API status ${response.status}`);
      }

      if (data.errors && Object.keys(data.errors).length > 0) {
        throw new Error(JSON.stringify(data.errors));
      }

      const table = data.response?.[0]?.league?.standings?.[0] || [];

      saveCache(STANDINGS_CACHE_KEY, table);
      renderTable(table);
    } catch (error) {
      console.error(error);
      tableWrap.innerHTML = `<div class="standings-empty">Could not load standings right now.</div>`;
    }
  }

  function renderTable(table) {
    if (!table.length) {
      tableWrap.innerHTML = `<div class="standings-empty">No standings found.</div>`;
      return;
    }

    tableWrap.innerHTML = `
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
          ${table.map(function (row) {
            return `
              <tr>
                <td>${row.rank}</td>

                <td class="bf-fd-team">
                  <img src="${row.team.logo}" alt="${row.team.name}">
                  <span>${row.team.name}</span>
                </td>

                <td>${row.all.played}</td>
                <td>${row.all.win}</td>
                <td>${row.all.draw}</td>
                <td>${row.all.lose}</td>
                <td>${row.all.goals.for}</td>
                <td>${row.all.goals.against}</td>
                <td>${row.goalsDiff}</td>
                <td><strong>${row.points}</strong></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    `;
  }

  async function loadMatches(type) {
    const target = type === "last" ? lastWrap : upcomingWrap;
    if (!target) return;

    const cacheKey = `bf_matches_${type}_${LEAGUE_ID}_${SEASON}`;
    const cached = getCache(cacheKey);

    if (cached) {
      renderMatches(target, cached, type);
      target.dataset.loaded = "true";
      return;
    }

    target.innerHTML = `
      <div class="standings-loading">
        Loading ${type === "last" ? "recent" : "upcoming"} matches...
      </div>
    `;

    const endpoint =
      type === "last"
        ? `${BF_API.baseUrl}/fixtures?league=${LEAGUE_ID}&season=${SEASON}&last=8`
        : `${BF_API.baseUrl}/fixtures?league=${LEAGUE_ID}&season=${SEASON}&next=8`;

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "x-apisports-key": BF_API.key
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`API status ${response.status}`);
      }

      if (data.errors && Object.keys(data.errors).length > 0) {
        throw new Error(JSON.stringify(data.errors));
      }

      const matches = data.response || [];

      saveCache(cacheKey, matches);
      renderMatches(target, matches, type);
      target.dataset.loaded = "true";
    } catch (error) {
      console.error(error);
      target.innerHTML = `<div class="standings-empty">Could not load matches right now.</div>`;
    }
  }

  function renderMatches(target, matches, type) {
    if (!matches.length) {
      target.innerHTML = `
        <div class="standings-empty">
          No ${type === "last" ? "recent" : "upcoming"} matches found.
        </div>
      `;
      return;
    }

    target.innerHTML = `
      <div class="bf-match-list">
        ${matches.map(function (match) {
          const home = match.teams.home;
          const away = match.teams.away;
          const goals = match.goals;
          const fixture = match.fixture;
          const date = new Date(fixture.date);

          const isFinished = ["FT", "AET", "PEN"].includes(fixture.status.short);

          const score =
            isFinished && goals.home !== null && goals.away !== null
              ? `${goals.home} - ${goals.away}`
              : "vs";

          const statusLabel = isFinished ? "FT" : formatMatchTime(date);

          return `
            <a class="bf-match-row" href="match.html?fixture=${fixture.id}">
              <div class="bf-match-team">
                <img src="${home.logo}" alt="${home.name}">
                <span>${home.name}</span>
              </div>

              <div class="bf-match-center">
                <strong>${score}</strong>
                <em>${statusLabel}</em>
              </div>

              <div class="bf-match-team bf-match-team-away">
                <span>${away.name}</span>
                <img src="${away.logo}" alt="${away.name}">
              </div>
            </a>
          `;
        }).join("")}
      </div>
    `;
  }

  function formatMatchTime(date) {
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function saveCache(key, data) {
    localStorage.setItem(
      key,
      JSON.stringify({
        savedAt: Date.now(),
        data: data
      })
    );
  }

  function getCache(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;

      const cached = JSON.parse(raw);

      if (Date.now() - cached.savedAt > CACHE_TIME) {
        localStorage.removeItem(key);
        return null;
      }

      return cached.data;
    } catch (error) {
      return null;
    }
  }

  loadStandings();
});
