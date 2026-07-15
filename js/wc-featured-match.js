(function () {
  const MATCHES = [
    {
      home: 'England',
      away: 'Argentina',
      stage: 'Semifinal',
      date: '15 Jul',
      time: '22:00',
      venue: 'Atlanta Stadium',
      homePercent: 35,
      drawPercent: 31,
      awayPercent: 34,
      confidence: 61,
      pick: 'Argentina to advance',
      tag: 'Tonight',
      advice: 'ARGENTINA ARE ONE BIG PERFORMANCE FROM THE FINAL.',
      text: 'England hold a narrow market edge, but Argentina remain unbeaten across 12 World Cup matches and Messi leads the scoring race. The holders have every reason to believe.',
      homeLogo: 'https://flagcdn.com/w160/gb-eng.png',
      awayLogo: 'https://flagcdn.com/w160/ar.png'
    },
    {
      home: 'France',
      away: 'TBD',
      stage: 'Third Place Playoff',
      date: '18 Jul',
      time: '00:00',
      venue: 'Miami Stadium',
      homePercent: 38,
      drawPercent: 30,
      awayPercent: 32,
      confidence: 60,
      pick: 'Awaiting opponent',
      tag: '3rd',
      advice: 'Opponent will be confirmed after the second semifinal',
      text: 'France will face the losing team from England vs Argentina in the third-place playoff.',
      homeLogo: 'https://flagcdn.com/w160/fr.png',
      awayLogo: 'https://flagcdn.com/w160/un.png'
    },
    {
      home: 'Spain',
      away: 'TBD',
      stage: 'Final',
      date: '19 Jul',
      time: '22:00',
      venue: 'New York New Jersey Stadium',
      homePercent: 40,
      drawPercent: 30,
      awayPercent: 30,
      confidence: 64,
      pick: 'Spain lean',
      tag: 'Final',
      advice: 'Spain await the winner of England vs Argentina',
      text: 'Spain reached the final after a controlled 2-0 semifinal victory over France.',
      homeLogo: 'https://flagcdn.com/w160/es.png',
      awayLogo: 'https://flagcdn.com/w160/un.png'
    }
  ];

  const RESULTS = [
    { match: 'France vs Spain', score: '0-2', note: 'Spain advanced to the World Cup final' },
    { match: 'Argentina vs Switzerland', score: '3-1', note: 'Argentina advanced to the semifinal' },
    { match: 'Norway vs England', score: '1-2', note: 'England advanced to the semifinal' }
  ];

  function cleanText(value) {
    return String(value || '').replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '').replace(/[·•]/g, '-').trim();
  }

  function injectCss() {
    const old = document.getElementById('bf-home-clean-css');
    if (old) old.remove();
    const style = document.createElement('style');
    style.id = 'bf-home-clean-css';
    style.textContent = `
      body.site-skin-1win .bf-hero.argentina-night{
        position:relative!important;
        overflow:hidden!important;
        background:
          radial-gradient(circle at 15% 15%,rgba(117,201,255,.22),transparent 34%),
          radial-gradient(circle at 88% 28%,rgba(255,255,255,.12),transparent 28%),
          linear-gradient(135deg,rgba(8,30,49,.94),rgba(4,14,25,.98))!important;
        border-color:rgba(117,201,255,.34)!important;
        box-shadow:0 22px 70px rgba(0,0,0,.42),0 0 42px rgba(117,201,255,.09)!important;
      }
      body.site-skin-1win .bf-hero.argentina-night:before{
        content:'ARGENTINA NIGHT  🇦🇷';
        position:absolute;
        top:18px;
        right:-52px;
        z-index:2;
        width:220px;
        padding:8px 18px;
        transform:rotate(34deg);
        color:#06121d;
        background:linear-gradient(90deg,#78c8ff,#fff,#78c8ff);
        font-size:10px;
        line-height:1;
        font-weight:950;
        letter-spacing:.12em;
        text-align:center;
        box-shadow:0 0 26px rgba(117,201,255,.36);
      }
      body.site-skin-1win .bf-hero.argentina-night .bf-hero-left,
      body.site-skin-1win .bf-hero.argentina-night .bf-featured{
        position:relative!important;
        z-index:1!important;
        border-color:rgba(117,201,255,.24)!important;
        background:linear-gradient(180deg,rgba(12,35,54,.95),rgba(5,18,31,.98))!important;
      }
      body.site-skin-1win .bf-hero.argentina-night .bf-pill,
      body.site-skin-1win .bf-hero.argentina-night .bf-mini-pill{
        color:#a9dcff!important;
        border-color:rgba(117,201,255,.34)!important;
        background:rgba(117,201,255,.11)!important;
        box-shadow:0 0 20px rgba(117,201,255,.10)!important;
      }
      body.site-skin-1win .bf-hero.argentina-night h1 span{
        color:#8fd3ff!important;
        text-shadow:0 0 24px rgba(117,201,255,.20)!important;
      }
      body.site-skin-1win .bf-hero.argentina-night .bf-metric{
        border-color:rgba(117,201,255,.20)!important;
        background:rgba(117,201,255,.055)!important;
      }
      body.site-skin-1win .bf-hero.argentina-night .bf-metric span{
        color:#8fd3ff!important;
      }
      body.site-skin-1win .bf-hero.argentina-night .bf-search-card{
        border-color:rgba(117,201,255,.22)!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.04),0 0 28px rgba(117,201,255,.06)!important;
      }
      body.site-skin-1win .bf-hero.argentina-night .bf-search-row button,
      body.site-skin-1win .bf-hero.argentina-night .bf-featured-actions a:first-child{
        color:#06121d!important;
        background:linear-gradient(135deg,#78c8ff,#eaf8ff)!important;
        box-shadow:0 0 24px rgba(117,201,255,.28)!important;
      }
      body.site-skin-1win .bf-hero.argentina-night .bf-featured{
        box-shadow:0 18px 50px rgba(0,0,0,.28),inset 0 0 32px rgba(117,201,255,.035)!important;
      }
      body.site-skin-1win .bf-hero.argentina-night .bf-team:last-child .bf-team-logo-wrap{
        border-color:rgba(117,201,255,.62)!important;
        box-shadow:0 0 0 5px rgba(117,201,255,.08),0 0 34px rgba(117,201,255,.25)!important;
      }
      body.site-skin-1win .bf-hero.argentina-night .bf-ai-predicts{
        width:100%!important;
        border-color:rgba(117,201,255,.34)!important;
        background:linear-gradient(90deg,rgba(117,201,255,.10),rgba(255,255,255,.055),rgba(117,201,255,.10))!important;
        box-shadow:0 0 26px rgba(117,201,255,.08)!important;
      }
      body.site-skin-1win .bf-hero.argentina-night .bf-ai-predicts strong{
        color:#c9ebff!important;
        font-size:14px!important;
      }
      body.site-skin-1win .bf-hero.argentina-night .bf-probs>div:last-child{
        border-color:rgba(117,201,255,.44)!important;
        background:rgba(117,201,255,.10)!important;
        box-shadow:0 0 24px rgba(117,201,255,.10)!important;
      }
      body.site-skin-1win .bf-hero.argentina-night .bf-probs>div:last-child strong{
        color:#9bd9ff!important;
      }
      body.site-skin-1win .bf-hero.argentina-night .bf-probs>div:last-child .bf-prob-bar span{
        background:linear-gradient(90deg,#78c8ff,#fff)!important;
      }
      body.site-skin-1win .bf-team-logo-wrap{width:104px!important;height:104px!important;margin:0 auto 14px!important;border-radius:50%!important;overflow:hidden!important;background:rgba(255,255,255,.08)!important;border:1px solid rgba(255,255,255,.10)!important;display:grid!important;place-items:center!important}
      body.site-skin-1win .bf-team-logo-img{width:118%!important;height:118%!important;padding:0!important;object-fit:cover!important;transform:scale(1.06)!important}
      body.site-skin-1win .bf-clean-predictions{display:block!important;width:100%!important;min-width:0!important;overflow:visible!important;border:0!important;background:transparent!important}
      body.site-skin-1win .bf-clean-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:14px!important;width:100%!important}
      body.site-skin-1win .bf-clean-match-card{display:flex!important;flex-direction:column!important;min-width:0!important;min-height:170px!important;padding:18px!important;border-radius:20px!important;border:1px solid rgba(94,224,164,.14)!important;background:rgba(2,11,19,.34)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.03)!important}
      body.site-skin-1win .bf-clean-match-card,body.site-skin-1win .bf-clean-match-card *,body.site-skin-1win .bf-line-panels,body.site-skin-1win .bf-line-panels *{writing-mode:horizontal-tb!important;text-orientation:mixed!important;transform:none!important;word-break:normal!important;overflow-wrap:normal!important;letter-spacing:normal!important;box-sizing:border-box!important}
      body.site-skin-1win .bf-clean-card-top{display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:10px!important;margin-bottom:14px!important}
      body.site-skin-1win .bf-clean-match-title{color:#fff!important;font-size:17px!important;line-height:1.25!important;font-weight:900!important}
      body.site-skin-1win .bf-clean-stage,body.site-skin-1win .bf-clean-pill,body.site-skin-1win .bf-line-badge,body.site-skin-1win .bf-line-score{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:fit-content!important;max-width:100%!important;padding:7px 10px!important;border-radius:999px!important;color:#06120d!important;background:#5ee0a4!important;font-size:12px!important;line-height:1!important;font-weight:900!important;white-space:nowrap!important}
      body.site-skin-1win .bf-clean-stage{color:rgba(248,250,252,.9)!important;background:rgba(94,224,164,.16)!important;border:1px solid rgba(94,224,164,.18)!important}
      body.site-skin-1win .bf-clean-meta{display:block!important;margin-top:auto!important;color:rgba(248,250,252,.68)!important;font-size:13px!important;line-height:1.4!important}
      body.site-skin-1win .bf-clean-probs{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px!important;margin:14px 0!important}
      body.site-skin-1win .bf-clean-probs div{padding:10px 8px!important;border-radius:14px!important;background:rgba(255,255,255,.035)!important;text-align:center!important}
      body.site-skin-1win .bf-clean-probs span{display:block!important;margin-bottom:4px!important;color:rgba(248,250,252,.58)!important;font-size:10px!important;font-weight:900!important;text-transform:uppercase!important}
      body.site-skin-1win .bf-clean-probs b{display:block!important;color:#fff!important;font-size:17px!important;line-height:1!important}
      body.site-skin-1win .model-view.bf-line-panels{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:22px!important;width:100%!important;align-items:start!important;border:0!important;background:transparent!important;box-shadow:none!important}
      body.site-skin-1win .bf-line-panel{width:100%!important;min-width:0!important;padding:30px 32px!important;border-radius:28px!important;border:1px solid rgba(94,224,164,.16)!important;background:linear-gradient(180deg,rgba(18,38,55,.96),rgba(8,20,32,.98))!important;box-shadow:0 18px 50px rgba(0,0,0,.26)!important;overflow:hidden!important}
      body.site-skin-1win .bf-line-head{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:18px!important;margin-bottom:20px!important}
      body.site-skin-1win .bf-line-head h2{margin:0!important;color:#fff!important;font-size:34px!important;line-height:1!important;letter-spacing:-.05em!important}
      body.site-skin-1win .bf-line-head span{padding:8px 12px!important;border-radius:999px!important;color:rgba(248,250,252,.72)!important;background:rgba(255,255,255,.055)!important;font-size:12px!important;font-weight:900!important;text-transform:uppercase!important;white-space:nowrap!important}
      body.site-skin-1win .bf-line-list{display:grid!important;gap:0!important;width:100%!important}
      body.site-skin-1win .bf-line-row{display:grid!important;grid-template-columns:86px minmax(0,1fr) auto!important;align-items:center!important;gap:18px!important;width:100%!important;padding:15px 0!important;border:0!important;border-bottom:1px solid rgba(94,224,164,.13)!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}
      body.site-skin-1win .bf-line-row:first-child{padding-top:0!important} body.site-skin-1win .bf-line-row:last-child{padding-bottom:0!important;border-bottom:0!important}
      body.site-skin-1win .bf-line-date{display:grid!important;gap:4px!important;color:rgba(248,250,252,.58)!important;font-size:12px!important;line-height:1.1!important;text-transform:uppercase!important;white-space:nowrap!important}
      body.site-skin-1win .bf-line-date b{color:#fff!important;font-size:17px!important}
      body.site-skin-1win .bf-line-main strong{display:block!important;color:#fff!important;font-size:18px!important;line-height:1.22!important;font-weight:900!important}
      body.site-skin-1win .bf-line-main small{display:block!important;margin-top:5px!important;color:rgba(248,250,252,.68)!important;font-size:13px!important;line-height:1.35!important}
      body.site-skin-1win .bf-line-badge,body.site-skin-1win .bf-line-score{justify-self:end!important}
      @media(max-width:1100px){body.site-skin-1win .bf-clean-grid,body.site-skin-1win .model-view.bf-line-panels{grid-template-columns:1fr!important}}
      @media(max-width:768px){body.site-skin-1win .bf-hero.argentina-night:before{top:12px;right:-70px;width:210px;font-size:9px}body.site-skin-1win .bf-team-logo-wrap{width:88px!important;height:88px!important}body.site-skin-1win .bf-line-panel{padding:24px 18px!important}body.site-skin-1win .bf-line-head h2{font-size:30px!important}body.site-skin-1win .bf-line-row{grid-template-columns:1fr auto!important;gap:12px!important}body.site-skin-1win .bf-line-date{grid-column:1/-1!important;display:flex!important;gap:8px!important;align-items:baseline!important}}
    `;
    document.head.appendChild(style);
  }

  function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = cleanText(text); }
  function setImage(id, src, alt) { const img = document.getElementById(id); if (!img) return; img.src = src; img.alt = alt || ''; img.style.visibility = 'visible'; }
  function setBar(id, percent) { const bar = document.getElementById(id); if (bar) bar.style.width = percent + '%'; }

  function renderArgentinaHero() {
    const hero = document.querySelector('.bf-hero');
    if (hero) hero.classList.add('argentina-night');

    const pill = document.querySelector('.bf-hero-left > .bf-pill');
    const title = document.querySelector('.bf-hero-left > h1');
    const intro = document.querySelector('.bf-hero-left > p');
    const metrics = document.querySelectorAll('.bf-hero-left .bf-metric');
    const searchPill = document.querySelector('.bf-search-card .bf-mini-pill');
    const searchTitle = document.querySelector('.bf-search-card h2');
    const searchButton = document.getElementById('match-search-btn');
    const searchResult = document.getElementById('match-search-result');
    const featuredTitle = document.querySelector('.bf-featured-top strong');
    const actions = document.querySelectorAll('.bf-featured-actions a');

    if (pill) pill.textContent = '🔥 Tonight\'s World Cup Semifinal';
    if (title) title.innerHTML = 'Argentina. One match from glory. <span>The final is calling.</span>';
    if (intro) intro.textContent = 'The defending champions face England tonight. Messi, history and a place in the World Cup final. Our model sees a near-even battle, with Argentina carrying the champion\'s nerve.';

    const metricData = [
      ['🏆', '3', 'Knockout wins'],
      ['⚽', '8', 'Messi goals'],
      ['🔥', '12', 'WC unbeaten'],
      ['⚡', '22:00', 'Tallinn kickoff']
    ];

    metrics.forEach((metric, index) => {
      const data = metricData[index];
      if (data) metric.innerHTML = `<span>${data[0]}</span><strong>${data[1]}</strong><small>${data[2]}</small>`;
    });

    if (searchPill) searchPill.textContent = 'Tonight\'s main event';
    if (searchTitle) searchTitle.textContent = 'Will Argentina reach the final? 🇦🇷';
    if (searchButton) searchButton.textContent = 'Analyze Argentina';
    if (searchResult && !searchResult.querySelector('.bf-live-result')) {
      searchResult.textContent = 'England vs Argentina. One semifinal. One ticket to the final. See why the champions can beat the narrow odds.';
    }
    if (featuredTitle) featuredTitle.textContent = 'Tonight\'s Semifinal';
    if (actions[0]) actions[0].textContent = 'Full Argentina Prediction';
    if (actions[1]) actions[1].textContent = 'Why Argentina?';
  }

  function renderFeaturedCard() {
    const m = MATCHES[0];
    setText('wcConfidence', 'AI Confidence ' + m.confidence + '%'); setText('wcHomeTeam', m.home); setText('wcAwayTeam', m.away);
    setText('wcHomeNote', m.stage); setText('wcAwayNote', m.stage); setText('wcVersus', 'VS'); setText('wcAdvice', m.advice);
    setText('wcHomePercent', m.homePercent + '%'); setText('wcDrawPercent', m.drawPercent + '%'); setText('wcAwayPercent', m.awayPercent + '%');
    setText('wcMatchDate', m.date + ', ' + m.time); setText('wcMatchStatus', m.tag); setText('wcVenue', m.venue); setText('wcPredictionText', m.text);
    setImage('wcHomeLogo', m.homeLogo, m.home + ' flag'); setImage('wcAwayLogo', m.awayLogo, m.away + ' flag');
    setBar('wcHomeBar', m.homePercent); setBar('wcDrawBar', m.drawPercent); setBar('wcAwayBar', m.awayPercent);
  }

  function renderPredictions() {
    const title = document.querySelector('.bf-predictions-section h2'); const box = document.querySelector('.bf-predictions-table');
    if (title) title.textContent = 'Next World Cup AI Predictions'; if (!box) return;
    box.className = 'bf-predictions-table bf-clean-predictions';
    box.innerHTML = `<div class="bf-clean-grid">${MATCHES.map(m => `<article class="bf-clean-match-card"><div class="bf-clean-card-top"><strong class="bf-clean-match-title">${m.home} vs ${m.away}</strong><span class="bf-clean-stage">${m.stage}</span></div><div class="bf-clean-probs"><div><span>Home</span><b>${m.homePercent}%</b></div><div><span>Draw</span><b>${m.drawPercent}%</b></div><div><span>Away</span><b>${m.awayPercent}%</b></div></div><span class="bf-clean-pill">${m.pick}</span><small class="bf-clean-meta">${m.date}, ${m.time} - ${m.venue}</small></article>`).join('')}</div>`;
  }

  function renderLowerPanels() {
    const modelView = document.querySelector('.model-view'); if (!modelView) return;
    modelView.className = 'model-view bf-line-panels';
    modelView.innerHTML = `<article class="bf-line-panel"><div class="bf-line-head"><h2>Upcoming Matches</h2><span>Fixtures</span></div><div class="bf-line-list">${MATCHES.map(m => `<div class="bf-line-row"><span class="bf-line-date"><span>${m.date}</span><b>${m.time}</b></span><span class="bf-line-main"><strong>${m.home} vs ${m.away}</strong><small>${m.stage} - ${m.venue}</small></span><span class="bf-line-badge">${m.tag}</span></div>`).join('')}</div></article><article class="bf-line-panel"><div class="bf-line-head"><h2>Latest Results</h2><span>Scores</span></div><div class="bf-line-list">${RESULTS.map(r => `<div class="bf-line-row"><span class="bf-line-date"><span>Last</span><b>Match</b></span><span class="bf-line-main"><strong>${r.match}</strong><small>${r.note}</small></span><span class="bf-line-score">${r.score}</span></div>`).join('')}</div></article>`;
  }

  function renderSearch() {
    const input = document.getElementById('match-search-input'); const button = document.getElementById('match-search-btn'); const result = document.getElementById('match-search-result'); const tags = document.querySelector('.bf-tags');
    if (input) input.placeholder = 'England vs Argentina'; if (tags) tags.innerHTML = MATCHES.map(m => `<button type="button">${m.home} vs ${m.away}</button>`).join(''); if (!input || !button || !result) return;
    const data = {}; MATCHES.forEach(m => { data[(m.home + ' vs ' + m.away).toLowerCase()] = m; });
    function analyze(value) { const query = cleanText(value); if (!query) { result.textContent = 'Enter a match to see probabilities and AI reasoning.'; return; } const m = data[query.toLowerCase().replace(/\s+/g, ' ')] || MATCHES[0]; result.innerHTML = `<div class="bf-live-result"><h3>${m.home} vs ${m.away}</h3><p><strong>Home:</strong> ${m.homePercent}% - <strong>Draw:</strong> ${m.drawPercent}% - <strong>Away:</strong> ${m.awayPercent}%<br><strong>AI pick:</strong> ${m.pick}<br><strong>Confidence:</strong> ${m.confidence}%<br>${m.text}</p></div>`; }
    button.onclick = () => analyze(input.value); input.onkeydown = event => { if (event.key === 'Enter') analyze(input.value); };
    document.querySelectorAll('.bf-tags button').forEach(tag => { tag.onclick = () => { input.value = tag.textContent.trim(); analyze(input.value); }; });
  }

  function run() { injectCss(); renderFeaturedCard(); renderArgentinaHero(); renderPredictions(); renderLowerPanels(); renderSearch(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
  window.addEventListener('load', run); setTimeout(run, 500); setTimeout(run, 1200);
})();