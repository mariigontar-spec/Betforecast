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

  if (!tableWrap) {
    console.error("standings-table-wrap not found");
    return;
  }

  try {
    const response = await fetch("data/standings.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data?.leagues?.length) {
      throw new Error("standings.json is empty or invalid");
    }

    const params = new URLSearchParams(window.location.search);
    let currentLeagueId = params.get("league") || data.defaultLeague || data.leagues[0].id;
    let currentView = "table";

    function getLeague() {
      return data.leagues.find((league) => league.id === currentLeagueId) || data.leagues[0];
    }

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

    function createMiniCircle(label, extraClass = "") {
      return `<span class="league-mini-circle ${extraClass}">${label}</span>`;
    }

    function getLeagueCircle(leagueNameText) {
      const name = (leagueNameText || "").toLowerCase();

      if (name.includes("premier")) return createMiniCircle("PL");
      if (name.includes("liga")) return createMiniCircle("LL");
      if (name.includes("serie")) return createMiniCircle("SA");
      if (name.includes("bundes")) return createMiniCircle("BL");
      if (name.includes("champions")) return createMiniCircle("CL");
      if (name.includes("ligue")) return createMiniCircle("L1");

      return createMiniCircle("LG");
    }

    function getTeamCircle(teamName) {
      const words = (teamName || "").trim().split(" ").filter(Boolean);

      const short = words
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      return createMiniCircle(short || "TM", "team-circle");
    }

    function renderLeagueFilters() {
      if (!leagueFilterList) return;

      leagueFilterList.innerHTML = "";

      data.leagues.forEach((league) => {
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

    function renderTable(league) {
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

      league.table.forEach((row) => {
        const item = document.createElement("div");
        item.className = `standings-row ${zoneClass(row.zone)}`;

        item.innerHTML = `
          <div class="standings-cell standings-pos">${row.pos}</div>

          <div class="standings-cell standings-team">
            <span class="standings-zone-line"></span>
            ${getTeamCircle(row.team)}
            <span class="standings-team-name">${row.team}</span>
          </div>

          <div class="standings-cell">${row.played}</div>
          <div class="standings-cell">${row.wins}</div>
          <div class="standings-cell">${row.draws}</div>
          <div class="standings-cell">${row.losses}</div>
          <div class="standings-cell">${row.gf}-${row.ga}</div>
          <div class="standings-cell standings-points">${row.points}</div>

          <div class="standings-cell standings-form">
            ${Array.isArray(row.form) ? row.form.map((value) => `<span class="${formBadgeClass(value)}">${value}</span>`).join("") : ""}
          </div>
        `;

        tableWrap.appendChild(item);
      });
    }

    function renderAltMatches(target, items, emptyText) {
      if (!target) return;

      target.innerHTML = "";

      if (!Array.isArray(items) || items.length === 0) {
        target.innerHTML = `<div class="standings-empty">${emptyText}</div>`;
        return;
      }

      items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "standings-match-row glow-hover";

        row.innerHTML = `
          <div class="standings-match-time">${item.time || ""}</div>
          <div class="standings-match-name">
            ${getLeagueCircle(item.league || "")}
            <span>${item.match || ""}</span>
          </div>
          <div class="standings-match-status">${item.score || item.status || ""}</div>
        `;

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

      document.querySelectorAll(".standings-view-tab").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.view === currentView);
      });
    }

    function initGlowHover() {
      document.querySelectorAll(".glow-hover").forEach((el) => {
        el.addEventListener("mousemove", (e) => {
          const rect = el.getBoundingClientRect();
          el.style.setProperty("--x", `${e.clientX - rect.left}px`);
          el.style.setProperty("--y", `${e.clientY - rect.top}px`);
        });
      });
    }

    function renderAll() {
      const league = getLeague();
      if (!league) return;

      if (leagueCountry) leagueCountry.textContent = league.country || "";
      if (leagueName) leagueName.textContent = league.name || "";
      if (leagueSeason) leagueSeason.textContent = league.season || "";
      if (leagueInsightTitle) leagueInsightTitle.textContent = league.insightTitle || "";
      if (leagueInsightText) leagueInsightText.textContent = league.insightText || "";

      renderLeagueFilters();
      renderTable(league);
      renderAltMatches(lastWrap, league.lastMatches, "No recent matches");
      renderAltMatches(upcomingWrap, league.upcomingMatches, "No upcoming matches");
      updateViewVisibility();
      initGlowHover();
    }

    document.querySelectorAll(".standings-view-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentView = btn.dataset.view;
        updateViewVisibility();
      });
    });

    renderAll();
  } catch (error) {
    console.error("Failed to load standings page:", error);

    tableWrap.innerHTML = `
      <div class="standings-empty">
        Failed to load standings data. Check data/standings.json and browser console.
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadStandingsPage);
