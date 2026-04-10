async function loadStandingsPage() {
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
  const viewButtons = document.querySelectorAll(".standings-view-tab");

  if (!tableWrap) {
    console.error("Standings page: standings-table-wrap not found.");
    return;
  }

  try {
    const response = await fetch("data/standings.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.leagues) || data.leagues.length === 0) {
      throw new Error("Invalid standings.json structure.");
    }

    const params = new URLSearchParams(window.location.search);
    const requestedLeagueId = (params.get("league") || "").trim();

    let currentLeagueId =
      data.leagues.some((league) => league.id === requestedLeagueId)
        ? requestedLeagueId
        : data.defaultLeague || data.leagues[0].id;

    let currentView = "table";

    function getLeague() {
      return data.leagues.find((league) => league.id === currentLeagueId) || data.leagues[0];
    }

    function getZoneClass(zone) {
      switch (zone) {
        case "cl":
          return "zone-cl";
        case "el":
          return "zone-el";
        case "rel":
          return "zone-rel";
        default:
          return "zone-safe";
      }
    }

    function getFormBadgeClass(value) {
      switch (String(value).toUpperCase()) {
        case "W":
          return "form-win";
        case "D":
          return "form-draw";
        default:
          return "form-loss";
      }
    }

    function createCell(text, className = "standings-cell") {
      const div = document.createElement("div");
      div.className = className;
      div.textContent = text ?? "";
      return div;
    }

    function renderLeagueFilters() {
      if (!leagueFilterList) return;

      leagueFilterList.innerHTML = "";

      data.leagues.forEach((league) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `league-filter-btn${league.id === currentLeagueId ? " active" : ""}`;
        btn.textContent = league.name || "League";

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

    function renderTable(league) {
      tableWrap.innerHTML = "";

      const head = document.createElement("div");
      head.className = "standings-table-head";

      [
        "#",
        "Team",
        "P",
        "W",
        "D",
        "L",
        "GF-GA",
        "Pts",
        "Form"
      ].forEach((label) => {
        const cell = document.createElement("div");
        cell.textContent = label;
        head.appendChild(cell);
      });

      tableWrap.appendChild(head);

      const rows = Array.isArray(league.table) ? league.table : [];

      if (!rows.length) {
        const empty = document.createElement("div");
        empty.className = "standings-empty";
        empty.textContent = "No table data available.";
        tableWrap.appendChild(empty);
        return;
      }

      rows.forEach((row) => {
        const rowEl = document.createElement("div");
        rowEl.className = `standings-row ${getZoneClass(row.zone)}`;

        rowEl.appendChild(createCell(row.pos ?? "", "standings-cell standings-pos"));

        const teamCell = document.createElement("div");
        teamCell.className = "standings-cell standings-team";

        const zoneLine = document.createElement("span");
        zoneLine.className = "standings-zone-line";

        const teamName = document.createElement("span");
        teamName.textContent = row.team || "";

        teamCell.appendChild(zoneLine);
        teamCell.appendChild(teamName);

        rowEl.appendChild(teamCell);
        rowEl.appendChild(createCell(row.played ?? ""));
        rowEl.appendChild(createCell(row.wins ?? ""));
        rowEl.appendChild(createCell(row.draws ?? ""));
        rowEl.appendChild(createCell(row.losses ?? ""));
        rowEl.appendChild(createCell(`${row.gf ?? 0}-${row.ga ?? 0}`));
        rowEl.appendChild(createCell(row.points ?? "", "standings-cell standings-points"));

        const formCell = document.createElement("div");
        formCell.className = "standings-cell standings-form";

        const formArray = Array.isArray(row.form) ? row.form : [];
        formArray.forEach((formValue) => {
          const badge = document.createElement("span");
          badge.className = getFormBadgeClass(formValue);
          badge.textContent = String(formValue).toUpperCase();
          formCell.appendChild(badge);
        });

        rowEl.appendChild(formCell);
        tableWrap.appendChild(rowEl);
      });
    }

    function renderAltMatches(target, items, emptyText) {
      if (!target) return;

      target.innerHTML = "";

      const list = Array.isArray(items) ? items : [];

      if (!list.length) {
        const empty = document.createElement("div");
        empty.className = "standings-empty";
        empty.textContent = emptyText;
        target.appendChild(empty);
        return;
      }

      list.forEach((item) => {
        const row = document.createElement("div");
        row.className = "standings-match-row";

        const time = document.createElement("div");
        time.className = "standings-match-time";
        time.textContent = item.time || "";

        const match = document.createElement("div");
        match.className = "standings-match-name";
        match.textContent = item.match || "";

        const status = document.createElement("div");
        status.className = "standings-match-status";
        status.textContent = item.score || item.status || "";

        row.appendChild(time);
        row.appendChild(match);
        row.appendChild(status);

        target.appendChild(row);
      });
    }

    function updateViewVisibility() {
      if (tableWrap) {
        tableWrap.classList.toggle("hidden-view", currentView !== "table");
      }

      if (lastWrap) {
        lastWrap.classList.toggle("hidden-view", currentView !== "last");
      }

      if (upcomingWrap) {
        upcomingWrap.classList.toggle("hidden-view", currentView !== "upcoming");
      }

      if (panelTitle) {
        if (currentView === "table") panelTitle.textContent = "League Table";
        if (currentView === "last") panelTitle.textContent = "Recent Matches";
        if (currentView === "upcoming") panelTitle.textContent = "Upcoming Matches";
      }

      viewButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.view === currentView);
      });
    }

    function renderLeagueMeta(league) {
      if (leagueCountry) leagueCountry.textContent = league.country || "";
      if (leagueName) leagueName.textContent = league.name || "";
      if (leagueSeason) leagueSeason.textContent = league.season || "";
      if (leagueInsightTitle) leagueInsightTitle.textContent = league.insightTitle || "League insight";
      if (leagueInsightText) {
        leagueInsightText.textContent =
          league.insightText || "No insight available for this league yet.";
      }
    }

    function renderAll() {
      const league = getLeague();
      if (!league) return;

      renderLeagueMeta(league);
      renderLeagueFilters();
      renderTable(league);
      renderAltMatches(lastWrap, league.lastMatches, "No recent matches.");
      renderAltMatches(upcomingWrap, league.upcomingMatches, "No upcoming matches.");
      updateViewVisibility();
    }

    viewButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        currentView = btn.dataset.view || "table";
        updateViewVisibility();
      });
    });

    renderAll();
  } catch (error) {
    console.error("Failed to load standings page:", error);

    if (tableWrap) {
      tableWrap.innerHTML = `
        <div class="standings-empty">
          Failed to load standings data. Check <code>data/standings.json</code>.
        </div>
      `;
    }

    if (lastWrap) lastWrap.innerHTML = "";
    if (upcomingWrap) upcomingWrap.innerHTML = "";
  }
}

document.addEventListener("DOMContentLoaded", loadStandingsPage);
