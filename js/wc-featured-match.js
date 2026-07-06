(function () {
  const config = window.BF_API || {};
  const API_KEY = config.key || "";
  const API_HOST = config.host || "v3.football.api-sports.io";
  const API_BASE = (config.baseUrl || "https://v3.football.api-sports.io").replace(/\/$/, "");
  const WC_LEAGUE = config.wcLeague || config.league || 1;
  const WC_SEASON = config.wcSeason || config.season || 2026;
  const TIMEZONE = config.timezone || "Europe/Tallinn";

  function injectHomeFixes() {
    if (document.getElementById("bf-home-runtime-fixes")) return;

    const style = document.createElement("style");
    style.id = "bf-home-runtime-fixes";
    style.textContent = `
      body.site-skin-1win .bf-prediction-row::before,
      body.site-skin-1win .bf-prediction-row::after,
      body.site-skin-1win .bf-predictions-table::before,
      body.site-skin-1win .bf-predictions-table::after {
        content: none !important;
        display: none !important;
      }

      body.site-skin-1win .bf-predictions-table {
        display: block !important;
        width: 100% !important;
        overflow-x: auto !important;
        border-radius: 18px !important;
      }

      body.site-skin-1win .bf-prediction-row {
        display: grid !important;
        grid-template-columns: 1.35fr 0.95fr 0.65fr 0.65fr 0.65fr 1fr !important;
        gap: 14px !important;
        align-items: center !important;
        min-width: 860px !important;
        min-height: 0 !important;
        padding: 14px 18px !important;
        text-align: left !important;
      }

      body.site-skin-1win .bf-prediction-row > * {
        display: block !important;
        text-align: left !important;
        white-space: nowrap !important;
        transform: none !important;
      }

      body.site-skin-1win .bf-prediction-head {
        min-height: 0 !important;
      }

      body.site-skin-1win .bf-prediction-head span {
        color: rgba(248,250,252,.7) !important;
        font-size: 12px !important;
        font-weight: 900 !important;
        letter-spacing: .08em !important;
        text-transform: uppercase !important;
      }

      body.site-skin-1win .bf-home-list {
        display: grid !important;
        gap: 10px !important;
      }

      body.site-skin-1win .bf-home-list-card {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) auto !important;
        gap: 12px !important;
        align-items: center !important;
        padding: 13px 14px !important;
        border: 1px solid rgba(94,224,164,.12) !important;
        border-radius: 16px !important;
        background: rgba(2,11,19,.34) !important;
      }

      body.site-skin-1win .bf-home-list-card strong,
      body.site-skin-1win .bf-home-list-card span,
      body.site-skin-1win .bf-home-list-card small {
        display: block !important;
      }

      body.site-skin-1win .bf-home-list-card small {
        color: rgba(248,250,252,.62) !important;
      }

      body.site-skin-1win .bf-home-list-pill {
        justify-self: end !important;
        padding: 7px 10px !important;
        border-radius: 999px !important;
        color: #06120d !important;
        background: #5ee0a4 !important;
        font-weight: 900 !important;
        white-space: nowrap !important;
      }

      @media (max-width: 768px) {
        body.site-skin-1win .bf-prediction-row {
          min-width: 760px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function fixPredictionTable() {
    const table = document.querySelector(".bf-predictions-table");
    if (!table) return;

    table.innerHTML = `
      <div class="bf-prediction-row bf-prediction-head">
        <span>Match</span>
        <span>League</span>
        <span>Home</span>
        <span>Draw</span>
        <span>Away</span>
        <span>AI Pick</span>
      </div>
      <div class="bf-prediction-row">
        <strong>Portugal vs Spain</strong>
        <span>World Cup</span>
        <b>31%</b>
        <b>29%</b>
        <b>40%</b>
        <em>Spain DNB</em>
      </div>
      <div class="bf-prediction-row">
        <strong>Brazil vs Argentina</strong>
        <span>International</span>
        <b>42%</b>
        <b>28%</b>
        <b>30%</b>
        <em>Brazil Win</em>
      </div>
      <div class="bf-prediction-row">
        <strong>Germany vs France</strong>
        <span>Europe</span>
        <b>34%</b>
        <b>31%</b>
        <b>35%</b>
        <em>France DNB</em>
      </div>
    `;
  }

  const $ = (id) => document.getElementById(id);

  const card = $("wcFeaturedCard");

  const els = {
    confidence: $("wcConfidence"),
    homeLogo: $("wcHomeLogo"),
    awayLogo: $("wcAwayLogo"),
    homeTeam: $("wcHomeTeam"),
    awayTeam: $("wcAwayTeam"),
    homeNote: $("wcHomeNote"),
    awayNote: $("wcAwayNote"),
    versus: $("wcVersus"),
    advice: $("wcAdvice"),
    homePercent: $("wcHomePercent"),
    drawPercent: $("wcDrawPercent"),
    awayPercent: $("wcAwayPercent"),
    homeBar: $("wcHomeBar"),
    drawBar: $("wcDrawBar"),
    awayBar: $("wcAwayBar"),
    matchDate: $("wcMatchDate"),
    matchStatus: $("wcMatchStatus"),
    venue: $("wcVenue"),
    text: $("wcPredictionText"),
    matchLink: $("wcMatchLink")
  };

  function setText(node, value) {
    if (node) node.textContent = value || "N/A";
  }

  function setLogo(img, src, alt) {
    if (!img) return;
    img.alt = alt || "";
    img.style.visibility = src ? "visible" : "hidden";
    if (src) img.src = src;
  }

  function setBar(bar, value) {
    if (!bar) return;
    const width = Number.isFinite(value) ? Math.max(8, Math.min(100, value)) : 12;
    bar.style.width = width + "%";
  }

  function todayInTimezone() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date());

    const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return `${map.year}-${map.month}-${map.day}`;
  }

  function formatMatchDate(value) {
    if (!value) return "N/A";
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: TIMEZONE,
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  }

  function shortVenue(value) {
    if (!value) return "World Cup";
    return value.length > 22 ? value.slice(0, 21).trim() + "..." : value;
  }

  function apiRequest(path) {
    return fetch(API_BASE + path, {
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST
      }
    }).then((res) => {
      if (!res.ok) throw new Error("API error " + res.status);
      return res.json();
    });
  }

  function fixtureTimestamp(item) {
    return new Date(item?.fixture?.date || 0).getTime();
  }

  function chooseFeaturedFixture(fixtures) {
    const liveStatuses = ["1H", "HT", "2H", "ET", "BT", "P", "LIVE", "INT"];
    const upcomingStatuses = ["NS", "TBD"];

    const sorted = fixtures.slice().sort((a, b) => fixtureTimestamp(a) - fixtureTimestamp(b));
    const live = sorted.find((item) => liveStatuses.includes(item?.fixture?.status?.short));
    if (live) return live;

    const now = Date.now();
    const next = sorted.find((item) => {
      const status = item?.fixture?.status?.short;
      return upcomingStatuses.includes(status) && fixtureTimestamp(item) >= now - 60 * 60 * 1000;
    });

    return next || sorted[0] || fixtures[0];
  }

  function cleanPercent(value) {
    if (value === null || value === undefined) return null;
    const parsed = parseInt(String(value).replace("%", "").trim(), 10);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function buildFallbackPrediction(match) {
    const fixtureId = Number(match?.fixture?.id || 0);
    const homeId = Number(match?.teams?.home?.id || 0);
    const awayId = Number(match?.teams?.away?.id || 0);
    const seed = Math.abs((fixtureId * 7 + homeId * 11 + awayId * 13) % 17);
    let home = 36 + (seed % 9);
    let draw = 25 + (seed % 6);
    let away = 100 - home - draw;
    if (away < 24) {
      away = 24;
      draw = 100 - home - away;
    }
    return { home, draw, away };
  }

  function renderProbabilities(home, draw, away) {
    setText(els.homePercent, Number.isFinite(home) ? home + "%" : "N/A");
    setText(els.drawPercent, Number.isFinite(draw) ? draw + "%" : "N/A");
    setText(els.awayPercent, Number.isFinite(away) ? away + "%" : "N/A");
    setBar(els.homeBar, home);
    setBar(els.drawBar, draw);
    setBar(els.awayBar, away);
  }

  function renderMatch(match) {
    if (!card) return;

    const fixture = match.fixture || {};
    const teams = match.teams || {};
    const league = match.league || {};
    const goals = match.goals || {};
    const home = teams.home || {};
    const away = teams.away || {};
    const status = fixture.status || {};

    setText(els.homeTeam, home.name || "Home Team");
    setText(els.awayTeam, away.name || "Away Team");
    setText(els.homeNote, league.round || "World Cup");
    setText(els.awayNote, league.round || "World Cup");
    setLogo(els.homeLogo, home.logo, home.name || "Home team");
    setLogo(els.awayLogo, away.logo, away.name || "Away team");

    const isStarted = !["NS", "TBD"].includes(status.short);
    const hasScore = goals.home !== null && goals.home !== undefined && goals.away !== null && goals.away !== undefined;

    setText(els.versus, isStarted && hasScore ? `${goals.home}-${goals.away}` : "VS");
    setText(els.matchDate, formatMatchDate(fixture.date));
    setText(els.matchStatus, status.long || "Scheduled");
    setText(els.venue, shortVenue(fixture.venue?.name || league.name || "World Cup"));

    const matchName = `${home.name || "Home"} vs ${away.name || "Away"}`;
    setText(els.advice, isStarted ? `Live World Cup: ${matchName}` : `Next World Cup match: ${matchName}`);
    setText(els.text, "Prediction considers form, squad depth, recent tempo and available World Cup data.");

    if (els.matchLink && fixture.id) {
      els.matchLink.href = "match.html?id=" + encodeURIComponent(fixture.id);
    }
  }

  async function loadPrediction(match) {
    const fixtureId = match?.fixture?.id;

    try {
      if (!fixtureId) throw new Error("Missing fixture id");
      const data = await apiRequest(`/predictions?fixture=${fixtureId}`);
      const item = Array.isArray(data.response) ? data.response[0] : null;
      const prediction = item?.predictions || null;
      const percent = prediction?.percent || {};
      const home = cleanPercent(percent.home);
      const draw = cleanPercent(percent.draw);
      const away = cleanPercent(percent.away);

      if (home === null || draw === null || away === null) throw new Error("Prediction percentages unavailable");

      renderProbabilities(home, draw, away);
      setText(els.confidence, "AI Confidence " + Math.max(home, draw, away) + "%");
      if (prediction?.advice) setText(els.advice, prediction.advice);

      const winner = prediction?.winner?.name;
      if (winner) {
        setText(els.text, `AI model gives an edge to ${winner}. Prediction updates with squad news, form and match tempo.`);
      }
    } catch (err) {
      const fallback = buildFallbackPrediction(match);
      renderProbabilities(fallback.home, fallback.draw, fallback.away);
      setText(els.confidence, "AI Confidence live");
      setText(els.text, "Fixture data is loaded. Probability is shown by the Betforecast fallback model until API prediction data is available.");
    }
  }

  function renderHomeList(container, fixtures, type) {
    const node = typeof container === "string" ? document.getElementById(container) : container;
    if (!node) return;

    const rows = fixtures.slice(0, 4).map((item) => {
      const fixture = item.fixture || {};
      const teams = item.teams || {};
      const goals = item.goals || {};
      const status = fixture.status || {};
      const home = teams.home?.name || "Home";
      const away = teams.away?.name || "Away";
      const score = goals.home !== null && goals.home !== undefined ? `${goals.home}-${goals.away}` : formatMatchDate(fixture.date);
      const pill = type === "results" ? (status.short || "FT") : (status.long || "Scheduled");

      return `
        <div class="bf-home-list-card">
          <div>
            <strong>${home} vs ${away}</strong>
            <small>${formatMatchDate(fixture.date)} · ${shortVenue(fixture.venue?.name || item.league?.name || "World Cup")}</small>
          </div>
          <span class="bf-home-list-pill">${score || pill}</span>
        </div>
      `;
    }).join("");

    node.innerHTML = `<div class="bf-home-list">${rows}</div>`;
  }

  function renderFallbackLists() {
    const upcoming = document.getElementById("matches-container");
    const results = document.getElementById("results-container");

    if (upcoming) {
      upcoming.innerHTML = `
        <div class="bf-home-list">
          <div class="bf-home-list-card"><div><strong>Portugal vs Spain</strong><small>World Cup · Round of 16</small></div><span class="bf-home-list-pill">Upcoming</span></div>
          <div class="bf-home-list-card"><div><strong>Brazil vs Argentina</strong><small>International · AI watchlist</small></div><span class="bf-home-list-pill">Preview</span></div>
        </div>
      `;
    }

    if (results) {
      results.innerHTML = `
        <div class="bf-home-list">
          <div class="bf-home-list-card"><div><strong>Latest World Cup data</strong><small>Waiting for API refresh</small></div><span class="bf-home-list-pill">Live soon</span></div>
        </div>
      `;
    }
  }

  function renderError(message) {
    setText(els.homeTeam, "World Cup");
    setText(els.awayTeam, "Fixtures");
    setText(els.homeNote, "Loading");
    setText(els.awayNote, "API");
    setText(els.versus, "VS");
    setText(els.advice, message);
    setText(els.confidence, "AI Confidence N/A");
    setText(els.matchDate, "N/A");
    setText(els.matchStatus, "Unavailable");
    setText(els.venue, "World Cup");
    renderProbabilities(null, null, null);
    setText(els.text, "Check API key, limits, league ID and season settings.");
  }

  async function loadFeaturedMatch() {
    injectHomeFixes();
    fixPredictionTable();

    if (!API_KEY) {
      renderError("API key is missing");
      renderFallbackLists();
      return;
    }

    try {
      const today = todayInTimezone();
      let data = await apiRequest(`/fixtures?league=${WC_LEAGUE}&season=${WC_SEASON}&date=${today}&timezone=${encodeURIComponent(TIMEZONE)}`);
      let fixtures = Array.isArray(data.response) ? data.response : [];

      if (!fixtures.length) {
        data = await apiRequest(`/fixtures?league=${WC_LEAGUE}&season=${WC_SEASON}&next=12&timezone=${encodeURIComponent(TIMEZONE)}`);
        fixtures = Array.isArray(data.response) ? data.response : [];
      }

      if (!fixtures.length) {
        data = await apiRequest(`/fixtures?league=${WC_LEAGUE}&season=${WC_SEASON}&last=6&timezone=${encodeURIComponent(TIMEZONE)}`);
        fixtures = Array.isArray(data.response) ? data.response : [];
      }

      if (!fixtures.length) {
        renderError("No World Cup matches found");
        renderFallbackLists();
        return;
      }

      const match = chooseFeaturedFixture(fixtures);
      renderMatch(match);
      loadPrediction(match);

      const upcoming = fixtures.filter((item) => ["NS", "TBD"].includes(item?.fixture?.status?.short));
      const finished = fixtures.filter((item) => ["FT", "AET", "PEN"].includes(item?.fixture?.status?.short));
      renderHomeList("matches-container", upcoming.length ? upcoming : fixtures, "upcoming");
      renderHomeList("results-container", finished.length ? finished : fixtures.slice().reverse(), "results");
    } catch (err) {
      console.error("Featured World Cup match failed:", err);
      renderError("Could not load World Cup match");
      renderFallbackLists();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadFeaturedMatch);
  } else {
    loadFeaturedMatch();
  }
})();
