const GLOBAL_MATCH_RADAR = [
  {
    id: "brentford-chelsea-sep18", league: "Football · Premier League", date: "18 Sep 2026", time: "20:00 UK", stadium: "Gtech Community Stadium, London",
    home: "Brentford", away: "Chelsea", homeShort: "BRE", awayShort: "CHE", homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t94.png", awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t8.png",
    projectedScore: "TODAY", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Brentford host Chelsea to open Premier League Matchweek 5 on Friday evening.",
    bestTip: "Club-confirmed fixture", goalsLean: "Matchweek 5", btts: "Friday · 20:00 UK",
    factors: ["Official Brentford and Chelsea fixture", "Brentford are unbeaten in four league games", "Chelsea have seven points from four", "No unverified score prediction"],
    formHome: ["W", "D", "D", "D"], formAway: ["W", "W", "L", "D"],
    homeStats: ["Played: 4", "W-D-L: 1-3-0", "Goals: 7-4", "Points: 6"],
    awayStats: ["Played: 4", "W-D-L: 2-1-1", "Goals: 10-9", "Points: 7"],
    quickInsightTitle: "West London derby", quickInsight: "The Friday kickoff is confirmed by both clubs; probabilities are withheld without a verified model.",
    related: [{ id: "brighton-arsenal-sep19", home: "Brighton", away: "Arsenal", league: "Premier League" }]
  },
  {
    id: "brighton-arsenal-sep19", league: "Football · Premier League", date: "19 Sep 2026", time: "15:00 UK", stadium: "Amex Stadium, Brighton",
    home: "Brighton", away: "Arsenal", homeShort: "BHA", awayShort: "ARS", homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t36.png", awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t3.png",
    projectedScore: "NEXT", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Brighton welcome league leaders Arsenal on Saturday in Matchweek 5.",
    bestTip: "Confirmed fixture", goalsLean: "Matchweek 5", btts: "Saturday · 15:00 UK",
    factors: ["Premier League schedule", "Arsenal top after four matches", "Brighton have seven points", "No unverified score prediction"],
    formHome: ["W", "L", "D", "W"], formAway: ["W", "W", "W", "W"],
    homeStats: ["Played: 4", "W-D-L: 2-1-1", "Goals: 13-5", "Points: 7"],
    awayStats: ["Played: 4", "W-D-L: 4-0-0", "Goals: 8-1", "Points: 12"],
    quickInsightTitle: "Saturday's table test", quickInsight: "League table values are the latest verified after Matchweek 4.",
    related: [{ id: "brentford-chelsea-sep18", home: "Brentford", away: "Chelsea", league: "Premier League" }]
  },
  {
    id: "tottenham-villa-sep19", league: "Football · Premier League", date: "19 Sep 2026", time: "12:30 UK", stadium: "Tottenham Hotspur Stadium, London",
    home: "Tottenham Hotspur", away: "Aston Villa", homeShort: "TOT", awayShort: "AVL", homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t6.png", awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t7.png",
    projectedScore: "NEXT", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Tottenham host Aston Villa in Saturday's early Premier League match.",
    bestTip: "League-confirmed fixture", goalsLean: "Matchweek 5", btts: "Saturday · 12:30 UK",
    factors: ["Premier League fixture amendments", "Saturday early kickoff", "League match", "No unverified score prediction"],
    formHome: [], formAway: [],
    homeStats: ["Played: 4", "Points: 2"], awayStats: ["Played: 4", "Points: 1"],
    quickInsightTitle: "Saturday early kickoff", quickInsight: "Official schedule lists the fixture at 12:30 UK.",
    related: [{ id: "brentford-chelsea-sep18", home: "Brentford", away: "Chelsea", league: "Premier League" }]
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
