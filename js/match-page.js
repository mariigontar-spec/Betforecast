const GLOBAL_MATCH_RADAR = [
  {
    id: "man-city-norwich-sep17", league: "Football · Carabao Cup", date: "17 Sep 2026", time: "19:30 UK", stadium: "Manchester",
    home: "Manchester City", away: "Norwich City", homeShort: "MCI", awayShort: "NOR", homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t43.png", awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t45.png",
    projectedScore: "TODAY", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Manchester City host Norwich City in the final Carabao Cup third-round tie of the week.",
    bestTip: "Confirmed fixture", goalsLean: "Third round", btts: "Thursday · 19:30 UK",
    factors: ["EFL confirmed kickoff", "Manchester City at home", "Winner advances to round four", "No unverified score prediction"],
    formHome: ["W", "W", "W", "W"], formAway: [],
    homeStats: ["Competition: Carabao Cup", "Round: third", "Home fixture", "Kickoff: 19:30 UK"],
    awayStats: ["Competition: Carabao Cup", "Round: third", "Away fixture", "Kickoff: 19:30 UK"],
    quickInsightTitle: "Final third-round tie", quickInsight: "Kickoff and competition are confirmed by EFL; no score is asserted before the match.",
    related: [{ id: "juventus-nec-sep17", home: "Juventus", away: "N.E.C. Nijmegen", league: "Europa League" }]
  },
  {
    id: "juventus-nec-sep17", league: "Football · UEFA Europa League", date: "17 Sep 2026", time: "21:00 CEST", stadium: "Juventus Stadium, Turin",
    home: "Juventus", away: "N.E.C. Nijmegen", homeShort: "JUV", awayShort: "NEC",
    projectedScore: "TODAY", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Juventus begin their Europa League league-phase campaign at home to N.E.C. Nijmegen.",
    bestTip: "Club-confirmed fixture", goalsLean: "League phase", btts: "Thursday · 21:00 CEST",
    factors: ["Juventus club schedule", "League-phase opener", "Turin home fixture", "No unverified score prediction"],
    formHome: [], formAway: [],
    homeStats: ["Competition: Europa League", "Phase: league", "Venue: Turin", "Kickoff: 21:00 CEST"],
    awayStats: ["Competition: Europa League", "Phase: league", "Away fixture", "Kickoff: 21:00 CEST"],
    quickInsightTitle: "Europe returns to Turin", quickInsight: "The kickoff and opponents are confirmed on Juventus' official calendar.",
    related: [{ id: "man-city-norwich-sep17", home: "Manchester City", away: "Norwich City", league: "Carabao Cup" }]
  },
  {
    id: "real-sociedad-bournemouth-sep17", league: "Football · UEFA Europa League", date: "17 Sep 2026", time: "21:00 CEST", stadium: "San Sebastián, Spain",
    home: "Real Sociedad", away: "Bournemouth", homeShort: "RSO", awayShort: "BOU", awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t91.png",
    projectedScore: "TODAY", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Real Sociedad welcome Bournemouth in the opening Europa League league-phase round.",
    bestTip: "UEFA-confirmed fixture", goalsLean: "League phase", btts: "Thursday · 21:00 CEST",
    factors: ["UEFA fixture", "Bournemouth away in Spain", "Opening round", "No unverified score prediction"],
    formHome: [], formAway: [],
    homeStats: ["Competition: Europa League", "Phase: league", "Home fixture", "Date: 17 Sep"],
    awayStats: ["Competition: Europa League", "Phase: league", "Away fixture", "Date: 17 Sep"],
    quickInsightTitle: "Opening European night", quickInsight: "The tie is listed on UEFA's official match page.",
    related: [{ id: "juventus-nec-sep17", home: "Juventus", away: "N.E.C. Nijmegen", league: "Europa League" }]
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
