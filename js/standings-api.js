document.addEventListener("DOMContentLoaded", function () {
  const tableWrap = document.getElementById("standings-table-wrap");
  const lastWrap = document.getElementById("standings-last-wrap");
  const upcomingWrap = document.getElementById("standings-upcoming-wrap");
  const tabs = document.querySelectorAll(".standings-view-tab");

  if (!tableWrap) return;

  if (typeof BF_API === "undefined") {
    tableWrap.innerHTML = `
      <div class="standings-empty">
        API config not found.
      </div>
    `;
    return;
  }

  const LEAGUE_ID = 39;
  const SEASON = 2024;

  const CACHE_KEY = `bf_standings_${LEAGUE_ID}_${SEASON}`;
  const CACHE_TIME = 6 * 60 * 60 * 1000;

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
        lastWrap.innerHTML = `
          <div class="standings-empty">
            Recent matches will be connected next.
          </div>
        `;
        lastWrap.dataset.loaded = "true";
      }

      if (view === "upcoming" && upcomingWrap && !upcomingWrap.dataset.loaded) {
        upcomingWrap.innerHTML = `
          <div class="standings-empty">
            Upcoming matches will be connected next.
          </div>
        `;
        upcomingWrap.dataset.loaded = "true";
      }
    });
  });

  async function loadStandings() {
    const cached = getCache();

    if (cached) {
      renderTable(cached);
      return;
    }

    tableWrap.innerHTML = `
      <div class="standings-loading">
        Loading league table...
      </div>
    `;

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

      saveCache(table);
      renderTable(table);
    } catch (error) {
      console.error(error);

      tableWrap.innerHTML = `
        <div class="standings-empty">
          Could not load standings right now.
        </div>
      `;
    }
  }

  function renderTable(table) {
    if (!table.length) {
      tableWrap.innerHTML = `
        <div class="standings-empty">
          No standings found.
        </div>
      `;
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
                <td class="zone-marker ${getRowClass(row.rank)}">
                  ${row.rank}
                </td>

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

                <td>
                  <strong>${row.points}</strong>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    `;
  }

  function getRowClass(rank) {
    if (rank <= 4) return "zone-cl";
    if (rank <= 6) return "zone-el";
    if (rank >= 18) return "zone-rel";
    return "zone-safe";
  }

  function saveCache(data) {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        savedAt: Date.now(),
        data: data
      })
    );
  }

  function getCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);

      if (!raw) return null;

      const cached = JSON.parse(raw);

      if (Date.now() - cached.savedAt > CACHE_TIME) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return cached.data;
    } catch (error) {
      return null;
    }
  }

  loadStandings();
});
