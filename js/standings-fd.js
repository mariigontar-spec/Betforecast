alert("standings-fd.js loaded");

document.addEventListener("DOMContentLoaded", function () {

  const tableWrap = document.getElementById("standings-table-wrap");

  if (!tableWrap) return;

  const API_KEY = FD_API.key;
  const BASE_URL = FD_API.baseUrl;

  async function loadStandings() {

    tableWrap.innerHTML = `
      <div class="standings-loading">
        Loading standings...
      </div>
    `;

    try {

      const response = await fetch(
        `${BASE_URL}/competitions/PL/standings`,
        {
          method: "GET",
          headers: {
            "X-Auth-Token": API_KEY
          }
        }
      );

      const raw = await response.text();

      if (!response.ok) {
        throw new Error(`Status ${response.status}: ${raw}`);
      }

      const standingsData = JSON.parse(raw);

      const table =
        standingsData.standings?.[0]?.table || [];

      renderTable(table);

    } catch (error) {

      console.error(error);

      tableWrap.innerHTML = `
        <div class="standings-empty">
          ${error.message}
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
            <th>Pts</th>
          </tr>
        </thead>

        <tbody>

          ${table.map(function(row) {

            return `
              <tr>

                <td>${row.position}</td>

                <td class="bf-fd-team">
                  <img src="${row.team.crest}" alt="">
                  <span>${row.team.name}</span>
                </td>

                <td>${row.playedGames}</td>
                <td>${row.won}</td>
                <td>${row.draw}</td>
                <td>${row.lost}</td>
                <td>${row.goalsFor}</td>
                <td>${row.goalsAgainst}</td>
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

  loadStandings();

});
