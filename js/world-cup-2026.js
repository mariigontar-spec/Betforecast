const BF_API = window.BF_API || {};

const fdBaseUrl = BF_API.baseUrl || "https://api.football-data.org/v4";
const fdToken = BF_API.key || "";
const fdCompetition = BF_API.competition || "WC";
const fdSeason = BF_API.season || 2026;

async function footballDataRequest(path) {
  if (!fdToken) {
    throw new Error("Football-data API token is missing");
  }

  const response = await fetch(`${fdBaseUrl}${path}`, {
    method: "GET",
    headers: {
      "X-Auth-Token": fdToken
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Football-data error ${response.status}: ${errorText}`);
  }

  return response.json();
}

function normalizeFootballDataMatch(match) {
  const statusMap = {
    SCHEDULED: "NS",
    TIMED: "NS",
    IN_PLAY: "LIVE",
    PAUSED: "HT",
    FINISHED: "FT",
    POSTPONED: "PST",
    SUSPENDED: "SUSP",
    CANCELED: "CANC"
  };

  return {
    fixture: {
      id: match.id,
      date: match.utcDate,
      status: {
        short: statusMap[match.status] || match.status || "NS",
        long: match.status || ""
      },
      venue: {
        name: match.venue || ""
      }
    },
    league: {
      round: match.stage || match.group || ""
    },
    teams: {
      home: {
        id: match.homeTeam?.id || null,
        name: match.homeTeam?.name || "TBD",
        logo: match.homeTeam?.crest || ""
      },
      away: {
        id: match.awayTeam?.id || null,
        name: match.awayTeam?.name || "TBD",
        logo: match.awayTeam?.crest || ""
      }
    },
    goals: {
      home: match.score?.fullTime?.home ?? null,
      away: match.score?.fullTime?.away ?? null
    },
    score: {
      halftime: {
        home: match.score?.halfTime?.home ?? null,
        away: match.score?.halfTime?.away ?? null
      },
      fulltime: {
        home: match.score?.fullTime?.home ?? null,
        away: match.score?.fullTime?.away ?? null
      }
    }
  };
}

function normalizeFootballDataStandings(standings) {
  return standings.map((standing, index) => {
    const groupName = normalizeFootballDataGroupName(standing.group, index);

    return (standing.table || []).map(row => ({
      rank: row.position || 0,
      team: {
        id: row.team?.id || null,
        name: row.team?.name || "TBD",
        logo: row.team?.crest || ""
      },
      points: row.points ?? 0,
      goalsDiff: row.goalDifference ?? 0,
      group: groupName,
      form: "",
      status: "same",
      description: "",
      all: {
        played: row.playedGames ?? 0,
        win: row.won ?? 0,
        draw: row.draw ?? 0,
        lose: row.lost ?? 0,
        goals: {
          for: row.goalsFor ?? 0,
          against: row.goalsAgainst ?? 0
        }
      }
    }));
  });
}

function normalizeFootballDataGroupName(group, index) {
  if (!group) {
    return `Group ${String.fromCharCode(65 + index)}`;
  }

  const match = String(group).match(/GROUP[_\s-]?([A-L])/i);

  if (match) {
    return `Group ${match[1].toUpperCase()}`;
  }

  return String(group).replace("_", " ");
}

function startWorldCupCountdown() {
  const target = new Date("2026-07-19T23:59:00+03:00").getTime();

  function update() {
    const now = Date.now();
    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    document.getElementById("wc-days").textContent = days;
    document.getElementById("wc-hours").textContent = hours;
    document.getElementById("wc-minutes").textContent = minutes;
  }

  update();
  setInterval(update, 60000);
}

async function loadWorldCupFixtures() {
  const fixturesEl = document.getElementById("wc-fixtures");
  const statusEl = document.getElementById("wc-fixtures-status");

  try {
    const data = await footballDataRequest(
      `/competitions/${fdCompetition}/matches?season=${fdSeason}`
    );

    const fixtures = (data.matches || []).map(normalizeFootballDataMatch);

    if (!fixtures.length) {
      statusEl.textContent = "Official fixtures are not available yet";
      fixturesEl.innerHTML = `<div class="wc-empty">Real World Cup 2026 fixtures will appear here once the API provides official data.</div>`;
      return [];
    }

    const now = new Date();

    const upcomingFixtures = fixtures
      .filter(item => {
        const matchDate = new Date(item.fixture.date);
        const status = item.fixture.status.short;
        return matchDate >= now && ["NS", "TBD", "PST"].includes(status);
      })
      .sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));

    const recentFixtures = fixtures
      .filter(item => ["FT", "AET", "PEN"].includes(item.fixture.status.short))
      .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date));

    const displayFixtures = upcomingFixtures.length
      ? upcomingFixtures.slice(0, 8)
      : recentFixtures.slice(0, 8);

    statusEl.textContent = upcomingFixtures.length
      ? `${upcomingFixtures.length} upcoming fixtures`
      : `${recentFixtures.length} recent results`;

    fixturesEl.innerHTML = displayFixtures.map(item => {
      const date = new Date(item.fixture.date);
      const home = item.teams.home;
      const away = item.teams.away;
      const goalsHome = item.goals.home;
      const goalsAway = item.goals.away;
      const status = item.fixture.status.short;

      const score =
        goalsHome !== null && goalsAway !== null
          ? `${goalsHome} - ${goalsAway}`
          : "vs";

      return `
        <article class="wc-match-card">
          <div class="wc-match-meta">
            <span>${date.toLocaleDateString("en-GB")}</span>
            <span>${date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>

          <div class="wc-teams">
            <div>
              <img src="${home.logo}" alt="${home.name}">
              <strong>${home.name}</strong>
            </div>

            <div class="wc-score">${score}</div>

            <div>
              <img src="${away.logo}" alt="${away.name}">
              <strong>${away.name}</strong>
            </div>
          </div>

          <div class="wc-status">${status}</div>
        </article>
      `;
    }).join("");

    renderPredictions(displayFixtures);
    renderTournamentStats(fixtures);

    return fixtures;

  } catch (error) {
    statusEl.textContent = "Fixtures failed to load";
    fixturesEl.innerHTML = `<div class="wc-empty">${error.message}</div>`;
    return [];
  }
}

function renderPredictions(fixtures) {
  const predictionsEl = document.getElementById("wc-predictions");

  if (!fixtures.length) {
    predictionsEl.innerHTML = `<div class="wc-empty">Predictions will appear when real fixtures are available.</div>`;
    return;
  }

  predictionsEl.innerHTML = fixtures.slice(0, 5).map(item => {
    const home = item.teams.home.name;
    const away = item.teams.away.name;

    return `
      <div class="wc-prediction-row">
        <span>${home} vs ${away}</span>
        <strong>Data pending</strong>
      </div>
    `;
  }).join("");
}

function renderTournamentStats(fixtures) {
  const played = fixtures.filter(item =>
    ["FT", "AET", "PEN"].includes(item.fixture.status.short)
  );

  const goals = played.reduce((sum, item) => {
    return sum + (item.goals.home || 0) + (item.goals.away || 0);
  }, 0);

  document.getElementById("wc-matches-played").textContent = played.length;
  document.getElementById("wc-goals").textContent = goals;
  document.getElementById("wc-avg-goals").textContent =
    played.length ? (goals / played.length).toFixed(2) : "0.00";
}

async function loadWorldCupStandings() {
  const tabsEl = document.getElementById("wc-standings-tabs");
  const standingsEl = document.getElementById("wc-standings");
  const statusEl = document.getElementById("wc-standings-status");

  try {
    const data = await footballDataRequest(
      `/competitions/${fdCompetition}/standings?season=${fdSeason}`
    );

    const groupsRaw = normalizeFootballDataStandings(data.standings || []);

    const groups = groupsRaw.filter(group => {
      const groupName = group?.[0]?.group || "";
      return /^Group [A-L]$/i.test(groupName);
    });

    if (!groups.length) {
      statusEl.textContent = "Official standings are not available yet";
      standingsEl.innerHTML = `<div class="wc-empty">Real group standings will appear here once the tournament starts.</div>`;
      return;
    }

    statusEl.textContent = "Real standings loaded";

    tabsEl.innerHTML = groups.map((group, index) => `
      <button class="${index === 0 ? "active" : ""}" data-group="${index}">
        ${group[0]?.group || `Group ${index + 1}`}
      </button>
    `).join("");

    function renderGroup(index) {
      const group = groups[index];

      standingsEl.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GD</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
            ${group.map(row => `
              <tr>
                <td>${row.rank}</td>
                <td class="wc-team-cell">
                  <img src="${row.team.logo}" alt="${row.team.name}">
                  ${row.team.name}
                </td>
                <td>${row.all.played}</td>
                <td>${row.all.win}</td>
                <td>${row.all.draw}</td>
                <td>${row.all.lose}</td>
                <td>${row.goalsDiff}</td>
                <td><strong>${row.points}</strong></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    }

    tabsEl.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        tabsEl.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        renderGroup(Number(button.dataset.group));
      });
    });

    renderGroup(0);

  } catch (error) {
    statusEl.textContent = "Standings failed to load";
    standingsEl.innerHTML = `<div class="wc-empty">${error.message}</div>`;
  }
}

startWorldCupCountdown();
loadWorldCupFixtures();
loadWorldCupStandings();
