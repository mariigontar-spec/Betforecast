const GLOBAL_MATCH_RADAR = [
  {
    id: "sabalenka-rybakina-final-sep12", league: "Tennis · US Open", date: "12 Sep 2026", time: "16:00 ET", stadium: "Arthur Ashe Stadium, New York",
    home: "Aryna Sabalenka", away: "Elena Rybakina", homeShort: "SAB", awayShort: "RYB", homeLogo: "https://flagcdn.com/w160/by.png", awayLogo: "https://flagcdn.com/w160/kz.png",
    projectedScore: "FINAL", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Two-time defending champion Aryna Sabalenka faces incoming world No. 1 Elena Rybakina in Saturday's US Open final.",
    bestTip: "Confirmed fixture", goalsLean: "Championship match", btts: "Saturday · 16:00 ET",
    factors: ["Sabalenka beat Pegula", "Rybakina beat Gauff", "Australian Open final rematch", "Women's championship"],
    formHome: ["W", "W", "W"], formAway: ["W", "W", "W"],
    homeStats: ["Round: final", "Third straight title attempt", "Fourth straight US Open final", "Beat Pegula 7-5, 6-2"],
    awayStats: ["Round: final", "Incoming world No. 1", "2026 Australian Open champion", "Beat Gauff in three sets"],
    quickInsightTitle: "New York title at stake", quickInsight: "The final and semi-final results are verified; no unverified score prediction is presented.",
    related: [{ id: "epl-sep12", home: "Premier League", away: "Seven fixtures", league: "Football" }, { id: "vuelta-stage20-sep12", home: "La Calahorra", away: "Collado del Alguacil", league: "Vuelta" }]
  },
  {
    id: "epl-sep12", league: "Football · Premier League", date: "12 Sep 2026", time: "15:00–20:00 UK", stadium: "England",
    home: "Seven fixtures", away: "Matchweek 4", homeShort: "EPL", awayShort: "MW4", projectedScore: "TODAY", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Premier League Matchweek 4 opens with seven Saturday fixtures, ending with Sunderland against Arsenal.",
    bestTip: "Official schedule", goalsLean: "Seven fixtures", btts: "Saturday programme",
    factors: ["Five 15:00 kickoffs", "Spurs–Everton at 17:30", "Sunderland–Arsenal at 20:00", "Manchester derby on Sunday"],
    formHome: ["M", "W", "4"], formAway: ["1", "2", "S", "E", "P"],
    homeStats: ["Bournemouth–Brentford", "Aston Villa–Forest", "Chelsea–Hull", "Palace–Ipswich"],
    awayStats: ["Liverpool–Fulham", "Tottenham–Everton", "Sunderland–Arsenal", "All times UK"],
    quickInsightTitle: "League action returns", quickInsight: "The table remains unchanged before the first Matchweek 4 kickoff.",
    related: [{ id: "sabalenka-rybakina-final-sep12", home: "Sabalenka", away: "Rybakina", league: "US Open" }]
  },
  {
    id: "vuelta-stage20-sep12", league: "Cycling · Vuelta a España", date: "12 Sep 2026", time: "Stage 20", stadium: "La Calahorra to Collado del Alguacil, Spain",
    home: "La Calahorra", away: "Collado del Alguacil", homeShort: "LCA", awayShort: "CDA", projectedScore: "186.8 km", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "The final mountain stage covers 186.8 kilometres and ends with the HC climb to Collado del Alguacil.",
    bestTip: "Official route", goalsLean: "Mountain stage", btts: "Final GC test",
    factors: ["186.8 km", "Four classified climbs", "HC summit finish", "Mas leads Roglič by 1:37"],
    formHome: ["M", "T", "N"], formAway: ["G", "C"],
    homeStats: ["Start: La Calahorra", "Date: 12 Sep", "Distance: 186.8 km", "Stage: 20"],
    awayStats: ["Finish: Collado del Alguacil", "Leader: Enric Mas", "Roglič: +1:37", "Gall: +3:01"],
    quickInsightTitle: "Last mountain showdown", quickInsight: "This is the final major chance to change the general classification before Granada.",
    related: [{ id: "f1-spain-qualifying-sep12", home: "Madring", away: "Qualifying", league: "Formula 1" }]
  },
  {
    id: "f1-spain-qualifying-sep12", league: "Formula 1 · Spanish Grand Prix", date: "12 Sep 2026", time: "16:00 Madrid", stadium: "Madring, Madrid",
    home: "Spanish Grand Prix", away: "Qualifying", homeShort: "ESP", awayShort: "QUAL", projectedScore: "Q1–Q3", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "The first Formula 1 qualifying session at Madrid's new Madring circuit begins at 16:00 local time.",
    bestTip: "Official schedule", goalsLean: "Grid positions", btts: "Saturday qualifying",
    factors: ["New 5.414 km circuit", "22 corners", "Antonelli led FP2", "Race Sunday at 15:00"],
    formHome: ["F", "P", "3"], formAway: ["Q", "1", "Q", "2", "Q", "3"],
    homeStats: ["Circuit: Madring", "First Grand Prix: 2026", "Race distance: 308.524 km", "57 laps Sunday"],
    awayStats: ["FP3: 12:30 local", "Qualifying: 16:00 local", "Race: 15:00 Sunday", "Round: 14"],
    quickInsightTitle: "A new circuit sets the grid", quickInsight: "Official timing is confirmed; qualifying results will be added after the session.",
    related: [{ id: "vuelta-stage20-sep12", home: "Stage 20", away: "Mountains", league: "Vuelta" }]
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
