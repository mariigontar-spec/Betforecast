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
      homeName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 3)
        .toUpperCase();

    const awayShort =
      match.awayShort ||
      awayName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 3)
        .toUpperCase();

    const projectedScore =
      match.projectedScore ||
      match.predictedScore ||
      match.liveScore ||
      match.finalScore ||
      "-";

    const heroScore = isLive
      ? match.liveScore || projectedScore
      : isFinished
      ? match.finalScore || projectedScore
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
    const timeText = isLive ? match.minute || match.time || "Live" : match.time || "18:30";
    const stadiumText = match.stadium || "Main Stadium";

    const factors =
      Array.isArray(match.factors) && match.factors.length
        ? match.factors
        : [isLive ? "Live momentum" : "Home control", "Chance quality", "Game-state pressure"];

    const timeline =
      Array.isArray(match.timeline) && match.timeline.length
        ? match.timeline
        : [
            {
              minute: isLive ? match.minute || "Now" : "0-20",
              text: `${homeName} and ${awayName} enter the match with a cautious opening rhythm and structured shape.`
            },
            {
              minute: "20-45",
              text: "The game may open through transitions, second balls, and set-piece pressure."
            },
            {
              minute: "45-70",
              text: "This phase usually decides whether the match stays balanced or swings toward one side."
            },
            {
              minute: "70-90",
              text: "Late pressure and score effects become the biggest variables."
            }
          ];

    const formHome =
      Array.isArray(match.formHome) && match.formHome.length
        ? match.formHome
        : ["W", "D", "W", "L", "W"];

    const formAway =
      Array.isArray(match.formAway) && match.formAway.length
        ? match.formAway
        : ["D", "W", "L", "W", "D"];

    const homeStats =
      Array.isArray(match.homeStats) && match.homeStats.length
        ? match.homeStats
        : [
            `xG trend: ${xgHome}`,
            `Projected shots: ${shotsHome}`,
            `Possession lean: ${possessionHome}`,
            `Status: ${match.status || "preview"}`
          ];

    const awayStats =
      Array.isArray(match.awayStats) && match.awayStats.length
        ? match.awayStats
        : [
            `xG trend: ${xgAway}`,
            `Projected shots: ${shotsAway}`,
            `Possession lean: ${possessionAway}`,
            `Status: ${match.status || "preview"}`
          ];

    setText("match-league-badge", match.league || "Top League");
    setText("match-title", `${homeName} vs ${awayName}`);
    setText(
      "match-subtitle",
      isLive
        ? `Live AI match view with current score, momentum cues, probability balance, and risk signals for ${homeName} vs ${awayName}.`
        : isFinished
        ? `Finished match view with result, projected score context, and model-based breakdown for ${homeName} vs ${awayName}.`
        : `AI-powered preview with probability, projected score, xG lean, game-state risk, and form comparison for ${homeName} vs ${awayName}.`
    );

    setText("match-date", dateText);
    setText("match-time", timeText);
    setText("match-stadium", stadiumText);

    setText(
      "match-confidence-pill",
      isLive ? `LIVE ${match.minute || ""}`.trim() : `Confidence ${confidence}%`
    );

    setText("team-home-short", homeShort);
    setText("team-away-short", awayShort);
    setText("team-home-name", homeName);
    setText("team-away-name", awayName);
    setText("projected-score", heroScore);

    setText("prob-home", `${homePct}%`);
    setText("prob-draw", `${drawPct}%`);
    setText("prob-away", `${awayPct}%`);
    setText("prob-home-label", `${homeName} Win`);
    setText("prob-away-label", `${awayName} Win`);

    setWidth("hero-bar-home", `${homePct}%`);
    setWidth("hero-bar-draw", `${drawPct}%`);
    setWidth("hero-bar-away", `${awayPct}%`);

    setText("match-summary", summary);
    setText("best-tip", bestTip);
    setText("goals-lean", goalsLean);
    setText("btts-signal", btts);

    const factorTags = document.getElementById("factor-tags");
    if (factorTags) {
      factorTags.innerHTML = "";
      factors.forEach((factor) => {
        const span = document.createElement("span");
        span.textContent = factor;
        factorTags.appendChild(span);
      });
    }

    setText("xg-home-team", homeName);
    setText("xg-away-team", awayName);
    setText("shots-home-team", homeName);
    setText("shots-away-team", awayName);
    setText("pos-home-team", homeName);
    setText("pos-away-team", awayName);

    setText("xg-home", xgHome);
    setText("xg-away", xgAway);
    setText("shots-home", shotsHome);
    setText("shots-away", shotsAway);
    setText("pos-home", possessionHome);
    setText("pos-away", possessionAway);

    setWidth("confidence-fill", `${confidence}%`);
    setText("confidence-value", `${confidence}%`);

    setText("form-home-title", homeName);
    setText("form-away-title", awayName);

    const formHomeBadges = document.getElementById("form-home-badges");
    const formAwayBadges = document.getElementById("form-away-badges");

    if (formHomeBadges) {
      formHomeBadges.innerHTML = "";
      formHome.forEach((item) => formHomeBadges.appendChild(createFormBadge(item)));
    }

    if (formAwayBadges) {
      formAwayBadges.innerHTML = "";
      formAway.forEach((item) => formAwayBadges.appendChild(createFormBadge(item)));
    }

    const formHomeList = document.getElementById("form-home-list");
    const formAwayList = document.getElementById("form-away-list");

    if (formHomeList) {
      formHomeList.innerHTML = "";
      homeStats.forEach((item) => {
        formHomeList.appendChild(createStatListItem(item));
      });
    }

    if (formAwayList) {
      formAwayList.innerHTML = "";
      awayStats.forEach((item) => {
        formAwayList.appendChild(createStatListItem(item));
      });
    }

    setText("quick-insight-text", quickInsight);

    const timelineList = document.getElementById("timeline-list");
    if (timelineList) {
      timelineList.innerHTML = "";
      timeline.forEach((item) => {
        const row = document.createElement("div");
        row.className = "timeline-item glow-hover";
        row.innerHTML = `
          <div class="timeline-minute">${item.minute}</div>
          <div class="timeline-text">${item.text}</div>
        `;
        timelineList.appendChild(row);
      });
    }

    const keySignals = document.getElementById("key-signal-list");
    if (keySignals) {
      keySignals.innerHTML = "";
      [
        ["Status", (match.status || "preview").toUpperCase()],
        ["Best Tip", bestTip],
        ["Goals Lean", goalsLean],
        ["BTTS", btts],
        ["Model Confidence", `${confidence}%`]
      ].forEach(([label, value]) => {
        const row = document.createElement("div");
        row.className = "key-signal-item glow-hover";
        row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
        keySignals.appendChild(row);
      });
    }

    const relatedList = document.getElementById("related-match-list");
    if (relatedList) {
      relatedList.innerHTML = "";
      matches
        .filter((item) => item.id !== match.id)
        .slice(0, 4)
        .forEach((item) => {
          const a = document.createElement("a");
          a.className = "related-match-item glow-hover";
          a.href = `match.html?game=${item.id}`;
          a.innerHTML = `
            <strong>${item.home || "Home"} vs ${item.away || "Away"}</strong>
            <span>${item.league || "League"}</span>
          `;
          relatedList.appendChild(a);
        });
    }

    initGlowHover();
  } catch (error) {
    console.error("Failed to load match page:", error);
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setWidth(id, value) {
  const el = document.getElementById(id);
  if (el) el.style.width = value;
}

function createFormBadge(value) {
  const span = document.createElement("span");
  span.textContent = value;

  if (value === "W") span.className = "form-win";
  else if (value === "D") span.className = "form-draw";
  else span.className = "form-loss";

  return span;
}

function createStatListItem(text) {
  const li = document.createElement("li");

  if (text.includes(": ")) {
    const [label, value] = text.split(": ");
    li.innerHTML = `${label}: <strong>${value}</strong>`;
  } else {
    li.textContent = text;
  }

  return li;
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

loadMatchPage();
