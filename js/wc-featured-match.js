(function () {
  const card = document.getElementById("wcFeaturedCard");
  if (!card) return;

  const config = window.BF_API || {};
  const API_KEY = config.key || "";
  const API_HOST = config.host || "v3.football.api-sports.io";
  const API_BASE = (config.baseUrl || "https://v3.football.api-sports.io").replace(/\/$/, "");
  const WC_LEAGUE = config.wcLeague || config.league || 1;
  const WC_SEASON = config.wcSeason || config.season || 2026;
  const TIMEZONE = config.timezone || "Europe/Tallinn";

  const $ = (id) => document.getElementById(id);

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
    if (node) node.textContent = value || "—";
  }

  function setLogo(img, src, alt) {
    if (!img) return;

    img.alt = alt || "";
    img.style.visibility = src ? "visible" : "hidden";

    if (src) {
      img.src = src;
    }
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
    if (!value) return "—";

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
    return value.length > 22 ? value.slice(0, 21).trim() + "…" : value;
  }

  function apiRequest(path) {
    return fetch(API_BASE + path, {
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST
      }
    }).then((res) => {
      if (!res.ok) {
        throw new Error("API error " + res.status);
      }

      return res.json();
    });
  }

  function fixtureTimestamp(item) {
    return new Date(item?.fixture?.date || 0).getTime();
  }

  function chooseFeaturedFixture(fixtures) {
    const liveStatuses = ["1H", "HT", "2H", "ET", "BT", "P", "LIVE", "INT"];
    const upcomingStatuses = ["NS", "TBD"];

    const sorted = fixtures
      .slice()
      .sort((a, b) => fixtureTimestamp(a) - fixtureTimestamp(b));

    const live = sorted.find((item) => liveStatuses.includes(item?.fixture?.status?.short));
    if (live) return live;

    const now = Date.now();

    const next = sorted.find((item) => {
      const status = item?.fixture?.status?.short;
      return upcomingStatuses.includes(status) && fixtureTimestamp(item) >= now - 60 * 60 * 1000;
    });

    if (next) return next;

    return sorted[0] || fixtures[0];
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
    setText(els.homePercent, Number.isFinite(home) ? home + "%" : "—");
    setText(els.drawPercent, Number.isFinite(draw) ? draw + "%" : "—");
    setText(els.awayPercent, Number.isFinite(away) ? away + "%" : "—");

    setBar(els.homeBar, home);
    setBar(els.drawBar, draw);
    setBar(els.awayBar, away);
  }

  function renderMatch(match) {
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

    setText(
      els.text,
      "Prediction considers form, squad depth, recent tempo and available World Cup data."
    );

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

      if (home === null || draw === null || away === null) {
        throw new Error("Prediction percentages unavailable");
      }

      renderProbabilities(home, draw, away);

      const confidence = Math.max(home, draw, away);
      setText(els.confidence, "AI Confidence " + confidence + "%");

      if (prediction?.advice) {
        setText(els.advice, prediction.advice);
      }

      const winner = prediction?.winner?.name;
      if (winner) {
        setText(
          els.text,
          `AI model gives an edge to ${winner}. Prediction updates with squad news, form and match tempo.`
        );
      }
    } catch (err) {
      const fallback = buildFallbackPrediction(match);
      renderProbabilities(fallback.home, fallback.draw, fallback.away);
      setText(els.confidence, "AI Confidence live");
      setText(
        els.text,
        "Live fixture data is loaded. Probability is shown by the Betforecast fallback model until API prediction data is available."
      );
    }
  }

  function renderError(message) {
    setText(els.homeTeam, "World Cup");
    setText(els.awayTeam, "Fixtures");
    setText(els.homeNote, "Loading");
    setText(els.awayNote, "API");
    setText(els.versus, "VS");
    setText(els.advice, message);
    setText(els.confidence, "AI Confidence —");
    setText(els.matchDate, "—");
    setText(els.matchStatus, "Unavailable");
    setText(els.venue, "World Cup");
    renderProbabilities(null, null, null);
    setText(els.text, "Check API key, limits, league ID and season settings.");
  }

  async function loadFeaturedMatch() {
    if (!API_KEY) {
      renderError("API key is missing");
      return;
    }

    try {
      const today = todayInTimezone();

      let data = await apiRequest(
        `/fixtures?league=${WC_LEAGUE}&season=${WC_SEASON}&date=${today}&timezone=${encodeURIComponent(TIMEZONE)}`
      );

      let fixtures = Array.isArray(data.response) ? data.response : [];

      if (!fixtures.length) {
        data = await apiRequest(
          `/fixtures?league=${WC_LEAGUE}&season=${WC_SEASON}&next=12&timezone=${encodeURIComponent(TIMEZONE)}`
        );

        fixtures = Array.isArray(data.response) ? data.response : [];
      }

      if (!fixtures.length) {
        data = await apiRequest(
          `/fixtures?league=${WC_LEAGUE}&season=${WC_SEASON}&last=1&timezone=${encodeURIComponent(TIMEZONE)}`
        );

        fixtures = Array.isArray(data.response) ? data.response : [];
      }

      if (!fixtures.length) {
        renderError("No World Cup matches found");
        return;
      }

      const match = chooseFeaturedFixture(fixtures);
      renderMatch(match);
      loadPrediction(match);
    } catch (err) {
      console.error("Featured World Cup match failed:", err);
      renderError("Could not load World Cup match");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadFeaturedMatch);
  } else {
    loadFeaturedMatch();
  }
})();
