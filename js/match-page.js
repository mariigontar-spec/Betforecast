async function loadMatchPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const game = urlParams.get("game");

  try {
    const response = await fetch("data/matches.json");
    const matches = await response.json();

    const match = matches.find((item) => item.id === game) || matches[0];

    // top hero
    document.getElementById("match-league-badge").innerText = match.league;
    document.getElementById("match-title").innerText = `${match.home} vs ${match.away}`;
    document.getElementById("match-subtitle").innerText =
      `AI-powered preview with probability, projected score, xG lean, game-state risk, and form comparison for ${match.home} vs ${match.away}.`;
    document.getElementById("match-date").innerText = match.date;
    document.getElementById("match-time").innerText = match.time;
    document.getElementById("match-stadium").innerText = match.stadium;

    // right score card
    document.getElementById("match-confidence-pill").innerText = `Confidence ${match.confidence}%`;
    document.getElementById("team-home-short").innerText = match.homeShort;
    document.getElementById("team-away-short").innerText = match.awayShort;
    document.getElementById("team-home-name").innerText = match.home;
    document.getElementById("team-away-name").innerText = match.away;
    document.getElementById("projected-score").innerText = match.projectedScore;

    document.getElementById("prob-home").innerText = `${match.homePct}%`;
    document.getElementById("prob-draw").innerText = `${match.drawPct}%`;
    document.getElementById("prob-away").innerText = `${match.awayPct}%`;
    document.getElementById("prob-home-label").innerText = `${match.home} Win`;
    document.getElementById("prob-away-label").innerText = `${match.away} Win`;

    document.getElementById("hero-bar-home").style.width = `${match.homePct}%`;
    document.getElementById("hero-bar-draw").style.width = `${match.drawPct}%`;
    document.getElementById("hero-bar-away").style.width = `${match.awayPct}%`;

    // core
    document.getElementById("match-summary").innerText = match.summary;
    document.getElementById("best-tip").innerText = match.tip;
    document.getElementById("goals-lean").innerText = match.goalsLean;
    document.getElementById("btts-signal").innerText = match.btts;

    // factors
    const factorTags = document.getElementById("factor-tags");
    factorTags.innerHTML = "";
    match.factors.forEach((factor) => {
      const span = document.createElement("span");
      span.innerText = factor;
      factorTags.appendChild(span);
    });

    // stats
    document.getElementById("xg-home-team").innerText = match.home;
    document.getElementById("xg-away-team").innerText = match.away;
    document.getElementById("shots-home-team").innerText = match.home;
    document.getElementById("shots-away-team").innerText = match.away;
    document.getElementById("pos-home-team").innerText = match.home;
    document.getElementById("pos-away-team").innerText = match.away;

    document.getElementById("xg-home").innerText = match.xgHome;
    document.getElementById("xg-away").innerText = match.xgAway;
    document.getElementById("shots-home").innerText = match.shotsHome;
    document.getElementById("shots-away").innerText = match.shotsAway;
    document.getElementById("pos-home").innerText = match.possessionHome;
    document.getElementById("pos-away").innerText = match.possessionAway;

    document.getElementById("confidence-fill").style.width = `${match.confidence}%`;
    document.getElementById("confidence-value").innerText = `${match.confidence}%`;

    // form
    document.getElementById("form-home-title").innerText = match.home;
    document.getElementById("form-away-title").innerText = match.away;

    const formHomeBadges = document.getElementById("form-home-badges");
    const formAwayBadges = document.getElementById("form-away-badges");
    formHomeBadges.innerHTML = "";
    formAwayBadges.innerHTML = "";

    function createFormBadge(value) {
      const span = document.createElement("span");
      span.innerText = value;
      if (value === "W") span.className = "form-win";
      else if (value === "D") span.className = "form-draw";
      else span.className = "form-loss";
      return span;
    }

    match.formHome.forEach((item) => formHomeBadges.appendChild(createFormBadge(item)));
    match.formAway.forEach((item) => formAwayBadges.appendChild(createFormBadge(item)));

    const formHomeList = document.getElementById("form-home-list");
    const formAwayList = document.getElementById("form-away-list");
    formHomeList.innerHTML = "";
    formAwayList.innerHTML = "";

    match.homeStats.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = item.replace(": ", ": <strong>") + "</strong>";
      formHomeList.appendChild(li);
    });

    match.awayStats.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = item.replace(": ", ": <strong>") + "</strong>";
      formAwayList.appendChild(li);
    });

    // quick insight
    document.getElementById("quick-insight-text").innerText = match.quickInsight;

    // timeline
    const timelineList = document.getElementById("timeline-list");
    timelineList.innerHTML = "";
    match.timeline.forEach((item) => {
      const row = document.createElement("div");
      row.className = "timeline-item";
      row.innerHTML = `
        <div class="timeline-minute">${item.minute}</div>
        <div class="timeline-text">${item.text}</div>
      `;
      timelineList.appendChild(row);
    });

    // key signals
    const keySignals = document.getElementById("key-signal-list");
    keySignals.innerHTML = "";
    [
      ["Best Tip", match.tip],
      ["Goals Lean", match.goalsLean],
      ["BTTS", match.btts],
      ["Model Confidence", `${match.confidence}%`]
    ].forEach(([label, value]) => {
      const row = document.createElement("div");
      row.className = "key-signal-item";
      row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
      keySignals.appendChild(row);
    });

    // related
    const relatedList = document.getElementById("related-match-list");
    relatedList.innerHTML = "";
    matches
      .filter((item) => item.id !== match.id)
      .forEach((item) => {
        const a = document.createElement("a");
        a.className = "related-match-item";
        a.href = `match.html?game=${item.id}`;
        a.innerHTML = `<strong>${item.home} vs ${item.away}</strong><span>${item.league}</span>`;
        relatedList.appendChild(a);
      });

  } catch (error) {
    console.error("Failed to load match page:", error);
  }
}

loadMatchPage();
