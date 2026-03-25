async function loadStandingsPage() {
  try {
    const response = await fetch("data/standings.json");
    const data = await response.json();

    const leagueFilterList = document.getElementById("league-filter-list");
    const tableWrap = document.getElementById("standings-table-wrap");
    const lastWrap = document.getElementById("standings-last-wrap");
    const upcomingWrap = document.getElementById("standings-upcoming-wrap");

    const leagueCountry = document.getElementById("league-country");
    const leagueName = document.getElementById("league-name");
    const leagueSeason = document.getElementById("league-season");
    const leagueInsightTitle = document.getElementById("league-insight-title");
    const leagueInsightText = document.getElementById("league-insight-text");
    const panelTitle = document.getElementById("standings-panel-title");

    const params = new URLSearchParams(window.location.search);
    let currentLeagueId = params.get("league") || data.defaultLeague;
    let currentView = "table";

    function zoneClass(zone) {
      if (zone === "cl") return "zone-cl";
      if (zone === "el") return "zone-el";
      if (zone === "rel") return "zone-rel";
      return "zone-safe";
    }

    function formBadgeClass(value) {
      if (value === "W") return "form-win";
      if (value === "D") return "form-draw";
      return "form-loss";
    }

    function renderLeagueFilters() {
      leagueFilterList.innerHTML = "";

      data.leagues.forEach((league) => {
        const btn = document.createElement("button");
        btn.className = `league-filter-btn ${league.id === currentLeagueId ? "active" : ""}`;
        btn.innerText = league.name;
        btn.addEventListener("click", () => {
          currentLeagueId = league.id;
          const url = new URL(window.location);
          url.searchParams.set("league", currentLeagueId);
          window.history.replaceState({}, "", url);
          renderAll();
        });
        leagueFilterList.appendChild(btn);
      });
    }

    function renderTable(league) {
      tableWrap.innerHTML = `
        <div class="standings-table-head">
          <div>#</div>
          <div>Team</div>
          <div>P</div>
          <div>W</div>
          <div>D</div>
          <div>L</div>
          <div>GF-GA</div>
          <div>Pts</div>
          <div>Form</div>
        </div>
      `;

      league.table.forEach((row) => {
        const item = document.createElement("div");
        item.className = `standings-row ${zoneClass(row.zone)}`;

        item.innerHTML = `
          <div class="standings-cell standings-pos">${row.pos}</div>
          <div class="standings-cell standings-team">
            <span class="standings-zone-line ${zoneClass(row.zone)}"></span>
            <span>${row.team}</span>
          </div>
          <div class="standings-cell">${row.played}</div>
          <div class="standings-cell">${row.wins}</div>
          <div class="standings-cell">${row.draws}</div>
          <div class="standings-cell">${row.losses}</div>
          <div class="standings-cell">${row.gf}-${row.ga}</div>
          <div class="standings-cell standings-points">${row.points}</div>
          <div class="standings-cell standings-form">
            ${row.form.map((f) => `<span class="${formBadgeClass(f)}">${f}</span>`).join("")}
          </div>
        `;

        tableWrap.appendChild(item);
      });
    }

    function renderAltMatches(target, items, emptyTitle) {
      target.innerHTML = "";

      if (!items || !items.length) {
        target.innerHTML = `<div class="standings-empty">${emptyTitle}</div>`;
        return;
      }

      items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "standings-match-row";
        row.innerHTML = `
          <div class="standings-match-time">${item.time}</div>
          <div class="standings-match-name">${item.match}</div>
          <div class="standings-match-status">${item.score ? item.score : item.status}</div>
        `;
        target.appendChild(row);
      });
    }

    function updateViewVisibility() {
      tableWrap.classList.toggle("hidden-view", currentView !== "table");
      lastWrap.classList.toggle("hidden-view", currentView !== "last");
      upcomingWrap.classList.toggle("hidden-view", currentView !== "upcoming");

      if (currentView === "table") panelTitle.innerText = "League Table";
      if (currentView === "last") panelTitle.innerText = "Last Matches";
      if (currentView === "upcoming") panelTitle.innerText = "Upcoming Matches";

      document.querySelectorAll(".standings-view-tab").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.view === currentView);
      });
    }

    function renderAll() {
      const league = data.leagues.find((l) => l.id === currentLeagueId) || data.leagues[0];

      leagueCountry.innerText = league.country;
      leagueName.innerText = league.name;
      leagueSeason.innerText = league.season;
      leagueInsightTitle.innerText = league.insightTitle;
      leagueInsightText.innerText = league.insightText;

      renderLeagueFilters();
      renderTable(league);
      renderAltMatches(lastWrap, league.lastMatches, "No recent matches");
      renderAltMatches(upcomingWrap, league.upcomingMatches, "No upcoming matches");
      updateViewVisibility();
    }

    document.querySelectorAll(".standings-view-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentView = btn.dataset.view;
        updateViewVisibility();
      });
    });

    renderAll();
  } catch (error) {
    console.error("Failed to load standings:", error);
  }
}

loadStandingsPage();
