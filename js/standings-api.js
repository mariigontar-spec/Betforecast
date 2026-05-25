document.addEventListener("DOMContentLoaded", function () {
  const tableWrap = document.getElementById("standings-table-wrap");
  if (!tableWrap) return;

  const LEAGUE_ID = 39;
  const SEASON = 2024;
  const CACHE_KEY = `bf_standings_${LEAGUE_ID}_${SEASON}`;
  const CACHE_TIME = 6 * 60 * 60 * 1000; // 6 hours

  async function loadStandings() {
    const cached = getCache();
function getRowClass(rank) {

  if (rank <= 4) {
    return "zone-cl";
  }

  if (rank <= 6) {
    return "zone-el";
  }

  if (rank >= 18) {
    return "zone-rel";
  }

  return "zone-safe";
}
    if (cached) {
      renderTable(cached);
      return;
    }

    tableWrap.innerHTML = `<div class="standings-loading">Loading league table...</div>`;

    try {
      const response = await fetch(
        `${BF_API.baseUrl}/standings?league=${LEAGUE_ID}&season=${SEASON}`,
        {
          headers: {
            "x-apisports-key": BF_API.key
          }
        }
      );

      const data = await response.json();

      if (!response.ok || data.errors?.length) {
        throw new Error("API-Football standings request failed");
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

  function getCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;

      const cached = JSON.parse(raw);
      const isFresh = Date.now() - cached.savedAt < CACHE_TIME;

      return isFresh ? cached.data : null;
    } catch {
      return null;
    }
  }

  function saveCache(data) {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        savedAt: Date.now(),
        data
      })
    );
  }

  function renderTable(table) {
    if (!table.length) {
      tableWrap.innerHTML = `<div class="standings-empty">No standings found.</div>`;
      return;
    }

    tableWrap.innerHTML = `
      <table class="bf-fd-table">
        <thead>
          <tr class="${getRowClass(row.rank)}">
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
          ${table.map(row => `
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
          `).join("")}
        </tbody>
      </table>
    `;
  }

  loadStandings();
});
