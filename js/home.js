(() => {
  "use strict";

  const scheduleUrl = "data/home-schedule.json";
  const standingsUrl = "data/standings.json";
  const newsUrl = "data/news.json";
  let scheduleData = { events: [] };

  function escapeHtml(value = "") {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalize(value = "") {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function initials(name = "") {
    const words = String(name).trim().split(/\s+/).filter(Boolean);
    if (!words.length) return "BF";
    return words.slice(0, 2).map((word) => word.charAt(0)).join("").toUpperCase();
  }

  function updateHomepageCopy() {
    const lead = document.querySelector(".hero-lead");
    if (lead) lead.textContent = "US Open second-round results and the Vuelta sprint finish lead today's verified updates. Next up: the Calar Alto mountain stage on 3 September and Premier League Matchweek 3 from 4 September.";

    const radar = document.querySelector(".hero-radar");
    if (radar) {
      radar.innerHTML = `
        <div><strong>2 Sep</strong><span>US Open · Round 2 results</span></div>
        <div><strong>2 Sep</strong><span>Vuelta · Brennan wins Stage 11</span></div>
        <div><strong>3 Sep</strong><span>Vuelta · Calar Alto summit finish</span></div>
      `;
    }

    const input = document.getElementById("home-search-input");
    if (input) input.placeholder = "Try: US Open, Vuelta, Arsenal vs Chelsea";

    const chips = document.querySelector(".search-chips");
    if (chips) {
      chips.innerHTML = `
        <button type="button" data-query="US Open">US Open</button>
        <button type="button" data-query="Vuelta">Vuelta</button>
        <button type="button" data-query="Arsenal Chelsea">Arsenal–Chelsea</button>
      `;
    }

    const lines = document.querySelectorAll(".competition-line");
    const content = [
      { href: "match.html?id=vuelta-stage-12", title: "Vuelta Stage 12 · Vera to Calar Alto", detail: "3 September · 166.6 km mountain finish", tag: "Cycling" },
      { href: "match.html?id=ipswich-liverpool-sep4", title: "Ipswich Town vs Liverpool", detail: "4 September · Premier League · 20:00 UK", tag: "Football" },
      { href: "standings.html", title: "Premier League · Matchweek 2 table", detail: "Positions and form updated after 20 matches", tag: "Table" },
      { href: "results.html", title: "US Open · Day 4 verified results", detail: "Pegula, Shelton and Medvedev advance", tag: "Tennis" }
    ];

    lines.forEach((line, index) => {
      const item = content[index];
      if (!item) return;
      line.href = item.href;
      const title = line.querySelector("strong");
      const detail = line.querySelector("small");
      const tag = line.querySelector(".competition-tag");
      if (title) title.textContent = item.title;
      if (detail) detail.textContent = item.detail;
      if (tag) tag.textContent = item.tag;
    });
  }

  function renderFeatured(event) {
    const container = document.getElementById("featured-match");
    if (!container) return;

    if (!event) {
      container.innerHTML = `
        <p class="loading-state">The featured match will be updated shortly.</p>
        <a class="button button-primary" href="#match-schedule">Open sports calendar</a>
      `;
      return;
    }

    const home = event.home || event.title;
    const away = event.away || event.sport;
    const signals = Array.isArray(event.signals) ? event.signals : [];
    const homeForm = Array.isArray(event.homeForm) ? event.homeForm.slice(0, 5) : [];
    const awayForm = Array.isArray(event.awayForm) ? event.awayForm.slice(0, 5) : [];
    const probabilities = event.probabilities || {};
    const homeProbability = Math.max(0, Math.min(100, Number(probabilities.home) || 0));
    const drawProbability = Math.max(0, Math.min(100, Number(probabilities.draw) || 0));
    const awayProbability = Math.max(0, Math.min(100, Number(probabilities.away) || 0));
    const hasModel = homeProbability + drawProbability + awayProbability > 0;

    function teamMark(name, logo) {
      const fallback = escapeHtml(initials(name));
      if (!logo) return `<span class="featured-team-fallback">${fallback}</span>`;
      return `<img src="${escapeHtml(logo)}" alt="" loading="eager" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="featured-team-fallback" hidden>${fallback}</span>`;
    }

    function formBadges(form) {
      if (!form.length) return "";
      return `<div class="featured-form" aria-label="Recent form">${form.map((result) => {
        const value = String(result).toUpperCase().charAt(0);
        const className = value === "W" ? "is-win" : value === "L" ? "is-loss" : "is-draw";
        return `<span class="${className}">${escapeHtml(value)}</span>`;
      }).join("")}</div>`;
    }

    container.innerHTML = `
      <div class="featured-meta">
        <span>${escapeHtml(event.competition)}</span>
        <span>${escapeHtml(event.date)} · ${escapeHtml(event.time)}</span>
      </div>

      <div class="featured-match-visual">
        <div class="featured-pitch" aria-hidden="true"><span></span></div>
        <div class="featured-kickoff">${escapeHtml(event.time)}</div>
        <div class="featured-teams">
          <div class="featured-team">
            <div class="featured-team-mark">${teamMark(home, event.homeLogo)}</div>
            <strong>${escapeHtml(home)}</strong>
            ${formBadges(homeForm)}
          </div>
          <span class="featured-vs">vs</span>
          <div class="featured-team">
            <div class="featured-team-mark">${teamMark(away, event.awayLogo)}</div>
            <strong>${escapeHtml(away)}</strong>
            ${formBadges(awayForm)}
          </div>
        </div>
      </div>

      ${hasModel ? `
        <div class="featured-probability">
          <div class="featured-probability-head"><span>Model probability</span><small>Home · Draw · Away</small></div>
          <div class="featured-probability-values">
            <strong>${homeProbability}%</strong><strong>${drawProbability}%</strong><strong>${awayProbability}%</strong>
          </div>
          <div class="featured-probability-bar" aria-label="Model probabilities: ${homeProbability}% home, ${drawProbability}% draw, ${awayProbability}% away">
            <i style="width:${homeProbability}%"></i><i style="width:${drawProbability}%"></i><i style="width:${awayProbability}%"></i>
          </div>
        </div>
      ` : ""}

      <div class="featured-signal">
        <span>Current model inputs</span>
        <div class="signal-list">
          ${signals.map((signal) => `<span>${escapeHtml(signal)}</span>`).join("")}
        </div>
      </div>

      <p class="featured-note">${escapeHtml(event.stage)}. The forecast is updated as confirmed team and match information becomes available.</p>

      <div class="featured-actions">
        <a class="button button-primary" href="ai-insights.html">Open analysis</a>
        <a class="button button-secondary" href="#match-schedule">View schedule</a>
      </div>
    `;
  }

  function renderSchedule(events = []) {
    const container = document.getElementById("schedule-list");
    if (!container) return;

    if (!events.length) {
      container.innerHTML = `<p class="loading-state">No upcoming events are available right now.</p>`;
      return;
    }

    container.innerHTML = events.slice(0, 7).map((event) => `
      <div class="schedule-row" role="row" data-event-id="${escapeHtml(event.id)}">
        <span class="schedule-date" role="cell">
          <strong>${escapeHtml(event.date)}</strong>
          <small>${escapeHtml(event.time)}</small>
        </span>
        <span class="schedule-title" role="cell">
          <strong>${escapeHtml(event.title)}</strong>
          <small>${escapeHtml(event.stage)}</small>
        </span>
        <span class="schedule-competition" role="cell">${escapeHtml(event.competition)}</span>
        <span class="schedule-status" role="cell">${escapeHtml(event.status)}</span>
      </div>
    `).join("");
  }

  function renderPremierLeague(league) {
    const tbody = document.getElementById("home-epl-table");
    const season = document.getElementById("epl-season");
    if (!tbody) return;
    if (season && league?.season) season.textContent = league.season;
    const rows = Array.isArray(league?.table) ? league.table : [];
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="8" class="loading-state">Premier League standings are unavailable.</td></tr>';
      return;
    }
    tbody.innerHTML = rows.map((club) => {
      const gd = Number(club.gf || 0) - Number(club.ga || 0);
      return `<tr class="zone-${escapeHtml(club.zone || "safe")}">
        <td>${escapeHtml(club.pos)}</td>
        <td class="club-cell"><span class="club-mark" aria-hidden="true">${escapeHtml(initials(club.team))}</span>${escapeHtml(club.team)}</td>
        <td>${escapeHtml(club.played)}</td><td>${escapeHtml(club.wins)}</td><td>${escapeHtml(club.draws)}</td><td>${escapeHtml(club.losses)}</td>
        <td>${gd > 0 ? "+" : ""}${escapeHtml(gd)}</td><td class="points-cell">${escapeHtml(club.points)}</td>
      </tr>`;
    }).join("");
  }

  function isPremierLeagueNews(item) {
    const text = normalize([item.title, item.excerpt].filter(Boolean).join(" "));
    const terms = ["premier league", "arsenal", "chelsea", "tottenham", "liverpool", "man city", "manchester city", "man united", "manchester united", "aston villa", "newcastle", "west ham", "sunderland", "everton", "brighton", "brentford", "fulham", "bournemouth", "crystal palace", "wolves", "nottingham forest", "burnley", "leeds", "hull", "ipswich", "coventry"];
    return terms.some((term) => text.includes(normalize(term)));
  }

  function renderPremierLeagueNews(items = []) {
    const container = document.getElementById("home-epl-news");
    if (!container) return;
    const selected = items.filter(isPremierLeagueNews).slice(0, 4);
    const stories = selected.length ? selected : items.filter((item) => normalize(item.category).includes("football")).slice(0, 4);
    if (!stories.length) {
      container.innerHTML = '<p class="loading-state">English football news will be updated shortly.</p>';
      return;
    }
    container.innerHTML = stories.map((item) => `
      <a class="home-news-item" href="article.html?id=${encodeURIComponent(item.id)}">
        <img src="${escapeHtml(item.image || "assets/stadium-dark.jpg")}" alt="" loading="lazy">
        <div><span>${escapeHtml(item.time || item.source || "Latest")}</span><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.excerpt || "")}</p></div>
      </a>
    `).join("");
  }

  async function loadPremierLeague() {
    const tbody = document.getElementById("home-epl-table");
    const news = document.getElementById("home-epl-news");
    try {
      const [standingsResponse, newsResponse] = await Promise.all([
        fetch(`${standingsUrl}?v=3`, { cache: "no-store" }),
        fetch(`${newsUrl}?v=3`, { cache: "no-store" })
      ]);
      if (!standingsResponse.ok || !newsResponse.ok) throw new Error("Premier League data request failed");
      const standingsData = await standingsResponse.json();
      const newsData = await newsResponse.json();
      const league = (standingsData.leagues || []).find((item) => item.id === "epl");
      renderPremierLeague(league);
      renderPremierLeagueNews(Array.isArray(newsData) ? newsData : newsData.articles || []);
    } catch (error) {
      console.error("Premier League home block failed:", error);
      if (tbody) tbody.innerHTML = '<tr><td colspan="8" class="loading-state">Premier League standings are unavailable.</td></tr>';
      if (news) news.innerHTML = '<p class="loading-state">English football news is unavailable.</p>';
    }
  }

  function findEvents(query) {
    const needle = normalize(query);
    if (!needle) return [];

    return scheduleData.events.filter((event) => {
      const haystack = normalize([
        event.title,
        event.home,
        event.away,
        event.competition,
        event.sport,
        event.stage
      ].filter(Boolean).join(" "));

      return haystack.includes(needle) || needle.split(" ").every((word) => haystack.includes(word));
    });
  }

  function showSearchResult(query) {
    const output = document.getElementById("home-search-result");
    if (!output) return;

    const matches = findEvents(query);

    if (!query.trim()) {
      output.textContent = "Enter a team, match or competition.";
      return;
    }

    if (!matches.length) {
      output.innerHTML = `No current calendar entry found for <strong>${escapeHtml(query)}</strong>. Try a competition name or open the full Matches page.`;
      return;
    }

    const first = matches[0];
    const extra = matches.length > 1 ? ` + ${matches.length - 1} more` : "";
    output.innerHTML = `<strong>${escapeHtml(first.title)}</strong> · ${escapeHtml(first.date)}, ${escapeHtml(first.time)} · ${escapeHtml(first.competition)}${escapeHtml(extra)}`;

    const row = document.querySelector(`[data-event-id="${CSS.escape(first.id)}"]`);
    if (row) {
      row.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function initSearch() {
    const form = document.getElementById("home-match-search");
    const input = document.getElementById("home-search-input");
    if (!form || !input) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      showSearchResult(input.value);
    });

    document.querySelectorAll("[data-query]").forEach((button) => {
      button.addEventListener("click", () => {
        input.value = button.dataset.query || "";
        showSearchResult(input.value);
      });
    });
  }

  function initMobileMenu() {
    const button = document.querySelector(".bf-menu-button");
    const navigation = document.getElementById("main-navigation");
    if (!button || !navigation) return;

    button.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initAdhitPopup() {
    window._aso = window._aso || {};
    window._aso.queue = window._aso.queue || [];
    window._aso.queue.push(() => {
      if (!window._ASO || typeof window._ASO.loadPuHelper !== "function") return;
      window._ASO.PuOptions = { idzone: 161907 };
      window._ASO.loadPuHelper();
    });
  }

  async function loadSchedule() {
    try {
      const response = await fetch(`${scheduleUrl}?v=3`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Schedule request failed: ${response.status}`);

      scheduleData = await response.json();
      const events = Array.isArray(scheduleData.events) ? scheduleData.events : [];
      const featured = events.find((event) => event.id === scheduleData.featuredId) || events[0];

      renderFeatured(featured);
      renderSchedule(events);
    } catch (error) {
      console.error("Home schedule failed:", error);
      renderFeatured(null);
      renderSchedule([]);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateHomepageCopy();
    initMobileMenu();
    initSearch();
    initAdhitPopup();
    loadSchedule();
    loadPremierLeague();
  });
})();
