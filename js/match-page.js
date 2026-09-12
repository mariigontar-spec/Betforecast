const GLOBAL_MATCH_RADAR = [
  {
    id: "man-utd-man-city-sep13", league: "Football · Premier League", date: "13 Sep 2026", time: "16:30 UK", stadium: "Old Trafford, Manchester",
    home: "Manchester United", away: "Manchester City", homeShort: "MUN", awayShort: "MCI", homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png", awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t43.png",
    projectedScore: "TODAY", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Old Trafford hosts the 199th Manchester derby as Premier League Matchweek 4 continues.",
    bestTip: "Confirmed fixture", goalsLean: "Matchweek 4", btts: "Sunday · 16:30 UK",
    factors: ["Manchester City: 9 points", "Manchester United: 4 points", "199th Manchester derby", "Verified Sunday fixture"],
    formHome: ["L", "W", "D"], formAway: ["W", "W", "W"],
    homeStats: ["Played: 3", "Wins: 1", "Draws: 1", "Points: 4"],
    awayStats: ["Played: 3", "Wins: 3", "Goal difference: +5", "Points: 9"],
    quickInsightTitle: "Manchester derby", quickInsight: "Fixture and table context are verified; no score prediction is presented as fact.",
    related: [{ id: "coventry-brighton-sep13", home: "Coventry City", away: "Brighton", league: "Premier League" }, { id: "f1-spain-race-sep13", home: "Lando Norris", away: "Kimi Antonelli", league: "Formula 1" }]
  },
  {
    id: "coventry-brighton-sep13", league: "Football · Premier League", date: "13 Sep 2026", time: "14:00 UK", stadium: "Coventry Building Society Arena",
    home: "Coventry City", away: "Brighton", homeShort: "COV", awayShort: "BHA", projectedScore: "TODAY", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Coventry host Brighton in Sunday's opening Premier League fixture.",
    bestTip: "Confirmed fixture", goalsLean: "Matchweek 4", btts: "Sunday · 14:00 UK",
    factors: ["Coventry seek first points", "Brighton have four points", "Official league schedule", "Sunday opener"],
    formHome: ["L", "L", "L"], formAway: ["W", "L", "D"],
    homeStats: ["Played: 3", "Points: 0", "Goals for: 0", "Goals against: 5"],
    awayStats: ["Played: 3", "Points: 4", "Goals for: 8", "Goals against: 5"],
    quickInsightTitle: "Sunday opener", quickInsight: "Pre-match records reflect the verified table before kickoff.",
    related: [{ id: "man-utd-man-city-sep13", home: "Manchester United", away: "Manchester City", league: "Premier League" }]
  },
  {
    id: "f1-spain-race-sep13", league: "Formula 1 · Spanish Grand Prix", date: "13 Sep 2026", time: "15:00 Madrid", stadium: "Madring, Madrid",
    home: "Lando Norris", away: "Kimi Antonelli", homeShort: "NOR", awayShort: "ANT", projectedScore: "57 LAPS", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Lando Norris starts the first Spanish Grand Prix at Madring from pole, with Kimi Antonelli second and Max Verstappen third.",
    bestTip: "Official grid", goalsLean: "Race day", btts: "Sunday · 15:00 local",
    factors: ["Norris pole: 1:31.824", "Antonelli +0.011s", "Verstappen starts third", "57 race laps"],
    formHome: ["P", "1"], formAway: ["P", "2"],
    homeStats: ["Grid: P1", "Team: McLaren", "Qualifying: 1:31.824", "Circuit: Madring"],
    awayStats: ["Grid: P2", "Team: Mercedes", "Gap: +0.011s", "Verstappen: P3"],
    quickInsightTitle: "Madrid race day", quickInsight: "The starting order comes from the official Formula 1 qualifying classification.",
    related: [{ id: "vuelta-stage21-sep13", home: "Alhambra", away: "Granada", league: "Vuelta" }]
  },
  {
    id: "vuelta-stage21-sep13", league: "Cycling · Vuelta a España", date: "13 Sep 2026", time: "Stage 21", stadium: "Granada, Spain",
    home: "Alhambra", away: "Granada", homeShort: "ALH", awayShort: "GRA", projectedScore: "FINAL", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "The Vuelta reaches its final ceremonial stage in Granada with Enric Mas holding a 2:15 lead over Primož Roglič.",
    bestTip: "Official route", goalsLean: "Final stage", btts: "Sunday",
    factors: ["Mas leads by 2:15", "Landa won Stage 20", "Gall sits third overall", "Final stage in Granada"],
    formHome: ["S", "2", "1"], formAway: ["G", "C"],
    homeStats: ["Date: 13 Sep", "Stage: 21", "Finish: Granada", "Leader: Enric Mas"],
    awayStats: ["Roglič: +2:15", "Gall: +2:44", "Stage 20 winner: Landa", "Final day"],
    quickInsightTitle: "Final day in Granada", quickInsight: "The general-classification gaps are verified after Stage 20.",
    related: [{ id: "zverev-shelton-final-sep13", home: "Alexander Zverev", away: "Ben Shelton", league: "US Open" }]
  },
  {
    id: "zverev-shelton-final-sep13", league: "Tennis · US Open", date: "13 Sep 2026", time: "16:00 ET", stadium: "Arthur Ashe Stadium, New York",
    home: "Alexander Zverev", away: "Ben Shelton", homeShort: "ZVE", awayShort: "SHE", homeLogo: "https://flagcdn.com/w160/de.png", awayLogo: "https://flagcdn.com/w160/us.png",
    projectedScore: "FINAL", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Top seed Alexander Zverev faces Ben Shelton in the US Open men's singles final.",
    bestTip: "Confirmed fixture", goalsLean: "Championship match", btts: "Sunday · 16:00 ET",
    factors: ["Zverev beat Khachanov", "Shelton beat Tiafoe", "Shelton's first major final", "Men's championship"],
    formHome: ["W", "W", "W"], formAway: ["W", "W", "W"],
    homeStats: ["Round: final", "Top seed", "Beat Khachanov in straight sets", "Seeking second major title"],
    awayStats: ["Round: final", "Beat Tiafoe in four sets", "First Grand Slam final", "First American men's finalist since 2006"],
    quickInsightTitle: "New York title at stake", quickInsight: "The finalists and semi-final results are verified; no unverified score prediction is presented.",
    related: [{ id: "man-utd-man-city-sep13", home: "Manchester United", away: "Manchester City", league: "Premier League" }]
  }
];
function normalizeAlias(value){return String(value||"").toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}
function getSelectedEvent(){const params=new URLSearchParams(window.location.search);const requested=normalizeAlias(params.get("id")||params.get("match")||params.get("fixture"));return GLOBAL_MATCH_RADAR.find(item=>normalizeAlias(item.id)===requested)||GLOBAL_MATCH_RADAR[0]}
function setText(id,value){const element=document.getElementById(id);if(element)element.textContent=value}
function setHtml(id,value){const element=document.getElementById(id);if(element)element.innerHTML=value}
function setImage(id,alt,src){const element=document.getElementById(id);if(element){element.src=src||"assets/default.jpg";element.alt=alt}}
function renderBadges(id,items=[]){setHtml(id,items.map(item=>`<span>${item}</span>`).join(""))}
function renderList(id,items=[]){setHtml(id,items.map(item=>`<li>${item}</li>`).join(""))}
function renderKeySignals(event){setHtml("key-signal-list",`<div class="key-signal-item"><span>Status</span><strong>${event.league}</strong></div><div class="key-signal-item"><span>Focus</span><strong>${event.bestTip}</strong></div><div class="key-signal-item"><span>Context</span><strong>${event.goalsLean}</strong></div><div class="key-signal-item"><span>Update</span><strong>${event.btts}</strong></div>`)}
function renderRelated(event){setHtml("related-match-list",(event.related||[]).map(item=>`<a class="related-match-card" href="match.html?id=${encodeURIComponent(item.id)}"><span>${item.league}</span><strong>${item.home} vs ${item.away}</strong></a>`).join(""))}
function renderEvent(event){document.title="World Sports Matches | Betforecast.ai";setText("match-league-badge",event.league);setText("match-title",`${event.home} vs ${event.away}`);setText("match-subtitle",event.summary);setText("match-date",event.date);setText("match-time",event.time);setText("match-stadium",event.stadium);setText("match-confidence-pill",`Update ${event.confidence}%`);setText("team-home-short",event.homeShort);setText("team-away-short",event.awayShort);setText("team-home-name",event.home);setText("team-away-name",event.away);setText("projected-score",event.projectedScore);setImage("team-home-logo",event.home,event.homeLogo);setImage("team-away-logo",event.away,event.awayLogo);setText("prob-home",`${event.homePct}%`);setText("prob-draw",`${event.drawPct}%`);setText("prob-away",`${event.awayPct}%`);setText("prob-home-label",`${event.homeShort} Status`);setText("prob-away-label",`${event.awayShort} Status`);[["hero-bar-home",event.homePct],["hero-bar-draw",event.drawPct],["hero-bar-away",event.awayPct]].forEach(([id,width])=>{const bar=document.getElementById(id);if(bar)bar.style.width=`${width}%`});setText("match-summary",event.summary);setText("best-tip",event.bestTip);setText("goals-lean",event.goalsLean);setText("btts-signal",event.btts);setHtml("factor-tags",event.factors.map(factor=>`<span>${factor}</span>`).join(""));setText("form-home-title",event.home);setText("form-away-title",event.away);renderBadges("form-home-badges",event.formHome);renderBadges("form-away-badges",event.formAway);renderList("form-home-list",event.homeStats);renderList("form-away-list",event.awayStats);renderKeySignals(event);renderRelated(event);setText("quick-insight-title",event.quickInsightTitle);setText("quick-insight-text",event.quickInsight)}
function loadMatchPage(){renderEvent(getSelectedEvent())}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",loadMatchPage);else loadMatchPage();
