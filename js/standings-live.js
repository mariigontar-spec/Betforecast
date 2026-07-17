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

  const FINAL_MATCHES = [
    {
      id: "final",
      label: "World Cup Final",
      home: "Spain",
      away: "Argentina",
      homeLogo: "https://flagcdn.com/w160/es.png",
      awayLogo: "https://flagcdn.com/w160/ar.png",
      date: "19 Jul 2026",
      timeTallinn: "22:00 Tallinn",
      timeMiami: "15:00 Miami",
      timeSpain: "21:00 Spain",
      timeArgentina: "16:00 Argentina",
      venue: "New York New Jersey Stadium",
      tag: "Final",
      href: "match.html?fixture=final",
      note: "Main event: Spain control and rhythm against Argentina transition fire."
    },
    {
      id: "bronze",
      label: "Bronze Final",
      home: "France",
      away: "England",
      homeLogo: "https://flagcdn.com/w160/fr.png",
      awayLogo: "https://flagcdn.com/w160/gb-eng.png",
      date: "18 Jul 2026",
      timeTallinn: "00:00 Tallinn",
      timeMiami: "17:00 Miami",
      timeSpain: "23:00 Spain",
      timeArgentina: "18:00 Argentina",
      venue: "Miami Stadium",
      tag: "3rd Place",
      href: "match.html?fixture=bronze",
      note: "Bronze match: France and England play for the final podium place."
    }
  ];

  const RECENT_RESULTS = [
    {
      id: "sf-france-spain",
      stage: "Semifinal",
      home: "France",
      away: "Spain",
      homeLogo: "https://flagcdn.com/w160/fr.png",
      awayLogo: "https://flagcdn.com/w160/es.png",
      score: "0 - 2",
      status: "FT",
      note: "Spain advanced to the World Cup Final",
      href: "results.html"
    },
    {
      id: "sf-england-argentina",
      stage: "Semifinal",
      home: "England",
      away: "Argentina",
      homeLogo: "https://flagcdn.com/w160/gb-eng.png",
      awayLogo: "https://flagcdn.com/w160/ar.png",
      score: "1 - 2",
      status: "FT",
      note: "Argentina advanced to the World Cup Final",
      href: "results.html"
    },
    {
      id: "qf-spain-belgium",
      stage: "Quarterfinal",
      home: "Spain",
      away: "Belgium",
      homeLogo: "https://flagcdn.com/w160/es.png",
      awayLogo: "https://flagcdn.com/w160/be.png",
      score: "2 - 1",
      status: "FT",
      note: "Spain moved into the semifinal path",
      href: "results.html"
    },
    {
      id: "qf-argentina-switzerland",
      stage: "Quarterfinal",
      home: "Argentina",
      away: "Switzerland",
      homeLogo: "https://flagcdn.com/w160/ar.png",
      awayLogo: "https://flagcdn.com/w160/ch.png",
      score: "3 - 1",
      status: "FT",
      note: "Argentina stayed alive in the knockout bracket",
      href: "results.html"
    }
  ];

  injectFinalStageCss();
  setupPageHeader();
  setupLeagueFilters();
  setupTabs();
  updateSidebar();
  loadWorldCupStandings();

  function setupPageHeader() {
    setText(leagueCountry, "FIFA World Cup 2026");
    setText(leagueName, "Final Stage Standings");
    setText(leagueSeason, "Spain vs Argentina final - France vs England bronze final");
    setText(panelTitle, "Final Stage Picture");
    setText(insightTitle, "Final weekend watch");
    setText(
      insightText,
      "The group tables are now archived. The live priority is the final stage: Spain and Argentina for the trophy, France and England for bronze."
    );

    tabs.forEach(function (tab) {
      if (tab.dataset.view === "table") tab.textContent = "Final Stage";
      if (tab.dataset.view === "last") tab.textContent = "Recent";
      if (tab.dataset.view === "upcoming") tab.textContent = "Final Matches";
    });
  }

  function setupLeagueFilters() {
    if (!leagueFilterList) return;

    leagueFilterList.innerHTML = `
      <button class="league-filter-btn active" type="button">Final Stage</button>
      <a class="league-filter-btn" href="match.html?fixture=final">Spain vs Argentina</a>
      <a class="league-filter-btn" href="match.html?fixture=bronze">France vs England</a>
      <a class="league-filter-btn" href="results.html">Results</a>
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
    tableWrap.innerHTML = `<div class="standings-loading">Loading World Cup final stage...</div>`;

    if (lastWrap) {
      lastWrap.innerHTML = `<div class="standings-loading">Loading recent World Cup results...</div>`;
    }

    if (upcomingWrap) {
      upcomingWrap.innerHTML = `<div class="standings-loading">Loading final fixtures...</div>`;
    }

    let groups = [];
    let updatedLabel = "Updated final stage - 17 Jul";

    try {
      const cached = await loadCachedWorldCupData();
      groups = normalizeStandingsPayload(cached.standingsPayload);
      updatedLabel = formatCacheDate(cached.updatedAt);
    } catch (cacheError) {
      console.warn("[Standings cache]", cacheError);
    }

    setText(leagueSeason, `${updatedLabel} - final weekend priority`);
    renderFinalStage(groups);
    renderRecentResults();
    renderUpcomingFinals();
  }

  async function loadCachedWorldCupData() {
    const response = await fetch(`${CONFIG.cacheUrl}?v=${Date.now()}`, {
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

  function renderFinalStage(groups) {
    tableWrap.innerHTML = `
      <section class="wc-final-stage-hero">
        <div class="wc-final-stage-copy">
          <span class="wc-stage-kicker">Tournament status</span>
          <h3>Finalists are set</h3>
          <p>
            Spain and Argentina are the last two standing. Group standings are locked, knockout pressure is now everything,
            and the final weekend is the main table story.
          </p>
        </div>

        <div class="wc-stage-mini-table">
          <div><span>Final</span><strong>Spain vs Argentina</strong></div>
          <div><span>Bronze</span><strong>France vs England</strong></div>
          <div><span>Stage</span><strong>Final weekend</strong></div>
        </div>
      </section>

      <div class="wc-final-grid">
        ${FINAL_MATCHES.map(renderFinalCard).join("")}
      </div>

      <section class="wc-knockout-path">
        <h3>How they got here</h3>
        <div class="wc-path-grid">
          ${RECENT_RESULTS.slice(0, 2).map(renderPathCard).join("")}
        </div>
      </section>

      ${groups.length ? renderArchivedGroups(groups) : ""}
    `;
  }

  function renderFinalCard(match) {
    return `
      <a class="wc-final-card" href="${escapeHtml(match.href)}">
        <div class="wc-final-card-top">
          <span>${escapeHtml(match.label)}</span>
          <strong>${escapeHtml(match.tag)}</strong>
        </div>

        <div class="wc-final-teams">
          ${renderTeamBadge(match.home, match.homeLogo)}
          <span class="wc-final-vs">VS</span>
          ${renderTeamBadge(match.away, match.awayLogo)}
        </div>

        <div class="wc-final-time-grid">
          <span>${escapeHtml(match.timeMiami)}</span>
          <span>${escapeHtml(match.timeSpain)}</span>
          <span>${escapeHtml(match.timeArgentina)}</span>
          <span>${escapeHtml(match.timeTallinn)}</span>
        </div>

        <p>${escapeHtml(match.note)}</p>
        <small>${escapeHtml(match.date)} - ${escapeHtml(match.venue)}</small>
      </a>
    `;
  }

  function renderTeamBadge(name, logo) {
    return `
      <div class="wc-final-team">
        <img src="${escapeHtml(logo)}" alt="${escapeHtml(name)} flag">
        <strong>${escapeHtml(name)}</strong>
      </div>
    `;
  }

  function renderPathCard(result) {
    return `
      <div class="wc-path-card">
        <span>${escapeHtml(result.stage)}</span>
        <strong>${escapeHtml(result.home)} ${escapeHtml(result.score)} ${escapeHtml(result.away)}</strong>
        <small>${escapeHtml(result.note)}</small>
      </div>
    `;
  }

  function renderArchivedGroups(groups) {
    return `
      <details class="wc-group-archive">
        <summary>Archived group standings</summary>
        <div class="wc-group-archive-grid">
          ${groups.map(function (group) {
            return `
              <div class="standings-group-block">
                <h3 class="standings-group-title">${escapeHtml(group.name)}</h3>
                ${renderTable(group.rows)}
              </div>
            `;
          }).join("")}
        </div>
      </details>
    `;
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

  function renderRecentResults() {
    if (!lastWrap) return;
    lastWrap.innerHTML = `
      <div class="bf-match-list bf-final-lines">
        ${RECENT_RESULTS.map(function (match) {
          return renderMatchLine({
            href: match.href,
            left: match.stage,
            main: `${match.home} vs ${match.away}`,
            sub: match.note,
            right: match.score,
            homeLogo: match.homeLogo,
            awayLogo: match.awayLogo
          });
        }).join("")}
      </div>
    `;
  }

  function renderUpcomingFinals() {
    if (!upcomingWrap) return;
    upcomingWrap.innerHTML = `
      <div class="bf-match-list bf-final-lines">
        ${FINAL_MATCHES.map(function (match) {
          return renderMatchLine({
            href: match.href,
            left: match.tag,
            main: `${match.home} vs ${match.away}`,
            sub: `${match.timeTallinn} - ${match.venue}`,
            right: match.label,
            homeLogo: match.homeLogo,
            awayLogo: match.awayLogo
          });
        }).join("")}
      </div>
    `;
  }

  function renderMatchLine(item) {
    return `
      <a class="bf-match-row bf-final-row" href="${escapeHtml(item.href)}">
        <div class="bf-final-row-left">${escapeHtml(item.left)}</div>
        <div class="bf-final-row-main">
          <div class="bf-final-row-teams">
            ${item.homeLogo ? `<img src="${escapeHtml(item.homeLogo)}" alt="">` : ""}
            <strong>${escapeHtml(item.main)}</strong>
            ${item.awayLogo ? `<img src="${escapeHtml(item.awayLogo)}" alt="">` : ""}
          </div>
          <span>${escapeHtml(item.sub)}</span>
        </div>
        <div class="bf-final-row-pill">${escapeHtml(item.right)}</div>
      </a>
    `;
  }

  function updateSidebar() {
    const legend = document.querySelector(".standings-legend");
    if (legend) {
      legend.innerHTML = `
        <div><span class="legend-dot legend-cl"></span>Final: Spain vs Argentina</div>
        <div><span class="legend-dot legend-el"></span>Bronze: France vs England</div>
        <div><span class="legend-dot legend-safe"></span>Group tables archived</div>
        <div><span class="legend-dot legend-rel"></span>Knockout results locked</div>
      `;
    }

    const related = document.querySelector(".standings-sidebar .related-match-list");
    if (related) {
      related.innerHTML = `
        <a class="related-match-item" href="match.html?fixture=final">
          <strong>Spain vs Argentina</strong>
          <span>World Cup Final</span>
        </a>
        <a class="related-match-item" href="match.html?fixture=bronze">
          <strong>France vs England</strong>
          <span>Bronze Final</span>
        </a>
        <a class="related-match-item" href="results.html">
          <strong>Semifinal Results</strong>
          <span>Spain and Argentina advanced</span>
        </a>
      `;
    }
  }

  function injectFinalStageCss() {
    const old = document.getElementById("standings-final-stage-css");
    if (old) old.remove();

    const style = document.createElement("style");
    style.id = "standings-final-stage-css";
    style.textContent = `
      body.site-skin-1win .wc-final-stage-hero {
        display: grid;
        grid-template-columns: minmax(0, 1.35fr) minmax(260px, .65fr);
        gap: 18px;
        align-items: stretch;
        margin-bottom: 20px;
      }

      body.site-skin-1win .wc-final-stage-copy,
      body.site-skin-1win .wc-stage-mini-table,
      body.site-skin-1win .wc-final-card,
      body.site-skin-1win .wc-path-card {
        border: 1px solid rgba(94,224,164,.14);
        border-radius: 22px;
        background: rgba(2,11,19,.34);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.03);
      }

      body.site-skin-1win .wc-final-stage-copy {
        padding: 24px;
      }

      body.site-skin-1win .wc-stage-kicker {
        display: inline-flex;
        width: fit-content;
        padding: 7px 10px;
        border-radius: 999px;
        background: rgba(94,224,164,.12);
        color: #5ee0a4;
        font-size: 12px;
        font-weight: 900;
        text-transform: uppercase;
      }

      body.site-skin-1win .wc-final-stage-copy h3 {
        margin: 14px 0 8px;
        color: #fff;
        font-size: 34px;
        line-height: 1;
      }

      body.site-skin-1win .wc-final-stage-copy p {
        margin: 0;
        color: rgba(248,250,252,.72);
        font-size: 16px;
        line-height: 1.5;
      }

      body.site-skin-1win .wc-stage-mini-table {
        display: grid;
        gap: 12px;
        padding: 18px;
      }

      body.site-skin-1win .wc-stage-mini-table div {
        display: grid;
        gap: 4px;
      }

      body.site-skin-1win .wc-stage-mini-table span,
      body.site-skin-1win .wc-final-card-top span,
      body.site-skin-1win .wc-path-card span {
        color: rgba(248,250,252,.58);
        font-size: 12px;
        font-weight: 900;
        text-transform: uppercase;
      }

      body.site-skin-1win .wc-stage-mini-table strong,
      body.site-skin-1win .wc-path-card strong {
        color: #fff;
        font-size: 18px;
        line-height: 1.2;
      }

      body.site-skin-1win .wc-final-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
        margin-bottom: 20px;
      }

      body.site-skin-1win .wc-final-card {
        display: grid;
        gap: 16px;
        padding: 22px;
        color: inherit;
        text-decoration: none;
      }

      body.site-skin-1win .wc-final-card-top {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: center;
      }

      body.site-skin-1win .wc-final-card-top strong,
      body.site-skin-1win .bf-final-row-pill {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        border-radius: 999px;
        background: #5ee0a4;
        color: #06120d;
        font-size: 12px;
        font-weight: 900;
        white-space: nowrap;
      }

      body.site-skin-1win .wc-final-teams {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        gap: 12px;
        align-items: center;
        text-align: center;
      }

      body.site-skin-1win .wc-final-team {
        display: grid;
        justify-items: center;
        gap: 8px;
      }

      body.site-skin-1win .wc-final-team img {
        width: 64px;
        height: 64px;
        object-fit: cover;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,.12);
      }

      body.site-skin-1win .wc-final-team strong {
        color: #fff;
        font-size: 22px;
        line-height: 1.1;
      }

      body.site-skin-1win .wc-final-vs {
        width: 46px;
        height: 46px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        color: #5ee0a4;
        background: rgba(94,224,164,.10);
        font-weight: 950;
      }

      body.site-skin-1win .wc-final-time-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
      }

      body.site-skin-1win .wc-final-time-grid span {
        padding: 9px 10px;
        border-radius: 12px;
        background: rgba(255,255,255,.045);
        color: rgba(248,250,252,.82);
        font-size: 13px;
        font-weight: 800;
        text-align: center;
      }

      body.site-skin-1win .wc-final-card p {
        margin: 0;
        color: rgba(248,250,252,.72);
        line-height: 1.45;
      }

      body.site-skin-1win .wc-final-card small {
        color: rgba(248,250,252,.58);
        font-weight: 800;
      }

      body.site-skin-1win .wc-knockout-path {
        margin-bottom: 20px;
      }

      body.site-skin-1win .wc-knockout-path h3 {
        margin: 0 0 12px;
        color: #fff;
        font-size: 22px;
      }

      body.site-skin-1win .wc-path-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }

      body.site-skin-1win .wc-path-card {
        display: grid;
        gap: 6px;
        padding: 16px;
      }

      body.site-skin-1win .wc-path-card small {
        color: rgba(248,250,252,.65);
        font-size: 13px;
      }

      body.site-skin-1win .wc-group-archive {
        margin-top: 18px;
        border-radius: 18px;
        border: 1px solid rgba(94,224,164,.12);
        background: rgba(2,11,19,.24);
        overflow: hidden;
      }

      body.site-skin-1win .wc-group-archive summary {
        cursor: pointer;
        padding: 16px 18px;
        color: #fff;
        font-weight: 900;
      }

      body.site-skin-1win .wc-group-archive-grid {
        display: grid;
        gap: 18px;
        padding: 0 18px 18px;
      }

      body.site-skin-1win .bf-final-lines {
        display: grid;
        gap: 0;
      }

      body.site-skin-1win .bf-final-row {
        display: grid;
        grid-template-columns: 110px minmax(0, 1fr) auto;
        gap: 18px;
        align-items: center;
        padding: 18px 0;
        border-bottom: 1px solid rgba(94,224,164,.12);
        color: inherit;
        text-decoration: none;
      }

      body.site-skin-1win .bf-final-row:last-child {
        border-bottom: 0;
      }

      body.site-skin-1win .bf-final-row-left {
        color: rgba(248,250,252,.68);
        font-size: 13px;
        font-weight: 900;
        text-transform: uppercase;
      }

      body.site-skin-1win .bf-final-row-main {
        display: grid;
        gap: 6px;
      }

      body.site-skin-1win .bf-final-row-teams {
        display: flex;
        gap: 9px;
        align-items: center;
        color: #fff;
        font-size: 18px;
      }

      body.site-skin-1win .bf-final-row-teams img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        object-fit: cover;
      }

      body.site-skin-1win .bf-final-row-main span {
        color: rgba(248,250,252,.66);
        font-size: 13px;
      }

      @media (max-width: 900px) {
        body.site-skin-1win .wc-final-stage-hero,
        body.site-skin-1win .wc-final-grid,
        body.site-skin-1win .wc-path-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 768px) {
        body.site-skin-1win .wc-final-stage-copy h3 {
          font-size: 28px;
        }

        body.site-skin-1win .wc-final-time-grid {
          grid-template-columns: 1fr;
        }

        body.site-skin-1win .bf-final-row {
          grid-template-columns: 1fr auto;
          gap: 12px;
        }

        body.site-skin-1win .bf-final-row-left {
          grid-column: 1 / -1;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function formatCacheDate(value) {
    if (!value) return "Cached World Cup data";

    try {
      return `Cached World Cup data - ${new Intl.DateTimeFormat("en-GB", {
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
