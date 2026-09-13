const GLOBAL_MATCH_RADAR = [
  {
    id: "leeds-newcastle-sep14", league: "Football · Premier League", date: "14 Sep 2026", time: "20:00 UK", stadium: "Elland Road, Leeds",
    home: "Leeds United", away: "Newcastle United", homeShort: "LEE", awayShort: "NEW", homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t2.png", awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t4.png",
    projectedScore: "TODAY", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "Leeds United host Newcastle United in the final fixture of Premier League Matchweek 4.",
    bestTip: "Confirmed fixture", goalsLean: "Matchweek 4", btts: "Monday · 20:00 UK",
    factors: ["Leeds: 5 points", "Newcastle: 5 points", "Both unbeaten in league", "Verified Monday fixture"],
    formHome: ["W", "D", "D"], formAway: ["D", "W", "D"],
    homeStats: ["Played: 3", "Wins: 1", "Draws: 2", "Goal difference: +1"],
    awayStats: ["Played: 3", "Wins: 1", "Draws: 2", "Goal difference: +2"],
    quickInsightTitle: "Monday Night Football", quickInsight: "Fixture and pre-match league records are verified; no score prediction is presented as fact.",
    related: [{ id: "zverev-shelton-pending-sep13", home: "Alexander Zverev", away: "Ben Shelton", league: "US Open" }]
  },
  {
    id: "zverev-shelton-pending-sep13", league: "Tennis · US Open", date: "13 Sep 2026", time: "Result pending", stadium: "Arthur Ashe Stadium, New York",
    home: "Alexander Zverev", away: "Ben Shelton", homeShort: "ZVE", awayShort: "SHE", homeLogo: "https://flagcdn.com/w160/de.png", awayLogo: "https://flagcdn.com/w160/us.png",
    projectedScore: "PENDING", homePct: 0, drawPct: 0, awayPct: 0, confidence: 100,
    summary: "The US Open men's final result was not yet available from a reliable source at update time.",
    bestTip: "Await verified result", goalsLean: "Championship match", btts: "No unverified score",
    factors: ["Zverev beat Khachanov", "Shelton beat Tiafoe", "Final played Sunday", "Result pending verification"],
    formHome: ["W", "W", "W"], formAway: ["W", "W", "W"],
    homeStats: ["Top seed", "2026 French Open champion", "Beat Khachanov in straight sets", "Final result pending"],
    awayStats: ["First Grand Slam final", "Beat Tiafoe in four sets", "No. 8 seed", "Final result pending"],
    quickInsightTitle: "Verification first", quickInsight: "The last confirmed values are retained until an authoritative final score is available.",
    related: [{ id: "leeds-newcastle-sep14", home: "Leeds United", away: "Newcastle United", league: "Premier League" }]
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
