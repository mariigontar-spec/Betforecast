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

  let leagues = [];
  let activeLeague = "premier-league";

  tabs.forEach(function (tab) {
    if (tab.dataset.view === "table") tab.textContent = "Table";
    if (tab.dataset.view === "last") tab.textContent = "Recent";
    if (tab.dataset.view === "upcoming") tab.textContent = "Upcoming";
    tab.addEventListener("click", function () {
      tabs.forEach(function (item) { item.classList.remove("active"); });
      tab.classList.add("active");
      const view = tab.dataset.view;
      tableWrap.classList.toggle("hidden-view", view !== "table");
      if (lastWrap) lastWrap.classList.toggle("hidden-view", view !== "last");
      if (upcomingWrap) upcomingWrap.classList.toggle("hidden-view", view !== "upcoming");
    });
  });

  fetch("/data/standings.json?v=20260902", { cache: "no-store" })
    .then(function (response) { if (!response.ok) throw new Error("Standings unavailable"); return response.json(); })
    .then(function (payload) {
      leagues = Array.isArray(payload) ? payload : (payload.leagues || []);
      const requested = new URLSearchParams(window.location.search).get("league");
      const aliases = { epl: "premier-league", premierleague: "premier-league", laliga: "laliga", seriea: "seriea" };
      activeLeague = aliases[requested] || requested || (leagues[0] && leagues[0].id) || "premier-league";
      renderFilters();
      renderLeague();
    })
    .catch(function () { tableWrap.innerHTML = '<div class="standings-empty">Standings are being refreshed. Please check again shortly.</div>'; });

  function current() { return leagues.find(function (league) { return league.id === activeLeague; }) || leagues[0]; }
  function renderFilters() {
    if (!leagueFilterList) return;
    leagueFilterList.innerHTML = "";
    leagues.forEach(function (league) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "league-filter-btn" + (league.id === activeLeague ? " active" : "");
      button.textContent = league.name;
      button.addEventListener("click", function () { activeLeague = league.id; renderFilters(); renderLeague(); });
      leagueFilterList.appendChild(button);
    });
    const archive = document.createElement("a"); archive.className = "league-filter-btn"; archive.href = "world-cup-2026.html"; archive.textContent = "World Cup Archive"; leagueFilterList.appendChild(archive);
  }
  function renderLeague() {
    const league = current(); if (!league) return;
    set(leagueCountry, league.country); set(leagueName, league.name); set(leagueSeason, league.season || "2026/27 season");
    set(panelTitle, league.name + " standings"); set(insightTitle, league.insightTitle || "Current table"); set(insightText, league.insightText || "Positions, points and recent form.");
    renderTable(league.table || []); renderMatches(lastWrap, league.lastMatches || [], "No recent results available."); renderMatches(upcomingWrap, league.upcomingMatches || [], "Upcoming fixtures are being refreshed.");
  }
  function renderTable(rows) {
    if (!rows.length) { tableWrap.innerHTML = '<div class="standings-empty">This league table is being refreshed.</div>'; return; }
    tableWrap.innerHTML = '<div class="standings-table-head"><div>#</div><div>Team</div><div>P</div><div>W</div><div>D</div><div>L</div><div>GF-GA</div><div>Pts</div><div>Form</div></div>' + rows.map(function (row) {
      const form = (row.form || []).map(function (value) { const cls = value === "W" ? "form-win" : value === "D" ? "form-draw" : "form-loss"; return '<span class="'+cls+'">'+value+'</span>'; }).join("");
      return '<div class="standings-row zone-'+(row.zone || "safe")+'"><div class="standings-cell standings-pos">'+row.pos+'</div><div class="standings-cell standings-team"><span class="standings-zone-line"></span><span class="standings-team-name">'+row.team+'</span></div><div class="standings-cell">'+row.played+'</div><div class="standings-cell">'+row.wins+'</div><div class="standings-cell">'+row.draws+'</div><div class="standings-cell">'+row.losses+'</div><div class="standings-cell">'+row.gf+'-'+row.ga+'</div><div class="standings-cell standings-points">'+row.points+'</div><div class="standings-cell standings-form">'+form+'</div></div>';
    }).join("");
  }
  function renderMatches(wrap, matches, empty) {
    if (!wrap) return; if (!matches.length) { wrap.innerHTML = '<div class="standings-empty">'+empty+'</div>'; return; }
    wrap.innerHTML = matches.map(function (item) { return '<div class="final-match-card"><div><strong>'+item.match+'</strong><span>'+item.time+'</span></div><strong>'+ (item.score || item.status || "Upcoming") +'</strong></div>'; }).join("");
  }
  function set(node, value) { if (node) node.textContent = value; }
});
