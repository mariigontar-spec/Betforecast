const BF_LEAGUES = [
  { id: "39", name: "Premier League", country: "England" },
  { id: "140", name: "La Liga", country: "Spain" },
  { id: "135", name: "Serie A", country: "Italy" }
];

const BF_SEASON = 2025;

async function loadStandingsPage() {
  const leagueFilterList = document.getElementById("league-filter-list");
  const tableWrap = document.getElementById("standings-table-wrap");

  const leagueCountry = document.getElementById("league-country");
  const leagueName = document.getElementById("league-name");
  const leagueSeason = document.getElementById("league-season");
  const leagueInsightTitle = document.getElementById("league-insight-title");
  const leagueInsightText = document.getElementById("league-insight-text");

  if (!tableWrap) return;

  const params = new URLSearchParams(window.location.search);
  let currentLeagueId = params.get("league") || "39";

  function getLeague() {
    return BF_LEAGUES.find((league) => league.id === currentLeagueId) || BF_LEAGUES[0];
  }

  function formBadgeClass(value) {
    if (value === "W") return "form-win";
    if (value === "D") return "form-draw";
    return "form-loss";
  }

  function zoneClass(rank) {
    if (rank <= 4) return "zone-cl";
    if (rank <= 6) return "zone-el";
    if (rank >= 18) return "zone-rel";
    return "zone-safe";
  }

  function renderLeagueFilters() {
    if (!leagueFilterList) return;

    leagueFilterList.innerHTML = "";

    BF_LEAGUES.forEach((league) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `league-filter-btn ${league.id === currentLeagueId ? "active" : ""}`;
      btn.textContent = league.name;

      btn.addEventListener("click", () => {
        currentLeagueId = league.id;

        const url = new URL(window.location.href);
        url.searchParams.set("league", currentLeagueId);
        window.history.replaceState({}, "", url);

        renderAll();
      });

      leagueFilterList.appendChild(btn);
    });
  }

  function renderTable(rows) {
    tableWrap.innerHTML = `
      <div class="standings-table-head">
        <div class="standings-col-pos">#</div>
        <div class="standings-col-team">Team</div>
        <div class="standings-col-stat">P</div>
        <div class="standings-col-stat">W</div>
        <div class="standings-col-stat">D</div>
        <div class="standings-col-stat">L</div>
        <div class="standings-col-goals">GF-GA</div>
        <div class="standings-col-points">Pts</div>
        <div class="standings-col-form">Form</div>
      </div>
    `;

    rows.forEach((row) => {
      const stats = row.all || {};
      const team = row.team || {};
      const rank = row.rank || 0;
      const form = row.form ? row.form.split("").slice(-5) : [];

      const item = document.createElement("div");
      item.className = `standings-row ${zoneClass(rank)}`;

      item.innerHTML = `
        <div class="standings-cell standings-pos">${rank}</div>

        <div class="standings-cell standings-team">
          <span class="standings-zone-line"></span>
          <img src="${team.logo}" alt="${team.name}" class="standings-team-logo">
          <span class="standings-team-name">${team.name}</span>
        </div>

        <div class="standings-cell">${stats.played ?? 0}</div>
        <div class="standings-cell">${stats.win ?? 0}</div>
        <div class="standings-cell">${stats.draw ?? 0}</div>
        <div class="standings-cell">${stats.lose ?? 0}</div>
        <div class="standings-cell">${stats.goals?.for ?? 0}-${stats.goals?.against ?? 0}</div>
        <div class="standings-cell standings-points">${row.points ?? 0}</div>

        <div class="standings-cell standings-form">
          ${form.map((value) => `<span class="${formBadgeClass(value)}">${value}</span>`).join("")}
        </div>
      `;

      tableWrap.appendChild(item);
    });
  }

  async function renderAll() {
    const league = getLeague();

    if (leagueCountry) leagueCountry.textContent = league.country;
    if (leagueName) leagueName.textContent = league.name;
    if (leagueSeason) leagueSeason.textContent = BF_SEASON;
    if (leagueInsightTitle) leagueInsightTitle.textContent = "Live league table";
    if (leagueInsightText) leagueInsightText.textContent = "Standings are loaded directly from API-Football.";

    renderLeagueFilters();

    tableWrap.innerHTML = `<div class="standings-empty">Loading ${league.name}...</div>`;

    try {
      const response = await fetch(
  `${BF_API.baseUrl}/standings?league=39&season=2025`,
  {
    method: "GET",
    headers: {
      "x-apisports-key": BF_API.key
    }
  }
);
      const data = await response.json();
      const rows =
  data.response?.[0]?.league?.standings?.flat?.() ||
  data.response?.[0]?.league?.standings?.[0] ||
  [];
      if (!rows.length) {
        tableWrap.innerHTML = `<div class="standings-empty">No standings found for ${league.name}.</div>`;
        return;
      }

      renderTable(rows);
    } catch (error) {
      console.error(error);
      tableWrap.innerHTML = `<div class="standings-empty">Could not load standings.</div>`;
    }
  }

  renderAll();
}

document.addEventListener("DOMContentLoaded", loadStandingsPage);
