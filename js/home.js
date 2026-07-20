(() => {
  "use strict";

  const scheduleUrl = "data/home-schedule.json";
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

    container.innerHTML = `
      <div class="featured-meta">
        <span>${escapeHtml(event.competition)}</span>
        <span>${escapeHtml(event.date)} · ${escapeHtml(event.time)}</span>
      </div>

      <div class="featured-teams">
        <div class="featured-team">
          <div class="featured-team-mark" aria-hidden="true">${escapeHtml(initials(home))}</div>
          <strong>${escapeHtml(home)}</strong>
        </div>
        <span class="featured-vs">vs</span>
        <div class="featured-team">
          <div class="featured-team-mark" aria-hidden="true">${escapeHtml(initials(away))}</div>
          <strong>${escapeHtml(away)}</strong>
        </div>
      </div>

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
      const response = await fetch(`${scheduleUrl}?v=1`, { cache: "no-store" });
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
    initMobileMenu();
    initSearch();
    initAdhitPopup();
    loadSchedule();
  });
})();
