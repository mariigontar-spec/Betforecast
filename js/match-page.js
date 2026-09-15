const GLOBAL_MATCH_RADAR = [
  {
    id: "man-utd-brighton-sep16", league: "Football · Carabao Cup", date: "16 Sep 2026", time: "20:00 UK", stadium: "Old Trafford, Manchester",
    home: "Manchester United", away: "Brighton", homeShort: "MUN", awayShort: "BHA", homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png", awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t36.png",
    projectedScore: "TODAY", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Manchester United host Brighton in an all-Premier-League Carabao Cup third-round tie.",
    bestTip: "Confirmed fixture", goalsLean: "Third round", btts: "Wednesday · 20:00 UK",
    factors: ["Old Trafford cup tie", "Manchester United lost Sunday's derby", "Brighton won 5-0 at Coventry", "Official third-round fixture"],
    formHome: ["L", "W", "D", "L"], formAway: ["W", "L", "D", "W"],
    homeStats: ["Competition: Carabao Cup", "Round: third", "Venue: Old Trafford", "Kickoff: 20:00 UK"],
    awayStats: ["Competition: Carabao Cup", "Round: third", "Away fixture", "Kickoff: 20:00 UK"],
    quickInsightTitle: "Cup night at Old Trafford", quickInsight: "Fixture and recent league context are verified; no score prediction is presented as fact.",
    related: [{ id: "coventry-aston-villa-sep16", home: "Coventry City", away: "Aston Villa", league: "Carabao Cup" }]
  },
  {
    id: "coventry-aston-villa-sep16", league: "Football · Carabao Cup", date: "16 Sep 2026", time: "20:00 UK", stadium: "Coventry Building Society Arena",
    home: "Coventry City", away: "Aston Villa", homeShort: "COV", awayShort: "AVL", homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t189.png", awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t7.png",
    projectedScore: "TODAY", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Coventry City host Aston Villa in a West Midlands Carabao Cup third-round tie.",
    bestTip: "Confirmed fixture", goalsLean: "Third round", btts: "Wednesday · 20:00 UK",
    factors: ["West Midlands tie", "Coventry at home", "Both clubs seek momentum", "Official third-round fixture"],
    formHome: ["L", "L", "L", "L"], formAway: ["L", "L", "D", "L"],
    homeStats: ["Competition: Carabao Cup", "Round: third", "Venue: Coventry", "Kickoff: 20:00 UK"],
    awayStats: ["Competition: Carabao Cup", "Round: third", "Away fixture", "Kickoff: 20:00 UK"],
    quickInsightTitle: "Local cup contest", quickInsight: "The fixture and current league records are verified before kickoff.",
    related: [{ id: "man-utd-brighton-sep16", home: "Manchester United", away: "Brighton", league: "Carabao Cup" }]
  },
  {
    id: "everton-wolves-sep16", league: "Football · Carabao Cup", date: "16 Sep 2026", time: "19:45 UK", stadium: "Everton",
    home: "Everton", away: "Wolverhampton Wanderers", homeShort: "EVE", awayShort: "WOL", homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t11.png", awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t39.png",
    projectedScore: "TODAY", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Everton face Wolverhampton Wanderers in Wednesday's Carabao Cup third-round programme.",
    bestTip: "Confirmed fixture", goalsLean: "Third round", btts: "Wednesday · 19:45 UK",
    factors: ["Knockout tie", "Everton at home", "Official fixture", "No score prediction"],
    formHome: ["W", "D", "D", "D"], formAway: [],
    homeStats: ["Competition: Carabao Cup", "Round: third", "Home fixture", "Kickoff: 19:45 UK"],
    awayStats: ["Competition: Carabao Cup", "Round: third", "Away fixture", "Kickoff: 19:45 UK"],
    quickInsightTitle: "Wednesday knockout football", quickInsight: "Kickoff and competition details are verified from the official schedule.",
    related: [{ id: "fleetwood-sheffield-sep16", home: "Fleetwood Town", away: "Sheffield United", league: "Carabao Cup" }]
  },
  {
    id: "fleetwood-sheffield-sep16", league: "Football · Carabao Cup", date: "16 Sep 2026", time: "19:45 UK", stadium: "Fleetwood",
    home: "Fleetwood Town", away: "Sheffield United", homeShort: "FLT", awayShort: "SHU",
    projectedScore: "TODAY", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Fleetwood Town host Sheffield United in the Carabao Cup third round.",
    bestTip: "Confirmed fixture", goalsLean: "Third round", btts: "Wednesday · 19:45 UK",
    factors: ["Knockout tie", "Fleetwood at home", "Official fixture", "No score prediction"],
    formHome: [], formAway: [],
    homeStats: ["Competition: Carabao Cup", "Round: third", "Home fixture", "Kickoff: 19:45 UK"],
    awayStats: ["Competition: Carabao Cup", "Round: third", "Away fixture", "Kickoff: 19:45 UK"],
    quickInsightTitle: "Third-round place at stake", quickInsight: "Only confirmed fixture information is displayed.",
    related: [{ id: "everton-wolves-sep16", home: "Everton", away: "Wolverhampton Wanderers", league: "Carabao Cup" }]
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
