const GLOBAL_MATCH_RADAR = [
  {
    "id": "netherlands-germany-sep24",
    "league": "Football · UEFA Nations League",
    "date": "24 Sep 2026",
    "time": "20:45 CET",
    "stadium": "Netherlands",
    "home": "Netherlands",
    "away": "Germany",
    "homeShort": "NED",
    "awayShort": "GER",
    "homeLogo": "https://flagcdn.com/w160/nl.png",
    "awayLogo": "https://flagcdn.com/w160/de.png",
    "projectedScore": "UPCOMING",
    "homePct": 0,
    "drawPct": 0,
    "awayPct": 0,
    "confidence": 100,
    "summary": "The Netherlands host Germany on the opening night of the 2026/27 UEFA Nations League.",
    "bestTip": "Official Matchday 1 fixture",
    "goalsLean": "League A · Group A2",
    "btts": "Kickoff · 20:45 CET",
    "factors": [
      "Official UEFA fixture",
      "Managerial debuts for Xavi Hernández and Jürgen Klopp",
      "No unverified score prediction"
    ],
    "formHome": [],
    "formAway": [],
    "homeStats": [
      "Nations League opener",
      "Group A2"
    ],
    "awayStats": [
      "Nations League opener",
      "Group A2"
    ],
    "quickInsightTitle": "Featured international fixture",
    "quickInsight": "A classic European rivalry opens the new Nations League campaign on 24 September.",
    "related": [
      {
        "id": "portugal-wales-sep24",
        "home": "Portugal",
        "away": "Wales",
        "league": "UEFA Nations League"
      }
    ]
  },
  {
    "id": "portugal-wales-sep24",
    "league": "Football · UEFA Nations League",
    "date": "24 Sep 2026",
    "time": "20:45 CET",
    "stadium": "Portugal",
    "home": "Portugal",
    "away": "Wales",
    "homeShort": "POR",
    "awayShort": "WAL",
    "homeLogo": "https://flagcdn.com/w160/pt.png",
    "awayLogo": "https://flagcdn.com/w160/gb-wls.png",
    "projectedScore": "UPCOMING",
    "homePct": 0,
    "drawPct": 0,
    "awayPct": 0,
    "confidence": 100,
    "summary": "Portugal host Wales in the opening round of Nations League Group A4.",
    "bestTip": "Official Matchday 1 fixture",
    "goalsLean": "League A · Group A4",
    "btts": "Kickoff · 20:45 CET",
    "factors": [
      "Official UEFA fixture",
      "Wales begin their League A campaign",
      "No unverified score prediction"
    ],
    "formHome": [],
    "formAway": [],
    "homeStats": [
      "Nations League opener",
      "Group A4"
    ],
    "awayStats": [
      "Nations League opener",
      "Group A4"
    ],
    "quickInsightTitle": "Opening-night fixture",
    "quickInsight": "Portugal and Wales begin their 2026/27 Nations League campaigns on 24 September.",
    "related": [
      {
        "id": "netherlands-germany-sep24",
        "home": "Netherlands",
        "away": "Germany",
        "league": "UEFA Nations League"
      }
    ]
  },
  {
    "id": "england-spain-sep26",
    "league": "Football · UEFA Nations League",
    "date": "26 Sep 2026",
    "time": "19:45 UK",
    "stadium": "Wembley Stadium, London",
    "home": "England",
    "away": "Spain",
    "homeShort": "ENG",
    "awayShort": "ESP",
    "homeLogo": "https://flagcdn.com/w160/gb-eng.png",
    "awayLogo": "https://flagcdn.com/w160/es.png",
    "projectedScore": "UPCOMING",
    "homePct": 0,
    "drawPct": 0,
    "awayPct": 0,
    "confidence": 100,
    "summary": "England host Spain at Wembley in Nations League Group A3.",
    "bestTip": "Official Matchday 1 fixture",
    "goalsLean": "League A · Group A3",
    "btts": "Kickoff · 19:45 UK",
    "factors": [
      "Official UEFA fixture",
      "England confirmed five injury withdrawals",
      "No unverified score prediction"
    ],
    "formHome": [],
    "formAway": [],
    "homeStats": [
      "Nations League opener",
      "Five confirmed withdrawals"
    ],
    "awayStats": [
      "Nations League opener",
      "World champions"
    ],
    "quickInsightTitle": "Squad availability watch",
    "quickInsight": "England confirmed that Palmer, Rice, Rashford, Mainoo and Livramento withdrew through injury.",
    "related": [
      {
        "id": "iceland-estonia-sep26",
        "home": "Iceland",
        "away": "Estonia",
        "league": "UEFA Nations League"
      }
    ]
  },
  {
    "id": "iceland-estonia-sep26",
    "league": "Football · UEFA Nations League",
    "date": "26 Sep 2026",
    "time": "18:00 CET",
    "stadium": "Iceland",
    "home": "Iceland",
    "away": "Estonia",
    "homeShort": "ISL",
    "awayShort": "EST",
    "homeLogo": "https://flagcdn.com/w160/is.png",
    "awayLogo": "https://flagcdn.com/w160/ee.png",
    "projectedScore": "UPCOMING",
    "homePct": 0,
    "drawPct": 0,
    "awayPct": 0,
    "confidence": 100,
    "summary": "Estonia begin their Nations League campaign away to Iceland.",
    "bestTip": "Official Matchday 1 fixture",
    "goalsLean": "League C · Group C4",
    "btts": "Kickoff · 18:00 CET",
    "factors": [
      "Official UEFA fixture",
      "Estonia open away from home",
      "No unverified score prediction"
    ],
    "formHome": [],
    "formAway": [],
    "homeStats": [
      "Nations League opener",
      "Group C4"
    ],
    "awayStats": [
      "Nations League opener",
      "Group C4"
    ],
    "quickInsightTitle": "Baltic focus",
    "quickInsight": "Estonia's opening League C fixture is confirmed for 26 September.",
    "related": [
      {
        "id": "england-spain-sep26",
        "home": "England",
        "away": "Spain",
        "league": "UEFA Nations League"
      }
    ]
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
