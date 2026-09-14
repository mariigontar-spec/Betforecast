const GLOBAL_MATCH_RADAR = [
  {
    id: "liverpool-tottenham-sep15", league: "Football · Carabao Cup", date: "15 Sep 2026", time: "20:00 UK", stadium: "Anfield, Liverpool",
    home: "Liverpool", away: "Tottenham Hotspur", homeShort: "LIV", awayShort: "TOT", homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t14.png", awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t6.png",
    projectedScore: "TODAY", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Liverpool host Tottenham Hotspur in an all-Premier-League Carabao Cup third-round tie.",
    bestTip: "Confirmed fixture", goalsLean: "Third round", btts: "Tuesday · 20:00 UK",
    factors: ["Anfield cup tie", "Liverpool unbeaten in league", "Tottenham yet to score in league", "Official third-round fixture"],
    formHome: ["D", "D", "W", "D"], formAway: ["L", "L", "D", "D"],
    homeStats: ["Competition: Carabao Cup", "Round: third", "Venue: Anfield", "Kickoff: 20:00 UK"],
    awayStats: ["Competition: Carabao Cup", "Round: third", "Away fixture", "Kickoff: 20:00 UK"],
    quickInsightTitle: "Cup night at Anfield", quickInsight: "Fixture and recent league context are verified; no score prediction is presented as fact.",
    related: [{ id: "ipswich-arsenal-sep15", home: "Ipswich Town", away: "Arsenal", league: "Carabao Cup" }]
  },
  {
    id: "ipswich-arsenal-sep15", league: "Football · Carabao Cup", date: "15 Sep 2026", time: "20:00 UK", stadium: "Portman Road, Ipswich",
    home: "Ipswich Town", away: "Arsenal", homeShort: "IPS", awayShort: "ARS", homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t40.png", awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t3.png",
    projectedScore: "TODAY", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Ipswich Town host Premier League leaders Arsenal in the Carabao Cup third round.",
    bestTip: "Confirmed fixture", goalsLean: "Third round", btts: "Tuesday · 20:00 UK",
    factors: ["Ipswich won on Saturday", "Arsenal lead the Premier League", "Portman Road", "Official third-round fixture"],
    formHome: ["W", "L", "L", "W"], formAway: ["W", "W", "W", "W"],
    homeStats: ["Competition: Carabao Cup", "Round: third", "Venue: Portman Road", "Kickoff: 20:00 UK"],
    awayStats: ["Premier League: 1st", "League points: 12", "Four league wins", "Kickoff: 20:00 UK"],
    quickInsightTitle: "Leaders enter the cup", quickInsight: "The fixture and league records are verified before kickoff.",
    related: [{ id: "liverpool-tottenham-sep15", home: "Liverpool", away: "Tottenham Hotspur", league: "Carabao Cup" }]
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
