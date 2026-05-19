async function loadResultsPage() {
  const container =
    document.getElementById("results-page-container") ||
    document.getElementById("results-container");

  if (!container) return;

  container.innerHTML = `<div class="results-empty-state">Loading latest results...</div>`;

  try {
    const response = await fetch(`${BF_API.baseUrl}/fixtures?last=20`, {
      method: "GET",
      headers: {
        "x-apisports-key": BF_API.key
      }
    });

    const data = await response.json();
    let matches = data.response || [];

    if (!matches.length) {
      matches = getFallbackResults();
    }

    renderResults(container, matches.slice(0, 12));
  } catch (error) {
    console.error("Failed to load results page:", error);
    renderResults(container, getFallbackResults());
  }
}

function renderResults(container, matches) {
  container.innerHTML = "";

  matches.forEach((item) => {
    const apiMode = !!item.fixture;

    const home = apiMode ? item.teams?.home?.name : item.home;
    const away = apiMode ? item.teams?.away?.name : item.away;
    const homeLogo = apiMode ? item.teams?.home?.logo : "";
    const awayLogo = apiMode ? item.teams?.away?.logo : "";
    const homeGoals = apiMode ? item.goals?.home ?? "-" : item.homeGoals;
    const awayGoals = apiMode ? item.goals?.away ?? "-" : item.awayGoals;
    const league = apiMode ? item.league?.name : item.league;
    const status = apiMode ? item.fixture?.status?.short || "FT" : "FT";
    const venue = apiMode ? item.fixture?.venue?.name || "Match analysis" : item.venue;
    const matchDate = apiMode
      ? new Date(item.fixture.date).toLocaleDateString()
      : item.date;

    const card = document.createElement("article");
  card.className = "bf-clean-result-card";
const gameId = apiMode ? item.fixture?.id : `${home}-${away}`.toLowerCase().replace(/\s+/g, "-");
card.onclick = () => {
  window.location.href = `match.html?game=${gameId}`;
};
card.style.cursor = "pointer";
   card.innerHTML = `
  <div class="bf-clean-result-top">
    <span>${league}</span>
    <b>${status}</b>
  </div>

  <div class="bf-clean-result-score">
    <span>${home}</span>
    <strong>${homeGoals} - ${awayGoals}</strong>
    <span>${away}</span>
  </div>

  <div class="bf-clean-result-meta">
    <span>${venue}</span>
    <span>${matchDate}</span>
  </div>
`;
    container.appendChild(card);
  });

  initGlowHover();
}

function getFallbackResults() {
  return [
    { league: "Premier League", home: "Man City", away: "Arsenal", homeGoals: 2, awayGoals: 1, venue: "Etihad Stadium", date: "Latest result" },
    { league: "La Liga", home: "Real Madrid", away: "Sevilla", homeGoals: 3, awayGoals: 0, venue: "Santiago Bernabéu", date: "Latest result" },
    { league: "Serie A", home: "Napoli", away: "Roma", homeGoals: 2, awayGoals: 1, venue: "Diego Armando Maradona Stadium", date: "Latest result" },
    { league: "Bundesliga", home: "Dortmund", away: "RB Leipzig", homeGoals: 2, awayGoals: 2, venue: "Signal Iduna Park", date: "Latest result" }
  ];
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

loadResultsPage();
