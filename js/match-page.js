async function loadMatchPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const game = urlParams.get("game");

  try {
    const response = await fetch("data/matches.json");
    if (!response.ok) {
      throw new Error(`matches.json failed: ${response.status}`);
    }

    const matches = await response.json();
    const match = matches.find((item) => item.id === game) || matches[0];

    if (!match) {
      throw new Error("No match data found");
    }

    const isLive = match.status === "live";
    const isFinished = match.status === "finished";

    const homeName = match.home || "Home Team";
    const awayName = match.away || "Away Team";

    const homeShort =
      match.homeShort ||
      homeName.split(" ").map(word => word[0]).join("").slice(0, 3).toUpperCase();

    const awayShort =
      match.awayShort ||
      awayName.split(" ").map(word => word[0]).join("").slice(0, 3).toUpperCase();

    const projectedScore =
      match.projectedScore ||
      match.predictedScore ||
      match.liveScore ||
      match.finalScore ||
      "-";

    const heroScore = isLive
      ? (match.liveScore || projectedScore)
      : isFinished
      ? (match.finalScore || projectedScore)
      : projectedScore;

    const confidence = typeof match.confidence === "number" ? match.confidence : 74;

    const homePct = typeof match.homePct === "number" ? match.homePct : 47;
    const drawPct = typeof match.drawPct === "number" ? match.drawPct : 28;
    const awayPct = typeof match.awayPct === "number" ? match.awayPct : 25;

    const summary =
      match.summary ||
      `${homeName} vs ${awayName} is profiled by our model as a balanced matchup with clear pressure phases, scoring windows, and game-state shifts to watch.`;

    const bestTip = match.tip || (isLive ? "Live Match" : "Match Preview");
    const goalsLean = match.goalsLean || "Over 2.5";
    const btts = match.btts || (isLive ? "Live" : "Watch");
    const quickInsight =
      match.quickInsight ||
      `The key swing factor in ${homeName} vs ${awayName} is who controls momentum after the first major chance.`;

    const xgHome = match.xgHome ?? "2.1";
    const xgAway = match.xgAway ?? "1.2";
    const shotsHome = match.shotsHome ?? "15.4";
    const shotsAway = match.shotsAway ?? "10.1";
    const possessionHome = match.possessionHome ?? "58%";
    const possessionAway = match.possessionAway ?? "42%";

    const dateText = match.date || (isLive ? "Live Today" : isFinished ? "Finished" : "Matchday");
    const timeText = isLive ? (match.minute || match.time || "Live") : (match.time || "18:30");
    const stadiumText = match.stadium || "Main Stadium";

    const factors = Array.isArray(match.factors) && match.factors.length
      ? match.factors
      : [
          isLive ? "Live momentum" : "Home control",
          "Chance quality",
          "Game-state pressure"
        ];

    const timeline = Array.isArray(match.timeline) && match.timeline.length
      ? match.timeline
      : [
          { minute: isLive ? (match.minute || "Now") : "0-20", text: `${homeName} and ${awayName} enter the match with a cautious opening rhythm and structured shape.` },
          { minute: "20-45", text: "The game may open through transitions, second balls, and set-piece pressure." },
          { minute: "45-70", text: "This phase usually decides whether the match stays balanced or swings toward one side." },
          { minute: "70-90", text: "Late pressure and score effects become the biggest variables." }
        ];

    const formHome = Array.isArray(match.formHome) && match.formHome.length
      ? match.formHome
      : ["W", "D", "W", "L", "W"];

    const formAway = Array.isArray(match.formAway) && match.formAway.length
      ? match.formAway
      : ["D", "W", "L", "W", "D"];

    const homeStats = Array.isArray(match.homeStats) && match.homeStats.length
      ? match.homeStats
      : [
          `xG trend: ${xgHome}`,
          `Projected shots: ${shotsHome}`,
          `Possession lean: ${possessionHome}`,
          `Status: ${match.status || "preview"}`
        ];

    const awayStats = Array.isArray(match.awayStats) && match.awayStats.length
      ? match.awayStats
      : [
          `xG trend: ${xgAway}`,
          `Projected shots: ${shotsAway}`,
          `Possession lean: ${possessionAway}`,
          `Status: ${match.status || "preview"}`
        ];

    // top hero
    document.getElementById("match-league-badge").innerText = match.league || "Top League";
    document.getElementById("match-title").innerText = `${homeName} vs ${awayName}`;
    document.getElementById("match-subtitle").innerText =
      isLive
        ? `Live AI match view with current score, momentum cues, probability balance, and risk signals for ${homeName} vs ${awayName}.`
        : isFinished
        ? `Finished match view with result, projected score context, and model-based breakdown for ${homeName} vs ${awayName}.`
        : `AI-powered preview with probability, projected score, xG lean, game-state risk, and form comparison for ${homeName} vs ${awayName}.`;

    document.getElementById("match-date").innerText = dateText;
    document.getElementById("match-time").innerText = timeText;
    document.getElementById("match-stadium").innerText = stadiumText;

    // right score card
    document.getElementById("match-confidence-pill").innerText = isLive
      ? `LIVE ${match.minute || ""}`.trim()
      : `Confidence ${confidence}%`;

    document.getElementById("team-home-short").innerText = homeShort;
    document.getElementById("team-away-short").innerText = awayShort;
    document.getElementById("team-home-name").innerText = homeName;
    document.getElementById("team-away-name").innerText = awayName;
    document.getElementById("projected-score").innerText = heroScore;

    document.getElementById("prob-home").innerText = `${homePct}%`;
    document.getElementById("prob-draw").innerText = `${drawPct}%`;
    document.getElementById("prob-away").innerText = `${awayPct}%`;
    document.getElementById("prob-home-label").innerText = `${homeName} Win`;
    document.getElementById("prob-away-label").innerText = `${awayName} Win`;

    document.getElementById("hero-bar-home").style.width = `${homePct}%`;
    document.getElementById("hero-bar-draw").style.width = `${drawPct}%`;
    document.getElementById("hero-bar-away").style.width = `${awayPct}%`;

    // core
    document.getElementById("match-summary").innerText = summary;
    document.getElementById("best-tip").innerText = bestTip;
    document.getElementById("goals-lean").innerText = goalsLean;
    document.getElementById("btts-signal").innerText = btts;

    // factors
    const factorTags = document.getElementById("factor-tags");
    factorTags.innerHTML = "";
    factors.forEach((factor) => {
      const span = document.createElement("span");
      span.innerText = factor;
      factorTags.appendChild(span);
    });

    // stats
    document.getElementById("xg-home-team").innerText = homeName;
    document.getElementById("xg-away-team").innerText = awayName;
    document.getElementById("shots-home-team").innerText = homeName;
    document.getElementById("shots-away-team").innerText = awayName;
    document.getElementById("pos-home-team").innerText = homeName;
    document.getElementById("pos-away-team").innerText = awayName;

    document.getElementById("xg-home").innerText = xgHome;
    document.getElementById("xg-away").innerText = xgAway;
    document.getElementById("shots-home").innerText = shotsHome;
    document.getElementById("shots-away").innerText = shotsAway;
    document.getElementById("pos-home").innerText = possessionHome;
    document.getElementById("pos-away").innerText = possessionAway;

    document.getElementById("confidence-fill").style.width = `${confidence}%`;
    document.getElementById("confidence-value").innerText = `${confidence}%`;

    // form
    document.getElementById("form-home-title").innerText = homeName;
    document.getElementById("form-away-title").innerText = awayName;

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

    formHome.forEach((item) => formHomeBadges.appendChild(createFormBadge(item)));
    formAway.forEach((item) => formAwayBadges.appendChild(createFormBadge(item)));

    const formHomeList = document.getElementById("form-home-list");
    const formAwayList = document.getElementById("form-away-list");
    formHomeList.innerHTML = "";
    formAwayList.innerHTML = "";

    homeStats.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = item.includes(": ") ? item.replace(": ", ": <strong>") + "</strong>" : item;
      formHomeList.appendChild(li);
    });

    awayStats.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = item.includes(": ") ? item.replace(": ", ": <strong>") + "</strong>" : item;
      formAwayList.appendChild(li);
    });

    // quick insight
    document.getElementById("quick-insight-text").innerText = quickInsight;

    // timeline
    const timelineList = document.getElementById("timeline-list");
    timelineList.innerHTML = "";
    timeline.forEach((item) => {
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
      ["Status", (match.status || "preview").toUpperCase()],
      ["Best Tip", bestTip],
      ["Goals Lean", goalsLean],
      ["BTTS", btts],
      ["Model Confidence", `${confidence}%`]
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
      .slice(0, 4)
      .forEach((item) => {
        const a = document.createElement("a");
        a.className = "related-match-item";
        a.href = `match.html?game=${item.id}`;
        a.innerHTML = `<strong>${item.home || "Home"} vs ${item.away || "Away"}</strong><span>${item.league || "League"}</span>`;
        relatedList.appendChild(a);
      });

  } catch (error) {
    console.error("Failed to load match page:", error);
  }
}

loadMatchPage();
